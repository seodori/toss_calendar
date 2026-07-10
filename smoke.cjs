// handoff 프로토타입 스모크: 모든 라우트가 크래시 없이 렌더되는지 jsdom으로 확인.
const { JSDOM } = require('jsdom')
const vm = require('vm')
const fs = require('fs')
const path = require('path')

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8')
const dom = new JSDOM(html, { url: 'http://localhost/', pretendToBeVisual: true })
const { window } = dom
const errors = []
window.addEventListener('error', (e) => errors.push(e.message))

const code = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8')
vm.createContext(window)
vm.runInContext(code, window) // window 컨텍스트에서 실행 → 식별자 window 해석됨

const routes = [
  '#/splash', '#/login', '#/signup/terms', '#/signup/info', '#/signup/verify',
  '#/onboarding', '#/', '#/calendar', '#/meetings', '#/profile',
  '#/meetings/new', '#/meetings/ui-renewal', '#/respond/ui-renewal', '#/recommend/ui-renewal',
]

let ok = 0
for (const r of routes) {
  window.location.hash = r
  window.dispatchEvent(new window.Event('hashchange'))
  const el = window.document.getElementById('screen')
  const len = el ? el.innerHTML.length : 0
  const pass = len > 50
  console.log(`${pass ? 'OK ' : 'FAIL'} ${r.padEnd(22)} ${len} chars`)
  if (pass) ok++
}

// 몇 가지 상호작용 시뮬레이션
window.location.hash = '#/recommend/ui-renewal'
window.App.recStep(2)
window.App.recStep(3)
window.App.recDuration(30)
window.App.recStep(1)
const recLen = window.document.getElementById('screen').innerHTML.length
console.log(`OK  recommend 스텝 순회         ${recLen} chars`)

console.log(`\n${ok}/${routes.length} routes rendered`)
if (errors.length) {
  console.log('ERRORS:', errors)
  process.exit(1)
}
if (ok !== routes.length) process.exit(1)
console.log('smoke passed')
