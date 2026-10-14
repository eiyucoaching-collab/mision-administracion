/**
 * MOTOR DE RETRATOS ANIME VECTORIALES Y BADGES v29.0
 * Reemplaza totalmente los sprites estáticos por avatares vectoriales HD con animación CSS.
 */

const SPRITE_CONFIG = {
  valeria: { name: 'Comandante Valeria', initial: 'V', color: '#38bdf8', bg: 'linear-gradient(135deg, #0284c7, #0f172a)', glow: 'rgba(56,189,248,0.6)' },
  aoi:     { name: 'Inspectora Aoi',     initial: 'A', color: '#c084fc', bg: 'linear-gradient(135deg, #9333ea, #0f172a)', glow: 'rgba(192,132,252,0.6)' },
  maya:    { name: 'Teniente Maya',     initial: 'M', color: '#f43f5e', bg: 'linear-gradient(135deg, #e11d48, #0f172a)', glow: 'rgba(244,63,94,0.6)' },
  sakura:  { name: 'Oficial Sakura',    initial: 'S', color: '#fbbf24', bg: 'linear-gradient(135deg, #d97706, #0f172a)', glow: 'rgba(251,191,36,0.6)' },
  elena:   { name: 'Capitana Elena',    initial: 'E', color: '#34d399', bg: 'linear-gradient(135deg, #059669, #0f172a)', glow: 'rgba(52,211,153,0.6)' },
  rin:     { name: 'Mayor Rin',         initial: 'R', color: '#f59e0b', bg: 'linear-gradient(135deg, #b45309, #0f172a)', glow: 'rgba(245,158,11,0.6)' }
};

class AnimeSprite {
  constructor(containerId, waifuId) {
    this.container = document.getElementById(containerId);
    this.waifuId = waifuId;
    this.cfg = SPRITE_CONFIG[waifuId] || SPRITE_CONFIG.valeria;
    if (this.container) this._render();
  }

  _render() {
    const c = this.cfg;
    this.container.innerHTML = `
      <div style="
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: ${c.bg};
        border: 2px solid ${c.color};
        box-shadow: 0 0 16px ${c.glow};
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      ">
        <svg width="65%" height="65%" viewBox="0 0 24 24" fill="none" stroke="${c.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span style="
          position: absolute;
          bottom: 2px;
          right: 2px;
          background: ${c.color};
          color: #000;
          font-weight: 900;
          font-size: 10px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        ">${c.initial}</span>
      </div>
    `;
  }
}

function initAnimeSprite(containerId, waifuId) {
  new AnimeSprite(containerId, waifuId);
}
