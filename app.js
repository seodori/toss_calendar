const state = { screen: 'splash', step: 1 };
const screens = [...document.querySelectorAll('.screen')];
const steps = [...document.querySelectorAll('.step')];
const $ = (selector) => document.querySelector(selector);
const routineState = {
  lunch: { title: '점심시간', start: '12:00', end: '13:00', weekdays: [], configured: true },
  out: { title: '외근 / 미팅', start: '', end: '', weekdays: [], configured: false },
  focus: { title: '집중시간 (Focus Time)', start: '', end: '', weekdays: [], configured: false },
  recurring: { title: '정기회의', start: '', end: '', weekdays: [], configured: false },
  other: { title: '기타 일정', start: '', end: '', weekdays: [], configured: false }
};
const weekdayRoutineKeys = new Set(['out', 'recurring', 'other']);
const routineIconMap = {
  out: 'assets/routine-out-v3.png',
  focus: 'assets/routine-focus-v3.png',
  recurring: 'assets/routine-recurring-v3.png',
  other: 'assets/routine-other-v3.png'
};
const timeDraft = { start: { period: '', clock: '' }, end: { period: '', clock: '' } };
let editingRoutine = null;

function showScreen(name) {
  state.screen = name;
  screens.forEach((screen) => screen.classList.toggle('active', screen.dataset.screen === name));
  updateNextState();
}

function updateNextState() {
  const nextButton = $('[data-action="next"]');
  const nameEntered = $('#name').value.trim().length > 0;
  const teamSelected = !$('#team').classList.contains('placeholder');
  const preferredTimeSelected = document.querySelector('.preset.selected') !== null || document.querySelector('.time-row') !== null;
  const firstStepIncomplete = state.step === 1 && !(nameEntered && teamSelected);
  const secondStepIncomplete = state.step === 2 && !preferredTimeSelected;
  nextButton.disabled = state.screen === 'setup' && (firstStepIncomplete || secondStepIncomplete);
}

function showStep(nextStep) {
  closeRoutineEditor();
  state.step = Math.max(1, Math.min(4, nextStep));
  $('.setup').classList.toggle('final-step', state.step === 4);
  steps.forEach((step) => step.classList.toggle('active', Number(step.dataset.step) === state.step));
  $('#current-step').textContent = state.step;
  $('#progress-bar').style.width = `${state.step * 25}%`;
  $('[data-action="previous"]').disabled = state.step === 1;
  $('[data-action="previous"]').style.opacity = state.step === 1 ? '.5' : '1';
  $('[data-action="next"]').textContent = '다음';
  updateNextState();
  $('.step-stage').scrollTop = 0;
  if (state.step === 4) updateSummary();
}

function updateSummary() {
  const name = $('#name').value.trim() || '이름 없음';
  const team = $('#team').classList.contains('placeholder') ? '선택하지 않음' : $('#team').textContent;
  $('#summary-name').textContent = name;
  $('#summary-team').textContent = team;
  $('#summary-lunch').textContent = `${routineState.lunch.start} - ${routineState.lunch.end}`;
  const configuredRoutines = Object.entries(routineState).filter(([key, routine]) => key !== 'lunch' && routine.configured);
  $('#summary-routines').innerHTML = configuredRoutines.map(([key, routine]) => {
    const days = weekdayRoutineKeys.has(key) && routine.weekdays.length ? `${routine.weekdays.join(', ')} · ` : '';
    const value = `${days}${formatKoreanTime(routine.start)} - ${formatKoreanTime(routine.end)}`;
    return `<div class="profile-row"><img src="${routineIconMap[key]}" alt="" /><span><small>${routine.title}</small><b>${value}</b></span></div>`;
  }).join('');
  $('#complete-name').textContent = name;
}

