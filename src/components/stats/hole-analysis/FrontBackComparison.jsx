import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getFrontBackComparison, checkHoleScoresStatus } from '../../../lib/service/hole-stats-util.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FrontBackComparison = () => {
  const [comparisonData, setComparisonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataStatus, setDataStatus] = useState(null);

  useEffect(() => {
    loadComparisonData();
  }, []);

  const loadComparisonData = async () => {
    try {
      setLoading(true);
      console.log('🏌️ 전반/후반 비교 데이터 로딩 시작...');
      
      // 먼저 데이터 상태 확인
      const status = await checkHoleScoresStatus();
      setDataStatus(status);
      
      if (!status.hasData) {
        console.warn('⚠️ hole_scores 데이터가 없어서 전반/후반 비교를 할 수 없습니다.');
        setError('홀별 기록 데이터가 없습니다. 2025년 3월 이후 모임부터 홀별 상세 기록이 제공됩니다.');
        return;
      }
      
      const data = await getFrontBackComparison();
      
      if (data.frontNine.length === 0) {
        setError('전반/후반 비교 데이터를 불러올 수 없습니다.');
        return;
      }
      
      console.log('📊 전반/후반 비교 데이터 로딩 완료:', data.comparison);
      setComparisonData(data);
      setError(null);
      
    } catch (err) {
      console.error('❌ 전반/후반 비교 로딩 에러:', err);
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const getChartData = () => {
    if (!comparisonData || comparisonData.frontNine.length === 0) return null;

    // 날짜별로 그룹화하여 평균 계산
    const dateGroups = {};
    
    comparisonData.frontNine.forEach((record, index) => {
      const date = record.date || record.meetingId.toString();
      if (!dateGroups[date]) {
        dateGroups[date] = {
          front: [],
          back: [],
          meetingId: record.meetingId
        };
      }
      dateGroups[date].front.push(record.score);
      dateGroups[date].back.push(comparisonData.backNine[index].score);
    });

    const sortedDates = Object.keys(dateGroups).sort();
    const labels = sortedDates.map(date => {
      const meetingId = dateGroups[date].meetingId;
      return date.includes('-') ? date.slice(5) : `M${meetingId}`;
    });

    const frontAverages = sortedDates.map(date => {
      const scores = dateGroups[date].front;
      return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
    });

    const backAverages = sortedDates.map(date => {
      const scores = dateGroups[date].back;
      return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
    });

    return {
      labels,
      datasets: [
        {
          label: '전반 9홀',
          data: frontAverages,
          borderColor: 'rgba(59, 130, 246, 1)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 3,
          pointBackgroundColor: 'rgba(59, 130, 246, 1)',
          pointRadius: 6,
          pointHoverRadius: 8,
          fill: false,
        },
        {
          label: '후반 9홀',
          data: backAverages,
          borderColor: 'rgba(239, 68, 68, 1)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderWidth: 3,
          pointBackgroundColor: 'rgba(239, 68, 68, 1)',
          pointRadius: 6,
          pointHoverRadius: 8,
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
        text: '전반 9홀 vs 후반 9홀 성과 비교',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        callbacks: {
          afterLabel: function(context) {
            const comparison = comparisonData?.comparison;
            if (comparison && context.dataIndex === context.chart.data.labels.length - 1) {
              return [
                `전체 평균 차이: ${comparison.difference > 0 ? '+' : ''}${comparison.difference}`,
                `전반 우세: ${comparison.frontBetter}라운드`,
                `후반 우세: ${comparison.backBetter}라운드`
              ];
            }
            return null;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: '평균 타수'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        }
      },
      x: {
        title: {
          display: true,
          text: '모임/날짜'
        },
        grid: {
          display: false,
        }
      }
    },
    elements: {
      line: {
        tension: 0.3 // 부드러운 곡선
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">전반/후반 성과 비교</h3>
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
        <h3 className="text-lg font-semibold text-gray-800 mb-4">전반/후반 성과 비교</h3>
        <p className="text-gray-600">표시할 데이터가 없습니다.</p>
      </div>
    );
  }

  const { comparison } = comparisonData;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">전반/후반 성과 비교</h3>
        <span className="text-sm text-gray-500">
          총 {comparison.totalRounds}라운드 기준
        </span>
      </div>
      
      <div className="h-80 mb-6">
        <Line data={chartData} options={chartOptions} />
      </div>
      
      {/* 요약 통계 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="text-lg font-bold text-blue-600">
            {comparison.frontAverage}
          </div>
          <div className="text-xs text-gray-600">전반 평균</div>
        </div>
        <div className="bg-red-50 rounded-lg p-3">
          <div className="text-lg font-bold text-red-600">
            {comparison.backAverage}
          </div>
          <div className="text-xs text-gray-600">후반 평균</div>
        </div>
        <div className={`rounded-lg p-3 ${comparison.difference > 0 ? 'bg-red-50' : 'bg-green-50'}`}>
          <div className={`text-lg font-bold ${comparison.difference > 0 ? 'text-red-600' : 'text-green-600'}`}>
            {comparison.difference > 0 ? '+' : ''}{comparison.difference}
          </div>
          <div className="text-xs text-gray-600">
            {comparison.difference > 0 ? '후반이 어려움' : '후반이 쉬움'}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-lg font-bold text-gray-600">
            {comparison.frontBetter} vs {comparison.backBetter}
          </div>
          <div className="text-xs text-gray-600">전반우세 vs 후반우세</div>
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

export default FrontBackComparison;
