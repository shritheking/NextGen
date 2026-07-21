const tls = require('tls');
const net = require('net');

/**
 * Sends an email using pure Node.js sockets (no npm dependencies).
 * Supports direct SSL (port 465) and STARTTLS (port 587).
 * 
 * @param {Object} config - SMTP Config (host, port, user, pass, to, from)
 * @param {Object} email - Email Content (subject, text)
 * @returns {Promise<Object>} Status and connection logs
 */
function sendMail(config, email) {
  return new Promise((resolve, reject) => {
    const host = config.host || 'smtp.gmail.com';
    const port = parseInt(config.port) || 465;
    const user = config.user || '';
    const pass = config.pass || '';
    const from = config.from || user || 'no-reply@nextgen.com';
    const to = email.to || config.to || user;
    
    // Parse From Display Name and Sender Email
    let fromEmail = user;
    let fromHeader = '';
    
    if (from.includes('<') && from.includes('>')) {
      fromHeader = from;
      const matches = from.match(/<([^>]+)>/);
      if (matches && matches[1]) {
        fromEmail = matches[1].trim();
      }
    } else if (from.includes('@')) {
      fromEmail = from.trim();
      fromHeader = `<${fromEmail}>`;
    } else {
      fromHeader = `"${from}" <${user}>`;
    }
    const subject = email.subject || 'Notification';
    const body = email.text || '';

    const log = [];
    let socket;
    let step = 0;

    function write(cmd) {
      log.push('CLIENT: ' + (cmd.startsWith('AUTH LOGIN') ? 'AUTH LOGIN' : cmd.substring(0, 15) === 'CLIENT PASSBASE' ? '*****' : cmd));
      socket.write(cmd + '\r\n');
    }

    // Connect to SMTP Server
    if (port === 465) {
      // Direct SSL connection
      socket = tls.connect({ host, port, rejectUnauthorized: false }, () => {
        log.push('Secure SSL socket established');
      });
    } else {
      // Standard TCP connection (will negotiate STARTTLS if port is 587)
      socket = net.connect({ host, port }, () => {
        log.push('Plain TCP socket established');
      });
    }

    socket.setEncoding('utf8');

    // Protocol state machine handler
    socket.on('data', (data) => {
      const serverResponse = data.trim();
      log.push('SERVER: ' + serverResponse);

      const lines = serverResponse.split('\r\n');
      const lastLine = lines[lines.length - 1];
      const code = parseInt(lastLine.substring(0, 3));

      // STARTTLS Upgrade Logic for Port 587
      if (step === 1.5 && code === 220) {
        log.push('Negotiating STARTTLS handshakes...');
        const secureSocket = tls.connect({
          socket: socket,
          host: host,
          rejectUnauthorized: false
        }, () => {
          log.push('Socket upgraded to TLS via STARTTLS handshake');
          // Restart EHLO over secure connection
          write('EHLO ' + host);
          step = 1;
        });

        secureSocket.setEncoding('utf8');
        secureSocket.on('error', (err) => {
          reject(new Error(`STARTTLS error: ${err.message}\nLog:\n${log.join('\n')}`));
        });

        // Redirect main socket events to new secure socket
        socket = secureSocket;
        return;
      }

      if (code === 220 && step === 0) {
        write('EHLO ' + host);
        step = 1;
      } else if (code === 250 && step === 1) {
        if (port === 587 && serverResponse.toUpperCase().includes('STARTTLS') && step !== 1.5) {
          write('STARTTLS');
          step = 1.5;
        } else {
          if (user && pass) {
            write('AUTH LOGIN');
            step = 2;
          } else {
            write(`MAIL FROM:<${from}>`);
            step = 4;
          }
        }
      } else if (code === 334 && step === 2) {
        // Send base64 username
        write(Buffer.from(user).toString('base64'));
        step = 3;
      } else if (code === 334 && step === 3) {
        // Send base64 password
        log.push('CLIENT: ***** (base64 password)');
        socket.write(Buffer.from(pass).toString('base64') + '\r\n');
        step = 3.5;
      } else if (code === 235 && step === 3.5) {
        write(`MAIL FROM:<${fromEmail}>`);
        step = 4;
      } else if (code === 250 && step === 4) {
        write(`RCPT TO:<${to}>`);
        step = 5;
      } else if (code === 250 && step === 5) {
        write('DATA');
        step = 6;
      } else if (code === 354 && step === 6) {
        // Send message headers and content body (supports optional attachments)
        const attachments = email.attachments || [];
        let msg = '';
        if (attachments.length > 0) {
          const boundary = '----=_Part_' + Date.now() + '_' + Math.random().toString(36).substring(2);
          
          msg = [
            `From: ${fromHeader}`,
            `To: <${to}>`,
            `Subject: ${subject}`,
            `MIME-Version: 1.0`,
            `Content-Type: multipart/mixed; boundary="${boundary}"`,
            `Date: ${new Date().toUTCString()}`,
            '',
            `--${boundary}`,
            `Content-Type: text/html; charset=UTF-8`,
            `Content-Transfer-Encoding: 7bit`,
            '',
            body,
            ''
          ].join('\r\n');

          attachments.forEach(att => {
            msg += [
              `--${boundary}`,
              `Content-Type: ${att.contentType || 'application/octet-stream'}; name="${att.filename}"`,
              `Content-Disposition: attachment; filename="${att.filename}"`,
              `Content-Transfer-Encoding: base64`,
              '',
              att.content,
              ''
            ].join('\r\n');
          });

          msg += `--${boundary}--` + '\r\n.';
        } else {
          msg = [
            `From: ${fromHeader}`,
            `To: <${to}>`,
            `Subject: ${subject}`,
            `Content-Type: text/html; charset=UTF-8`,
            `MIME-Version: 1.0`,
            `Date: ${new Date().toUTCString()}`,
            '',
            body,
            '.'
          ].join('\r\n');
        }
        write(msg);
        step = 7;
      } else if (code === 250 && step === 7) {
        write('QUIT');
        step = 8;
      } else if (code === 221 && step === 8) {
        socket.end();
        resolve({ success: true, log });
      } else if (code >= 400) {
        socket.end();
        reject(new Error(`SMTP server returned error code ${code}: ${serverResponse}\nLog:\n${log.join('\n')}`));
      }
    });

    socket.on('error', (err) => {
      reject(new Error(`SMTP socket error: ${err.message}\nLog:\n${log.join('\n')}`));
    });

    socket.on('close', () => {
      if (step < 8) {
        reject(new Error(`SMTP socket closed prematurely at step ${step}\nLog:\n${log.join('\n')}`));
      }
    });
  });
}

module.exports = { sendMail };
