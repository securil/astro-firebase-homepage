# GitHub Secrets 설정 가이드

## 📋 설정 단계

GitHub Actions에서 Firebase 환경변수를 안전하게 사용하기 위해 다음 단계를 따라주세요:

### 1. GitHub 저장소로 이동
1. 브라우저에서 https://github.com/securil/astro-firebase-homepage 접속
2. 로그인 상태 확인

### 2. Settings 탭으로 이동
1. 저장소 상단 메뉴에서 **Settings** 클릭
2. 왼쪽 사이드바에서 **Secrets and variables** → **Actions** 클릭

### 3. Repository secrets 추가
**New repository secret** 버튼을 클릭하여 다음 시크릿들을 하나씩 추가:

| Name | Value |
|------|-------|
| `VITE_FIREBASE_API_KEY` | AIzaSyDkcPHQ3a89WwsizzkYC7WF2_B6iAPb9f0 |
| `VITE_FIREBASE_AUTH_DOMAIN` | chunggu-golf.firebaseapp.com |
| `VITE_FIREBASE_PROJECT_ID` | chunggu-golf |
| `VITE_FIREBASE_STORAGE_BUCKET` | chunggu-golf.firebasestorage.app |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | 548891376636 |
| `VITE_FIREBASE_APP_ID` | 1:548891376636:web:7bc1d1b3034a46baab9079 |
| `VITE_FIREBASE_MEASUREMENT_ID` | G-83K93WKFPE |

⚠️ **중요**: 각 시크릿을 추가할 때 Name과 Value를 정확히 입력하세요.

### 4. GitHub Pages 설정 변경
1. Settings → Pages로 이동
2. Source를 **GitHub Actions**로 변경
3. Save 클릭

### 5. 확인
- 모든 시크릿이 추가되면 main 브랜치에 푸시할 때 자동으로 GitHub Actions가 실행됩니다
- Actions 탭에서 배포 진행 상황을 확인할 수 있습니다

## 🔒 보안 참고사항
- GitHub Secrets는 한번 저장하면 값을 다시 볼 수 없습니다
- 수정이 필요한 경우 같은 이름으로 다시 추가하면 덮어쓰기됩니다
- 이 값들은 GitHub Actions 실행 중에만 사용되며 외부에 노출되지 않습니다

## 🚀 로컬 개발
로컬에서 개발할 때는 `.env.local` 파일의 환경변수가 사용됩니다.