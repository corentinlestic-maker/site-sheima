document.addEventListener('DOMContentLoaded', () => {
  // Pour tes tests : 10 secondes. Pour le jour J, commente ça et décommente la vraie date en dessous !
  const TARGET = new Date(new Date().getTime() + 10000); 
  // const TARGET = new Date('2026-06-28T10:00:00'); 

  const els = {
    d: document.getElementById('d'),
    h: document.getElementById('h'),
    m: document.getElementById('m'),
    s: document.getElementById('s'),
  };

  if (!els.d || !els.h || !els.m || !els.s) return;

  const prev = { d: null, h: null, m: null, s: null };

  function pad(n) { return String(Math.floor(n)).padStart(2, '0'); }

  function flash(el) {
    el.classList.remove('ping');
    void el.offsetWidth;
    el.classList.add('ping');
  }

  function tick() {
    const now = new Date();
    const diff = TARGET - now;

    // Calcul du temps restant
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    // --- GESTION DES INDICES (Change le texte selon les jours restants) ---
    const messageEl = document.getElementById('message');
    if (messageEl && diff > 0) {
      if (d === 3) {
        messageEl.innerHTML = "Indice J-3 : Prépare tes yeux pour du grand bleu...<br><span class='author'>— Corentin</span>";
      } else if (d === 2) {
        messageEl.innerHTML = "Indice J-2 : On va rendre visite à des habitants qui ne clignent jamais des yeux.<br><span class='author'>— Corentin</span>";
      } else if (d === 1) {
        messageEl.innerHTML = "Indice J-1 (Énigme) : Je plane majestueusement sans jamais toucher le ciel. Qui suis-je ?<br><span class='author'>— Retiens bien la réponse pour demain...</span>";
      } else if (d > 3) {
        messageEl.innerHTML = "\"j'ai pensé à toi pour cette surprise,<br>parce que tu mérites un moment qui te ressemble.\"<br><span class='author'>— Corentin</span>";
      }
    }

    // --- LE MOMENT OU LE COMPTE A REBOURS FINIT (Avec transition douce) ---
    if (diff <= 0) {
      // 1. On applique l'effet de fondu pour faire disparaître les éléments
      document.getElementById('headline').classList.add('fade-out');
      document.getElementById('countdown').classList.add('fade-out');
      document.getElementById('date-card').classList.add('fade-out');
      
      if (messageEl) messageEl.classList.add('fade-out');
      
      const badgeEl = document.getElementById('badge');
      if (badgeEl) badgeEl.classList.add('fade-out');

      // 2. On attend la fin de l'animation CSS (800ms) avant d'afficher la suite
      setTimeout(() => {
        // On cache vraiment les éléments
        document.getElementById('headline').classList.add('hidden');
        document.getElementById('countdown').classList.add('hidden');
        document.getElementById('date-card').classList.add('hidden');
        if (messageEl) messageEl.classList.add('hidden');
        if (badgeEl) badgeEl.classList.add('hidden');

        // On affiche le verrou avec l'énigme
        document.getElementById('surprise-reveal').classList.remove('hidden');
      }, 800);

      clearInterval(timerInterval);
      return; 
    }

    // Mise à jour de l'affichage du timer
    ['d','h','m','s'].forEach(k => {
      const val = pad({ d, h, m, s }[k]);
      if (val !== prev[k]) {
        els[k].textContent = val;
        if (prev[k] !== null) flash(els[k]);
        prev[k] = val;
      }
    });
  }

  const timerInterval = setInterval(tick, 1000);
  tick();

  // --- VERROU DE FRUSTRATION ET DECODAGE SECRET ---
  const unlockBtn = document.getElementById('unlock-btn');
  const secretInput = document.getElementById('secret-input');
  const errorMsg = document.getElementById('error-msg');
  const ticketContainer = document.getElementById('ticket-container');
  const passwordLock = document.getElementById('password-lock');

  if (unlockBtn) {
    unlockBtn.addEventListener('click', () => {
      // On met la réponse en majuscules pour éviter les erreurs de casse
      const guess = secretInput.value.trim().toUpperCase();
      
      // Les réponses acceptées
      if (guess === 'RAIE' || guess === 'MANTA' || guess === 'LA RAIE') {
        // Bonne réponse ! On cache le cadenas et on montre la pochette
        passwordLock.classList.add('hidden');
        ticketContainer.classList.remove('hidden');
        
        // On traduit le code secret en "Nausicaá" pour l'afficher sur le billet
        document.getElementById('destination-secrete').textContent = atob('TmF1c2ljYcOh');

        // ✨ APPARITION DU FOND RAIE MANTA 4K
        const oceanBg = document.getElementById('ocean-bg');
        if (oceanBg) oceanBg.classList.add('show');
        
      } else {
        // Mauvaise réponse ! On affiche l'erreur
        errorMsg.classList.remove('hidden');
        if(secretInput) flash(secretInput);
      }
    });
  }

  // --- INTERACTION : CLIC POUR OUVRIR LA POCHETTE ---
  const sleeve = document.getElementById('sleeve');
  const ticketWrapper = document.getElementById('ticket-wrapper');

  if (sleeve && ticketWrapper) {
    sleeve.addEventListener('click', () => {
      ticketWrapper.classList.add('is-open');
    });
  }

  // --- PARTICULES EN FOND ---
  const particleContainer = document.getElementById('particles');
  if (particleContainer) {
    for (let i = 0; i < 25; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = 2 + Math.random() * 3;
      p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random() * 100}%;
        bottom: -10px;
        animation-duration:${10 + Math.random() * 15}s;
        animation-delay:${Math.random() * 10}s;
      `;
      particleContainer.appendChild(p);
    }
  }
});