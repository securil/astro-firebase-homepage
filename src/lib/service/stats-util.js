// src/lib/service/stats-util.js
import { db } from '../firebase';
import { collection, getDocs, query, where, addDoc, deleteDoc } from 'firebase/firestore';

// 더미데이터 생성 함수 제거 - 실제 데이터만 사용

// 회원 통계 관련 함수
export async function getMembersStats() {
  try {
    const membersRef = collection(db, 'members');
    const membersSnapshot = await getDocs(membersRef);
    const membersData = membersSnapshot.docs.map(doc => doc.data());
    
    console.log(`실제 회원 데이터 개수: ${membersData.length}`);
    
    // 데이터가 없으면 빈 객체 반환
    if (membersData.length === 0) {
      console.log('회원 데이터가 없습니다.');
      return {
        rawData: [],
        totalMembers: 0,
        genderDistribution: {},
        generationDistribution: {}
      };
    }
    
    // 기본 통계 계산
    const totalMembers = membersData.length;
    
    // 성별 분포 계산
    const genderDistribution = membersData.reduce((acc, member) => {
      let displayGender = '미지정';
      
      // gender 값에 따라 표시 이름 변환
      if (member.gender === '남') {
        displayGender = '남성';
      } else if (member.gender === '여') {
        displayGender = '여성';
      } else if (member.gender) {
        displayGender = member.gender; // 다른 값이 있으면 그대로 사용
      }
      
      acc[displayGender] = (acc[displayGender] || 0) + 1;
      return acc;
    }, {});
    
    // 기수별 분포 계산
    const generationDistribution = membersData.reduce((acc, member) => {
      const generation = member.generation || '미지정';
      acc[generation] = (acc[generation] || 0) + 1;
      return acc;
    }, {});
    
    return {
      rawData: membersData,
      totalMembers,
      genderDistribution,
      generationDistribution
    };
  } catch (error) {
    console.error('회원 통계 데이터 조회 실패:', error);
    // 오류 발생 시 빈 데이터 반환 (더미 데이터 사용 안함)
    return {
      rawData: [],
      totalMembers: 0,
      genderDistribution: {},
      generationDistribution: {}
    };
  }
}

// 더미 성적 데이터 생성 함수 제거 - 실제 데이터만 사용

