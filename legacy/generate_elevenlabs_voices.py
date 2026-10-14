"""
GENERADOR COMPLETO ELEVENLABS DE LAS 36 SLIDES DE APRENDIZAJE (v38.0)
Sintetiza las 36 lecciones (6 slides x 6 misiones) con voces humanas en castellano.
"""
import os
import json
import re
import urllib.request

ELEVENLABS_API_KEY = "361a1f08c236f8ceac114e353746872b31651228ea2877693f36946ce89f1787"

# Mapeo de mentora -> Voice ID oficial de ElevenLabs
MENTOR_ELEVENLABS_CONFIG = {
    1: {"name": "Valeria", "voice_id": "XrExE9yKIg1WjnnlVkGX", "stability": 0.50, "similarity": 0.85, "style": 0.20}, # Matilda
    2: {"name": "Aoi",     "voice_id": "cgSgspJ2msm6clMCkdW9", "stability": 0.40, "similarity": 0.85, "style": 0.35}, # Jessica
    3: {"name": "Maya",    "voice_id": "FGY2WhTYpPnrIDTdsKH5", "stability": 0.45, "similarity": 0.80, "style": 0.30}, # Laura
    4: {"name": "Sakura",  "voice_id": "pFZP5JQG7iQjIQuC4Bku", "stability": 0.60, "similarity": 0.85, "style": 0.15}, # Lily
    5: {"name": "Elena",   "voice_id": "hpp4J3VqNfWAUOO0d1Us", "stability": 0.42, "similarity": 0.80, "style": 0.30}, # Bella
    6: {"name": "Rin",     "voice_id": "Xb7hH8MSUJpSbSDYk0k2", "stability": 0.65, "similarity": 0.85, "style": 0.10}  # Alice
}

def extract_slides_from_lecture_js():
    with open("lecture.js", "r", encoding="utf-8") as f:
        code = f.read()

    # Extraer bloques de diapositivas por misión
    mission_blocks = re.findall(r"(\d+):\s*\{[\s\S]*?slides:\s*\[([\s\S]*?)\]\s*\}", code)
    
    slides_dict = {}
    for m_str, slides_code in mission_blocks:
        m_id = int(m_str)
        # Extraer cada objeto de slide
        raw_slides = re.findall(r"headline:\s*\"([^\"]+)\",\s*content:\s*\"([^\"]+)\"", slides_code)
        for s_idx, (headline, content) in enumerate(raw_slides):
            slides_dict[(m_id, s_idx)] = f"{headline}. {content}"
            
    return slides_dict

def synthesize(api_key, voice_id, text, output_path, stability, similarity, style):
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    headers = {
        "xi-api-key": api_key,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg"
    }
    payload = {
        "text": text,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
            "stability": stability,
            "similarity_boost": similarity,
            "style": style,
            "use_speaker_boost": True
        }
    }
    data_bytes = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data_bytes, headers=headers, method="POST")
    with urllib.request.urlopen(req, timeout=25) as response:
        audio_data = response.read()
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, "wb") as out:
            out.write(audio_data)
        return len(audio_data)

def generate_all():
    slides = extract_slides_from_lecture_js()
    print(f"🎙️ Extraídas {len(slides)} lecciones completas desde lecture.js...")
    
    success = 0
    for (m_id, s_idx), text in sorted(slides.items()):
        cfg = MENTOR_ELEVENLABS_CONFIG[m_id]
        output_file = f"assets/voices/m{m_id}_s{s_idx + 1}.mp3"
        print(f"  🔊 Sintetizando M0{m_id}-S0{s_idx + 1} [{cfg['name']}]...", end="", flush=True)
        try:
            size_kb = synthesize(ELEVENLABS_API_KEY, cfg['voice_id'], text, output_file, cfg['stability'], cfg['similarity'], cfg['style']) // 1024
            print(f" OK ({size_kb} KB)")
            success += 1
        except Exception as e:
            print(f" FAIL: {e}")

    print(f"\n🎉 ¡Proceso finalizado! {success}/{len(slides)} lecciones sintetizadas con éxito en ElevenLabs.")

if __name__ == "__main__":
    generate_all()
