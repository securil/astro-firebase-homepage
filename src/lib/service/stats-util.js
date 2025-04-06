// src/lib/service/stats-util.js
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * 모든 회원 데이터 가져오기
 * @returns {Promise<Array>} 회원 목록
 */
export async function getMembers() {
  try {
    const membersCollection = collection(db, 'members');
    const memberSnapshot = await getDocs(membersCollection);
    return memberSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('회원 데이터 가져오기 실패:', error);
    return [];
  }
}

/**
 * 모든 모임 데이터 가져오기
 * @returns {Promise<Array>} 모임 목록
 */
export async function getMeetings() {
  try {
    const meetingsCollection = collection(db, 'meetings');
    const meetingSnapshot = await getDocs(meetingsCollection);
    return meetingSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('모임 데이터 가져오기 실패:', error);
    return [];
  }
}

/**
 * 모든 스코어 데이터 가져오기
 * @returns {Promise<Array>} 스코어 목록
 */
export async function getScores() {
  try {
    const scoresCollection = collection(db, 'scores');
    const scoreSnapshot = await getDocs(scoresCollection);
    return scoreSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('스코어 데이터 가져오기 실패:', error);
    return [];
  }
}

/**
 * 모든 특별상 데이터 가져오기
 * @returns {Promise<Array>} 특별상 목록
 */
export async function getSpecialAwards() {
  try {
    const awardsCollection = collection(db, 'special_awards');
    const awardSnapshot = await getDocs(awardsCollection);
    return awardSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('특별상 데이터 가져오기 실패:', error);
    return [];
  }
}

/**
 * 필터 적용된 회원 가져오기
 * @param {Object} filters 필터 조건
 * @returns {Promise<Array>} 필터링된 회원 목록
 */
export async function getFilteredMembers(filters) {
  try {
    let membersRef = collection(db, 'members');
    let constraints = [];
    
    // 기수 필터
    if (filters.generation) {
      constraints.push(where('generation', '==', parseInt(filters.generation)));
    }
    
    // 성별 필터
    if (filters.gender) {
      constraints.push(where('gender', '==', filters.gender));
    }
    
    // 쿼리 적용
    let q = constraints.length > 0 ? query(membersRef, ...constraints) : membersRef;
    const snapshot = await getDocs(q);
    
    let members = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // 이름 필터 (클라이언트 측에서 수행)
    if (filters.name) {
      members = members.filter(member => 
        member.name.includes(filters.name)
      );
    }
    
    return members;
  } catch (error) {
    console.error('필터링된 회원 가져오기 실패:', error);
    return [];
  }
}

/**
 * 필터 적용된 데이터 준비
 * @param {Object} rawData 원본 데이터
 * @param {Object} filters 필터 조건
 * @returns {Object} 필터링된 데이터
 */
export function applyFilters(rawData, filters) {
  const { members, scores, meetings, specialAwards } = rawData;
  
  // 조건에 맞는 회원만 필터링
  const filteredMembers = members.filter(member => {
    let match = true;
    
    // 이름 필터
    if (filters.name && !member.name.includes(filters.name)) {
      match = false;
    }
    
    // 기수 필터
    if (filters.generation && member.generation != filters.generation) {
      match = false;
    }
    
    // 성별 필터
    if (filters.gender && member.gender !== filters.gender) {
      match = false;
    }
    
    return match;
  });
  
  // 필터된 회원 ID 목록
  const filteredMemberIds = filteredMembers.map(member => member.id);
  
  // 필터된 회원의 스코어만 가져오기
  const filteredScores = scores.filter(score => 
    filteredMemberIds.includes(score.member_id)
  );
  
  // 필터된 회원의 특별상만 가져오기
  const filteredAwards = specialAwards.filter(award => 
    filteredMemberIds.includes(award.member_id)
  );
  
  // 필터된 스코어가 있는 모임만 가져오기
  const meetingIds = [...new Set(filteredScores.map(score => score.meeting_id))];
  const filteredMeetings = meetings.filter(meeting => 
    meetingIds.includes(meeting.id)
  );
  
  return {
    members: filteredMembers,
    scores: filteredScores,
    meetings: filteredMeetings,
    specialAwards: filteredAwards
  };
}

/**
 * 요약 통계 데이터 계산
 * @param {Object} data 필터링된 데이터
 * @returns {Object} 요약 통계
 */