// 성적 분석 관련 함수
export async function getScoresStats() {
  try {
    // 1. 실제 Meeting_Stats 컬렉션에서 모든 데이터 가져오기 (문서 ID 무관)
    const meetingStatsRef = collection(db, 'Meeting_Stats');
    const meetingStatsSnapshot = await getDocs(meetingStatsRef);
    
    // 모든 Meeting_Stats 문서를 배열로 변환
    const allMeetingStats = meetingStatsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        docId: doc.id, // 문서 ID도 저장
        ...data
      };
    });
    
    console.log(`Meeting_Stats 총 문서 수: ${allMeetingStats.length}`);
    
    // 2. 유효한 미팅 데이터 필터링 (participantCount > 0이고 averageScore가 있는)
    const validMeetingStats = allMeetingStats.filter(data => 
      data.participantCount > 0 && 
      data.averageScore !== null && 
      data.averageScore !== undefined &&
      data.meetingId
    );
    
    console.log(`유효한 Meeting_Stats 데이터: ${validMeetingStats.length}개`);
    
    if (validMeetingStats.length === 0) {
      console.log('유효한 Meeting_Stats 데이터가 없습니다.');
      return {
        rawData: [],
        memberAverages: {},
        monthlyAverages: [],
        rankDistribution: {},
        totalStats: {
          totalAverage: 0,
          minScore: 0,
          maxScore: 0,
          bestScoreData: null,
          bestMemberInfo: null,
          totalRounds: 0,
          uniqueMemberCount: 0
        }
      };
    }
    
    // 3. scores 컬렉션에서 실제 성적 데이터 가져오기
    const scoresRef = collection(db, 'scores');
    const scoresSnapshot = await getDocs(scoresRef);
    let scoresData = scoresSnapshot.docs.map(doc => doc.data());
    
    console.log(`scores 컬렉션 총 데이터: ${scoresData.length}개`);
    
    // 데이터가 없으면 빈 결과 반환 (더미 데이터 사용 안함)
    if (scoresData.length === 0) {
      console.log('scores 데이터가 없어 빈 결과를 반환합니다.');
      return {
        rawData: [],
        memberAverages: {},
        monthlyAverages: [],
        rankDistribution: {},
        totalStats: {
          totalAverage: 0,
          minScore: 0,
          maxScore: 0,
          bestScoreData: null,
          bestMemberInfo: null,
          totalRounds: 0,
          uniqueMemberCount: 0
        }
      };
    }
    
    // 회원 정보 가져오기 (이름 매핑용)
    const membersRef = collection(db, 'members');
    const membersSnapshot = await getDocs(membersRef);
    const membersData = membersSnapshot.docs.map(doc => doc.data());
    
    // 회원 ID로 빠르게 조회할 수 있도록 맵 생성
    const memberMap = {};
    membersData.forEach(member => {
      if (member.memberId) {
        memberMap[member.memberId] = member;
      }
    });
    
    // 모임 정보 가져오기 (날짜 매핑용)
    const meetingsRef = collection(db, 'meetings');
    const meetingsSnapshot = await getDocs(meetingsRef);
    const meetingsData = meetingsSnapshot.docs.map(doc => doc.data());
    
    // 모임 ID로 빠르게 조회할 수 있도록 맵 생성
    const meetingMap = {};
    meetingsData.forEach(meeting => {
      if (meeting.meetingId) {
        meetingMap[meeting.meetingId] = meeting;
      }
    });
    
    // 완료된 모임만 필터링
    const completedMeetingsQuery = query(meetingsRef, where('status', '==', '완료'));
    const completedMeetingsSnapshot = await getDocs(completedMeetingsQuery);
    const validMeetingIds = completedMeetingsSnapshot.docs.map(doc => {
      const data = doc.data();
      return data.meetingId || parseInt(doc.id);
    });
    
    console.log('완료된 모임 ID:', validMeetingIds);
    
    // 유효한 모임 ID가 있을 경우에만 필터링
    // 필터링을 건너뛰고 가상 데이터로 처리하도록 수정
    if (validMeetingIds.length > 0) {
      const filteredData = scoresData.filter(score => validMeetingIds.includes(score.meetingId));
      console.log(`유효한 모임 데이터만 필터링: ${filteredData.length}개 성적 데이터`);
      
      // 필터링된 데이터가 없을 경우 원본 데이터 유지
      if (filteredData.length > 0) {
        scoresData = filteredData;
      } else {
        console.log('필터링 후 데이터가 없어 원본 데이터를 유지합니다.');
      }
    }
    
    // 1. 전체 평균 타수 계산 - 모든 유효한 gross_score 총합을 총 개수로 나눔
    // 스코어가 0이거나 비어 있는 값은 분석 대상에서 제외
    const validScores = scoresData.filter(score => score.gross_score && score.gross_score > 0).map(score => score.gross_score);
    const totalAverage = validScores.length > 0
      ? Math.round(validScores.reduce((sum, score) => sum + score, 0) / validScores.length * 10) / 10
      : 0;
    
    // 중간 참조를 위해 allScores 변수 유지
    const allScores = validScores;
    
    // 최저 타수 및 해당 회원 정보 찾기
    const minScore = validScores.length > 0 ? Math.min(...validScores) : 0;
    
    // 실제 최저 타수 데이터 찾기 (더미 데이터 사용 안함)
    const bestScoreData = minScore > 0 ? 
      scoresData.find(score => score.gross_score === minScore) : null;
    
    console.log('최저 타수:', minScore);
    console.log('최저 타수 데이터:', bestScoreData);
    
    // 최저 타수 회원 정보 찾기 (실제 데이터만 사용)
    let bestMemberInfo = null;
    
    if (bestScoreData && bestScoreData.memberId) {
      const memberId = bestScoreData.memberId;
      const member = memberMap[memberId];
      
      if (member) {
        bestMemberInfo = {
          name: member.name || "정보 없음",
          generation: member.generation || "정보 없음",
          memberId: memberId,
          score: bestScoreData.gross_score,
          date: bestScoreData.meetingDate || bestScoreData.date
        };
        
        console.log('실제 최저 타수 회원:', bestMemberInfo);
      } else {
        console.log(`회원 ID ${memberId}에 해당하는 회원 정보를 찾을 수 없습니다.`);
      }
    } else {
      console.log('최저 타수 데이터가 없습니다.');
    }
    
    // 3. 총 라운드 수 계산 - gross_score의 총 개수
    const totalRounds = allScores.length;
    
    // 4. 회원별 평균 타수 계산 (스코어가 0인 경우 제외)
    const memberAverages = {};
    scoresData.forEach(score => {
      // 스코어가 0이거나 비어 있는 값은 분석 대상에서 제외
      if (!score.gross_score || score.gross_score <= 0) return;
      
      if (!memberAverages[score.memberId]) {
        memberAverages[score.memberId] = {
          totalScore: 0,
          count: 0,
          scores: [],
          name: memberMap[score.memberId]?.name || `회원 ${score.memberId}`,
          generation: memberMap[score.memberId]?.generation || "미상"
        };
      }
      
      memberAverages[score.memberId].totalScore += score.gross_score;
      memberAverages[score.memberId].count += 1;
      memberAverages[score.memberId].scores.push(score.gross_score);
    });
    
    // 평균 계산 및 5회 미만 참여자 필터링
    const qualifiedMembers = [];
    Object.keys(memberAverages).forEach(memberId => {
      memberAverages[memberId].average = Math.round(memberAverages[memberId].totalScore / memberAverages[memberId].count * 10) / 10;
      
      // 5회 이상 참여한 회원만 등급 평가 대상에 포함
      if (memberAverages[memberId].count >= 5) {
        qualifiedMembers.push({
          memberId: parseInt(memberId),
          average: memberAverages[memberId].average,
          count: memberAverages[memberId].count,
          name: memberAverages[memberId].name,
          generation: memberAverages[memberId].generation
        });
      } else {
        memberAverages[memberId].rank = '미분류';
      }
    });
    
    // 5. 백분위 기준으로 등급 할당 (5회 이상 참여 회원 대상)
    if (qualifiedMembers.length > 0) {
      // 평균 타수 기준으로 오름차순 정렬 (낮은 타수가 더 좋은 성적)
      qualifiedMembers.sort((a, b) => a.average - b.average);
      
      const totalCount = qualifiedMembers.length;
      
      // 백분위 기준 등급 부여
      qualifiedMembers.forEach((member, index) => {
        const percentile = (index + 1) / totalCount * 100;
        
        if (percentile <= 10) {
          memberAverages[member.memberId].rank = '독수리';
        } else if (percentile <= 30) {
          memberAverages[member.memberId].rank = '매';
        } else if (percentile <= 70) {
          memberAverages[member.memberId].rank = '학';
        } else {
          memberAverages[member.memberId].rank = '참새';
        }
      });
    }
    
    // 6. 상위 10명 추출 (평균 타수가 낮은 순)
    const top10Members = [...qualifiedMembers]
      .sort((a, b) => a.average - b.average)
      .slice(0, 10)
      .map(member => ({
        memberId: member.memberId,
        name: member.name,
        average: member.average,
        count: member.count,
        generation: member.generation
      }));
    
    // 7. 월별 평균 타수 계산을 위한 모임 날짜 매핑
    // 모든 성적에 모임 날짜 추가
    scoresData.forEach(score => {
      // 모임 정보에서 날짜 가져오기
      if (meetingMap[score.meetingId] && meetingMap[score.meetingId].date) {
        score.meetingDate = meetingMap[score.meetingId].date;
      } else if (!score.meetingDate && score.meetingId) {
        // 모임 ID에서 년월 유추 (예: 2405 -> 2024-05)
        const idStr = String(score.meetingId);
        if (idStr.length === 4) {
          score.meetingDate = `20${idStr.substring(0, 2)}-${idStr.substring(2, 4)}-15`;
        }
      }
    });
    
    // 8. 월별 평균 타수 계산 (스코어가 0인 경우 제외)
    const monthlyAverages = {};
    scoresData.forEach(score => {
      if (!score.meetingDate) return;
      // 스코어가 0이거나 비어 있는 값은 분석 대상에서 제외
      if (!score.gross_score || score.gross_score <= 0) return;
      
      const yearMonth = score.meetingDate.substring(0, 7); // YYYY-MM 형식
      
      if (!monthlyAverages[yearMonth]) {
        monthlyAverages[yearMonth] = {
          totalScore: 0,
          count: 0,
          meetingIds: []
        };
      }
      
      monthlyAverages[yearMonth].totalScore += score.gross_score;
      monthlyAverages[yearMonth].count += 1;
      
      // 해당 월에 포함된 모임 ID 추가 (중복 제거)
      if (!monthlyAverages[yearMonth].meetingIds.includes(score.meetingId)) {
        monthlyAverages[yearMonth].meetingIds.push(score.meetingId);
      }
    });
    
    // 월별 평균 계산 및 날짜순 정렬
    const tempMonthlyAverageArray = Object.entries(monthlyAverages)
      .map(([month, data]) => ({
        month,
        average: Math.round(data.totalScore / data.count * 10) / 10,
        count: data.count,
        meetingIds: data.meetingIds
      }))
      .sort((a, b) => a.month.localeCompare(b.month));
    
    // 9. 등급별 회원 분포 계산
    const rankDistribution = {
      '독수리': 0,
      '매': 0,
      '학': 0,
      '참새': 0,
      '미분류': 0
    };
    
    Object.values(memberAverages).forEach(member => {
      const rank = member.rank || '미분류';
      rankDistribution[rank] = (rankDistribution[rank] || 0) + 1;
    });
    
    // Meeting_Stats 데이터를 사용하여 월별 평균 구하기 (실제 데이터만)
    let monthlyAverageArray = [];
    
    // 날짜 필드 정규화
    const normalizedMeetingData = validMeetingStats.map(data => {
      // 날짜 필드 확인 및 정규화
      if (data.date) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(data.date)) {
          // 모임 ID에서 날짜 유추 (2505 -> 2025-05)
          if (data.meetingId) {
            const idStr = String(data.meetingId);
            if (idStr.length === 4) {
              const year = `20${idStr.substring(0, 2)}`;
              const month = idStr.substring(2, 4);
              data.date = `${year}-${month}-15`;
            }
          }
        }
        data.yearMonth = data.date.substring(0, 7);
      } else if (data.meetingId) {
        // 날짜가 없으면 모임 ID에서 유추
        const idStr = String(data.meetingId);
        if (idStr.length === 4) {
          const year = `20${idStr.substring(0, 2)}`;
          const month = idStr.substring(2, 4);
          data.date = `${year}-${month}-15`;
          data.yearMonth = `${year}-${month}`;
        }
      }
      
      return data;
    });
    
    // 년월별로 그룹화
    const monthlyGroups = {};
    normalizedMeetingData.forEach(meeting => {
      if (!meeting.date || !meeting.yearMonth) return;
      
      const yearMonth = meeting.yearMonth;
      
      if (!monthlyGroups[yearMonth]) {
        monthlyGroups[yearMonth] = {
          totalScore: 0,
          totalParticipants: 0,
          count: 0,
          meetingIds: []
        };
      }
      
      monthlyGroups[yearMonth].totalScore += meeting.averageScore * meeting.participantCount;
      monthlyGroups[yearMonth].totalParticipants += meeting.participantCount;
      monthlyGroups[yearMonth].count += 1;
      monthlyGroups[yearMonth].meetingIds.push(meeting.meetingId);
    });
    
    // 월별 평균 계산 및 정렬
    monthlyAverageArray = Object.entries(monthlyGroups)
      .map(([month, data]) => ({
        month,
        average: Math.round(data.totalScore / data.totalParticipants * 10) / 10,
        count: data.totalParticipants,
        meetingIds: data.meetingIds
      }))
      .sort((a, b) => b.month.localeCompare(a.month)); // 최신순
    
    // 최근 6개월 데이터만 사용
    if (monthlyAverageArray.length > 6) {
      monthlyAverageArray = monthlyAverageArray.slice(0, 6);
    }
    
    // 오래된 순으로 재정렬
    monthlyAverageArray.sort((a, b) => a.month.localeCompare(b.month));
    
    console.log('최종 월별 평균 데이터:', monthlyAverageArray);
    
    // 최고 성적 보유자 정보도 별도로 계산
    const maxScore = allScores.length > 0 ? Math.max(...allScores) : 0;
    const worstScoreData = scoresData.find(score => score.gross_score === maxScore) || {};
    
    return {
      rawData: scoresData,
      memberAverages,                  // 회원별 평균 타수와 등급
      qualifiedMembers,                // 5회 이상 참여 회원 목록
      top10Members,                    // 상위 10명 회원 목록
      monthlyAverages: monthlyAverageArray || tempMonthlyAverageArray, // 월별 평균 타수
      rankDistribution,                // 등급별 회원 분포
      totalStats: {
        totalAverage,                  // 전체 평균 타수
        minScore,                      // 최저 타수
        maxScore,                      // 최고 타수
        bestScoreData,                 // 최저 타수 기록 데이터
        bestMemberInfo,                // 최저 타수 회원 정보
        worstScoreData,                // 최고 타수 기록 데이터
        totalRounds: validScores.length, // 총 라운드 수
        uniqueMemberCount: Object.keys(memberAverages).length // 참여 회원 수
      }
    };
  } catch (error) {
    console.error('성적 통계 데이터 조회 실패:', error);
    // 오류 발생 시 빈 데이터 반환 (더미 데이터 사용 안함)
    return {
      rawData: [],
      memberAverages: {},
      monthlyAverages: [],
      rankDistribution: {},
      totalStats: {
        totalAverage: 0,
        minScore: 0,
        maxScore: 0,
        bestScoreData: null,
        bestMemberInfo: null,
        totalRounds: 0,
        uniqueMemberCount: 0
      }
    };
  }
}

