/**
 * MOTOR VTUBER LIVE2D CUBISM 4 REAL v35.0 (Fail-Safe Bulletproof Live2D Engine)
 * Carga e interactúa con los modelos VTuber Live2D Cubism 4 (.model3.json + .moc3)
 * Encuadre de Plano Medio (Busto/Rostro grande y cercano, fallback 100% a prueba de fallos).
 */

const WAIFU_MODEL_CONFIG = {
  valeria: { url: 'assets/live2d/Hiyori/Hiyori.model3.json', scaleMult: 1.85, anchorY: 0.05, yOffset: 30 },
  aoi:     { url: 'assets/live2d/Mao/Mao.model3.json',     scaleMult: 1.80, anchorY: 0.05, yOffset: 25 },
  maya:    { url: 'assets/live2d/Haru/Haru.model3.json',    scaleMult: 1.70, anchorY: 0.04, yOffset: 20 },
  sakura:  { url: 'assets/live2d/Rice/Rice.model3.json',    scaleMult: 1.85, anchorY: 0.05, yOffset: 30 },
  elena:   { url: 'assets/live2d/Hiyori/Hiyori.model3.json', scaleMult: 1.85, anchorY: 0.05, yOffset: 30 },
  rin:     { url: 'assets/live2d/Haru/Haru.model3.json',    scaleMult: 1.70, anchorY: 0.04, yOffset: 20 }
};

class VTuberLive2DEngine {
  constructor() {
    this.instances = {};
    this.isTalking = false;
    this._talkInterval = null;
  }

  async init(containerId, waifuId) {
    if (containerId !== 'theater-avatar-container') {
      return;
    }

    const containerEl = document.getElementById(containerId);
    if (!containerEl) return;

    // Destrucción limpia de instancia previa
    if (this.instances[containerId]) {
      try {
        const inst = this.instances[containerId];
        if (inst.mouseHandler) window.removeEventListener('mousemove', inst.mouseHandler);
        if (inst.app) inst.app.destroy(true, { children: true, texture: true, baseTexture: true });
      } catch (e) {
        console.warn('Live2D cleanup notice:', e);
      }
      delete this.instances[containerId];
    }

    containerEl.innerHTML = '';

    const width = containerEl.clientWidth > 0 ? containerEl.clientWidth : 520;
    const height = containerEl.clientHeight > 0 ? containerEl.clientHeight : 420;

    // Crear canvas PixiJS WebGL
    const app = new PIXI.Application({
      width: width,
      height: height,
      transparent: true,
      autoDensity: true,
      resolution: window.devicePixelRatio || 1
    });

    containerEl.appendChild(app.view);

    const cfg = WAIFU_MODEL_CONFIG[waifuId] || WAIFU_MODEL_CONFIG.valeria;

    try {
      console.log(`%c 🎌 CARGANDO MODELO LIVE2D VTUBER PLANO MEDIO (${waifuId}): ${cfg.url}`, 'color: #38bdf8; font-weight: bold; font-size: 14px;');

      if (typeof PIXI === 'undefined' || !PIXI.live2d || !PIXI.live2d.Live2DModel) {
        console.error('❌ ERROR: PIXI.live2d.Live2DModel no está disponible.');
        return;
      }
      
      let model;
      try {
        model = await PIXI.live2d.Live2DModel.from(cfg.url, { autoInteract: true });
      } catch (e1) {
        console.warn(`⚠️ Error al cargar ${cfg.url}, activando fallback seguro Hiyori...`, e1);
        model = await PIXI.live2d.Live2DModel.from('assets/live2d/Hiyori/Hiyori.model3.json', { autoInteract: true });
      }

      app.stage.addChild(model);

      // Encuadre de Plano Medio (Busto/Rostro cercano, grande e impresionante)
      const scaleX = width / model.width;
      const scaleY = height / model.height;
      const scale = Math.min(scaleX, scaleY) * cfg.scaleMult;

      model.scale.set(scale);
      model.anchor.set(0.5, cfg.anchorY);
      model.x = width / 2;
      model.y = cfg.yOffset;

      // Tracking con el puntero del ratón
      const mouseHandler = (e) => {
        const rect = containerEl.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        model.focus(mouseX, mouseY);
      };
      window.addEventListener('mousemove', mouseHandler);

      // Reacción táctil al clic
      model.on('hit', (hitAreas) => {
        if (hitAreas.includes('Head') || hitAreas.includes('head')) {
          try { model.expression('f01'); } catch (e) {}
        } else {
          try { model.motion('TapBody'); } catch (e) {}
        }
        if (typeof waifuVoiceEngine !== 'undefined') {
          waifuVoiceEngine.triggerTouchReaction(waifuId);
        }
      });

      this.instances[containerId] = { app, model, waifuId, mouseHandler };
      console.log(`%c ✅ MODELO LIVE2D VTUBER (${waifuId}) PLANO MEDIO RENDERIZADO PERFECTAMENTE!`, 'color: #34d399; font-weight: bold; font-size: 14px;');
    } catch (err) {
      console.error(`❌ Error critico Live2D ${cfg.url}:`, err);
    }
  }

  setTalking(active) {
    this.isTalking = active;
    const inst = this.instances['theater-avatar-container'];
    if (!inst || !inst.model) return;

    if (active) {
      if (!this._talkInterval) {
        this._talkInterval = setInterval(() => {
          const currentInst = this.instances['theater-avatar-container'];
          if (currentInst && currentInst.model && currentInst.model.internalModel) {
            const openY = 0.3 + Math.random() * 0.7;
            try {
              currentInst.model.internalModel.coreModel.setParameterValueById('ParamMouthOpenY', openY);
            } catch (e) {}
          }
        }, 100);
      }
    } else {
      if (this._talkInterval) {
        clearInterval(this._talkInterval);
        this._talkInterval = null;
      }
      try {
        if (inst.model && inst.model.internalModel) {
          inst.model.internalModel.coreModel.setParameterValueById('ParamMouthOpenY', 0);
        }
      } catch (e) {}
    }
  }

  setEmotion(emotion) {
    const inst = this.instances['theater-avatar-container'];
    if (!inst || !inst.model) return;
    try {
      if (emotion === 'happy' || emotion === 'blush' || emotion === 'correct') {
        inst.model.expression('f01');
      } else if (emotion === 'sad' || emotion === 'wrong') {
        inst.model.expression('f02');
      }
    } catch (e) {}
  }
}

const vtuberLive2DEngine = new VTuberLive2DEngine();

function initAnimeAvatar(containerId, waifuId) {
  vtuberLive2DEngine.init(containerId, waifuId);
}

function setAvatarTalking(waifuId, active) {
  vtuberLive2DEngine.setTalking(active);
}

function setAvatarEmotion(waifuId, emotion) {
  vtuberLive2DEngine.setEmotion(emotion);
}