export function calculateSummaryStats(data) {
    // ❗ undefined 방지용 기본값 추가
    const members = data?.members ?? [];
    const scores = data?.scores ?? [];
    const meetings = data?.meetings ?? [];
    const specialAwards = data?.specialAwards ?? [];


  // 총 회원 수
  const totalMembers = members.length;
  
  // 총 모임 수
  const totalMeetings = meetings.length;
  
  // 총 라운드 수 (스코어 기록 수)
  const totalRounds = scores.length;
  
  // 평균 스코어 계산
  const avgScore = scores.length > 0 
    ? (scores.reduce((sum, score) => sum + score.gross_score, 0) / scores.length).toFixed(1)
    : '-';
  
  // 베스트 스코어 및 기록 회원
  let bestScore = null;
  let bestScoreMemberId = null;
  
  if (scores.length > 0) {
    bestScore = Math.min(...scores.map(s => s.gross_score));
    const bestScoreRecord = scores.find(s => s.gross_score === bestScore);
    bestScoreMemberId = bestScoreRecord?.member_id;
  }
  
  // 베스트 스코어 회원 이름 찾기
  let bestScoreMemberName = null;
  if (bestScoreMemberId) {
    const member = members.find(m => m.id === bestScoreMemberId);
    bestScoreMemberName = member?.name;
  }
  
  // 홀인원 개수
  const holeInOnes = specialAwards.filter(award => award.category === 'hole_in_one').length;
  
  // 이전 년도와 비교를 위한 데이터 준비 (예시 데이터)
  const prevYearComparison = {
    avgScoreChange: -1.8,  // 전년 대비 평균 스코어 변화 (마이너스면 향상)
    participationChange: 12.5,  // 전년 대비 참여율 변화 (퍼센트)
    meetingsChange: 15.0,  // 전년 대비 모임 횟수 변화 (퍼센트)
  };
  
  return {
    totalMembers,
    totalMeetings,
    totalRounds,
    avgScore,
    bestScore,
    bestScoreMemberId,
    bestScoreMemberName,
    holeInOnes,
    prevYearComparison
  };
}

/**
 * 회원별 스코어 추이 데이터 준비
 * @param {Object} data 필터링된 데이터
 * @returns {Array} 회원별 스코어 추이 데이터
 */
export function getMemberScoreData(data) {
  const { members, scores, meetings } = data;
  
  // 모임 ID -> 날짜 매핑
  const meetingDates = {};
  meetings.forEach(meeting => {
    meetingDates[meeting.id] = meeting.date;
  });
  
  // 회원 이름 매핑
  const memberNames = {};
  members.forEach(member => {
    memberNames[member.id] = member.name;
  });
  
  // 회원별 스코어 정렬 및 날짜 추가
  const enrichedScores = scores.map(score => ({
    ...score,
    member_name: memberNames[score.member_id] || `ID: ${score.member_id}`,
    date: meetingDates[score.meeting_id] || new Date().toISOString()
  }));
  
  // 날짜순으로 정렬
  return enrichedScores.sort((a, b) => new Date(a.date) - new Date(b.date));
}

/**
 * 기수별 평균 스코어 데이터 준비
 * @param {Object} data 필터링된 데이터
 * @returns {Array} 기수별 평균 스코어 데이터
 */
export function getGenerationScoreData(data) {
  const { members, scores } = data;
  
  // 기수별 회원 그룹화
  const membersByGeneration = {};
  members.forEach(member => {
    if (!membersByGeneration[member.generation]) {
      membersByGeneration[member.generation] = [];
    }
    membersByGeneration[member.generation].push(member.id);
  });
  
  // 기수별 평균 스코어 계산
  const result = [];
  for (const generation in membersByGeneration) {
    const memberIds = membersByGeneration[generation];
    const genScores = scores.filter(score => memberIds.includes(score.member_id));
    
    if (genScores.length > 0) {
      const avgScore = genScores.reduce((sum, score) => sum + score.gross_score, 0) / genScores.length;
      result.push({
        generation: parseInt(generation),
        averageScore: parseFloat(avgScore.toFixed(1)),
        memberCount: memberIds.length,
        scoreCount: genScores.length
      });
    }
  }
  
  return result.sort((a, b) => a.generation - b.generation);
}

/**
 * 성별 평균 스코어 데이터 준비
 * @param {Object} data 필터링된 데이터
 * @returns {Array} 성별 평균 스코어 데이터
 */
