# Reports 페이지 구성 가이드

**작성일**: 2025년 6월 22일  
**목적**: 월별 리포트 페이지 구조 및 관리 방법 문서화

---

## 📁 파일 구조

### 메인 파일
- **경로**: `src/pages/reports/[period].astro`
- **타입**: Astro 동적 라우팅 페이지
- **URL 패턴**: `/reports/YYYY-MM` (예: `/reports/2025-03`, `/reports/2025-05`)

### 관련 파일
- `src/pages/reports.astro` - 리포트 목록 페이지
- `public/images/golf-course-default.webp` - 기본 배경 이미지

---

## 🔧 페이지 설정

### getStaticPaths 함수
```javascript
export async function getStaticPaths() {
  return [
    { params: { period: '2025-03' } },
    { params: { period: '2025-05' } }
  ];
}
```

**새로운 월 추가 시**: 배열에 `{ params: { period: 'YYYY-MM' } }` 추가

---

## 📊 데이터 구조

### reportData 객체 구조
```javascript
const reportData = {
  'YYYY-MM': {
    // 기본 정보
    title: '리포트 제목',
    date: 'YYYY-MM-DD',
    location: '골프장명',
    participants: 참가자수,
    avgScore: 평균타수,
    bestScore: 최저타수,
    underPar: 언더파인원,
    eighties: 80대인원,
    weather: '날씨',
    temperature: '온도',
    
    // 시상 내역
    awards: [
      {
        category: '시상명',
        name: '수상자명',
        generation: '기수',
        score: '점수/기록',
        color: 'Tailwind 그라데이션 클래스'
      }
    ],
    
    // 코스별 통계
    courseStats: [
      {
        name: '코스명',
        players: 참가자수,
        topPlayers: [
          { name: '이름', score: 점수, generation: '기수' }
        ]
      }
    ],
    
    // 전체 성적표
    scores: [
      {
        rank: 순위,
        name: '이름',
        generation: '기수',
        score: 총타수,
        course: '플레이코스',
        front: 전반타수,
        back: 후반타수
      }
    ],
    
    // 여성 성적표
    femaleScores: [
      // scores와 동일한 구조
    ],
    
    // 조편성 정보 (선택사항)
    teamList: {
      // 5월형(대회): prizes, division, courses, totalInfo
      // 3월형(월례): title, courses, rightSide, rightSideExtended
    }
  }
};
```

---

## 🎨 페이지 섹션 구성

### 1. Hero Banner
- **위치**: 페이지 상단
- **내용**: 리포트 제목, 날짜, 장소, 참가자 수, 날씨
- **스타일**: 배경 이미지 + 그라데이션 오버레이

### 2. 시상 내역 (Awards Section)
- **아이콘**: 🏆
- **레이아웃**: 카드 그리드 (4열)
- **애니메이션**: 호버시 상승 효과
- **색상**: 각 시상별 고유 그라데이션

### 3. 조편성표 (Team List Section) - 조건부
#### 5월형 (대회)
- **표시 조건**: `period === '2025-05' && data.teamList`
- **구성**:
  - 시상 리스트
  - 대회 진표 (남/여/신입조)
  - 코스별 조편성 (4개 코스)

#### 3월형 (월례회)
- **표시 조건**: `period === '2025-03' && data.teamList`
- **구성**:
  - 좌우 2열 레이아웃
  - 코스별 시간대 구분
  - 간단한 조편성 정보

### 4. 코스별 분석 (Course Analysis)
- **아이콘**: 🏔️
- **레이아웃**: 카드 그리드 (4열)
- **내용**: 각 코스별 참가자 수 + 상위 3위

### 5. 전체 성적표 (Score Table)
- **아이콘**: 📊
- **스타일**: 반응형 테이블
- **순위 표시**: 1-3위 메달 아이콘
- **파 대비**: 색상 코딩 (언더파/파/오버파)

### 6. 여성 성적표 (Female Score Table)
- **아이콘**: 🌸
- **스타일**: 핑크 테마
- **구조**: 전체 성적표와 동일

### 7. 통계 대시보드 (Stats Dashboard)
- **아이콘**: 📈
- **레이아웃**: 4개 카드 (최고성적/평균타수/언더파/80대)
- **스타일**: 그라데이션 배경

### 8. 성과 분석 (Performance Analysis)
- **구성**:
  - TOP 3 우수 성적자
  - 타수 분포 분석 (프로그레스 바)

### 9. 네비게이션
- **버튼**: "리포트 목록으로 돌아가기"
- **링크**: `/reports` 페이지

---

## 🆕 새로운 월 추가 가이드

### 1. getStaticPaths 수정
```javascript
export async function getStaticPaths() {
  return [
    { params: { period: '2025-03' } },
    { params: { period: '2025-05' } },
    { params: { period: '2025-06' } }  // ← 추가
  ];
}
```

