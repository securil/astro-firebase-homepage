// 홀별 통계 관련 유틸리티 함수
// 2025년 3월 이후 hole_scores 컬렉션 데이터 활용

import { db } from '../firebase.js';
import { collection, query, where, orderBy, getDocs, limit } from 'firebase/firestore';

/**
 * 홀별 통계 데이터 조회 및 분석 유틸리티
 */

// 로깅 유틸리티
const logData = (functionName, data, additionalInfo = '') => {
  console.group(`🏌️ ${functionName}`);
  console.log('📊 Data:', data);
  if (additionalInfo) console.log('ℹ️ Info:', additionalInfo);
  console.log('📈 Count:', Array.isArray(data) ? data.length : 'N/A');
  console.groupEnd();
};

/**
 * hole_scores 컬렉션에서 모든 홀별 기록 조회
 * @returns {Promise<Array>} 홀별 기록 배열
 */
export async function getAllHoleScores() {
  try {
    console.log('🔍 hole_scores 컬렉션 조회 시작...');
    
    const holeScoresRef = collection(db, 'hole_scores');
    const querySnapshot = await getDocs(holeScoresRef);
    
    const holeScores = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      holeScores.push({
        id: doc.id,
        ...data
      });
    });
    
    logData('getAllHoleScores', holeScores, `${holeScores.length}개 기록 조회`);
    return holeScores;
    
  } catch (error) {
    console.error('❌ hole_scores 조회 에러:', error);
    return [];
  }
}

/**
 * 홀별 전체 통계 계산 (18홀 각각의 평균 타수)
 * @returns {Promise<Array>} 홀별 통계 배열
 */
export async function getHoleStatistics() {
  try {
    const allHoleScores = await getAllHoleScores();
    
    if (allHoleScores.length === 0) {
      console.warn('⚠️ hole_scores 데이터가 없습니다.');
      return [];
    }
    
    // 홀별 데이터 집계
    const holeStats = {};
    
    allHoleScores.forEach(record => {
      if (record.holes && Array.isArray(record.holes)) {
        record.holes.forEach(hole => {
          const holeNum = hole.hole;
          if (!holeStats[holeNum]) {
            holeStats[holeNum] = {
              hole: holeNum,
              par: hole.par,
              scores: [],
              putts: [],
              fairwayHits: [],
              greenInRegulation: []
            };
          }
          
          holeStats[holeNum].scores.push(hole.score);
          if (hole.putts) holeStats[holeNum].putts.push(hole.putts);
          if (hole.fairwayHit !== null) holeStats[holeNum].fairwayHits.push(hole.fairwayHit);
          if (hole.greenInRegulation !== null) holeStats[holeNum].greenInRegulation.push(hole.greenInRegulation);
        });
      }
    });
    
    // 통계 계산
    const statistics = Object.keys(holeStats).map(holeNum => {
      const holeData = holeStats[holeNum];
      const scores = holeData.scores;
      
      return {
        hole: parseInt(holeNum),
        par: holeData.par,
        averageScore: scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2) : 0,
        totalRounds: scores.length,
        difficulty: scores.length > 0 ? ((scores.reduce((a, b) => a + b, 0) / scores.length) - holeData.par).toFixed(2) : 0,
        averagePutts: holeData.putts.length > 0 ? (holeData.putts.reduce((a, b) => a + b, 0) / holeData.putts.length).toFixed(1) : 0,
        fairwayHitRate: holeData.fairwayHits.length > 0 ? (holeData.fairwayHits.filter(hit => hit).length / holeData.fairwayHits.length * 100).toFixed(1) : 0,
        greenInRegulationRate: holeData.greenInRegulation.length > 0 ? (holeData.greenInRegulation.filter(gir => gir).length / holeData.greenInRegulation.length * 100).toFixed(1) : 0
      };
    }).sort((a, b) => a.hole - b.hole);
    
    logData('getHoleStatistics', statistics, `18홀 통계 계산 완료`);
    return statistics;
    
  } catch (error) {
    console.error('❌ 홀별 통계 계산 에러:', error);
    return [];
  }
}

/**
 * 전반 9홀 vs 후반 9홀 성과 비교
 * @returns {Promise<Object>} 전반/후반 비교 데이터
 */
