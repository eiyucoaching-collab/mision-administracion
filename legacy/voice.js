/**
 * MOTOR DE VOZ ANIME HUMANA EN CASTELLANO v45.0 (Full Interactive Reactions Edition)
 * Reproduce las 36 lecciones en 100% castellano humano nítido + 18 audios HD de reacción en vivo.
 */

class WaifuVoiceEngine {
  constructor() {
    this.currentAudio = null;
    this.speaking = false;
    this.synth = window.speechSynthesis || null;

    this.fallbackProfiles = {
      valeria: { pitch: 1.0, rate: 0.95, lang: 'es-ES' },
      aoi:     { pitch: 1.10, rate: 1.0,  lang: 'es-ES' },
      maya:    { pitch: 1.02, rate: 1.0,  lang: 'es-ES' },
      sakura:  { pitch: 0.98, rate: 0.92, lang: 'es-ES' },
      elena:   { pitch: 1.05, rate: 1.0,  lang: 'es-ES' },
      rin:     { pitch: 0.95, rate: 0.90, lang: 'es-ES' }
    };

    this.touchQuotes = {
      valeria: ["¡Aspirante! Concéntrate en el Título I de la Constitución.", "¡Mantén la disciplina táctica!", "¡Toda norma contraria a la Carta Magna es nula!"],
      aoi:     ["¡Recluta! Recuerda que el respeto y la igualdad son lo primero.", "¡Aprende bien el TREBEP!", "¡Proteger tus puntos es proteger tus derechos!"],
      maya:    ["¡Atención! En el ámbito laboral los plazos de caducidad no se perdonan.", "¡Treinta y tres días por año trabajado!", "¡Fuerza en el examen!"],
      sakura:  ["Saludos. Qué interés tan fascinante por el Convenio Colectivo Único.", "El Grupo E1 exige titulación de ESO.", "¡Sigue así, opositor!"],
      elena:   ["¡Salud y seguridad ante todo! Evalúa siempre los riesgos laborales.", "Los reconocimientos médicos son voluntarios.", "¡Representación sindical unida!"],
      rin:     ["Atención aspirante. Las Clases Pasivas y el ISFAS requieren máxima precisión.", "Cuidado con los quinquenios y trienios.", "¡Demuestra tu rigor militar!"]
    };

    this.unlockAudio();
  }

  unlockAudio() {
    const unlock = () => {
      try {
        const silentAudio = new Audio();
        silentAudio.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
        silentAudio.play().catch(() => {});
      } catch (e) {}
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('click', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
  }

  playSlideVoice(missionId, slideIdx, fallbackText, waifuId, onEnd) {
    this.stop();
    this.speaking = true;
    if (typeof setAvatarTalking !== 'undefined') setAvatarTalking(waifuId, true);

    const afterSpeak = () => {
      this.speaking = false;
      if (typeof setAvatarTalking !== 'undefined') setAvatarTalking(waifuId, false);
      if (onEnd) onEnd();
    };

    const mp3 = `assets/voices/m${missionId}_s${slideIdx + 1}.mp3?v=45.0`;
    const audio = new Audio(mp3);
    this.currentAudio = audio;

    audio.onended = afterSpeak;
    
    audio.onerror = (e) => {
      console.warn(`⚠️ Error al cargar MP3 ${mp3}, ejecutando síntesis...`, e);
      this.speakTextFallback(fallbackText, waifuId, afterSpeak);
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn(`⚠️ Autoplay bloqueado para ${mp3}, ejecutando síntesis...`, err);
        this.speakTextFallback(fallbackText, waifuId, afterSpeak);
      });
    }
  }

  playReactionVoice(waifuId, type) {
    this.stop();
    const mp3 = `assets/voices/reaction_${waifuId}_${type}.mp3?v=45.0`;
    const audio = new Audio(mp3);
    this.currentAudio = audio;
    this.speaking = true;
    if (typeof setAvatarTalking !== 'undefined') setAvatarTalking(waifuId, true);

    const stopTalking = () => {
      this.speaking = false;
      if (typeof setAvatarTalking !== 'undefined') setAvatarTalking(waifuId, false);
    };

    audio.onended = stopTalking;
    audio.onerror = stopTalking;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(stopTalking);
    }
  }

  speakTextFallback(text, waifuId = 'valeria', onEnd) {
    this.stop();
    if (!this.synth) { if (onEnd) onEnd(); return; }
    this.speaking = true;
    if (typeof setAvatarTalking !== 'undefined') setAvatarTalking(waifuId, true);

    const utt = new SpeechSynthesisUtterance(text);
    const p = this.fallbackProfiles[waifuId] || this.fallbackProfiles.valeria;
    utt.lang = 'es-ES';
    utt.pitch = p.pitch;
    utt.rate = p.rate;
    utt.volume = 1.0;

    const voices = this.synth.getVoices();
    const esFemaleVoice = voices.find(v => 
      (v.lang.startsWith('es') || v.lang.startsWith('ES')) && 
      (v.name.includes('Elvira') || v.name.includes('Helena') || v.name.includes('Laura') || 
       v.name.includes('Monica') || v.name.includes('Sabina') || v.name.includes('Spanish') || 
       v.name.includes('Female') || v.name.includes('Google español'))
    ) || voices.find(v => v.lang.startsWith('es'));

    if (esFemaleVoice) utt.voice = esFemaleVoice;

    utt.onend = () => {
      this.speaking = false;
      if (typeof setAvatarTalking !== 'undefined') setAvatarTalking(waifuId, false);
      if (onEnd) onEnd();
    };
    
    utt.onerror = () => {
      this.speaking = false;
      if (typeof setAvatarTalking !== 'undefined') setAvatarTalking(waifuId, false);
      if (onEnd) onEnd();
    };

    this.synth.speak(utt);
  }

  triggerTouchReaction(waifuId) {
    const quotes = this.touchQuotes[waifuId] || this.touchQuotes.valeria;
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    if (typeof setAvatarEmotion !== 'undefined') setAvatarEmotion(waifuId, 'blush');
    this.speakTextFallback(quote, waifuId);
    return quote;
  }

  stop() {
    if (this.currentAudio) {
      try { this.currentAudio.pause(); } catch (e) {}
      this.currentAudio = null;
    }
    if (this.synth) {
      try { this.synth.cancel(); } catch (e) {}
    }
    this.speaking = false;
  }
}

const waifuVoiceEngine = new WaifuVoiceEngine();
