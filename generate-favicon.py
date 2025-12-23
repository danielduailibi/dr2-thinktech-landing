from PIL import Image
import os

# Abrir a imagem do logo
logo_path = "/home/ubuntu/quillspark/client/public/images/logo-symbol.png"
img = Image.open(logo_path)

# Converter para RGBA se necessário
if img.mode != 'RGBA':
    img = img.convert('RGBA')

# Criar favicon em múltiplos tamanhos
sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]

# Redimensionar mantendo proporção e centralizar em quadrado
def make_square(img, size):
    # Criar imagem quadrada transparente
    square = Image.new('RGBA', size, (0, 0, 0, 0))
    
    # Calcular tamanho mantendo proporção
    ratio = min(size[0] / img.width, size[1] / img.height)
    new_size = (int(img.width * ratio), int(img.height * ratio))
    
    # Redimensionar
    resized = img.resize(new_size, Image.Resampling.LANCZOS)
    
    # Centralizar
    offset = ((size[0] - new_size[0]) // 2, (size[1] - new_size[1]) // 2)
    square.paste(resized, offset, resized)
    
    return square

# Gerar favicon.ico com múltiplos tamanhos
favicon_images = [make_square(img, size) for size in sizes]
favicon_path = "/home/ubuntu/quillspark/client/public/favicon.ico"
favicon_images[0].save(favicon_path, format='ICO', sizes=[(s[0], s[1]) for s in sizes])

# Gerar também PNG para apple-touch-icon
apple_icon = make_square(img, (180, 180))
apple_icon.save("/home/ubuntu/quillspark/client/public/apple-touch-icon.png", format='PNG')

# Gerar favicon-32x32.png
favicon_32 = make_square(img, (32, 32))
favicon_32.save("/home/ubuntu/quillspark/client/public/favicon-32x32.png", format='PNG')

# Gerar favicon-16x16.png
favicon_16 = make_square(img, (16, 16))
favicon_16.save("/home/ubuntu/quillspark/client/public/favicon-16x16.png", format='PNG')

print("Favicons gerados com sucesso!")