export function getGenderScoreData(data) {
  const { members, scores } = data;
  
  const genderGroups = {
    '남성': [],
    '여성': []
  };
  
  // 성별 회원 ID 그룹화
  members.forEach(member => {
    if (genderGroups[member.gender]) {
      genderGroups[member.gender].push(member.id);
    }
  });
  
  // 성별 평균 스코어 계산
  const result = [];
  for (const gender in genderGroups) {
    const memberIds = genderGroups[gender];
    const genderScores = scores.filter(score => memberIds.includes(score.member_id));
    
    if (genderScores.length > 0) {
      const avgScore = genderScores.reduce((sum, score) => sum + score.gross_score, 0) / genderScores.length;
      result.push({
        gender,
        averageScore: parseFloat(avgScore.toFixed(1)),
        memberCount: memberIds.length,
        scoreCount: genderScores.length
      });
    }
  }
  
  return result;
}

/**
 * 연도별 모임 스코어 추이 데이터
 * @param {Object} data 필터링된 데이터
 * @returns {Array} 연도별 모임 스코어 데이터
 */
export function getYearlyScoreData(data) {
  const { meetings, scores } = data;
  
  // 모임 날짜별 그룹화
  const meetingsByYear = {};
  meetings.forEach(meeting => {
    const date = new Date(meeting.date);
    const year = date.getFullYear();
    
    if (!meetingsByYear[year]) {
      meetingsByYear[year] = [];
    }
    meetingsByYear[year].push(meeting.id);
  });
  
  // 연도별 평균 스코어 계산
  const result = [];
  for (const year in meetingsByYear) {
    const meetingIds = meetingsByYear[year];
    const yearScores = scores.filter(score => meetingIds.includes(score.meeting_id));
    
    if (yearScores.length > 0) {
      const avgScore = yearScores.reduce((sum, score) => sum + score.gross_score, 0) / yearScores.length;
      result.push({
        year: parseInt(year),
        averageScore: parseFloat(avgScore.toFixed(1)),
        meetingCount: meetingIds.length,
        scoreCount: yearScores.length
      });
    }
  }
  
  return result.sort((a, b) => a.year - b.year);
}

/**
 * 회원별 랭킹 데이터 생성
 * @param {Object} data 필터링된 데이터
 * @param {number} limit 반환할 상위 랭킹 수
 * @returns {Array} 랭킹 데이터
 */
export function getRankingData(data, limit = 10) {
  const { members, scores } = data;
  
  // 회원별 스코어 그룹화
  const scoresByMember = {};
  scores.forEach(score => {
    if (!scoresByMember[score.member_id]) {
      scoresByMember[score.member_id] = [];
    }
    scoresByMember[score.member_id].push(score.gross_score);
  });
  
  // 평균 스코어 계산 및 랭킹 생성
  const rankings = [];
  for (const memberId in scoresByMember) {
    const memberScores = scoresByMember[memberId];
    
    // 최소 3회 이상 참가한 회원만 집계
    if (memberScores.length < 3) continue;
    
    const avgScore = memberScores.reduce((sum, score) => sum + score, 0) / memberScores.length;
    const bestScore = Math.min(...memberScores);
    const member = members.find(m => m.id === memberId);
    
    if (member) {
      rankings.push({
        id: memberId,
        name: member.name,
        generation: member.generation,
        gender: member.gender,
        averageScore: parseFloat(avgScore.toFixed(1)),
        bestScore: bestScore,
        gamesPlayed: memberScores.length
      });
    }
  }
  
  // 평균 스코어로 정렬 (낮은 것이 좋은 것)
  rankings.sort((a, b) => a.averageScore - b.averageScore);
  
  // 상위 N명만 반환
  return rankings.slice(0, limit);
}

/**
 * 회원별 성적 향상도 분석
 * @param {Object} data 필터링된 데이터
 * @returns {Array} 회원별 성적 향상도 데이터
 */
