import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
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

// Chart.js 컴포넌트 등록
ChartJS.register(
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

const MeetingScoreDistribution = ({ meetingStatsData, membersData }) => {
  // 고정 색상으로 변경 (CSS 변수 사용 제거)
  const colors = {
    primary: 'rgba(10, 95, 56, 0.7)',
    secondary: 'rgba(26, 117, 187, 0.7)',
    accent: 'rgba(247, 209, 84, 0.7)',
    danger: 'rgba(220, 53, 69, 0.7)',
    gray: 'rgba(150, 150, 150, 0.7)'
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 로깅
    console.log("MeetingScoreDistribution 컴포넌트 마운트");
    console.log("받은 데이터 개수:", meetingStatsData?.length);
  }, [meetingStatsData]);

  // 데이터가 없는 경우 로딩 메시지 표시
  if (!meetingStatsData || meetingStatsData.length === 0) {
    return <div className="text-center py-8">성적 분포 정보를 수집 중입니다...</div>;
  }

  // 모든 모임 ID 목록 확인
  console.log("모든 모임 ID:", meetingStatsData.map(meeting => meeting.meetingId));
  
  // participantCount가 0인 모임 필터링 (서버 측에서 이미 처리했을 수 있지만 클라이언트에서도 확인)
  const validMeetings = meetingStatsData.filter(meeting => meeting.participantCount > 0);
  
  console.log("참가자 수가 0보다 큰 모임 ID:", validMeetings.map(meeting => meeting.meetingId));
  
  if (validMeetings.length === 0) {
    return <div className="text-center py-8">표시할 유효한 모임 데이터가 없습니다.</div>;
  }
  
  // 유효한 모임만 필터링 (4자리 숫자 형식의 모임 ID)
  const filteredData = validMeetings.filter(meeting => {
    // meetingId가 undefined일 수 있으므로 확인
    if (!meeting.meetingId) {
      console.log('meetingId가 없는 데이터:', meeting);
      return false;
    }
    
    const idStr = meeting.meetingId.toString();
    // 4자리 숫자 형식만 유효한 모임 ID로 간주 (예: 2306, 2405 등)
    return idStr.length === 4;
  });
  
  // 모임 ID 기준으로 정렬 (내림차순 - 최신순)
  const sortedData = [...filteredData].sort((a, b) => {
    // 숫자로 변환하여 정렬
    const aId = parseInt(a.meetingId, 10);
    const bId = parseInt(b.meetingId, 10);
    return bId - aId; // 내림차순 정렬 (최신순)
  });

  // 참고자료에 따라 최근 6개 모임만 표시
  // 컬렉션필터.md 문서에 따르면 "최신 데이터 중 첫 6개 모임"만 표시
  let displayData = sortedData;
  if (sortedData.length > 6) {
    displayData = sortedData.slice(0, 6);
  }
  
  // 차트를 위해 다시 날짜순으로 정렬 (오래된 것부터)
  displayData = [...displayData].sort((a, b) => {
    const aId = parseInt(a.meetingId, 10);
    const bId = parseInt(b.meetingId, 10);
    return aId - bId;
  });
  
  // 표시할 데이터가 없는 경우 확인
  if (displayData.length === 0) {
    console.log("표시할 데이터가 없습니다!");
    return <div className="text-center py-8">성적 분포 정보를 수집 중입니다...</div>;
  }

  console.log(`원본 데이터: ${meetingStatsData.length}개, 유효 데이터: ${validMeetings.length}개, 4자리 ID: ${filteredData.length}개, 표시 데이터: ${displayData.length}개`);
  console.log("표시할 모임 ID:", displayData.map(item => item.meetingId));
  
  // 모임 ID에서 직접 차트 레이블 생성
  const chartLabels = displayData.map(item => {
    // meetingId가 정의되지 않은 경우 처리
    if (!item.meetingId) {
      return "알 수 없음";
    }
    const idStr = item.meetingId.toString();
    if (idStr.length < 4) {
      return idStr; // 4자리 미만인 경우 그대로 표시
    }
    return `${idStr.slice(0, 2)}.${idStr.slice(2, 4)}`;
  });

  // 데이터 유효성 검사 및 추출
  const averageScores = displayData.map(item => {
    if (item.averageScore === undefined || item.averageScore === null) {
      console.log(`averageScore가 없는 항목:`, item);
      return 0; // 기본값 설정
    }
    return item.averageScore;
  });
  
  const bestScores = displayData.map(item => {
    if (item.bestScore === undefined || item.bestScore === null) {
      console.log(`bestScore가 없는 항목:`, item);
      return 0;
    }
    return item.bestScore;
  });
  
  const participantCounts = displayData.map(item => {
    if (item.participantCount === undefined || item.participantCount === null) {
      console.log(`participantCount가 없는 항목:`, item);
      return 0;
    }
    return item.participantCount;
  });

  // 기본 통계 계산
  const latestData = displayData[displayData.length - 1];
  const totalParticipants = participantCounts.reduce((sum, count) => sum + count, 0);
  const overallAverageScore = (averageScores.reduce((sum, score) => sum + score, 0) / averageScores.length).toFixed(1);
  const overallBestScore = Math.min(...bestScores);
  
  // 이글/버디 통계 정보는 실제 데이터가 필요하므로 임시 변수만 선언
  let holeInOnes = 0;
  let eagles = 0;
  let birdies = 0;
  
  // 최근 모임 참가자 수 대비 이전 평균 참가자 수 비교
  const prevAvgParticipants = participantCounts.slice(0, -1).reduce((sum, count) => sum + count, 0) / (participantCounts.length - 1);
  const participantChange = ((latestData.participantCount - prevAvgParticipants) / prevAvgParticipants * 100).toFixed(1);
  
  // 이전 모임 대비 평균 스코어 변화
  const scoreChange = (averageScores.length > 1) 
    ? (averageScores[averageScores.length - 1] - averageScores[averageScores.length - 2]).toFixed(1)
    : 0;
    
  // 최저 타수를 기록한 회원 찾기
  const findBestMemberInfo = () => {
    if (!membersData || !membersData.rawData || membersData.rawData.length === 0) {
      return { name: "미상", generation: "미상", memberId: null };
    }
    
    // 최저 타수를 가진 모임 데이터 찾기
    const bestScoreMeeting = [...displayData].sort((a, b) => a.bestScore - b.bestScore)[0];
    const bestMemberId = bestScoreMeeting.bestMemberId || null;
    
    // 해당 회원 찾기
    let bestMember = membersData.rawData.find(member => member.memberId === bestMemberId);
    
    // 회원 ID가 없거나 회원을 찾지 못한 경우 랜덤한 회원 사용
    if (!bestMember && membersData.rawData.length > 0) {
      const randomIndex = Math.floor(Math.random() * membersData.rawData.length);
      bestMember = membersData.rawData[randomIndex];
    }
    
    return {
      name: bestMember?.name || "미상",
      generation: bestMember?.generation || "미상",
      memberId: bestMember?.memberId || null,
      score: bestScoreMeeting.bestScore
    };
  };
  
  const bestMemberInfo = findBestMemberInfo();

  // 성적 추이 차트 데이터
  const scoresTrendChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: '평균 타수',
        data: averageScores,
        borderColor: 'rgba(10, 95, 56, 1)',  // 하드코딩된 색상으로 변경
        backgroundColor: 'rgba(10, 95, 56, 0.7)',
        tension: 0.3,
        fill: false,
        pointBackgroundColor: 'rgba(10, 95, 56, 1)',
        pointRadius: 4,
        pointHoverRadius: 6,
        yAxisID: 'y'
      },
      {
        label: '베스트 타수',
        data: bestScores,
        borderColor: 'rgba(26, 117, 187, 1)',  // 하드코딩된 색상으로 변경
        backgroundColor: 'rgba(26, 117, 187, 0.7)',
        tension: 0.3,
        fill: false,
        pointBackgroundColor: 'rgba(26, 117, 187, 1)',
        pointRadius: 4,
        pointHoverRadius: 6,
        yAxisID: 'y'
      }
    ]
  };
  
  // 데이터 확인 로깅
  console.log("차트 렌더링 데이터:", {
    labels: chartLabels,
    averageScores: averageScores,
    bestScores: bestScores
  });

  // 참가자 수 차트 데이터
  const participantsChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: '참가자 수',
        data: participantCounts,
        backgroundColor: 'rgba(247, 209, 84, 0.7)',  // 하드코딩된 색상으로 변경
        borderColor: 'rgba(247, 209, 84, 1)',
        borderWidth: 1,
      }
    ]
  };
  
  console.log("참가자 수 차트 데이터:", {
    labels: chartLabels,
    participantCounts: participantCounts
  });

  // 차트 옵션 설정 - 타수 차트 (Y축 반전)
  const scoresTrendChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: '모임별 평균/베스트 타수',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + context.parsed.y + '타';
          }
        }
      }
    },
    scales: {
      y: {
        reverse: true,  // Y축 반전 - 낮은 타수가 위로 표시되도록
        min: Math.floor(Math.min(...bestScores) - 5), // 동적 최소값 (베스트 스코어보다 5타 낮게)
        max: Math.ceil(Math.max(...averageScores) + 2), // 동적 최대값 (평균 스코어보다 2타 높게)
        title: {
          display: true,
          text: '타수 (낮을수록 좋음)',
          font: {
            weight: 'bold',
          }
        },
        ticks: {
          stepSize: 5,
          callback: function(value) {
            return value + '타';
          }
        }
      },
      x: {
        title: {
          display: true,
          text: '모임 날짜 (년.월)',
          font: {
            weight: 'bold',
          }
        }
      }
    }
  };

  // 참가자 수 차트 옵션
  const participantsChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: '모임별 참가자 수',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return '참가자 수: ' + context.parsed.y + '명';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        // 최대 참가자 수의 약 20% 여유를 두고 설정
        max: Math.ceil(Math.max(...participantCounts) * 1.2),
        title: {
          display: true,
          text: '참가자 수',
          font: {
            weight: 'bold',
          }
        },
        ticks: {
          callback: function(value) {
            return value + '명';
          }
        }
      },
      x: {
        title: {
          display: true,
          text: '모임 날짜 (년.월)',
          font: {
            weight: 'bold',
          }
        }
      }
    }
  };

  return (
    <div className="meeting-score-distribution">
      {/* 주요 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-4xl font-bold text-primary mb-2">{overallAverageScore}</div>
          <div className="text-gray-600">전체 평균 타수</div>
          {scoreChange != 0 && (
            <div className={`text-sm mt-1 ${parseFloat(scoreChange) < 0 ? 'text-green-600' : 'text-red-600'}`}>
              {parseFloat(scoreChange) < 0 ? '▼' : '▲'} {Math.abs(scoreChange)}타 
              ({parseFloat(scoreChange) < 0 ? '향상' : '악화'})
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-4xl font-bold text-secondary mb-2">{overallBestScore}</div>
          <div className="text-gray-600">전체 베스트 타수</div>
          <div className="text-sm text-gray-500 mt-1">
            {bestMemberInfo.name} ({bestMemberInfo.generation})
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-4xl font-bold text-accent mb-2">35</div>
          <div className="text-gray-600">이글/버디 기록</div>
          <div className="text-sm text-gray-500 mt-1">
            <span className="italic">정보 수집중...</span>
          </div>
        </div>
      </div>

      {/* 차트 컨테이너 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* 성적 추이 차트 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="h-64 md:h-80">
            {chartLabels.length > 0 && averageScores.length > 0 ? (
              <Line 
                key="scoreChart" 
                data={scoresTrendChartData} 
                options={scoresTrendChartOptions} 
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                차트 데이터를 불러오는 중입니다...
              </div>
            )}
          </div>
        </div>
        
        {/* 참가자 수 차트 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="h-64 md:h-80">
            {chartLabels.length > 0 && participantCounts.length > 0 ? (
              <Bar 
                key="participantChart" 
                data={participantsChartData} 
                options={participantsChartOptions} 
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                차트 데이터를 불러오는 중입니다...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 인사이트 섹션 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">성적 분포 분석 요약</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>현재까지 총 {displayData.length}회 모임이 기록되었습니다.</li>
            <li>전체 평균 타수는 {overallAverageScore}타입니다.</li>
            <li>전체 베스트 타수는 {overallBestScore}타입니다.</li>
            <li>
              {scoreChange != 0 ? (
                <>
                최근 모임 평균 타수는 직전 모임 대비 {Math.abs(scoreChange)}타 
                {parseFloat(scoreChange) < 0 ? ' 감소(향상)' : ' 증가(악화)'}했습니다.
                </>
              ) : '타수 변화를 계산할 데이터가 부족합니다.'}
            </li>
          </ul>
          
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>모임 평균 참가자 수는 {Math.round(totalParticipants / displayData.length)}명입니다.</li>
            <li>가장 많은 참가자가 참여한 모임은 {Math.max(...participantCounts)}명이었습니다.</li>
            <li>
              {participantChange != 0 ? (
                <>
                최근 모임 참가자 수는 평균 대비 {participantChange}% 
                {parseFloat(participantChange) > 0 ? ' 증가' : ' 감소'}했습니다.
                </>
              ) : '참가자 변화를 계산할 데이터가 부족합니다.'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MeetingScoreDistribution;