function updateRoutineSaveState() {
  const start = $('#routine-start').value;
  const end = $('#routine-end').value;
  const weekdaysRequired = weekdayRoutineKeys.has(editingRoutine);
  const weekdaySelected = document.querySelector('[data-weekday].selected') !== null;
  $('.routine-save').disabled = !start || !end || start >= end || (weekdaysRequired && !weekdaySelected);
}

function parseTime(value) {
  if (!value) return { period: '', clock: '' };
  const [hourText, minute] = value.split(':');
  const hour = Number(hourText);
  const period = hour < 12 ? '오전' : '오후';
  const hour12 = hour % 12 || 12;
  return { period, clock: `${String(hour12).padStart(2, '0')}:${minute}` };
}

function to24Hour(period, clock) {
  if (!period || !clock) return '';
  const [hourText, minute] = clock.split(':');
  let hour = Number(hourText);
  if (period === '오전' && hour === 12) hour = 0;
  if (period === '오후' && hour !== 12) hour += 12;
  return `${String(hour).padStart(2, '0')}:${minute}`;
}

function formatKoreanTime(value) {
  const parsed = parseTime(value);
  return value ? `${parsed.period} ${parsed.clock}` : '--:--';
}

function syncTimePicker(which, value) {
  timeDraft[which] = parseTime(value);
  $(`#routine-${which}`).value = value;
  const display = $(`#routine-${which}-display`);
  display.textContent = value ? formatKoreanTime(value) : '--:--';
  display.classList.toggle('placeholder', !value);
  document.querySelectorAll(`[data-period="${which}"]`).forEach((button) => button.classList.toggle('selected', button.dataset.value === timeDraft[which].period));
  document.querySelectorAll(`[data-clock="${which}"]`).forEach((button) => button.classList.toggle('selected', button.dataset.value === timeDraft[which].clock));
}

function applyTimeDraft(which) {
  if (!timeDraft[which].period || !timeDraft[which].clock) {
    $(`#routine-${which}`).value = '';
    $(`#routine-${which}-display`).textContent = '--:--';
    updateRoutineSaveState();
    return;
  }
  const value = to24Hour(timeDraft[which].period, timeDraft[which].clock);
  syncTimePicker(which, value);
  updateRoutineSaveState();
}

function closeTimeMenus() {
  document.querySelectorAll('.routine-time-menu').forEach((menu) => menu.classList.remove('open'));
  document.querySelectorAll('[data-time-trigger]').forEach((button) => button.setAttribute('aria-expanded', 'false'));
}

