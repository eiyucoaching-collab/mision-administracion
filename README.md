# Misión Administración — Opo-Defensa E1

Plataforma de preparación intensiva y simulación táctica para las oposiciones de **Personal Laboral Fijo del Ministerio de Defensa** (Grupo Profesional **E1 – Servicios Administrativos**, regulado por el **IV Convenio Único de la AGE - IV CUAGE**).

La aplicación es una Single Page Application (SPA) moderna, **offline-first**, diseñada para garantizar la máxima fidelidad técnica y jurídica con respecto al proceso selectivo real.

---

## 🏛️ Estado de Verificación Jurídica y Fuentes

El contenido se somete a una estricta política de rigor normativo: **no se inventa contenido jurídico ni se afirma procedencia oficial sin respaldo documental contrastado**.

| Bloque / Componente | Estado de Verificación | Documentación y Fuentes |
| :--- | :--- | :--- |
| **Temas 1 a 4 (Bloque Común)** | **Auditado contra copias del BOE** | Citas literales, encabezados y URLs del BOE consolidado recogidos en [`docs/auditoria_contenido.md`](docs/auditoria_contenido.md). Copias HTML guardadas en [`docs/fuentes/boe/`](docs/fuentes/boe/). Sujeto a comprobación independiente. |
| **Temas 5 a 10 (Bloque Específico)** | ⏸️ **Pausado preventivamente** | En espera de la incorporación de los **Anexos VI y VII** oficiales en [`docs/fuentes/`](docs/fuentes/). Las preguntas con fuentes no consolidadas permanecen con `verified: false` y excluidas del simulacro oficial. |
| **Modelo de Examen (Estructura)** | ⚠️ *Modelo provisional pendiente del Anexo V* | El modelo actual (60 preguntas ordinarias + 6 de reserva, 60 minutos, penalización de -1/3 por fallo y corte en 30 puntos) es un **supuesto provisional del simulador**, sujeto a confirmación final mediante el **Anexo V** oficial de la convocatoria. |

---

## ⚡ Características Principales

1. **Simulador de Examen Táctico (Modelo Provisional)**:
   - Formato modelado sobre supuestos provisionales AGE (60 ord + 6 reservas, 60 min, corte 30, penalización -1/3) a la espera de confirmación por el Anexo V.
   - Modo formato 2025: simulacro estructurado con aviso de provisionalidad, sin atribuirse condición de examen real oficial al carecer de plantilla definitiva.
   - Barajado algorítmico Fisher-Yates sin sesgo posicional (distribución uniforme ~25% por opción).
   - Sustitución de preguntas anuladas por reservas del simulacro (R1–R6) y recálculo automático si las anulaciones exceden el cupo de reservas.
   - Temporizador dinámico proporcional por modalidad (oficial, bloques, temas monográficos).
   - Separación estricta de métricas: las notas y porcentajes del simulacro oficial no se mezclan con pruebas parciales ni desvirtúan el promedio.

