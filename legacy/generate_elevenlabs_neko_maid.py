"""
GENERADOR ELEVENLABS HD PARA LA NEKO MAID AIRI (v44.0)
Sintetiza las frases de la Neko Maid con la voz dulce de Jessica/Bella en ElevenLabs.
"""
import os
import json
import urllib.request

ELEVENLABS_API_KEY = "361a1f08c236f8ceac114e353746872b31651228ea2877693f36946ce89f1787"
# Jessica: cgSgspJ2msm6clMCkdW9 (Playful, Bright, Warm)
VOICE_ID = "cgSgspJ2msm6clMCkdW9"

NEKO_CHEERS = [
    ("assets/voices/airi_cheer1.mp3", "¡Nyaa~! ¡Aspirante-kun, estás haciéndolo increíble en este examen!"),
    ("assets/voices/airi_cheer2.mp3", "¡Confía en tu memoria del BOE! ¡Tu plaza E1 en el Ministerio de Defensa será tuya, nya!"),
    ("assets/voices/airi_cheer3.mp3", "¡Recuerda respirar hondo! Si dudas en dos opciones, ¡mitiga el riesgo con el botón pasar!"),
    ("assets/voices/airi_cheer4.mp3", "¡Ganbatte! ¡Tu Neko Maid AIRI cree en ti al cien por cien, nya!")
]

def synthesize(api_key, voice_id, text, output_path):
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
            "stability": 0.35,
            "similarity_boost": 0.85,
            "style": 0.45,
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

def generate_neko_voices():
    print("🐾 Sintetizando audios de Neko Maid AIRI con ElevenLabs HD...")
    for path, text in NEKO_CHEERS:
        print(f"  🔊 Sintetizando {path}...", end="", flush=True)
        try:
            size_kb = synthesize(ELEVENLABS_API_KEY, VOICE_ID, text, path) // 1024
            print(f" OK ({size_kb} KB)")
        except Exception as e:
            print(f" FAIL: {e}")

if __name__ == "__main__":
    generate_neko_voices()
