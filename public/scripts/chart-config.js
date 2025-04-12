// Chart.js 설정 스크립트
document.addEventListener('DOMContentLoaded', function() {
  if (typeof Chart === 'undefined') {
    console.error('Chart.js 라이브러리가 로드되지 않았습니다.');
  } else {
    console.log('Chart.js 라이브러리가 성공적으로 로드되었습니다.');
    
    // Chart.js 기본 설정
    Chart.defaults.font.family = "'Pretendard', 'Noto Sans KR', sans-serif";
    Chart.defaults.font.size = 12;
    Chart.defaults.color = '#666';
    
    // 사용자 정의 플러그인 등록 (예시)
    const customPlugin = {
      id: 'customCanvasBackgroundColor',
      beforeDraw: (chart) => {
        const ctx = chart.canvas.getContext('2d');
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      }
    };
    
    // 전역 플러그인 등록
    Chart.register(customPlugin);
    
    console.log('Chart.js 설정이 완료되었습니다.');
  }
});
