/* ===========================================================================
   accord — 디자인 핸드오프 프로토타입 (순수 JS, 의존성 없음)
   현재 React 목업을 그대로 옮긴 것. 해시 라우팅 + localStorage 상태.
   =========================================================================== */

/* ---------- 아이콘 (lucide 원본 SVG path) ------------------------------- */
const ICONS = {"ChevronUp":"<path d=\"m18 15-6-6-6 6\"></path>","ChevronDown":"<path d=\"m6 9 6 6 6-6\"></path>","Search":"<circle cx=\"11\" cy=\"11\" r=\"8\"></circle><path d=\"m21 21-4.3-4.3\"></path>","X":"<path d=\"M18 6 6 18\"></path><path d=\"m6 6 12 12\"></path>","Settings":"<path d=\"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z\"></path><circle cx=\"12\" cy=\"12\" r=\"3\"></circle>","LogOut":"<path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\"></path><polyline points=\"16 17 21 12 16 7\"></polyline><line x1=\"21\" x2=\"9\" y1=\"12\" y2=\"12\"></line>","Shield":"<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\"></path>","HelpCircle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3\"></path><path d=\"M12 17h.01\"></path>","Pencil":"<path d=\"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z\"></path><path d=\"m15 5 4 4\"></path>","Check":"<path d=\"M20 6 9 17l-5-5\"></path>","ChevronLeft":"<path d=\"m15 18-6-6 6-6\"></path>","ChevronRight":"<path d=\"m9 18 6-6-6-6\"></path>","Bell":"<path d=\"M10.268 21a2 2 0 0 0 3.464 0\"></path><path d=\"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326\"></path>","Plus":"<path d=\"M5 12h14\"></path><path d=\"M12 5v14\"></path>","Home":"<path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\"></path><path d=\"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path>","Calendar":"<path d=\"M8 2v4\"></path><path d=\"M16 2v4\"></path><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\"></rect><path d=\"M3 10h18\"></path>","ClipboardList":"<rect width=\"8\" height=\"4\" x=\"8\" y=\"2\" rx=\"1\" ry=\"1\"></rect><path d=\"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2\"></path><path d=\"M12 11h4\"></path><path d=\"M12 16h4\"></path><path d=\"M8 11h.01\"></path><path d=\"M8 16h.01\"></path>","User":"<path d=\"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2\"></path><circle cx=\"12\" cy=\"7\" r=\"4\"></circle>","Smile":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M8 14s1.5 2 4 2 4-2 4-2\"></path><line x1=\"9\" x2=\"9.01\" y1=\"9\" y2=\"9\"></line><line x1=\"15\" x2=\"15.01\" y1=\"9\" y2=\"9\"></line>","Utensils":"<path d=\"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2\"></path><path d=\"M7 2v20\"></path><path d=\"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7\"></path>","Plane":"<path d=\"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z\"></path>","Palmtree":"<path d=\"M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4\"></path><path d=\"M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3\"></path><path d=\"M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35\"></path><path d=\"M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14\"></path>","MoreHorizontal":"<circle cx=\"12\" cy=\"12\" r=\"1\"></circle><circle cx=\"19\" cy=\"12\" r=\"1\"></circle><circle cx=\"5\" cy=\"12\" r=\"1\"></circle>","Sparkles":"<path d=\"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z\"></path><path d=\"M20 2v4\"></path><path d=\"M22 4h-4\"></path><circle cx=\"4\" cy=\"20\" r=\"2\"></circle>","Users":"<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"></path><path d=\"M16 3.128a4 4 0 0 1 0 7.744\"></path><path d=\"M22 21v-2a4 4 0 0 0-3-3.87\"></path><circle cx=\"9\" cy=\"7\" r=\"4\"></circle>","Clock":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M12 6v6l4 2\"></path>","Send":"<path d=\"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z\"></path><path d=\"m21.854 2.147-10.94 10.939\"></path>","Sunrise":"<path d=\"M12 2v8\"></path><path d=\"m4.93 10.93 1.41 1.41\"></path><path d=\"M2 18h2\"></path><path d=\"M20 18h2\"></path><path d=\"m19.07 10.93-1.41 1.41\"></path><path d=\"M22 22H2\"></path><path d=\"m8 6 4-4 4 4\"></path><path d=\"M16 18a4 4 0 0 0-8 0\"></path>","Sunset":"<path d=\"M12 10V2\"></path><path d=\"m4.93 10.93 1.41 1.41\"></path><path d=\"M2 18h2\"></path><path d=\"M20 18h2\"></path><path d=\"m19.07 10.93-1.41 1.41\"></path><path d=\"M22 22H2\"></path><path d=\"m16 6-4 4-4-4\"></path><path d=\"M16 18a4 4 0 0 0-8 0\"></path>","Target":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><circle cx=\"12\" cy=\"12\" r=\"6\"></circle><circle cx=\"12\" cy=\"12\" r=\"2\"></circle>","Repeat":"<path d=\"m17 2 4 4-4 4\"></path><path d=\"M3 11v-1a4 4 0 0 1 4-4h14\"></path><path d=\"m7 22-4-4 4-4\"></path><path d=\"M21 13v1a4 4 0 0 1-4 4H3\"></path>","CalendarDays":"<path d=\"M8 2v4\"></path><path d=\"M16 2v4\"></path><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\"></rect><path d=\"M3 10h18\"></path><path d=\"M8 14h.01\"></path><path d=\"M12 14h.01\"></path><path d=\"M16 14h.01\"></path><path d=\"M8 18h.01\"></path><path d=\"M12 18h.01\"></path><path d=\"M16 18h.01\"></path>","Circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle>","MessageCircle":"<path d=\"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719\"></path>","CheckCircle2":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"m9 12 2 2 4-4\"></path>"};

function icon(name, size = 24, opts = {}) {
  const sw = opts.stroke || 2;
  const cls = opts.cls ? ` class="${opts.cls}"` : '';
  const fill = opts.fill ? ` fill="${opts.fill}"` : ' fill="none"';
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24"${fill} stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"${cls} aria-hidden="true">${ICONS[name]}</svg>`;
}

/* iOS 상태바 커스텀 글리프 */
function cellular() {
  const bars = [4, 6.5, 9, 11.5];
  return `<svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">${bars
    .map((h, i) => `<rect x="${i * 4.5}" y="${12 - h}" width="3" height="${h}" rx="1"/>`)
    .join('')}</svg>`;
}
function wifiGlyph() {
  return `<svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor"><path d="M8.5 1.6c2.7 0 5.2 1 7 2.8l-1.3 1.4a8 8 0 0 0-11.4 0L1.5 4.4A9.9 9.9 0 0 1 8.5 1.6Z"/><path d="M8.5 5.4c1.6 0 3.1.6 4.2 1.7l-1.4 1.4a4 4 0 0 0-5.6 0L4.3 7.1A6 6 0 0 1 8.5 5.4Z"/><path d="M8.5 9c.7 0 1.4.3 1.9.8L8.5 11.6 6.6 9.8A2.7 2.7 0 0 1 8.5 9Z"/></svg>`;
}
function batteryGlyph() {
  return `<svg width="28" height="13" viewBox="0 0 28 13" fill="none"><rect x="0.5" y="0.5" width="23" height="12" rx="3.2" stroke="currentColor" stroke-opacity="0.35"/><rect x="2" y="2" width="20" height="9" rx="2" fill="currentColor"/><path d="M25.5 4.2c.9.3 1.4 1.1 1.4 2.3s-.5 2-1.4 2.3V4.2Z" fill="currentColor" fill-opacity="0.4"/></svg>`;
}

/* ---------- 유틸 -------------------------------------------------------- */
const WD = ['일', '월', '화', '수', '목', '금', '토'];
function parseDate(iso) {
  return new Date(iso + 'T00:00:00');
}
function fmtShort(iso) {
  const d = parseDate(iso);
  return `${d.getMonth() + 1}.${d.getDate()} (${WD[d.getDay()]})`;
}
function fmtLong(iso) {
  const d = parseDate(iso);
  return `${d.getMonth() + 1}월 ${d.getDate()}일 (${WD[d.getDay()]})`;
}
function fmtDot(iso) {
  if (!iso) return '';
  const d = parseDate(iso);
  return `${iso.replace(/-/g, '. ')} (${WD[d.getDay()]})`;
}
function durLabel(min) {
  return min >= 60 ? `${min / 60}시간` : `${min}분`;
}
function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

/* ---------- 시드 데이터 ------------------------------------------------- */
const seedParticipants = [
  { id: 'me', name: '성명', avatarColor: '#3FB9A5' },
  { id: 'minsu', name: '민수', avatarColor: '#6C8AE4' },
  { id: 'jieun', name: '지은', avatarColor: '#E48AB0' },
  { id: 'hyunwoo', name: '현우', avatarColor: '#E4B36C' },
  { id: 'seohyun', name: '서현', avatarColor: '#8A6CE4' },
  { id: 'jiho', name: '지호', avatarColor: '#6CC9E4' },
  { id: 'dahye', name: '다혜', avatarColor: '#E47A7A' },
];
// 주최자(나)를 제외한 초대 가능 인원 (총 6명)
const invitablePool = seedParticipants.filter((p) => p.id !== 'me');
const pById = (id) => seedParticipants.find((x) => x.id === id);
// 주최자(나) — 이름은 온보딩에서 입력한 이름 사용
function meP() {
  return { ...pById('me'), name: (State.user && State.user.name) || '나' };
}

function seedMeetings() {
  return [];
}
function seedResponses() {
  return [];
}
/* --- 이전 프로토타입에서 저장된 데모 데이터 정리 (온보딩 직후 빈 상태 보장) --- */

/* ---------- AI 추천 로직 ------------------------------------------------ */
const toMin = (t) => +t.slice(0, 2) * 60 + +t.slice(3);
const fromMin = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
const fmtLocalDate = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const overlaps = (aS, aE, bS, bE) => aS < bE && bS < aE;
const LUNCH_S = toMin('12:00');
const LUNCH_E = toMin('13:00');

function eachWeekday(start, end) {
  const out = [];
  const d = parseDate(start);
  const last = parseDate(end);
  while (d <= last) {
    const day = d.getDay();
    if (day !== 0 && day !== 6) out.push(fmtLocalDate(d));
    d.setDate(d.getDate() + 1);
  }
  return out;
}

