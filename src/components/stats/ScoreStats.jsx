// src/components/stats/ScoreStats.jsx
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
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../../lib/firebase';

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

const ScoreStats = ({ scoresData, membersData, meetingStatsData }) => {
  const [colors, setColors] = useState({
    primary: 'rgba(10, 95, 56, 0.7)',
    secondary: 'rgba(26, 117, 187, 0.7)',
    accent: 'rgba(247, 209, 84, 0.7)',
    gray: 'rgba(150, 150, 150, 0.7)'
  });
  
  // 연도별 최저타수 및 회원 정보를 저장할 상태
  const [yearlyBestScores, setYearlyBestScores] = useState([]);
  const [isLoadingYearlyBest, setIsLoadingYearlyBest] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const primary = getComputedStyle(root).getPropertyValue('--primary-color').trim() || '#0a5f38';
    const secondary = getComputedStyle(root).getPropertyValue('--secondary-color').trim() || '#1a75bb';
    const accent = getComputedStyle(root).getPropertyValue('--accent-color').trim() || '#f7d154';
    setColors({
      primary: `${primary}b3`,
      secondary: `${secondary}b3`,
      accent: `${accent}b3`,
      gray: 'rgba(150, 150, 150, 0.7)'
    });
    
    // 연도별 최저타수 데이터 로드
    fetchYearlyBestScores();
  }, []);
  
  // 연도별 최저타수 및 회원 정보를 가져오는 함수
  const fetchYearlyBestScores = async () => {
    setIsLoadingYearlyBest(true);
    try {
      // 1. Members_Score 컬렉션에서 점수 데이터 가져오기
      const scoresRef = collection(db, 'scores');
      const scoresSnapshot = await getDocs(scoresRef);
      const allScores = scoresSnapshot.docs.map(doc => doc.data());
      
      // 연도별로 그룹화
      const scoresByYear = {};
      
      allScores.forEach(score => {
        // 필수 데이터 확인
        if (!score.gross_score || !score.meetingId || !score.memberId) return;
        
        // gross_score가 0인 경우 제외
        if (score.gross_score <= 0) return;
        
        // 모임 ID에서 연도 추출 (예: 2412 -> 2024년)
        let year;
        if (score.meetingId) {
          const idStr = String(score.meetingId);
          if (idStr.length === 4) {
            year = `20${idStr.substring(0, 2)}`;
          }
        }
        
        // 연도를 추출할 수 없는 경우 스킵
        if (!year) return;
        
        if (!scoresByYear[year]) {
          scoresByYear[year] = [];
        }
        
        scoresByYear[year].push({
          memberId: score.memberId,
          score: score.gross_score,
          meetingId: score.meetingId
        });
      });
      
      // 각 연도별 최저 타수 찾기
      const bestScoresByYear = [];
      
      for (const year in scoresByYear) {
        if (scoresByYear[year].length === 0) continue;
        
        // 해당 연도의 최저 타수 찾기
        const minScore = Math.min(...scoresByYear[year].map(item => item.score));
        
        // 해당 최저 타수를 기록한 첫 번째 회원 찾기
        const bestScoreData = scoresByYear[year].find(item => item.score === minScore);
        
        if (bestScoreData) {
          // 회원 정보 찾기
          const member = membersData?.rawData?.find(m => m.memberId === bestScoreData.memberId) || {};
          
          bestScoresByYear.push({
            year: parseInt(year),
            score: minScore,
            memberId: bestScoreData.memberId,
            name: member.name || '정보 없음',
            generation: member.generation || '정보 없음',
            meetingId: bestScoreData.meetingId
          });
        }
      }
      
      // 연도별로 정렬 (최신순)
      bestScoresByYear.sort((a, b) => b.year - a.year);
      
      setYearlyBestScores(bestScoresByYear);
    } catch (error) {
      console.error('연도별 최저타수 데이터 조회 실패:', error);
    } finally {
      setIsLoadingYearlyBest(false);
    }
  };

  if (!scoresData?.monthlyAverages || scoresData.monthlyAverages.length === 0) {
    return <div className="text-center py-8">월별 성적 정보를 불러오는 중입니다...</div>;
  }


  // 최근 6개 모임 데이터를 가져오는 공통 함수
  const getRecentMeetings = () => {
    // 유효한 미팅 데이터 필터링 (participantCount > 0인 경우만)
    const filtered = meetingStatsData?.filter(m =>
      m.participantCount > 0 &&
      m.averageScore !== undefined && 
      m.averageScore !== null &&
      m.date // 날짜 정보가 있어야 함
    ) || [];

    console.log('필터링된 미팅 데이터 수:', filtered.length);

    // date 필드 기준 내림차순 정렬 후 최근 6개 선택 (참고자료 기준)
    return filtered
      .sort((a, b) => {
        // date 필드가 있으면 date로 정렬하고, 없으면 meetingId로 정렬
        if (a.date && b.date) {
          return new Date(b.date) - new Date(a.date); // 최신 날짜 우선
        }
        return b.meetingId - a.meetingId; // 날짜가 없으면 ID로 정렬
      })
      .slice(0, 6) // 최근 6개만 선택
      .sort((a, b) => {
        // 출력을 위해 다시 오름차순으로 정렬 (오래된 순)
        if (a.date && b.date) {
          return new Date(a.date) - new Date(b.date);
        }
        return a.meetingId - b.meetingId;
      });
  };
  
  // 최근 모임 차트용 레이블 생성 함수
  const getChartLabels = (meetings) => {
    return meetings.map(m => {
      // 날짜를 사용하여 'YY.MM' 형식으로 표시
      if (m.date) {
        const [year, month] = m.date.split('-');
        return `${year.slice(2)}.${month}`;
      }
      
      // 날짜가 없으면 모임 ID에서 유추
      const idStr = m.meetingId.toString();
      if (idStr.length === 4) {
        return `${idStr.slice(0, 2)}.${idStr.slice(2, 4)}`;
      }
      
      return `모임 ${m.meetingId}`;
    });
  };

  // 최근 모임별 평균 타수 차트 데이터
  const getRecentMeetingsChartData = () => {
    const recentMeetings = getRecentMeetings();
    const labels = getChartLabels(recentMeetings);
    const averages = recentMeetings.map(m => m.averageScore);

    return {
      labels,
      datasets: [{
        label: '평균 타수',
        data: averages,
        backgroundColor: colors.secondary,
        borderColor: colors.secondary.replace('0.7', '1'),
        borderWidth: 1,
      }]
    };
  };
  
  // 최근 모임별 참석자 수 차트 데이터
  const getParticipantCountChartData = () => {
    const recentMeetings = getRecentMeetings();
    const labels = getChartLabels(recentMeetings);
    const participantCounts = recentMeetings.map(m => m.participantCount);

    return {
      labels,
      datasets: [{
        label: '참석자 수',
        data: participantCounts,
        backgroundColor: colors.accent,
        borderColor: colors.accent.replace('0.7', '1'),
        borderWidth: 1,
      }]
    };
  };

  const getRankDistributionData = () => {
    const ranks = ['독수리', '매', '학', '참새', '미분류'];
    const rankCounts = scoresData.rankDistribution || {};
    const labels = ranks.filter(rank => rankCounts[rank]);
    const values = labels.map(rank => rankCounts[rank]);

    const colorMap = {
      '독수리': 'rgba(30, 144, 255, 0.7)',
      '매': 'rgba(60, 179, 113, 0.7)',
      '학': 'rgba(255, 165, 0, 0.7)',
      '참새': 'rgba(220, 20, 60, 0.7)',
      '미분류': 'rgba(169, 169, 169, 0.7)'
    };
    const borderMap = {
      '독수리': 'rgba(30, 144, 255, 1)',
      '매': 'rgba(60, 179, 113, 1)',
      '학': 'rgba(255, 165, 0, 1)',
      '참새': 'rgba(220, 20, 60, 1)',
      '미분류': 'rgba(169, 169, 169, 1)'
    };

    return {
      labels,
      datasets: [{
        data: values,
        backgroundColor: labels.map(r => colorMap[r]),
        borderColor: labels.map(r => borderMap[r]),
        borderWidth: 1,
      }]
    };
  };

  return (
    <div className="score-stats space-y-8">
      {/* 최근 모임 차트 - 두 차트를 같은 행에 배치 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">최근 모임별 참석자 수</h3>
          <div className="h-80">
            <Bar data={getParticipantCountChartData()} options={{ 
              responsive: true, 
              plugins: { legend: { position: 'top' } },
              scales: {
                y: {
                  title: {
                    display: true,
                    text: '인원'
                  }
                }
              }
            }} />
          </div>
        </div>
      </div>
      
      {/* 연도별 최저타수 정보 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">연도별 베스트 타수</h3>
        {isLoadingYearlyBest ? (
          <div className="text-center py-4">데이터를 불러오는 중입니다...</div>
        ) : yearlyBestScores.length === 0 ? (
          <div className="text-center py-4">연도별 베스트 타수 데이터가 없습니다.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">연도</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">최저타수</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">회원명</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">기수</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {yearlyBestScores.map((item, index) => (
                  <tr key={`yearly-best-${item.year}-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.year}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.score}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.generation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">회원 등급 분포</h3>
        <div className="h-80">
          <Doughnut data={getRankDistributionData()} options={{ responsive: true, plugins: { legend: { position: 'bottom' } }, cutout: '60%' }} />
        </div>
      </div>
    </div>
  );
};

export default ScoreStats;
