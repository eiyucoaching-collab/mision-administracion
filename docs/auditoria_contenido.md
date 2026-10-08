# Auditoría de Verificación de Contenido Jurídico (BOE / Fuentes Oficiales)
**Proyecto:** Misión Administración (Opo-Defensa Grupo E1 – Servicios Administrativos, IV CUAGE)  
**Fecha de Auditoría:** Octubre 2026  
**Rama de Trabajo:** `mejora/verificacion-t1-t4`  
**Estado General:** Fase P1 — Temas 1 a 4 verificados contra BOE consolidado.

---

## 1. Resolución de Incidencias Legales y Dudas Previas

| Cuestión / Posible Error | Estado | Fundamento Jurídico en el BOE | Acción Realizada |
| :--- | :---: | :--- | :--- |
| **Periodo de prueba Grupo E1 (CUAGE)**<br>*(Discrepancia entre art. 26 en repo y art. 23 en legado)* | **CORREGIDO** | **Artículo 32 del IV CUAGE** (BOE núm. 118, de 17 de mayo de 2019) y **Base 7.9 de la Convocatoria** (Resolución 430/38310/2026, BOE-A-2026-14677):<br>• 1 mes para grupos profesionales E1, E2 y M1 con titulación exigida.<br>• 15 días laborables para el grupo E1 cuando no se exija titulación específica.<br>• 3 meses para grupos M2 y M3. | Sustituida la errónea cita de "art. 26" por **art. 32 IV CUAGE** en `questions.js` (Q37, Q38), `cifras_y_trampas.js` (id 16, 17 y trampa 5), `flashcards.js` (card 22), `podcasts.js` y `syllabus.js`. |
| **Rango y nombramiento de Subdelegados del Gobierno**<br>*(Duda art. 73 vs art. 74 Ley 40/2015)* | **OK** | **Artículo 74 de la Ley 40/2015** (LRJSP):<br>• Art. 74.1: Nombrados por el Delegado del Gobierno entre funcionarios de carrera Subgrupo A1.<br>• Art. 74.2: Tienen nivel orgánico de Subdirector General.<br>*(El art. 73 regula las competencias del Delegado del Gobierno)*. | Cita verificada y correcta en `cifras_y_trampas.js` (id 14) y `questions.js` (Q33, Q34). |
| **Planes de Igualdad en la AGE**<br>*(Cita art. 51 LO 3/2007 en pregunta 65)* | **CORREGIDO** | **Artículo 64 de la Ley Orgánica 3/2007** (*El Plan de Igualdad en la AGE*, obligación del Gobierno al inicio de cada legislatura) y **Disposición Adicional Séptima del TREBEP** (RDL 5/2015, obligación general de todas las Administraciones Públicas).<br>*(El art. 51 de la LO 3/2007 recoge únicamente criterios generales de actuación)*. | Actualizada la cita legal de Q65 a **Art. 64 LO 3/2007 / DA 7ª TREBEP** en `questions.js` y `questions.json`. |
| **Permisos por fallecimiento y conciliación**<br>*(Reforma TREBEP 2023 vs Personal Laboral)* | **OK** | Para el personal laboral fijo rige de forma prioritaria el **Capítulo VII (art. 37) del IV CUAGE** y, subsidiariamente, el art. 37 del Estatuto de los Trabajadores (TRLET), no siendo de aplicación automática el art. 48 del TREBEP para funcionarios en materias mejoradas por convenio colectivo. | Especificado en Q48 con cita expresa al **Art. 37 IV CUAGE**. |
| **Vigencia del Convenio Colectivo**<br>*(Comprobar si IV CUAGE sigue vigente)* | **OK** | El **IV Convenio Único para el personal laboral de la AGE** (Resolución de 13 de mayo de 2019, BOE 17/05/2019) continúa plenamente vigente en ultraactividad y acuerdos de desarrollo CIVEA. No se ha publicado ningún V CUAGE en el BOE. | Confirmado el marco de referencia en toda la aplicación. |
| **Datos Oficiales de Convocatoria**<br>*(Resolución 430/38310/2026, BOE-A-2026-14677)* | **VERIFICADO PARCIALMENTE** | **Bases Generales verificadas:**<br>• Grupo Profesional E1, Especialidad: Servicios Administrativos.<br>• Plazas: 40 turno libre + 24 promoción interna.<br>• Sistema de selección: Oposición en turno libre.<br>• Periodo de prueba: Base 7.9 remite al art. 32 IV CUAGE. | Datos incorporados en la interfaz y preguntas del banco. |
| **Estructura de Examen (60+6, 60 min, -1/3, corte 30, Anexos V-VII)** | **TODO_VERIFY** | Las bases generales no contienen el desglose numérico del ejercicio ni el temario (ubicados en los Anexos V, VI y VII no aportados). | Marcado como formato provisional con aviso visible `TODO_VERIFY (Pendiente Anexos Convocatoria)`. |
| **Preguntas Anuladas y Reservas (Plantilla Febrero 2025)** | **ELIMINADO / EN ESPERA** | Las bases de la convocatoria no mencionan preguntas anuladas previas. No se puede simular plantilla definitiva de 2025 sin el documento oficial del Tribunal Calificador en `docs/fuentes/`. | Eliminado el interruptor de plantilla 2025 ficticia; las reservas solo se activan si `annulled: true`. |