function recommendSlots(meeting, responses) {
  const dates = eachWeekday(meeting.rangeStart, meeting.rangeEnd);
  const dur = meeting.durationMin;
  const scored = [];
  for (const date of dates) {
    for (let s = toMin('09:00'); s + dur <= toMin('18:00'); s += 30) {
      const e = s + dur;
      let count = 0;
      for (const r of responses) {
        if (r.availability === 'off') continue;
        if (r.availability === 'avoid_lunch' && overlaps(s, e, LUNCH_S, LUNCH_E)) continue;
        const busy = r.busyRanges.some((b) => b.date === date && overlaps(s, e, toMin(b.start), toMin(b.end)));
        if (busy) continue;
        count++;
      }
      const lunchPenalty = overlaps(s, e, LUNCH_S, LUNCH_E) ? 3 : 0;
      scored.push({ date, start: fromMin(s), end: fromMin(e), availableCount: count, score: count * 10 - lunchPenalty });
    }
  }
  scored.sort((a, b) => b.score - a.score || a.date.localeCompare(b.date) || a.start.localeCompare(b.start));
  return scored.slice(0, 3).map(({ score, ...s }) => s);
}

/* ---------- 상태 (localStorage) ---------------------------------------- */
const K = { user: 'accordh.user', meetings: 'accordh.meetings', responses: 'accordh.responses', ver: 'accordh.ver' };
const DATA_VERSION = '5-empty';
function load(key, fb) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fb;
  } catch {
    return fb;
  }
}
function save(key, v) {
  try {
    localStorage.setItem(key, JSON.stringify(v));
  } catch {}
}
// 이전 버전의 데모 데이터가 캐시돼 있으면 빈 상태로 초기화
try {
  if (localStorage.getItem(K.ver) !== DATA_VERSION) {
    save(K.meetings, []);
    save(K.responses, []);
    localStorage.setItem(K.ver, DATA_VERSION);
  }
} catch {}

const State = {
  user: load(K.user, null),
  meetings: load(K.meetings, seedMeetings()),
  responses: load(K.responses, seedResponses()),
  getMeeting(id) {
    return this.meetings.find((m) => m.id === id);
  },
  setUser(u) {
    this.user = u;
    save(K.user, u);
  },
  addMeeting(m) {
    this.meetings.unshift(m);
    save(K.meetings, this.meetings);
  },
  updateMeeting(id, patch) {
    this.meetings = this.meetings.map((m) => (m.id === id ? { ...m, ...patch } : m));
    save(K.meetings, this.meetings);
  },
  addResponse(r) {
    this.responses = this.responses.filter((x) => !(x.meetingId === r.meetingId && x.participantId === r.participantId));
    this.responses.push(r);
    save(K.responses, this.responses);
    this.meetings = this.meetings.map((m) =>
      m.id === r.meetingId ? { ...m, respondedCount: Math.min(m.respondedCount + 1, m.participants.length) } : m,
    );
    save(K.meetings, this.meetings);
  },
};

/* 화면 로컬(폼) 상태 */
const UI = {};
function resetUI() {
  UI.onb = { step: 0, prefs: { am: false, pm: false, any: false }, name: '', team: '', role: '', times: [{ start: '09:00', end: '11:00' }],
    recurring: { lunch: { start: '12:00', end: '13:00' } }, editing: null, draft: null };
  UI.newM = { step: 1, title: '', picked: [], roles: {}, custom: {}, search: '', start: '2026-07-13', end: '2026-07-17', duration: 60 };
  UI.resp = { choices: [], fwItems: [], offItems: [], etcItems: [], done: false };
  UI.detailTab = 'status';
  UI.rec = { step: 1, duration: 60 };
  UI.cal = { month: '2026-07', selected: fmtLocalDate(new Date()) };
  UI.mlist = { filter: 'all' };
}
resetUI();

/* ---------- 공통 조각 --------------------------------------------------- */
const AVAIL_LABEL = { anytime: '언제든 가능', avoid_lunch: '점심시간 피해주세요', fieldwork: '외근', off: '휴가', etc: '기타' };
function respLabel(r) {
  if (r && r.choices && r.choices.length) return r.choices.map((k) => AVAIL_LABEL[k]).join(', ');
  return r ? AVAIL_LABEL[r.availability] : '응답 대기 중';
}

function logo(size, onColor) {
  if (onColor) {
    return `<span class="logo on-color" style="display:inline-flex;align-items:center"><img src="assets/logo-white.png" alt="accord" style="height:${Math.round(size * 1.9)}px;width:auto;display:block"></span>`;
  }
  return `<span class="logo" style="display:inline-flex;align-items:center;gap:${Math.round(size * 0.26)}px">
    <img src="assets/logo-mark.png" alt="" style="height:${Math.round(size * 1.05)}px;width:auto;display:block">
    <img src="assets/logo-word.png" alt="accord" style="height:${Math.round(size * 0.7)}px;width:auto;display:block">
  </span>`;
}
function avatar(p, size) {
  return `<span class="avatar" style="width:${size}px;height:${size}px;background:${p.avatarColor};font-size:${size * 0.42}px">${esc(p.name[0])}</span>`;
}
// back: 이동할 해시 문자열 | backJs: 커스텀 onclick JS(스텝 뒤로 등). backJs 우선.
function topbar(title, back, step, backJs, skipJs) {
  const backBtn = backJs
    ? `<button class="back" onclick="${backJs}" aria-label="뒤로">${icon('ChevronLeft', 26, { stroke: 2.2 })}</button>`
    : back
      ? `<button class="back" onclick="App.go('${back}')" aria-label="뒤로">${icon('ChevronLeft', 26, { stroke: 2.2 })}</button>`
      : '<span class="spacer"></span>';
  const rightBtn = skipJs ? `<button class="skip press" onclick="${skipJs}">건너뛰기</button>` : '<span class="spacer"></span>';
  return `<div class="topbar"><div class="row">${backBtn}<span class="heading">${title || ''}</span>${rightBtn}</div>${step ? `<div class="stepbar"><div class="grow"><div class="progress"><div class="bar" style="width:${(step.cur / step.total) * 100}%"></div></div></div><span class="count">${step.cur}/${step.total}</span></div>` : ''}</div>`;
}
function bottomtab(active) {
  const tabs = [
    ['home', '홈', 'Home', '#/'],
    ['calendar', '캘린더', 'Calendar', '#/calendar'],
    ['meeting', '회의', 'ClipboardList', '#/meetings'],
    ['profile', '프로필', 'User', '#/profile'],
  ];
  return `<div class="bottomtab">${tabs
    .map(([k, label, ic, href]) => `<a href="${href}" class="${active === k ? 'active' : ''}">${icon(ic, 22, { stroke: active === k ? 2.5 : 2 })}${label}</a>`)
    .join('')}</div>`;
}

/* ===========================================================================
   뷰
   =========================================================================== */
const Views = {};

const TEAMS = ['Design › Product Design › UX 1', 'Product › Growth › Squad A', 'Engineering › Platform › Core'];
const ROLES = ['UI/UX Designer', 'Product Manager', 'Software Engineer'];

Views.splash = () => `<div class="screen splash-screen">
  <div class="splash-hero">
    <img src="assets/logo-white.png" alt="accord" class="splash-logo-img" onload="this.classList.add('in')">
    <div class="stagger">
      <h1 class="splash-title" style="font-size:24px;white-space:nowrap">모두를 위한 하나의 시간</h1>
      <p class="splash-sub">참석자의 상황을 이해하는<br>최적의 회의 시간을 제안합니다.</p>
    </div>
  </div>
  <div class="splash-foot"><button class="btn btn-block splash-cta press" onclick="App.go('#/onboarding')">시작하기</button></div>
</div>`;

Views.login = () => `
  <div class="screen"><div class="scroll pad" style="padding-top:48px;display:flex;flex-direction:column">
    ${logo(26)}
    <h1 class="h1" style="margin-top:32px">오신 것을<br>환영해요!</h1>
    <div class="stack" style="margin-top:36px">
      <input class="input" placeholder="이메일 아이디">
      <input class="input" type="password" placeholder="비밀번호를 입력해주세요">
    </div>
    <button class="btn btn-primary btn-block" style="margin-top:24px" onclick="App.login()">로그인</button>
    <button class="btn-text" style="margin-top:8px" onclick="App.go('#/signup/terms')">회원가입</button>
    <div style="margin-top:auto;padding:40px 0 40px">
      <button class="btn-kakao">${icon('MessageCircle', 18, { fill: '#3C1E1E', stroke: 0 })}카카오 로그인</button>
    </div>
  </div></div>`;

const TERMS = [
  '[필수] 서비스 이용약관 동의',
  '[필수] 개인정보 수집 및 이용 동의',
  '[선택] 마케팅 정보 수신 동의',
  '[선택] 위치 정보 동의',
];
Views.signupTerms = () => `
  <div class="screen">${topbar('', '#/login')}
  <div class="scroll pad grow">
    <h1 class="h2">서비스 이용약관에<br>동의해주세요</h1>
    <div class="stack" style="margin-top:24px">
      ${TERMS.map((t, i) => `<label class="list-row" style="cursor:pointer"><input type="checkbox" ${i < 2 ? '' : ''}> <span style="font-size:14px">${t}</span></label>`).join('')}
    </div>
  </div>
  <div class="footer"><button class="btn btn-primary btn-block" onclick="App.go('#/signup/info')">다음</button></div></div>`;

Views.signupInfo = () => `
  <div class="screen">${topbar('', '#/signup/terms')}
  <div class="scroll pad grow">
    <h1 class="h2">accord에서 사용하실<br>회원 정보를 입력해주세요</h1>
    <div style="margin-top:32px">
      <label class="field"><span class="label">이메일</span><input class="input" placeholder="이메일 주소 입력"></label>
      <label class="field"><span class="label">비밀번호</span><input class="input" type="password" placeholder="비밀번호 입력"></label>
    </div>
  </div>
  <div class="footer"><button class="btn btn-primary btn-block" onclick="App.go('#/signup/verify')">다음</button></div></div>`;

