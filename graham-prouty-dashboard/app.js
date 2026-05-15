/* ============================================
   GRAHAM PROUTY DASHBOARD
   ============================================ */

const STORAGE_KEY = 'gp_dashboard_v1';

const QUOTES = [
    { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
    { text: "The market rewards the patient and punishes the impulsive. Same with life.", author: "Anonymous" },
    { text: "Compound interest is the eighth wonder of the world. He who understands it, earns it.", author: "Albert Einstein" },
    { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
    { text: "Every morning you have two choices: continue to sleep with your dreams, or wake up and chase them.", author: "Carmelo Anthony" },
    { text: "The best investment you can make is in yourself.", author: "Warren Buffett" },
    { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
    { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
    { text: "Risk comes from not knowing what you're doing.", author: "Warren Buffett" },
    { text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke" },
    { text: "Turn your passion into your edge. Then turn your edge into a career.", author: "Anonymous" },
    { text: "Be the kind of person your future self will thank.", author: "Anonymous" }
];

const PARKS = [
    { id: 'mk', name: 'Magic Kingdom' },
    { id: 'epcot', name: 'EPCOT' },
    { id: 'hs', name: 'Hollywood Studios' },
    { id: 'ak', name: 'Animal Kingdom' }
];

const SHEETS = [
    'Cover Page', 'Assumptions', 'Revenue', 'Operating Model',
    'DCF', 'Comparables', 'Sensitivity', 'Sources'
];

const TOPICS = ['Finance Fundamentals', 'Excel', 'AI Skills', 'Disney Modeling', 'CFA Prep'];

const BLUEPRINT_ITEMS = [
    { icon: 'sun', text: 'Wake up at 6AM and attack the day with intention.' },
    { icon: 'dumbbell', text: 'Gym 5 times per week, 10,000 steps daily, eat clean with the 80/20 rule.' },
    { icon: 'cross', text: 'Stay grounded in faith through daily devotion and prayer.' },
    { icon: 'chart', text: 'Build finance, Excel, and AI skills through 45 minutes of focused daily study.' },
    { icon: 'castle', text: 'Build a Disney Parks valuation model that bridges passion and career.' },
    { icon: 'heart', text: 'Be present for family, loyal to friends, and positive in every room.' },
    { icon: 'film', text: 'Keep passions alive including film, theme parks, fitness, sports, and culture.' },
    { icon: 'dollar', text: 'Reach $80,000 to $100,000 by age 24 through smart career moves and aggressive saving.' },
    { icon: 'star', text: 'Turn passion for entertainment and theme parks into a unique edge in finance.' }
];

const BP_ICONS = {
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>',
    dumbbell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6v12M18 6v12M2 9v6M22 9v6M6 12h12"/></svg>',
    cross: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v6H4v8h6v6h4v-6h6V8h-6V2z"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></svg>',
    castle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V10l3 2V8l3 2V6l3-3 3 3v4l3-2v4l3-2v11z"/><path d="M10 21v-5h4v5"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    film: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"/></svg>',
    dollar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
};

/* ============================================
   STATE
   ============================================ */

const defaultState = () => ({
    lastDate: todayKey(),
    daily: {
        priority1: false, priority2: false, priority3: false,
        priority1Text: '', priority2Text: '', priority3Text: '',
        devotion: false, prayer: false, devotionNote: '',
        gym: false, steps: false, eatWell: false, presented: false,
        family: false, friend: false, positive: false
    },
    wins: [],
    study: {
        sessions: [],
        topics: { 'Finance Fundamentals': 0, 'Excel': 0, 'AI Skills': 0, 'Disney Modeling': 0, 'CFA Prep': 0 },
        streakDays: 0,
        lastSessionDate: null
    },
    disney: {
        mk: new Array(8).fill(false),
        epcot: new Array(8).fill(false),
        hs: new Array(8).fill(false),
        ak: new Array(8).fill(false)
    },
    reflections: []
});

let state;

function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return defaultState();
        const parsed = JSON.parse(raw);
        const fresh = defaultState();
        return { ...fresh, ...parsed,
            daily: { ...fresh.daily, ...(parsed.daily || {}) },
            study: { ...fresh.study, ...(parsed.study || {}),
                topics: { ...fresh.study.topics, ...((parsed.study && parsed.study.topics) || {}) }
            },
            disney: { ...fresh.disney, ...(parsed.disney || {}) }
        };
    } catch (e) {
        return defaultState();
    }
}

function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (e) { /* ignore */ }
}

/* ============================================
   DATES
   ============================================ */

function todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function formatDateLong(dateInput) {
    const d = dateInput ? new Date(dateInput) : new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function formatDateShort(dateInput) {
    const d = new Date(dateInput);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function dayDiff(a, b) {
    const d1 = new Date(a); d1.setHours(0,0,0,0);
    const d2 = new Date(b); d2.setHours(0,0,0,0);
    return Math.round((d2 - d1) / 86400000);
}

function checkMidnightReset() {
    if (state.lastDate !== todayKey()) {
        const fresh = defaultState();
        state.daily = fresh.daily;
        state.lastDate = todayKey();
        saveState();
    }
}

/* ============================================
   NAVIGATION
   ============================================ */

function initNav() {
    document.querySelectorAll('.nav-item, .bnav-item').forEach(btn => {
        btn.addEventListener('click', () => switchSection(btn.dataset.section));
    });
}

function switchSection(name) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(`section-${name}`).classList.add('active');
    document.querySelectorAll('.nav-item, .bnav-item').forEach(b => {
        b.classList.toggle('active', b.dataset.section === name);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============================================
   SECTION 1: MORNING
   ============================================ */

function initGreeting() {
    const h = new Date().getHours();
    let greet;
    if (h < 12) greet = 'Good morning, Graham';
    else if (h < 17) greet = 'Good afternoon, Graham';
    else greet = 'Good evening, Graham';
    document.getElementById('greeting').textContent = greet;
    document.getElementById('todayDate').textContent = formatDateLong();
}

function initQuote() {
    const d = new Date();
    const dayOfYear = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000);
    const q = QUOTES[dayOfYear % QUOTES.length];
    document.getElementById('dailyQuote').textContent = q.text;
    document.getElementById('dailyQuoteAuthor').textContent = `— ${q.author}`;
}

function initCheckRows() {
    document.querySelectorAll('.check-row').forEach(row => {
        const key = row.dataset.key;
        if (!key) return;
        if (state.daily[key]) row.classList.add('checked');
        const input = row.querySelector('.hide-check');
        input.checked = !!state.daily[key];
        row.addEventListener('click', (e) => {
            if (e.target.tagName === 'INPUT' && e.target.type === 'text') return;
            if (e.target.tagName === 'TEXTAREA') return;
            e.preventDefault();
            state.daily[key] = !state.daily[key];
            row.classList.toggle('checked', state.daily[key]);
            input.checked = state.daily[key];
            saveState();
            updateGlance();
        });
    });

    document.querySelectorAll('[data-text-key]').forEach(input => {
        const key = input.dataset.textKey;
        input.value = state.daily[key] || '';
        input.addEventListener('input', () => {
            state.daily[key] = input.value;
            saveState();
        });
    });
}

function updateGlance() {
    const habitKeys = ['priority1','priority2','priority3','devotion','prayer','gym','steps','eatWell','presented','family','friend','positive'];
    const done = habitKeys.filter(k => state.daily[k]).length;
    document.getElementById('glanceDone').textContent = done;
    document.getElementById('glanceTotal').textContent = habitKeys.length;
    const sub = document.getElementById('glanceSub');
    if (done === habitKeys.length) sub.textContent = 'Perfect day. You did the work.';
    else if (done >= habitKeys.length - 2) sub.textContent = "Almost there. Finish what you started.";
    else if (done >= habitKeys.length / 2) sub.textContent = 'Strong momentum. Keep going.';
    else if (done > 0) sub.textContent = 'You started. Now stack a few more.';
    else sub.textContent = 'A blank slate. Make it count.';
}

/* ============================================
   SECTION 2: WINS
   ============================================ */

function initWins() {
    const btn = document.getElementById('saveWinBtn');
    const input = document.getElementById('winInput');
    btn.addEventListener('click', () => {
        const text = input.value.trim();
        if (!text) return;
        state.wins.unshift({ text, date: todayKey() });
        state.wins = state.wins.slice(0, 50);
        input.value = '';
        saveState();
        renderWins();
        toast('Win saved.');
    });
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') btn.click(); });
    renderWins();
}

function renderWins() {
    const list = document.getElementById('winList');
    if (!state.wins.length) {
        list.innerHTML = '<div class="empty-state">No wins logged yet. The first one is the hardest.</div>';
        return;
    }
    list.innerHTML = state.wins.slice(0, 5).map(w => `
        <div class="win-item">
            <div class="win-date">${formatDateShort(w.date)}</div>
            <div class="win-text">${escapeHtml(w.text)}</div>
        </div>
    `).join('');
}

/* ============================================
   SECTION 3: STUDY TIMER
   ============================================ */

let timerInterval = null;
let timerElapsed = 0;
let timerStartTime = null;
let timerRunning = false;

function initTimer() {
    document.getElementById('startTimerBtn').addEventListener('click', startTimer);
    document.getElementById('pauseTimerBtn').addEventListener('click', pauseTimer);
    document.getElementById('logSessionBtn').addEventListener('click', logSession);
    updateTimerDisplay();
}

function startTimer() {
    if (timerRunning) return;
    timerRunning = true;
    timerStartTime = Date.now();
    document.getElementById('timerDisplay').classList.add('running');
    timerInterval = setInterval(() => {
        const now = Date.now();
        const display = timerElapsed + (now - timerStartTime);
        updateTimerDisplay(display);
    }, 250);
}

function pauseTimer() {
    if (!timerRunning) return;
    timerRunning = false;
    clearInterval(timerInterval);
    timerElapsed += Date.now() - timerStartTime;
    document.getElementById('timerDisplay').classList.remove('running');
    updateTimerDisplay(timerElapsed);
}

function logSession() {
    if (timerRunning) pauseTimer();
    const minutes = Math.floor(timerElapsed / 60000);
    if (minutes < 1) {
        toast('Need at least 1 minute to log.');
        return;
    }
    const topic = document.getElementById('topicSelect').value;
    const today = todayKey();
    const session = { topic, minutes, date: today };
    state.study.sessions.unshift(session);
    state.study.topics[topic] = (state.study.topics[topic] || 0) + minutes;

    // Streak
    if (state.study.lastSessionDate) {
        const diff = dayDiff(state.study.lastSessionDate, today);
        if (diff === 0) { /* same day, keep streak */ }
        else if (diff === 1) { state.study.streakDays += 1; }
        else { state.study.streakDays = 1; }
    } else {
        state.study.streakDays = 1;
    }
    state.study.lastSessionDate = today;

    timerElapsed = 0;
    timerStartTime = null;
    updateTimerDisplay();
    saveState();
    renderStudy();
    toast(`Logged ${minutes} min of ${topic}.`);
}

function updateTimerDisplay(ms) {
    const total = Math.floor((ms || timerElapsed) / 1000);
    const h = String(Math.floor(total / 3600)).padStart(2, '0');
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
    const s = String(total % 60).padStart(2, '0');
    document.getElementById('timerDisplay').textContent = `${h}:${m}:${s}`;
}

function checkStudyStreak() {
    if (!state.study.lastSessionDate) return;
    const diff = dayDiff(state.study.lastSessionDate, todayKey());
    if (diff > 1) {
        state.study.streakDays = 0;
        saveState();
    }
}

function renderStudy() {
    const totalMin = Object.values(state.study.topics).reduce((a, b) => a + b, 0);
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    document.getElementById('totalStudyTime').textContent = `${h}h ${m}m`;
    document.getElementById('totalSessions').textContent = state.study.sessions.length;
    document.getElementById('studyStreak').textContent = state.study.streakDays;
    document.getElementById('streakFlame').classList.toggle('visible', state.study.streakDays > 0);

    const topicList = document.getElementById('topicList');
    const max = Math.max(...Object.values(state.study.topics), 1);
    topicList.innerHTML = TOPICS.map(t => {
        const mins = state.study.topics[t] || 0;
        const pct = (mins / max) * 100;
        const hh = Math.floor(mins / 60);
        const mm = mins % 60;
        return `
            <div class="topic-row">
                <div class="topic-head">
                    <span class="topic-name">${t}</span>
                    <span class="topic-time">${hh > 0 ? hh + 'h ' : ''}${mm}m</span>
                </div>
                <div class="topic-bar"><div class="topic-bar-fill" style="width: ${pct}%"></div></div>
            </div>
        `;
    }).join('');

    const sessionList = document.getElementById('sessionList');
    if (!state.study.sessions.length) {
        sessionList.innerHTML = '<div class="empty-state">No sessions logged yet. Start the timer above.</div>';
    } else {
        sessionList.innerHTML = state.study.sessions.slice(0, 5).map(s => `
            <div class="session-item">
                <div class="session-left">
                    <div class="session-topic">${s.topic}</div>
                    <div class="session-date">${formatDateShort(s.date)}</div>
                </div>
                <div class="session-duration">${s.minutes} min</div>
            </div>
        `).join('');
    }
}

/* ============================================
   SECTION 4: DISNEY MODEL
   ============================================ */

function initDisney() {
    const grid = document.getElementById('parkGrid');
    grid.innerHTML = PARKS.map(park => {
        const completedCount = state.disney[park.id].filter(Boolean).length;
        const pct = Math.round((completedCount / 8) * 100);
        const isComplete = completedCount === 8;
        return `
            <div class="park-card${isComplete ? ' complete' : ''}" data-park="${park.id}">
                <div class="park-badge">Complete</div>
                <div class="park-name">${park.name}</div>
                <div class="park-percent"><strong>${pct}%</strong> &middot; ${completedCount} of 8 sheets</div>
                <div class="park-bar"><div class="park-bar-fill" style="width: ${pct}%"></div></div>
                <div class="sheet-grid">
                    ${SHEETS.map((name, i) => `
                        <div class="sheet-circle${state.disney[park.id][i] ? ' complete' : ''}" data-park="${park.id}" data-sheet="${i}">
                            <div class="sheet-tooltip">${name}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');

    grid.querySelectorAll('.sheet-circle').forEach(c => {
        c.addEventListener('click', () => {
            const p = c.dataset.park;
            const i = parseInt(c.dataset.sheet, 10);
            state.disney[p][i] = !state.disney[p][i];
            saveState();
            initDisney();
            updateOverall();
        });
    });

    updateOverall();
}

function updateOverall() {
    let total = 0;
    PARKS.forEach(p => {
        total += state.disney[p.id].filter(Boolean).length;
    });
    const pct = Math.round((total / 32) * 100);
    document.getElementById('overallPercent').textContent = pct;
    document.getElementById('overallBarFill').style.width = pct + '%';
    document.getElementById('overallDetail').textContent = `${total} of 32 sheets complete`;
}

/* ============================================
   SECTION 5: REFLECTIONS
   ============================================ */

function initReflection() {
    document.getElementById('saveReflectionBtn').addEventListener('click', () => {
        const input = document.getElementById('reflectionInput');
        const text = input.value.trim();
        if (!text) { toast('Write something first.'); return; }
        state.reflections.unshift({ text, date: todayKey() });
        state.reflections = state.reflections.slice(0, 52);
        input.value = '';
        saveState();
        renderReflections();
        toast('Reflection saved.');
    });
    renderReflections();
}

function renderReflections() {
    const t = document.getElementById('reflectionTimeline');
    if (!state.reflections.length) {
        t.innerHTML = '<div class="empty-state">Your first reflection will appear here.</div>';
        return;
    }
    t.innerHTML = state.reflections.slice(0, 8).map(r => `
        <div class="timeline-item">
            <div class="timeline-date">${formatDateShort(r.date)}</div>
            <div class="timeline-text">${escapeHtml(r.text)}</div>
        </div>
    `).join('');
}

/* ============================================
   SECTION 6: BLUEPRINT
   ============================================ */

function initBlueprint() {
    const grid = document.getElementById('blueprintGrid');
    grid.innerHTML = BLUEPRINT_ITEMS.map(item => `
        <div class="bp-card">
            <div class="bp-icon">${BP_ICONS[item.icon]}</div>
            <div class="bp-text">${item.text}</div>
        </div>
    `).join('');
}

/* ============================================
   HELPERS
   ============================================ */

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

let toastTimer = null;
function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('visible'), 2400);
}

/* ============================================
   INIT
   ============================================ */

function init() {
    state = loadState();
    checkMidnightReset();
    checkStudyStreak();

    initNav();
    initGreeting();
    initQuote();
    initCheckRows();
    updateGlance();
    initWins();
    initTimer();
    renderStudy();
    initDisney();
    initReflection();
    initBlueprint();

    // Fade out loading screen
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 1000);

    // Midnight watcher
    setInterval(() => {
        if (state.lastDate !== todayKey()) {
            checkMidnightReset();
            initCheckRows();
            updateGlance();
        }
    }, 60000);
}

document.addEventListener('DOMContentLoaded', init);
