/**
 * MOTOR DE ALMA NEKO MAID KAWAII - PROJECT AIRI (v43.0 Neko Maid Edition)
 * Widget flotante en esquina inferior derecha con avatar Neko Maid HD y voz dulce en castellano.
 */

class AIRISoulEngine {
  constructor() {
    this.emotions = {
      HAPPY: { badge: '😺', pitchOffset: '+15Hz', rate: '+10%', aura: 'var(--neon-pink)' },
      EXCITED: { badge: '😻', pitchOffset: '+25Hz', rate: '+15%', aura: 'var(--neon-gold)' },
      PROUD: { badge: '🐾', pitchOffset: '+15Hz', rate: '+5%', aura: 'var(--neon-cyan)' },
      NERVOUS: { badge: '🙀', pitchOffset: '+30Hz', rate: '+20%', aura: 'var(--neon-pink)' },
      AFFECTIONATE: { badge: '💖', pitchOffset: '+20Hz', rate: '-5%', aura: 'var(--neon-pink)' },
      TACTICAL: { badge: '🎀', pitchOffset: '+0Hz', rate: '+0%', aura: 'var(--neon-purple)' }
    };

    this.currentEmotion = 'TACTICAL';
    this.widgetEl = null;
    this.speechBubbleEl = null;
    this.currentAudio = null;
    this.initFloatingWidget();
  }

  initFloatingWidget() {
    if (document.getElementById('airi-companion-widget')) return;

    const widget = document.createElement('div');
    widget.id = 'airi-companion-widget';
    widget.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999;
      display: flex;
      align-items: flex-end;
      gap: 12px;
      pointer-events: none;
    `;

    widget.innerHTML = `
      <div id="airi-speech-bubble" style="
        background: rgba(15, 23, 42, 0.96);
        border: 2px solid #ec4899;
        border-radius: 18px;
        padding: 12px 16px;
        max-width: 280px;
        font-size: 13px;
        color: #f1f5f9;
        box-shadow: 0 0 25px rgba(236, 72, 153, 0.5);
        display: none;
        pointer-events: auto;
        font-family: 'Outfit', sans-serif;
      ">
        "¡Nyaa~! ¡Soy tu Neko Maid AIRI! ¡Te acompañaré durante todo el examen!"
      </div>

      <div id="airi-avatar-container" style="
        width: 82px;
        height: 82px;
        border-radius: 50%;
        border: 3px solid #ec4899;
        overflow: hidden;
        background: linear-gradient(135deg, #ec4899, #0f172a);
        box-shadow: 0 0 30px rgba(236, 72, 153, 0.6);
        cursor: pointer;
        pointer-events: auto;
        position: relative;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      ">
        <img id="airi-avatar-img" src="assets/neko_maid.jpg?v=43.0" alt="Neko Maid AIRI" style="width:100%; height:100%; object-fit:cover; display:block;">
        <span id="airi-badge" style="position: absolute; bottom: 2px; right: 2px; font-size: 18px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.8));">🎀</span>
      </div>
    `;

    document.body.appendChild(widget);

    this.widgetEl = widget;
    this.speechBubbleEl = document.getElementById('airi-speech-bubble');
    
    const container = document.getElementById('airi-avatar-container');
    container.addEventListener('mouseenter', () => { container.style.transform = 'scale(1.08)'; });
    container.addEventListener('mouseleave', () => { container.style.transform = 'scale(1.0)'; });
    container.addEventListener('click', () => {
      this.triggerAutonomousCheer();
    });
  }

  setEmotion(emotionName) {
    if (this.emotions[emotionName]) {
      this.currentEmotion = emotionName;
      const em = this.emotions[emotionName];
      const badgeEl = document.getElementById('airi-badge');
      const avatarContainer = document.getElementById('airi-avatar-container');
      
      if (badgeEl) badgeEl.textContent = em.badge;
      if (avatarContainer) avatarContainer.style.borderColor = em.aura;
    }
  }

  updateAvatarImage(imgSrc) {
    // Mantiene la imagen Neko Maid Kawaii por defecto
  }

  speakAutonomousClip(clipIdx, text, emotion = 'HAPPY') {
    this.setEmotion(emotion);
    if (this.speechBubbleEl) {
      this.speechBubbleEl.textContent = `"${text}"`;
      this.speechBubbleEl.style.display = 'block';
    }

    const avatarContainer = document.getElementById('airi-avatar-container');
    if (avatarContainer) avatarContainer.style.transform = 'scale(1.12)';

    if (this.currentAudio) {
      try { this.currentAudio.pause(); } catch(e){}
    }

    const mp3 = `assets/voices/airi_cheer${clipIdx}.mp3?v=43.0`;
    const audio = new Audio(mp3);
    this.currentAudio = audio;

    audio.onended = () => {
      if (avatarContainer) avatarContainer.style.transform = 'scale(1.0)';
      setTimeout(() => {
        if (this.speechBubbleEl) this.speechBubbleEl.style.display = 'none';
      }, 3500);
    };

    audio.onerror = () => {
      waifuVoiceEngine.speakTextFallback(text, 'aoi', () => {
        if (avatarContainer) avatarContainer.style.transform = 'scale(1.0)';
        setTimeout(() => {
          if (this.speechBubbleEl) this.speechBubbleEl.style.display = 'none';
        }, 3500);
      });
    };

    audio.play().catch(() => {
      waifuVoiceEngine.speakTextFallback(text, 'aoi', () => {
        if (avatarContainer) avatarContainer.style.transform = 'scale(1.0)';
        setTimeout(() => {
          if (this.speechBubbleEl) this.speechBubbleEl.style.display = 'none';
        }, 3500);
      });
    });
  }

  triggerAutonomousCheer() {
    const cheers = [
      { clip: 1, text: "¡Nyaa~! ¡Aspirante-kun, estás haciéndolo increíble en este examen!" },
      { clip: 2, text: "¡Confía en tu memoria del BOE! ¡Tu plaza E1 en el Ministerio de Defensa será tuya, nya!" },
      { clip: 3, text: "¡Recuerda respirar hondo! Si dudas en dos opciones, ¡mitiga el riesgo con el botón PASAR!" },
      { clip: 4, text: "¡Ganbatte! ¡Tu Neko Maid AIRI cree en ti al 100%, nya!" }
    ];
    const item = cheers[Math.floor(Math.random() * cheers.length)];
    this.speakAutonomousClip(item.clip, item.text, 'EXCITED');
  }

  onCorrectAnswer(streak) {
    if (streak >= 3) {
      this.speakAutonomousClip(1, `¡Nyaa~! ¡Impresionante Racha de ${streak} aciertos! ¡Eres imparable!`, 'EXCITED');
    } else {
      this.speakAutonomousClip(2, "¡Acierto táctico perfecto! +1.0 XP al marcador, nya~", 'PROUD');
    }
  }

  onWrongAnswer() {
    this.speakAutonomousClip(3, "¡No te desanimes! El fallo de -0.33 es aprendizaje. ¡La siguiente será tuya, nya!", 'NERVOUS');
  }
}

const airiSoulEngine = new AIRISoulEngine();
