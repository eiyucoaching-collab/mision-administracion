# Misión Administración — Opo-Defensa E1

Plataforma de preparación intensiva y simulación táctica para las oposiciones de **Personal Laboral Fijo del Ministerio de Defensa**, modalidad **Turno Libre (40 plazas)** (Grupo Profesional **E1 – Servicios Administrativos**, regulado por el **IV Convenio Único de la AGE - IV CUAGE**).

Al concurrir por **Turno Libre**, el proceso selectivo se rige exclusivamente por el sistema de **oposición pura** (sin fase de concurso ni baremo de méritos). La calificación final y la obtención de plaza dependen al 100% de la nota neta en la fase de examen. La aplicación es una Single Page Application (SPA) moderna, **offline-first**, orientada a maximizar el rendimiento táctico en el examen.

---

## 🏛️ Estado de Verificación Jurídica y Fuentes

El contenido se somete a una estricta política de rigor normativo: **no se inventa contenido jurídico ni se afirma procedencia oficial sin respaldo documental contrastado**.

| Bloque / Componente | Estado de Verificación | Documentación y Fuentes |
| :--- | :--- | :--- |
| **Temas 1 a 4 (Bloque Común)** | **Auditado contra copias del BOE** | Citas literales, encabezados y URLs del BOE consolidado recogidos en [`docs/auditoria_contenido.md`](docs/auditoria_contenido.md). Copias HTML guardadas en [`docs/fuentes/boe/`](docs/fuentes/boe/). Sujeto a comprobación independiente. |
| **Temas 5 a 10 (Bloque Específico)** | **100% Oficial y Auditado** | Integración directa de los exámenes oficiales reales de febrero de 2025 (Ministerio de Defensa 01/02/2025 y AGE – MITECO 25/02/2025): control de accesos, paquetería y valija, reprografía/formatos DIN, correspondencia oficial, recados y prevención de riesgos laborales en oficinas (Ley 31/1995). Cero preguntas sintéticas. |
| **Modelo de Examen (Estructura)** | **Estructura Convocatoria 2026** | Ejercicio único de **60 preguntas ordinarias + 6 de reserva** (60 minutos, penalización oficial de −1/3 por fallo y corte mínimo aprobatorio de 30 puntos sobre 60). Ponderación: **33,3% Bloque Común** (20 preguntas ordinarias + 2 reservas R1-R2) y **66,7% Bloque Específico** (40 preguntas ordinarias + 4 reservas R3-R6). **Objetivo de entrenamiento recomendado para plaza: &ge; 50 puntos netos**. Examen oficial: **19 de diciembre de 2026** (Sede Murcia). |

---

## ⚡ Características Principales

1. **Simulador de Examen Táctico de Alto Rendimiento**:
   - Formato oficial Convocatoria 2026: 60 ordinarias (20 comunes + 40 específicas) + 6 reservas, penalización táctica (−0,33 / −0,25) y corte oficial en 30 puntos netos (con objetivo recomendado de entrenamiento al 65%).
   - Cálculo en tiempo real de **Valor Esperado (EV)** según nivel de confianza (🟢 Segura, 🟡 Duda 50/50, 🔴 Riesgo) y descarte táctico.
   - Bóveda de Fallos con algoritmo de repetición espaciada **Leitner SRS** (4 cajas: 1, 3, 7 y 14 días; requiere 3 aciertos seguros consecutivos para dominar).
   - Entrenador de Literalidad (**Cloze Deletion**) con extractos del BOE y manuales operativos.
   - Barajado algorítmico Fisher-Yates sin sesgo posicional (distribución equilibrada de opciones A, B, C, D).
   - Sustitución de preguntas anuladas por reservas del simulacro (R1–R6).
   - Separación estricta de métricas: las notas y porcentajes del simulacro oficial no se mezclan con pruebas parciales.

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
│       ├── syllabus.js         # Estructura del temario (común y específico T1-T10)
│       ├── questions.js        # Banco de 310 preguntas oficiales con trazabilidad normativa y sin sesgos
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
2. **Control de longitud de distractores**: La opción más larga y la más corta deben situarse en la banda del 15% al 48% (respetando la literalidad natural del BOE sin relleno artificial).
3. **Detector de muletillas sintéticas (Anti-Goodhart)**: Prohibición estricta de n-gramas repetidos (>3 opciones incorrectas y 0 en correctas) para garantizar distractores auténticos.
4. **Simulación ciega de 2.000 exámenes**: Un opositor que marque siempre la misma letra obtiene ~25% de aciertos y una tasa de aprobados del 0,00%.
5. **Respaldo normativo**: Ninguna pregunta puede carecer de `sourceType` válido, y todas las preguntas sin verificación oficial quedan excluidas de los simulacros oficiales.
6. **Seguridad Frontend (Anti-XSS)**: Sanitización estricta de entradas y renderizado dinámico seguro para proteger tokens PAT y credenciales almacenadas localmente.
