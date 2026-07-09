import os
from PIL import Image

def crop_transparent_padding(image_path, output_path):
    if not os.path.exists(image_path):
        print(f"Error: {image_path} does not exist")
        return
        
    img = Image.open(image_path)
    print(f"Original image size: {img.size}")
    
    # getbbox returns the bounding box of non-zero (non-transparent) pixels
    bbox = img.getbbox()
    if bbox:
        print(f"Bounding box: {bbox}")
        cropped_img = img.crop(bbox)
        print(f"Cropped image size: {cropped_img.size}")
        cropped_img.save(output_path, "PNG")
        print(f"Successfully saved cropped image to {output_path}")
    else:
        print("No non-transparent bounding box found")

if __name__ == "__main__":
    crop_transparent_padding(
        "public/images/Footer/ISO.png",
        "public/images/Footer/ISO_cropped.png"
    )
