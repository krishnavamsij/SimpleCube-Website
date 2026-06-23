import sys
from PIL import Image

def remove_background(image_path, output_path, tolerance=30):
    img = Image.open(image_path).convert("RGBA")
    data = img.getdata()
    
    # Get the background color from the top-left pixel
    bg_color = data[0]
    
    new_data = []
    for item in data:
        # Check if the pixel color is close to the background color
        if all(abs(item[i] - bg_color[i]) <= tolerance for i in range(3)):
            # Make it transparent
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Saved to {output_path}")

remove_background("public/images/digital-transformation/hero_glassmorphism_chip_1781611604129.png", "public/images/digital-transformation/hero_glassmorphism_chip_1781611604129_nobg.png")
