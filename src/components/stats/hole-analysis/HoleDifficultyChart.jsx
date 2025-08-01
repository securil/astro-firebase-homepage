import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getHoleStatistics, checkHoleScoresStatus } from '../../../lib/service/hole-stats-util.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HoleDifficultyChart = () => {
  const [holeStats, setHoleStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataStatus, setDataStatus] = useState(null);

  useEffect(() => {
    loadHoleStatistics();
  }, []);

  const loadHoleStatistics = async () => {
    try {
      setLoading(true);
      console.log('🏌️ 홀별 난이도 차트 데이터 로딩 시작...');
      
      // 먼저 데이터 상태 확인
      const status = await checkHoleScoresStatus();
      setDataStatus(status);
      
      if (!status.hasData) {
        console.warn('⚠️ hole_scores 데이터가 없어서 차트를 표시할 수 없습니다.');
        setError('홀별 기록 데이터가 없습니다. 2025년 3월 이후 모임부터 홀별 상세 기록이 제공됩니다.');
        return;
      }
      
      const statistics = await getHoleStatistics();
      
      if (statistics.length === 0) {
        setError('홀별 통계 데이터를 불러올 수 없습니다.');
        return;
      }
      
      console.log('📊 홀별 통계 데이터 로딩 완료:', statistics.length, '홀');
      setHoleStats(statistics);
      setError(null);
      
    } catch (err) {
      console.error('❌ 홀별 통계 로딩 에러:', err);
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const getChartData = () => {
    if (holeStats.length === 0) return null;

    // 난이도에 따른 색상 결정
    const getBarColor = (difficulty) => {
      const diff = parseFloat(difficulty);
      if (diff <= -0.5) return 'rgba(59, 130, 246, 0.8)'; // 쉬움 - 파란색
      if (diff <= 0) return 'rgba(34, 197, 94, 0.8)'; // 보통 - 초록색
      if (diff <= 0.5) return 'rgba(251, 191, 36, 0.8)'; // 어려움 - 노란색
      return 'rgba(239, 68, 68, 0.8)'; // 매우 어려움 - 빨간색
    };

    const labels = holeStats.map(hole => `${hole.hole}홀`);
    const averageScores = holeStats.map(hole => parseFloat(hole.averageScore));
    const pars = holeStats.map(hole => hole.par);
    const colors = holeStats.map(hole => getBarColor(hole.difficulty));

    return {
      labels,
      datasets: [
        {
          label: '평균 타수',
          data: averageScores,
          backgroundColor: colors,
          borderColor: colors.map(color => color.replace('0.8', '1')),
          borderWidth: 1,
        },
        {
          label: '파',
          data: pars,
          type: 'line',
          borderColor: 'rgba(156, 163, 175, 1)',
          backgroundColor: 'rgba(156, 163, 175, 0.1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(156, 163, 175, 1)',
          pointRadius: 4,
          fill: false,
        }
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '홀별 난이도 분석',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        callbacks: {
          afterLabel: function(context) {
            const holeIndex = context.dataIndex;
            const holeData = holeStats[holeIndex];
            if (context.datasetIndex === 0 && holeData) {
              return [
                `파: ${holeData.par}`,
                `난이도: ${holeData.difficulty > 0 ? '+' : ''}${holeData.difficulty}`,
                `라운드 수: ${holeData.totalRounds}`,
                `페어웨이 적중률: ${holeData.fairwayHitRate}%`,
                `그린 적중률: ${holeData.greenInRegulationRate}%`
              ];
            }
            return null;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(...(holeStats.map(h => parseFloat(h.averageScore)))) + 1,
        title: {
          display: true,
          text: '타수'
        }
      },
      x: {
        title: {
          display: true,
          text: '홀 번호'
        }
      }
    },
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">홀별 난이도 분석</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-800">{error}</p>
              {dataStatus && (
                <div className="mt-2 text-xs text-yellow-700">
                  <p>컬렉션 상태: {dataStatus.exists ? '존재함' : '없음'}</p>
                  <p>데이터 개수: {dataStatus.totalRecords}개</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const chartData = getChartData();
  if (!chartData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">홀별 난이도 분석</h3>
        <p className="text-gray-600">표시할 데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">홀별 난이도 분석</h3>
        <span className="text-sm text-gray-500">
          총 {holeStats[0]?.totalRounds || 0}라운드 기준
        </span>
      </div>
      
      <div className="h-96 mb-4">
        <Bar data={chartData} options={chartOptions} />
      </div>
      
      <div className="flex flex-wrap gap-4 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
          <span>쉬움 (-0.5 이하)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
          <span>보통 (0 이하)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
          <span>어려움 (+0.5 이하)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
          <span>매우 어려움 (+0.5 초과)</span>
        </div>
      </div>
      
      {dataStatus && dataStatus.hasData && (
        <div className="mt-4 text-xs text-gray-500 border-t pt-4">
          <p>데이터 소스: hole_scores 컬렉션 ({dataStatus.totalRecords}개 기록)</p>
          <p>구조 유효성: {dataStatus.dataStructureValid ? '✅' : '❌'}</p>
        </div>
      )}
    </div>
  );
};

export default HoleDifficultyChart;
