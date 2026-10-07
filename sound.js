/**
 * MOTOR DE AUDIO BUBBLEGUM POP & ANIME OST MULTI-TRACK (v41.0)
 * Incluye reproductor multi-pista con 3 temas procedurales Bubblegum Pop / Kawaii J-Pop:
 *  - Pista 1: "Kawaii Strawberry Bounce" (Major Synth-Pop, 132 BPM)
 *  - Pista 2: "Sparkling Anime Academy" (Kawaii Future Chiptune, 144 BPM)
 *  - Pista 3: "Defense Waifu Parade" (Upbeat Victory Anthem, 128 BPM)
 */

class TacticalSoundEngine {
  constructor() {
    this.audioCtx = null;
    this.isBGMPlaying = false;
    this.currentTrackIndex = 0;
    this.synthBgmInterval = null;

    this.tracks = [
      {
        name: "🌸 Pista 1: Kawaii Strawberry Bounce",
        bpm: 132,
        tempoMs: 160,
        scale: [523.25, 659.25, 783.99, 1046.50, 880.00, 698.46, 659.25, 783.99, 587.33, 659.25, 523.25, 392.00],
        bass: [261.63, 329.63, 440.00, 349.23],
        type: 'sine'
      },
      {
        name: "✨ Pista 2: Sparkling Anime Academy",
        bpm: 144,
        tempoMs: 135,
        scale: [659.25, 783.99, 987.77, 1174.66, 1046.50, 880.00, 783.99, 659.25, 587.33, 659.25, 783.99, 880.00],
        bass: [329.63, 392.00, 440.00, 293.66],
        type: 'square'
      },
      {
        name: "🎖️ Pista 3: Defense Waifu Parade",
        bpm: 128,
        tempoMs: 175,
        scale: [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50, 783.99, 659.25, 523.25, 659.25],
        bass: [261.63, 293.66, 329.63, 349.23],
        type: 'triangle'
      }
    ];

    // Audio BGM mp3 opcional si existe en disco
    this.bgmAudio = new Audio('assets/bgm.mp3');
    this.bgmAudio.loop = true;
    this.bgmAudio.volume = 0.25;
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleBGM() {
    this.initContext();
    if (this.isBGMPlaying) {
      this.stopBGM();
      return false;
    } else {
      this.playBGM();
      return true;
    }
  }

  nextTrack() {
    this.initContext();
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    if (this.isBGMPlaying) {
      this.stopBGM();
      this.playBGM();
    }
    return this.getCurrentTrackName();
  }

  getCurrentTrackName() {
    return this.tracks[this.currentTrackIndex].name;
  }

  playBGM() {
    this.stopBGM();
    this.isBGMPlaying = true;
    this.startBubblegumSynthOST();
  }

  stopBGM() {
    this.isBGMPlaying = false;
    try { this.bgmAudio.pause(); } catch (e) {}
    if (this.synthBgmInterval) {
      clearInterval(this.synthBgmInterval);
      this.synthBgmInterval = null;
    }
  }

  startBubblegumSynthOST() {
    if (this.synthBgmInterval) clearInterval(this.synthBgmInterval);
    if (!this.audioCtx) return;

    const trk = this.tracks[this.currentTrackIndex];
    let step = 0;

    this.synthBgmInterval = setInterval(() => {
      if (!this.isBGMPlaying) return;
      
      const now = this.audioCtx.currentTime;

      // 1. Melodía Alegre Bubblegum Pop (Melody Lead)
      const oscLead = this.audioCtx.createOscillator();
      const gainLead = this.audioCtx.createGain();

      oscLead.type = trk.type;
      oscLead.frequency.setValueAtTime(trk.scale[step % trk.scale.length], now);

      gainLead.gain.setValueAtTime(0.035, now);
      gainLead.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      oscLead.connect(gainLead);
      gainLead.connect(this.audioCtx.destination);

      oscLead.start(now);
      oscLead.stop(now + 0.14);

      // 2. Línea de Bajo Bouncy (Bassline)
      if (step % 2 === 0) {
        const oscBass = this.audioCtx.createOscillator();
        const gainBass = this.audioCtx.createGain();

        oscBass.type = 'triangle';
        oscBass.frequency.setValueAtTime(trk.bass[Math.floor(step / 4) % trk.bass.length], now);

        gainBass.gain.setValueAtTime(0.05, now);
        gainBass.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        oscBass.connect(gainBass);
        gainBass.connect(this.audioCtx.destination);

        oscBass.start(now);
        oscBass.stop(now + 0.22);
      }

      step++;
    }, trk.tempoMs);
  }

  playClick() {
    this.initContext();
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, this.audioCtx.currentTime);
    gain.gain.setValueAtTime(0.05, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.05);
  }

  playCorrect() {
    this.initContext();
    const now = this.audioCtx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.08, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.25);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.25);
    });
  }

  playWrong() {
    this.initContext();
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.linearRampToValueAtTime(130, now + 0.3);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  playPass() {
    this.initContext();
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.setValueAtTime(440.00, now + 0.1);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.22);
  }

  playCombo(comboLevel) {
    this.initContext();
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    const baseFreq = 523.25 + (comboLevel * 120);
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, now + 0.25);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  playSpeechBlip(waifuId = 'valeria') {
    this.initContext();
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    const pitches = { valeria: 480, aoi: 650, maya: 380, sakura: 580, elena: 440, rin: 410 };
    const freq = pitches[waifuId] || 480;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.setValueAtTime(freq + 50, now + 0.03);

    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  playVictory() {
    this.initContext();
    const now = this.audioCtx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      gain.gain.setValueAtTime(0.09, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.25);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.25);
    });
  }
}

const soundEngine = new TacticalSoundEngine();
