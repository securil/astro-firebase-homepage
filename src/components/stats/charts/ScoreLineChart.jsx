// ScoreLineChart.jsx
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const ScoreLineChart = ({ scoreData, colorScheme = 'schemeCategory10' }) => {
  const chartRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(800);
  
  useEffect(() => {
    // 차트 크기 결정을 위한 컨테이너 너비 측정
    if (chartRef.current) {
      const containerWidth = chartRef.current.getBoundingClientRect().width;
      setChartWidth(containerWidth);
    }
    
    // 데이터가 없는 경우 차트 그리지 않음
    if (!scoreData || scoreData.length === 0) return;
    
    // 차트 생성 로직
    // (앞서 제시한 D3 차트 코드 활용)
    
  }, [scoreData, chartWidth, colorScheme]);
  
  // 데이터가 없는 경우 메시지 표시
  if (!scoreData || scoreData.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-50 rounded-lg">
        <p className="text-gray-500">표시할 데이터가 없습니다.</p>
      </div>
    );
  }
  
  return (
    <div className="score-chart-container">
      <h3 className="chart-title text-xl font-bold mb-4">회원별 스코어 추이</h3>
      <div 
        ref={chartRef} 
        className="chart-container overflow-x-auto"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
};

export default ScoreLineChart;