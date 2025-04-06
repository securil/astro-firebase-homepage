# 청구회 골프 동호회 스코어 통계 페이지 개발 가이드

이 문서는 청구회 골프 동호회 홈페이지에 스코어 분석 및 통계 페이지를 구현하기 위한 단계별 가이드입니다. 2020년부터 2024년까지의 스코어 데이터를 다양한 시각화 방법으로 보여주는 페이지 개발 방법을 설명합니다.

## 목차

1. [개발 환경 및 준비사항](#1-개발-환경-및-준비사항)
2. [기본 구조 설정](#2-기본-구조-설정)
3. [공통 UI 컴포넌트 구현](#3-공통-ui-컴포넌트-구현)
4. [주요 섹션 구현](#4-주요-섹션-구현)
5. [데이터 처리 유틸리티 구현](#5-데이터-처리-유틸리티-구현)
6. [필터링 기능 구현](#6-필터링-기능-구현)
7. [차트 및 시각화 구현](#7-차트-및-시각화-구현)
8. [권한 설정 및 접근 제어](#8-권한-설정-및-접근-제어)
9. [성능 최적화](#9-성능-최적화)
10. [배포 및 테스트](#10-배포-및-테스트)

---

## 1. 개발 환경 및 준비사항

### 기술 스택 확인

- **프레임워크**: Astro 5.x
- **스타일링**: TailwindCSS
- **데이터베이스**: Firebase Firestore
- **시각화 라이브러리**: Chart.js, D3.js 또는 Recharts

### 필요한 패키지 설치

```bash
# 프로젝트 루트 디렉토리에서 실행
npm install chart.js react-chartjs-2
# 또는 D3.js 사용 시
npm install d3
# 또는 Recharts 사용 시 (React 기반)
npm install recharts
```

### Firebase 데이터 접근 권한 확인

- Firestore 보안 규칙이 스코어 데이터 읽기를 허용하는지 확인
- `members`, `meetings`, `scores`, `special_awards` 컬렉션에 접근 가능한지 확인

---

## 2. 기본 구조 설정

### 페이지 및 컴포넌트 구조 생성

```
src/
├── pages/
│   └── stats.astro              # 메인 스코어 분석 페이지
├── components/
│   ├── ui/                      # 공통 UI 컴포넌트
│   │   ├── StatCard.astro       # 통계 카드 컴포넌트
│   │   ├── ChartContainer.astro # 차트 컨테이너
│   │   ├── DataTable.astro      # 데이터 테이블
│   │   ├── PlayerCard.astro     # 회원 카드
│   │   ├── FilterChip.astro     # 필터 태그
│   │   ├── TabPanel.astro       # 탭 컴포넌트
│   │   ├── ProgressBar.astro    # 진행률 바
│   │   └── ScoreBox.astro       # 스코어 박스
│   └── stats/                   # 통계 페이지 전용 컴포넌트
│       ├── FilterPanel.astro    # 필터링 패널
│       ├── StatsSummary.astro   # 요약 통계 섹션
│       ├── PlayerProgress.astro # 개인 성적 추이 섹션
│       ├── MeetingAnalysis.astro # 모임별 분석 섹션
│       ├── RankingSection.astro # 랭킹 섹션
│       ├── InsightsSection.astro # 통계 인사이트 섹션
│       ├── GenerationComparison.astro # 기수별 비교 섹션
│       ├── GenderAnalysis.astro # 성별 분석 섹션
│       └── HighlightsGallery.astro # 갤러리 및 하이라이트 섹션
└── lib/
    └── service/
        └── stats-util.js       # 통계 관련 데이터 처리 유틸리티
```

### 기본 페이지 생성

`src/pages/stats.astro` 파일을 생성하고 기본 구조 설정:

```astro
---
// stats.astro
import MainLayout from '../layouts/MainLayout.astro';
import FilterPanel from '../components/stats/FilterPanel.astro';
import StatsSummary from '../components/stats/StatsSummary.astro';
import PlayerProgress from '../components/stats/PlayerProgress.astro';
import MeetingAnalysis from '../components/stats/MeetingAnalysis.astro';
import RankingSection from '../components/stats/RankingSection.astro';
import InsightsSection from '../components/stats/InsightsSection.astro';
import GenerationComparison from '../components/stats/GenerationComparison.astro';
import GenderAnalysis from '../components/stats/GenderAnalysis.astro';
import HighlightsGallery from '../components/stats/HighlightsGallery.astro';

import { getMembers, getMeetings, getScores, getSpecialAwards } from '../lib/service/stats-util.js';

// 데이터 불러오기
const members = await getMembers();
const meetings = await getMeetings();
const scores = await getScores();
const specialAwards = await getSpecialAwards();

// URL 파라미터에서 필터 상태 가져오기
const url = new URL(Astro.request.url);
const filterName = url.searchParams.get('name') || '';
const filterGeneration = url.searchParams.get('generation') || '';
const filterGender = url.searchParams.get('gender') || '';

// 필터링된 데이터 준비
const filteredData = {
  members,
  meetings,
  scores,
  specialAwards,
  filters: {
    name: filterName,
    generation: filterGeneration,
    gender: filterGender
  }
};
---

<MainLayout title="청구회 골프 스코어 분석 (2020-2024)">
  <div class="stats-container container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-8">청구회 골프 스코어 분석 (2020-2024)</h1>
    
    <!-- 필터 패널 -->
    <FilterPanel 
      members={members} 
      currentFilters={filteredData.filters} 
      class="mb-8" 
    />
    
    <!-- 요약 통계 -->
    <StatsSummary 
      data={filteredData} 
      class="mb-12" 
    />
    
    <!-- 개인 성적 추이 섹션 -->
    <PlayerProgress 
      data={filteredData} 
      class="mb-16" 
    />
    
    <!-- 모임별 분석 -->
    <MeetingAnalysis 
      data={filteredData} 
      class="mb-16" 
    />
    
    <!-- 랭킹 섹션 -->
    <RankingSection 
      data={filteredData} 
      class="mb-16" 
    />
    
    <!-- 통계 인사이트 -->
    <InsightsSection 
      data={filteredData} 
      class="mb-16" 
    />
    
    <!-- 기수별 비교 -->
    <GenerationComparison 
      data={filteredData} 
      class="mb-16" 
    />
    
    <!-- 성별 분석 -->
    <GenderAnalysis 
      data={filteredData} 
      class="mb-16" 
    />
    
    <!-- 갤러리 & 하이라이트 -->
    <HighlightsGallery 
      data={filteredData} 
      class="mb-8" 
    />
  </div>
</MainLayout>
```

---

## 3. 공통 UI 컴포넌트 구현

필요한 UI 컴포넌트들을 `src/components/ui` 폴더에 구현합니다. 각 컴포넌트는 다양한 부분에서 재사용될 수 있습니다.

### 통계 카드 컴포넌트 (StatCard.astro)

```astro
---
// components/ui/StatCard.astro
export interface Props {
  title: string;
  value: string | number;
  icon?: string;
  change?: number; // 변화량(%)
  changeLabel?: string; // 변화 설명
  color?: 'default' | 'blue' | 'green' | 'red' | 'yellow';
}

const { 
  title, 
  value, 
  icon = "chart-bar", 
  change, 
  changeLabel = "전년 대비", 
  color = "default" 
} = Astro.props;

// 색상 변수
const colorClasses = {
  default: "bg-white",
  blue: "bg-blue-50",
  green: "bg-green-50",
  red: "bg-red-50",
  yellow: "bg-yellow-50"
};

// 아이콘 경로
const iconPath = `${import.meta.env.BASE_URL}images/icons/${icon}.svg`;
---

<div class={`stat-card p-6 rounded-lg shadow-sm ${colorClasses[color]}`}>
  <div class="flex justify-between items-start">
    <div>
      <h3 class="text-sm font-medium text-gray-500">{title}</h3>
      <p class="text-2xl font-bold mt-1">{value}</p>
      
      {change !== undefined && (
        <div class="mt-2 flex items-center">
          <span class={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
          <span class="text-xs text-gray-500 ml-1">{changeLabel}</span>
        </div>
      )}
    </div>
    
    {icon && (
      <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        <img src={iconPath} alt={title} class="w-5 h-5" />
      </div>
    )}
  </div>
</div>
```

### 차트 컨테이너 (ChartContainer.astro)

```astro
---
// components/ui/ChartContainer.astro
export interface Props {
  title: string;
  description?: string;
  fullWidth?: boolean;
  className?: string;
  id?: string;
}

const { 
  title, 
  description, 
  fullWidth = false, 
  className = "", 
  id 
} = Astro.props;
---

<div id={id} class={`chart-container bg-white rounded-lg shadow-sm p-6 ${fullWidth ? 'w-full' : ''} ${className}`}>
  <div class="mb-4">
    <h3 class="text-lg font-semibold">{title}</h3>
    {description && <p class="text-sm text-gray-500 mt-1">{description}</p>}
  </div>
  
  <div class="chart-area min-h-[300px]">
    <slot />
  </div>
</div>
```

### 데이터 테이블 (DataTable.astro)

```astro
---
// components/ui/DataTable.astro
export interface Props {
  headers: string[];
  emptyMessage?: string;
  className?: string;
  stripped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
}

const { 
  headers, 
  emptyMessage = "데이터가 없습니다", 
  className = "", 
  stripped = true,
  hoverable = true,
  compact = false
} = Astro.props;

const tableClasses = [
  'min-w-full border-collapse',
  stripped ? 'table-striped' : '',
  hoverable ? 'table-hover' : '',
  compact ? 'table-compact' : '',
  className
].join(' ');
---

<div class="overflow-x-auto">
  <table class={tableClasses}>
    <thead>
      <tr class="bg-gray-100">
        {headers.map(header => (
          <th class="border px-4 py-2 text-left">{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      <slot>
        <!-- 데이터가 없는 경우 표시할 메시지 -->
        <tr>
          <td colspan={headers.length} class="border px-4 py-6 text-center text-gray-500">
            {emptyMessage}
          </td>
        </tr>
      </slot>
    </tbody>
  </table>
</div>

<style>
  .table-striped tbody tr:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.02);
  }
  
  .table-hover tbody tr:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  .table-compact th,
  .table-compact td {
    padding: 0.5rem 0.75rem;
  }
</style>
```

나머지 UI 컴포넌트(PlayerCard, FilterChip, TabPanel, ProgressBar, ScoreBox)들도 유사한 방식으로 구현합니다.

---

## 6. 필터링 기능 구현

필터링은 사용자가 원하는 데이터만 볼 수 있도록 하는 중요한 기능입니다. URL 파라미터를 사용하여 필터 상태를 유지하고, 새로고침 후에도 필터가 유지되도록 구현합니다.

### 필터 적용 로직

```javascript
// stats.astro 파일에서
// URL 파라미터에서 필터 상태 가져오기
const url = new URL(Astro.request.url);
const filterName = url.searchParams.get('name') || '';
const filterGeneration = url.searchParams.get('generation') || '';
const filterGender = url.searchParams.get('gender') || '';

// 필터링된 데이터 준비
const filteredData = {
  members,
  meetings,
  scores,
  specialAwards,
  filters: {
    name: filterName,
    generation: filterGeneration,
    gender: filterGender
  }
};
```

### 클라이언트 측 필터 처리

```html
<script>
  // 필터 폼 제출 이벤트
  document.getElementById('filter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 폼 데이터 가져오기
    const formData = new FormData(e.target);
    const params = new URLSearchParams();
    
    // 값이 있는 필드만 URL 파라미터에 추가
    for (const [key, value] of formData.entries()) {
      if (value) {
        params.set(key, value);
      }
    }
    
    // 필터 적용된 URL로 이동
    window.location.href = `${window.location.pathname}?${params.toString()}`;
  });
  
  // 필터 초기화 버튼
  document.getElementById('reset-filter').addEventListener('click', () => {
    // URL 파라미터 제거하고 페이지 새로고침
    window.location.href = window.location.pathname;
  });
</script>
```

---

## 7. 차트 및 시각화 구현

통계 데이터 시각화를 위해 Chart.js 또는 D3.js를 활용합니다. 여기서는 Chart.js를 사용한 예시를 제공합니다.

### 선형 차트 구현 예시 (ScoreLineChart.jsx)

```jsx
// components/charts/ScoreLineChart.jsx
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const ScoreLineChart = ({ data, title = '스코어 추이' }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  
  useEffect(() => {
    // 데이터가 없는 경우 처리
    if (!data || data.length === 0) return;
    
    // 차트가 이미 있으면 제거
    if (chartInstance) {
      chartInstance.destroy();
    }
    
    // 데이터 전처리
    const memberIds = [...new Set(data.map(item => item.member_id))];
    const memberNames = [...new Set(data.map(item => item.member_name))];
    const dates = [...new Set(data.map(item => item.date))].sort();
    
    // 데이터셋 준비
    const datasets = memberIds.map((memberId, index) => {
      const memberData = data.filter(item => item.member_id === memberId);
      
      // 랜덤 색상 생성
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      
      return {
        label: memberNames[index] || `회원 ID: ${memberId}`,
        data: memberData.map(item => ({
          x: new Date(item.date),
          y: item.gross_score
        })),
        borderColor: `rgb(${r}, ${g}, ${b})`,
        backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
        tension: 0.1
      };
    });
    
    // 차트 생성
    const ctx = chartRef.current.getContext('2d');
    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'month',
              displayFormats: {
                month: 'yyyy-MM'
              }
            },
            title: {
              display: true,
              text: '날짜'
            }
          },
          y: {
            min: 60, // 골프 스코어 특성상 최소값 설정
            max: 120,
            title: {
              display: true,
              text: '스코어 (타)'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: title,
            font: {
              size: 16
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.parsed.y}타`;
              }
            }
          }
        }
      }
    });
    
    setChartInstance(newChart);
    
    // 컴포넌트 언마운트 시 차트 정리
    return () => {
      if (newChart) {
        newChart.destroy();
      }
    };
  }, [data, title]);
  
  return (
    <div className="score-chart-container" style={{ height: '400px', width: '100%' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ScoreLineChart;
```

### 바 차트 예시 (RankingChart.jsx)

```jsx
// components/charts/RankingChart.jsx
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const RankingChart = ({ data, limit = 10, title = '회원 랭킹' }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  
  useEffect(() => {
    if (!data || data.length === 0) return;
    
    if (chartInstance) {
      chartInstance.destroy();
    }
    
    // 데이터 제한 및 정렬
    const limitedData = [...data]
      .sort((a, b) => a.averageScore - b.averageScore)
      .slice(0, limit);
    
    const labels = limitedData.map(item => item.name);
    const scores = limitedData.map(item => item.averageScore);
    
    // 색상 생성 (기수별로 다른 색상)
    const generations = [...new Set(limitedData.map(item => item.generation))];
    const generationColors = {};
    
    generations.forEach((gen, index) => {
      const hue = (index * 137) % 360; // 골든 앵글로 색상 다양화
      generationColors[gen] = `hsl(${hue}, 70%, 60%)`;
    });
    
    const backgroundColors = limitedData.map(item => generationColors[item.generation]);
    
    // 차트 생성
    const ctx = chartRef.current.getContext('2d');
    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: '평균 스코어',
          data: scores,
          backgroundColor: backgroundColors,
          borderColor: 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y', // 수평 바 차트
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            min: 60, // 골프 스코어 특성상 최소값 설정
            max: 120,
            title: {
              display: true,
              text: '스코어 (타)'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: title,
            font: {
              size: 16
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const item = limitedData[context.dataIndex];
                return [
                  `평균 스코어: ${item.averageScore}타`,
                  `베스트 스코어: ${item.bestScore}타`,
                  `경기 수: ${item.gamesPlayed}회`,
                  `기수: ${item.generation}기`
                ];
              }
            }
          }
        }
      }
    });
    
    setChartInstance(newChart);
    
    return () => {
      if (newChart) {
        newChart.destroy();
      }
    };
  }, [data, limit, title]);
  
  return (
    <div className="ranking-chart-container" style={{ height: '500px', width: '100%' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default RankingChart;
```

## 4. 주요 섹션 구현

### 필터 패널 (FilterPanel.astro)

```astro
---
// components/stats/FilterPanel.astro
const { members, currentFilters } = Astro.props;

// 기수 목록 추출
const generations = [...new Set(members.map(member => member.generation))].sort();

// 성별 옵션
const genderOptions = [
  { value: '', label: '전체' },
  { value: '남성', label: '남성' },
  { value: '여성', label: '여성' }
];
---

<div class="filter-panel bg-white p-6 rounded-lg shadow-md">
  <h2 class="text-xl font-semibold mb-4">검색 필터</h2>
  
  <form id="filter-form" class="grid md:grid-cols-3 gap-4">
    <!-- 성함 검색 -->
    <div class="form-group">
      <label for="name-filter" class="block text-sm font-medium text-gray-700 mb-1">성함</label>
      <input 
        type="text" 
        id="name-filter"
        name="name"
        value={currentFilters.name} 
        placeholder="이름으로 검색" 
        class="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
    </div>
    
    <!-- 기수 선택 -->
    <div class="form-group">
      <label for="generation-filter" class="block text-sm font-medium text-gray-700 mb-1">기수</label>
      <select 
        id="generation-filter"
        name="generation" 
        class="w-full px-3 py-2 border border-gray-300 rounded-md"
      >
        <option value="">전체 기수</option>
        {generations.map(gen => (
          <option 
            value={gen} 
            selected={currentFilters.generation == gen}
          >
            {gen}기
          </option>
        ))}
      </select>
    </div>
    
    <!-- 성별 선택 -->
    <div class="form-group">
      <label class="block text-sm font-medium text-gray-700 mb-1">성별</label>
      <div class="flex space-x-4">
        {genderOptions.map(option => (
          <label class="inline-flex items-center">
            <input 
              type="radio" 
              name="gender" 
              value={option.value}
              checked={currentFilters.gender === option.value}
              class="form-radio h-4 w-4"
            />
            <span class="ml-2">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
    
    <!-- 필터 적용 버튼 -->
    <div class="col-span-full flex justify-end mt-2">
      <button 
        type="submit" 
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        필터 적용
      </button>
      <button 
        type="reset" 
        class="ml-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
        id="reset-filter"
      >
        초기화
      </button>
    </div>
  </form>
</div>

<script>
  // 필터 초기화 버튼
  document.getElementById('reset-filter').addEventListener('click', () => {
    // URL 파라미터 제거하고 페이지 새로고침
    window.location.href = window.location.pathname;
  });
</script>
```

### 요약 통계 (StatsSummary.astro)

```astro
---
// components/stats/StatsSummary.astro
import StatCard from '../ui/StatCard.astro';

const { data } = Astro.props;
const { members, scores, meetings, filters } = data;

// 데이터 계산
const totalMembers = members.length;
const totalMeetings = meetings.length;

// 필터 적용된 데이터로 평균 스코어 계산
const filteredScores = scores.filter(score => {
  const member = members.find(m => m.id === score.member_id);
  if (!member) return false;
  
  let match = true;
  if (filters.name && !member.name.includes(filters.name)) match = false;
  if (filters.generation && member.generation != filters.generation) match = false;
  if (filters.gender && member.gender !== filters.gender) match = false;
  
  return match;
});

const avgScore = filteredScores.length > 0 
  ? (filteredScores.reduce((sum, score) => sum + score.gross_score, 0) / filteredScores.length).toFixed(1)
  : 'N/A';

// 베스트 스코어 찾기
const bestScore = filteredScores.length > 0
  ? Math.min(...filteredScores.map(s => s.gross_score))
  : 'N/A';

// 전년 대비 변화율 계산 (실제로는 더 복잡한 로직이 필요)
const scoreChangeRate = -2.3; // 예시 값
---

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <StatCard 
    title="총 참가 회원" 
    value={totalMembers + "명"} 
    icon="users" 
  />
  <StatCard 
    title="평균 스코어" 
    value={avgScore + (typeof avgScore === 'string' ? '' : '타')} 
    icon="chart-line" 
    change={scoreChangeRate}
    color="green" 
  />
  <StatCard 
    title="베스트 스코어" 
    value={bestScore + (typeof bestScore === 'string' ? '' : '타')} 
    icon="trophy" 
    color="yellow"
  />
  <StatCard 
    title="모임 횟수" 
    value={totalMeetings + "회"} 
    icon="calendar" 
    color="blue" 
  />
</div>
```

다른 섹션 컴포넌트들(PlayerProgress, MeetingAnalysis, RankingSection 등)도 유사한 방식으로 구현합니다.

---

## 5. 데이터 처리 유틸리티 구현

`src/lib/service/stats-util.js` 파일을 생성하여 데이터 처리 로직을 구현합니다. 다음은 주요 데이터 처리 함수들입니다:

```javascript
// stats-util.js
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

// 모든 회원 가져오기
export async function getMembers() {
  const membersCollection = collection(db, 'members');
  const memberSnapshot = await getDocs(membersCollection);
  return memberSnapshot.docs.map(doc => doc.data());
}

// 모든 모임 가져오기
export async function getMeetings() {
  const meetingsCollection = collection(db, 'meetings');
  const meetingSnapshot = await getDocs(meetingsCollection);
  return meetingSnapshot.docs.map(doc => doc.data());
}

// 모든 스코어 가져오기
export async function getScores() {
  const scoresCollection = collection(db, 'scores');
  const scoreSnapshot = await getDocs(scoresCollection);
  return scoreSnapshot.docs.map(doc => doc.data());
}

// 모든 특별상 가져오기
export async function getSpecialAwards() {
  const awardsCollection = collection(db, 'special_awards');
  const awardSnapshot = await getDocs(awardsCollection);
  return awardSnapshot.docs.map(doc => doc.data());
}

// 필터링된 회원 가져오기
export async function getFilteredMembers(filters) {
  let membersRef = collection(db, 'members');
  let constraints = [];
  
  if (filters.generation) {
    constraints.push(where('generation', '==', parseInt(filters.generation)));
  }
  
  if (filters.gender) {
    constraints.push(where('gender', '==', filters.gender));
  }
  
  // 쿼리 적용
  let q = membersRef;
  if (constraints.length > 0) {
    q = query(membersRef, ...constraints);
  }
  
  const snapshot = await getDocs(q);
  let members = snapshot.docs.map(doc => doc.data());
  
  // 이름 필터 (클라이언트 측에서 수행)
  if (filters.name) {
    members = members.filter(member => 
      member.name.includes(filters.name)
    );
  }
  
  return members;
}

// 회원별 스코어 데이터 준비
export function getMemberScoreData(members, scores, meetings, filters) {
  // 필터에 맞는 회원 ID 목록 찾기
  const filteredMemberIds = members
    .filter(member => {
      let match = true;
      
      if (filters.name && !member.name.includes(filters.name)) {
        match = false;
      }
      
      if (filters.generation && member.generation != filters.generation) {
        match = false;
      }
      
      if (filters.gender && member.gender !== filters.gender) {
        match = false;
      }
      
      return match;
    })
    .map(member => member.id);
  
  // 모임 ID -> 날짜 매핑
  const meetingDates = {};
  meetings.forEach(meeting => {
    meetingDates[meeting.id] = meeting.date;
  });
  
  // 필터된 회원의 스코어만 가져오기
  const filteredScores = scores.filter(score => 
    filteredMemberIds.includes(score.member_id)
  );
  
  // 회원 이름 매핑
  const memberNames = {};
  members.forEach(member => {
    memberNames[member.id] = member.name;
  });
  
  // 최종 차트 데이터 준비
  return filteredScores.map(score => ({
    ...score,
    member_name: memberNames[score.member_id] || `ID: ${score.member_id}`,
    date: meetingDates[score.meeting_id] || new Date().toISOString()
  }));
}

// 기수별 평균 스코어 데이터 준비
export function getGenerationScoreData(members, scores) {
  // 기수별 회원 그룹화
  const membersByGeneration = {};
  members.forEach(member => {
    if (!membersByGeneration[member.generation]) {
      membersByGeneration[member.generation] = [];
    }
    membersByGeneration[member.generation].push(member.id);
  });
  
  // 기수별 평균 스코어 계산
  const result = [];
  for (const generation in membersByGeneration) {
    const memberIds = membersByGeneration[generation];
    const genScores = scores.filter(score => memberIds.includes(score.member_id));
    
    if (genScores.length > 0) {
      const avgScore = genScores.reduce((sum, score) => sum + score.gross_score, 0) / genScores.length;
      result.push({
        generation: parseInt(generation),
        averageScore: parseFloat(avgScore.toFixed(1)),
        memberCount: memberIds.length,
        scoreCount: genScores.length
      });
    }
  }
  
  return result.sort((a, b) => a.generation - b.generation);
}

// 성별 평균 스코어 데이터 준비
export function getGenderScoreData(members, scores) {
  const genderGroups = {
    '남성': [],
    '여성': []
  };
  
  // 성별 회원 ID 그룹화
  members.forEach(member => {
    if (genderGroups[member.gender]) {
      genderGroups[member.gender].push(member.id);
    }
  });
  
  // 성별 평균 스코어 계산
  const result = [];
  for (const gender in genderGroups) {
    const memberIds = genderGroups[gender];
    const genderScores = scores.filter(score => memberIds.includes(score.member_id));
    
    if (genderScores.length > 0) {
      const avgScore = genderScores.reduce((sum, score) => sum + score.gross_score, 0) / genderScores.length;
      result.push({
        gender,
        averageScore: parseFloat(avgScore.toFixed(1)),
        memberCount: memberIds.length,
        scoreCount: genderScores.length
      });
    }
  }
  
  return result;
}

// 연도별 모임 스코어 추이 데이터
export function getYearlyScoreData(meetings, scores) {
  // 모임 날짜별 그룹화
  const meetingsByYear = {};
  meetings.forEach(meeting => {
    const date = new Date(meeting.date);
    const year = date.getFullYear();
    
    if (!meetingsByYear[year]) {
      meetingsByYear[year] = [];
    }
    meetingsByYear[year].push(meeting.id);
  });
  
  // 연도별 평균 스코어 계산
  const result = [];
  for (const year in meetingsByYear) {
    const meetingIds = meetingsByYear[year];
    const yearScores = scores.filter(score => meetingIds.includes(score.meeting_id));
    
    if (yearScores.length > 0) {
      const avgScore = yearScores.reduce((sum, score) => sum + score.gross_score, 0) / yearScores.length;
      result.push({
        year: parseInt(year),
        averageScore: parseFloat(avgScore.toFixed(1)),
        meetingCount: meetingIds.length,
        scoreCount: yearScores.length
      });
    }
  }
  
  return result.sort((a, b) => a.year - b.year);
}

// 랭킹 데이터 생성
export function getRankingData(members, scores, meetings, limit = 10) {
  // 회원별 스코어 그룹화
  const scoresByMember = {};
  
  scores.forEach(score => {
    if (!scoresByMember[score.member_id]) {
      scoresByMember[score.member_id] = [];
    }
    scoresByMember[score.member_id].push(score.gross_score);
  });
  
  // 평균 스코어 계산 및 랭킹 생성
  const rankings = [];
  
  for (const memberId in scoresByMember) {
    const memberScores = scoresByMember[memberId];
    if (memberScores.length < 3) continue; // 최소 3회 이상 참가한 회원만 집계
    
    const avgScore = memberScores.reduce((sum, score) => sum + score, 0) / memberScores.length;
    const bestScore = Math.min(...memberScores);
    const member = members.find(m => m.id == memberId);
    
    if (member) {
      rankings.push({
        id: memberId,
        name: member.name,
        generation: member.generation,
        gender: member.gender,
        averageScore: parseFloat(avgScore.toFixed(1)),
        bestScore: bestScore,
        gamesPlayed: memberScores.length
      });
    }
  }
  
  // 평균 스코어로 정렬
  rankings.sort((a, b) => a.averageScore - b.averageScore);
  
  // 상위 N명만 반환
  return rankings.slice(0, limit);
}

// 특별상 데이터 분석
export function getSpecialAwardStats(specialAwards, members) {
  // 회원별 수상 횟수
  const awardsByMember = {};
  const awardCategories = new Set();
  
  specialAwards.forEach(award => {
    if (!awardsByMember[award.member_id]) {
      awardsByMember[award.member_id] = {};
    }
    
    const category = award.category;
    awardCategories.add(category);
    
    if (!awardsByMember[award.member_id][category]) {
      awardsByMember[award.member_id][category] = 0;
    }
    
    awardsByMember[award.member_id][category]++;
  });
  
  // 결과 데이터 구성
  const result = {
    memberAwards: [],
    categories: Array.from(awardCategories)
  };
  
  for (const memberId in awardsByMember) {
    const member = members.find(m => m.id == memberId);
    if (!member) continue;
    
    const memberData = {
      id: memberId,
      name: member.name,
      generation: member.generation,
      gender: member.gender,
      totalAwards: 0,
      categories: {}
    };
    
    // 각 카테고리별 수상 횟수 및 총합
    for (const category of awardCategories) {
      const count = awardsByMember[memberId][category] || 0;
      memberData.categories[category] = count;
      memberData.totalAwards += count;
    }
    
    result.memberAwards.push(memberData);
  }
  
  // 총 수상 횟수로 정렬
  result.memberAwards.sort((a, b) => b.totalAwards - a.totalAwards);
  
  return result;
}

// 참여율 계산
export function getParticipationRate(members, meetings, scores) {
  const result = [];
  
  members.forEach(member => {
    const memberScores = scores.filter(score => score.member_id === member.id);
    const participatedMeetings = new Set(memberScores.map(score => score.meeting_id));
    const totalMeetings = meetings.length;
    const participationRate = totalMeetings > 0 
      ? (participatedMeetings.size / totalMeetings) * 100 
      : 0;
    
    result.push({
      id: member.id,
      name: member.name,
      generation: member.generation,
      gender: member.gender,
      participatedCount: participatedMeetings.size,
      totalMeetings: totalMeetings,
      participationRate: parseFloat(participationRate.toFixed(1))
    });
  });
  
  // 참여율 내림차순 정렬
  return result.sort((a, b) => b.participationRate - a.participationRate);
}

// 성적 향상도 분석
export function getImprovedScoreData(members, scores, meetings) {
  // 날짜 정보가 있는 모임 정렬
  const sortedMeetings = [...meetings].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  // 회원별 성적 변화 분석
  const result = [];
  
  members.forEach(member => {
    // 회원의 모든 스코어 가져오기
    const memberScores = scores
      .filter(score => score.member_id === member.id)
      .map(score => {
        const meeting = meetings.find(m => m.id === score.meeting_id);
        return {
          score: score.gross_score,
          date: meeting ? new Date(meeting.date) : null,
          meetingId: score.meeting_id
        };
      })
      .filter(item => item.date !== null)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
    
    // 최소 3개 이상의 스코어가 있는 경우만 분석
    if (memberScores.length >= 3) {
      // 처음 3개와 마지막 3개 스코어의 평균 비교
      const firstThree = memberScores.slice(0, 3);
      const lastThree = memberScores.slice(-3);
      
      const firstAvg = firstThree.reduce((sum, item) => sum + item.score, 0) / firstThree.length;
      const lastAvg = lastThree.reduce((sum, item) => sum + item.score, 0) / lastThree.length;
      
      // 향상도 계산 (음수가 좋아진 것)
      const improvement = lastAvg - firstAvg;
      const improvementRate = (improvement / firstAvg) * 100;
      
      result.push({
        id: member.id,
        name: member.name,
        generation: member.generation,
        gender: member.gender,
        firstAverage: parseFloat(firstAvg.toFixed(1)),
        lastAverage: parseFloat(lastAvg.toFixed(1)),
        improvement: parseFloat(improvement.toFixed(1)),
        improvementRate: parseFloat(improvementRate.toFixed(1)),
        gamesPlayed: memberScores.length
      });
    }
  });
  
  // 향상도순으로 정렬 (음수가 가장 좋아진 순)
  return result.sort((a, b) => a.improvement - b.improvement);
}

// 모임별 데이터 분석
export function getMeetingStats(meetings, scores, members) {
  return meetings.map(meeting => {
    // 해당 모임의 모든 스코어
    const meetingScores = scores.filter(score => score.meeting_id === meeting.id);
    
    // 평균 스코어 계산
    const avgScore = meetingScores.length > 0
      ? meetingScores.reduce((sum, score) => sum + score.gross_score, 0) / meetingScores.length
      : null;
    
    // 참가자 수
    const participantCount = meetingScores.length;
    
    // 베스트 스코어 및 회원
    let bestScore = null;
    let bestScoreMemberId = null;
    
    if (meetingScores.length > 0) {
      bestScore = Math.min(...meetingScores.map(score => score.gross_score));
      const bestScoreRecord = meetingScores.find(score => score.gross_score === bestScore);
      bestScoreMemberId = bestScoreRecord ? bestScoreRecord.member_id : null;
    }
    
    // 베스트 회원 이름 찾기
    let bestScoreMemberName = null;
    if (bestScoreMemberId) {
      const member = members.find(m => m.id === bestScoreMemberId);
      bestScoreMemberName = member ? member.name : null;
    }
    
    return {
      ...meeting,
      avgScore: avgScore !== null ? parseFloat(avgScore.toFixed(1)) : null,
      participantCount,
      bestScore,
      bestScoreMemberId,
      bestScoreMemberName
    };
  });
}