// processScoreData 함수 제거 - 더미 데이터 처리 불필요

// 모임 참여 분석 관련 함수
export async function getMeetingParticipationStats() {
  try {
    // 완료된 모임만 필터링
    let validMeetingIds = [];
    try {
      const meetingStatsRef = collection(db, 'Meeting_Stats');
      const meetingStatsSnapshot = await getDocs(meetingStatsRef);
      const meetingStatsData = meetingStatsSnapshot.docs.map(doc => doc.data());
      
      // 유효한 모임 ID만 추출
      validMeetingIds = meetingStatsData
        .filter(data => data.status === '완료' && data.participantCount > 0)
        .map(data => data.meetingId);
    } catch (error) {
      console.error('Meeting_Stats 컬렉션 조회 실패:', error);
    }
    
    const scoresRef = collection(db, 'Members_Score');
    const scoresSnapshot = await getDocs(scoresRef);
    let scoresData = scoresSnapshot.docs.map(doc => doc.data());
    
    // 유효한 모임 ID가 있을 경우에만 필터링
    if (validMeetingIds.length > 0) {
      scoresData = scoresData.filter(score => validMeetingIds.includes(score.meetingId));
    }
    
    return scoresData;
  } catch (error) {
    console.error('모임 참여 통계 데이터 조회 실패:', error);
    return [];
  }
}

