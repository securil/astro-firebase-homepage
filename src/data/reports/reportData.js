// 리포트 데이터 관리 서비스
import report202503 from './2025-03.json';
import report202505 from './2025-05.json';
import report202506 from './2025-06.json';

// 전체 리포트 데이터
export const reportData = {
  '2025-03': report202503,
  '2025-05': report202505,
  '2025-06': report202506
};

// 리포트 데이터 조회
export function getReportData(period) {
  return reportData[period] || null;
}

// 사용 가능한 기간 목록
export function getAvailablePeriods() {
  return Object.keys(reportData).sort();
}

// 타수 분포 계산 유틸리티
export function calculateScoreDistribution(scores) {
  const total = scores.length;
  const seventies = scores.filter(s => s.score >= 70 && s.score < 80).length;
  const eighties = scores.filter(s => s.score >= 80 && s.score < 90).length;
  const nineties = scores.filter(s => s.score >= 90 && s.score < 100).length;
  const hundreds = scores.filter(s => s.score >= 100).length;

  return [
    { range: '70대', count: seventies, percentage: (seventies / total * 100).toFixed(1), color: 'blue' },
    { range: '80대', count: eighties, percentage: (eighties / total * 100).toFixed(1), color: 'emerald' },
    { range: '90대', count: nineties, percentage: (nineties / total * 100).toFixed(1), color: 'yellow' },
    { range: '100대+', count: hundreds, percentage: (hundreds / total * 100).toFixed(1), color: 'red' }
  ];
}

// 기본 리포트 데이터 (fallback)
export const defaultReportData = {
  title: '데이터 준비 중',
  date: '',
  location: '',
  participants: 0,
  avgScore: 0,
  bestScore: 0,
  underPar: 0,
  eighties: 0,
  weather: '',
  temperature: '',
  gallery: [],
  awards: [],
  courseStats: [],
  scores: [],
  femaleScores: [],
  teamList: null
};
