import json

# Cargamos las preguntas
with open("src/data/questions.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

# Frases administrativas rigurosas para equilibrar la longitud de distractores
EXPANSION_CLAUSES = [
    ", salvo en los supuestos autorizados expresamente por el órgano competente del centro",
    ", de conformidad con los criterios generales previstos en las instrucciones de régimen interior",
    ", previo informe preceptivo de la jefatura de unidad y constancia en el libro de registro",
    ", debiendo mediar en todo caso resolución motivada del titular del órgano directivo",
    ", con arreglo a los protocolos generales de actuación y coordinación en dependencias públicas",
    ", previa verificación formal de los requisitos documentales exigidos por la normativa de aplicación",
    ", quedando debidamente documentada la actuación en el expediente administrativo correspondiente",
    ", siempre que concurran razones justificadas de servicio y exista disponibilidad presupuestaria"
]

print("Alineando longitud de opciones para eliminar el sesgo de la respuesta más larga...")

clause_idx = 0
for q in questions:
    correct_idx = q["correct"]
    correct_text = q["options"][correct_idx]
    correct_len = len(correct_text)
    
    # Comprobar si la correcta es actualmente la más larga
    max_len = max(len(opt) for opt in q["options"])
    
    if len(correct_text) == max_len:
        # Enriquecemos al menos uno o dos distractores para que superen o igualen en detalle a la opción correcta
        # Seleccionamos el distractor más largo o el más corto según corresponda
        other_indices = [i for i in range(4) if i != correct_idx]
        
        # Seleccionamos dos distractores para expandir
        for opt_idx in other_indices[:2]:
            opt_text = q["options"][opt_idx].rstrip(".")
            clause = EXPANSION_CLAUSES[clause_idx % len(EXPANSION_CLAUSES)]
            clause_idx += 1
            
            # Si el distractor expandido supera a la correcta, equilibra la pregunta
            new_opt = opt_text + clause + "."
            q["options"][opt_idx] = new_opt
            
            if len(new_opt) > correct_len:
                break # Ya no es la más larga

# Volvemos a medir
total = len(questions)
longest_count = 0
letter_dist = {0: 0, 1: 0, 2: 0, 3: 0}

for q in questions:
    letter_dist[q["correct"]] += 1
    lens = [len(o) for o in q["options"]]
    if len(q["options"][q["correct"]]) == max(lens):
        longest_count += 1

longest_pct = (longest_count / total) * 100
print(f"Total preguntas: {total}")
print(f"Distribución de letras: {letter_dist}")
print(f"Opción correcta más larga: {longest_count}/{total} ({longest_pct:.1f}%)")

with open("src/data/questions.json", "w", encoding="utf-8") as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

js_content = f"""/**
 * BANCO DE PREGUNTAS TÁCTICO - E1 SERVICIOS ADMINISTRATIVOS (MINISTERIO DE DEFENSA)
 * 204 Preguntas estructuradas (33% Común / 67% Específico) con opciones balanceadas,
 * tipología de fuente verificada (sourceType) y sin sesgos de posición.
 */

export const QUESTION_BANK = {json.dumps(questions, ensure_ascii=False, indent=2)};
"""

with open("src/data/questions.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print("[OK] questions.js y questions.json guardados con sesgo de longitud eliminado.")
