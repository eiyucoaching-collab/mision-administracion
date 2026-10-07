/**
 * MOTOR DE AUDIO Y CITA INSPIRADORA EN CASTELLANO (v29.0)
 * Proporciona lemas en español para cada mentora y efectos de sonido limpios de interfaz.
 */

class AnimeStudioAudioEngine {
  constructor() {
    this.audioContext = null;
    this.initAudioContext();

    this.spanishMottos = {
      valeria: {
        intro: "¡Por el rigor constitucional y el servicio público!",
        correct: "¡Excelente! Principio de legalidad impecable.",
        wrong: "Atención al articulado de la Carta Magna.",
        pass: "Prudencia táctica acertada."
      },
      aoi: {
        intro: "¡Defendiendo la igualdad y los derechos del empleado público!",
        correct: "¡Brillante! Aplicación perfecta del TREBEP.",
        wrong: "Cuidado con las faltas y sanciones disciplinarias.",
        pass: "Buena gestión de puntos."
      },
      maya: {
        intro: "¡Precisión y justicia en la jurisdicción social!",
        correct: "¡Impacto directo en el Estatuto de los Trabajadores!",
        wrong: "Revisa los plazos de caducidad laboral.",
        pass: "Retirada táctica a tiempo."
      },
      sakura: {
        intro: "¡Excelencia y rigor en el IV Convenio Colectivo Único!",
        correct: "¡Dominio impecable de la clasificación del IV CUAGE!",
        wrong: "Confusión en los grupos profesionales E1-M3.",
        pass: "Elección prudente y razonada."
      },
      elena: {
        intro: "¡Seguridad, salud laboral y prevención en cada puesto!",
        correct: "¡Magnífica evaluación de riesgos laborales!",
        wrong: "Alerta en la Ley de Prevención de Riesgos.",
        pass: "Prevención inteligente."
      },
      rin: {
        intro: "¡Máxima protección en la Seguridad Social e ISFAS!",
        correct: "¡Cálculo perfecto del haber regulador!",
        wrong: "Revisa la normativa de Clases Pasivas.",
        pass: "Estrategia sabia."
      }
    };
  }

  initAudioContext() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.audioContext = new AudioCtx();
    } catch (e) {
      console.warn("Web Audio API notice:", e);
    }
  }

  getJapaneseSubtitle(type, waifuId = 'valeria') {
    const mottos = this.spanishMottos[waifuId] || this.spanishMottos.valeria;
    return mottos[type] || mottos.intro;
  }

  playKawaiiVoiceSFX(type, waifuId = 'valeria') {
    if (!this.audioContext) return;
    try {
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.audioContext.currentTime + 0.15);

      gain.gain.setValueAtTime(0.08, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.start();
      osc.stop(this.audioContext.currentTime + 0.15);
    } catch (e) {}
  }
}

const animeStudioAudio = new AnimeStudioAudioEngine();
