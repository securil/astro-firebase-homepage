import React, { useState, useEffect } from 'react';
import HoleDifficultyChart from './HoleDifficultyChart.jsx';
import FrontBackComparison from './FrontBackComparison.jsx';
import PersonalHoleRadar from './PersonalHoleRadar.jsx';
import { checkHoleScoresStatus } from '../../../lib/service/hole-stats-util.js';

const HoleStatistics = () => {
  const [dataStatus, setDataStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkDataAvailability();
  }, []);

  const checkDataAvailability = async () => {
    try {
      console.log('🔍 홀별 통계 메인 컴포넌트 초기화...');
      const status = await checkHoleScoresStatus();
      setDataStatus(status);
      
      console.log('📊 홀별 데이터 상태 확인 완료:', {
        exists: status.exists,
        hasData: status.hasData,
        totalRecords: status.totalRecords,
        structureValid: status.dataStructureValid
      });
      
    } catch (error) {
      console.error('❌ 홀별 데이터 상태 확인 에러:', error);
      setDataStatus({
        exists: false,
        hasData: false,
        totalRecords: 0,
        dataStructureValid: false,
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="space-y-4">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 섹션 헤더 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">홀별 상세 분석</h2>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              데이터 상태: {dataStatus?.hasData ? 
                <span className="text-green-600 font-semibold">✅ 사용 가능</span> : 
                <span className="text-yellow-600 font-semibold">⚠️ 제한적</span>
              }
            </div>
            {dataStatus?.hasData && (
              <div className="text-sm text-gray-500">
                총 {dataStatus.totalRecords}개 기록
              </div>
            )}
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">
          2025년 3월부터 수집된 홀별 상세 기록을 바탕으로 한 심화 분석입니다.
          각 홀의 난이도, 개인별 강점/약점, 전반/후반 성과 비교 등을 확인할 수 있습니다.
        </p>

        {!dataStatus?.hasData && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-blue-800 mb-1">홀별 데이터 수집 시작</h4>
                <p className="text-sm text-blue-700">
                  2025년 3월부터 홀별 상세 기록 수집이 시작되었습니다. 
                  향후 모임에서 더 상세한 분석이 가능해집니다.
                </p>
                {dataStatus && (
                  <div className="mt-2 text-xs text-blue-600">
                    <p>컬렉션 존재: {dataStatus.exists ? '✅' : '❌'}</p>
                    <p>현재 데이터 수: {dataStatus.totalRecords}개</p>
                    <p>구조 유효성: {dataStatus.dataStructureValid ? '✅' : '❌'}</p>
                    {dataStatus.error && <p>오류: {dataStatus.error}</p>}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 홀별 난이도 분석 */}
      <HoleDifficultyChart />

      {/* 전반/후반 성과 비교 */}
      <FrontBackComparison />

      {/* 개인별 홀 성과 레이더 차트 */}
      <PersonalHoleRadar />

      {/* 개발 정보 (디버깅용) */}
      {dataStatus && (
        <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600">
          <h4 className="font-semibold mb-2">🔧 개발 정보</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <span className="font-medium">컬렉션 존재:</span>
              <span className="ml-1">{dataStatus.exists ? '✅' : '❌'}</span>
            </div>
            <div>
              <span className="font-medium">데이터 보유:</span>
              <span className="ml-1">{dataStatus.hasData ? '✅' : '❌'}</span>
            </div>
            <div>
              <span className="font-medium">기록 수:</span>
              <span className="ml-1">{dataStatus.totalRecords}개</span>
            </div>
            <div>
              <span className="font-medium">구조 유효:</span>
              <span className="ml-1">{dataStatus.dataStructureValid ? '✅' : '❌'}</span>
            </div>
          </div>
          {dataStatus.sampleRecord && (
            <div className="mt-2">
              <span className="font-medium">샘플 기록:</span>
              <code className="ml-2 text-xs bg-gray-200 px-1 rounded">
                meetingId: {dataStatus.sampleRecord.meetingId}, 
                holes: {dataStatus.sampleRecord.holes?.length || 0}개
              </code>
            </div>
          )}
          {dataStatus.error && (
            <div className="mt-2 text-red-600">
              <span className="font-medium">오류:</span>
              <span className="ml-1">{dataStatus.error}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HoleStatistics;
