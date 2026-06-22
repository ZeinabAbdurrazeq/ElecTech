import os
import subprocess
import sys

def install_pillow():
    try:
        from PIL import Image
    except ImportError:
        print("Pillow library is not installed. Installing it now using pip...")
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
            print("Pillow installed successfully.")
        except Exception as e:
            print(f"Failed to install Pillow automatically: {e}")
            print("Please install it manually by running: pip install Pillow")
            sys.exit(1)

def resize_logo():
    from PIL import Image
    
    # Check possible source files
    src_logo = os.path.join("resources", "logo-removebg-preview.png")
    if not os.path.exists(src_logo):
        src_logo = os.path.join("resources", "Minimalist ELECTECH logo design.png")
        
    if not os.path.exists(src_logo):
        print("Error: Could not find any source logo files under resources/")
        print("Please ensure resources/logo-removebg-preview.png or resources/Minimalist ELECTECH logo design.png exists.")
        sys.exit(1)
        
    print(f"Using source logo: {src_logo}")
    
    # Output paths
    output_dir = os.path.join("resources", "icons")
    os.makedirs(output_dir, exist_ok=True)
    
    sizes = {
        "icon-192.png": 192,
        "icon-512.png": 512
    }
    
    for filename, size in sizes.items():
        try:
            img = Image.open(src_logo)
            # Resize image maintaining transparency
            img = img.resize((size, size), Image.Resampling.LANCZOS)
            dest_path = os.path.join(output_dir, filename)
            img.save(dest_path)
            print(f"Successfully generated: {dest_path} ({size}x{size})")
        except Exception as e:
            print(f"Failed to generate {filename}: {e}")

if __name__ == "__main__":
    install_pillow()
    resize_logo()