// 수상 통계 관련 함수
export async function getAwardsStats() {
  try {
    // 완료된 모임만 필터링
    let validMeetingIds = [];
    try {
      const meetingStatsRef = collection(db, 'Meeting_Stats');
      const meetingStatsSnapshot = await getDocs(meetingStatsRef);
      const meetingStatsData = meetingStatsSnapshot.docs.map(doc => doc.data());
      
      // 유효한 모임 ID만 추출
      validMeetingIds = meetingStatsData
        .filter(data => data.status === '완료' && data.participantCount > 0)
        .map(data => data.meetingId);
    } catch (error) {
      console.error('Meeting_Stats 컬렉션 조회 실패:', error);
    }
    
    const awardsRef = collection(db, 'Meeting_Awards');
    const awardsSnapshot = await getDocs(awardsRef);
    let awardsData = awardsSnapshot.docs.map(doc => doc.data());
    
    // 유효한 모임 ID가 있을 경우에만 필터링
    if (validMeetingIds.length > 0) {
      awardsData = awardsData.filter(award => validMeetingIds.includes(award.meetingId));
    }
    
    return awardsData;
  } catch (error) {
    console.error('수상 통계 데이터 조회 실패:', error);
    return [];
  }
}

// 개인 성적 발전 추적 관련 함수
export async function getPersonalProgressStats(memberId) {
  try {
    // 완료된 모임만 필터링
    let validMeetingIds = [];
    try {
      const meetingStatsRef = collection(db, 'Meeting_Stats');
      const meetingStatsSnapshot = await getDocs(meetingStatsRef);
      const meetingStatsData = meetingStatsSnapshot.docs.map(doc => doc.data());
      
      // 유효한 모임 ID만 추출
      validMeetingIds = meetingStatsData
        .filter(data => data.status === '완료' && data.participantCount > 0)
        .map(data => data.meetingId);
    } catch (error) {
      console.error('Meeting_Stats 컬렉션 조회 실패:', error);
    }
    
    const scoresRef = collection(db, 'Members_Score');
    const memberScoresQuery = query(scoresRef, where('memberId', '==', memberId));
    const scoresSnapshot = await getDocs(memberScoresQuery);
    let scoresData = scoresSnapshot.docs.map(doc => doc.data());
    
    // 유효한 모임 ID가 있을 경우에만 필터링
    if (validMeetingIds.length > 0) {
      scoresData = scoresData.filter(score => validMeetingIds.includes(score.meetingId));
    }
    
    return scoresData;
  } catch (error) {
    console.error('개인 성적 발전 통계 데이터 조회 실패:', error);
    return [];
  }
}


