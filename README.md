# skytour

외주 홈페이지 제작 프로젝트. React + Vite로 만들고 GitHub Pages로 배포합니다. 프로젝트 구조는 whoami와 동일합니다.

- 배포 주소: https://chinggu88.github.io/skytour/
- 스택: React 19 · React Router · Vite 8

## 요구 사항

- Node.js 20 이상 (CI는 Node 20 기준)
- npm

## 설치

```bash
npm ci        # package-lock.json 기준 정확한 버전 설치 (권장)
# 또는
npm install
```

## 개발 서버

```bash
npm run dev
```

브라우저에서 **http://localhost:5173/skytour/** 로 접속합니다.
`vite.config.js`의 `base`가 `/skytour/`이므로 경로 끝의 `/skytour/`까지 포함해야 합니다.

## 빌드

```bash
npm run build     # dist/ 에 정적 파일 생성
npm run preview   # 빌드 결과물을 로컬 서버로 확인
```

## 린트

```bash
npm run lint
```

## 배포

`main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 자동으로 빌드 후 GitHub Pages에 배포합니다.

수동 배포가 필요하면:

```bash
npm run deploy    # predeploy로 build 실행 후 gh-pages 브랜치에 dist/ 푸시
```

## 프로젝트 구조

```
src/
├── main.jsx            # 진입점 (HashRouter)
├── App.jsx             # 레이아웃 + 라우트
├── index.css           # 전역 스타일 / 디자인 토큰
├── components/         # 공통 컴포넌트 (Header 등)
├── pages/              # 페이지 (Home / About / Contact — 본 콘텐츠 확정 시 교체)
├── api/                # API 통신 모듈
├── hooks/              # 커스텀 훅
├── store/              # 전역 상태 자리표시
└── utils/              # 포맷 유틸

public/                 # 정적 자산 (파비콘 등) — 빌드 시 dist/ 루트로 복사
```

본 콘텐츠(업체 정보, 메뉴, 연락처 등)는 아직 미확정으로, 현재 페이지는 임시 플레이스홀더입니다.
