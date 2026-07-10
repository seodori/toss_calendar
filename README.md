# accord onboarding prototype

회의 참여자의 상황과 업무 리듬을 설정하는 `accord` 모바일 온보딩 프로토타입입니다.

## 실행 방법

별도의 패키지 설치나 빌드 과정이 필요하지 않습니다.

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

브라우저에서 `http://127.0.0.1:4173`을 엽니다.

## GitHub Pages

저장소에 이 폴더의 파일을 업로드한 후 GitHub 저장소의 **Settings → Pages**에서 배포 브랜치와 루트 폴더를 선택하면 정적 사이트로 배포할 수 있습니다.

## 파일 구성

- `index.html`: 화면 마크업
- `styles.css`: 레이아웃, 스타일, 전환 및 꽃가루 모션
- `app.js`: 온보딩 상태와 인터랙션
- `assets/`: 로고와 아이콘 이미지