---

## 2. Auditoría Detallada del Bloque Común (Temas 1 a 4)

### Tema 1: Constitución Española de 1978 (IDs 1 a 17)
- **Marco Jurídico:** Constitución Española de 1978 (BOE núm. 311, de 29 de diciembre de 1978), con reformas de 1992 (art. 13.2), 2011 (art. 135) y 2024 (art. 49).
- **Resultados de Verificación:**
  - Q1–Q4: Art. 1.1, 1.2, 1.3 CE (Estado social y democrático, soberanía nacional, monarquía parlamentaria) — **OK**.
  - Q5: Art. 9.3 CE (Principios constitucionales de seguridad jurídica, legalidad, etc.) — **OK**.
  - Q6–Q7: Fechas y estructura formal (Aprobación Cortes 31/10/1978, 169 artículos) — **OK**.
  - Q8–Q9: Art. 12 (18 años) y Art. 17.2 (detención preventiva máx. 72 horas) — **OK**.
  - Q10: Art. 53.2 (tutela por Recurso de Amparo: art. 14 y Sección 1ª Cap. II) — **OK**.
  - Q11: Art. 54 CE / LO 3/1981 (Defensor del Pueblo: 5 años) — **OK**.
  - Q12: Art. 55.1 CE (Suspensión de derechos en estado de excepción o sitio, nunca alarma) — **OK**.
  - Q13–Q15: Reformas constitucionales (1992 art. 13.2, 2011 art. 135 estabilidad presupuestaria, 2024 art. 49 personas con discapacidad) — **OK**.
  - Q16–Q17: Art. 167 y 168 (Reforma ordinaria 3/5; reforma agravada con referéndum preceptivo) — **OK**.

### Tema 2: El Gobierno y la Administración General del Estado (IDs 18 a 34)
- **Marco Jurídico:** Ley 50/1997 del Gobierno y Ley 40/2015 de Régimen Jurídico del Sector Público.
- **Resultados de Verificación:**
  - Q18–Q20: Art. 97, 98.1 y 100 CE (Dirección por el Gobierno, composición y nombramiento de Ministros) — **OK**.
  - Q21–Q22: Ley 50/1997 (Art. 5.3 secreto de deliberaciones del Consejo de Ministros; Art. 8.2 presidencia Comisión General Secretarios de Estado) — **OK**.
  - Q23–Q27: Art. 112 y 113 CE (Moción de censura: 1/10 propuesta, mayoría absoluta; Cuestión de confianza: Presidente con deliberación previa, mayoría simple) — **OK**.
  - Q28–Q29: Ley 40/2015 (Art. 55.2 órganos superiores: Ministros y Secretarios de Estado; Art. 55.3 órganos directivos: Subsecretarios, Secretarios Generales, etc.; Subdirector General órgano directivo no alto cargo) — **OK**.
  - Q30: Art. 63.2 Ley 40/2015 (Nombramiento de Subsecretarios por Real Decreto del Consejo de Ministros entre funcionarios A1) — **OK**.
  - Q31–Q32: Art. 72.1 Ley 40/2015 (Delegados del Gobierno: rango de Subsecretario, nombrados por Real Decreto a propuesta del Presidente) — **OK**.
  - Q33–Q34: Art. 74 Ley 40/2015 (Subdelegados del Gobierno: rango de Subdirector General, nombrados por el Delegado del Gobierno entre funcionarios A1) — **OK**.

