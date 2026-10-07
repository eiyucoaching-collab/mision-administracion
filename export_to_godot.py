import os
import re
import json

PROJECT_DIR = r"C:\Users\FUJITSU\.gemini\antigravity\scratch\mision-administracion"
OUTPUT_DIR = os.path.join(PROJECT_DIR, "godot_export")
os.makedirs(OUTPUT_DIR, exist_ok=True)

with open(os.path.join(PROJECT_DIR, "questions.js"), "r", encoding="utf-8") as f:
    text = f.read()

# Extraer cada objeto Javascript
matches = re.findall(r"\{\s*id:\s*(\d+)[\s\S]*?article:\s*\"([^\"]*)\"\s*\}", text)

questions = []
# Parseo robusto por campos de objeto
for m in re.finditer(r"\{\s*id:\s*(\d+)([\s\S]*?)\}", text):
    q_id = int(m.group(1))
    body = m.group(2)
    
    def get_val(key):
        res = re.search(r'' + key + r':\s*"(.*?)"', body)
        return res.group(1) if res else ""
    
    def get_int(key):
        res = re.search(r'' + key + r':\s*(\d+)', body)
        return int(res.group(1)) if res else 0

    opts_match = re.search(r'options:\s*\[([\s\S]*?)\]', body)
    options = []
    if opts_match:
        options = re.findall(r'"([^"]*)"', opts_match.group(1))

    questions.append({
        "id": q_id,
        "mission": get_int("mission"),
        "topic": get_val("topic"),
        "block": get_val("block"),
        "question": get_val("question"),
        "options": options,
        "correct": get_int("correct"),
        "explanation": get_val("explanation"),
        "law": get_val("law"),
        "article": get_val("article")
    })

output_path = os.path.join(OUTPUT_DIR, "questions.json")
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

print(f"Exportadas con exito {len(questions)} preguntas a {output_path}")
