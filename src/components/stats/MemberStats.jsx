import React, { useEffect, useState } from 'react';
import { Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title } from 'chart.js';

// Chart.js 컴포넌트에 필요한 요소 등록
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  Title
);

const MemberStats = ({ membersData }) => {
  // CSS 변수에서 테마 색상 가져오기
  const [colors, setColors] = useState({
    primary: 'rgba(10, 95, 56, 0.7)',
    secondary: 'rgba(26, 117, 187, 0.7)',
    accent: 'rgba(247, 209, 84, 0.7)',
    gray: 'rgba(150, 150, 150, 0.7)'
  });

  useEffect(() => {
    // 문서에서 CSS 변수 가져오기
    const root = document.documentElement;
    const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color').trim() || '#0a5f38';
    const secondaryColor = getComputedStyle(root).getPropertyValue('--secondary-color').trim() || '#1a75bb';
    const accentColor = getComputedStyle(root).getPropertyValue('--accent-color').trim() || '#f7d154';

    // 색상 설정하기
    setColors({
      primary: `${primaryColor}b3`, // 70% 투명도
      secondary: `${secondaryColor}b3`,
      accent: `${accentColor}b3`,
      gray: 'rgba(150, 150, 150, 0.7)'
    });
  }, []);

  // 데이터가 없는 경우 로딩 메시지 표시
  if (!membersData || !membersData.rawData || membersData.rawData.length === 0) {
    return <div className="text-center py-8">데이터를 불러오는 중입니다...</div>;
  }

  // 성별 분포 차트 데이터
  const genderData = {
    labels: Object.keys(membersData.genderDistribution),
    datasets: [
      {
        data: Object.values(membersData.genderDistribution),
        backgroundColor: [
          colors.primary,  // 녹색 (--primary-color)
          colors.secondary, // 파란색 (--secondary-color)
          colors.accent,  // 노란색 (--accent-color)
          colors.gray, // 회색 (기타)
        ],
        borderColor: [
          colors.primary.replace('0.7', '1'),
          colors.secondary.replace('0.7', '1'),
          colors.accent.replace('0.7', '1'),
          colors.gray.replace('0.7', '1'),
        ],
        borderWidth: 1,
      },
    ],
  };

  // 기수별 분포 차트 데이터 (상위 10개만 표시, 나머지는 '기타'로 묶음)
  const generationEntries = Object.entries(membersData.generationDistribution)
    .map(([gen, count]) => ({ gen, count }))
    .sort((a, b) => b.count - a.count); // 회원 수 기준 내림차순 정렬
  
  let topGenerations = [];
  let othersTotal = 0;
  
  // 상위 10개 기수만 개별 표시, 나머지는 '기타'로 묶기
  if (generationEntries.length > 10) {
    topGenerations = generationEntries.slice(0, 10);
    othersTotal = generationEntries.slice(10).reduce((sum, entry) => sum + entry.count, 0);
  } else {
    topGenerations = generationEntries;
  }
  
  // 차트 데이터 라벨 및 값 구성
  const generationLabels = topGenerations.map(entry => entry.gen);
  const generationValues = topGenerations.map(entry => entry.count);
  
  // '기타' 항목이 있으면 추가
  if (othersTotal > 0) {
    generationLabels.push('기타');
    generationValues.push(othersTotal);
  }
  
  // 각각의 데이터 항목에 대해 고유한 색상 생성
  const generateUniqueColors = (count) => {
    const baseHues = [0, 25, 50, 75, 100, 140, 180, 210, 240, 270, 300, 330]; // 다양한 색상 명도
    const colorArr = [];
    const borderArr = [];
    
    for (let i = 0; i < count; i++) {
      // 기본 색상 명도 선택 (반복해서 사용)
      const hue = baseHues[i % baseHues.length];
      // 채도와 밝기는 항목마다 약간씩 변화
      const saturation = 65 + (i % 3) * 10; // 65-85% 범위
      const lightness = 50 + (i % 5) * 5; // 50-70% 범위
      
      // HSL 색상 생성
      colorArr.push(`hsla(${hue}, ${saturation}%, ${lightness}%, 0.7)`);
      borderArr.push(`hsl(${hue}, ${saturation}%, ${lightness - 10}%)`);
    }
    
    return { backgroundColor: colorArr, borderColor: borderArr };
  };
  
  const generationColors = generateUniqueColors(generationLabels.length);
  
  const generationData = {
    labels: generationLabels,
    datasets: [
      {
        label: '회원 수',
        data: generationValues,
        backgroundColor: generationColors.backgroundColor,
        borderColor: generationColors.borderColor,
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: '성별 분포',
        font: {
          size: 16,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 15
        }
      },
      title: {
        display: true,
        text: '기수별 회원 분포',
        font: {
          size: 16,
        },
      },
    },
    cutout: '60%', // 도넛 차트 중앙 구멍 크기
  };

  // 가장 회원이 많은 기수 찾기
  const topGeneration = generationEntries.length > 0 
    ? generationEntries[0].gen 
    : '없음';

  return (
    <div className="member-stats">
      {/* 기본 통계 정보 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-4xl font-bold text-primary mb-2">{membersData.totalMembers}</div>
          <div className="text-gray-600">총 회원 수</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-4xl font-bold text-secondary mb-2">
            {membersData.genderDistribution['남성'] || 0}
          </div>
          <div className="text-gray-600">남성 회원</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-4xl font-bold text-accent mb-2">
            {membersData.genderDistribution['여성'] || 0}
          </div>
          <div className="text-gray-600">여성 회원</div>
        </div>
      </div>

      {/* 차트 컨테이너 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="h-64 md:h-80">
            <Pie data={genderData} options={pieOptions} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="h-64 md:h-80">
            <Doughnut data={generationData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* 인사이트 섹션 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">통계 요약</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>총 {membersData.totalMembers}명의 회원이 있습니다.</li>
          <li>성별 비율: 남성 {Math.round((membersData.genderDistribution['남성'] || 0) / membersData.totalMembers * 100)}%, 여성 {Math.round((membersData.genderDistribution['여성'] || 0) / membersData.totalMembers * 100)}%</li>
          <li>가장 회원이 많은 기수: {topGeneration} ({membersData.generationDistribution[topGeneration] || 0}명)</li>
          <li>총 {Object.keys(membersData.generationDistribution).length}개 기수가 활동 중입니다.</li>
        </ul>
      </div>
    </div>
  );
};

export default MemberStats;
