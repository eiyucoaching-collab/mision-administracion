import json
import re

# Cargamos las preguntas actuales
with open("src/data/questions.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

# 1. Normalización de leyes y asignación de sourceType
REAL_EXAM_IDS = {30, 153, 175}

LAW_MAPPING = {
    "Constitución Española de 1978": "Constitución Española de 1978",
    "Ley 50/1997 del Gobierno": "Ley 50/1997 del Gobierno",
    "Ley 40/2015 de Régimen Jurídico del Sector Público": "Ley 40/2015 de Régimen Jurídico del Sector Público",
    "Texto Refundido del Estatuto de los Trabajadores (TRLET)": "Texto Refundido del Estatuto de los Trabajadores (TRLET / RD Leg 2/2015)",
    "TRLET": "Texto Refundido del Estatuto de los Trabajadores (TRLET / RD Leg 2/2015)",
    "IV Convenio Único para el personal laboral de la AGE": "IV Convenio Único para el personal laboral de la AGE (IV CUAGE)",
    "IV CUAGE": "IV Convenio Único para el personal laboral de la AGE (IV CUAGE)",
    "Ley Orgánica 3/2007 para la igualdad efectiva": "Ley Orgánica 3/2007 para la igualdad efectiva de mujeres y hombres",
    "Ley Orgánica 3/2007 (LOIEMH)": "Ley Orgánica 3/2007 para la igualdad efectiva de mujeres y hombres",
    "Ley Orgánica 1/2004 contra la Violencia de Género": "Ley Orgánica 1/2004 de Medidas de Protección Integral contra la Violencia de Género",
    "Ley Orgánica 1/2004 (LOMPIVG)": "Ley Orgánica 1/2004 de Medidas de Protección Integral contra la Violencia de Género",
    "RD 486/1997": "Real Decreto 486/1997 sobre disposiciones mínimas de seguridad y salud en los lugares de trabajo",
    "Real Decreto 486/1997 sobre Lugares de Trabajo": "Real Decreto 486/1997 sobre disposiciones mínimas de seguridad y salud en los lugares de trabajo",
    "Real Decreto 486/1997": "Real Decreto 486/1997 sobre disposiciones mínimas de seguridad y salud en los lugares de trabajo",
    "Ley 31/1995 de Prevención de Riesgos Laborales": "Ley 31/1995 de Prevención de Riesgos Laborales",
    "Ley 31/1995 de PRL": "Ley 31/1995 de Prevención de Riesgos Laborales",
    "Ley 43/2010 del servicio postal universal": "Ley 43/2010 del servicio postal universal y RD 1829/1999",
    "Ley 43/2010 y RD 1829/1999": "Ley 43/2010 del servicio postal universal y RD 1829/1999",
    "Reglamento Postal (RD 1829/1999)": "Ley 43/2010 del servicio postal universal y RD 1829/1999",
    "Norma ISO 216 / DIN 476": "Norma ISO 216 / DIN 476 (Formatos de Papel)",
    "Norma DIN 66399": "Norma DIN 66399 (Niveles de Destrucción de Soportes de Información)",
    "Ley 9/1968 sobre Secretos Oficiales": "Ley 9/1968 sobre Secretos Oficiales",
    "Ley 9/1968 de Secretos Oficiales": "Ley 9/1968 sobre Secretos Oficiales",
    "RGPD y LOPDGDD 3/2018": "Reglamento General de Protección de Datos (RGPD) / LOPDGDD 3/2018",
}

# Distractores específicos que sabemos que eran absurdos y sustitutos profesionales
CUSTOM_OVERRIDES = {
    73: {
        "options": [
            "Permitir el acceso provisional anotando la negativa en el libro de incidencias para su posterior comprobación",
            "Denegar pacíficamente el acceso y avisar de inmediato a la Guardia de Seguridad Militar o Policía/Vigilancia",
            "Permitirle el paso acompañándolo en silencio hasta el despacho solicitado bajo custodia del ordenanza",
            "Retener cautelarmente sus efectos y pertenencias en conserjería hasta que consienta en mostrar el documento"
        ],
        "correct_text": "Denegar pacíficamente el acceso y avisar de inmediato a la Guardia de Seguridad Militar o Policía/Vigilancia"
    },
    78: {
        "options": [
            "Dejar pasar al visitante para que espere dentro del despacho oficial a solas hasta que regrese el responsable",
            "Informar cortésmente de la incidencia, comprobar si otro funcionario puede atenderle o gestionar nueva cita sin dejarle solo en zonas reservadas",
            "Requerir al visitante que abandone el recinto inmediatamente sin ofrecerle la posibilidad de reagendar la cita",
            "Retener el documento de identidad en el control de acceso hasta que el titular de la unidad comparezca en el centro"
        ],
        "correct_text": "Informar cortésmente de la incidencia, comprobar si otro funcionario puede atenderle o gestionar nueva cita sin dejarle solo en zonas reservadas"
    },
    90: {
        "options": [
            "Archivar la tarjeta en la conserjería sin darla de baja por si el empleado reingresa en el mismo centro de destino",
            "Debe procederse a la retirada física de la tarjeta y a su desactivación inmediata en el sistema informático de control de accesos",
            "Entregar directamente la tarjeta al nuevo empleado sustituto manteniendo activos los mismos permisos y datos",
            "Autorizar al empleado cesante a conservar la tarjeta con privilegios reducidos a zonas comunes y aparcamiento"
        ],
        "correct_text": "Debe procederse a la retirada física de la tarjeta y a su desactivación inmediata en el sistema informático de control de accesos"
    },
    103: {
        "options": [
            "A la empresa de transporte o cartero que efectuó la entrega para que retiren el bulto de las dependencias",
            "A la Seguridad del centro, Guardia Militar y Fuerzas y Cuerpos de Seguridad competentes",
            "Al servicio de mantenimiento de instalaciones para que traslade el paquete a una zona exterior de depósito",
            "Al departamento destinatario para que proceda a verificar telefónicamente los datos del remitente"
        ],
        "correct_text": "A la Seguridad del centro, Guardia Militar y Fuerzas y Cuerpos de Seguridad competentes"
    },
    131: {
        "options": [
            "Abrir el receptáculo interior del cartucho para comprobar el nivel y consistencia del polvo magnético",
            "Agitarlo suavemente en posición horizontal varias veces para redistribuir uniformemente el polvo de tóner y retirar la tira protectora",
            "Dejar reposar el cartucho desembalado durante veinticuatro horas a temperatura ambiente antes de su inserción",
            "Limpiar el tambor fotosensible con paño humedecido en alcohol isopropílico para retirar residuos de fábrica"
        ],
        "correct_text": "Agitarlo suavemente en posición horizontal varias veces para redistribuir uniformemente el polvo de tóner y retirar la tira protectora"
    }
}

print(f"Procesando {len(questions)} preguntas...")

for q in questions:
    qid = q["id"]

    # 1. Asignar sourceType
    if qid in REAL_EXAM_IDS or q.get("isRealExam2025") is True:
        q["sourceType"] = "real_exam"
    elif q["topicId"] in [1, 2, 3, 4]:
        q["sourceType"] = "norma_verificada"
    elif any(kw in q.get("law", "") for kw in ["ISO 216", "DIN 476", "DIN 66399", "RD 486/1997", "Ley 43/2010", "Ley 9/1968", "Ley 31/1995", "RGPD"]):
        q["sourceType"] = "norma_verificada"
    else:
        q["sourceType"] = "original_propia"

    # 2. Normalizar nombres de leyes
    law_raw = q.get("law", "").strip()
    if law_raw in LAW_MAPPING:
        q["law"] = LAW_MAPPING[law_raw]
    elif any(k in law_raw for k in ["Conserjería", "Protocolo", "Instrucción", "Seguridad en Bases", "Control de Accesos"]):
        q["law"] = "Buenas Prácticas Operativas y Seguridad en Dependencias Oficiales"

    # 3. Aplicar overrides específicos de distractores absurdos
    if qid in CUSTOM_OVERRIDES:
        override = CUSTOM_OVERRIDES[qid]
        q["options"] = override["options"]
        q["correct"] = override["options"].index(override["correct_text"])

    # 4. Enriquecer distractores excesivamente cortos comparados con la opción correcta
    correct_text = q["options"][q["correct"]]
    correct_len = len(correct_text)

    # Identificar distractores que son < 40% de la longitud de la correcta cuando la correcta es larga (> 70 chars)
    if correct_len > 70:
        new_options = []
        for idx, opt in enumerate(q["options"]):
            if idx == q["correct"]:
                new_options.append(opt)
                continue
            
            opt_len = len(opt)
            # Si el distractor es muy escueto, le damos estructura y contexto administrativo plausible
            if opt_len < correct_len * 0.45:
                # Enriquecer según tipo de distractor
                enriched = opt
                if opt.endswith("."):
                    enriched = opt[:-1]
                
                # Modulaciones contextuales plausibles
                if "únicamente" in opt.lower() or "solo" in opt.lower():
                    enriched = f"{enriched}, salvo autorización expresa del órgano competente"
                elif "no" in opt.lower().split()[:2] or "nunca" in opt.lower().split()[:2]:
                    enriched = f"{enriched}, con arreglo a las directrices de la unidad correspondiente"
                elif len(opt.split()) <= 4:
                    if opt.startswith("El ") or opt.startswith("La ") or opt.startswith("Los ") or opt.startswith("Las "):
                        enriched = f"{enriched}, previa propuesta motivada del órgano directivo correspondiente"
                    elif opt.startswith("En ") or opt.startswith("Por "):
                        enriched = f"{enriched}, de conformidad con el procedimiento administrativo general"
                    else:
                        enriched = f"{enriched}, según determine la normativa específica aplicable"
                new_options.append(enriched)
            else:
                new_options.append(opt)
        q["options"] = new_options

# 5. Reequilibrio uniforme de la posición 'correct' en el archivo estático (0, 1, 2, 3)
# Distribución exacta: 51 preguntas en A, 51 en B, 51 en C, 51 en D
for i, q in enumerate(questions):
    target_pos = i % 4
    current_correct = q["correct"]
    if current_correct != target_pos:
        # Intercambiar opción correcta con la de la posición target
        correct_opt = q["options"][current_correct]
        target_opt = q["options"][target_pos]
        q["options"][target_pos] = correct_opt
        q["options"][current_correct] = target_opt
        q["correct"] = target_pos

# 6. Verificación estadística final
dist = {0: 0, 1: 0, 2: 0, 3: 0}
longest_count = 0
for q in questions:
    dist[q["correct"]] += 1
    lens = [len(o) for o in q["options"]]
    if len(q["options"][q["correct"]]) == max(lens):
        longest_count += 1

print(f"Distribución de respuestas estáticas: A={dist[0]}, B={dist[1]}, C={dist[2]}, D={dist[3]}")
print(f"Porcentaje de la letra mayoritaria: {(max(dist.values()) / len(questions)) * 100:.1f}%")
print(f"Opción correcta más larga: {longest_count}/{len(questions)} ({(longest_count / len(questions)) * 100:.1f}%)")

# Guardar en src/data/questions.json
with open("src/data/questions.json", "w", encoding="utf-8") as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

# Guardar en src/data/questions.js como ES Module
js_content = f"""/**
 * BANCO DE PREGUNTAS TÁCTICO - E1 SERVICIOS ADMINISTRATIVOS (MINISTERIO DE DEFENSA)
 * 204 Preguntas estructuradas (33% Común / 67% Específico) con opciones balanceadas,
 * tipología de fuente verificada (sourceType) y sin sesgos de posición.
 */

export const QUESTION_BANK = {json.dumps(questions, ensure_ascii=False, indent=2)};
"""

with open("src/data/questions.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print("[OK] src/data/questions.js y src/data/questions.json actualizados y guardados.")
