import os

with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

# Update Phone number
content = content.replace("79045 44101", "63791 40067")
content = content.replace("7904544101", "6379140067")
content = content.replace("wa.me/917904544101", "api.whatsapp.com/send?phone=916379140067")
content = content.replace("wa.me/916379140067", "api.whatsapp.com/send?phone=916379140067")

# Update images
content = content.replace("/images/boomers_cafe.jpg", "/images/boomers_cafe_new.png")
content = content.replace("/images/turf_dashboard.jpg", "/images/turf_dashboard_new.png")
content = content.replace("/images/neimozhi.jpg", "/images/neimozhi_new.png")
content = content.replace("/images/billing_software_2.png", "/images/billing_software_new.png")

with open("index.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated index.html safely.")
