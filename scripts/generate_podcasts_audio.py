import os
import re
import asyncio
import edge_tts

VOICE_ALVARO = "es-ES-AlvaroNeural"  # Voz masculina natural y formal
VOICE_ELVIRA = "es-ES-ElviraNeural"  # Voz femenina natural y pedagógica

AUDIO_DIR = os.path.join(os.path.dirname(__file__), "..", "audio")
DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "src", "data", "podcasts.js")

PHONETIC_REPLACEMENTS = [
    (r"\barts?\.\s*", "artículo "),
    (r"\barts\.\s*", "artículos "),
    (r"\bn[ºo]\.?\s*", "número "),
    (r"\bCE\b", "Constitución Española"),
    (r"\bAGE\b", "A-G-E"),
    (r"\bBOE\b", "B-O-E"),
    (r"\bCUAGE\b", "Convenio Único"),
    (r"\bTRLET\b", "Estatuto de los Trabajadores"),
    (r"\bLO\s*3/2007\b", "Ley Orgánica tres de dos mil siete"),
    (r"\bLO\s*1/2004\b", "Ley Orgánica uno de dos mil cuatro"),
    (r"\bLOIEMH\b", "Ley de Igualdad"),
    (r"\bLOMPIVG\b", "Ley de Medidas de Protección contra la Violencia de Género"),
    (r"\bRD\s*(\d+)/(\d+)", r"Real Decreto \1 de \2"),
    (r"\b3/5\b", "tres quintos"),
    (r"\b2/3\b", "dos tercios"),
    (r"\b1/10\b", "una décima parte"),
    (r"\b1\s*m²\b", "un metro cuadrado"),
    (r"\b2\s*m²\b", "dos metros cuadrados"),
    (r"\b10\s*m³\b", "diez metros cúbicos"),
    (r"\b80\s*g/m²\b", "ochenta gramos por metro cuadrado"),
    (r"\b70\s*g/m²\b", "setenta gramos por metro cuadrado"),
    (r"\b17\s*ºC\b", "diecisiete grados centígrados"),
    (r"\b27\s*ºC\b", "veintisiete grados centígrados"),
    (r"\b14\s*ºC\b", "catorce grados centígrados"),
    (r"\b25\s*ºC\b", "veinticinco grados centígrados"),
    (r"\bDNI\b", "D-N-I"),
    (r"\bTIE\b", "T-I-E"),
    (r"\bNRBQ\b", "N-R-B-Q"),
    (r"\bCO2\b", "C-O-dos"),
    (r"\bRGPD\b", "Reglamento General de Protección de Datos"),
    (r"\bDIN\s*A0\b", "DIN A cero"),
    (r"\bDIN\s*A1\b", "DIN A uno"),
    (r"\bDIN\s*A2\b", "DIN A dos"),
    (r"\bDIN\s*A3\b", "DIN A tres"),
    (r"\bDIN\s*A4\b", "DIN A cuatro"),
    (r"\bDIN\s*A5\b", "DIN A cinco"),
    (r"\b841\s*x\s*1189\s*mm\b", "ochocientos cuarenta y uno por mil ciento ochenta y nueve milímetros"),
    (r"\b594\s*x\s*841\s*mm\b", "quinientos noventa y cuatro por ochocientos cuarenta y uno milímetros"),
    (r"\b420\s*x\s*594\s*mm\b", "cuatrocientos veinte por quinientos noventa y cuatro milímetros"),
    (r"\b297\s*x\s*420\s*mm\b", "doscientos noventa y siete por cuatrocientos veinte milímetros"),
    (r"\b210\s*x\s*297\s*mm\b", "doscientos diez por doscientos noventa y siete milímetros"),
    (r"\b148\s*x\s*210\s*mm\b", "ciento cuarenta y ocho por doscientos diez milímetros"),
    (r"\bP-(\d)\b", r"P \1"),
]

def clean_script_for_tts(text: str) -> str:
    cleaned = text
    cleaned = re.sub(r"<[^>]+>", "", cleaned)
    cleaned = re.sub(r"[`#*~]", "", cleaned)
    
    for pattern, replacement in PHONETIC_REPLACEMENTS:
        cleaned = re.sub(pattern, replacement, cleaned, flags=re.IGNORECASE)
    
    # Normalizar espacios
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    return cleaned

def parse_tracks():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    track_blocks = re.findall(r"\{\s*id:\s*(\d+).*?audioSrc:\s*[\"']([^\"']+)[\"'].*?script:\s*`([^`]+)`", content, re.DOTALL)
    tracks = []
    for tid, src, script in track_blocks:
        tracks.append({
            "id": int(tid),
            "filename": os.path.basename(src),
            "script": script.strip()
        })
    return tracks

async def generate_single_track(track, voice=VOICE_ALVARO, suffix=""):
    filename = track["filename"]
    if suffix:
        base, ext = os.path.splitext(filename)
        filename = f"{base}_{suffix}{ext}"
    out_path = os.path.join(AUDIO_DIR, filename)
    cleaned_text = clean_script_for_tts(track["script"])
    print(f"[*] Generando Track {track['id']}: {filename} con {voice} ({len(cleaned_text)} caracteres)...")
    
    communicate = edge_tts.Communicate(cleaned_text, voice=voice, rate="+0%", pitch="+0Hz")
    await communicate.save(out_path)
    size_kb = os.path.getsize(out_path) / 1024
    print(f"[OK] Track {track['id']} guardado: {size_kb:.1f} KB")

async def main():
    os.makedirs(AUDIO_DIR, exist_ok=True)
    tracks = parse_tracks()
    print(f"=== GENERANDO AUDIOS FEMENINOS (ELVIRA) PARA {len(tracks)} PISTAS ===")
    for track in tracks:
        await generate_single_track(track, voice=VOICE_ELVIRA, suffix="elvira")
    print("=== TODOS LOS AUDIOS DE ELVIRA GENERADOS CON ÉXITO ===")

if __name__ == "__main__":
    asyncio.run(main())
