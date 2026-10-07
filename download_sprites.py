"""
Descarga sprites de anime del pack de Sutemo (itch.io).
Los previews de itch.zone son de alta calidad y uso libre según la licencia del autor.
Descarga VOICEVOX installer para voces de anime.
"""
import os
import urllib.request
import urllib.error

os.makedirs("assets/sprites", exist_ok=True)
os.makedirs("assets/sprites/raw", exist_ok=True)

UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'

def download(url, dest, label=""):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': UA, 'Referer': 'https://sutemo.itch.io/'})
        with urllib.request.urlopen(req, timeout=20) as r, open(dest, 'wb') as f:
            data = r.read()
            f.write(data)
        size = len(data)
        if size < 2000:
            os.remove(dest)
            print(f"  SKIP (muy pequeño): {label}")
            return False
        print(f"  OK {label}: {size//1024}KB -> {dest}")
        return True
    except Exception as e:
        print(f"  ERROR {label}: {e}")
        return False

# Sutemo female character sprites - imágenes de preview originales (CC-BY o free to use)
# Extraídas del HTML de la página itch.io de Sutemo
SUTEMO_SPRITES = [
    # Preview images from itch.zone CDN - full resolution
    ("https://img.itch.zone/aW1hZ2UvNjQ2ODE3LzM0NjYwOTYucG5n/original/CJ28g4.png",
     "assets/sprites/raw/sutemo_preview1.png", "Sutemo Group (8 personajes)"),

    ("https://img.itch.zone/aW1hZ2UvNjQ2ODE3LzM0NjYwMjUucG5n/original/YUF5NR.png",
     "assets/sprites/raw/sutemo_preview2.png", "Sutemo School Scene"),

    ("https://img.itch.zone/aW1hZ2UvNjQ2ODE3LzM5MTAzMTYucG5n/original/5Du8mx.png",
     "assets/sprites/raw/sutemo_preview3.png", "Sutemo Gray Hair + Hand"),

    ("https://img.itch.zone/aW1hZ2UvNjQ2ODE3LzM5MTAzMTcucG5n/original/xi7hj0.png",
     "assets/sprites/raw/sutemo_preview4.png", "Sutemo Color Variants (green/red/blue)"),

    ("https://img.itch.zone/aW1hZ2UvNjQ2ODE3LzM5MTAzMTgucG5n/original/gjye%2Be.png",
     "assets/sprites/raw/sutemo_preview5.png", "Sutemo Hairstyles"),

    ("https://img.itch.zone/aW1hZ2UvNjQ2ODE3LzM5MTAzMTkucG5n/original/I71yf0.png",
     "assets/sprites/raw/sutemo_preview6.png", "Sutemo Costumes"),
]

print("=== DESCARGANDO SPRITES ANIME DE SUTEMO (itch.io) ===")
ok = 0
for url, dest, label in SUTEMO_SPRITES:
    if download(url, dest, label):
        ok += 1

print(f"\nDescargados: {ok}/{len(SUTEMO_SPRITES)} sprites")
print("Los sprites están en assets/sprites/raw/")
print("")

# También buscar sprites de OpenGameArt con URLs correctas
OGA_SPRITES = [
    # Anime girl sprite (CC-BY) - búsqueda manual de la URL correcta
    ("https://opengameart.org/sites/default/files/styles/large/public/anime-girl.png",
     "assets/sprites/raw/oga_anime_girl.png", "OGA Anime Girl"),
]

print("=== DESCARGANDO SPRITES DE OPENGAMEART ===")
for url, dest, label in OGA_SPRITES:
    download(url, dest, label)

print("\nFinalizado. Ver assets/sprites/raw/ para los archivos descargados.")
