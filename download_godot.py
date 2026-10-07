import os
import urllib.request
import zipfile

# URL estable oficial de Godot 4.3 de 64 bits para Windows
URL = "https://github.com/godotengine/godot/releases/download/4.3-stable/Godot_v4.3-stable_win64.exe.zip"
DIR = r"C:\Users\FUJITSU\.gemini\antigravity\scratch\mision-administracion"
ZIP_FILE = os.path.join(DIR, "godot.zip")

print("Iniciando descarga directa de Godot 4.3 (80 MB)...")
req = urllib.request.Request(URL, headers={"User-Agent": "Mozilla/5.0"})

with urllib.request.urlopen(req, timeout=300) as response:
    data = response.read()
    with open(ZIP_FILE, "wb") as f:
        f.write(data)
    print(f"Descargado Zip completo ({len(data) // (1024*1024)} MB)")

with zipfile.ZipFile(ZIP_FILE, 'r') as z:
    z.extractall(DIR)
    print("Archivos extraidos:")
    for name in z.namelist():
        print(" -", name)

if os.path.exists(ZIP_FILE):
    os.remove(ZIP_FILE)
