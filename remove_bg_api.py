from rembg import remove
from PIL import Image

input_path = "public/images/digital-transformation/hero_glassmorphism_chip_1781611604129.png"
output_path = "public/images/digital-transformation/hero_glassmorphism_chip_1781611604129_transparent.png"

input_image = Image.open(input_path)
output_image = remove(input_image)
output_image.save(output_path)
print("Saved transparent image")
