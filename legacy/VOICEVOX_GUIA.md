# 🎌 Guía de Instalación: VOICEVOX + Sprites Anime — Misión Administración v22.0

## ¿Qué es VOICEVOX?
[VOICEVOX](https://voicevox.hiroshiba.jp/) es el motor TTS de anime más popular de Japón.
- Voces de personajes de anime ultra-naturales (Zundamon, Shikoku Metan, etc.)
- Gratuito, sin límites, 100% local (no envía datos a internet)
- Usado en millones de vídeos de YouTube y VTubers

---

## 📦 PASO 1 — Instalar VOICEVOX

**Opción A: ZIP Portable (se está descargando automáticamente)**

Cuando termine la descarga, encontrarás `voicevox.zip` en la carpeta del juego.

```
mision-administracion/
└── voicevox.zip  ← descomprimir aquí
```

Una vez descomprimido:
```
voicevox/
└── VOICEVOX.exe  ← doble click para abrir
```

**Opción B: Instalador web**
1. Visita https://voicevox.hiroshiba.jp/
2. Descarga "VOICEVOX 0.25.2 for Windows (CPU)"
3. Instala normalmente

---

## ▶️ PASO 2 — Arrancar VOICEVOX

1. Abre **VOICEVOX.exe** (o la aplicación instalada)
2. Espera a que cargue (~30 segundos la primera vez)
3. El servidor local arranca en `http://127.0.0.1:50021`

> **No es necesario mantener la ventana de VOICEVOX abierta en primer plano.**
> Puedes minimizarla. El servidor seguirá activo.

---

## 🎙️ PASO 3 — Generar las voces

Con VOICEVOX arriba, abre la carpeta del juego y ejecuta:

```powershell
cd C:\Users\FUJITSU\.gemini\antigravity\scratch\mision-administracion
pip install aiohttp
python generate_voicevox_voices.py
```

Esto generará **24 MP3** de alta calidad en `assets/voices/` reemplazando los anteriores.

---

## 🎮 PASO 4 — Jugar

El juego detecta VOICEVOX automáticamente cuando está activo:

```
http://localhost:8080
```

El indicador de voz en el juego mostrará: **🎌 VOICEVOX activo**

Si VOICEVOX no está arriba, usa automáticamente los MP3 pre-generados de edge-tts (Microsoft Neural TTS).

---

## 🎨 Sprites de Anime

Los personajes ahora usan sprites PNG reales del pack de **Sutemo** (itch.io):

| Personaje | Descripción |
|-----------|-------------|
| Valeria   | Rosa rizado, flor en el pelo, hoodie verde |
| Aoi       | Negro bob, top blanco |
| Maya      | Rubio bob, uniforme marino |
| Sakura    | Castaño largo, chaqueta roja |
| Elena     | Rosa largo, bufanda |
| Rin       | Plateado corto, elegante |

Los sprites tienen:
- ✅ Animación de flotación suave
- ✅ Indicador de sincronía labial al hablar
- ✅ Reacciones de emoción (sonrojo, estrellas, etc.)
- ✅ Animación de entrada con slide
- ✅ Aura de brillo personalizada por personaje
- ✅ Clic para reacción táctil con voz

---

## 🔑 ElevenLabs (opcional, máxima calidad)

Si tienes una cuenta de ElevenLabs:
1. Ve a https://elevenlabs.io → API Keys → copia tu key
2. Ejecuta: `python generate_elevenlabs_voices.py TU_API_KEY`

---

*Misión Administración v22.0 — E1 Servicios Administrativos Defensa*
