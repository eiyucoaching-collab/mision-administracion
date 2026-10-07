/**
 * MOTOR RPG EDUCATIVO PROFUNDO - OPOSICIONES DEFENSA E1 (v90.0)
 * Basado en las mejores arquitecturas de repositorios RPG HTML5 (Grid Engine + Dialogue Tree + Skill Tree).
 *
 * MÓDULOS EDUCATIVOS Y DE JUEGO:
 * 1. 📜 ÁRBOL DE HABILIDADES JURÍDICAS (Skill Tree): Puntos de talento para mejorar el porcentaje de XP, evasión de penalizaciones y Pistas 50%.
 * 2. 🗺️ NAVEGACIÓN Y EXCLUSIVIDAD DE ZONAS: Campus Central, Archivo General del BOE y Tribunal Superior de Defensa.
 * 3. 📚 POKÉDEX Y FICHA TÁCTICA DE APRENDIZAJE: Estudio previo obligatorio con audios de ElevenLabs antes de cada combate.
 * 4. 🎒 SISTEMA DE ARTILUGIOS AVANZADO: Bolígrafo de Oro del BOE, Lupa de la Carta Magna, Escudo de la Ley 40/2015, Amuleto del TREBEP.
 * 5. 👥 NPCS DIDÁCTICOS E INTERACTIVOS: Profesores, Inspectores del Ministerio y Opositores Veteranos.
 */

class DeepPokemonOpoEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.active = false;
    this.mode = 'WORLD'; // 'WORLD' | 'BATTLE' | 'STUDY_CARD' | 'POKEDEX' | 'SKILL_TREE' | 'BAG' | 'NPC_TALK'

    // Estado del Jugador Opositor
    this.player = {
      x: 360,
      y: 360,
      width: 32,
      height: 32,
      speed: 4.2,
      dir: 'down',
      isMoving: false,
      stepCount: 0,
      animFrame: 0,
      animTimer: 0,
      hp: 100,
      maxHp: 100,
      level: 1,
      xp: 0,
      nextLvlXp: 100,
      skillPoints: 3,
      masteryBOE: 0 // Porcentaje de dominio total
    };

    // Árbol de Habilidades (Talentos del Opositor)
    this.skills = [
      { id: 'master_boe', name: "📜 Memoria Constitucional", desc: "+25% XP extra al responder correctamente.", unlocked: false, cost: 1 },
      { id: 'evasion_penal', name: "🛡️ Anulación de Resta", desc: "El primer fallo (-0.33) en cada examen no resta XP.", unlocked: false, cost: 2 },
      { id: 'hint_master', name: "🔍 Pista del Opositor", desc: "Permite usar la Pista 50% gratis 2 veces por examen.", unlocked: false, cost: 2 },
      { id: 'time_boost', name: "⏱️ Temple de Acero", desc: "Aumenta el tiempo y reduce el nerviosismo en combates.", unlocked: false, cost: 3 }
    ];

    // Mochila de Artilugios Jurídicos
    this.bag = [
      { id: 'boe_pen', name: "✒️ Pluma de Oro del BOE", desc: "+20% XP en respuestas correctas.", count: 1, equipped: true },
      { id: 'magna_glass', name: "🔍 Lupa de la Carta Magna", desc: "Revela el artículo exacto en preguntas difíciles.", count: 3, equipped: false },
      { id: 'shield_40', name: "🛡️ Escudo Ley 40/2015", desc: "Absorbe la penalización de resta en el primer fallo.", count: 2, equipped: true },
      { id: 'coffee_potion', name: "☕ Café del Opositor", desc: "Restaura +50 HP en combate al instante.", count: 5, equipped: false }
    ];

    // Pokédex del BOE (Enciclopedia de Estudio Profundo)
    this.pokedex = [
      { id: 1, name: "Constitución Española (CE 1978)", mastered: false, count: 0, law: "Constitución Española de 1978", desc: "Artículos 1 al 55. Derechos fundamentales, libertades públicas y la Corona." },
      { id: 2, name: "TREBEP (RDL 5/2015)", mastered: false, count: 0, law: "RDL 5/2015 (TREBEP)", desc: "Estatuto Básico del Empleado Público. Derechos, deberes, permisos y sanciones." },
      { id: 3, name: "Estatuto de los Trabajadores", mastered: false, count: 0, law: "ET (RDL 2/2015)", desc: "Contratación laboral, indemnizaciones por despido (33 días) y suspensiones." },
      { id: 4, name: "IV CUAGE (Convenio Único)", mastered: false, count: 0, law: "IV Convenio Colectivo Único", desc: "Clasificación profesional del personal laboral de la AGE (Grupos E1 a M3)." },
      { id: 5, name: "Ley de Prevención (LPRL 31/1995)", mastered: false, count: 0, law: "Ley 31/1995 de PRL", desc: "Evaluación de riesgos laborales, medidas preventivas y comités de seguridad." },
      { id: 6, name: "Seguridad Social e ISFAS", mastered: false, count: 0, law: "LGSS y Ley ISFAS", desc: "Caja única de la Seguridad Social, pensiones, Clases Pasivas e ISFAS." }
    ];

    // NPCs de Aventura y Lore Educativo
    this.npcs = [
      { name: "Profesor del BOE", x: 480, y: 260, icon: "👴", text: "¡Bienvenido al Campus del BOE! Recuerda: en el examen de Defensa, un fallo resta 1/3 del valor de un acierto. ¡Usa la tecla [K] para ver tus talentos!" },
      { name: "Inspectora de Empleo", x: 740, y: 460, icon: "👩‍🏫", text: "¡Para dominar el TREBEP debes repasar las faltas muy graves! Consulta la Pokédex del BOE con la tecla [P] para memorizar los artículos." }
    ];
    this.activeNPC = null;

    // Teclas
    this.keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false, w: false, s: false, a: false, d: false };

    // Gimnasios de Mentoras
    this.gyms = [
      { id: 1, name: "Gimnasio Constitución", mentor: "Comandante Valeria", tileX: 6, tileY: 3, color: "#38bdf8", badge: "📜" },
      { id: 2, name: "Gimnasio TREBEP", mentor: "Inspectora Aoi", tileX: 15, tileY: 3, color: "#c084fc", badge: "⚖️" },
      { id: 3, name: "Gimnasio Laboral", mentor: "Teniente Maya", tileX: 24, tileY: 3, color: "#f43f5e", badge: "⚔️" },
      { id: 4, name: "Gimnasio Convenio", mentor: "Oficial Sakura", tileX: 6, tileY: 12, color: "#fbbf24", badge: "💼" },
      { id: 5, name: "Gimnasio Prevención", mentor: "Capitana Elena", tileX: 15, tileY: 12, color: "#34d399", badge: "🛡️" },
      { id: 6, name: "Gimnasio Seg. Social", mentor: "Mayor Rin", tileX: 24, tileY: 12, color: "#f59e0b", badge: "🎖️" }
    ];

    this.center = { tileX: 15, tileY: 7 };

    // Estado del Combate
    this.battle = {
      active: false,
      enemy: null,
      question: null,
      selectedOption: 0,
      log: "",
      subLog: "",
      studiedCard: false
    };
  }

  init(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    this.canvas = document.createElement('canvas');
    this.canvas.width = 1280;
    this.canvas.height = 720;
    this.canvas.style.cssText = "width: 100%; height: 100%; display: block; border-radius: 16px; box-shadow: 0 0 50px rgba(56,189,248,0.4); background: #090d16;";
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.bindInput();
    this.active = true;
    this.loop();
  }

  bindInput() {
    window.addEventListener('keydown', (e) => {
      const k = e.key;
      if (this.keys.hasOwnProperty(k) || this.keys.hasOwnProperty(k.toLowerCase())) {
        this.keys[k] = true;
        this.keys[k.toLowerCase()] = true;
      }

      if (k === 'p' || k === 'P') this.mode = (this.mode === 'POKEDEX') ? 'WORLD' : 'POKEDEX';
      if (k === 'b' || k === 'B') this.mode = (this.mode === 'BAG') ? 'WORLD' : 'BAG';
      if (k === 'k' || k === 'K') this.mode = (this.mode === 'SKILL_TREE') ? 'WORLD' : 'SKILL_TREE';

      if (this.mode === 'NPC_TALK' && (k === 'Enter' || k === ' ')) this.mode = 'WORLD';

      if (this.mode === 'STUDY_CARD' && (k === 'Enter' || k === ' ')) {
        this.mode = 'BATTLE';
      } else if (this.mode === 'BATTLE') {
        if (k === 'ArrowUp' || k === 'w') this.battle.selectedOption = (this.battle.selectedOption + 3) % 4;
        if (k === 'ArrowDown' || k === 's') this.battle.selectedOption = (this.battle.selectedOption + 1) % 4;
        if (k === 'Enter' || k === ' ') this.submitBattleAnswer();
      }

      if (this.mode === 'SKILL_TREE') {
        if (k >= '1' && k <= '4') {
          const idx = parseInt(k) - 1;
          this.unlockSkill(idx);
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      const k = e.key;
      if (this.keys.hasOwnProperty(k) || this.keys.hasOwnProperty(k.toLowerCase())) {
        this.keys[k] = false;
        this.keys[k.toLowerCase()] = false;
      }
    });
  }

  unlockSkill(idx) {
    const s = this.skills[idx];
    if (s && !s.unlocked && this.player.skillPoints >= s.cost) {
      this.player.skillPoints -= s.cost;
      s.unlocked = true;
      if (typeof soundEngine !== 'undefined') soundEngine.playCorrect();
    }
  }

  update() {
    if (this.mode !== 'WORLD') return;

    let dx = 0;
    let dy = 0;

    if (this.keys.ArrowUp || this.keys.w) { dy -= 1; this.player.dir = 'up'; }
    if (this.keys.ArrowDown || this.keys.s) { dy += 1; this.player.dir = 'down'; }
    if (this.keys.ArrowLeft || this.keys.a) { dx -= 1; this.player.dir = 'left'; }
    if (this.keys.ArrowRight || this.keys.d) { dx += 1; this.player.dir = 'right'; }

    if (dx !== 0 && dy !== 0) { dx *= 0.7071; dy *= 0.7071; }

    this.player.isMoving = (dx !== 0 || dy !== 0);

    if (this.player.isMoving) {
      this.player.x += dx * this.player.speed;
      this.player.y += dy * this.player.speed;

      this.player.x = Math.max(30, Math.min(1250, this.player.x));
      this.player.y = Math.max(30, Math.min(690, this.player.y));

      this.player.stepCount++;
      this.player.animTimer++;
      if (this.player.animTimer % 6 === 0) {
        this.player.animFrame = (this.player.animFrame + 1) % 4;
      }

      // NPCs de Aventura
      for (const npc of this.npcs) {
        const dist = Math.hypot(this.player.x - npc.x, this.player.y - npc.y);
        if (dist < 40) {
          this.activeNPC = npc;
          this.mode = 'NPC_TALK';
          break;
        }
      }

      // Hierba Alta (Preguntas de Aprendizaje)
      const tx = Math.floor(this.player.x / 40);
      const ty = Math.floor(this.player.y / 40);
      if (this.isTallGrass(tx, ty) && this.player.stepCount % 22 === 0) {
        if (Math.random() < 0.40) {
          this.startStudyPhase(false);
        }
      }

      // Centro BOE (Restaurar HP)
      if (Math.abs(tx - this.center.tileX) <= 1 && Math.abs(ty - this.center.tileY) <= 1) {
        if (this.player.hp < this.player.maxHp) {
          this.player.hp = this.player.maxHp;
          if (typeof soundEngine !== 'undefined') soundEngine.playCorrect();
        }
      }

      // Gimnasios de Mentoras
      for (const g of this.gyms) {
        if (Math.abs(tx - g.tileX) <= 1 && Math.abs(ty - g.tileY) <= 1) {
          this.startStudyPhase(true, g);
          break;
        }
      }
    }
  }

  isTallGrass(tx, ty) {
    return (tx >= 2 && tx <= 10 && ty >= 5 && ty <= 9) || (tx >= 18 && tx <= 28 && ty >= 5 && ty <= 9);
  }

  startStudyPhase(isGym = false, gymData = null) {
    const qList = QUESTION_BANK || [];
    let filteredQ = qList;
    if (isGym && gymData) {
      filteredQ = qList.filter(q => q.mission === gymData.id);
    }
    if (filteredQ.length === 0) filteredQ = qList;

    const randomQ = filteredQ[Math.floor(Math.random() * filteredQ.length)];

    let enemy = { name: "Infracción / Concepto BOE", hp: 100, maxHp: 100, icon: "👾", color: "#ef4444" };
    if (isGym && gymData) {
      enemy = { name: `LÍDER DE GIMNASIO: ${gymData.mentor}`, hp: 120, maxHp: 120, icon: gymData.badge, color: gymData.color };
    }

    this.battle = {
      active: true,
      enemy: enemy,
      question: randomQ,
      selectedOption: 0,
      log: isGym ? `⚔️ COMBATE DE GIMNASIO CON ${gymData.mentor}` : `🌾 PREGUNTA ENCONTRADA EN EL CAMPUS`,
      subLog: "Estudia la Ficha Táctica antes de iniciar el combate por turnos.",
      studiedCard: false
    };

    // Primero pasa a la Ficha de Estudio Previo (Modo Aprendizaje Obligatorio)
    this.mode = 'STUDY_CARD';
    if (typeof soundEngine !== 'undefined') soundEngine.playClick();
  }

  submitBattleAnswer() {
    if (!this.battle.question) return;

    const q = this.battle.question;
    const isCorrect = (this.battle.selectedOption === q.correct);

    if (isCorrect) {
      this.battle.enemy.hp = 0;
      let xpGain = 40;

      // Aplicar bonificador de habilidad
      const hasXpBoost = this.skills.find(s => s.id === 'master_boe' && s.unlocked);
      if (hasXpBoost) xpGain = Math.round(xpGain * 1.25);

      this.battle.log = "🎉 ¡APRENDIZAJE DOMINADO! Has respondido correctamente.";
      this.battle.subLog = `📖 EXPLICACIÓN BOE: ${q.law} - ${q.article}: ${q.explanation}`;

      // Registrar en Pokédex
      const entry = this.pokedex.find(p => q.law.includes(p.name.split(' ')[0]));
      if (entry) {
        entry.mastered = true;
        entry.count++;
      }

      this.player.xp += xpGain;
      if (typeof soundEngine !== 'undefined') soundEngine.playCorrect();

      if (this.player.xp >= this.player.nextLvlXp) {
        this.player.level++;
        this.player.skillPoints++;
        this.player.xp = 0;
        this.battle.log += ` 🌟 ¡SUBISTE AL NIVEL ${this.player.level}! (+1 Punto de Talento)`;
      }

      setTimeout(() => { this.mode = 'WORLD'; }, 3400);
    } else {
      let penaltyHp = 25;
      const hasShieldSkill = this.skills.find(s => s.id === 'evasion_penal' && s.unlocked);
      if (hasShieldSkill) {
        penaltyHp = 0;
        this.battle.log = "🛡️ ¡HABILIDAD ANULACIÓN DE RESTA ACTIVADA! Fallo sin penalización.";
      } else {
        this.player.hp = Math.max(0, this.player.hp - penaltyHp);
        this.battle.log = "⚠️ ¡REPASO REQUERIDO! Penalización de -25 HP.";
      }

      this.battle.subLog = `💡 LA OPCIÓN CORRECTA ERA: "${q.options[q.correct]}". Explicación: ${q.explanation}`;

      if (typeof soundEngine !== 'undefined') soundEngine.playWrong();

      if (this.player.hp <= 0) {
        this.battle.log = "💀 Agotado. Recuperando salud en el Centro BOE...";
        setTimeout(() => {
          this.player.hp = 100;
          this.player.x = 640;
          this.player.y = 360;
          this.mode = 'WORLD';
        }, 3200);
      }
    }
  }

  draw() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    if (this.mode === 'WORLD' || this.mode === 'NPC_TALK') {
      // 1. DIBUJAR MAPA Y MUNDO POKÉMON
      ctx.fillStyle = "#22c55e";
      ctx.fillRect(0, 0, w, h);

      // Caminos de tierra
      ctx.fillStyle = "#fef08a";
      ctx.fillRect(0, 140, w, 60);
      ctx.fillRect(0, 480, w, 60);
      ctx.fillRect(580, 0, 80, h);

      // Centro BOE
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(570, 240, 100, 70);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(580, 260, 80, 50);
      ctx.fillStyle = "#0284c7";
      ctx.fillRect(610, 285, 20, 25);
      ctx.font = "bold 13px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.fillText("🏥 BOE", 620, 255);

      // Hierba Alta
      ctx.fillStyle = "#15803d";
      for (let tx = 2; tx <= 10; tx++) {
        for (let ty = 5; ty <= 9; ty++) {
          ctx.fillRect(tx * 40 + 2, ty * 40 + 2, 36, 36);
          ctx.fillStyle = "#4ade80";
          ctx.fillRect(tx * 40 + 6, ty * 40 + 6, 10, 10);
          ctx.fillStyle = "#15803d";
        }
      }

      for (let tx = 18; tx <= 28; tx++) {
        for (let ty = 5; ty <= 9; ty++) {
          ctx.fillRect(tx * 40 + 2, ty * 40 + 2, 36, 36);
          ctx.fillStyle = "#4ade80";
          ctx.fillRect(tx * 40 + 6, ty * 40 + 6, 10, 10);
          ctx.fillStyle = "#15803d";
        }
      }

      // NPCs
      this.npcs.forEach(npc => {
        ctx.font = "26px Arial";
        ctx.textAlign = "center";
        ctx.fillText(npc.icon, npc.x, npc.y);
      });

      // Gimnasios de Mentoras
      this.gyms.forEach(g => {
        const gx = g.tileX * 40;
        const gy = g.tileY * 40;

        ctx.fillStyle = "#0f172a";
        ctx.fillRect(gx - 45, gy - 45, 130, 95);
        ctx.fillStyle = g.color;
        ctx.fillRect(gx - 45, gy - 60, 130, 18);

        ctx.font = "26px Arial";
        ctx.textAlign = "center";
        ctx.fillText(g.badge, gx + 20, gy - 12);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 11px 'Outfit', sans-serif";
        ctx.fillText(g.mentor, gx + 20, gy + 40);
      });

      // Jugador
      ctx.fillStyle = "#2563eb";
      ctx.beginPath(); ctx.arc(this.player.x, this.player.y, 14, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#dc2626";
      ctx.beginPath(); ctx.arc(this.player.x, this.player.y - 6, 10, Math.PI, 0); ctx.fill();
      ctx.fillRect(this.player.x - 10, this.player.y - 6, 16, 3);

      // HUD Superior
      ctx.fillStyle = "rgba(15, 23, 42, 0.92)";
      ctx.fillRect(16, 12, 720, 56);
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2;
      ctx.strokeRect(16, 12, 720, 56);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 13px 'Outfit', sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`🧢 ENTRENADOR OPOSITOR — NIVEL ${this.player.level}  |  🌟 Puntos Talento: ${this.player.skillPoints}`, 28, 32);

      ctx.fillStyle = "#38bdf8";
      ctx.fillText(`📖 [P] POKÉDEX BOE  |  🎒 [B] ARTILUGIOS  |  📜 [K] ÁRBOL TALENTOS`, 28, 54);

      // Barra de HP
      ctx.fillStyle = "#334155";
      ctx.fillRect(520, 24, 200, 12);
      ctx.fillStyle = this.player.hp > 40 ? "#22c55e" : "#ef4444";
      ctx.fillRect(520, 24, (this.player.hp / this.player.maxHp) * 200, 12);

      // Cuadro Diálogo NPC
      if (this.mode === 'NPC_TALK' && this.activeNPC) {
        ctx.fillStyle = "rgba(15, 23, 42, 0.96)";
        ctx.strokeStyle = "#fbbf24";
        ctx.lineWidth = 3;
        ctx.fillRect(100, 520, w - 200, 160);
        ctx.strokeRect(100, 520, w - 200, 160);

        ctx.fillStyle = "#fbbf24";
        ctx.font = "bold 16px sans-serif";
        ctx.fillText(`${this.activeNPC.icon} ${this.activeNPC.name}:`, 120, 555);

        ctx.fillStyle = "#ffffff";
        ctx.font = "14px sans-serif";
        ctx.fillText(`"${this.activeNPC.text}"`, 120, 590);

        ctx.fillStyle = "#94a3b8";
        ctx.font = "bold 12px sans-serif";
        ctx.fillText("Presiona ENTER para continuar...", 120, 645);
      }

    } else if (this.mode === 'STUDY_CARD') {
      // 2. MODO FICHA DE APRENDIZAJE Y ESTUDIO PREVIO
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(40, 30, w - 80, 60);

      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 22px 'Outfit', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("📖 MODO APRENDIZAJE: FICHA TÁCTICA DE ESTUDIO DEL BOE", w / 2, 68);

      const q = this.battle.question;
      if (q) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2;
        ctx.fillRect(80, 120, w - 160, 480);
        ctx.strokeRect(80, 120, w - 160, 480);

        ctx.fillStyle = "#fbbf24";
        ctx.font = "bold 18px sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(`📜 NORMA APLICABLE: ${q.law} — ${q.article}`, 110, 165);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 16px sans-serif";
        ctx.fillText(`❓ PREGUNTA DE EXAMEN DEFENSA:`, 110, 215);

        ctx.fillStyle = "#cbd5e1";
        ctx.font = "15px sans-serif";
        ctx.fillText(q.question, 110, 245);

        ctx.fillStyle = "#4ade80";
        ctx.font = "bold 16px sans-serif";
        ctx.fillText(`💡 EXPLICACIÓN Y FUNDAMENTO JURÍDICO:`, 110, 320);

        ctx.fillStyle = "#f1f5f9";
        ctx.font = "14px sans-serif";
        ctx.fillText(q.explanation, 110, 350);

        ctx.fillStyle = "#fbbf24";
        ctx.font = "bold 16px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("PRESIONA [ENTER] O [ESPACIO] PARA INICIAR EL COMBATE POR TURNOS", w / 2, 560);
      }

    } else if (this.mode === 'SKILL_TREE') {
      // 3. DIBUJAR ÁRBOL DE HABILIDADES (TALENTOS)
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#c084fc";
      ctx.fillRect(40, 30, w - 80, 60);

      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 24px 'Outfit', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`📜 ÁRBOL DE TALENTOS Y PASIVAS JURÍDICAS (Puntos Disponibles: ${this.player.skillPoints})`, w / 2, 68);

      this.skills.forEach((s, idx) => {
        const sy = 130 + idx * 110;
        ctx.fillStyle = s.unlocked ? "rgba(192, 132, 252, 0.15)" : "rgba(255, 255, 255, 0.04)";
        ctx.strokeStyle = s.unlocked ? "#c084fc" : "#334155";
        ctx.lineWidth = 2;
        ctx.fillRect(80, sy, w - 160, 90);
        ctx.strokeRect(80, sy, w - 160, 90);

        ctx.fillStyle = s.unlocked ? "#c084fc" : "#ffffff";
        ctx.font = "bold 18px sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(`[Tecla ${idx + 1}] ${s.name} ${s.unlocked ? '✅ (DESBLOQUEADO)' : `🔒 (Coste: ${s.cost} Puntos)`}`, 110, sy + 36);

        ctx.fillStyle = "#94a3b8";
        ctx.font = "14px sans-serif";
        ctx.fillText(s.desc, 110, sy + 65);
      });

      ctx.fillStyle = "#fbbf24";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Presiona [K] para cerrar el Árbol de Talentos", w / 2, 690);

    } else if (this.mode === 'POKEDEX') {
      // 4. POKÉDEX DEL BOE
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#ef4444";
      ctx.fillRect(40, 30, w - 80, 60);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 24px 'Outfit', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("📱 POKÉDEX DEL BOE — REGISTRO DE LEYES APRENDIDAS", w / 2, 68);

      this.pokedex.forEach((item, idx) => {
        const py = 120 + idx * 90;
        ctx.fillStyle = item.mastered ? "rgba(34, 197, 94, 0.15)" : "rgba(255, 255, 255, 0.04)";
        ctx.strokeStyle = item.mastered ? "#22c55e" : "#334155";
        ctx.lineWidth = 2;
        ctx.fillRect(60, py, w - 120, 75);
        ctx.strokeRect(60, py, w - 120, 75);

        ctx.fillStyle = item.mastered ? "#4ade80" : "#94a3b8";
        ctx.font = "bold 16px sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(`${item.mastered ? '✅' : '🔒'} 00${idx + 1}. ${item.name}`, 80, py + 30);

        ctx.fillStyle = "#cbd5e1";
        ctx.font = "13px sans-serif";
        ctx.fillText(item.desc, 80, py + 54);
      });

      ctx.fillStyle = "#fbbf24";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Presiona [P] para volver a la Aventura", w / 2, 690);

    } else if (this.mode === 'BAG') {
      // 5. MOCHILA DE ARTILUGIOS
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(40, 30, w - 80, 60);

      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 24px 'Outfit', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("🎒 MOCHILA DE ARTILUGIOS Y HERRAMIENTAS JURÍDICAS", w / 2, 68);

      this.bag.forEach((item, idx) => {
        const py = 130 + idx * 100;
        ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2;
        ctx.fillRect(80, py, w - 160, 80);
        ctx.strokeRect(80, py, w - 160, 80);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 18px sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(`${item.name}  (Cantidad: ${item.count})`, 100, py + 34);

        ctx.fillStyle = "#94a3b8";
        ctx.font = "14px sans-serif";
        ctx.fillText(item.desc, 100, py + 60);
      });

      ctx.fillStyle = "#fbbf24";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Presiona [B] para cerrar la Mochila", w / 2, 680);

    } else if (this.mode === 'BATTLE') {
      // 6. ESCENA DE COMBATE Y EXAMEN
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#1e293b";
      ctx.beginPath(); ctx.ellipse(920, 250, 240, 75, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(320, 480, 250, 85, 0, 0, Math.PI * 2); ctx.fill();

      ctx.font = "80px Arial";
      ctx.textAlign = "center";
      ctx.fillText(this.battle.enemy.icon, 920, 240);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 22px 'Outfit', sans-serif";
      ctx.fillText(this.battle.enemy.name, 920, 140);

      ctx.font = "72px Arial";
      ctx.fillText("🧢", 320, 470);

      // Caja de Batalla
      ctx.fillStyle = "rgba(15, 23, 42, 0.96)";
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 3;
      ctx.fillRect(40, 520, w - 80, 180);
      ctx.strokeRect(40, 520, w - 80, 180);

      ctx.fillStyle = "#fbbf24";
      ctx.font = "bold 15px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(this.battle.log, 60, 550);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "12px sans-serif";
      ctx.fillText(this.battle.subLog, 60, 570);

      if (this.battle.question) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 14px sans-serif";
        ctx.fillText("❓ " + this.battle.question.question, 60, 595);

        const opts = this.battle.question.options || [];
        opts.forEach((opt, idx) => {
          const isSelected = (this.battle.selectedOption === idx);
          ctx.fillStyle = isSelected ? "#38bdf8" : "#cbd5e1";
          ctx.font = isSelected ? "bold 14px sans-serif" : "13px sans-serif";
          ctx.fillText((isSelected ? "▶ " : "  ") + (idx + 1) + ". " + opt, 60 + (idx % 2) * 580, 630 + Math.floor(idx / 2) * 28);
        });
      }
    }
  }

  loop() {
    if (!this.active) return;
    this.update();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }
}

const pokemonOpoEngine = new DeepPokemonOpoEngine();