// 연도별 베스트 스코어 추출 함수 (Meeting_Awards 활용)
export async function getYearlyBestScores() {
  try {
    console.log('연도별 베스트 스코어 조회 시작...');
    
    // 1. Meeting_Awards에서 medalist 카테고리 가져오기
    const awardsRef = collection(db, 'Meeting_Awards');
    const maleQuery = query(awardsRef, where('category', '==', 'medalist_male'));
    const femaleQuery = query(awardsRef, where('category', '==', 'medalist_female'));
    
    const [maleSnapshot, femaleSnapshot] = await Promise.all([
      getDocs(maleQuery),
      getDocs(femaleQuery)
    ]);
    
    const maleAwards = maleSnapshot.docs.map(doc => doc.data());
    const femaleAwards = femaleSnapshot.docs.map(doc => doc.data());
    const allMedalists = [...maleAwards, ...femaleAwards];
    
    console.log(`메달리스트 데이터: 남성 ${maleAwards.length}개, 여성 ${femaleAwards.length}개`);
    
    // 2. 회원 정보 가져오기
    const membersRef = collection(db, 'members');
    const membersSnapshot = await getDocs(membersRef);
    const membersData = membersSnapshot.docs.map(doc => doc.data());
    const memberMap = {};
    membersData.forEach(member => {
      if (member.memberId) {
        memberMap[member.memberId] = member;
      }
    });
    
    // 3. 모임별로 최저 스코어 찾기
    const meetingBestScores = {};
    allMedalists.forEach(award => {
      const meetingId = award.meetingId;
      if (!meetingBestScores[meetingId] || award.score < meetingBestScores[meetingId].score) {
        meetingBestScores[meetingId] = {
          meetingId: meetingId,
          score: award.score,
          memberId: award.memberId,
          category: award.category
        };
      }
    });
    
    console.log(`모임별 베스트 스코어: ${Object.keys(meetingBestScores).length}개 모임`);
    
    // 4. 연도별로 그룹화 및 최저 스코어 선택
    const yearlyBestScores = {};
    Object.values(meetingBestScores).forEach(best => {
      const meetingIdStr = String(best.meetingId);
      let year;
      
      // meetingId에서 연도 추출 (2205 -> 2022, 2505 -> 2025)
      if (meetingIdStr.length === 4) {
        const yearPrefix = meetingIdStr.substring(0, 2);
        if (parseInt(yearPrefix) >= 20) {
          year = 2000 + parseInt(yearPrefix);
        } else {
          year = 2000 + parseInt(yearPrefix);
        }
      }
      
      if (year && (!yearlyBestScores[year] || best.score < yearlyBestScores[year].score)) {
        const member = memberMap[best.memberId] || {};
        yearlyBestScores[year] = {
          year: year,
          score: best.score,
          memberId: best.memberId,
          memberName: member.name || '정보 없음',
          generation: member.generation || '정보 없음',
          meetingId: best.meetingId,
          category: best.category
        };
      }
    });
    
    // 5. 연도별 정렬 (최신순)
    const sortedYearlyBest = Object.values(yearlyBestScores)
      .sort((a, b) => b.year - a.year);
    
    console.log('연도별 베스트 스코어 추출 완료:', sortedYearlyBest);
    return sortedYearlyBest;
    
  } catch (error) {
    console.error('연도별 베스트 스코어 조회 실패:', error);
    return [];
  }
}

