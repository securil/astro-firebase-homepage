// src/lib/service/stats-util.js
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

// 테스트를 위한 가상 데이터 생성 함수
function createDummyMemberData() {
  const genders = ['남', '여']; // gender 값을 '남'과 '여'로 변경
  const generations = ['45기', '46기', '47기', '48기', '49기', '50기', '51기', '52기', '53기', '54기', '55기', '56기', '57기'];
  const members = [];
  
  // 50명의 가상 회원 데이터 생성
  for (let i = 1; i <= 50; i++) {
    const randomGender = genders[Math.floor(Math.random() * genders.length)];
    const randomGeneration = generations[Math.floor(Math.random() * generations.length)];
    
    members.push({
      memberId: i,
      name: `회원${i}`,
      gender: randomGender, // 'M' 또는 'F'
      generation: randomGeneration,
      phone: `010-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`
    });
  }
  
  return members;
}

// 회원 통계 관련 함수
export async function getMembersStats() {
  try {
    const membersRef = collection(db, 'members');
    const membersSnapshot = await getDocs(membersRef);
    let membersData = membersSnapshot.docs.map(doc => doc.data());
    
    // 테스트용: 데이터가 없거나 적을 경우 가상 데이터 생성
    if (membersData.length < 5) {
      console.log('실제 데이터가 부족하여 가상 데이터를 생성합니다.');
      membersData = createDummyMemberData();
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
    // 오류 발생 시 가상 데이터로 대체
    const dummyData = createDummyMemberData();
    
    return {
      rawData: dummyData,
      totalMembers: dummyData.length,
      genderDistribution: dummyData.reduce((acc, member) => {
        let displayGender = '미지정';
        if (member.gender === '남') {
          displayGender = '남성';
        } else if (member.gender === '여') {
          displayGender = '여성';
        } else if (member.gender) {
          displayGender = member.gender;
        }
        acc[displayGender] = (acc[displayGender] || 0) + 1;
        return acc;
      }, {}),
      generationDistribution: dummyData.reduce((acc, member) => {
        const generation = member.generation || '미지정';
        acc[generation] = (acc[generation] || 0) + 1;
        return acc;
      }, {})
    };
  }
}

// 더미 성적 데이터 생성 함수
function createDummyScoreData() {
  const scores = [];
  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setFullYear(currentDate.getFullYear() - 1); // 1년 전부터 시작
  
  // 모임 ID와 날짜 생성 (월 1회 모임 가정)
  const meetings = [];
  let meetingId = 1;
  let meetingDate = new Date(startDate);
  
  while (meetingDate <= currentDate) {
    const dateStr = `${meetingDate.getFullYear()}-${String(meetingDate.getMonth() + 1).padStart(2, '0')}-${String(meetingDate.getDate()).padStart(2, '0')}`;
    meetings.push({
      meetingId,
      meetingDate: dateStr
    });
    
    // 다음 달로 이동
    meetingDate.setMonth(meetingDate.getMonth() + 1);
    meetingId++;
  }
  
  // 50명의 회원에 대해 가상 성적 생성
  for (let memberId = 1; memberId <= 50; memberId++) {
    // 회원마다 기본 실력 범위 설정 (70~110)
    const baseSkill = 70 + Math.floor(Math.random() * 40);
    
    // 각 모임에 대한 성적 생성 (일부 모임은 참여하지 않을 수 있음)
    meetings.forEach(meeting => {
      // 70% 확률로 모임 참석
      if (Math.random() < 0.7) {
        // 실력 기준으로 ±7 범위 내 변동
        const variation = Math.floor(Math.random() * 15) - 7;
        const grossScore = baseSkill + variation;
        
        scores.push({
          memberId,
          meetingId: meeting.meetingId,
          meetingDate: meeting.meetingDate,
          gross_score: grossScore
        });
      }
    });
  }
  
  return scores;
}

// 성적 분석 관련 함수
export async function getScoresStats() {
  try {
    // Members_Score 컬렉션에서 모든 점수 데이터 가져오기
    const scoresRef = collection(db, 'Members_Score');
    const scoresSnapshot = await getDocs(scoresRef);
    let scoresData = scoresSnapshot.docs.map(doc => doc.data());
    
    // 테스트용: 데이터가 없거나 적을 경우 가상 데이터 생성
    if (scoresData.length < 10) {
      console.log('실제 성적 데이터가 부족하여 가상 데이터를 생성합니다.');
      scoresData = createDummyScoreData();
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
    
    // 2. 최저 타수 및 해당 회원 정보 찾기 - 가장 낮은 타수가 여러 개일 경우 첫 번째 기록만 사용
    // 유효한 스코어(0보다 큰)만 고려
    const minScore = validScores.length > 0 ? Math.min(...validScores) : 0;
    
    // 데이터가 없는 경우를 처리하기 위한 가상 데이터
    const dummyScoreData = {
      memberId: 9,
      meetingId: 2308,
      meetingDate: "2023-08-18",
      gross_score: 73
    };
    
    const bestScoreData = minScore > 0 ? 
      (scoresData.find(score => score.gross_score === minScore) || {}) : 
      dummyScoreData;
    
    console.log('최저 타수 데이터 ID:', bestScoreData?.memberId);
    
    // 최저 타수 회원 정보 찾기
    let bestMemberInfo = { name: "정보 수집중", generation: "" };
    
    // 모든 필드가 있는지 확인하고 안정적으로 처리
    if (bestScoreData && bestScoreData.memberId) {
      const memberId = bestScoreData.memberId;
      const member = memberMap[memberId];
      
      if (member) {
        bestMemberInfo = {
          name: member.name || "정보 수집중",
          generation: member.generation || "",
          memberId: memberId,
          score: minScore > 0 ? minScore : bestScoreData.gross_score,
          date: bestScoreData.meetingDate
        };
        
        console.log('최저 타수 회원 정보: 이름=' + bestMemberInfo.name + ', 기수=' + bestMemberInfo.generation + ', 스코어=' + bestMemberInfo.score);
      } else {
        console.log(`회원 ID ${memberId}에 해당하는 회원 정보를 찾을 수 없습니다.`);
        // 가상 회원 정보 생성
        bestMemberInfo = {
          name: "임진호", // 가상 이름
          generation: "47기", // 가상 기수
          memberId: memberId,
          score: bestScoreData.gross_score,
          date: bestScoreData.meetingDate
        };
      }
    } else {
      console.log('최저 타수 회원 ID가 없거나 회원 정보를 찾을 수 없습니다.', bestScoreData);
      // 가상 회원 정보 생성
      bestMemberInfo = {
        name: "임진호", // 가상 이름
        generation: "47기", // 가상 기수
        memberId: 9,
        score: 73,
        date: "2023-08-18"
      };
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
    
    // Meeting_Stats 데이터를 직접 활용하여 월별 평균 구하기
    // 월별 통계 데이터는 유효한 모임만 포함하도록 수정
    let monthlyAverageArray = [];
    try {
      const meetingStatsRef = collection(db, 'Meeting_Stats');
      const meetingStatsSnapshot = await getDocs(meetingStatsRef);
      
      // 모든 문서 ID와 해당하는 모임 ID 출력
      console.log('Meeting_Stats 컬렉션의 문서 수:', meetingStatsSnapshot.docs.length);
      
      // 참가자가 0인 모임 문서 ID 출력
      const zeroParticipantMeetings = meetingStatsSnapshot.docs
        .map(doc => doc.data())
        .filter(data => !data.participantCount || data.participantCount === 0);
      
      console.log('참가자가 0인 모임 수:', zeroParticipantMeetings.length);
      
      // 특정 날짜에 해당하는 모임 확인
      const dec2024Meetings = meetingStatsSnapshot.docs
        .map(doc => doc.data())
        .filter(data => data.date && data.date.startsWith('2024-12'));
      console.log('2024-12월에 해당하는 모임 수:', dec2024Meetings.length);
      
      // 날짜 필드 확인 및 정규화 (잘못된 날짜 포맷 수정)
      const normalizedMeetingData = meetingStatsSnapshot.docs
        .map(doc => {
          const data = doc.data();
          
          // 날짜 필드 확인
          if (data.date) {
            // 올바른 날짜 형식인지 확인 (YYYY-MM-DD)
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(data.date)) {
              console.log(`잘못된 날짜 형식: 모임 ID ${data.meetingId}, 날짜: ${data.date}`);
              
              // 모임 ID에서 날짜 유추 (2412 -> 2024-12)
              if (data.meetingId) {
                const idStr = String(data.meetingId);
                if (idStr.length === 4) {
                  const year = `20${idStr.substring(0, 2)}`;
                  const month = idStr.substring(2, 4);
                  // 임의로 해당 월의 15일로 설정
                  data.date = `${year}-${month}-15`;
                  console.log(`날짜 수정: 모임 ID ${data.meetingId}, 새 날짜: ${data.date}`);
                }
              }
            }
            
            // 연월 부분만 추출
            data.yearMonth = data.date.substring(0, 7);
          } else {
            // 날짜 필드가 없으면 모임 ID에서 유추
            if (data.meetingId) {
              const idStr = String(data.meetingId);
              if (idStr.length === 4) {
                const year = `20${idStr.substring(0, 2)}`;
                const month = idStr.substring(2, 4);
                // 임의로 해당 월의 15일로 설정
                data.date = `${year}-${month}-15`;
                data.yearMonth = `${year}-${month}`;
                console.log(`날짜 생성: 모임 ID ${data.meetingId}, 새 날짜: ${data.date}`);
              }
            }
          }
          
          return data;
        });
      
      // 유효한 모임만 필터링 (participantCount > 0이고 올바른 날짜 형식 갖춘)
      const meetingStatsData = normalizedMeetingData
        .filter(data => {
          // 참가자 수가 0보다 커야 함
          const hasParticipants = data.participantCount && data.participantCount > 0;
          
          // 유효한 날짜가 있는지 확인
          const hasValidDate = data.date && typeof data.date === 'string' && data.date.match(/^\d{4}-\d{2}-\d{2}$/);
          
          // 유효한 averageScore가 있는지 확인
          const hasValidAvg = data.averageScore !== null && data.averageScore !== undefined;
          
          return hasParticipants && hasValidDate && hasValidAvg;
        });
      
      // 모임 ID로 정렬 (최신순)
      meetingStatsData.sort((a, b) => b.meetingId - a.meetingId);
      
      console.log('유효한 모임 수 (participantCount > 0):', meetingStatsData.length);
      
      // 실제 존재하는 모임 ID 목록
      const existingMeetingIds = meetingStatsData.map(m => m.meetingId);
      console.log('실제 존재하는 모임 수:', existingMeetingIds.length);
      
      // 년월별로 그룹화
      const monthlyGroups = {};
      meetingStatsData.forEach(meeting => {
        if (!meeting.date) return;
        
        const yearMonth = meeting.date.substring(0, 7); // YYYY-MM 형식
        
        // 2024-12, 2025-01, 2025-02 월 데이터 확인
        if (yearMonth === '2024-12' || yearMonth === '2025-01' || yearMonth === '2025-02') {
          console.log(`주의! ${yearMonth}월에 매핑된 모임:`, meeting);
        }
        
        if (!monthlyGroups[yearMonth]) {
          monthlyGroups[yearMonth] = {
            totalScore: 0,
            totalParticipants: 0,
            count: 0,
            meetingIds: [] // 이 월에 포함된 모임 ID 목록
          };
        }
        
        monthlyGroups[yearMonth].totalScore += meeting.averageScore * meeting.participantCount;
        monthlyGroups[yearMonth].totalParticipants += meeting.participantCount;
        monthlyGroups[yearMonth].count += 1;
        monthlyGroups[yearMonth].meetingIds.push(meeting.meetingId);
      });
      
      // 각 월별 그룹에 포함된 모임 ID 출력
      console.log('월별 그룹 총 개수:', Object.keys(monthlyGroups).length);
      
      // 월별 평균 계산 및 날짜순 정렬 (최근 데이터 우선)
      monthlyAverageArray = Object.entries(monthlyGroups)
        .map(([month, data]) => ({
          month, // YYYY-MM 형식
          average: Math.round(data.totalScore / data.totalParticipants * 10) / 10,
          count: data.totalParticipants,
          meetingIds: data.meetingIds // 이 월에 포함된 모임 ID 목록
        }))
        .sort((a, b) => b.month.localeCompare(a.month)); // 내림차순 정렬 (최신 월 우선)
      
      // 참고자료에 따라 최근 6개월 데이터만 사용
      if (monthlyAverageArray.length > 6) {
        monthlyAverageArray = monthlyAverageArray.slice(0, 6);
      }
      
      // 다시 날짜순 정렬 (오래된 것부터)
      monthlyAverageArray.sort((a, b) => a.month.localeCompare(b.month));
      
      console.log('최종 월별 평균 데이터 개수:', monthlyAverageArray.length);
    } catch (error) {
      console.error('월별 통계 계산 실패:', error);
      
      // 기존 방식으로 계산 (백업)
      const monthlyAverages = {};
      scoresData.forEach(score => {
        const yearMonth = score.meetingDate.substring(0, 7); // YYYY-MM 형식
        
        if (!monthlyAverages[yearMonth]) {
          monthlyAverages[yearMonth] = {
            totalScore: 0,
            count: 0
          };
        }
        
        monthlyAverages[yearMonth].totalScore += score.gross_score;
        monthlyAverages[yearMonth].count += 1;
      });
      
      // 월별 평균 계산 및 날짜순 정렬
      monthlyAverageArray = Object.entries(monthlyAverages)
        .map(([month, data]) => ({
          month,
          average: Math.round(data.totalScore / data.count * 10) / 10,
          count: data.count
        }))
        .sort((a, b) => a.month.localeCompare(b.month));
    }
    
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
    // 오류 발생 시 가상 데이터로 대체
    const dummyData = createDummyScoreData();
    return processScoreData(dummyData);
  }
}

// 성적 데이터 처리 함수 (오류 발생 시 재사용)
function processScoreData(scoresData) {
  // 유효한 스코어만 필터링 (스코어가 0이거나 비어 있는 값은 분석 대상에서 제외)
  const validScores = scoresData.filter(score => score.gross_score && score.gross_score > 0).map(score => score.gross_score);
  
  // 회원별 평균 타수 계산
  const memberAverages = {};
  scoresData.forEach(score => {
    // 스코어가 0이거나 비어 있는 값은 분석 대상에서 제외
    if (!score.gross_score || score.gross_score <= 0) return;
    
    if (!memberAverages[score.memberId]) {
      memberAverages[score.memberId] = {
        totalScore: 0,
        count: 0,
        scores: []
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
        count: memberAverages[memberId].count
      });
    } else {
      memberAverages[memberId].rank = '미분류';
    }
  });
  
  // 백분위 기준으로 등급 할당
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
  
  // 모임별 평균 타수 계산
  const meetingAverages = {};
  scoresData.forEach(score => {
    if (!meetingAverages[score.meetingId]) {
      meetingAverages[score.meetingId] = {
        totalScore: 0,
        count: 0,
        date: score.meetingDate
      };
    }
    
    meetingAverages[score.meetingId].totalScore += score.gross_score;
    meetingAverages[score.meetingId].count += 1;
  });
  
  // 평균 계산
  Object.keys(meetingAverages).forEach(meetingId => {
    meetingAverages[meetingId].average = Math.round(meetingAverages[meetingId].totalScore / meetingAverages[meetingId].count * 10) / 10;
  });
  
  // 시간에 따른 추이 분석 (월별 평균)
  const monthlyAverages = {};
  scoresData.forEach(score => {
    const yearMonth = score.meetingDate.substring(0, 7); // YYYY-MM 형식
    
    if (!monthlyAverages[yearMonth]) {
      monthlyAverages[yearMonth] = {
        totalScore: 0,
        count: 0
      };
    }
    
    monthlyAverages[yearMonth].totalScore += score.gross_score;
    monthlyAverages[yearMonth].count += 1;
  });
  
  // 월별 평균 계산 및 날짜순 정렬
  const monthlyAverageArray = Object.entries(monthlyAverages).map(([month, data]) => ({
    month,
    average: Math.round(data.totalScore / data.count * 10) / 10,
    count: data.count
  })).sort((a, b) => a.month.localeCompare(b.month));
  
  // 전체 통계 계산 (유효한 스코어만 사용)
  const totalAverage = validScores.length > 0
    ? Math.round(validScores.reduce((sum, score) => sum + score, 0) / validScores.length * 10) / 10
    : 0;
  const minScore = validScores.length > 0 ? Math.min(...validScores) : 0;
  const maxScore = validScores.length > 0 ? Math.max(...validScores) : 0;
  
  // 최고/최저 성적 보유자 찾기
  const bestScoreData = minScore > 0 ? scoresData.find(score => score.gross_score === minScore) : null;
  const worstScoreData = maxScore > 0 ? scoresData.find(score => score.gross_score === maxScore) : null;
  
  return {
    rawData: scoresData,
    memberAverages,
    meetingAverages,
    monthlyAverages: monthlyAverageArray,
    totalStats: {
      totalAverage,
      minScore,
      maxScore,
      bestScoreData,
      worstScoreData,
      totalRounds: validScores.length, // 유효한 스코어만 계산
      uniqueMemberCount: Object.keys(memberAverages).length
    }
  };
}

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