export function getImprovedScoreData(data) {
  const { members, scores, meetings } = data;
  
  // 날짜 정보를 포함한 스코어 데이터 준비
  const scoresWithDate = scores.map(score => {
    const meeting = meetings.find(m => m.id === score.meeting_id);
    return {
      ...score,
      date: meeting ? new Date(meeting.date) : null
    };
  }).filter(score => score.date !== null);
  
  // 회원별 성적 변화 분석
  const result = [];
  
  members.forEach(member => {
    // 회원의 모든 스코어 시간순으로 정렬
    const memberScores = scoresWithDate
      .filter(score => score.member_id === member.id)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
    
    // 최소 3개 이상의 스코어가 있는 경우만 분석
    if (memberScores.length >= 3) {
      // 처음 3개와 마지막 3개 스코어의 평균 비교
      const firstThree = memberScores.slice(0, 3);
      const lastThree = memberScores.slice(-3);
      
      const firstAvg = firstThree.reduce((sum, item) => sum + item.gross_score, 0) / firstThree.length;
      const lastAvg = lastThree.reduce((sum, item) => sum + item.gross_score, 0) / lastThree.length;
      
      // 향상도 계산 (음수가 좋아진 것)
      const improvement = lastAvg - firstAvg;
      const improvementRate = (improvement / firstAvg) * 100;
      
      // 첫 라운드와 마지막 라운드 날짜
      const firstDate = firstThree[0].date;
      const lastDate = lastThree[lastThree.length - 1].date;
      
      result.push({
        id: member.id,
        name: member.name,
        generation: member.generation,
        gender: member.gender,
        firstAverage: parseFloat(firstAvg.toFixed(1)),
        lastAverage: parseFloat(lastAvg.toFixed(1)),
        improvement: parseFloat(improvement.toFixed(1)),
        improvementRate: parseFloat(improvementRate.toFixed(1)),
        gamesPlayed: memberScores.length,
        firstDate,
        lastDate,
        dateDiff: Math.floor((lastDate - firstDate) / (1000 * 60 * 60 * 24)) // 일수 차이
      });
    }
  });
  
  // 향상도순으로 정렬 (음수가 가장 좋아진 순)
  return result.sort((a, b) => a.improvement - b.improvement);
}

/**
 * 모임별 통계 데이터 생성
 * @param {Object} data 필터링된 데이터
 * @returns {Array} 모임별 통계 데이터
 */
export function getMeetingStats(data) {
  const { meetings, scores, members } = data;
  
  return meetings.map(meeting => {
    // 해당 모임의 모든 스코어
    const meetingScores = scores.filter(score => score.meeting_id === meeting.id);
    
    // 참가자 수
    const participantCount = meetingScores.length;
    
    // 평균 스코어 계산
    const avgScore = participantCount > 0
      ? meetingScores.reduce((sum, score) => sum + score.gross_score, 0) / participantCount
      : null;
    
    // 베스트 스코어 및 회원
    let bestScore = null;
    let bestScoreMemberId = null;
    
    if (participantCount > 0) {
      bestScore = Math.min(...meetingScores.map(score => score.gross_score));
      const bestScoreRecord = meetingScores.find(score => score.gross_score === bestScore);
      bestScoreMemberId = bestScoreRecord ? bestScoreRecord.member_id : null;
    }
    
    // 베스트 회원 이름 찾기
    let bestScoreMemberName = null;
    if (bestScoreMemberId) {
      const member = members.find(m => m.id === bestScoreMemberId);
      bestScoreMemberName = member ? member.name : null;
    }
    
    // 참가자 성별 비율
    const maleCount = meetingScores.filter(score => {
      const member = members.find(m => m.id === score.member_id);
      return member && member.gender === '남성';
    }).length;
    
    const femaleCount = participantCount - maleCount;
    
    return {
      ...meeting,
      participantCount,
      avgScore: avgScore !== null ? parseFloat(avgScore.toFixed(1)) : null,
      bestScore,
      bestScoreMemberId,
      bestScoreMemberName,
      maleCount,
      femaleCount,
      genderRatio: participantCount > 0 ? {
        male: parseFloat((maleCount / participantCount * 100).toFixed(1)),
        female: parseFloat((femaleCount / participantCount * 100).toFixed(1))
      } : null
    };
  });
}

/**
 * 특별상 통계 데이터 생성
 * @param {Object} data 필터링된 데이터
 * @returns {Object} 특별상 통계 데이터
 */
