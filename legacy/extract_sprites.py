"""
Extrae los 6 personajes individuales de los sprites de Sutemo.
La imagen sutemo_preview1.png tiene 8 personajes en una cuadrícula 4x2.
La imagen sutemo_preview4.png tiene 3 personajes con colores de pelo diferentes.
"""
from PIL import Image
import os

os.makedirs("assets/sprites", exist_ok=True)

# === EXTRAER DE PREVIEW1 (8 personajes en 4x2) ===
img1 = Image.open("assets/sprites/raw/sutemo_preview1.png")
W, H = img1.size
print(f"Preview1 size: {W}x{H}")

# Grid: 4 columnas x 2 filas
col_w = W // 4
row_h = H // 2

# Personajes a extraer por posición (fila, columna)
# fila 0: negro/bob, rubio/bob+gafas, castaño/largo+gafas, rosa/largo+gafas+bufanda
# fila 1: rosa/rizado+flor, rubio/largo+gafas2, negro/rizado+flor, plata/corto
extractions_1 = [
    (0, 0, "aoi"),        # negro bob - Aoi (cabello negro, seria)
    (0, 1, "maya"),       # rubio bob - Maya (energica)
    (0, 2, "sakura"),     # castaño largo - Sakura (elegante)
    (0, 3, "elena"),      # rosa largo+scarf - Elena (jovial)
    (1, 0, "valeria"),    # rosa rizado+flor - Valeria (heroica)
    (1, 3, "rin"),        # plata corto - Rin (seria)
]

for (row, col, name) in extractions_1:
    left = col * col_w
    top = row * row_h
    right = left + col_w
    bottom = top + row_h
    # Añadir padding ligero
    pad = 20
    left = max(0, left - pad)
    top = max(0, top - pad)
    right = min(W, right + pad)
    bottom = min(H, bottom + pad)
    
    cropped = img1.crop((left, top, right, bottom))
    
    # Convertir fondo blanco en transparencia
    cropped = cropped.convert("RGBA")
    data = cropped.getdata()
    new_data = []
    for item in data:
        r, g, b, a = item
        # Si el pixel es casi blanco, hacerlo transparente
        if r > 240 and g > 240 and b > 240:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
    cropped.putdata(new_data)
    
    # Escalar a tamaño estándar de sprite VN
    target_w = 400
    aspect = cropped.size[1] / cropped.size[0]
    target_h = int(target_w * aspect)
    cropped = cropped.resize((target_w, target_h), Image.LANCZOS)
    
    out = f"assets/sprites/{name}_neutral.png"
    cropped.save(out, "PNG")
    print(f"  Guardado: {out} ({target_w}x{target_h})")

# === EXTRA: usar preview4 para colores adicionales ===
img4 = Image.open("assets/sprites/raw/sutemo_preview4.png")
W4, H4 = img4.size
print(f"\nPreview4 size: {W4}x{H4}")

# 3 personajes: verde (izq parcial), rojo (centro), azul (derecha)
# Recortar solo la azul de pelo (distinta de aoi que tiene negro)
col4_w = W4 // 3
extras = [
    (1, "maya_alt"),   # rojo
    (2, "aoi_alt"),    # azul
]
for col, name in extras:
    left = col * col4_w
    cropped = img4.crop((left, 0, left + col4_w, H4))
    cropped = cropped.convert("RGBA")
    data = cropped.getdata()
    new_data = []
    for item in data:
        r, g, b, a = item
        if r > 230 and g > 230 and b > 230:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
    cropped.putdata(new_data)
    cropped = cropped.resize((400, int(400 * H4/col4_w)), Image.LANCZOS)
    out = f"assets/sprites/{name}.png"
    cropped.save(out, "PNG")
    print(f"  Guardado: {out}")

print("\n¡Extracción completada!")
print("Sprites listos en assets/sprites/")