### 2. reportData에 새 데이터 추가
```javascript
const reportData = {
  // 기존 데이터...
  '2025-06': {
    title: '2025년 6월 정기모임 리포트',
    date: '2025-06-XX',
    location: '골프장명',
    participants: XX,
    avgScore: XX,
    bestScore: XX,
    underPar: X,
    eighties: XX,
    weather: '날씨',
    temperature: 'XX°C',
    
    awards: [
      // 시상 정보 입력
    ],
    
    courseStats: [
      // 코스별 통계
    ],
    
    scores: [
      // 전체 성적 데이터
    ],
    
    femaleScores: [
      // 여성 성적 데이터 (있는 경우)
    ]
    
    // teamList: { } - 조편성 정보 (필요한 경우)
  }
};
```

### 3. 조편성 정보 추가 (선택사항)

#### 대회형 조편성 (5월 스타일)
```javascript
teamList: {
  prizes: ['시상 목록'],
  division: [
    { name: '구분명', teams: 팀수, players: 인원수 }
  ],
  courses: [
    {
      name: '코스명',
      holes: '홀 정보',
      teams: [
        { number: 조번호, players: ['선수목록'], note: '특이사항' }
      ]
    }
  ],
  totalInfo: {
    totalPlayers: 총인원,
    totalTeams: 총조수,
    startTime: '시작시간',
    duration: '소요시간'
  }
}
```

#### 월례회형 조편성 (3월 스타일)
```javascript
teamList: {
  title: '조편성 제목',
  courses: [
    {
      name: '코스명',
      startTime: '시간대',
      teams: [
        { number: 조번호, time: '시간', players: ['선수목록'] }
      ]
    }
  ],
  rightSide: {
    name: '우측코스명',
    startTime: '시간대',
    teams: [/* 동일 구조 */]
  },
  rightSideExtended: {
    name: '추가코스명',
    startTime: '시간대',
    teams: [/* 동일 구조 */]
  }
}
```

### 4. 조편성 UI 조건부 표시
- **대회형**: `period === 'YYYY-MM' && data.teamList && data.teamList.prizes`
- **월례회형**: `period === 'YYYY-MM' && data.teamList && data.teamList.title`

---

## 📝 데이터 수집 체크리스트

### 기본 정보
- [ ] 모임 날짜 (YYYY-MM-DD)
- [ ] 골프장명
- [ ] 참가자 수
- [ ] 날씨 정보
- [ ] 평균 타수
- [ ] 최저 타수
- [ ] 언더파 인원
- [ ] 80대 타수 인원

### 시상 정보
- [ ] 각 시상별 수상자명
- [ ] 수상자 기수
- [ ] 수상 기록/점수
- [ ] 시상 카테고리명

### 성적 정보
- [ ] 전체 참가자 순위별 성적
- [ ] 전반/후반 타수
- [ ] 플레이 코스 정보
- [ ] 여성 참가자 별도 순위 (있는 경우)

### 코스별 정보
- [ ] 각 코스별 참가자 수
- [ ] 코스별 상위 3위 성적

### 조편성 정보 (선택)
- [ ] 조편성표 이미지 또는 데이터
- [ ] 시간대별 구분
- [ ] 코스별 배정
- [ ] 특별 정보 (시상, 대회 정보 등)

---

## 🔧 유지보수 가이드

### 스타일 수정
- **색상 변경**: Tailwind CSS 클래스 수정
- **레이아웃 조정**: Grid/Flex 클래스 변경
- **애니메이션**: transition, hover 클래스 수정

### 새로운 섹션 추가
1. 데이터 구조 설계
2. HTML 마크업 작성
3. 조건부 렌더링 설정 (필요시)
4. 스타일링 적용

### 성능 최적화
- 이미지 최적화 (WebP 형식 사용)
- 데이터 크기 관리 (대용량 성적표 처리)
- 반응형 최적화 확인

---

## 📱 반응형 대응

### 브레이크포인트
- **Mobile**: `< 768px` - 1열 레이아웃
- **Tablet**: `768px - 1024px` - 2열 레이아웃  
- **Desktop**: `> 1024px` - 3-4열 레이아웃

### 테이블 반응형
- 가로 스크롤 적용 (`overflow-x-auto`)
- 모바일에서 폰트 크기 조정
- 터치 친화적 인터랙션

---

## 🚀 배포 가이드

### GitHub Pages 배포
1. 코드 커밋 및 푸시
2. `npm run deploy` 실행
3. GitHub Pages 설정 확인
4. URL 접근 테스트

### URL 구조
- **로컬**: `http://localhost:4327/reports/YYYY-MM`
- **배포**: `https://securil.github.io/astro-firebase-homepage/reports/YYYY-MM`

---

**문서 관리**
- **최초 작성**: 2025년 6월 22일
- **다음 업데이트**: 6월 리포트 추가 시
- **관리자**: 프로젝트 담당자