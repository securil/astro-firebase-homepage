// chart-loader.js - Chart.js 라이브러리를 미리 로드하여 전역 변수로 설정
import Chart from 'chart.js/auto';

// Chart를 전역 스코프에 노출
window.Chart = Chart;

console.log('Chart.js 라이브러리가 전역 스코프에 로드되었습니다.');
