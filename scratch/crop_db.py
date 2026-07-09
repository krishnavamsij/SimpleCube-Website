import os
from PIL import Image
import numpy as np

def remove_white_bg_and_crop(image_path, output_path, threshold=240):
    if not os.path.exists(image_path):
        print(f"Error: {image_path} does not exist")
        return

    img = Image.open(image_path).convert("RGBA")
    data = np.array(img, dtype=np.uint8)
    print(f"Original image size: {img.size}")

    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]

    # Pixels that are near-white become fully transparent
    is_white = (r >= threshold) & (g >= threshold) & (b >= threshold)
    data[is_white, 3] = 0   # set alpha to 0 (transparent)

    # Now find the bounding box of remaining non-transparent pixels
    remaining = data[:,:,3] > 10
    rows = np.any(remaining, axis=1)
    cols = np.any(remaining, axis=0)

    rmin, rmax = np.where(rows)[0][[0, -1]]
    cmin, cmax = np.where(cols)[0][[0, -1]]

    # No margin - remove all padding to align with other logos
    margin = 0
    rmin = max(0, rmin - margin)
    rmax = min(data.shape[0] - 1, rmax + margin)
    cmin = max(0, cmin - margin)
    cmax = min(data.shape[1] - 1, cmax + margin)

    print(f"Crop box: ({cmin}, {rmin}, {cmax+1}, {rmax+1})")
    result = Image.fromarray(data)
    cropped = result.crop((cmin, rmin, cmax + 1, rmax + 1))
    print(f"Final image size: {cropped.size}")
    cropped.save(output_path, "PNG")
    print(f"Successfully saved to {output_path}")

if __name__ == "__main__":
    remove_white_bg_and_crop(
        "public/images/Footer/D&b.png",
        "public/images/Footer/D&b_cropped.png"
    )
