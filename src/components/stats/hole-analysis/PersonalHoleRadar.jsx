import React, { useState, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { getMemberHolePerformance, checkHoleScoresStatus } from '../../../lib/service/hole-stats-util.js';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebase.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const PersonalHoleRadar = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [memberPerformance, setMemberPerformance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataStatus, setDataStatus] = useState(null);

  useEffect(() => {
    loadMembers();
    checkDataStatus();
  }, []);

  const checkDataStatus = async () => {
    const status = await checkHoleScoresStatus();
    setDataStatus(status);
  };

  const loadMembers = async () => {
    try {
      console.log('👥 회원 목록 로딩 시작...');
      const membersRef = collection(db, 'members');
      const querySnapshot = await getDocs(membersRef);
      
      const membersList = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        membersList.push({
          id: data.memberId || doc.id,
          name: data.name,
          generation: data.generation
        });
      });
      
      membersList.sort((a, b) => a.name.localeCompare(b.name));
      console.log('👥 회원 목록 로딩 완료:', membersList.length, '명');
      setMembers(membersList);
      
    } catch (err) {
      console.error('❌ 회원 목록 로딩 에러:', err);
    }
  };

  const handleMemberSelect = async (memberId) => {
    if (!memberId) {
      setSelectedMember('');
      setMemberPerformance(null);
      return;
    }

    try {
      setLoading(true);
      setSelectedMember(memberId);
      console.log(`🔍 회원 ${memberId} 성과 분석 시작...`);
      
      if (!dataStatus?.hasData) {
        setError('홀별 기록 데이터가 없습니다. 2025년 3월 이후 모임부터 홀별 상세 기록이 제공됩니다.');
        return;
      }
      
      const performance = await getMemberHolePerformance(parseInt(memberId));
      
      if (performance.holePerformance.length === 0) {
        setError(`선택한 회원의 홀별 기록이 없습니다. (회원 ID: ${memberId})`);
        setMemberPerformance(null);
        return;
      }
      
      console.log(`📊 회원 ${memberId} 성과 분석 완료:`, performance.totalRounds, '라운드');
      setMemberPerformance(performance);
      setError(null);
      
    } catch (err) {
      console.error(`❌ 회원 ${memberId} 성과 분석 에러:`, err);
      setError('회원 성과 데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const getRadarData = () => {
    if (!memberPerformance || memberPerformance.holePerformance.length === 0) {
      return null;
    }

    const holeData = memberPerformance.holePerformance;
    
    // 18홀이 모두 있는지 확인하고, 없는 홀은 0으로 채움
    const completeHoleData = Array.from({ length: 18 }, (_, index) => {
      const holeNum = index + 1;
      const existingHole = holeData.find(h => h.hole === holeNum);
      return existingHole || {
        hole: holeNum,
        par: 4, // 기본값
        averageScore: 0,
        parDifference: 0,
        roundsPlayed: 0
      };
    });

    const labels = completeHoleData.map(hole => `${hole.hole}홀`);
    
    // 파 대비 성과를 역전시켜서 좋은 성과일수록 바깥쪽에 표시
    // -2 (이글) -> 5, -1 (버디) -> 4, 0 (파) -> 3, +1 (보기) -> 2, +2 (더블보기) -> 1, +3이상 -> 0
    const performanceScores = completeHoleData.map(hole => {
      const diff = hole.parDifference;
      if (diff <= -2) return 5; // 이글 이상
      if (diff <= -1) return 4; // 버디
      if (diff <= 0) return 3;  // 파
      if (diff <= 1) return 2;  // 보기
      if (diff <= 2) return 1;  // 더블보기
      return 0; // 트리플보기 이상
    });

    return {
      labels,
      datasets: [
        {
          label: '홀별 성과',
          data: performanceScores,
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(59, 130, 246, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
          pointRadius: 4,
          pointHoverRadius: 6,
        }
      ],
    };
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const holeIndex = context.dataIndex;
            const holeData = memberPerformance?.holePerformance.find(h => h.hole === holeIndex + 1);
            if (holeData) {
              return [
                `${holeData.hole}홀 (Par ${holeData.par})`,
                `평균: ${holeData.averageScore}타`,
                `파 대비: ${holeData.parDifference > 0 ? '+' : ''}${holeData.parDifference}`,
                `라운드: ${holeData.roundsPlayed}회`,
                `베스트: ${holeData.bestScore}타`
              ];
            }
            return `${context.dataIndex + 1}홀: 기록 없음`;
          }
        }
      }
    },
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        pointLabels: {
          font: {
            size: 10
          }
        },
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
          display: true,
          callback: function(value) {
            const labels = ['3+보기', '더블보기', '보기', '파', '버디', '이글+'];
            return labels[value] || '';
          }
        }
      }
    },
  };

  const selectedMemberInfo = members.find(m => m.id.toString() === selectedMember);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">개인별 홀 성과 분석</h3>
        
        <div className="mb-4">
          <label htmlFor="member-select" className="block text-sm font-medium text-gray-700 mb-2">
            회원 선택
          </label>
          <select
            id="member-select"
            value={selectedMember}
            onChange={(e) => handleMemberSelect(e.target.value)}
            className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">회원을 선택하세요</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name} ({member.generation})
              </option>
            ))}
          </select>
        </div>

        {!dataStatus?.hasData && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-800">
                  홀별 기록 데이터가 없습니다. 2025년 3월 이후 모임부터 홀별 상세 기록이 제공됩니다.
                </p>
                {dataStatus && (
                  <div className="mt-2 text-xs text-yellow-700">
                    <p>컬렉션 상태: {dataStatus.exists ? '존재함' : '없음'}</p>
                    <p>데이터 개수: {dataStatus.totalRecords}개</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">분석 중...</span>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {memberPerformance && !loading && !error && (
        <div>
          <div className="mb-4 bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">
              {selectedMemberInfo?.name} ({selectedMemberInfo?.generation}) 분석 결과
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">총 라운드:</span>
                <span className="font-semibold ml-1">{memberPerformance.totalRounds}회</span>
              </div>
              <div>
                <span className="text-gray-600">기록된 홀:</span>
                <span className="font-semibold ml-1">{memberPerformance.holePerformance.length}홀</span>
              </div>
              <div>
                <span className="text-gray-600">평균 성과:</span>
                <span className="font-semibold ml-1">
                  {memberPerformance.holePerformance.length > 0 ? 
                    (memberPerformance.holePerformance.reduce((sum, h) => sum + h.parDifference, 0) / memberPerformance.holePerformance.length).toFixed(2) : 
                    '0'
                  }
                </span>
              </div>
              <div>
                <span className="text-gray-600">강점 홀:</span>
                <span className="font-semibold ml-1 text-green-600">
                  {memberPerformance.holePerformance.length > 0 ? 
                    memberPerformance.holePerformance.filter(h => h.parDifference <= 0).length : 
                    0
                  }개
                </span>
              </div>
            </div>
          </div>

          <div className="h-96 mb-4">
            {getRadarData() && <Radar data={getRadarData()} options={radarOptions} />}
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              <span>강점 홀 (파 이하)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
              <span>보통 홀 (보기)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
              <span>약점 홀 (더블보기 이상)</span>
            </div>
          </div>
        </div>
      )}

      {!selectedMember && !loading && dataStatus?.hasData && (
        <div className="text-center py-12 text-gray-500">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <p>회원을 선택하면 홀별 성과 분석을 확인할 수 있습니다.</p>
        </div>
      )}

      {dataStatus && dataStatus.hasData && (
        <div className="mt-4 text-xs text-gray-500 border-t pt-4">
          <p>데이터 소스: hole_scores 컬렉션 ({dataStatus.totalRecords}개 기록)</p>
          <p>구조 유효성: {dataStatus.dataStructureValid ? '✅' : '❌'}</p>
        </div>
      )}
    </div>
  );
};

export default PersonalHoleRadar;
