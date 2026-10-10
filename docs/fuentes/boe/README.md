# Archivo Oficial de Normas Consolidadas del BOE

Fecha de descarga y verificación: 9 de octubre de 2026

| Norma / Disposición | Archivo Local | URL BOE | Tamaño | Hash SHA-256 |
| :--- | :--- | :--- | :---: | :--- |
| **IV Convenio Único para el personal laboral de la AGE** | `BOE-A-2019-7414_IV-CUAGE.html` | [BOE-A-2019-7414](https://www.boe.es/buscar/act.php?id=BOE-A-2019-7414) | 451.5 KB | `4c0c086b31880cb2b8c62847ba87e34e79748cd020b5772cf92c512e5a3c2a85` |
| **Ley 40/2015 de Régimen Jurídico del Sector Público** | `BOE-A-2015-10566_Ley-40-2015-LRJSP.html` | [BOE-A-2015-10566](https://www.boe.es/buscar/act.php?id=BOE-A-2015-10566) | 888.4 KB | `06c62b797e442ed243158705ecb44eaf9ef8faa75eea9dacf6d19e54f780963c` |
| **Ley Orgánica 3/2007 para la igualdad efectiva de mujeres y hombres** | `BOE-A-2007-6115_LO-3-2007-Igualdad.html` | [BOE-A-2007-6115](https://www.boe.es/buscar/act.php?id=BOE-A-2007-6115) | 403.5 KB | `fed2dfc8f4f094e7e87e67cee93b114ebfe920d47cffb0f7ecb52c0b39ebc54d` |
| **Texto Refundido del Estatuto Básico del Empleado Público (TREBEP)** | `BOE-A-2015-11719_TREBEP.html` | [BOE-A-2015-11719](https://www.boe.es/buscar/act.php?id=BOE-A-2015-11719) | 504.5 KB | `0a95e82d5f4439edcac715a015f3d83d165656fffad5d9af7a0e0d91f2e9f5e3` |
| **Resolución 430/38310/2026 de convocatoria (Extracto BOE y relación de plazas)** | `BOE-A-2026-14677_Convocatoria-Defensa-E1.html` | [BOE-A-2026-14677](https://www.boe.es/buscar/act.php?id=BOE-A-2026-14677) | 68.9 KB | `e26728921abcf525a81a0437e21575ca4b1af397813f25f6ee5b3f724963d88b` |
| **Constitución Española de 1978 (consolidada)** | `BOE-A-1978-31229_Constitucion-Espanola.html` | [BOE-A-1978-31229](https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229) | 285.0 KB | `caa36ac2d4f8a3502ffbd10cb15c849c1bcda7290b9464da579b725283cbbe92` |
| **Ley 50/1997 del Gobierno** | `BOE-A-1997-25336_Ley-50-1997-Gobierno.html` | [BOE-A-1997-25336](https://www.boe.es/buscar/act.php?id=BOE-A-1997-25336) | 193.3 KB | `a34a83362bceadf7957995cb272b684aa410ecaaa6ee0c1df993efa4ae539698` |
| **Texto Refundido de la Ley del Estatuto de los Trabajadores (TRLET)** | `BOE-A-2015-11430_Estatuto-Trabajadores.html` | [BOE-A-2015-11430](https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430) | 918.1 KB | `a6968a7839cf504d76a2767accc0314fbbd366b45127f57c75095567c56efa6a` |

---

## Advertencia Crítica sobre el Documento BOE-A-2026-14677

1. **Naturaleza del documento:** El archivo local `BOE-A-2026-14677_Convocatoria-Defensa-E1.html` reproduce estrictamente la publicación aparecida en el BOE núm. 164, de 7 de julio de 2026 (7 páginas, páginas 93534 a 93540). Se trata de un **extracto de resolución administrativa** y la tabla con la relación de plazas convocadas por especialidad (40 plazas libre y 24 promoción interna para E1 Servicios Administrativos).
2. **NO son las bases completas:** Como indica expresamente el apartado Cuarto de dicha resolución, las bases específicas completas se publican en el portal web del Ministerio de Defensa y del Punto de Acceso General.
3. **Ausencia de Anexos V, VI y VII:** El extracto publicado en el BOE **NO incluye**:
   - **Anexo V:** Descripción de los ejercicios de la fase de oposición, número de preguntas, reservas, tiempo máximo, penalización de respuestas erróneas y nota de corte.
   - **Anexo VI:** Programa oficial de materias / temario del proceso selectivo (Temas 1 al 10).
   - **Anexo VII:** Baremo de méritos de la fase de concurso.
4. **Condición de los parámetros del simulador:**
   Hasta que el usuario o el tribunal aporten el texto íntegro del Anexo V, los siguientes parámetros del simulador se declaran formalmente como **SUPUESTOS METODOLÓGICOS Y TÉCNICOS (no normas verificadas)**:
   - Formato de 60 preguntas ordinarias + 6 de reserva.
   - Duración de 60 minutos.
   - Penalización de un tercio (-1/3) por respuesta incorrecta.
   - Nota de corte en el 50% (30 puntos netos sobre 60).
   - Truncamiento de la calificación final a un suelo de 0 puntos (`netScore = Math.max(0, rawNetScore)`).
