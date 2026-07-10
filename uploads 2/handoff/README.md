# accord — 디자인 핸드오프

React 목업을 **순수 HTML / CSS / JS**로 옮긴 버전입니다. 빌드 도구나 설치 없이
브라우저에서 바로 열립니다.

## 여는 법

`index.html` 을 **더블클릭**하면 브라우저에서 열립니다. (인터넷 없이 열면
글꼴만 시스템 한글 폰트로 대체되고 나머지는 동일합니다.)

또는 이 폴더에서 로컬 서버로 열어도 됩니다:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## 전달 파일 (이 3개만 있으면 됩니다)

| 파일 | 내용 |
|------|------|
| `index.html` | 폰 프레임 뼈대 |
| `styles.css` | **모든 스타일.** 맨 위 `:root`에 색·radius·그림자·폰트 토큰이 정리돼 있어요 |
| `app.js` | 화면 마크업 + 화면 전환 로직 (디자인 값은 대부분 `styles.css`에) |

> `smoke.cjs`는 개발 검증용 스크립트입니다. 전달할 때는 무시하세요.

## 디자인 토큰

`styles.css` 상단 `:root`에서 바로 확인·수정할 수 있습니다:

```css
--primary: #3fb9a5;        /* 메인 teal */
--primary-light: #e6f5f1;  /* 연한 민트 배경 */
--mint: #57c7b8;           /* 스플래시/그라디언트 밝은 쪽 */
--ink: #17181a;  --sub: #9aa0a6;  --line: #eef0f2;  --bg: #f7f8f9;
--grad-mint: linear-gradient(150deg, #57c7b8 0%, #3fb9a5 100%);  /* 시그니처 카드 */
```

## 화면 목록 (URL 뒤 `#/...` 로 바로 이동)

특정 화면을 캡처하려면 주소창 끝에 해시를 붙이세요. 예: `.../index.html#/onboarding`

| 해시 | 화면 |
|------|------|
| `#/splash` | 스플래시 |
| `#/login` | 로그인 |
| `#/signup/terms` · `/info` · `/verify` | 회원가입 3단계 |
| `#/onboarding` | 온보딩 (시작→기본정보→선호시간→반복일정→확인) |
| `#/` | 홈 |
| `#/meetings/new` | 회의 만들기 3단계 |
| `#/meetings/ui-renewal` | 주최자 응답 현황 / 추천 결과 |
| `#/respond/ui-renewal` | 참여자 응답 |
| `#/recommend/ui-renewal` | AI 추천 → 이유 → 조건 수정 → 확정 |

## 참고

- 아이콘은 전부 인라인 SVG(lucide 기반)라 이미지 파일이 없습니다. `app.js`의
  `ICONS` 객체에 원본 path가 들어 있어요.
- 입력한 데이터는 브라우저 localStorage에 저장돼 새로고침해도 유지됩니다.
  초기화하려면 개발자도구 → Application → Local Storage 에서 `accordh.*` 를 지우세요.
