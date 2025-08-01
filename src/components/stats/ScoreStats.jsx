import React, { useEffect, useState } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { getYearlyBestScoresFromCollection } from '../../lib/service/stats-util';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ScoreStats = ({ scoresData, meetingStatsData }) => {
  const [yearlyBestScores, setYearlyBestScores] = useState([]);
  const [isLoadingYearlyBest, setIsLoadingYearlyBest] = useState(true);

  useEffect(() => {
    loadYearlyBestScores();
  }, []);

  const loadYearlyBestScores = async () => {
    try {
      console.log('연도별 베스트 스코어 조회 시작...');
      setIsLoadingYearlyBest(true);
      
      const yearlyBestData = await getYearlyBestScoresFromCollection();
      setYearlyBestScores(yearlyBestData);
      console.log('연도별 베스트 스코어 조회 완료:', yearlyBestData);
    } catch (error) {
      console.error('연도별 베스트 스코어 조회 실패:', error);
      setYearlyBestScores([]);
    } finally {
      setIsLoadingYearlyBest(false);
    }
  };

  // 최근 6개 모임 데이터를 가져오는 공통 함수
  const getRecentMeetings = () => {
    const filtered = meetingStatsData?.filter(m =>
      m.participantCount > 0 &&
      m.averageScore !== undefined && 
      m.averageScore !== null &&
      m.date
    ) || [];

    return filtered
      .sort((a, b) => {
        if (a.date && b.date) {
          return new Date(b.date) - new Date(a.date);
        }
        return b.meetingId - a.meetingId;
      })
      .slice(0, 6)
      .sort((a, b) => {
        if (a.date && b.date) {
          return new Date(a.date) - new Date(b.date);
        }
        return a.meetingId - b.meetingId;
      });
  };

  // 최근 모임별 평균 타수 차트 데이터
  const getRecentMeetingsChartData = () => {
    const recentMeetings = getRecentMeetings();
    const labels = recentMeetings.map(m => {
      if (m.date) {
        const date = new Date(m.date);
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${year}.${month}`;
      }
      return `모임${m.meetingId}`;
    });

    return {
      labels,
      datasets: [{
        label: '평균 타수',
        data: recentMeetings.map(m => m.averageScore),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
      }]
    };
  };

  if (!scoresData?.monthlyAverages || scoresData.monthlyAverages.length === 0) {
    return <div className="text-center py-8">월별 성적 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className="score-stats space-y-8">
      <h2 className="text-2xl font-bold text-center">통계 대시보드</h2>
      
      {/* 간단한 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">총 회원 수</h3>
          <p className="text-3xl font-bold text-blue-600">
            {scoresData?.totalMembers || 0}명
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">총 모임 수</h3>
          <p className="text-3xl font-bold text-green-600">
            {meetingStatsData?.length || 0}회
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">평균 타수</h3>
          <p className="text-3xl font-bold text-purple-600">
            {scoresData?.overallAverage || 0}타
          </p>
        </div>
      </div>

      {/* 최근 모임 차트 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">최근 모임별 평균 타수</h3>
        <div className="h-80">
          <Bar data={getRecentMeetingsChartData()} options={{ 
            responsive: true, 
            plugins: { legend: { position: 'top' } },
            scales: {
              y: {
                title: {
                  display: true,
                  text: '타수'
                }
              }
            }
          }} />
        </div>
      </div>

      {/* 연도별 베스트 타수 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">연도별 베스트 타수</h3>
        {isLoadingYearlyBest ? (
          <div className="text-center py-4">
            <div className="text-gray-600">연도별 베스트 스코어를 불러오는 중...</div>
          </div>
        ) : yearlyBestScores.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {yearlyBestScores.map(item => (
              <div key={item.year} className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg">
                <div className="text-lg font-semibold text-gray-800">{item.year}년</div>
                <div className="text-2xl font-bold text-green-600">{item.bestScore}타</div>
                <div className="text-gray-600">{item.memberName} ({item.generation}기)</div>
                <div className="text-sm text-gray-500">{item.date}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-600">
            연도별 베스트 스코어 정보가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreStats;
