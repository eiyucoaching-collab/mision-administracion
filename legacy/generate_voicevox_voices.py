"""
GENERADOR DE VOCES CON VOICEVOX (v22.0)
Genera todos los MP3 del juego con voces de anime de calidad profesional.
REQUISITO: VOICEVOX debe estar corriendo (./voicevox/run.exe o aplicación desktop).
El servidor se levanta automáticamente en http://127.0.0.1:50021

VOCES USADAS:
- Valeria: Speaker 3 (Zundamon alto, voz clara y confiada)
- Aoi:     Speaker 2 (Zundamon normal, dulce)
- Maya:    Speaker 7 (Zundamon rápido, energico)
- Sakura:  Speaker 4 (Zundamon suave, elegante)
- Elena:   Speaker 0 (Shikoku Metan, alegre)
- Rin:     Speaker 1 (Shikoku Metan grave, seria)
"""
import asyncio
import aiohttp
import os
import json

BASE_URL = "http://127.0.0.1:50021"

SPEAKER_MAP = {
    1: 3,   # Valeria -> Zundamon alto
    2: 2,   # Aoi     -> Zundamon normal
    3: 7,   # Maya    -> Zundamon rápido
    4: 4,   # Sakura  -> Zundamon suave
    5: 0,   # Elena   -> Shikoku Metan
    6: 1,   # Rin     -> Shikoku Metan grave
}

SLIDE_TEXTS = {
    (1, 0): "Muy bien aspirante. La Constitución Española de mil novecientos setenta y ocho tiene ciento sesenta y nueve artículos, un Título Preliminar y diez Títulos numerados. ¡Aprended bien!",
    (1, 1): "El Gobierno se regula en la Ley cincuenta de mil novecientos noventa y siete. El Presidente dirige y coordina a todos sus ministros.",
    (1, 2): "La Ley cuarenta de dos mil quince establece los principios de eficacia, jerarquía y transparencia en el Sector Público.",
    (1, 3): "Recuerda: la Constitución es la norma suprema del ordenamiento jurídico. Toda ley contraria a ella es inconstitucional.",

    (2, 0): "Bienvenido. Soy tu instructora de Empleo Público. El TREBEP, Real Decreto Legislativo cinco de dos mil quince, regula a todos los empleados públicos.",
    (2, 1): "La Ley Orgánica tres de dos mil siete busca la igualdad efectiva entre mujeres y hombres en todas las Administraciones.",
    (2, 2): "Las faltas disciplinarias se clasifican en muy graves, graves y leves. Cada una tiene su sanción proporcional.",
    (2, 3): "El permiso de maternidad y paternidad es de dieciséis semanas intransferibles. No lo olvides en el examen.",

    (3, 0): "¡Hola a todos! Soy tu profesora de Derecho Laboral. El Estatuto de los Trabajadores regula la relación laboral por cuenta ajena en toda España.",
    (3, 1): "La Ley de Infracciones y Sanciones del Orden Social sanciona las infracciones en materia de Seguridad Social y Prevención de Riesgos.",
    (3, 2): "El SMAC es el Servicio de Mediación, Arbitraje y Conciliación. Es obligatorio antes de acudir a la vía judicial.",
    (3, 3): "El despido improcedente conlleva una indemnización de treinta y tres días por año trabajado, con un máximo de veinticuatro mensualidades.",

    (4, 0): "El Cuarto Convenio Colectivo Único regula a todo el personal laboral de la Administración General del Estado.",
    (4, 1): "Los grupos profesionales van desde el grupo M tres hasta el grupo E cero, según la titulación académica requerida.",
    (4, 2): "El Concurso Abierto y Permanente permite solicitar movilidad funcional y geográfica en cualquier momento del año.",
    (4, 3): "Los trienios son complementos retributivos que premian la antigüedad. Se devengan cada tres años de servicio activo.",

    (5, 0): "¡Hola! Soy vuestra especialista en Prevención de Riesgos. La Ley treinta y uno de mil novecientos noventa y cinco protege vuestra salud en el trabajo.",
    (5, 1): "La acción preventiva exige evaluar todos los riesgos laborales y aplicar medidas de seguridad eficaces y proporcionadas.",
    (5, 2): "La Ley Orgánica once de mil novecientos ochenta y cinco garantiza la libertad sindical para todos los trabajadores.",
    (5, 3): "Los Delegados de Prevención son los representantes de los trabajadores en materia de seguridad e higiene laboral.",

    (6, 0): "Atención aspirante. El Real Decreto Legislativo ocho de dos mil quince aprueba la Ley General de la Seguridad Social.",
    (6, 1): "El ISFAS gestiona el régimen especial de Seguridad Social de las Fuerzas Armadas y del personal civil del Ministerio de Defensa.",
    (6, 2): "Clases Pasivas del Estado contempla las pensiones de jubilación y retiro del personal de funcionarios.",
    (6, 3): "La incapacidad permanente se clasifica en cuatro grados: parcial, total, absoluta y gran invalidez.",
}

async def check_voicevox(session):
    try:
        async with session.get(f"{BASE_URL}/version", timeout=aiohttp.ClientTimeout(total=3)) as r:
            v = await r.text()
            print(f"[OK] VOICEVOX detectado: v{v.strip()}")
            return True
    except:
        print("[!!] VOICEVOX no detectado en localhost:50021")
        print("     Asegurate de que VOICEVOX esta corriendo.")
        print("     Descarga desde: https://voicevox.hiroshiba.jp/")
        return False

async def get_speakers(session):
    async with session.get(f"{BASE_URL}/speakers") as r:
        speakers = await r.json()
        print("\nVoces disponibles:")
        for sp in speakers[:8]:
            for style in sp.get('styles', []):
                print(f"  ID {style['id']}: {sp['name']} ({style['name']})")

async def generate_voice(session, text, speaker_id, dest):
    # 1. Audio query
    async with session.post(f"{BASE_URL}/audio_query",
                            params={"text": text, "speaker": speaker_id}) as r:
        query = await r.json()

    query["speedScale"] = 0.95
    query["pitchScale"] = 0.02
    query["intonationScale"] = 1.2
    query["volumeScale"] = 1.0

    # 2. Synthesis
    async with session.post(f"{BASE_URL}/synthesis",
                            params={"speaker": speaker_id},
                            json=query,
                            headers={"Content-Type": "application/json"}) as r:
        audio_data = await r.read()

    with open(dest, 'wb') as f:
        f.write(audio_data)
    size = len(audio_data)
    print(f"  OK: {dest} ({size//1024}KB)")
    return True

async def main():
    os.makedirs("assets/voices", exist_ok=True)
    
    async with aiohttp.ClientSession() as session:
        if not await check_voicevox(session):
            return

        await get_speakers(session)
        print()

        errors = []
        for (m_id, s_idx), text in SLIDE_TEXTS.items():
            speaker = SPEAKER_MAP.get(m_id, 3)
            dest = f"assets/voices/m{m_id}_s{s_idx + 1}.mp3"
            try:
                await generate_voice(session, text, speaker, dest)
            except Exception as e:
                errors.append(dest)
                print(f"  ERROR: {dest}: {e}")

        print(f"\n{'='*50}")
        print(f"Completado: {len(SLIDE_TEXTS)-len(errors)} OK, {len(errors)} errores")
        if errors:
            print("Errores en:", errors)

if __name__ == "__main__":
    asyncio.run(main())