2. **Arquitectura Offline-First Real**:
   - **Cero dependencias de CDN en runtime**: Tailwind CSS v4 compilado de forma local (`assets/css/app.min.css`).
   - Pila tipográfica local y progresiva con fuentes del sistema de alta legibilidad (`system-ui`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`).
   - Service Worker (`sw.js`) con precaching integral para estudio 100% desconectado en tren, metro o guardias.

3. **Persistencia Segura y Migración de Datos**:
   - Módulo desacoplado de almacenamiento con control de esquemas versionados (`src/storage/migration.js`).
   - Sanitización automática y retrocompatibilidad de historiales legados (v1 ➔ v2).
   - Exportación e importación completa de progreso en formato JSON.

4. **Técnicas de Estudio Cognitivo Activo**:
   - Subrayado selectivo mnemotécnico y detector visual de cifras sagradas.
   - Cuaderno inteligente de preguntas falladas con reaprovechamiento táctico.
   - Flashcards con autoevaluación espaciada y micro-drills de cifras con cronómetro.
   - Audio-repaso y esquemas jerárquicos de órganos de la AGE.

---

## 📁 Estructura del Repositorio

```text
├── index.html                  # Punto de entrada SPA
├── manifest.json               # Manifiesto PWA para instalación móvil y escritorio
├── sw.js                       # Service Worker con precache de activos estáticos
├── package.json                # Configuración npm y scripts de verificación
│
├── src/                        # Código fuente modular (ES Modules)
│   ├── app.js                  # Orquestador principal de UI, eventos y navegación
│   ├── exam/
│   │   └── engine.js           # Motor puro de simulación, barajado, calificación y métricas
│   ├── storage/
│   │   └── migration.js        # Migrador y versionado de LocalStorage (v1 -> v2)
│   ├── styles/
│   │   └── app.css             # Fuente CSS con directivas Tailwind v4 y estilos tácticos
│   └── data/                   # Banco de datos auditado
│       ├── syllabus.js         # Estructura del temario (común y específico)
│       ├── questions.js        # Banco de 204 preguntas con trazabilidad normativa
│       ├── cifras_y_trampas.js # Cifras sagradas y trampas oficiales contrastadas
│       ├── flashcards.js       # Tarjetas de memoria activa
│       ├── podcasts.js         # Pistas de audio-repaso
│       └── esquemas.js         # Esquemas visuales de organización administrativa
│
├── assets/                     # Recursos estáticos
│   ├── css/app.min.css         # Hoja de estilos autónoma compilada (offline)
│   ├── icons/                  # Iconografía PWA (192px, 512px)
│   └── voices/                 # Audios y efectos
│
├── docs/                       # Trazabilidad y documentación normativa
│   ├── auditoria_contenido.md  # Auditoría exhaustiva T1-T4 con citas literales del BOE
│   ├── diff_opciones.md        # Registro de equilibrado y control de longitud de opciones
│   └── fuentes/                # Repositorio de fuentes oficiales
│       ├── README.md           # Guía de requisitos de fuentes
│       └── boe/                # Textos consolidados del BOE guardados localmente
│
├── scripts/                    # Herramientas de automatización y CI
│   └── validate-data.mjs       # Script de validación estricta de banco de preguntas
│
├── tests/                      # Batería de pruebas automatizadas (Node.js Test Runner)
│   ├── exam_engine.test.mjs    # Tests del motor de examen, reservas, timer y métricas
│   ├── simulator_p0_bugs.test.mjs # Reproducción y blindaje contra sesgos P0
│   └── storage_migration.test.mjs # Tests de migración y resiliencia de LocalStorage
│
└── legacy/                     # Archivos y prototipos heredados no montados en index.html
```

---

## 🛠️ Comandos de Desarrollo y Calidad

Para ejecutar la suite de calidad y los tests automatizados:

```bash
# Instalar dependencias
npm install

# Ejecutar validación de datos y toda la suite de tests
npm test

# Ejecutar exclusivamente la auditoría del banco de preguntas
npm run validate

# Recompilar la hoja de estilos Tailwind CSS para offline
npm run build:css
```

---

## 🔒 Garantías de Calidad en CI

El flujo de integración continua (`.github/workflows/ci.yml`) verifica en cada cambio:
1. **Distribución balanceada de letras**: Ninguna opción (A, B, C, D) puede superar el 35% en el banco.
2. **Control de longitud de distractores**: La opción más larga y la más corta deben situarse en la banda del 15% al 35% para impedir sesgos cognitivos.
3. **Simulación ciega de 2.000 exámenes**: Un opositor que marque siempre la misma letra obtiene ~25% de aciertos y una tasa de aprobados del 0,00%.
4. **Respaldo normativo**: Ninguna pregunta puede carecer de `sourceType` válido, y todas las preguntas sin verificación oficial quedan excluidas de los simulacros oficiales.
