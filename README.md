# InterX Chatbot

인터엑스 챗봇 프로젝트입니다.
(❗️회사 이미지(로고, favicon 등)을 잠시 저장하여 사용하였습니다.
프로젝트 제출용으로 잠시 사용했으며 추후 삭제 예정이니 양해 부탁드립니다 🙏)

## 기술 스택

- React + TypeScript
- Vite (빌드 도구)
- Ant Design (UI 컴포넌트)
- Zustand (상태 관리)
- Tailwind CSS (스타일링)

## 시작하기

### 1. 저장소 클론

```bash
git clone git clone https://github.com/your-username/interx-assignment.git
cd interx-assignment
```

### 2. pnpm 설치

```bash
# pnpm이 설치되어 있지 않은 경우
npm install -g pnpm
```

### 3. 의존성 설치

```bash
pnpm install
```

### 4. 환경 변수 설정

프로젝트 루트 디렉토리에 `.env.local` 파일을 생성하고 다음 환경 변수들을 설정해주세요:

```env
# API 엔드포인트
VITE_API_URL=https://api.openai.com/v1/chat/completions

# OpenAI API 키
VITE_OPENAI_API_KEY=your-api-key-here

# 사용할 AI 모델
VITE_INTERX_MODEL=gpt-3.5-turbo

# STORAGE KEY
VITE_INTERX_STORAGE_KEY=CHAT-CONTENT
```

### 5. 개발 서버 실행

```bash
pnpm dev
```

개발 서버가 실행되면 기본적으로 `http://localhost:5173`에서 접속할 수 있습니다.

### 주요 기능

- 메시지 입력 및 전송 (Enter 키 또는 버튼 클릭)
- LLM API 연동 및 실시간 응답 출력 (async/await 비동기 관리)
- 로딩 상태 표시 (loading을 state로 관리)
- 에러 처리 및 fallback 메시지 (Ant-Design의 Alert을 활용하여 표시)
- Markdown 렌더링 (react-markdown, remark-gfm)
- 실시간 타이핑 효과 (setInterval 함수 사용)
- 다크/라이트 모드 (zustand로 전역변수화하여 관리)
- 반응형 디자인 (Ant-Design & tailwindcss)
- 커스텀 테마 설정 (color-picker)
- 타임스탬프 표시