Views.signupVerify = () => `
  <div class="screen">${topbar('', '#/signup/info')}
  <div class="scroll pad grow">
    <h1 class="h2">accord에서 사용하실<br>회원 정보를 입력해주세요</h1>
    <div class="field" style="margin-top:32px">
      <span class="label">인증번호 6자리</span>
      <div class="row gap8" style="margin-top:4px">
        <input class="input" inputmode="numeric" placeholder="인증번호 입력" style="letter-spacing:.4em">
        <span style="font-size:14px;font-weight:600;color:var(--primary)">2:44</span>
      </div>
      <p class="small muted" style="margin-top:8px">인증번호가 발송되었습니다.</p>
    </div>
  </div>
  <div class="footer"><button class="btn btn-primary btn-block" onclick="App.go('#/onboarding')">다음</button></div></div>`;

const RECURRING = [
  ['lunch', '점심시간', 'Utensils'],
  ['fieldwork', '외근 / 미팅', 'Plane'],
  ['focus', '집중시간 (Focus Time)', 'Target'],
  ['regular', '정기회의', 'Repeat'],
  ['etc', '기타 일정', 'CalendarDays'],
];
function ampmLabel(t) {
  return +t.slice(0, 2) < 12 ? 'AM' : 'PM';
}
function ampmTime(t) {
  let h = +t.slice(0, 2);
  const p = h < 12 ? 'AM' : 'PM';
  h = h % 12;
  if (h === 0) h = 12;
  return `${p} ${String(h).padStart(2, '0')}:${t.slice(3)}`;
}
function flipAmPm(t) {
  let h = +t.slice(0, 2);
  h = h < 12 ? h + 12 : h - 12;
  return `${String(h).padStart(2, '0')}:${t.slice(3)}`;
}
// 온보딩 완료 축하 컨페티 (빵빠레)
function fireConfetti() {
  const host = document.querySelector('.phone');
  if (!host) return;
  const rect = host.getBoundingClientRect();
  const W = rect.width;
  const H = rect.height;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:60';
  host.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const colors = ['#3fb9a5', '#57c7b8', '#E4B36C', '#E48AB0', '#6C8AE4', '#ffffff'];
  const parts = [];
  const origins = [
    { x: W * 0.06, y: H * 0.92, ang: -Math.PI / 3 },
    { x: W * 0.94, y: H * 0.92, ang: (-Math.PI * 2) / 3 },
  ];
  origins.forEach((o) => {
    for (let i = 0; i < 40; i++) {
      const spread = (Math.random() - 0.5) * 0.7;
      const speed = 11 + Math.random() * 12;
      parts.push({
        x: o.x,
        y: o.y,
        vx: Math.cos(o.ang + spread) * speed,
        vy: Math.sin(o.ang + spread) * speed,
        g: 0.3 + Math.random() * 0.14,
        w: 6 + Math.random() * 6,
        h: 9 + Math.random() * 8,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.35,
        color: colors[(Math.random() * colors.length) | 0],
      });
    }
  });
  const start = performance.now();
  function frame(now) {
    const t = now - start;
    const SP = 0.72; // 속도 스케일 (작을수록 느림)
    ctx.clearRect(0, 0, W, H);
    parts.forEach((p) => {
      p.vy += p.g * SP;
      p.vx *= 0.992;
      p.x += p.vx * SP;
      p.y += p.vy * SP;
      p.rot += p.vr * SP;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, 1 - t / 3900);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    if (t < 4000) requestAnimationFrame(frame);
    else canvas.remove();
  }
  requestAnimationFrame(frame);
}
Views.onboarding = () => {
  const o = UI.onb;
  if (o.step === 5) {
    const nm = o.name || '회원';
    return `<div class="screen done-screen">
      <div class="done-hero">
        <img src="assets/logo-check.png" alt="" class="done-logo-img" style="width:66px;height:auto;margin-bottom:22px">
        <div class="stagger">
          <h1 class="done-title">${esc(nm)} 님의<br>업무 리듬을 저장했어요!</h1>
          <p class="done-sub">이제 회의를 생성하러 가볼까요?</p>
        </div>
      </div>
      <div class="done-foot"><button class="btn btn-primary btn-block press" onclick="App.go('#/meetings/new')">회의 생성하기</button></div>
    </div>`;
  }
  let body = '';
  if (o.step === 1) {
    body = `<h1 class="h2">기본 정보를<br>입력해주세요</h1><p class="lead">accord를 더 잘 사용하기 위해 필요한 정보에요.</p>
      <div style="margin-top:24px">
        <label class="field"><span class="label">이름</span><input class="input" placeholder="이름을 입력해주세요" value="${esc(o.name)}" oninput="App.onbField('name',this.value)"></label>
        <label class="field"><span class="label">소속 팀</span>
          <select class="select" onchange="App.onbField('team',this.value)">
            <option value="" ${!o.team ? 'selected' : ''} disabled>소속 팀을 선택해주세요</option>
            ${TEAMS.map((t) => `<option ${o.team === t ? 'selected' : ''}>${t}</option>`).join('')}
          </select></label>
        <label class="field"><span class="label">직책 (선택)</span>
          <select class="select" onchange="App.onbField('role',this.value)">
            <option value="" ${!o.role ? 'selected' : ''} disabled>직책을 선택해주세요</option>
            ${ROLES.map((r) => `<option ${o.role === r ? 'selected' : ''}>${r}</option>`).join('')}
          </select></label>
      </div>`;
  } else if (o.step === 2) {
    const pchip = (k, ic, label, sub) => {
      const on = o.prefs[k];
      return `<button class="chip chip-center ${on ? 'selected' : ''} press" onclick="App.onbPref('${k}')"><span class="tile-ico">${icon(ic, 22, { cls: on ? 'icon-primary' : 'icon-sub' })}</span><span style="font-size:14px;font-weight:600">${label}</span><span class="small muted">${sub}</span></button>`;
    };
    body = `<h1 class="h2">주로 선호하는 회의 시간은<br>언제인가요?</h1><p class="lead">여러 개 선택할 수 있어요.</p>
      <div style="margin-top:24px;display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        ${pchip('am', 'Sunrise', '오전', '09~12시')}${pchip('pm', 'Sunset', '오후', '12~18시')}${pchip('any', 'Clock', '언제든', '가능')}
      </div>
      <p class="title" style="margin-top:24px">직접 선택하기</p>
      <div class="stack" style="margin-top:8px">
        ${o.times
          .map(
            (t, i) => `<div class="row gap8">
          <input class="input compact grow" value="${t.start}" oninput="App.onbTime(${i},'start',this.value)">
          <span class="muted">~</span>
          <input class="input compact grow" value="${t.end}" oninput="App.onbTime(${i},'end',this.value)">
          <button class="muted" onclick="App.onbTimeDel(${i})">✕</button></div>`,
          )
          .join('')}
        <button class="btn-ghost" style="font-size:14px;font-weight:600;padding:4px 0;text-align:left" onclick="App.onbTimeAdd()">+ 시간 추가</button>
      </div>`;
  } else if (o.step === 3) {
    const ampmSeg = (field) => {
      const c2 = ampmLabel(o.draft[field]);
      return `<div class="ampm-seg"><button class="${c2 === 'AM' ? 'active' : ''}" onclick="App.onbDraftAmPm('${field}','AM')">AM</button><button class="${c2 === 'PM' ? 'active' : ''}" onclick="App.onbDraftAmPm('${field}','PM')">PM</button></div>`;
    };
    const timePick = (field) => {
      const t = o.draft[field];
      const h24 = +t.slice(0, 2);
      const h12 = (h24 % 12) || 12;
      const mm = t.slice(3);
      const open = o.timeOpen === field;
      const hours = Array.from({ length: 12 }, (_, i) => i + 1);
      const mins = ['00', '10', '20', '30', '40', '50'];
      return `<div class="row gap8">${ampmSeg(field)}<div class="time-pick"><button class="time-trigger press ${open ? 'open' : ''}" onclick="App.onbToggleTime('${field}')"><span>${String(h12).padStart(2, '0')}:${mm}</span>${icon('ChevronDown', 16, { cls: 'icon-sub' })}</button>${open ? `<div class="time-dd"><div class="time-col">${hours.map((h) => `<button class="${h === h12 ? 'active' : ''}" onclick="App.onbSetHour('${field}',${h})">${String(h).padStart(2, '0')}</button>`).join('')}</div><div class="time-col">${mins.map((mv) => `<button class="${mv === mm ? 'active' : ''}" onclick="App.onbSetMin('${field}','${mv}')">${mv}</button>`).join('')}</div></div>` : ''}</div></div>`;
    };
    body = `<h1 class="h2">반복되는 일정을<br>등록해 주세요</h1><p class="lead">정확한 시간 추천을 위해 필요해요.</p>
      <div class="stack" style="margin-top:24px;gap:10px">
        ${RECURRING.map(([k, label, ic]) => {
          const set = o.recurring[k];
          const editing = o.editing === k;
          const daysLabel = set && set.days && set.days.length ? set.days.slice().sort((a, b) => a - b).map((i) => WD[i]).join('·') + ' · ' : '';
          return `<div class="routine-card ${set || editing ? 'on' : ''}">
            <button class="routine-head press" onclick="App.onbEditRecurring('${k}')">
              <span class="icon-badge ${set ? 'on' : ''}">${icon(ic, 17)}</span>
              <div class="grow"><p style="font-size:14px;font-weight:600">${label}</p><p class="small" style="margin-top:1px;${set ? 'color:var(--primary-dark);font-weight:500' : 'color:var(--sub)'}">${set ? `${daysLabel}${ampmTime(set.start)} - ${ampmTime(set.end)}` : '설정하기'}</p></div>
              ${icon(editing ? 'ChevronUp' : 'ChevronDown', 18, { cls: 'icon-sub' })}
            </button>
            ${editing ? `<div class="routine-edit">
              ${k !== 'lunch' ? `<div class="te-row" style="align-items:flex-start"><span class="te-label" style="padding-top:8px">요일</span><div class="day-row">${WD.map((d, di) => `<button class="day-chip ${(o.draft.days || []).includes(di) ? 'active' : ''}" onclick="App.onbDraftDay(${di})">${d}</button>`).join('')}</div></div>` : ''}
              <div class="te-row"><span class="te-label">시작 시간</span>${timePick('start')}</div>
              <div class="te-row"><span class="te-label">종료 시간</span>${timePick('end')}</div>
              <div class="row gap8" style="margin-top:14px">
                <button class="btn btn-block press" style="flex:1;background:var(--bg);color:var(--sub)" onclick="App.onbDeleteRecurring('${k}')">설정 삭제</button>
                <button class="btn btn-primary btn-block press" style="flex:1" onclick="App.onbSaveRecurring('${k}')">저장</button>
              </div>
            </div>` : ''}
          </div>`;
        }).join('')}
      </div>`;
  } else {
    const times = o.times.map((t) => `${t.start} - ${t.end}`).join(', ') || '—';
    const rec = RECURRING.filter(([k]) => o.recurring[k]).map(([, l]) => l).join(', ') || '없음';
    const sum = (l, v) => `<div class="card" style="box-shadow:none;padding:12px 16px"><p class="small muted">${l}</p><p style="font-weight:500;margin-top:2px">${esc(v)}</p></div>`;
    body = `<h1 class="h2">프로필 정보를<br>확인해주세요</h1><p class="lead">수정이 필요하면 이전 단계로 돌아갈 수 있어요.</p>
      <div class="stack" style="margin-top:24px">${sum('이름', o.name || '—')}${sum('팀 / 부서', o.team || '—')}${sum('선호 시간', times)}${sum('반복 일정', rec)}</div>`;
  }
  const canNext =
    o.step === 1 ? !!(o.name.trim() && o.team) : o.step === 2 ? !!(o.prefs.am || o.prefs.pm || o.prefs.any) : true;
  const footer =
    o.step < 4
      ? `<button class="btn btn-primary btn-block press" ${canNext ? '' : 'disabled'} onclick="App.onbStep(${o.step + 1})">다음</button>`
      : `<button class="btn btn-primary btn-block press" onclick="App.onbFinish()">완료</button><button class="btn-text" onclick="App.onbStep(3)">이전으로 돌아가기</button>`;
  return `<div class="screen">${topbar('', o.step === 1 ? null : null, { cur: o.step, total: 4 }, o.step === 1 ? `App.go('#/splash')` : `App.onbStep(${o.step - 1})`, `App.onbFinish()`)}
    <div class="scroll pad grow step-anim">${body}</div>
    <div class="footer">${footer}</div></div>`;
};

// D-day 라벨
function ddayLabel(iso) {
  const d = parseDate(iso);
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  const n = Math.round((d - t) / 86400000);
  return n > 0 ? `D-${n}` : n === 0 ? 'D-DAY' : `${-n}일 전`;
}
// 회의 카드 한 줄 (홈 / 회의탭 / 캘린더 공용)
function meetingRow(m) {
  const conf = m.status === 'confirmed';
  const ratio = m.respondedCount / m.participants.length;
  const when = conf && m.confirmedSlot ? `${fmtShort(m.confirmedSlot.date)} ${m.confirmedSlot.start}` : `${fmtShort(m.rangeStart)} ~ ${fmtShort(m.rangeEnd)}`;
  const extra = m.participants.length - 4;
  return `<button class="press" style="width:100%;text-align:left" onclick="App.go('#/meetings/${m.id}')"><div class="card">
    <div class="row-between"><p style="font-weight:600">${esc(m.title)}</p>
    <span class="badge ${conf ? 'badge-solid' : 'badge-soft'}">${conf ? icon('Check', 12, { stroke: 3 }) + '확정' : '응답 수집 중'}</span></div>
    <p class="small muted row gap8" style="margin-top:6px">${icon(conf ? 'Calendar' : 'Clock', 13)} ${when} · ${durLabel(m.durationMin)}</p>
    <div class="row-between" style="margin-top:12px">
      <div class="avatar-stack">${m.participants.slice(0, 4).map((p) => avatar(p, 24)).join('')}${extra > 0 ? `<span class="avatar" style="width:24px;height:24px;background:var(--bg);color:var(--sub);font-size:10px">+${extra}</span>` : ''}</div>
      ${conf ? `<span class="small" style="color:var(--primary-dark);font-weight:600">${ddayLabel(m.confirmedSlot.date)}</span>` : `<span class="small muted">응답 ${m.respondedCount}/${m.participants.length}</span>`}
    </div>
    ${conf ? '' : `<div class="progress" style="margin-top:8px"><div class="bar" style="width:${ratio * 100}%"></div></div>`}
  </div></button>`;
}

Views.home = () => {
  const collecting = State.meetings.filter((m) => m.status === 'collecting');
  const confirmed = State.meetings.filter((m) => m.status === 'confirmed');
  const next = confirmed.find((m) => m.confirmedSlot) || confirmed[0];
  const name = (State.user && State.user.name) || '성명';
  const t = new Date();
  const todayLabel = `${t.getMonth() + 1}월 ${t.getDate()}일 (${WD[t.getDay()]})`;
  const section = (title, rows, empty) =>
    `<div><div class="row-between" style="margin-bottom:10px"><p class="title">${title}</p>${rows.length ? `<span class="small muted">${rows.length}건</span>` : ''}</div><div class="stack stagger">${rows.length ? rows.join('') : `<div class="empty-mini">${empty}</div>`}</div></div>`;
  return `<div class="screen" style="background:var(--bg)">
    <div class="scroll pad5" style="padding-top:24px;padding-bottom:16px"><div class="stack">
      <div>
        <p class="small muted" style="font-weight:500">${todayLabel}</p>
        <p style="font-size:22px;font-weight:700;letter-spacing:-.02em;margin-top:2px">안녕하세요, ${esc(name)}님</p>
      </div>
      ${next && next.confirmedSlot ? `<button class="press" style="width:100%;text-align:left" onclick="App.go('#/meetings/${next.id}')"><div class="hero-card">
        <div class="row-between"><p class="small row gap8" style="color:rgba(255,255,255,.9);font-weight:600">${icon('Calendar', 14)} 다가오는 회의</p><span class="badge" style="background:rgba(255,255,255,.22);color:#fff">${ddayLabel(next.confirmedSlot.date)}</span></div>
        <p style="font-size:22px;font-weight:700;margin-top:12px;line-height:1.15">${fmtLong(next.confirmedSlot.date)} ${next.confirmedSlot.start}</p>
        <p style="font-size:14px;color:rgba(255,255,255,.9);margin-top:2px">${esc(next.title)}</p>
        <div class="row-between" style="margin-top:14px"><div class="avatar-stack">${next.participants.slice(0, 4).map((p) => avatar(p, 28)).join('')}</div>
        <span style="display:flex;width:32px;height:32px;align-items:center;justify-content:center;border-radius:50%;background:rgba(255,255,255,.2)">${icon('ChevronRight', 18)}</span></div>
      </div></button>` : ''}
      <div style="height:8px"></div>
      ${section('진행 중인 회의', collecting.map(meetingRow), '진행 중인 회의가 없어요')}
      <div style="height:16px"></div>
      ${section('확정된 회의', confirmed.map(meetingRow), '확정된 회의가 없어요')}
    </div></div>
    <div class="pad5" style="padding-bottom:12px;background:var(--bg)"><button class="btn btn-primary btn-block press" onclick="App.go('#/meetings/new')">${icon('Plus', 18, { stroke: 2.5 })}회의 만들기</button></div>
    ${bottomtab('home')}</div>`;
};

Views.calendar = () => {
  const c = UI.cal;
  const [Y, M] = c.month.split('-').map(Number);
  const startDay = new Date(Y, M - 1, 1).getDay();
  const daysIn = new Date(Y, M, 0).getDate();
  const today = fmtLocalDate(new Date());
  const marks = {};
  State.meetings.forEach((m) => {
    if (m.status === 'confirmed' && m.confirmedSlot) marks[m.confirmedSlot.date] = 'confirmed';
  });
  State.meetings.forEach((m) => {
    if (m.status !== 'collecting') return;
    const d = parseDate(m.rangeStart);
    const last = parseDate(m.rangeEnd);
    while (d <= last) {
      const ds = fmtLocalDate(d);
      if (!marks[ds]) marks[ds] = 'collecting';
      d.setDate(d.getDate() + 1);
    }
  });
  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push('<div class="cal-cell empty"></div>');
  for (let d = 1; d <= daysIn; d++) {
    const ds = `${Y}-${String(M).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const sel = ds === c.selected;
    const isT = ds === today;
    const mk = marks[ds];
    cells.push(`<button class="cal-cell press ${sel ? 'selected' : ''} ${isT ? 'today' : ''}" onclick="App.calSelect('${ds}')">${d}${mk ? `<span class="dot ${mk === 'collecting' ? 'soft' : ''}"></span>` : ''}</button>`);
  }
  const dayMeetings = State.meetings.filter((m) =>
    m.status === 'confirmed' && m.confirmedSlot ? m.confirmedSlot.date === c.selected : c.selected >= m.rangeStart && c.selected <= m.rangeEnd,
  );
  return `<div class="screen" style="background:var(--bg)">
    <div class="row-between pad5" style="padding-top:14px;padding-bottom:12px;background:var(--white)">
      <p class="h2" style="font-size:19px">캘린더</p>
      <button class="iconbtn press" onclick="App.go('#/meetings/new')" aria-label="회의 만들기" style="color:var(--primary)">${icon('Plus', 24, { stroke: 2.4 })}</button>
    </div>
    <div class="scroll" style="padding-bottom:16px">
      <div class="pad5" style="padding-top:16px">
        <div class="card" style="box-shadow:var(--shadow-card)">
          <div class="cal-head">
            <button class="press" onclick="App.calMonth(-1)" style="padding:6px" aria-label="이전 달">${icon('ChevronLeft', 20, { cls: 'icon-sub' })}</button>
            <p style="font-weight:700;font-size:16px">${Y}년 ${M}월</p>
            <button class="press" onclick="App.calMonth(1)" style="padding:6px" aria-label="다음 달">${icon('ChevronRight', 20, { cls: 'icon-sub' })}</button>
          </div>
          <div class="cal-grid" style="margin-top:4px">
            ${WD.map((w, i) => `<div class="cal-wd" style="color:${i === 0 ? '#e06a6a' : i === 6 ? '#6c8ae4' : 'var(--sub)'}">${w}</div>`).join('')}
            ${cells.join('')}
          </div>
        </div>
      </div>
      <div class="pad5" style="margin-top:22px">
        <p class="title" style="margin-bottom:10px">${fmtLong(c.selected)}</p>
        <div class="stack">${dayMeetings.length ? dayMeetings.map(meetingRow).join('') : '<div class="empty-mini">이 날은 예정된 회의가 없어요</div>'}</div>
      </div>
    </div>
    ${bottomtab('calendar')}</div>`;
};

Views.meetingsList = () => {
  const f = UI.mlist.filter;
  const list = State.meetings.filter((m) => (f === 'all' ? true : m.status === f));
  const segs = [['all', '전체'], ['collecting', '진행 중'], ['confirmed', '확정']];
  return `<div class="screen" style="background:var(--bg)">
    <div class="row-between pad5" style="padding-top:14px;padding-bottom:12px;background:var(--white)">
      <p class="h2" style="font-size:19px">회의</p>
      <button class="iconbtn press" onclick="App.go('#/meetings/new')" aria-label="회의 만들기" style="color:var(--primary)">${icon('Plus', 24, { stroke: 2.4 })}</button>
    </div>
    <div class="pad5" style="padding-bottom:14px;background:var(--white)">
      <div class="seg">${segs.map(([k, l]) => `<button class="${f === k ? 'active' : ''}" onclick="App.mlistFilter('${k}')">${l}</button>`).join('')}</div>
    </div>
    <div class="scroll pad5" style="padding-top:16px;padding-bottom:16px">
      <div class="stack">${list.length ? list.map(meetingRow).join('') : '<div class="empty-mini">해당하는 회의가 없어요</div>'}</div>
    </div>
    ${bottomtab('meeting')}</div>`;
};

Views.profile = () => {
  const u = State.user || {};
  const name = u.name || '성명';
  const team = u.team || 'Product Design';
  const role = u.role || 'UI/UX Designer';
  const times = (u.preferredTimes || [{ start: '09:00', end: '11:00' }]).map((x) => `${x.start} - ${x.end}`).join(', ');
  const rec = u.recurring ? RECURRING.filter(([k]) => u.recurring[k]).map(([, l]) => l).join(', ') || '없음' : '점심시간, 집중시간 (Focus Time)';
  const infoRow = (ic, label, val) =>
    `<div class="list-row" style="padding:14px 0"><span class="icon-badge on">${icon(ic, 17)}</span><div class="grow"><p class="small muted">${label}</p><p style="font-size:14px;font-weight:500;margin-top:1px">${esc(val)}</p></div></div>`;
  const setRow = (ic, label) =>
    `<button class="setting-row press" style="width:100%;text-align:left"><span class="ico">${icon(ic, 18)}</span><span class="grow" style="font-size:14px;font-weight:500">${label}</span>${icon('ChevronRight', 18, { cls: 'icon-sub' })}</button>`;
  return `<div class="screen" style="background:var(--bg)">
    <div class="scroll" style="padding-bottom:16px">
      <div style="background:var(--white);padding:28px 24px 24px">
        <div class="row gap12">
          <span class="avatar" style="width:64px;height:64px;background:var(--primary);font-size:26px">${esc(name[0])}</span>
          <div class="grow"><p style="font-size:20px;font-weight:700">${esc(name)}</p><p class="small muted" style="margin-top:2px">${esc(team)} · ${esc(role)}</p></div>
          <button class="iconbtn press" onclick="App.go('#/onboarding')" aria-label="프로필 편집" style="color:var(--sub)">${icon('Pencil', 18)}</button>
        </div>
      </div>
      <div class="pad5" style="margin-top:16px">
        <p class="title" style="margin-bottom:8px">내 일정 정보</p>
        <div class="card" style="box-shadow:var(--shadow-card);padding:2px 16px">
          ${infoRow('Clock', '선호 시간', times)}
          <div class="divider"></div>
          ${infoRow('Repeat', '반복 일정', rec)}
        </div>
      </div>
      <div class="pad5" style="margin-top:22px">
        <p class="title" style="margin-bottom:8px">설정</p>
        <div class="card" style="box-shadow:var(--shadow-card);padding:2px 16px">
          ${setRow('Bell', '알림 설정')}
          <div class="divider"></div>
          ${setRow('Calendar', '캘린더 연동')}
          <div class="divider"></div>
          ${setRow('Shield', '개인정보 보호')}
          <div class="divider"></div>
          ${setRow('HelpCircle', '도움말')}
        </div>
      </div>
      <div class="pad5" style="margin-top:22px">
        <button class="btn-text press row gap8" style="color:var(--sub);justify-content:center" onclick="App.logout()">${icon('LogOut', 16, { cls: 'icon-sub' })} 로그아웃</button>
      </div>
    </div>
    ${bottomtab('profile')}</div>`;
};

Views.meetingNew = () => {
  const n = UI.newM;
  const me = meP();
  const resolve = (id) => invitablePool.find((p) => p.id === id) || (n.custom && n.custom[id]) || pById(id);
  const added = n.picked.map(resolve).filter(Boolean);
  const participants = [me, ...added];
  let body = '';
  if (n.step === 1) {
    const roleSeg = (id) => {
      const role = n.roles[id] || 'required';
      return `<div class="role-seg">
        <button class="${role === 'required' ? 'active' : ''}" onclick="App.newRole('${id}','required')">필수</button>
        <button class="${role === 'optional' ? 'active' : ''}" onclick="App.newRole('${id}','optional')">선택</button>
      </div>`;
    };
    body = `<div class="stack" style="--x:0">
      <label class="field"><span class="label">회의명</span><input class="input" placeholder="예: UI 리뉴얼 킥오프" value="${esc(n.title)}" oninput="App.newField('title',this.value)"></label>
      <div class="field"><div class="row-between"><span class="label">참가자</span><span class="small muted">${added.length + 1}명</span></div>
        <div style="position:relative;margin-top:8px">
          <div class="search-wrap">${icon('Search', 18, { cls: 'icon-sub' })}<input id="party-search" class="search-input" placeholder="이름으로 검색해 추가" value="${esc(n.search || '')}" oninput="App.newSearch(this.value)" autocomplete="off"></div>
          <div id="party-dd">${App._partySearchHtml()}</div>
        </div>
        <div class="stack" style="margin-top:10px;gap:8px">
          <div class="party-row"><div class="row gap8">${avatar(me, 32)}<div><p style="font-size:14px;font-weight:600">${esc(me.name)} <span class="small" style="color:var(--primary-dark)">(나)</span></p><p class="small muted">주최자</p></div></div><span class="badge badge-soft">필수</span></div>
          ${added.map((p) => `<div class="party-row"><div class="row gap8">${avatar(p, 32)}<p style="font-size:14px;font-weight:600">${esc(p.name)}</p></div><div class="row gap8">${roleSeg(p.id)}<button class="party-x press" aria-label="제거" onclick="App.newPick('${p.id}')">${icon('X', 16, { cls: 'icon-sub' })}</button></div></div>`).join('')}
        </div>
        ${!added.length ? '<p class="small muted" style="margin-top:8px">참가자를 2명 이상 추가하면 다음으로 넘어갈 수 있어요.</p>' : ''}
      </div>
      <div class="field"><span class="label">회의 기간</span><div class="stack" style="margin-top:4px">
        <input class="input compact" type="date" value="${n.start}" oninput="App.newField('start',this.value)">
        <input class="input compact" type="date" value="${n.end}" oninput="App.newField('end',this.value)"></div></div>
      <label class="field"><span class="label">소요 시간</span><select class="select" onchange="App.newField('duration',+this.value)">
        ${[30, 60, 90, 120].map((v) => `<option value="${v}" ${n.duration === v ? 'selected' : ''}>${durLabel(v)}</option>`).join('')}
      </select><p class="small muted" style="margin-top:4px">정확한 시간 추천을 위해 필요해요.</p></label>
    </div>`;
  } else {
    const reqCount = added.filter((p) => (n.roles[p.id] || 'required') === 'required').length + 1;
    const optCount = added.length - added.filter((p) => (n.roles[p.id] || 'required') === 'required').length;
    body = `<div class="card" style="padding:20px">
      <p class="small muted row gap8" style="font-weight:500">${avatar(me, 20)} ${esc(me.name)}님의 초대</p>
      <p style="font-size:20px;font-weight:700;margin-top:12px">${esc(n.title)}</p>
      <div class="stack" style="margin-top:12px;--x:0;font-size:14px">
        <p class="row gap8">${icon('Calendar', 16, { cls: 'icon-sub' })} ${fmtShort(n.start)} ~ ${fmtShort(n.end)}</p>
        <p class="row gap8">${icon('Clock', 16, { cls: 'icon-sub' })} ${durLabel(n.duration)}</p>
        <p class="row gap8">${icon('Users', 16, { cls: 'icon-sub' })} 필수 ${reqCount}명${optCount ? ` · 선택 ${optCount}명` : ''}</p>
      </div>
      <div class="divider" style="margin:16px 0"></div>
      <div class="avatar-stack">${participants.map((p) => avatar(p, 30)).join('')}</div>
    </div>`;
  }
  const footer =
    n.step === 1
      ? `<button class="btn btn-primary btn-block press" ${!n.title.trim() || n.picked.length < 1 ? 'disabled' : ''} onclick="App.newStep(2)">다음</button>`
      : `<button class="btn btn-primary btn-block press" onclick="App.newSend()">회의 생성</button><button class="btn-text" onclick="App.newStep(1)">이전으로 돌아가기</button>`;
  return `<div class="screen">${topbar('회의 만들기', null, null, n.step === 1 ? `App.go('#/')` : 'App.newStep(1)')}
    <div class="scroll pad grow step-anim">${body}</div><div class="footer">${footer}</div></div>`;
};

Views.respond = (id) => {
  const m = State.getMeeting(id);
  if (!m) return `<div class="screen"><div class="center-col"><p class="muted">회의를 찾을 수 없어요.</p></div></div>`;
  const r = UI.resp;
  if (r.done) {
    const responded = Math.min(m.respondedCount, m.participants.length);
    const allDone = responded >= m.participants.length;
    return `<div class="screen"><div class="center-col pad">
      <div class="success-circle">${icon('Check', 38, { stroke: 3 })}</div>
      <h1 class="title" style="font-size:20px;margin-top:24px">${allDone ? '모든 참석자가 응답했어요!' : '응답을 보냈어요!'}</h1>
      <p class="lead">${allDone ? '이제 AI 추천 결과를 확인할 수 있어요.' : '주최자가 모든 의견을 수집하고 있습니다.'}</p>
      <div class="card" style="width:100%;text-align:left;margin-top:32px"><p class="small muted">응답 진행 상황</p>
        <p style="font-size:24px;font-weight:700;margin-top:4px">${responded} <span style="font-size:14px;font-weight:400;color:var(--sub)">/ ${m.participants.length}명</span></p>
        <div class="progress" style="margin-top:8px;height:6px"><div class="bar" style="width:${(responded / m.participants.length) * 100}%"></div></div></div>
      <div style="margin-top:28px;width:100%">${allDone ? `<button class="btn btn-primary btn-block press" onclick="App.go('#/recommend/${id}')">${icon('Sparkles', 17, { stroke: 2.2 })}AI 추천 결과 보기</button><button class="btn-text" onclick="App.go('#/meetings/${id}')">회의 상세로 이동</button>` : `<button class="btn btn-primary btn-block press" onclick="App.go('#/meetings/${id}')">완료</button>`}</div>
    </div></div>`;
  }
  const opts = [
    ['anytime', '언제든 가능', 'Smile'],
    ['avoid_lunch', '점심시간 피해주세요 (12:00 - 13:00)', 'Utensils'],
    ['fieldwork', '외근 / 외부 일정', 'Plane'],
    ['off', '휴가 / 부재', 'Palmtree'],
    ['etc', '기타', 'MoreHorizontal'],
  ];
  const listOf = { fieldwork: 'fwItems', off: 'offItems', etc: 'etcItems' };
  const itemsBlock = (list, withLabel) => `<div class="opt-times">
    ${(r[list] || []).map((it, i) => `<div class="etc-item">
      ${withLabel || r[list].length > 1 ? `<div class="row-between" style="margin-bottom:2px">${withLabel ? `<span class="etc-label">${esc(it.label)}</span>` : '<span></span>'}${r[list].length > 1 ? `<button class="etc-del press" aria-label="삭제" onclick="App.respItemDel('${list}',${i})">${icon('X', 15, { cls: 'icon-sub' })}</button>` : ''}</div>` : ''}
      <input class="input compact" type="date" value="${it.date || m.rangeStart}" oninput="App.respItemField('${list}',${i},'date',this.value)">
      <div class="row gap8" style="margin-top:8px"><input class="input compact grow" value="${it.start}" oninput="App.respItemField('${list}',${i},'start',this.value)"><span class="muted">~</span><input class="input compact grow" value="${it.end}" oninput="App.respItemField('${list}',${i},'end',this.value)"></div>
    </div>`).join('')}
    <button class="etc-add press" onclick="App.respItemAdd('${list}')">${icon('Plus', 16, { stroke: 2.4 })} 일정 추가</button>
  </div>`;
  return `<div class="screen">${topbar('회의 가능 시간', '#/meetings/' + id, { cur: 1, total: 2 })}
    <div class="scroll pad grow">
      <h1 class="h2" style="font-size:18px">회의 가능 시간을<br>알려주세요</h1><p class="lead">해당하는 항목을 모두 선택해주세요. (여러 개 선택 가능)</p>
      <div class="stack" style="margin-top:20px">
        ${opts
          .map(([k, label, ic]) => {
            const on = r.choices.includes(k);
            const btn = `<button class="option ${on ? 'selected' : ''}" onclick="App.respChoice('${k}')">${icon(ic, 19, { cls: on ? 'icon-primary' : 'icon-sub' })}${label}${on ? `<span style="margin-left:auto">${icon('Check', 18, { stroke: 2.5, cls: 'icon-primary' })}</span>` : ''}</button>`;
            const block = on && listOf[k] ? itemsBlock(listOf[k], k === 'etc') : '';
            return block ? `<div class="opt-group">${btn}${block}</div>` : btn;
          })
          .join('')}
      </div>
    </div>
    <div class="footer"><button class="btn btn-primary btn-block press" ${r.choices.length ? '' : 'disabled'} onclick="App.respSubmit('${id}')">다음</button></div></div>`;
};

Views.meetingDetail = (id) => {
  const m = State.getMeeting(id);
  if (!m) return `<div class="screen"><div class="center-col"><p class="muted">회의를 찾을 수 없어요.</p></div></div>`;
  const mResp = State.responses.filter((r) => r.meetingId === id);
  const slots = recommendSlots(m, mResp);
  const tab = UI.detailTab;
  let content;
  if (tab === 'status') {
    const meResp = mResp.find((x) => x.participantId === 'me');
    content = `<p class="title">${m.respondedCount} / ${m.participants.length}명 응답 완료</p>
      ${!meResp ? `<button class="press" style="width:100%;text-align:left;margin-top:12px" onclick="App.go('#/respond/${id}')"><div class="card" style="background:var(--primary-light);border-color:rgba(63,185,165,.35)"><div class="row gap8">${icon('Sparkles', 16, { cls: 'icon-primary' })}<div class="grow"><p style="font-size:14px;font-weight:600;color:var(--primary-dark)">내 가능 시간 응답하기</p><p class="small" style="color:var(--primary-dark);opacity:.8">응답을 보내면 추천이 더 정확해져요</p></div>${icon('ChevronRight', 18, { cls: 'icon-primary' })}</div></div></button>` : ''}
      <div class="stack" style="margin-top:12px">${m.participants
        .map((p) => {
          const r = mResp.find((x) => x.participantId === p.id);
          const isMe = p.id === 'me';
          const inner = `${avatar(p, 36)}<div class="grow"><p style="font-size:14px;font-weight:500">${esc(p.name)}${isMe ? ' (나)' : ''}${p.role === 'optional' ? ' <span class="small muted">· 선택</span>' : ''}</p><p class="small muted">${r ? respLabel(r) : '응답 대기 중'}</p></div>
          ${r ? `<span style="display:flex;width:20px;height:20px;align-items:center;justify-content:center;border-radius:50%;background:var(--primary);color:#fff">${icon('Check', 13, { stroke: 3 })}</span>` : isMe ? `<span class="badge badge-soft">응답하기</span>` : `<span style="color:var(--line)">${icon('Circle', 20)}</span>`}`;
          return isMe && !r
            ? `<button class="list-row press" style="width:100%;text-align:left" onclick="App.go('#/respond/${id}')">${inner}</button>`
            : `<div class="list-row">${inner}</div>`;
        })
        .join('')}</div>`;
  } else {
    content = `<div class="stack">${slots
      .map(
        (s, i) => `<div class="card" style="${i === 0 ? 'border-color:var(--primary);background:var(--primary-light)' : ''}">
        ${i === 0 ? `<p class="small" style="color:var(--primary-dark);font-weight:600;display:flex;align-items:center;gap:4px">${icon('Sparkles', 13)} 모두에게 가장 잘 맞는 시간</p>` : ''}
        <p style="font-weight:700;margin-top:${i === 0 ? '4px' : '0'}">${fmtLong(s.date)} ${s.start} - ${s.end}</p>
        <p class="small muted row gap8" style="margin-top:2px">${icon('Users', 13)} ${s.availableCount} / ${m.participants.length}명 참석 가능</p></div>`,
      )
      .join('')}</div>`;
  }
  return `<div class="screen">${topbar(m.title, '#/')}
    <div class="pad"><p class="small muted row gap8">${icon('Clock', 14)} ${fmtShort(m.rangeStart)} ~ ${fmtShort(m.rangeEnd)} · ${durLabel(m.durationMin)}</p>
    <div class="tabs"><button class="${tab === 'status' ? 'active' : ''}" onclick="App.detailTab('status')">응답 현황</button><button class="${tab === 'result' ? 'active' : ''}" onclick="App.detailTab('result')">추천 결과</button></div></div>
    <div class="scroll pad" style="padding-top:16px;padding-bottom:16px">${content}</div>
    <div class="footer"><button class="btn btn-primary btn-block" onclick="App.go('#/recommend/${id}')">AI 추천 받기</button><p class="small muted" style="text-align:center;margin-top:8px">모든 응답이 모이면 더 정확해져요!</p></div></div>`;
};

const REASONS = [
  ['CheckCircle2', '필수 참석자 모두 가능한 시간이에요.'],
  ['Utensils', '점심시간 (12:00 - 13:00)을 피했어요.'],
  ['Plane', '외근, 휴가 등 다른 일정과 겹치지 않아요.'],
  ['Users', '선택 참석자의 선호 시간과도 가장 잘 맞아요.'],
];
Views.recommend = (id) => {
  const m = State.getMeeting(id);
  if (!m) return `<div class="screen"><div class="center-col"><p class="muted">회의를 찾을 수 없어요.</p></div></div>`;
  const mResp = State.responses.filter((r) => r.meetingId === id);
  const rc = UI.rec;
  const slots = recommendSlots({ ...m, durationMin: rc.duration }, mResp);
  const best = slots[0];
  const total = m.participants.length;

  if (rc.step === 4 && best) {
    return `<div class="screen"><div class="scroll" style="align-items:center;display:flex;flex-direction:column;padding:64px 24px 0">
      <div class="success-circle">${icon('Check', 40, { stroke: 3 })}</div>
      <h1 class="title" style="font-size:20px;margin-top:24px">회의가 확정되었어요!</h1>
      <p class="lead">모든 참석자에게 일정이 공유되었어요.</p>
      <div class="card" style="width:100%;margin-top:28px;text-align:left">
        <p class="small muted row gap8">${icon('Calendar', 15)} ${fmtLong(best.date)}</p>
        <p style="font-size:24px;font-weight:700;margin-top:4px">${best.start} - ${best.end}</p>
        <div class="avatar-stack" style="justify-content:center;margin-top:16px;display:flex">${m.participants.map((p) => avatar(p, 30)).join('')}</div></div>
      <div style="margin-top:auto;width:100%;padding-bottom:32px"><button class="btn btn-primary btn-block press" onclick="App.viewInCalendar('${best.date}')">${icon('Calendar', 17, { stroke: 2.2 })}캘린더에서 보기</button><button class="btn-text" onclick="App.go('#/')">홈으로 이동</button></div>
    </div></div>`;
  }
  if (rc.step === 3) {
    return `<div class="screen">${topbar('조건 수정', null, null, 'App.recStep(1)')}
      <div class="scroll pad grow">
        ${best ? `<div style="border-radius:16px;background:var(--bg);padding:16px"><p class="small muted">현재 추천 시간</p><p style="font-weight:700;margin-top:4px">${fmtLong(best.date)} ${best.start} - ${best.end}</p></div>` : ''}
        <p class="lead">변경한 조건으로 다시 추천받을 수 있어요.</p>
        <label class="field" style="margin-top:16px"><span class="label">소요 시간</span><select class="select" onchange="App.recDuration(+this.value)">
          ${[30, 60, 90, 120].map((v) => `<option value="${v}" ${rc.duration === v ? 'selected' : ''}>${durLabel(v)}</option>`).join('')}</select></label>
      </div>
      <div class="footer"><button class="btn btn-primary btn-block" onclick="App.recStep(1)">다시 추천받기</button><button class="btn-text" onclick="App.recStep(1)">취소</button></div></div>`;
  }
  if (rc.step === 2) {
    return `<div class="screen"><div class="center-col"><p class="muted">이동 중…</p></div></div>`;
  }
  // step 1 — 추천 결과 + 이유 + 참석자 현황을 한 화면에서 스크롤
  return `<div class="screen">${topbar('AI 추천 결과', '#/meetings/' + id)}
    <div class="scroll pad grow">
      <p class="small" style="color:var(--primary);font-weight:600;display:flex;align-items:center;gap:4px">${icon('Sparkles', 14)} 모두에게 가장 잘 맞는 시간</p>
      ${best ? `<div class="hero-card lg" style="margin-top:10px">
        <p class="row gap8" style="font-size:14px;color:rgba(255,255,255,.9)">${icon('Calendar', 15)} ${fmtLong(best.date)}</p>
        <p style="font-size:34px;font-weight:700;line-height:1;letter-spacing:-.02em;margin-top:6px">${best.start} - ${best.end}</p>
        <p class="row gap8" style="font-size:14px;color:rgba(255,255,255,.9);margin-top:12px">${icon('Users', 15)} ${best.availableCount} / ${total}명 참석 가능</p>
        <p class="small" style="color:rgba(255,255,255,.75);margin-top:4px">모든 필수 참석자가 가능한 시간이에요.</p></div>` : '<p class="lead">추천할 수 있는 시간이 없어요.</p>'}
      <p class="title" style="margin-top:28px">다른 추천 시간</p>
      <div class="stack" style="margin-top:10px">${slots
        .slice(1)
        .map(
          (s) => `<div class="row-between card" style="box-shadow:none"><div>
        <p class="small muted row gap8">${icon('Calendar', 13)} ${fmtLong(s.date)}</p>
        <p style="font-weight:600;margin-top:2px">${s.start} - ${s.end}</p>
        <p class="small muted row gap8" style="margin-top:2px">${icon('Users', 13)} ${s.availableCount} / ${total}명 참석 가능</p></div>${icon('ChevronRight', 18, { cls: 'icon-sub' })}</div>`,
        )
        .join('')}</div>
      <div class="divider" style="margin:24px 0"></div>
      <p class="title">AI 추천 이유</p>
      <div class="stack" style="margin-top:10px">${REASONS.map(([ic, t]) => `<div class="list-row" style="border-radius:16px;background:var(--primary-light);padding:14px 16px;font-size:14px">${icon(ic, 17, { cls: 'icon-primary' })}${t}</div>`).join('')}</div>
      <p class="title" style="margin-top:24px">참석자 현황</p>
      <div class="stack" style="margin-top:8px">${m.participants
        .map((p) => {
          const r = mResp.find((x) => x.participantId === p.id);
          return `<div class="list-row">${avatar(p, 32)}<div class="grow"><p style="font-size:14px">${esc(p.name)}${p.id === 'me' ? ' (나)' : ''}${p.role === 'optional' ? ' <span class="small muted">· 선택</span>' : ''}</p><p class="small muted">${r ? respLabel(r) : '응답 대기 중'}</p></div><span class="badge badge-soft">참석 가능</span></div>`;
        })
        .join('')}</div>
    </div>
    <div class="footer"><button class="btn btn-primary btn-block press" ${best ? '' : 'disabled'} onclick="App.recConfirm('${id}')">이 시간으로 확정하기</button><button class="btn-text" onclick="App.recStep(3)">조건 수정하기</button></div></div>`;
};

/* ===========================================================================
   액션 + 라우터
   =========================================================================== */
const App = {
  go(hash) {
    location.hash = hash;
  },
  login() {
    this.go(State.user ? '#/' : '#/onboarding');
  },
  // 온보딩
  onbStep(s) {
    if (s < 0) return;
    UI.onb.step = s;
    render();
  },
  onbField(k, v) {
    UI.onb[k] = v;
    this._syncOnbNext();
  },
  _syncOnbNext() {
    const o = UI.onb;
    const canNext = o.step === 1 ? !!(o.name.trim() && o.team) : o.step === 2 ? !!(o.prefs.am || o.prefs.pm || o.prefs.any) : true;
    const btn = document.querySelector('.footer .btn-primary');
    if (btn && o.step < 4) btn.disabled = !canNext;
  },
  onbPref(k) {
    UI.onb.prefs[k] = !UI.onb.prefs[k];
    render();
  },
  onbTime(i, k, v) {
    UI.onb.times[i][k] = v;
  },
  onbTimeAdd() {
    UI.onb.times.push({ start: '14:00', end: '17:00' });
    render();
  },
  onbTimeDel(i) {
    UI.onb.times.splice(i, 1);
    render();
  },
  onbEditRecurring(k) {
    if (UI.onb.editing === k) {
      UI.onb.editing = null;
      UI.onb.draft = null;
    } else {
      UI.onb.editing = k;
      UI.onb.draft = { ...(UI.onb.recurring[k] || { start: '12:00', end: '13:00' }) };
      if (k !== 'lunch' && !UI.onb.draft.days) UI.onb.draft.days = [];
    }
    UI.onb.timeOpen = null;
    render();
  },
  onbDraftDay(d) {
    const days = UI.onb.draft.days || (UI.onb.draft.days = []);
    const i = days.indexOf(d);
    if (i >= 0) days.splice(i, 1);
    else days.push(d);
    render();
  },
  onbToggleTime(field) {
    UI.onb.timeOpen = UI.onb.timeOpen === field ? null : field;
    render();
  },
  onbSetHour(field, h12) {
    const t = UI.onb.draft[field];
    const isPm = +t.slice(0, 2) >= 12;
    let h24 = h12 % 12;
    if (isPm) h24 += 12;
    UI.onb.draft[field] = String(h24).padStart(2, '0') + ':' + t.slice(3);
    render();
  },
  onbSetMin(field, m) {
    const t = UI.onb.draft[field];
    UI.onb.draft[field] = t.slice(0, 2) + ':' + m;
    render();
  },
  onbDraftTime(field, v) {
    if (!v) return;
    UI.onb.draft[field] = v;
    render();
  },
  onbDraftAmPm(field, period) {
    const cur = UI.onb.draft[field];
    const isAm = +cur.slice(0, 2) < 12;
    if ((period === 'AM') !== isAm) UI.onb.draft[field] = flipAmPm(cur);
    render();
  },
  onbSaveRecurring(k) {
    UI.onb.recurring[k] = { ...UI.onb.draft };
    UI.onb.editing = null;
    UI.onb.draft = null;
    UI.onb.timeOpen = null;
    render();
  },
  onbDeleteRecurring(k) {
    delete UI.onb.recurring[k];
    UI.onb.editing = null;
    UI.onb.draft = null;
    UI.onb.timeOpen = null;
    render();
  },
  onbFinish() {
    const o = UI.onb;
    State.setUser({ name: o.name, team: o.team, role: o.role, preferredTimes: o.times, recurring: o.recurring });
    // 온보딩 완료 시 기존 회의를 모두 비움 — 이후 생성한 회의만 남음
    State.meetings = [];
    save(K.meetings, []);
    State.responses = [];
    save(K.responses, []);
    UI.onb.step = 5;
    render();
  },
  // 회의 생성
  newStep(s) {
    UI.newM.step = s;
    render();
  },
  newField(k, v) {
    UI.newM[k] = v;
    this._syncNewNext();
  },
  _syncNewNext() {
    const n = UI.newM;
    const btn = document.querySelector('.footer .btn-primary');
    if (btn && n.step === 1) btn.disabled = !(n.title.trim() && n.picked.length >= 1);
  },
  newPick(id) {
    const p = UI.newM.picked;
    if (p.includes(id)) {
      UI.newM.picked = p.filter((x) => x !== id);
      delete UI.newM.roles[id];
    } else {
      UI.newM.picked = [...p, id];
      UI.newM.roles[id] = 'required';
    }
    render();
  },
  newSearch(v) {
    UI.newM.search = v;
    const dd = document.getElementById('party-dd');
    if (dd) dd.innerHTML = this._partySearchHtml();
  },
  _partySearchHtml() {
    const n = UI.newM;
    const q = (n.search || '').trim();
    if (!q) return '';
    const remaining = invitablePool.filter((p) => !n.picked.includes(p.id));
    const hits = remaining.filter((p) => p.name.includes(q));
    const exists = invitablePool.some((p) => p.name === q) || Object.values(n.custom || {}).some((p) => p.name === q);
    let items = hits
      .map((p) => `<button class="search-dd-item press" onmousedown="event.preventDefault()" onclick="App.newAdd('${p.id}')">${avatar(p, 26)}<span style="font-size:14px;font-weight:500">${esc(p.name)}</span><span style="margin-left:auto;display:flex">${icon('Plus', 16, { stroke: 2.2, cls: 'icon-primary' })}</span></button>`)
      .join('');
    if (!exists) {
      items += `<button class="search-dd-item press" onmousedown="event.preventDefault()" onclick="App.newAddCustom()"><span class="avatar" style="width:26px;height:26px;background:var(--primary-light);color:var(--primary)">${icon('Plus', 15, { stroke: 2.4, cls: 'icon-primary' })}</span><span style="font-size:14px;font-weight:500">'${esc(q)}' 추가</span></button>`;
    }
    return `<div class="search-dd">${items}</div>`;
  },
  newAdd(id) {
    if (!UI.newM.picked.includes(id)) {
      UI.newM.picked = [...UI.newM.picked, id];
      UI.newM.roles[id] = 'required';
    }
    UI.newM.search = '';
    render();
  },
  newAddCustom() {
    const name = (UI.newM.search || '').trim();
    if (!name) return;
    if (!UI.newM.custom) UI.newM.custom = {};
    const id = 'c-' + Date.now();
    const palette = ['#6C8AE4', '#E48AB0', '#E4B36C', '#8A6CE4', '#6CC9E4', '#E47A7A', '#5BB98C'];
    let h = 0;
    for (let i = 0; i < name.length; i++) h = (h + name.charCodeAt(i)) % palette.length;
    UI.newM.custom[id] = { id, name, avatarColor: palette[h] };
    UI.newM.picked = [...UI.newM.picked, id];
    UI.newM.roles[id] = 'required';
    UI.newM.search = '';
    render();
  },
  newRole(id, role) {
    UI.newM.roles[id] = role;
    render();
  },
  newSend() {
    const n = UI.newM;
    const resolve = (id) => invitablePool.find((p) => p.id === id) || (n.custom && n.custom[id]) || pById(id);
    const me = { ...meP(), role: 'required' };
    const others = n.picked.map(resolve).filter(Boolean).map((p) => ({ ...p, role: n.roles[p.id] || 'required' }));
    const participants = [me, ...others];
    const id = 'm-' + Date.now();
    State.addMeeting({ id, title: n.title, participants, rangeStart: n.start, rangeEnd: n.end, durationMin: n.duration, status: 'collecting', respondedCount: 0 });
    UI.newM = { step: 1, title: '', picked: [], roles: {}, custom: {}, search: '', start: '2026-07-13', end: '2026-07-17', duration: 60 };
    this.go('#/');
  },
  // 응답
  respChoice(k) {
    const c = UI.resp.choices;
    if (k === 'anytime') {
      UI.resp.choices = c.includes('anytime') ? [] : ['anytime'];
    } else {
      let next = c.filter((x) => x !== 'anytime');
      next = next.includes(k) ? next.filter((x) => x !== k) : [...next, k];
      UI.resp.choices = next;
    }
    if (UI.resp.choices.includes('etc') && (!UI.resp.etcItems || !UI.resp.etcItems.length)) {
      UI.resp.etcItems = [{ label: '기타 일정', date: '', start: '09:00', end: '18:00' }];
    }
    if (UI.resp.choices.includes('fieldwork') && !UI.resp.fwItems.length) UI.resp.fwItems = [{ date: '', start: '09:00', end: '14:00' }];
    if (UI.resp.choices.includes('off') && !UI.resp.offItems.length) UI.resp.offItems = [{ date: '', start: '09:00', end: '18:00' }];
    render();
  },
  respField(k, v) {
    UI.resp[k] = v;
  },
  respItemField(list, i, key, v) {
    UI.resp[list][i][key] = v;
  },
  respItemAdd(list) {
    UI.resp[list].push(list === 'etcItems' ? { label: '기타 일정', date: '', start: '09:00', end: '18:00' } : { date: '', start: '09:00', end: '18:00' });
    render();
  },
  respItemDel(list, i) {
    UI.resp[list].splice(i, 1);
    if (!UI.resp[list].length) {
      const ck = { fwItems: 'fieldwork', offItems: 'off', etcItems: 'etc' }[list];
      UI.resp.choices = UI.resp.choices.filter((x) => x !== ck);
    }
    render();
  },
  respSubmit(id) {
    const r = UI.resp;
    const m = State.getMeeting(id);
    const choices = r.choices;
    const availability = choices.includes('off') ? 'off' : choices.includes('avoid_lunch') ? 'avoid_lunch' : 'anytime';
    const busyRanges = [];
    if (choices.includes('fieldwork')) (r.fwItems || []).forEach((it) => busyRanges.push({ date: it.date || m.rangeStart, start: it.start, end: it.end }));
    if (choices.includes('off')) (r.offItems || []).forEach((it) => busyRanges.push({ date: it.date || m.rangeStart, start: it.start, end: it.end }));
    if (choices.includes('etc')) (r.etcItems || []).forEach((it) => busyRanges.push({ date: it.date || m.rangeStart, start: it.start, end: it.end }));
    State.addResponse({ meetingId: id, participantId: 'me', availability, choices, busyRanges });
    // 데모: 내가 응답을 마치면 나머지 팀원 응답도 도착한 것으로 처리
    const sim = ['anytime', 'avoid_lunch', 'anytime', 'anytime', 'anytime', 'anytime'];
    let si = 0;
    m.participants.forEach((p) => {
      if (p.id === 'me') return;
      if (State.responses.some((x) => x.meetingId === id && x.participantId === p.id)) return;
      State.addResponse({ meetingId: id, participantId: p.id, availability: sim[si++ % sim.length], busyRanges: [] });
    });
    UI.resp.done = true;
    render();
  },
  // 상세
  detailTab(t) {
    UI.detailTab = t;
    render();
  },
  // 캘린더
  calSelect(ds) {
    UI.cal.selected = ds;
    render();
  },
  calMonth(delta) {
    const [Y, M] = UI.cal.month.split('-').map(Number);
    const d = new Date(Y, M - 1 + delta, 1);
    UI.cal.month = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    render();
  },
  // 회의 목록
  mlistFilter(f) {
    UI.mlist.filter = f;
    render();
  },
  logout() {
    this.go('#/login');
  },
  // 추천
  recStep(s) {
    UI.rec.step = s;
    render();
  },
  recDuration(v) {
    UI.rec.duration = v;
  },
  viewInCalendar(date) {
    UI._calPending = { month: date.slice(0, 7), selected: date };
    location.hash = '#/calendar';
  },
  recConfirm(id) {
    const m = State.getMeeting(id);
    const best = recommendSlots({ ...m, durationMin: UI.rec.duration }, State.responses.filter((r) => r.meetingId === id))[0];
    if (best) State.updateMeeting(id, { status: 'confirmed', confirmedSlot: best, durationMin: UI.rec.duration });
    UI.rec.step = 4;
    render();
  },
};
window.App = App;

/* 라우터: 진입 시 해당 화면의 로컬 상태 초기화 */
let prevRoute = '';
let prevStepKey = '';
let prevConfettiKey = '';
function render() {
  const hash = location.hash || '#/splash';
  const parts = hash.replace(/^#\//, '').split('/'); // ['meetings','ui-renewal']
  const base = parts[0];
  const routeKey = base + '/' + (parts[1] || '');
  const routeChanged = routeKey !== prevRoute;

  // 화면 진입 시 폼 상태 초기화 (라우트가 바뀔 때만)
  if (routeChanged) {
    if (base === 'onboarding') UI.onb = { step: 1, prefs: { am: false, pm: false, any: false }, name: '', team: '', role: '', times: [{ start: '09:00', end: '11:00' }], recurring: { lunch: { start: '12:00', end: '13:00' } }, editing: null, draft: null };
    // 온보딩 진입 시 기존 회의/응답 데이터 초기화 (매번 깨끗한 상태로 시작)
    if (base === 'onboarding') {
      State.meetings = [];
      save(K.meetings, []);
      State.responses = [];
      save(K.responses, []);
    }
    if (base === 'meetings' && parts[1] === 'new') UI.newM = { step: 1, title: '', picked: [], roles: {}, custom: {}, search: '', start: '2026-07-13', end: '2026-07-17', duration: 60 };
    if (base === 'respond') {
      const rec = (State.user && State.user.recurring) || {};
      const seeded = [];
      if (rec.lunch) seeded.push('avoid_lunch');
      const fwItems = [];
      if (rec.fieldwork) fwItems.push({ date: '', start: rec.fieldwork.start, end: rec.fieldwork.end });
      if (fwItems.length) seeded.push('fieldwork');
      const etcItems = [];
      [['regular', '정기회의'], ['focus', '집중시간'], ['etc', '기타 일정']].forEach(([key, lbl]) => {
        if (rec[key]) etcItems.push({ label: lbl, date: '', start: rec[key].start, end: rec[key].end });
      });
      if (etcItems.length) seeded.push('etc');
      UI.resp = { choices: seeded, fwItems, offItems: [], etcItems, done: false };
    }
    if (base === 'meetings' && parts[1] && parts[1] !== 'new') UI.detailTab = 'status';
    if (base === 'calendar') { UI.cal = UI._calPending || { month: '2026-07', selected: fmtLocalDate(new Date()) }; UI._calPending = null; }
    if (base === 'meetings' && !parts[1]) UI.mlist = { filter: 'all' };
    if (base === 'recommend') UI.rec = { step: 1, duration: (State.getMeeting(parts[1]) || {}).durationMin || 60 };
    prevRoute = routeKey;
  }

  let html;
  if (base === '' || base === undefined) html = Views.home();
  else if (base === 'splash') html = Views.splash();
  else if (base === 'login') html = Views.login();
  else if (base === 'signup' && parts[1] === 'terms') html = Views.signupTerms();
  else if (base === 'signup' && parts[1] === 'info') html = Views.signupInfo();
  else if (base === 'signup' && parts[1] === 'verify') html = Views.signupVerify();
  else if (base === 'onboarding') html = Views.onboarding();
  else if (base === 'calendar') html = Views.calendar();
  else if (base === 'profile') html = Views.profile();
  else if (base === 'meetings' && parts[1] === 'new') html = Views.meetingNew();
  else if (base === 'meetings' && parts[1]) html = Views.meetingDetail(parts[1]);
  else if (base === 'meetings') html = Views.meetingsList();
  else if (base === 'respond') html = Views.respond(parts[1]);
  else if (base === 'recommend') html = Views.recommend(parts[1]);
  else html = Views.home();

  const scr = document.getElementById('screen');
  scr.innerHTML = html;
  scr.scrollTop = 0;
  if (routeChanged) {
    const el = scr.firstElementChild;
    if (el) el.classList.add('route-enter');
  }
  // 단계(CTA) 전환 시에만 진입 애니메이션 — 토글/입력 등 인플레이스 상호작용은 재생 안 함
  const stepKey =
    base === 'onboarding' ? 'onb' + UI.onb.step : base === 'meetings' && parts[1] === 'new' ? 'new' + UI.newM.step : '';
  if (stepKey && stepKey !== prevStepKey && !routeChanged) {
    const body = scr.querySelector('.step-anim');
    if (body) body.classList.add('route-enter');
  }
  const confettiKey =
    base === 'onboarding' && UI.onb.step === 5 ? 'onb5' : base === 'recommend' && UI.rec.step === 4 ? 'rec4-' + (parts[1] || '') : '';
  if (confettiKey && confettiKey !== prevConfettiKey) {
    setTimeout(fireConfetti, 260);
  }
  prevConfettiKey = confettiKey;
  prevStepKey = stepKey;
  const phone = document.querySelector('.phone');
  if (phone) phone.classList.toggle('chrome-brand', base === 'splash');
}

window.addEventListener('hashchange', render);

function boot() {
  const g = document.getElementById('sb-glyphs');
  if (g) g.innerHTML = cellular() + wifiGlyph() + batteryGlyph();
  if (!location.hash) location.hash = '#/splash';
  render();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