### Tema 3: Régimen Jurídico del Personal Laboral de la AGE (IDs 35 a 51)
- **Marco Jurídico:** IV CUAGE (BOE 17/05/2019), Real Decreto Legislativo 2/2015 (TRLET) y Real Decreto Legislativo 5/2015 (TREBEP).
- **Resultados de Verificación:**
  - Q35–Q36: Art. 8.2 ET (Exigencia de forma escrita en contratos de la Administración y presunción de indefinido a jornada completa si falta) — **OK**.
  - Q37: Art. 32.1 IV CUAGE y Base 7.9 (Periodo de prueba Grupo E1 con titulación: 1 mes) — **CORREGIDO** *(antes citado art. 26)*.
  - Q38: Art. 32.1 IV CUAGE (Periodo de prueba Grupo E1 sin titulación específica: 15 días laborables) — **CORREGIDO** *(antes citado art. 26)*.
  - Q39–Q40: Art. 49.1.c y Art. 45.2 ET (Causas de extinción vs suspensión que exonera de trabajar y remunerar) — **OK**.
  - Q41–Q42: Art. 54 ET (Despido disciplinario por incumplimiento grave y culpable; la huelga pacífica legal no es causa) — **OK**.
  - Q43: Art. 98 TREBEP / CUAGE (Expediente disciplinario contradictorio preceptivo antes de sanciones graves o despido) — **OK**.
  - Q44: Art. 16 IV CUAGE (Titulación Grupo E1: Graduado en ESO o Certificado de Profesionalidad nivel 1) — **CORREGIDO** *(precisado art. 16)*.
  - Q45: Resolución 430/38310/2026 (Especialidad 'Servicios Administrativos' con 40 plazas libre + 24 PI) — **ACTUALIZADO**.
  - Q46: Art. 14.2 ET (Rescisión sin preaviso ni indemnización durante el periodo de prueba) — **OK**.
  - Q47: Art. 108 LRJS (Improcedencia o nulidad por falta de forma escrita o expediente previo) — **OK**.
  - Q48: Art. 37 IV CUAGE (Cómputo de permisos retribuidos como tiempo de trabajo efectivo) — **CORREGIDO** *(precisado art. 37)*.
  - Q49: Art. 55.1 ET (Audiencia a los miembros de la representación sindical en expediente previo a delegado) — **OK**.
  - Q50: Art. 3.5 ET (Irrenunciabilidad de derechos laborales) — **OK**.
  - Q51: Art. 52 ET (Ineptitud sobrevenida es causa de despido objetivo, no disciplinario) — **OK**.

### Tema 4: Políticas de Igualdad y No Discriminación (IDs 52 a 68)
- **Marco Jurídico:** Ley Orgánica 3/2007, Ley Orgánica 1/2004, RDL 1/2013 (TRLGDPD), Ley 39/2006 (Dependencia), Ley 15/2022 y Ley 4/2023.
- **Resultados de Verificación:**
  - Q52–Q55: LO 3/2007 (Art. 6.1 discriminación directa, Art. 6.2 discriminación indirecta, Art. 7.1 acoso sexual) — **OK**.
  - Q56–Q57: LO 1/2004 (Art. 1 ámbito subjetivo sobre mujeres por cónyuge o análoga afectividad; Art. 10 publicidad ilícita vejatoria) — **OK**.
  - Q58: Art. 4 RDL 1/2013 (Condición legal de persona con discapacidad: grado >= 33%) — **OK**.
  - Q59–Q60, Q67: Art. 26 Ley 39/2006 (Grados de dependencia: Grado I Moderada, Grado II Severa con ayuda 2-3 veces/día, Grado III Gran Dependencia con pérdida total de autonomía) — **OK**.
  - Q61: Art. 1 Ley 15/2022 (Objeto de garantía integral de igualdad de trato) — **OK**.
  - Q62: Art. 17 Ley 4/2023 (Prohibición absoluta de terapias o métodos de aversión de orientación sexual) — **OK**.
  - Q63: Art. 49 y 82 TREBEP / LO 1/2004 (Derecho a adaptación, reducción y traslado para empleadas víctimas de violencia de género) — **OK**.
  - Q64: Art. 13 LO 3/2007 (Inversión de la carga de la prueba en procesos por discriminación de género) — **OK**.
  - Q65: Art. 64 LO 3/2007 y DA 7ª TREBEP (Obligación de Planes de Igualdad en las Administraciones Públicas) — **CORREGIDO** *(antes citado art. 51)*.
  - Q66: Art. 2 RDL 1/2013 (Diseño universal y accesibilidad universal) — **OK**.
  - Q68: Art. 10 LO 3/2007 (Nulidad de pleno derecho de cláusulas discriminatorias) — **OK**.

---

## 3. Próximos Pasos (Pendiente de Aportación de Documentación Fuente)

1. En cuanto el usuario suba los PDFs de los **Anexos V, VI y VII de la Resolución 430/38310/2026** a `docs/fuentes/`:
   - Auditar el número exacto de preguntas ordinarias y de reserva.
   - Auditar la penalización oficial exacta y el corte de calificación.
   - Contrastar los epígrafes oficiales del programa para validar la cobertura 1:1 de los Temas 5 al 10.
2. En cuanto se aporte la plantilla oficial definitiva del Tribunal Calificador:
   - Activar las preguntas de reserva sobre las preguntas realmente anuladas identificadas en el documento oficial.
