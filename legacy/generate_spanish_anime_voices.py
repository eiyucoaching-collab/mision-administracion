"""
GENERADOR DE VOCES FEMENINAS NEURALES HD EN CASTELLANO PARA ESTUDIO (v26.0)
Genera las 24 lecciones con voces femeninas en español 100% nítidas, agradables y sin distorsión.
Ideales para horas de estudio del temario de oposición E1 Servicios Administrativos.
"""
import asyncio
import os
import edge_tts

# Voces femeninas en castellano ultra-nítidas para estudio
SPANISH_FEMALE_STUDY_VOICES = {
    1: ("es-ES-ElviraNeural", "+2Hz", "+0%"),   # Valeria (Comandante: voz clara, profesional)
    2: ("es-ES-XimenaNeural", "+8Hz", "+2%"),   # Aoi (Inspectora: joven, dulce y nítida)
    3: ("es-ES-XimenaNeural", "+4Hz", "+4%"),   # Maya (Teniente: enérgica y directa)
    4: ("es-ES-ElviraNeural", "+2Hz", "-2%"),   # Sakura (Oficial: cálida y serena)
    5: ("es-ES-XimenaNeural", "+6Hz", "+3%"),   # Elena (Capitana: amable y motivadora)
    6: ("es-ES-ElviraNeural", "-2Hz", "-4%"),   # Rin (Mayor: rigurosa y solemne)
}

SLIDE_TEXTS_SPANISH = {
    # MISIÓN 01 - VALERIA (Constitución y Gobierno)
    (1, 0): "¡Aspirante! Soy la Comandante Valeria. La Constitución Española de 1978 consta de 169 artículos, un Título Preliminar y 10 Títulos numerados. ¡Aprende bien esta estructura!",
    (1, 1): "El Título I es la piedra angular sobre Derechos y Deberes Fundamentales. Y la Ley 50/1997 regula la organización y funciones del Gobierno de España.",
    (1, 2): "La Ley 40/2015 de Régimen Jurídico del Sector Público establece los principios de eficacia, jerarquía, descentralización y transparencia administrativa.",
    (1, 3): "Recuerda siempre: la Constitución es la norma suprema del ordenamiento jurídico. ¡Toda norma contraria a ella es nula de pleno derecho!",

    # MISIÓN 02 - AOI (Empleo Público e Igualdad)
    (2, 0): "¡Hola recluta! Soy la Inspectora Aoi. El TREBEP, Real Decreto Legislativo 5/2015, regula el estatuto de todo el personal al servicio de las Administraciones Públicas.",
    (2, 1): "La Ley Orgánica 3/2007 busca la igualdad efectiva entre mujeres y hombres en el ámbito público y empresarial. ¡El respeto es fundamental!",
    (2, 2): "Las faltas disciplinarias se clasifican en muy graves, graves y leves. Las sanciones deben ser siempre proporcionales a la infracción cometida.",
    (2, 3): "Los permisos por nacimiento, adopción o progenitor diferente tienen una duración de 16 semanas intransferibles. ¡No olvides este dato para el examen!",

    # MISIÓN 03 - MAYA (Derecho del Trabajo y LISOS)
    (3, 0): "¡Atención! Soy la Teniente Maya. El Estatuto de los Trabajadores regula la relación laboral por cuenta ajena y fija los derechos y deberes laborales.",
    (3, 1): "La LISOS sanciona las infracciones en materia de relaciones laborales, Seguridad Social y prevención de riesgos laborales.",
    (3, 2): "El SMAC es el Servicio de Mediación, Arbitraje y Conciliación. Acudir al intento de conciliación previa es requisito obligatorio antes de la vía judicial.",
    (3, 3): "El despido improcedente conlleva una indemnización de 33 días por año trabajado, con un máximo de 24 mensualidades. ¡Memoriza bien los plazos!",

    # MISIÓN 04 - SAKURA (IV CUAGE - Personal Laboral)
    (4, 0): "Saludos. Soy la Oficial Sakura. El IV Convenio Colectivo Único regula las condiciones del personal laboral de la Administración General del Estado.",
    (4, 1): "Los grupos profesionales van desde el Grupo M3 hasta el Grupo E0, clasificados según la titulación académica requerida para el puesto.",
    (4, 2): "El Concurso Abierto y Permanente, o CAP, es el sistema que permite solicitar la movilidad funcional y geográfica a lo largo del año.",
    (4, 3): "Los trienios son complementos retributivos que premian la antigüedad acumulada. Se devengan cada tres años de servicio activo en la Administración.",

    # MISIÓN 05 - ELENA (Prevención de Riesgos y LOLS)
    (5, 0): "¡Salud y seguridad ante todo! Soy la Capitana Elena. La Ley 31/1995 de Prevención de Riesgos Laborales garantiza la protección de tu salud en el trabajo.",
    (5, 1): "La acción preventiva exige evaluar de forma continua los riesgos e implantar medidas de seguridad eficientes y gratuitas para el trabajador.",
    (5, 2): "La Ley Orgánica 11/1985 de Libertad Sindical regula los derechos de los sindicatos y la representación colectiva de los trabajadores.",
    (5, 3): "Los Delegados de Prevención son los representantes específicos de los trabajadores en materia de prevención de riesgos e higiene laboral.",

    # MISIÓN 06 - RIN (Seguridad Social, ISFAS y Clases Pasivas)
    (6, 0): "Atención aspirante. Soy la Mayor Rin. El Real Decreto Legislativo 8/2015 aprueba el Texto Refundido de la Ley General de la Seguridad Social.",
    (6, 1): "El ISFAS gestiona el régimen especial de Seguridad Social de las Fuerzas Armadas y del personal civil del Ministerio de Defensa.",
    (6, 2): "El régimen de Clases Pasivas del Estado gestiona las pensiones de jubilación y retiro del personal funcionario y militar.",
    (6, 3): "La incapacidad permanente se clasifica en cuatro grados: parcial, total, absoluta y gran invalidez. ¡Revisa bien cada porcentaje!",
}

async def generate_all():
    os.makedirs("assets/voices", exist_ok=True)
    print("Generando 24 voces femeninas nítidas para estudio...")
    errors = []
    
    for (m_id, s_idx), text in SLIDE_TEXTS_SPANISH.items():
        voice, pitch, rate = SPANISH_FEMALE_STUDY_VOICES.get(m_id, ("es-ES-XimenaNeural", "+0Hz", "+0%"))
        filename = f"assets/voices/m{m_id}_s{s_idx + 1}.mp3"
        try:
            communicate = edge_tts.Communicate(text, voice, pitch=pitch, rate=rate)
            await communicate.save(filename)
            print(f"  OK: {filename} [{voice}]")
        except Exception as e:
            errors.append(filename)
            print(f"  ERROR en {filename}: {e}")
            
    print(f"\nProceso finalizado: {len(SLIDE_TEXTS_SPANISH) - len(errors)}/24 audios creados con exito.")

if __name__ == "__main__":
    asyncio.run(generate_all())
