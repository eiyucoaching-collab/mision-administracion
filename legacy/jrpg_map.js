/**
 * MOTOR DE EXPLORACIÓN MAPA 2D JRPG - ACADEMIA DE ADMINISTRACIÓN (v50.0)
 * Mapa interactivo 2D estilo JRPG Anime/Cyberpunk con movimiento de personaje,
 * edificios de ministerios, collision detection y entrada fluida al teatro Live2D.
 */

class JRPGWorldMapEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.active = false;
    this.animationFrame = null;

    // Posición del jugador (Recluta)
    this.player = {
      x: 640,
      y: 480,
      size: 28,
      speed: 4.5,
      dir: 'down',
      isMoving: false,
      frame: 0,
      animTimer: 0
    };

    // Teclas presionadas
    this.keys = {
      ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false,
      w: false, s: false, a: false, d: false
    };

    // Edificios / Zonas de Mentoras en el Mapa JRPG
    this.buildings = [
      {
        id: 1,
        name: "Misión 01: Comandante Valeria",
        sub: "Constitución y Gobierno (Ley 40/2015)",
        x: 200, y: 180, w: 220, h: 140,
        color: "#38bdf8",
        glow: "rgba(56, 189, 248, 0.4)",
        icon: "📜"
      },
      {
        id: 2,
        name: "Misión 02: Inspectora Aoi",
        sub: "TREBEP e Igualdad (RDL 5/2015)",
        x: 530, y: 140, w: 220, h: 140,
        color: "#c084fc",
        glow: "rgba(192, 132, 252, 0.4)",
        icon: "⚖️"
      },
      {
        id: 3,
        name: "Misión 03: Teniente Maya",
        sub: "Derecho del Trabajo y LISOS",
        x: 860, y: 180, w: 220, h: 140,
        color: "#f43f5e",
        glow: "rgba(244, 63, 94, 0.4)",
        icon: "⚔️"
      },
      {
        id: 4,
        name: "Misión 04: Oficial Sakura",
        sub: "IV CUAGE (Personal Laboral)",
        x: 200, y: 440, w: 220, h: 140,
        color: "#fbbf24",
        glow: "rgba(251, 191, 36, 0.4)",
        icon: "💼"
      },
      {
        id: 5,
        name: "Misión 05: Capitana Elena",
        sub: "Prevención de Riesgos y LOLS",
        x: 530, y: 480, w: 220, h: 140,
        color: "#34d399",
        glow: "rgba(52, 211, 153, 0.4)",
        icon: "🛡️"
      },
      {
        id: 6,
        name: "Misión 06: Mayor Rin",
        sub: "Seguridad Social e ISFAS",
        x: 860, y: 440, w: 220, h: 140,
        color: "#f59e0b",
        glow: "rgba(245, 158, 11, 0.4)",
        icon: "🎖️"
      }
    ];

    this.nearBuilding = null;
  }

  init(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    
    this.canvas = document.createElement('canvas');
    this.canvas.width = 1280;
    this.canvas.height = 720;
    this.canvas.style.cssText = "width: 100%; height: 100%; display: block; border-radius: 20px; box-shadow: 0 0 40px rgba(56,189,248,0.3);";
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.bindInput();
    this.active = true;
    this.loop();
  }

  bindInput() {
    window.addEventListener('keydown', (e) => {
      if (this.keys.hasOwnProperty(e.key) || this.keys.hasOwnProperty(e.key.toLowerCase())) {
        this.keys[e.key] = true;
        this.keys[e.key.toLowerCase()] = true;
      }
      if (e.key === ' ' || e.key === 'Enter') {
        if (this.nearBuilding && window.game) {
          window.game.prepareMission(this.nearBuilding.id);
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      if (this.keys.hasOwnProperty(e.key) || this.keys.hasOwnProperty(e.key.toLowerCase())) {
        this.keys[e.key] = false;
        this.keys[e.key.toLowerCase()] = false;
      }
    });
  }

  update() {
    let dx = 0;
    let dy = 0;

    if (this.keys.ArrowUp || this.keys.w) dy -= 1;
    if (this.keys.ArrowDown || this.keys.s) dy += 1;
    if (this.keys.ArrowLeft || this.keys.a) dx -= 1;
    if (this.keys.ArrowRight || this.keys.d) dx += 1;

    if (dx !== 0 && dy !== 0) {
      dx *= 0.7071;
      dy *= 0.7071;
    }

    this.player.isMoving = (dx !== 0 || dy !== 0);

    if (this.player.isMoving) {
      this.player.x += dx * this.player.speed;
      this.player.y += dy * this.player.speed;

      // Límites del mapa
      this.player.x = Math.max(40, Math.min(1240, this.player.x));
      this.player.y = Math.max(40, Math.min(680, this.player.y));

      this.player.animTimer++;
      if (this.player.animTimer % 8 === 0) {
        this.player.frame = (this.player.frame + 1) % 4;
      }
    }

    // Detección de proximidad a edificios
    this.nearBuilding = null;
    for (const b of this.buildings) {
      const centerX = b.x + b.w / 2;
      const centerY = b.y + b.h / 2;
      const dist = Math.hypot(this.player.x - centerX, this.player.y - centerY);

      if (dist < 130) {
        this.nearBuilding = b;
        break;
      }
    }
  }

  draw() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // 1. Fondo de Grid Cyberpunk / Mapa JRPG
    ctx.fillStyle = "#090d16";
    ctx.fillRect(0, 0, w, h);

    // Dibujar rejilla Cyberpunk
    ctx.strokeStyle = "rgba(56, 189, 248, 0.08)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Caminos entre edificios (Lineas de neón)
    ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
    ctx.lineWidth = 4;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(310, 250); ctx.lineTo(640, 210); ctx.lineTo(970, 250);
    ctx.moveTo(640, 210); ctx.lineTo(640, 550);
    ctx.moveTo(310, 510); ctx.lineTo(640, 550); ctx.lineTo(970, 510);
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Dibujar Edificios / Cuarteles de las Mentoras
    this.buildings.forEach(b => {
      const isNear = (this.nearBuilding && this.nearBuilding.id === b.id);

      // Sombra y Resplandor Glow
      ctx.save();
      ctx.shadowColor = isNear ? b.color : b.glow;
      ctx.shadowBlur = isNear ? 30 : 15;

      ctx.fillStyle = "rgba(15, 23, 42, 0.92)";
      ctx.strokeStyle = isNear ? "#ffffff" : b.color;
      ctx.lineWidth = isNear ? 3 : 2;

      // Edificio con bordes biselados estilo HUD Táctico
      ctx.beginPath();
      ctx.roundRect(b.x, b.y, b.w, b.h, 16);
      ctx.fill();
      ctx.stroke();

      ctx.restore();

      // Icono y Título del Edificio
      ctx.font = "28px Arial";
      ctx.textAlign = "center";
      ctx.fillText(b.icon, b.x + b.w / 2, b.y + 42);

      ctx.fillStyle = b.color;
      ctx.font = "bold 13px 'Outfit', sans-serif";
      ctx.fillText(b.name, b.x + b.w / 2, b.y + 75);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "11px sans-serif";
      ctx.fillText(b.sub, b.x + b.w / 2, b.y + 98);

      // Botón Entrar si está cerca
      if (isNear) {
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.roundRect(b.x + 20, b.y + b.h - 28, b.w - 40, 22, 10);
        ctx.fill();

        ctx.fillStyle = "#000000";
        ctx.font = "bold 11px sans-serif";
        ctx.fillText("ENTER / ESPACIO: ENTRAR", b.x + b.w / 2, b.y + b.h - 13);
      }
    });

    // 3. Dibujar al Jugador (Recluta Anime 2D)
    ctx.save();
    ctx.shadowColor = "rgba(56, 189, 248, 0.8)";
    ctx.shadowBlur = 15;

    // Cuerpo / Aura
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.arc(this.player.x, this.player.y, this.player.size / 2, 0, Math.PI * 2);
    ctx.fill();

    // Detalle de personaje / Sombrero de Recluta
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(this.player.x, this.player.y - 2, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // 4. UI Superior del Mapa JRPG
    ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
    ctx.fillRect(20, 16, w - 40, 44);
    ctx.strokeStyle = "rgba(56, 189, 248, 0.3)";
    ctx.lineWidth = 1;
    ctx.strokeRect(20, 16, w - 40, 44);

    ctx.fillStyle = "#f1f5f9";
    ctx.font = "bold 14px 'Outfit', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("🏰 MAPA TÁCTICO RPG DE LA ACADEMIA — Usa WASD / Flechas para explorar los edificios", 36, 42);

    ctx.textAlign = "right";
    ctx.fillStyle = "#38bdf8";
    ctx.fillText("XP Total: " + (window.game ? window.game.totalXP.toFixed(2) : "0.00"), w - 36, 42);
  }

  loop() {
    if (!this.active) return;
    this.update();
    this.draw();
    this.animationFrame = requestAnimationFrame(() => this.loop());
  }

  stop() {
    this.active = false;
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
  }
}

const jrpgWorldMapEngine = new JRPGWorldMapEngine();
