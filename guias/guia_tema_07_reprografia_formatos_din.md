# GUÍA OFICIAL DE ESTUDIO TÉCNICO: TEMA 7 (ESPECÍFICO 3)
## MANEJO DE MÁQUINAS REPRODUCTORAS, REPROGRAFÍA Y FORMATOS NORMALIZADOS DIN

---

### 1. MARCO TÉCNICO Y NORMALIZACIÓN INTERNACIONAL
* **Ámbito funcional:** Talleres de reprografía, centros de impresión digital y equipos multifunción departamentales en sedes del Ministerio de Defensa.
* **Normas reguladoras:**
  - Norma Internacional **ISO 216** (adoptada en España como UNE-EN ISO 216, derivada del estándar alemán **DIN 476**).
  - Norma **DIN 66399** sobre destrucción y trituración segura de soportes de datos.
  - Pliegos de Prescripciones Técnicas Centralizadas de la AGE para papel y reprografía.

---

### 2. LA SERIE DIN 476 / ISO 216: PRINCIPIO MATEMÁTICO Y MEDIDAS EXACTAS

#### A. Principio Geométrico Fundamental ($1 : \sqrt{2}$)
La serie normalizada DIN A se basa en un principio matemático universal: la relación entre el ancho ($x$) y el largo ($y$) de cualquier hoja de la serie es siempre constante e igual a **$1 : \sqrt{2}$** ($1 : 1,4142$).
* **Propiedad matemática:** Al doblar o cortar por la mitad una hoja por su lado más largo, el formato resultante conserva exactamente las mismas proporciones geométricas que el original.
* **Formato base DIN A0:** Tiene una superficie exacta de **1 metro cuadrado ($1\text{ m}^2$)**.

```
┌────────────────────────────────────────────────────────────────────────┐
│             ESQUEMA DE DIVISIÓN DE LA SERIE DIN A (ISO 216)            │
└────────────────────────────────────────────────────────────────────────┘
                      ┌───────────────────────┐
                      │                       │
                      │        DIN A0         │ Superficie = 1 m²
                      │    (841 x 1189 mm)    │ (Equivale a 16 DIN A4)
                      │                       │
                      └───────────┬───────────┘
                                  │ (Dividido por la mitad)
                      ┌───────────┴───────────┐
                      │        DIN A1         │ Superficie = 0,5 m²
                      │    (594 x 841 mm)     │ (Equivale a 8 DIN A4)
                      │                       │
                      └───────────┬───────────┘
                                  │ (Dividido por la mitad)
                      ┌───────────┴───────────┐
                      │        DIN A2         │ Superficie = 0,25 m²
                      │    (420 x 594 mm)     │ (Equivale a 4 DIN A4)
                      │                       │
                      └───────────┬───────────┘
                                  │ (Dividido por la mitad)
                      ┌───────────┴───────────┐
                      │        DIN A3         │ Doble de un A4
                      │    (297 x 420 mm)     │ (Equivale a 2 DIN A4)
                      │                       │
                      └───────────┬───────────┘
                                  │ (Dividido por la mitad)
                      ┌───────────┴───────────┐
                      │        DIN A4         │ Formato estándar
                      │    (210 x 297 mm)     │ administrativo
                      │                       │
                      └───────────┬───────────┘
                                  │ (Dividido por la mitad)
                      ┌───────────┴───────────┐
                      │        DIN A5         │ Mitad de un A4
                      │    (148 x 210 mm)     │ (Cuartilla)
                      └───────────────────────┘
```

#### B. Tabla Maestra de Medidas Oficiales para el Examen:
| Formato Normalizado | Medidas Exactas en Milímetros (mm) | Superficie / Proporción | Equivalencia en DIN A4 |
| :--- | :--- | :--- | :--- |
| **DIN A0** | **$841 \times 1189\text{ mm}$** | $1\text{ m}^2$ (Superficie base) | 16 folios DIN A4 |
| **DIN A1** | **$594 \times 841\text{ mm}$** | $0,5\text{ m}^2$ | 8 folios DIN A4 |
| **DIN A2** | **$420 \times 594\text{ mm}$** | $0,25\text{ m}^2$ | 4 folios DIN A4 |
| **DIN A3** | **$297 \times 420\text{ mm}$** | Doble de un DIN A4 | 2 folios DIN A4 |
| **DIN A4** | **$210 \times 297\text{ mm}$** | Formato de uso general | 1 folio DIN A4 |
| **DIN A5** | **$148 \times 210\text{ mm}$** | Mitad exacta de un DIN A4 | 0,5 folios DIN A4 |

