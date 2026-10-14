"""
Descarga los modelos Live2D oficiales (Cubism 4) desde el repositorio oficial de Live2D.
Modelos: Hiyori, Mao, Haru, Rice, Natori, Ren
"""
import os
import urllib.request
import json

os.makedirs("assets/live2d", exist_ok=True)

GH_BASE = "https://raw.githubusercontent.com/Live2D/CubismWebSamples/develop/Samples/Resources/"

def download_folder_recursive(rel_path):
    api_url = f"https://api.github.com/repos/Live2D/CubismWebSamples/contents/Samples/Resources/{rel_path}"
    req = urllib.request.Request(api_url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            items = json.load(r)
    except Exception as e:
        print(f"  Error fetching dir {rel_path}: {e}")
        return

    for item in items:
        item_path = f"{rel_path}/{item['name']}"
        dest_path = os.path.join("assets/live2d", item_path)
        if item['type'] == 'dir':
            os.makedirs(dest_path, exist_ok=True)
            download_folder_recursive(item_path)
        elif item['type'] == 'file':
            os.makedirs(os.path.dirname(dest_path), exist_ok=True)
            raw_url = item['download_url']
            try:
                r_req = urllib.request.Request(raw_url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(r_req, timeout=20) as resp, open(dest_path, 'wb') as f:
                    f.write(resp.read())
                print(f"  OK: {dest_path} ({os.path.getsize(dest_path)//1024}KB)")
            except Exception as e:
                print(f"  FAIL: {dest_path}: {e}")

models_to_download = ["Hiyori", "Mao", "Haru", "Rice", "Natori", "Ren"]

print("=== DESCARGANDO MODELOS LIVE2D OFICIALES ===")
for model in models_to_download:
    print(f"\nDescargando modelo Live2D: {model}...")
    download_folder_recursive(model)

print("\n¡Descarga completada!")