export async function getFrontBackComparison() {
  try {
    const allHoleScores = await getAllHoleScores();
    
    if (allHoleScores.length === 0) {
      console.warn('⚠️ hole_scores 데이터가 없습니다.');
      return { frontNine: [], backNine: [], comparison: {} };
    }
    
    const frontNineData = [];
    const backNineData = [];
    
    allHoleScores.forEach(record => {
      if (record.summary) {
        frontNineData.push({
          meetingId: record.meetingId,
          memberId: record.memberId,
          score: record.summary.frontNine,
          date: record.recordDate
        });
        
        backNineData.push({
          meetingId: record.meetingId,
          memberId: record.memberId,
          score: record.summary.backNine,
          date: record.recordDate
        });
      }
    });
    
    const frontAvg = frontNineData.length > 0 ? 
      (frontNineData.reduce((sum, item) => sum + item.score, 0) / frontNineData.length).toFixed(2) : 0;
    
    const backAvg = backNineData.length > 0 ? 
      (backNineData.reduce((sum, item) => sum + item.score, 0) / backNineData.length).toFixed(2) : 0;
    
    const comparison = {
      frontAverage: parseFloat(frontAvg),
      backAverage: parseFloat(backAvg),
      difference: (parseFloat(backAvg) - parseFloat(frontAvg)).toFixed(2),
      totalRounds: frontNineData.length,
      frontBetter: frontNineData.filter((_, i) => frontNineData[i].score < backNineData[i].score).length,
      backBetter: frontNineData.filter((_, i) => frontNineData[i].score > backNineData[i].score).length,
      equal: frontNineData.filter((_, i) => frontNineData[i].score === backNineData[i].score).length
    };
    
    logData('getFrontBackComparison', { frontNineData, backNineData, comparison }, 
      `전반/후반 ${comparison.totalRounds}라운드 비교`);
    
    return {
      frontNine: frontNineData,
      backNine: backNineData,
      comparison
    };
    
  } catch (error) {
    console.error('❌ 전반/후반 비교 에러:', error);
    return { frontNine: [], backNine: [], comparison: {} };
  }
}

/**
 * 특정 회원의 홀별 성과 분석 (레이더 차트용)
 * @param {number} memberId - 회원 ID
 * @returns {Promise<Object>} 회원별 홀별 성과 데이터
 */
export async function getMemberHolePerformance(memberId) {
  try {
    console.log(`🔍 회원 ${memberId} 홀별 성과 분석 시작...`);
    
    const allHoleScores = await getAllHoleScores();
    const memberRecords = allHoleScores.filter(record => record.memberId === memberId);
    
    if (memberRecords.length === 0) {
      console.warn(`⚠️ 회원 ${memberId}의 홀별 기록이 없습니다.`);
      return { holePerformance: [], totalRounds: 0, memberInfo: {} };
    }
    
    // 홀별 성과 집계
    const holePerformance = {};
    
    memberRecords.forEach(record => {
      if (record.holes && Array.isArray(record.holes)) {
        record.holes.forEach(hole => {
          const holeNum = hole.hole;
          if (!holePerformance[holeNum]) {
            holePerformance[holeNum] = {
              hole: holeNum,
              par: hole.par,
              scores: []
            };
          }
          holePerformance[holeNum].scores.push(hole.score);
        });
      }
    });
    
    // 홀별 평균 및 파 대비 성과 계산
    const performanceArray = Object.keys(holePerformance).map(holeNum => {
      const holeData = holePerformance[holeNum];
      const scores = holeData.scores;
      const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      
      return {
        hole: parseInt(holeNum),
        par: holeData.par,
        averageScore: parseFloat(averageScore.toFixed(2)),
        parDifference: parseFloat((averageScore - holeData.par).toFixed(2)),
        roundsPlayed: scores.length,
        bestScore: Math.min(...scores),
        worstScore: Math.max(...scores)
      };
    }).sort((a, b) => a.hole - b.hole);
    
    logData('getMemberHolePerformance', performanceArray, 
      `회원 ${memberId}: ${memberRecords.length}라운드, ${performanceArray.length}홀 데이터`);
    
    return {
      holePerformance: performanceArray,
      totalRounds: memberRecords.length,
      memberInfo: {
        memberId,
        recordsFound: memberRecords.length
      }
    };
    
  } catch (error) {
    console.error(`❌ 회원 ${memberId} 홀별 성과 분석 에러:`, error);
    return { holePerformance: [], totalRounds: 0, memberInfo: {} };
  }
}

/**
 * hole_scores 컬렉션 존재 여부 및 데이터 상태 확인
 * @returns {Promise<Object>} 컬렉션 상태 정보
 */
export async function checkHoleScoresStatus() {
  try {
    console.log('🔍 hole_scores 컬렉션 상태 확인...');
    
    const holeScoresRef = collection(db, 'hole_scores');
    const querySnapshot = await getDocs(query(holeScoresRef, limit(1)));
    
    const hasData = !querySnapshot.empty;
    
    if (hasData) {
      const allData = await getAllHoleScores();
      const status = {
        exists: true,
        hasData: true,
        totalRecords: allData.length,
        sampleRecord: allData[0] || null,
        dataStructureValid: allData.length > 0 && allData[0].holes && Array.isArray(allData[0].holes)
      };
      
      logData('checkHoleScoresStatus', status, 'hole_scores 컬렉션 상태 양호');
      return status;
    } else {
      const status = {
        exists: true,
        hasData: false,
        totalRecords: 0,
        sampleRecord: null,
        dataStructureValid: false
      };
      
      console.warn('⚠️ hole_scores 컬렉션은 존재하지만 데이터가 없습니다.');
      return status;
    }
    
  } catch (error) {
    console.error('❌ hole_scores 상태 확인 에러:', error);
    return {
      exists: false,
      hasData: false,
      totalRecords: 0,
      sampleRecord: null,
      dataStructureValid: false,
      error: error.message
    };
  }
}