*(Nota de examen: No confundir el DIN A4 con el formato "Folio tradicional español" que medía $215 \times 315\text{ mm}$).*

---

### 3. GRAMAJE DEL PAPEL Y CÁLCULO DE PESOS
* **Definición de Gramaje:** Peso expresado en gramos de **un metro cuadrado ($1\text{ m}^2$)** de papel ($\text{g/m}^2$).
* **Gramaje estándar de oficina en la AGE:** **$80\text{ g/m}^2$** (peso idóneo para fotocopiadoras e impresoras láser que evita atascos mecánicos y transparencias).
* **Cálculo de peso de una hoja DIN A4 de $80\text{ g/m}^2$:**
  $$\text{Superficie de DIN A4} = \frac{1}{16}\text{ m}^2$$
  $$\text{Peso de 1 hoja A4} = \frac{80\text{ g}}{16} = \mathbf{5\text{ gramos}}$$
* **Cartulinas y portadas:** Oscilan entre $160\text{ g/m}^2$ y $250\text{ g/m}^2$. Deben introducirse por la bandeja manual lateral (*bypass*) para no forzar los rodillos de alimentación continua.

---

### 4. EQUIPOS REPROGRÁFICOS Y OPERACIONES DE PRIMER NIVEL

#### A. Equipos Multifunción (Impresora / Fotocopiadora / Escáner)
1. **Platina (Cristal de exposición):** Empleada para documentos encuadernados, grapados, hojas arrugadas o de gramaje no estándar.
2. **Alimentador Automático (ADF / RADF):** Permite procesar fajos de hojas sueltas a simple o doble cara sin intervención manual hoja por hoja.
3. **Consumibles:**
   - **Tóner:** Polvo seco finísimo a base de polímeros y pigmentos. Al cambiarlo, agitar suavemente en sentido horizontal antes de su inserción en la ranura.
   - **Tambor fotosensible (Drum):** Pieza electrostática sensible a la luz; no debe tocarse directamente con los dedos ni exponerse prolongadamente a la luz ambiente.

#### B. Protocolo de Resolución de Atascos de Papel
```
  [1] LOCALIZAR EL PUNTO DE ATASCO en la pantalla interactiva (sección A, B, C, fusor...).
       │
  [2] ABRIR COMPUERTAS utilizando exclusivamente las palancas indicadoras (colores verde/azul).
       │
  [3] EXTRACCIÓN DEL PAPEL:
       ├─ Tirar con AMBAS MANOS de manera uniforme y firme.
       ├─ Tirar SIEMPRE en el SENTIDO DE AVANCE natural de arrastre de los rodillos.
       └─ JAMÁS tirar en sentido contrario ni de forma brusca para evitar desgarros.
       │
  [4] PROHIBICIÓN RADICAL:
       └─ NUNCA emplear objetos punzantes o metálicos (tijeras, destornilladores, cúteres),
          ya que rayan de forma irreversible el tambor fotosensible o el rodillo fusor térmico.
```

#### C. Encuadernadoras y Destructoras de Papel
* **Encuadernación de espiral o canutillo:** Requiere perforación previa alineando el tope de papel para que los agujeros queden equidistantes de los extremos.
* **Destructoras de papel (Norma DIN 66399):**
  - **Niveles P-1 y P-2:** Corte en tiras largas (documentos generales).
  - **Niveles P-3 y P-4:** Corte cruzado en partículas (datos personales confidenciales / RGPD).
  - **Niveles P-5, P-6 y P-7:** Micropartículas de máxima seguridad (materias clasificadas de Defensa / Secretos Oficiales).

---

### 5. PREGUNTAS TRAMPAS EN EL EXAMEN OFICIAL
1. *"¿Un DIN A3 es la mitad de un DIN A4?"* $\rightarrow$ **FALSO.** El DIN A3 es el **DOBLE** del DIN A4 ($297 \times 420\text{ mm}$).
2. *"¿Qué peso tiene un paquete de 500 folios DIN A4 de $80\text{ g/m}^2$?"* $\rightarrow$ Cada folio pesa $5\text{ g}$; por tanto, $500 \times 5\text{ g} = \mathbf{2,5\text{ kg}}$.
3. *"¿Qué herramienta se usa para quitar papel pegado al fusor térmico?"* $\rightarrow$ Ninguna metálica; se deja enfriar el equipo y se retira manualmente siguiendo las guías de la máquina.