export function getSpecialAwardStats(data) {
  const { specialAwards = [], members } = data;  // 기본값 추가
  
  // 회원별 수상 횟수
  const awardsByMember = {};
  const awardCategories = new Set();
  
  specialAwards.forEach(award => {
    if (!awardsByMember[award.member_id]) {
      awardsByMember[award.member_id] = {};
    }
    
    const category = award.category;
    awardCategories.add(category);
    
    if (!awardsByMember[award.member_id][category]) {
      awardsByMember[award.member_id][category] = 0;
    }
    
    awardsByMember[award.member_id][category]++;
  });
  
  // 결과 데이터 구성
  const result = {
    memberAwards: [],
    categories: Array.from(awardCategories)
  };
  
  for (const memberId in awardsByMember) {
    const member = members.find(m => m.id === parseInt(memberId));  // parseInt 추가
    if (!member) continue;
    
    const memberData = {
      id: memberId,
      name: member.name,
      generation: member.generation,
      gender: member.gender,
      totalAwards: 0,
      categories: {}
    };
    
    // 각 카테고리별 수상 횟수 및 총합
    for (const category of awardCategories) {
      const count = awardsByMember[memberId][category] || 0;
      memberData.categories[category] = count;
      memberData.totalAwards += count;
    }
    
    result.memberAwards.push(memberData);
  }
  
  // 총 수상 횟수로 정렬
  result.memberAwards.sort((a, b) => b.totalAwards - a.totalAwards);
  
  return result;
}

/**
 * 회원별 참여율 계산
 * @param {Object} data 필터링된 데이터
 * @returns {Array} 회원별 참여율 데이터
 */
export function getParticipationRate(data) {
  const { members, meetings, scores } = data;
  
  const result = [];
  
  members.forEach(member => {
    const memberScores = scores.filter(score => score.member_id === member.id);
    const participatedMeetings = new Set(memberScores.map(score => score.meeting_id));
    const totalMeetings = meetings.length;
    const participationRate = totalMeetings > 0 
      ? (participatedMeetings.size / totalMeetings) * 100 
      : 0;
    
    result.push({
      id: member.id,
      name: member.name,
      generation: member.generation,
      gender: member.gender,
      participatedCount: participatedMeetings.size,
      totalMeetings: totalMeetings,
      participationRate: parseFloat(participationRate.toFixed(1))
    });
  });
  
  // 참여율 내림차순 정렬
  return result.sort((a, b) => b.participationRate - a.participationRate);
}

/**
 * 기수별 참여 데이터 생성
 * @param {Object} data 필터링된 데이터
 * @returns {Array} 기수별 참여 데이터
 */
export function getGenerationParticipationData(data) {
  const { members, scores } = data;
  
  // 기수별 회원 그룹화
  const membersByGeneration = {};
  const generationMembers = {};
  
  members.forEach(member => {
    const gen = member.generation;
    if (!membersByGeneration[gen]) {
      membersByGeneration[gen] = [];
      generationMembers[gen] = 0;
    }
    membersByGeneration[gen].push(member.id);
    generationMembers[gen]++;
  });
  
  // 기수별 참여 횟수 계산
  const result = [];
  
  for (const generation in membersByGeneration) {
    const memberIds = membersByGeneration[generation];
    const genScores = scores.filter(score => memberIds.includes(score.member_id));
    
    // 유니크한 회원 ID와 모임 ID 계산
    const uniqueMembers = new Set(genScores.map(score => score.member_id));
    const uniqueMeetings = new Set(genScores.map(score => score.meeting_id));
    
    // 참여율 계산
    const participationRate = generationMembers[generation] > 0
      ? (uniqueMembers.size / generationMembers[generation]) * 100
      : 0;
    
    result.push({
      generation: parseInt(generation),
      totalMembers: generationMembers[generation],
      activeMembers: uniqueMembers.size,
      participationRate: parseFloat(participationRate.toFixed(1)),
      totalRounds: genScores.length,
      uniqueMeetings: uniqueMeetings.size
    });
  }
  
  return result.sort((a, b) => a.generation - b.generation);
}

export function calculateSummaryStatsByYear(data) {
  const grouped = {};

  data.meetings.forEach(meeting => {
    const year = new Date(meeting.date).getFullYear();
    if (!grouped[year]) grouped[year] = { members: new Set(), meetings: [], scores: [] };
    grouped[year].meetings.push(meeting);
  });

  data.scores.forEach(score => {
    const meeting = data.meetings.find(m => m.id === score.meeting_id);
    if (!meeting) return;
    const year = new Date(meeting.date).getFullYear();
    if (!grouped[year]) return;
    grouped[year].scores.push(score);
    grouped[year].members.add(score.member_id);
  });

  const result = {};
  for (const year in grouped) {
    const group = grouped[year];
    result[year] = {
      members: [...group.members],
      scores: group.scores,
      meetings: group.meetings,
      specialAwards: []  // 필요 시 추가
    };
  }

  return result;
}