function openRoutineEditor(key) {
  const routine = routineState[key];
  editingRoutine = key;
  $('#routine-editor-title').textContent = routine.title;
  syncTimePicker('start', routine.start);
  syncTimePicker('end', routine.end);
  const weekdaysRequired = weekdayRoutineKeys.has(key);
  $('.routine-weekdays').hidden = !weekdaysRequired;
  document.querySelectorAll('[data-weekday]').forEach((button) => {
    const selected = routine.weekdays.includes(button.dataset.weekday);
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  $('.routine-delete').hidden = !routine.configured;
  $('.routine-overview').hidden = true;
  $('.routine-editor').hidden = false;
  $('.setup').classList.add('editing-routine');
  updateRoutineSaveState();
}

function closeRoutineEditor() {
  const editor = $('.routine-editor');
  if (!editor) return;
  editingRoutine = null;
  $('.routine-overview').hidden = false;
  editor.hidden = true;
  $('.setup').classList.remove('editing-routine');
  closeTimeMenus();
}

function renderRoutineValue(key) {
  const routine = routineState[key];
  const days = weekdayRoutineKeys.has(key) && routine.weekdays.length ? `${routine.weekdays.join(', ')} · ` : '';
  $(`#routine-${key}-value`).textContent = routine.configured ? `${days}${formatKoreanTime(routine.start)} - ${formatKoreanTime(routine.end)}` : '설정하기';
}

function initializeClockOptions() {
  const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const options = hours.flatMap((hour) => [0, 30].map((minute) => `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`));
  for (const which of ['start', 'end']) {
    const container = document.querySelector(`[data-clock-options="${which}"]`);
    options.forEach((time) => container.insertAdjacentHTML('beforeend', `<button type="button" data-clock="${which}" data-value="${time}">${time}</button>`));
  }
}

function leaveSplash() {
  const splash = document.querySelector('[data-screen="splash"]');
  splash.classList.add('exiting');
  showScreen('intro');
  setTimeout(() => splash.classList.remove('exiting'), 800);
}

function launchConfetti() {
  const container = $('.confetti');
  const colors = ['#16b8a5', '#079886', '#62676a', '#aeb3b5', '#d4d4d4'];
  container.innerHTML = '';
  for (let index = 0; index < 38; index += 1) {
    const piece = document.createElement('i');
    const direction = index % 2 === 0 ? -1 : 1;
    const x = direction * (24 + Math.random() * 178);
    const y = -(65 + Math.random() * 85);
    piece.style.setProperty('--start-x', '50%');
    piece.style.setProperty('--x', `${x}px`);
    piece.style.setProperty('--y', `${y}px`);
    piece.style.setProperty('--x-mid', `${x * 0.62}px`);
    piece.style.setProperty('--y-mid', `${y * 0.58}px`);
    piece.style.setProperty('--x2', `${x * 1.12}px`);
    piece.style.setProperty('--y2', `${y * 1.12}px`);
    piece.style.setProperty('--rotation', `${180 + Math.random() * 520}deg`);
    piece.style.setProperty('--delay', `${Math.random() * 0.035}s`);
    piece.style.setProperty('--duration', '3s');
    piece.style.setProperty('--piece-width', `${4 + Math.random() * 5}px`);
    piece.style.setProperty('--piece-height', `${8 + Math.random() * 8}px`);
    piece.style.background = colors[index % colors.length];
    container.appendChild(piece);
  }
}

function transitionToComplete() {
  const setup = $('[data-screen="setup"]');
  setup.classList.add('finishing');
  showScreen('complete');
  launchConfetti();
  setTimeout(() => setup.classList.remove('finishing'), 800);
}

setTimeout(leaveSplash, 2000);

document.addEventListener('click', (event) => {
  const action = event.target.closest('[data-action]')?.dataset.action;
  if (action === 'start') { showScreen('setup'); showStep(1); }
  if (action === 'next') state.step < 4 ? showStep(state.step + 1) : transitionToComplete();
  if (action === 'back' && state.step === 3 && !$('.routine-editor').hidden) closeRoutineEditor();
  else if (action === 'previous' || action === 'back') state.step > 1 ? showStep(state.step - 1) : showScreen('intro');
  if (action === 'skip') showStep(4);
  if (action === 'edit') showStep(1);
  if (action === 'restart') { showScreen('intro'); showStep(1); }
  if (action === 'routine-cancel') closeRoutineEditor();
  if (action === 'routine-save' && editingRoutine) {
    const routine = routineState[editingRoutine];
    routine.start = $('#routine-start').value;
    routine.end = $('#routine-end').value;
    routine.weekdays = weekdayRoutineKeys.has(editingRoutine)
      ? [...document.querySelectorAll('[data-weekday].selected')].map((button) => button.dataset.weekday)
      : [];
    routine.configured = true;
    renderRoutineValue(editingRoutine);
    closeRoutineEditor();
  }
  if (action === 'routine-delete' && editingRoutine) {
    const routine = routineState[editingRoutine];
    routine.start = '';
    routine.end = '';
    routine.weekdays = [];
    routine.configured = false;
    renderRoutineValue(editingRoutine);
    closeRoutineEditor();
  }
  const routineButton = event.target.closest('[data-routine]');
  if (routineButton) openRoutineEditor(routineButton.dataset.routine);
  const weekdayButton = event.target.closest('[data-weekday]');
  if (weekdayButton) {
    weekdayButton.classList.toggle('selected');
    weekdayButton.setAttribute('aria-pressed', String(weekdayButton.classList.contains('selected')));
    updateRoutineSaveState();
  }
  const timeTrigger = event.target.closest('[data-time-trigger]');
  const periodButton = event.target.closest('[data-period]');
  const clockButton = event.target.closest('[data-clock]');
  if (timeTrigger) {
    const which = timeTrigger.dataset.timeTrigger;
    const menu = document.querySelector(`[data-time-menu="${which}"]`);
    const willOpen = !menu.classList.contains('open');
    closeTimeMenus();
    menu.classList.toggle('open', willOpen);
    timeTrigger.setAttribute('aria-expanded', String(willOpen));
  } else if (periodButton) {
    const which = periodButton.dataset.period;
    timeDraft[which].period = periodButton.dataset.value;
    document.querySelectorAll(`[data-period="${which}"]`).forEach((button) => button.classList.toggle('selected', button === periodButton));
    applyTimeDraft(which);
  } else if (clockButton) {
    const which = clockButton.dataset.clock;
    timeDraft[which].clock = clockButton.dataset.value;
    applyTimeDraft(which);
    closeTimeMenus();
  } else if (!event.target.closest('.routine-time-picker')) {
    closeTimeMenus();
  }
  if (event.target.closest('.clear')) {
    $('#name').value = '';
    updateNextState();
  }
  const dropdownButton = event.target.closest('[data-dropdown]');
  const optionButton = event.target.closest('[data-option]');

  if (optionButton) {
    const type = optionButton.dataset.option;
    const value = optionButton.dataset.value;
    const target = $(`#${type}`);
    target.textContent = value;
    target.classList.remove('placeholder');
    updateNextState();
    document.querySelectorAll('[data-dropdown]').forEach((button) => button.setAttribute('aria-expanded', 'false'));
    document.querySelectorAll('.dropdown-menu').forEach((menu) => menu.classList.remove('open'));
  } else if (dropdownButton) {
    const type = dropdownButton.dataset.dropdown;
    const menu = document.querySelector(`[data-menu="${type}"]`);
    const willOpen = !menu.classList.contains('open');
    document.querySelectorAll('[data-dropdown]').forEach((button) => button.setAttribute('aria-expanded', 'false'));
    document.querySelectorAll('.dropdown-menu').forEach((item) => item.classList.remove('open'));
    menu.classList.toggle('open', willOpen);
    dropdownButton.setAttribute('aria-expanded', String(willOpen));
  } else {
    document.querySelectorAll('[data-dropdown]').forEach((button) => button.setAttribute('aria-expanded', 'false'));
    document.querySelectorAll('.dropdown-menu').forEach((menu) => menu.classList.remove('open'));
  }
  const preset = event.target.closest('.preset');
  if (preset) {
    preset.classList.toggle('selected');
    preset.setAttribute('aria-pressed', String(preset.classList.contains('selected')));
    updateNextState();
  }

  if (event.target.closest('.add-time')) {
    const rows = $('#custom-time-rows');
    if (rows.children.length >= 5) return;
    const number = rows.children.length + 1;
    rows.insertAdjacentHTML('beforeend', `<div class="time-row"><input type="time" value="09:00" aria-label="${number}번째 시작 시간"/><span>-</span><input type="time" value="09:00" aria-label="${number}번째 종료 시간"/><button class="remove-time" type="button" aria-label="${number}번째 시간 삭제"><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="9"/><path d="m7 7 6 6m0-6-6 6"/></svg></button></div>`);
    document.querySelector('.add-time').hidden = rows.children.length >= 5;
    updateNextState();
  }

  const removeTime = event.target.closest('.remove-time');
  if (removeTime) {
    removeTime.closest('.time-row').remove();
    document.querySelector('.add-time').hidden = false;
    updateNextState();
  }
});

$('#name').addEventListener('input', updateNextState);
initializeClockOptions();
showStep(1);
