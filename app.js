/**
 * MOTOR LÓGICO DE JUEGO - MISIÓN ADMINISTRACIÓN (FULL ANIME IMMERSIVE THEATER EDITION v20.0)
 */

class MissionAdminGame {
  constructor() {
    this.currentQuestions = [];
    this.currentIndex = 0;
    this.totalXP = 0.0;
    this.maxPossibleXP = 60.0;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.passCount = 0;
    this.streakCount = 0;
    this.lives = 3;
    this.isSuddenDeath = false;
    this.isBossBattle = false;
    this.timerSeconds = 0;
    this.timerInterval = null;
    this.selectedOption = null;
    this.activeMission = 0;
    this.currentWaifu = null;
    this.mistakeNotebook = [];

    // Lecture state
    this.currentLecture = null;
    this.lectureSlideIdx = 0;

    // LocalStorage State
    this.unlockedCGs = JSON.parse(localStorage.getItem('mision_admin_cgs') || '[]');
    this.affectionLevels = JSON.parse(localStorage.getItem('mision_admin_affection') || '{}');
    this.inventory = JSON.parse(localStorage.getItem('mision_admin_inventory') || '["pen_boe"]');
    this.equippedItems = JSON.parse(localStorage.getItem('mision_admin_equipped') || '["pen_boe"]');
    this.achievements = JSON.parse(localStorage.getItem('mision_admin_achievements') || '[]');

    this.particleEngine = new TacticalParticleEngine('bg-canvas');

    this.initElements();
    this.bindEvents();
    this.showMissionSelector();
  }

  initElements() {
    this.els = {
      container: document.querySelector('.hud-container'),
      selectorScreen: document.getElementById('selector-screen'),
      battleScreen: document.getElementById('battle-screen'),
      resultScreen: document.getElementById('result-screen'),
      galleryScreen: document.getElementById('gallery-screen'),
      lectureScreen: document.getElementById('lecture-screen'),
      
      xpValue: document.getElementById('xp-value'),
      xpProgressFill: document.getElementById('xp-progress-fill'),
      rankName: document.getElementById('rank-name'),
      correctStat: document.getElementById('correct-stat'),
      wrongStat: document.getElementById('wrong-stat'),
      passStat: document.getElementById('pass-stat'),
      comboBadge: document.getElementById('combo-badge'),
      timerBadge: document.getElementById('timer-badge'),
      livesStat: document.getElementById('lives-stat'),
      affectionValue: document.getElementById('affection-value'),

      // Voice Lecture elements
      lectureMainTitle: document.getElementById('lecture-main-title'),
      lectureSlideCounter: document.getElementById('lecture-slide-counter'),
      theaterBgImg: document.getElementById('theater-bg-img'),
      theaterCharacterSprite: document.getElementById('theater-character-sprite'),
      theaterWaifuName: document.getElementById('theater-waifu-name'),
      theaterJpSub: document.getElementById('theater-jp-sub'),
      lectureHeadline: document.getElementById('lecture-headline'),
      lectureSubtext: document.getElementById('lecture-subtext'),
      lectureKeyBox: document.getElementById('lecture-key-box'),
      btnSpeakSlide: document.getElementById('btn-speak-slide'),
      btnStopVoice: document.getElementById('btn-stop-voice'),
      voiceStatusTag: document.getElementById('voice-status-tag'),

      btnLecturePrev: document.getElementById('btn-lecture-prev'),
      btnLectureNext: document.getElementById('btn-lecture-next'),
      btnStartExamNow: document.getElementById('btn-start-exam-now'),

      // Super Agent Party elements
      btnPartyToggle: document.getElementById('btn-party-toggle'),
      partyModal: document.getElementById('party-modal'),
      btnCloseParty: document.getElementById('btn-close-party'),
      partyInputText: document.getElementById('party-input-text'),
      btnStartPartyDebate: document.getElementById('btn-start-party-debate'),
      partyDebateResults: document.getElementById('party-debate-results'),

      // Waifu AI Assistant elements
      btnAssistantToggle: document.getElementById('btn-assistant-toggle'),
      assistantModal: document.getElementById('assistant-modal'),
      btnCloseAssistant: document.getElementById('btn-close-assistant'),
      assistantResponseBox: document.getElementById('assistant-response-box'),
      assistantInputText: document.getElementById('assistant-input-text'),
      btnMicAssistant: document.getElementById('btn-mic-assistant'),
      btnSendAssistantQuery: document.getElementById('btn-send-assistant-query'),

      // Modals
      btnInventoryToggle: document.getElementById('btn-inventory-toggle'),
      inventoryModal: document.getElementById('inventory-modal'),
      btnCloseInventory: document.getElementById('btn-close-inventory'),
      inventoryGrid: document.getElementById('inventory-grid'),

      btnAchievementsToggle: document.getElementById('btn-achievements-toggle'),
      achievementsModal: document.getElementById('achievements-modal'),
      btnCloseAchievements: document.getElementById('btn-close-achievements'),
      achievementsGrid: document.getElementById('achievements-grid'),

      btnStoryToggle: document.getElementById('btn-story-toggle'),
      storyModal: document.getElementById('story-modal'),
      btnCloseStory: document.getElementById('btn-close-story'),
      storySynopsis: document.getElementById('story-synopsis'),
      storyChaptersContainer: document.getElementById('story-chapters-container'),

      // Pokémon Oposiciones Mode elements
      pokemonScreen: document.getElementById('pokemon-screen'),
      pokemonContainer: document.getElementById('pokemon-container'),

      btnBgmToggle: document.getElementById('btn-bgm-toggle'),
      btnOpenGallery: document.getElementById('btn-open-gallery'),
      btnCloseGallery: document.getElementById('btn-close-gallery'),
      cgGrid: document.getElementById('cg-grid'),

      // Waifu in-game elements
      waifuPortraitSmall: document.getElementById('waifu-portrait-small'),
      waifuSpeechText: document.getElementById('waifu-speech-text'),
      waifuMoodBadge: document.getElementById('waifu-mood-badge'),

      tagMission: document.getElementById('tag-mission'),
      tagTopic: document.getElementById('tag-topic'),
      questionCounter: document.getElementById('question-counter'),
      questionText: document.getElementById('question-text'),
      optionsGrid: document.getElementById('options-grid'),

      btnSpeakSlide: document.getElementById('btn-speak-slide') || document.getElementById('theater-btn-voice'),
      btnStopVoice: document.getElementById('btn-stop-voice') || document.getElementById('theater-btn-stop'),
      voiceStatusTag: document.getElementById('voice-status-tag') || document.getElementById('theater-voice-status'),
      btnLecturePrev: document.getElementById('btn-lecture-prev'),
      btnLectureNext: document.getElementById('btn-lecture-next'),
      btnStartExamNow: document.getElementById('btn-start-exam-now'),

      // Flashcard & Hint elements
      flashcardInner: document.getElementById('flashcard-inner'),
      flashcardBackExp: document.getElementById('flashcard-back-exp'),
      btnFlipCard: document.getElementById('btn-flip-card'),
      btnHint50: document.getElementById('btn-hint-50'),

      btnPass: document.getElementById('btn-pass'),
      btnSubmit: document.getElementById('btn-submit'),
      
      feedbackCard: document.getElementById('feedback-card'),
      feedbackVerdict: document.getElementById('feedback-verdict'),
      feedbackDelta: document.getElementById('feedback-delta'),
      feedbackLegal: document.getElementById('feedback-legal'),
      feedbackArticle: document.getElementById('feedback-article'),
      feedbackExp: document.getElementById('feedback-exp'),
      feedbackRisk: document.getElementById('feedback-risk'),
      btnNextQuestion: document.getElementById('btn-next-question'),

      // Visual Novel Modal
      vnModal: document.getElementById('vn-modal'),
      vnPortrait: document.getElementById('vn-portrait'),
      vnName: document.getElementById('vn-name'),
      vnTitle: document.getElementById('vn-title'),
      vnDialogue: document.getElementById('vn-dialogue'),
      btnVnLearn: document.getElementById('btn-vn-learn'),
      btnVnStart: document.getElementById('btn-vn-start'),

      // Result elements
      finalXp: document.getElementById('final-xp'),
      finalRank: document.getElementById('final-rank'),
      finalSummary: document.getElementById('final-summary'),
      btnReviewMistakes: document.getElementById('btn-review-mistakes'),
      btnRestart: document.getElementById('btn-restart')
    };
  }