// 가공된 연도별 베스트 스코어 데이터 동기화 함수
export async function syncYearlyBestScoresToCollection() {
  try {
    console.log('연도별 베스트 스코어 데이터 동기화 시작...');
    
    // 1. Meeting_Awards에서 실제 데이터 추출
    const yearlyBestScores = await getYearlyBestScores();
    
    if (yearlyBestScores.length === 0) {
      console.log('동기화할 데이터가 없습니다.');
      return;
    }
    
    // 2. yearly_best_scores 컬렉션 초기화 (기존 데이터 삭제)
    const yearlyBestRef = collection(db, 'yearly_best_scores');
    const existingSnapshot = await getDocs(yearlyBestRef);
    
    // 기존 데이터 삭제
    const deletePromises = existingSnapshot.docs.map(doc => 
      deleteDoc(doc.ref)
    );
    await Promise.all(deletePromises);
    
    console.log(`기존 ${existingSnapshot.docs.length}개 데이터 삭제 완료`);
    
    // 3. 새 데이터 추가
    const addPromises = yearlyBestScores.map(yearData => 
      addDoc(yearlyBestRef, {
        year: yearData.year,
        score: yearData.score,
        memberId: yearData.memberId,
        memberName: yearData.memberName,
        generation: yearData.generation,
        meetingId: yearData.meetingId,
        category: yearData.category,
        createdAt: new Date().toISOString(),
        dataSource: 'Meeting_Awards'
      })
    );
    
    await Promise.all(addPromises);
    console.log(`${yearlyBestScores.length}개 연도별 베스트 스코어 데이터 동기화 완료`);
    
    return yearlyBestScores;
    
  } catch (error) {
    console.error('연도별 베스트 스코어 동기화 실패:', error);
    return [];
  }
}

// yearly_best_scores 컬렉션에서 데이터 조회
export async function getYearlyBestScoresFromCollection() {
  try {
    const yearlyBestRef = collection(db, 'yearly_best_scores');
    const snapshot = await getDocs(yearlyBestRef);
    
    if (snapshot.empty) {
      console.log('yearly_best_scores 컬렉션이 비어있습니다. 동기화를 실행합니다.');
      return await syncYearlyBestScoresToCollection();
    }
    
    const yearlyBestScores = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })).sort((a, b) => b.year - a.year);
    
    console.log(`yearly_best_scores 컬렉션에서 ${yearlyBestScores.length}개 데이터 조회`);
    return yearlyBestScores;
    
  } catch (error) {
    console.error('yearly_best_scores 컬렉션 조회 실패:', error);
    // 실패 시 Meeting_Awards에서 직접 조회
    return await getYearlyBestScores();
  }
}
