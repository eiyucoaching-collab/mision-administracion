/**
 * MOTOR DE PARTÍCULAS CANVAS CYBERPUNK & CONFETTI DE VICTORIA
 * Inspirado en particles.js y sistemas de partículas HTML5 GameDev
 */

class TacticalParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.confetti = [];
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
    });

    this.initBackgroundParticles();
    this.animate();
  }

  initBackgroundParticles() {
    this.particles = [];
    const count = 45;
    const colors = ['#38bdf8', '#c084fc', '#f43f5e', '#34d399', '#fbbf24'];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.6 + 0.2
      });
    }
  }

  triggerVictoryConfetti() {
    const colors = ['#38bdf8', '#c084fc', '#34d399', '#fbbf24', '#ffffff'];
    for (let i = 0; i < 70; i++) {
      this.confetti.push({
        x: this.width / 2 + (Math.random() - 0.5) * 200,
        y: this.height / 2 + (Math.random() - 0.5) * 100,
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.8) * 9,
        gravity: 0.15,
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10,
        alpha: 1.0
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw ambient background particles
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });

    // Draw confetti particles
    for (let i = this.confetti.length - 1; i >= 0; i--) {
      const c = this.confetti[i];
      c.x += c.vx;
      c.y += c.vy;
      c.vy += c.gravity;
      c.rotation += c.vRot;
      c.alpha -= 0.012;

      if (c.alpha <= 0 || c.y > this.height) {
        this.confetti.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = c.alpha;
      this.ctx.fillStyle = c.color;
      this.ctx.translate(c.x, c.y);
      this.ctx.rotate((c.rotation * Math.PI) / 180);
      this.ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.animate());
  }
}
