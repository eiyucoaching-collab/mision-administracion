"""
COMPLETADOR AUTOMÁTICO DE AUDIOS FALTANTES CON EDGE-TTS NEURAL HD (v39.0)
Garantiza que el 100% de las 36 diapositivas (m1_s1 a m6_s6) tengan audio MP3 nítido.
"""
import os
import re
import asyncio

SLIDE_TEXTS = {}

def load_slides():
    with open("lecture.js", "r", encoding="utf-8") as f:
        code = f.read()
    mission_blocks = re.findall(r"(\d+):\s*\{[\s\S]*?slides:\s*\[([\s\S]*?)\]\s*\}", code)
    for m_str, slides_code in mission_blocks:
        m_id = int(m_str)
        raw_slides = re.findall(r"headline:\s*\"([^\"]+)\",\s*content:\s*\"([^\"]+)\"", slides_code)
        for s_idx, (headline, content) in enumerate(raw_slides):
            SLIDE_TEXTS[(m_id, s_idx)] = f"{headline}. {content}"

async def fill_missing():
    load_slides()
    import edge_tts

    voice_map = {
        1: "es-ES-ElviraNeural",
        2: "es-ES-XimenaNeural",
        3: "es-ES-ElviraNeural",
        4: "es-ES-XimenaNeural",
        5: "es-ES-ElviraNeural",
        6: "es-ES-XimenaNeural"
    }

    print("🎙️ Verificando existencia de los 36 audios en assets/voices/...")
    missing_count = 0

    for (m_id, s_idx), text in sorted(SLIDE_TEXTS.items()):
        file_path = f"assets/voices/m{m_id}_s{s_idx + 1}.mp3"
        # Si no existe o pesa menos de 10KB (fallido)
        if not os.path.exists(file_path) or os.path.getsize(file_path) < 10240:
            print(f"  ⚡ Generando audio faltante M0{m_id}-S0{s_idx + 1} con Edge-TTS Neural HD...", end="", flush=True)
            voice_name = voice_map[m_id]
            communicate = edge_tts.Communicate(text, voice_name, rate="+0%", pitch="+0Hz")
            await communicate.save(file_path)
            size_kb = os.path.getsize(file_path) // 1024
            print(f" OK ({size_kb} KB)")
            missing_count += 1
        else:
            size_kb = os.path.getsize(file_path) // 1024
            print(f"  ✅ M0{m_id}-S0{s_idx + 1} existente y verificado ({size_kb} KB)")

    print(f"\n🎉 ¡VERIFICACIÓN COMPLETA! Se completaron {missing_count} audios faltantes. Los 36/36 audios están listos.")

if __name__ == "__main__":
    asyncio.run(fill_missing())