  bindEvents() {
    if (this.els.btnSubmit) this.els.btnSubmit.addEventListener('click', () => this.handleAnswerSubmit());
    if (this.els.btnPass) this.els.btnPass.addEventListener('click', () => this.handlePassSubmit());
    if (this.els.btnNextQuestion) this.els.btnNextQuestion.addEventListener('click', () => this.nextQuestion());
    if (this.els.btnRestart) this.els.btnRestart.addEventListener('click', () => this.showMissionSelector());
    if (this.els.btnVnStart) this.els.btnVnStart.addEventListener('click', () => this.closeVnBriefingAndPlay());
    if (this.els.btnVnLearn) this.els.btnVnLearn.addEventListener('click', () => this.startLectureMode());

    // Super Agent Party Events
    if (this.els.btnPartyToggle) {
      this.els.btnPartyToggle.addEventListener('click', () => {
        soundEngine.playClick();
        if (this.els.partyModal) this.els.partyModal.style.display = 'flex';
      });
    }
    if (this.els.btnCloseParty) {
      this.els.btnCloseParty.addEventListener('click', () => {
        waifuVoiceEngine.stop();
        soundEngine.playClick();
        if (this.els.partyModal) this.els.partyModal.style.display = 'none';
      });
    }
    if (this.els.btnStartPartyDebate) this.els.btnStartPartyDebate.addEventListener('click', () => this.handlePartyDebate());

    // Touch on theater avatar, battle mini-portrait, VN portrait
    ['theater-avatar-container', 'waifu-portrait-small', 'vn-portrait'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('click', () => {
          const waifuId = this.currentWaifu ? this.currentWaifu.id : 'valeria';
          animeStudioAudio.playKawaiiVoiceSFX('intro', waifuId);
          waifuVoiceEngine.triggerTouchReaction(waifuId);
        });
      }
    });

    // Waifu AI Assistant Events
    if (this.els.btnAssistantToggle) {
      this.els.btnAssistantToggle.addEventListener('click', () => {
        soundEngine.playClick();
        if (this.els.assistantModal) this.els.assistantModal.style.display = 'flex';
      });
    }
    if (this.els.btnCloseAssistant) {
      this.els.btnCloseAssistant.addEventListener('click', () => {
        waifuVoiceEngine.stop();
        soundEngine.playClick();
        if (this.els.assistantModal) this.els.assistantModal.style.display = 'none';
      });
    }
    if (this.els.btnSendAssistantQuery) this.els.btnSendAssistantQuery.addEventListener('click', () => this.handleAssistantQuery());
    if (this.els.btnMicAssistant) this.els.btnMicAssistant.addEventListener('click', () => this.handleMicInput());
    if (this.els.assistantInputText) {
      this.els.assistantInputText.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.handleAssistantQuery();
      });
    }

    if (this.els.btnSpeakSlide) this.els.btnSpeakSlide.addEventListener('click', () => this.speakCurrentSlide());
    if (this.els.btnStopVoice) {
      this.els.btnStopVoice.addEventListener('click', () => {
        waifuVoiceEngine.stop();
        if (this.els.voiceStatusTag) this.els.voiceStatusTag.textContent = '⏹️ Voz interrumpida';
      });
    }

    if (this.els.btnLecturePrev) this.els.btnLecturePrev.addEventListener('click', () => this.prevLectureSlide());
    if (this.els.btnLectureNext) this.els.btnLectureNext.addEventListener('click', () => this.nextLectureSlide());
    if (this.els.btnStartExamNow) this.els.btnStartExamNow.addEventListener('click', () => this.closeLectureAndStartExam());

    this.els.btnFlipCard.addEventListener('click', () => {
      soundEngine.playClick();
      this.els.flashcardInner.classList.toggle('flipped');
    });

    this.els.btnHint50.addEventListener('click', () => this.use50PercentHint());

    this.els.btnBgmToggle.addEventListener('click', () => {
      const isPlaying = soundEngine.toggleBGM();
      this.els.btnBgmToggle.innerHTML = isPlaying ? '🎵 BGM: ON' : '🎵 BGM: OFF';
      if (isPlaying) this.els.btnBgmToggle.classList.add('active');
      else this.els.btnBgmToggle.classList.remove('active');
    });

    this.els.btnInventoryToggle.addEventListener('click', () => this.showInventoryModal());
    this.els.btnCloseInventory.addEventListener('click', () => {
      soundEngine.playClick();
      this.els.inventoryModal.style.display = 'none';
    });

    this.els.btnAchievementsToggle.addEventListener('click', () => this.showAchievementsModal());
    this.els.btnCloseAchievements.addEventListener('click', () => {
      soundEngine.playClick();
      this.els.achievementsModal.style.display = 'none';
    });

    this.els.btnStoryToggle.addEventListener('click', () => this.showStoryModal());
    this.els.btnCloseStory.addEventListener('click', () => {
      soundEngine.playClick();
      this.els.storyModal.style.display = 'none';
    });

    this.els.btnOpenGallery.addEventListener('click', () => this.showGallery());
    this.els.btnCloseGallery.addEventListener('click', () => this.showMissionSelector());

    this.els.btnReviewMistakes.addEventListener('click', () => this.startMistakeReview());

    document.querySelectorAll('.mission-card').forEach(card => {
      card.addEventListener('click', () => {
        const missionId = parseInt(card.dataset.mission, 10);
        this.isSuddenDeath = card.dataset.mode === 'sudden';
        this.isBossBattle = missionId === 7;
        this.prepareMission(missionId);
      });
    });
  }

  handlePartyDebate() {
    const text = this.els.partyInputText.value.trim();
    if (!text) return;

    soundEngine.playClick();
    const results = waifuAIAssistant.runSuperAgentPartyDebate(text);

    this.els.partyDebateResults.innerHTML = '';
    this.els.partyInputText.value = '';

    results.forEach(res => {
      const card = document.createElement('div');
      card.style.background = 'rgba(255, 255, 255, 0.04)';
      card.style.border = '1px solid var(--neon-cyan)';
      card.style.borderRadius = '12px';
      card.style.padding = '14px';
      card.style.display = 'flex';
      card.style.gap = '14px';
      card.style.alignItems = 'center';

      const waifuObj = Object.values(WAIFU_MENTORS).find(w => w.name.includes(res.waifu)) || WAIFU_MENTORS[1];

      card.innerHTML = `
        <img src="${waifuObj.imgSrc}" alt="${res.waifu}" style="width: 54px; height: 54px; border-radius: 12px; border: 2px solid var(--neon-cyan); object-fit: cover;">
        <div>
          <h5 style="color: var(--neon-gold); font-family: var(--font-hud); font-size: 14px;">
            ${res.waifu} — <span style="color: var(--neon-cyan);">${res.role}</span>
          </h5>
          <p style="font-size: 13px; color: #f1f5f9; margin-top: 4px; line-height: 1.4;">${res.text}</p>
        </div>
      `;

      this.els.partyDebateResults.appendChild(card);
    });

    waifuVoiceEngine.speakTextFallback("¡La Party de Mentoras ha dictaminado el análisis completo de tu caso práctico!", "valeria");
  }

  handleMicInput() {
    soundEngine.playClick();
    this.els.assistantResponseBox.textContent = "🎙️ Escuchando por micrófono... ¡Habla ahora!";
    this.els.btnMicAssistant.textContent = "🔴 ESCUCHANDO...";

    waifuAIAssistant.startMicListening(
      (transcript) => {
        this.els.btnMicAssistant.textContent = "🎙️ HABLAR POR MICRÓFONO";
        this.els.assistantInputText.value = transcript;
        this.handleAssistantQuery();
      },
      (errorMsg) => {
        this.els.btnMicAssistant.textContent = "🎙️ HABLAR POR MICRÓFONO";
        this.els.assistantResponseBox.textContent = `⚠️ ${errorMsg}`;
      }
    );
  }

  handleAssistantQuery() {
    const text = this.els.assistantInputText.value.trim();
    if (!text) return;

    soundEngine.playClick();
    const waifuId = this.currentWaifu ? this.currentWaifu.id : 'valeria';
    const waifuName = this.currentWaifu ? this.currentWaifu.name : 'Valeria';
    const response = waifuAIAssistant.askMentor(text, waifuId, waifuName);

    this.els.assistantResponseBox.textContent = `"${response}"`;
    this.els.assistantInputText.value = '';

    waifuVoiceEngine.speakTextFallback(response, waifuId);
  }

  startLectureMode() {
    soundEngine.playClick();
    this.els.vnModal.style.display = 'none';

    const waifuKey = this.activeMission === 0 || this.activeMission === 7 ? 1 : this.activeMission;
    this.currentLecture = WAIFU_LECTURES[waifuKey] || WAIFU_LECTURES[1];
    this.lectureSlideIdx = 0;

    this.els.selectorScreen.style.display = 'none';
    this.els.battleScreen.style.display = 'none';
    this.els.resultScreen.style.display = 'none';
    this.els.galleryScreen.style.display = 'none';
    this.els.lectureScreen.style.display = 'flex';

    this.renderLectureSlide();
  }

  renderLectureSlide() {
    waifuVoiceEngine.stop();
    const slide = this.currentLecture.slides[this.lectureSlideIdx];
    this.els.lectureMainTitle.textContent = `🎥 ${this.currentLecture.title}`;
    this.els.lectureSlideCounter.textContent = `Diapositiva ${this.lectureSlideIdx + 1} de ${this.currentLecture.slides.length}`;
    
    this.els.lectureHeadline.textContent = slide.headline;
    this.els.lectureSubtext.textContent = slide.content;
    this.els.lectureKeyBox.textContent = slide.keyConcept;

    // Initialize SVG avatar in theater
    initAnimeAvatar('theater-avatar-container', this.currentWaifu.id, 220);
    // Init small battle avatar
    initAnimeAvatar('waifu-portrait-small', this.currentWaifu.id, 54);
    // Init VN portrait avatar
    initAnimeAvatar('vn-portrait', this.currentWaifu.id, 80);

    this.els.theaterWaifuName.textContent = `${this.currentWaifu.name} — ${this.currentWaifu.title}`;
    
    const waifuId = this.currentWaifu ? this.currentWaifu.id : 'valeria';
    this.els.theaterJpSub.textContent = `"${animeStudioAudio.getJapaneseSubtitle('intro', waifuId)}"`;

    this.els.voiceStatusTag.textContent = '🎙️ Voz Neural HD lista';

    this.els.btnLecturePrev.disabled = this.lectureSlideIdx === 0;
    this.els.btnLecturePrev.style.opacity = this.lectureSlideIdx === 0 ? '0.4' : '1';

    airiSoulEngine.updateAvatarImage(this.currentWaifu.imgSrc);
    this.speakCurrentSlide();
  }

  speakCurrentSlide() {
    const slide = this.currentLecture.slides[this.lectureSlideIdx];
    const fullText = `${slide.headline}. ${slide.content}. ${slide.keyConcept}`;
    
    const missionId = this.activeMission === 0 || this.activeMission === 7 ? 1 : this.activeMission;

    this.els.voiceStatusTag.textContent = '🔊 Reproduciendo en Castellano...';
    waifuVoiceEngine.playSlideVoice(missionId, this.lectureSlideIdx, fullText, this.currentWaifu.id, () => {
      this.els.voiceStatusTag.textContent = '✅ Explicación finalizada';
    });
  }

  nextLectureSlide() {
    soundEngine.playClick();
    if (this.lectureSlideIdx < this.currentLecture.slides.length - 1) {
      this.lectureSlideIdx++;
      this.renderLectureSlide();
    } else {
      this.closeLectureAndStartExam();
    }
  }

  prevLectureSlide() {
    soundEngine.playClick();
    if (this.lectureSlideIdx > 0) {
      this.lectureSlideIdx--;
      this.renderLectureSlide();
    }
  }

  closeLectureAndStartExam() {
    waifuVoiceEngine.stop();
    soundEngine.playClick();
    this.els.lectureScreen.style.display = 'none';
    this.startMissionExecution();
  }

  use50PercentHint() {
    soundEngine.playClick();
    const q = this.currentQuestions[this.currentIndex];
    const options = Array.from(this.els.optionsGrid.children);

    let wrongIndices = options
      .map((_, idx) => idx)
      .filter(idx => idx !== q.correct);

    wrongIndices.sort(() => Math.random() - 0.5);
    const toDisable = wrongIndices.slice(0, 2);

    toDisable.forEach(idx => {
      if (options[idx]) {
        options[idx].style.opacity = '0.3';
        options[idx].style.pointerEvents = 'none';
        options[idx].style.filter = 'grayscale(1)';
      }
    });

    this.els.btnHint50.disabled = true;
    this.els.btnHint50.style.opacity = '0.4';

    airiSoulEngine.speakAutonomous("¡Pista 50% activada! Descartadas 2 opciones incorrectas.", "TACTICAL");
  }

  showInventoryModal() {
    soundEngine.playClick();
    this.els.inventoryGrid.innerHTML = '';

    const items = [
      { id: 'pen_boe', name: '✒️ Pluma de Oro del BOE', desc: '+10% Bonus XP por cada acierto.', icon: '✒️' },
      { id: 'shield_40', name: '🛡️ Escudo Ley 40/2015', desc: 'Anula la penalización de -0.33 en el primer fallo.', icon: '🛡️' },
      { id: 'sakura_glass', name: '🔍 Lupa de Sakura', desc: 'Activa la Pista 50% en las preguntas.', icon: '🔍' },
      { id: 'medal_defense', name: '🎖️ Condecoración de Defensa', desc: '+50 Puntos de Afinidad con las mentoras.', icon: '🎖️' }
    ];

    items.forEach(item => {
      const isUnlocked = this.inventory.includes(item.id);
      const isEquipped = this.equippedItems.includes(item.id);

      const card = document.createElement('div');
      card.style.background = 'rgba(255, 255, 255, 0.04)';
      card.style.border = isEquipped ? '2px solid var(--neon-cyan)' : '1px solid rgba(255, 255, 255, 0.1)';
      card.style.padding = '14px';
      card.style.borderRadius = '12px';

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h4 style="color: var(--neon-cyan); font-family: var(--font-hud); font-size: 14px;">${item.name}</h4>
          <span style="font-size: 11px; color: ${isEquipped ? 'var(--neon-green)' : 'var(--text-muted)'}">${isEquipped ? 'EQUIPADO' : (isUnlocked ? 'DISPONIBLE' : 'BLOQUEADO')}</span>
        </div>
        <p style="font-size: 12px; color: var(--text-muted); margin-top: 6px;">${item.desc}</p>
      `;

      this.els.inventoryGrid.appendChild(card);
    });

    this.els.inventoryModal.style.display = 'flex';
  }

  showAchievementsModal() {
    soundEngine.playClick();
    this.els.achievementsGrid.innerHTML = '';

    const list = [
      { id: 'ach_1', title: '🏅 Primera Victoria Constitucional', desc: 'Supera la Misión 01 con Valeria.' },
      { id: 'ach_2', title: '🏅 Maestro del TREBEP', desc: 'Consigue 5 aciertos seguidos en Empleo Público.' },
      { id: 'ach_3', title: '🏅 Afinidad Total', desc: 'Alcanza 50 puntos de afinidad con cualquier mentora.' },
      { id: 'ach_4', title: '🏅 Coleccionista de Galería CG', desc: 'Desbloquea las 6 ilustraciones especiales CG.' },
      { id: 'ach_5', title: '🏅 Gran Auditor del BOE', desc: 'Supera la Gran Batalla de Examen (60 XP).' }
    ];

    list.forEach(ach => {
      const isUnlocked = this.achievements.includes(ach.id) || this.unlockedCGs.length > 0;
      const card = document.createElement('div');
      card.style.background = isUnlocked ? 'rgba(251, 191, 36, 0.1)' : 'rgba(255, 255, 255, 0.02)';
      card.style.border = isUnlocked ? '1px solid var(--neon-gold)' : '1px solid rgba(255, 255, 255, 0.08)';
      card.style.padding = '12px 16px';
      card.style.borderRadius = '10px';

      card.innerHTML = `
        <div style="font-family: var(--font-hud); color: ${isUnlocked ? 'var(--neon-gold)' : 'var(--text-muted)'}; font-size: 14px;">
          ${ach.title} ${isUnlocked ? '✅' : '🔒'}
        </div>
        <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${ach.desc}</div>
      `;
      this.els.achievementsGrid.appendChild(card);
    });

    this.els.achievementsModal.style.display = 'flex';
  }

  showStoryModal() {
    soundEngine.playClick();
    this.els.storySynopsis.textContent = GAME_STORYLINE.synopsis;
    this.els.storyChaptersContainer.innerHTML = '';

    GAME_STORYLINE.chapters.forEach(ch => {
      const card = document.createElement('div');
      card.style.background = 'rgba(255, 255, 255, 0.03)';
      card.style.border = '1px solid rgba(255, 255, 255, 0.1)';
      card.style.padding = '14px';
      card.style.borderRadius = '10px';

      card.innerHTML = `
        <h5 style="color: var(--neon-cyan); font-family: var(--font-hud); font-size: 14px; margin-bottom: 4px;">
          ${ch.title} — Mentora: ${ch.waifu}
        </h5>
        <p style="font-size: 13px; color: var(--text-muted); line-height: 1.4;">${ch.lore}</p>
      `;
      this.els.storyChaptersContainer.appendChild(card);
    });

    this.els.storyModal.style.display = 'flex';
  }

  showMissionSelector() {
    waifuVoiceEngine.stop();
    soundEngine.playClick();
    this.stopTimer();
    this.els.selectorScreen.style.display = 'flex';
    this.els.battleScreen.style.display = 'none';
    this.els.resultScreen.style.display = 'none';
    this.els.galleryScreen.style.display = 'none';
    this.els.vnModal.style.display = 'none';
    this.els.storyModal.style.display = 'none';
    this.els.inventoryModal.style.display = 'none';
    this.els.achievementsModal.style.display = 'none';
    this.els.assistantModal.style.display = 'none';
    this.els.partyModal.style.display = 'none';
    this.els.lectureScreen.style.display = 'none';
  }

  showGallery() {
    waifuVoiceEngine.stop();
    soundEngine.playClick();
    this.els.selectorScreen.style.display = 'none';
    this.els.battleScreen.style.display = 'none';
    this.els.resultScreen.style.display = 'none';
    this.els.galleryScreen.style.display = 'flex';

    this.renderGalleryGrid();
  }

  renderGalleryGrid() {
    this.els.cgGrid.innerHTML = '';
    
    Object.values(WAIFU_MENTORS).forEach(waifu => {
      const isUnlocked = this.unlockedCGs.includes(waifu.id);
      const card = document.createElement('div');
      card.className = `cg-card ${isUnlocked ? 'unlocked' : 'locked'}`;

      card.innerHTML = `
        <div class="cg-img-wrapper" style="background: rgba(15, 23, 42, 0.8); display: flex; justify-content: center; align-items: center; padding: 12px; height: 160px;">
          <img src="${waifu.imgSrc}" alt="${waifu.name}" style="max-height: 100%; object-fit: contain; filter: drop-shadow(0 4px 12px rgba(56,189,248,0.4));">
        </div>
        <div class="cg-info">
          <div class="cg-title">${isUnlocked ? `✨ Mentora Desbloqueada: ${waifu.name}` : '🔒 MENTORA BLOQUEADA'}</div>
          <div class="cg-status">${isUnlocked ? `Afinidad: ${this.affectionLevels[waifu.id] || 0} pts` : `Completa la ${waifu.blockTitle} para desbloquear.`}</div>
        </div>
      `;
      this.els.cgGrid.appendChild(card);
    });
  }

  prepareMission(missionId) {
    soundEngine.playClick();
    this.activeMission = missionId;
    
    const waifuKey = missionId === 0 || missionId === 7 ? 1 : missionId;
    this.currentWaifu = WAIFU_MENTORS[waifuKey] || WAIFU_MENTORS[1];

    // Init VN portrait with SVG avatar
    initAnimeAvatar('vn-portrait', this.currentWaifu.id, 80);
    this.els.vnName.textContent = this.currentWaifu.name;
    this.els.vnTitle.textContent = this.currentWaifu.title;
    this.els.vnDialogue.textContent = `"${this.currentWaifu.introDialogue}"`;
    setAvatarEmotion(this.currentWaifu.id, 'neutral');
    
    airiSoulEngine.updateAvatarImage(this.currentWaifu.imgSrc);

    this.els.vnModal.style.display = 'flex';
  }

  closeVnBriefingAndPlay() {
    soundEngine.playClick();
    this.els.vnModal.style.display = 'none';
    this.startMissionExecution();
  }

  startMissionExecution() {
    waifuVoiceEngine.stop();
    this.currentIndex = 0;
    this.totalXP = 0.0;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.passCount = 0;
    this.streakCount = 0;
    this.lives = 3;
    this.mistakeNotebook = [];

    if (this.activeMission === 0 || this.activeMission === 7) {
      const commonQ = QUESTION_BANK.filter(q => q.block === 'comun');
      const specQ = QUESTION_BANK.filter(q => q.block === 'especifico');
      const shuffledCommon = [...commonQ].sort(() => Math.random() - 0.5);
      const shuffledSpec = [...specQ].sort(() => Math.random() - 0.5);
      this.currentQuestions = [...shuffledCommon.slice(0, 20), ...shuffledSpec.slice(0, 40)];
      this.maxPossibleXP = 60.0;
    } else {
      this.currentQuestions = QUESTION_BANK.filter(q => q.mission === this.activeMission);
      this.maxPossibleXP = this.currentQuestions.length;
    }

    this.els.selectorScreen.style.display = 'none';
    this.els.resultScreen.style.display = 'none';
    this.els.galleryScreen.style.display = 'none';
    this.els.lectureScreen.style.display = 'none';
    this.els.battleScreen.style.display = 'flex';

    this.els.battleScreen.style.background = this.currentWaifu.bgStyle || 'var(--bg-card)';

    // Init all 3 avatar positions with SVG
    initAnimeAvatar('theater-avatar-container', this.currentWaifu.id, 220);
    initAnimeAvatar('waifu-portrait-small', this.currentWaifu.id, 54);

    this.els.waifuMoodBadge.textContent = "🤔";
    this.els.waifuSpeechText.textContent = `"${this.currentWaifu.name}: Concéntrate en la norma aplicable, ¡confío en ti!"`;

    this.startTimer();
    this.updateHUD();
    this.renderQuestion();
  }

  startTimer() {
    this.stopTimer();
    this.timerSeconds = 60 * 60;
    this.els.timerBadge.style.display = 'inline-block';

    this.timerInterval = setInterval(() => {
      this.timerSeconds--;
      const mins = Math.floor(this.timerSeconds / 60);
      const secs = this.timerSeconds % 60;
      this.els.timerBadge.textContent = `⏱️ ${mins}:${secs < 10 ? '0' : ''}${secs}`;

      if (this.timerSeconds <= 300) {
        this.els.timerBadge.classList.add('warning');
      }

      if (this.timerSeconds <= 0) {
        this.finishMission();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  startMistakeReview() {
    if (this.mistakeNotebook.length === 0) return;

    soundEngine.playClick();
    this.currentQuestions = [...this.mistakeNotebook];
    this.maxPossibleXP = this.currentQuestions.length;
    this.currentIndex = 0;
    this.totalXP = 0.0;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.passCount = 0;
    this.streakCount = 0;

    this.els.resultScreen.style.display = 'none';
    this.els.battleScreen.style.display = 'flex';

    this.updateHUD();
    this.renderQuestion();
  }

  updateHUD() {
    const roundedXP = Math.max(0, this.totalXP).toFixed(2);
    this.els.xpValue.textContent = `${roundedXP} / ${this.maxPossibleXP} XP`;

    const percentage = Math.min(100, Math.max(0, (this.totalXP / this.maxPossibleXP) * 100));
    this.els.xpProgressFill.style.width = `${percentage}%`;

    this.els.correctStat.textContent = this.correctCount;
    this.els.wrongStat.textContent = this.wrongCount;
    this.els.passStat.textContent = this.passCount;

    if (this.isSuddenDeath) {
      this.els.livesStat.style.display = 'inline-block';
      let hearts = '';
      for (let i = 0; i < this.lives; i++) hearts += '❤️ ';
      this.els.livesStat.textContent = `VIDAS: ${hearts}`;
    } else {
      this.els.livesStat.style.display = 'none';
    }

    const currentAffection = this.affectionLevels[this.currentWaifu.id] || 0;
    this.els.affectionValue.textContent = `❤️ Afinidad con ${this.currentWaifu.name}: ${currentAffection} pts`;

    if (this.streakCount >= 2) {
      this.els.comboBadge.style.display = 'inline-block';
      this.els.comboBadge.textContent = `🔥 COMBO x${this.streakCount}`;
    } else {
      this.els.comboBadge.style.display = 'none';
    }

    let rank = "Aspirante E1 (En Instrucción)";
    if (this.totalXP >= 55) rank = "🥇 Comandante Admin (N.º 1 de Promoción)";
    else if (this.totalXP >= 45) rank = "🥉 Especialista Táctico E1";
    else if (this.totalXP >= 30) rank = "🎖️ Auxiliar Operativo E1 (APROBADO)";

    this.els.rankName.textContent = rank;
  }

  renderQuestion() {
    this.selectedOption = null;
    this.els.feedbackCard.style.display = 'none';
    this.els.flashcardInner.classList.remove('flipped');
    this.els.btnSubmit.disabled = true;
    this.els.btnSubmit.style.opacity = '0.5';
    this.els.btnHint50.disabled = false;
    this.els.btnHint50.style.opacity = '1';

    const q = this.currentQuestions[this.currentIndex];
    
    if ((this.activeMission === 0 || this.activeMission === 7) && WAIFU_MENTORS[q.mission]) {
      this.currentWaifu = WAIFU_MENTORS[q.mission];
      // Re-init battle mini avatar when waifu changes
      initAnimeAvatar('waifu-portrait-small', this.currentWaifu.id, 54);
    }

    this.els.tagMission.textContent = q.block === 'comun' ? 'Bloque 1: Común' : 'Bloque 2: Específico';
    this.els.tagTopic.textContent = q.topic;
    this.els.questionCounter.textContent = `Pregunta ${this.currentIndex + 1} de ${this.currentQuestions.length}`;
    this.els.questionText.textContent = q.question;

    this.els.flashcardBackExp.innerHTML = `
      <h4 style="color: var(--neon-cyan); margin-bottom: 6px;">📜 ESQUEMA LEGAL DEL BOE:</h4>
      <p><strong>${q.law}</strong> - ${q.article}</p>
      <p style="margin-top: 8px; color: #f1f5f9;">${q.explanation}</p>
    `;

    this.els.optionsGrid.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    q.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `
        <span class="option-letter">${letters[idx]}</span>
        <span>${optText}</span>
      `;
      btn.addEventListener('click', () => {
        soundEngine.playClick();
        document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.selectedOption = idx;
        this.els.btnSubmit.disabled = false;
        this.els.btnSubmit.style.opacity = '1';
      });
      this.els.optionsGrid.appendChild(btn);
    });
  }

  getRandomReaction(type) {
    const list = this.currentWaifu.reactions[type] || ["¡Sigamos adelante!"];
    return list[Math.floor(Math.random() * list.length)];
  }

  handleAnswerSubmit() {
    if (this.selectedOption === null) return;
    const q = this.currentQuestions[this.currentIndex];
    const isCorrect = this.selectedOption === q.correct;

    if (isCorrect) {
      this.streakCount++;
      soundEngine.playCorrect();
      if (this.streakCount >= 2) soundEngine.playCombo(this.streakCount);

      this.particleEngine.triggerVictoryConfetti();

      this.totalXP += 1.0;
      this.correctCount++;

      this.affectionLevels[this.currentWaifu.id] = (this.affectionLevels[this.currentWaifu.id] || 0) + 1;
      localStorage.setItem('mision_admin_affection', JSON.stringify(this.affectionLevels));

      this.els.waifuMoodBadge.textContent = "🤩";
      soundEngine.playSpeechBlip(this.currentWaifu.id);

      const reaction = this.getRandomReaction('correct');
      this.els.waifuSpeechText.textContent = `"${this.currentWaifu.name}: ${reaction}"`;
      this.showFeedback('correct', '+1.00 XP', q);

      waifuVoiceEngine.playReactionVoice(this.currentWaifu.id, 'correct');
      airiSoulEngine.onCorrectAnswer(this.streakCount);
    } else {
      this.streakCount = 0;
      soundEngine.playWrong();

      this.els.container.classList.add('screen-shake');
      setTimeout(() => this.els.container.classList.remove('screen-shake'), 400);

      this.totalXP -= 0.33;
      this.wrongCount++;
      this.mistakeNotebook.push(q);

      if (this.isSuddenDeath) {
        this.lives--;
        if (this.lives <= 0) {
          setTimeout(() => this.finishMission(), 1000);
        }
      }

      this.els.waifuMoodBadge.textContent = "😨";
      soundEngine.playSpeechBlip(this.currentWaifu.id);

      const reaction = this.getRandomReaction('wrong');
      this.els.waifuSpeechText.textContent = `"${this.currentWaifu.name}: ${reaction}"`;
      this.showFeedback('wrong', '-0.33 XP', q);

      waifuVoiceEngine.playReactionVoice(this.currentWaifu.id, 'wrong');
      airiSoulEngine.onWrongAnswer();
    }

    this.updateHUD();
  }

  handlePassSubmit() {
    this.streakCount = 0;
    soundEngine.playPass();
    const q = this.currentQuestions[this.currentIndex];
    this.passCount++;
    this.mistakeNotebook.push(q);

    this.els.waifuMoodBadge.textContent = "🤔";
    soundEngine.playSpeechBlip(this.currentWaifu.id);

    const reaction = this.getRandomReaction('pass');
    this.els.waifuSpeechText.textContent = `"${this.currentWaifu.name}: ${reaction}"`;
    this.showFeedback('pass', '0.00 XP (Pasar)', q);
    this.updateHUD();

    waifuVoiceEngine.playReactionVoice(this.currentWaifu.id, 'pass');
  }

  showFeedback(type, deltaStr, q) {
    this.els.feedbackCard.style.display = 'flex';
    
    document.querySelectorAll('.option-btn').forEach(btn => btn.style.pointerEvents = 'none');
    this.els.btnSubmit.disabled = true;
    this.els.btnPass.disabled = true;

    if (type === 'correct') {
      this.els.feedbackVerdict.className = 'verdict-tag verdict-correct';
      this.els.feedbackVerdict.innerHTML = '⚔️ ¡Acierto Táctico!';
      this.els.feedbackDelta.className = 'delta-xp delta-positive';
      this.els.feedbackDelta.textContent = deltaStr;
      this.els.feedbackRisk.textContent = '🛡️ Análisis de Riesgo: Decisión de arriesgar totalmente acertada. ¡Dominio de la norma!';
    } else if (type === 'wrong') {
      this.els.feedbackVerdict.className = 'verdict-tag verdict-wrong';
      this.els.feedbackVerdict.innerHTML = '⚠️ Fallo Táctico (-1/3 Penalización)';
      this.els.feedbackDelta.className = 'delta-xp delta-negative';
      this.els.feedbackDelta.textContent = deltaStr;
      this.els.feedbackRisk.textContent = '⚠️ Análisis de Riesgo: Penalización de -0.33 XP activada. Si dudabas entre más de 2 opciones, la estrategia óptima era "PASAR".';
    } else {
      this.els.feedbackVerdict.className = 'verdict-tag verdict-pass';
      this.els.feedbackVerdict.innerHTML = '🛡️ Mitigación de Riesgo (Paso)';
      this.els.feedbackDelta.className = 'delta-xp delta-neutral';
      this.els.feedbackDelta.textContent = deltaStr;
      this.els.feedbackRisk.textContent = '🛡️ Análisis de Riesgo: Decisión estratégica correcta al dudar. Has protegido tu marcador evitando la resta de -0.33 XP.';
    }

    this.els.feedbackLegal.textContent = q.law;
    this.els.feedbackArticle.textContent = q.article;
    this.els.feedbackExp.textContent = q.explanation;

    const options = this.els.optionsGrid.children;
    if (options[q.correct]) {
      options[q.correct].style.borderColor = 'var(--neon-green)';
      options[q.correct].style.background = 'rgba(52, 211, 153, 0.15)';
    }
  }

  nextQuestion() {
    soundEngine.playClick();
    this.els.btnPass.disabled = false;
    this.currentIndex++;

    if (this.currentIndex >= this.currentQuestions.length) {
      this.finishMission();
    } else {
      this.renderQuestion();
    }
  }

  finishMission() {
    this.stopTimer();
    soundEngine.playVictory();
    this.particleEngine.triggerVictoryConfetti();

    this.els.battleScreen.style.display = 'none';
    this.els.resultScreen.style.display = 'flex';

    const finalXPNum = Math.max(0, this.totalXP).toFixed(2);
    this.els.finalXp.textContent = `${finalXPNum} XP`;

    const isPassed = this.totalXP >= (this.maxPossibleXP * 0.5);

    let cgUnlockedMsg = "";
    if (isPassed && this.currentWaifu && !this.unlockedCGs.includes(this.currentWaifu.id)) {
      this.unlockedCGs.push(this.currentWaifu.id);
      localStorage.setItem('mision_admin_cgs', JSON.stringify(this.unlockedCGs));
      cgUnlockedMsg = `
        <div style="background: rgba(251, 191, 36, 0.15); border: 2px solid var(--neon-gold); border-radius: 12px; padding: 16px; margin: 16px 0; text-align: center;">
          <h3 style="color: var(--neon-gold); font-family: var(--font-hud);">🎉 ¡RECOMPENSA DE MENTORA DESBLOQUEADA!</h3>
          <p style="font-weight: 700; color: #ffffff; margin-top: 4px;">Has desbloqueado la medalla de honor de ${this.currentWaifu.name}</p>
          <div style="height: 180px; display: flex; justify-content: center; align-items: center; background: rgba(15,23,42,0.8); border-radius: 8px; margin-top: 10px;">
            <img src="${this.currentWaifu.imgSrc}" alt="${this.currentWaifu.name}" style="max-height: 100%; object-fit: contain; filter: drop-shadow(0 4px 16px rgba(251,191,36,0.6));">
          </div>
        </div>
      `;
    }

    let rank = isPassed ? '🎖️ ¡APROBADO CON PLAZA EN DEFENSA!' : '❌ ASPIRANTE (No alcanzado el 50% de XP)';
    this.els.finalRank.textContent = rank;
    this.els.finalRank.style.color = isPassed ? 'var(--neon-green)' : 'var(--neon-pink)';

    const waifuComment = isPassed ? this.currentWaifu.victoryDialogue : this.currentWaifu.defeatDialogue;

    if (this.mistakeNotebook.length > 0) {
      this.els.btnReviewMistakes.style.display = 'inline-block';
      this.els.btnReviewMistakes.textContent = `📝 REPASAR ${this.mistakeNotebook.length} ERRORES / PASOS`;
    } else {
      this.els.btnReviewMistakes.style.display = 'none';
    }

    this.els.finalSummary.innerHTML = `
      ${cgUnlockedMsg}
      <div style="background: rgba(192, 132, 252, 0.1); border: 1px solid var(--neon-purple); border-radius: 12px; padding: 16px; margin-bottom: 20px; text-align: left; display: flex; gap: 16px; align-items: center;">
        <img src="${this.currentWaifu.imgSrc}" alt="${this.currentWaifu.name}" style="width: 60px; height: 60px; border-radius: 12px; border: 2px solid var(--neon-purple); object-fit: contain; background: #0f172a; padding: 4px;">
        <div>
          <h4 style="color: var(--neon-purple); font-family: var(--font-hud); margin-bottom: 4px;">💬 DEBRIEFING DE ${this.currentWaifu.name.toUpperCase()}</h4>
          <p style="font-style: italic; color: #f1f5f9; font-size: 14px;">"${waifuComment}"</p>
        </div>
      </div>

      <p><strong>Aciertos:</strong> ${this.correctCount} (+${this.correctCount} XP)</p>
      <p><strong>Fallos:</strong> ${this.wrongCount} (-${(this.wrongCount * 0.33).toFixed(2)} XP)</p>
      <p><strong>En blanco (Paso):</strong> ${this.passCount} (0.00 XP protegidos)</p>
    `;

    if (isPassed) {
      airiSoulEngine.speakAutonomous("¡Felicidades por aprobar la Misión Táctica! Tu esfuerzo te acerca a tu plaza.", "EXCITED");
    } else {
      airiSoulEngine.speakAutonomous("¡Ánimo! Repasa el cuaderno de errores y vuelve a intentarlo.", "NERVOUS");
    }
  }

  showPokemonOpoMode() {
    waifuVoiceEngine.stop();
    soundEngine.playClick();
    this.stopTimer();
    this.els.selectorScreen.style.display = 'none';
    this.els.battleScreen.style.display = 'none';
    this.els.resultScreen.style.display = 'none';
    this.els.galleryScreen.style.display = 'none';
    this.els.lectureScreen.style.display = 'none';
    this.els.vnModal.style.display = 'none';

    if (this.els.pokemonScreen) {
      this.els.pokemonScreen.style.display = 'block';
      if (typeof pokemonOpoEngine !== 'undefined') {
        pokemonOpoEngine.init('pokemon-container');
      }
    }
  }
}

function toggleBGMTrack() {
  const isPlaying = soundEngine.toggleBGM();
  const btn = document.getElementById('theater-btn-bgm');
  const status = document.getElementById('theater-voice-status');
  if (btn) {
    if (isPlaying) {
      btn.style.background = 'rgba(34,197,94,0.3)';
      btn.style.borderColor = '#22c55e';
      btn.style.color = '#4ade80';
      btn.textContent = '⏸️ PAUSAR MÚSICA';
      if (status) status.textContent = soundEngine.getCurrentTrackName();
    } else {
      btn.style.background = 'rgba(236,72,153,0.25)';
      btn.style.borderColor = '#ec4899';
      btn.style.color = '#f472b6';
      btn.textContent = '🎵 BGM BUBBLEGUM';
      if (status) status.textContent = '🎵 Música silenciada';
    }
  }
}

function nextBGMTrack() {
  const trackName = soundEngine.nextTrack();
  const status = document.getElementById('theater-voice-status');
  const btn = document.getElementById('theater-btn-bgm');
  if (status) status.textContent = trackName;
  if (btn) {
    btn.style.background = 'rgba(34,197,94,0.3)';
    btn.style.borderColor = '#22c55e';
    btn.style.color = '#4ade80';
    btn.textContent = '⏸️ PAUSAR MÚSICA';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.game = new MissionAdminGame();
  setTimeout(() => {
    if (window.game && window.game.showPokemonOpoMode) {
      window.game.showPokemonOpoMode();
    }
  }, 100);
});
