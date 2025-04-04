// src/lib/dataService.js
import { db } from './firebase.js';
import { 
  collection, 
  getDocs, 
  getDoc,
  query, 
  orderBy, 
  where, 
  limit, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore';

/**
 * 모임 데이터 가져오기
 * @param {boolean} activeOnly - true면 현재 날짜 이후의 모임만 가져옴
 * @returns {Promise<Array>} - 모임 데이터 배열
 */
export async function getMeetings(activeOnly = false) {
  try {
    let meetingsQuery;
    
    if (activeOnly) {
      // 현재 날짜 이후의 모임만 가져오기
      const now = new Date();
      const isoDate = now.toISOString();
      meetingsQuery = query(
        collection(db, 'meetings'),
        where('date', '>=', isoDate),
        orderBy('date', 'asc')
      );
    } else {
      // 모든 모임 가져오기 (날짜 역순)
      meetingsQuery = query(
        collection(db, 'meetings'),
        orderBy('date', 'desc')
      );
    }
    
    const querySnapshot = await getDocs(meetingsQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting meetings:", error);
    console.error("오류 세부 내용:", error.message);
    console.error("오류 스택:", error.stack);
    
    // 오류 표시용 데이터 반환
    return [
      {
        id: 'error',
        date: new Date().toISOString(),
        name: "정보를 불러올 수 없습니다",
        event_no: null,
        type: "error",
        status: "오류",
        location: "데이터베이스 연결 오류",
        course: "",
        participants: [],
        description: "데이터베이스에서 모임 정보를 가져오는 중 오류가 발생했습니다."
      }
    ];
  }
}

/**
 * 특정 모임 데이터 가져오기
 * @param {string} meetingId - 모임 ID
 * @returns {Promise<Object|null>} - 모임 데이터 객체 또는 null
 */
export async function getMeeting(meetingId) {
  try {
    const meetingDoc = await getDoc(doc(db, 'meetings', meetingId));
    
    if (meetingDoc.exists()) {
      return {
        id: meetingDoc.id,
        ...meetingDoc.data()
      };
    } else {
      console.error(`Meeting with ID ${meetingId} not found`);
      return null;
    }
  } catch (error) {
    console.error(`Error getting meeting ${meetingId}:`, error);
    console.error("오류 세부 내용:", error.message);
    
    return {
      id: 'error',
      date: new Date().toISOString(),
      name: "정보를 불러올 수 없습니다",
      type: "error",
      status: "오류",
      location: "데이터베이스 연결 오류",
      course: ""
    };
  }
}

/**
 * 완료된 최근 모임 가져오기
 * @param {number} count - 가져올 모임 수
 * @returns {Promise<Array>} - 모임 데이터 배열
 */
export async function getRecentCompletedMeetings(count = 3) {
  try {
    const meetingsQuery = query(
      collection(db, 'meetings'),
      where('status', '==', '완료'),
      orderBy('date', 'desc'),
      limit(count)
    );
    
    const querySnapshot = await getDocs(meetingsQuery);
    
    if (querySnapshot.empty) {
      console.log("완료된 모임이 없습니다");
      return [
        {
          id: 'no-data',
          date: new Date().toISOString(),
          name: "완료된 모임이 없습니다",
          event_no: null,
          type: "no-data",
          status: "완료",
          location: "데이터 집계중입니다.",
          course: ""
        }
      ];
    }
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting recent completed meetings:", error);
    console.error("오류 세부 내용:", error.message);
    console.error("오류 스택:", error.stack);
    
    // 오류 표시용 데이터 반환
    return [
      {
        id: 'error',
        date: new Date().toISOString(),
        name: "정보를 불러올 수 없습니다",
        event_no: null,
        type: "error",
        status: "오류",
        location: "데이터베이스 연결 오류",
        course: ""
      }
    ];
  }
}

/**
 * 회원 데이터 가져오기
 * @returns {Promise<Array>} - 회원 데이터 배열
 */
export async function getMembers() {
  try {
    const querySnapshot = await getDocs(collection(db, 'members'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting members:", error);
    console.error("오류 세부 내용:", error.message);
    return [];
  }
}

/**
 * 특정 회원 데이터 가져오기
 * @param {string} memberId - 회원 ID
 * @returns {Promise<Object|null>} - 회원 데이터 객체 또는 null
 */
export async function getMember(memberId) {
  try {
    // 문자열 ID 확인
    const memberIdStr = String(memberId);
    const memberDoc = await getDoc(doc(db, 'members', memberIdStr));
    
    if (memberDoc.exists()) {
      return {
        id: memberDoc.id,
        ...memberDoc.data()
      };
    } else {
      console.error(`Member with ID ${memberId} not found`);
      return null;
    }
  } catch (error) {
    console.error(`Error getting member ${memberId}:`, error);
    console.error("오류 세부 내용:", error.message);
    return null;
  }
}

/**
 * 스코어 데이터 가져오기
 * @param {string|number|null} meetingId - 모임 ID
 * @returns {Promise<Array>} - 스코어 데이터 배열
 */
export async function getScores(meetingId = null) {
  try {
    let scoresQuery;
    
    if (meetingId) {
      // ID 타입 확인 및 변환
      let queryMeetingId = meetingId;
      if (typeof meetingId === 'string' && !isNaN(meetingId)) {
        queryMeetingId = Number(meetingId);
      }
      
      scoresQuery = query(
        collection(db, 'scores'),
        where('meeting_id', '==', queryMeetingId)
      );
    } else {
      scoresQuery = collection(db, 'scores');
    }
    
    const querySnapshot = await getDocs(scoresQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting scores:", error);
    console.error("오류 세부 내용:", error.message);
    return [];
  }
}

/**
 * 특정 모임의 스코어 데이터 가져오기
 * @param {string|number} meetingId - 모임 ID
 * @returns {Promise<Array>} - 스코어 데이터 배열
 */
export async function getScoresByMeeting(meetingId) {
  return getScores(meetingId);
}

/**
 * 특정 모임의 스코어 데이터 가져오기 (상위 n개, 회원 정보 포함)
 * @param {string|number} meetingId - 모임 ID
 * @param {number} count - 가져올 스코어 수
 * @returns {Promise<Array>} - 스코어 데이터 배열
 */
export async function getTopScoresByMeeting(meetingId, count = 3) {
  try {
    console.log(`모임 ID ${meetingId}의 스코어 가져오기 시도 (타입: ${typeof meetingId})`);
    
    // ID가 문자열이면 숫자로 변환 (데이터가 숫자로 저장된 경우)
    let queryMeetingId = meetingId;
    if (typeof meetingId === 'string' && !isNaN(meetingId)) {
      queryMeetingId = Number(meetingId);
      console.log(`문자열 ID를 숫자로 변환: ${meetingId} -> ${queryMeetingId}`);
    }
    
    // 해당 모임의 모든 스코어 가져오기
    const scoresQuery = query(
      collection(db, 'scores'),
      where('meeting_id', '==', queryMeetingId)
    );
    
    const scoresSnapshot = await getDocs(scoresQuery);
    console.log(`모임 ID ${queryMeetingId}에 대한 스코어 데이터 ${scoresSnapshot.docs.length}개 찾음`);
    
    if (scoresSnapshot.empty) {
      console.log(`모임 ID ${queryMeetingId}에 대한 스코어가 없습니다`);
      return [];
    }
    
    // 클라이언트에서 정렬 및 상위 n개 추출
    const allScores = scoresSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`모임 ID ${queryMeetingId}의 모든 스코어 데이터:`, allScores);
    
    // gross_score 기준 오름차순 정렬 및 상위 n개 추출
    const topScores = allScores
      .sort((a, b) => a.gross_score - b.gross_score)
      .slice(0, count);
    
    console.log(`모임 ID ${queryMeetingId}의 상위 ${count}개 스코어:`, topScores);
    
    // 회원 정보 가져오기
    const members = {};
    for (const score of topScores) {
      try {
        const memberId = score.member_id;
        if (!members[memberId]) {
          // 회원 ID가 숫자인 경우 문자열로 변환 시도
          const memberIdStr = typeof memberId === 'number' ? String(memberId) : memberId;
          console.log(`회원 정보 가져오기 시도 (ID: ${memberId}, 문자열: ${memberIdStr})`);
          
          const memberDoc = await getDoc(doc(db, 'members', memberIdStr));
          
          if (memberDoc.exists()) {
            members[memberId] = {
              id: memberId,
              ...memberDoc.data()
            };
            console.log(`회원 ID ${memberId}의 정보를 찾았습니다:`, members[memberId].name);
          } else {
            console.log(`회원 ID ${memberId}의 정보를 찾을 수 없음`);
            
            // 문자열이 아닌 경우 숫자로 다시 시도
            if (typeof memberId === 'string' && !isNaN(memberId)) {
              const numericMemberId = Number(memberId);
              const numericMemberDoc = await getDoc(doc(db, 'members', String(numericMemberId)));
              
              if (numericMemberDoc.exists()) {
                members[memberId] = {
                  id: memberId,
                  ...numericMemberDoc.data()
                };
                console.log(`숫자 변환 후 회원 ID ${numericMemberId}의 정보를 찾았습니다:`, members[memberId].name);
              }
            }
          }
        }
      } catch (memberError) {
        console.error(`회원 정보 로드 중 오류:`, memberError);
      }
    }
    
    // 스코어와 회원 정보 결합
    return topScores.map((score, index) => ({
      ...score,
      rank: index + 1,
      member_name: members[score.member_id]?.name || '데이터 집계중입니다.'
    }));
  } catch (error) {
    console.error(`Error getting top scores for meeting ${meetingId}:`, error);
    console.error(`상세 오류 정보:`, error.message);
    console.error(`오류 스택:`, error.stack);
    return [];
  }
}

/**
 * 최근 수상자 데이터 가져오기 (회원 정보 포함)
 * @param {number} count - 가져올 수상자 수
 * @returns {Promise<Array>} - 수상자 데이터 배열
 */
export async function getRecentScoresWithMembers(count = 5) {
  try {
    // 1. 가장 최근 모임 찾기
    const meetingsQuery = query(
      collection(db, 'meetings'),
      where('status', '==', '완료'),
      orderBy('date', 'desc'),
      limit(1)
    );
    
    const meetingsSnapshot = await getDocs(meetingsQuery);
    if (meetingsSnapshot.empty) {
      console.log("완료된 모임이 없습니다");
      return [
        {
          member_id: 'no-data',
          member_name: "데이터 집계중입니다.",
          gross_score: null,
          rank: null,
          meeting_id: 'no-data',
          meeting_name: "완료된 모임이 없습니다",
          meeting_date: new Date().toISOString()
        }
      ];
    }
    
    const latestMeeting = {
      id: meetingsSnapshot.docs[0].id,
      ...meetingsSnapshot.docs[0].data()
    };
    
    console.log(`최근 완료된 모임 정보:`, latestMeeting);
    
    // 2. 해당 모임의 스코어 가져오기 (그로스 스코어 기준 오름차순)
    // ID 타입 확인 및 변환
    let queryMeetingId = latestMeeting.id;
    if (typeof latestMeeting.event_no === 'number') {
      queryMeetingId = latestMeeting.event_no;
      console.log(`모임 ID 대신 event_no 사용: ${latestMeeting.id} -> ${queryMeetingId}`);
    }
    
    const scoresQuery = query(
      collection(db, 'scores'),
      where('meeting_id', '==', queryMeetingId),
      orderBy('gross_score', 'asc'),
      limit(count)
    );
    
    const scoresSnapshot = await getDocs(scoresQuery);
    console.log(`모임 ID ${queryMeetingId}에 대한 스코어 데이터 ${scoresSnapshot.docs.length}개 찾음`);
    
    if (scoresSnapshot.empty) {
      // 문서 ID로 다시 시도
      console.log(`event_no로 찾지 못해 문서 ID로 다시 시도: ${latestMeeting.id}`);
      const idScoresQuery = query(
        collection(db, 'scores'),
        where('meeting_id', '==', latestMeeting.id),
        orderBy('gross_score', 'asc'),
        limit(count)
      );
      
      const idScoresSnapshot = await getDocs(idScoresQuery);
      if (idScoresSnapshot.empty) {
        console.log(`문서 ID로도 스코어를 찾지 못했습니다`);
        return [
          {
            member_id: 'no-data',
            member_name: "데이터 집계중입니다.",
            gross_score: null,
            rank: null,
            meeting_id: latestMeeting.id,
            meeting_name: latestMeeting.name,
            meeting_date: latestMeeting.date
          }
        ];
      }
      
      const scores = idScoresSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      console.log(`문서 ID로 스코어 ${scores.length}개를 찾았습니다`);
      
      // 3. 회원 정보 가져오기
      const membersSnapshot = await getDocs(collection(db, 'members'));
      const members = {};
      
      membersSnapshot.docs.forEach(doc => {
        members[doc.id] = {
          id: doc.id,
          ...doc.data()
        };
      });
      
      // 4. 스코어와 회원 정보 결합
      return scores.map((score, index) => ({
        ...score,
        rank: index + 1,
        member_name: members[score.member_id]?.name || '데이터 집계중입니다.',
        meeting_name: latestMeeting.name,
        meeting_date: latestMeeting.date
      }));
    }
    
    const scores = scoresSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // 3. 회원 정보 가져오기
    const membersSnapshot = await getDocs(collection(db, 'members'));
    const members = {};
    
    membersSnapshot.docs.forEach(doc => {
      members[doc.id] = {
        id: doc.id,
        ...doc.data()
      };
    });
    
    // 4. 스코어와 회원 정보 결합
    return scores.map((score, index) => ({
      ...score,
      rank: index + 1,
      member_name: members[score.member_id]?.name || '데이터 집계중입니다.',
      meeting_name: latestMeeting.name,
      meeting_date: latestMeeting.date
    }));
  } catch (error) {
    console.error("Error getting recent scores with members:", error);
    console.error("오류 세부 내용:", error.message);
    console.error("오류 스택:", error.stack);
    
    // 오류 표시용 데이터 반환
    return [
      {
        member_id: 'error',
        member_name: "데이터 집계중입니다.",
        gross_score: null,
        rank: null,
        meeting_id: 'error',
        meeting_name: "정보를 불러올 수 없습니다",
        meeting_date: new Date().toISOString()
      }
    ];
  }
}

/**
 * 수상내역이 있는 최근 3개월 데이터 가져오기
 * @returns {Promise<Object>} - 수상내역 및 모임 데이터 객체
 */
export async function getRecentThreeMonthsAwards() {
  try {
    console.log("최근 수상내역 가져오기 시작");

    // 최근 완료된 모임 가져오기 (최대 3개)
    const recentMeetings = await getRecentCompletedMeetings(3);
    console.log(`완료된 모임 ${recentMeetings.length}개 찾음`);
    
    // no-data 타입이거나 error 타입인 경우 처리
    if (recentMeetings.length === 0 || 
        recentMeetings[0].type === 'no-data' || 
        recentMeetings[0].type === 'error') {
      console.log("가져온 모임이 없거나 오류 상태입니다");
      return { 
        awards: [
          {
            award_type: recentMeetings[0]?.type === 'error' ? 'error' : 'no-data',
            member_name: "데이터 집계중입니다.",
            meeting_name: recentMeetings[0]?.name || "정보를 불러올 수 없습니다",
            meeting_date: new Date().toISOString()
          }
        ], 
        meetings: recentMeetings 
      };
    }
    
    // 회원 정보 가져오기
    const membersSnapshot = await getDocs(collection(db, 'members'));
    const members = {};
    membersSnapshot.docs.forEach(doc => {
      members[doc.id] = {
        id: doc.id,
        ...doc.data()
      };
    });
    console.log(`회원 정보 ${Object.keys(members).length}개 로드됨`);
    
    // 각 모임의 수상자 데이터 가져오기
    const allAwards = [];
    const processedMeetings = [];
    
    for (const meeting of recentMeetings) {
      // 오류 모임은 건너뛰기
      if (meeting.type === 'error' || meeting.type === 'no-data') {
        console.log(`${meeting.type} 타입 모임은 처리하지 않고 건너뜁니다.`);
        continue;
      }
      
      console.log(`모임 처리 중: ${meeting.id} - ${meeting.name}`);
      let meetingHasAwards = false;
      
      // 모임 ID와 event_no 준비
      const meetingId = meeting.id;
      const meetingEventNo = typeof meeting.event_no === 'string' 
        ? parseInt(meeting.event_no, 10) 
        : meeting.event_no;
      
      console.log(`모임 ID: ${meetingId}, event_no: ${meetingEventNo}`);
      
      // 메달리스트 데이터 가져오기 (그로스 스코어 기준 상위 3명)
      // 먼저 event_no로 시도
      let topScores = [];
      if (meetingEventNo) {
        console.log(`event_no(${meetingEventNo})로 스코어 조회 시도`);
        const eventNoScores = await getTopScoresByMeeting(meetingEventNo, 3);
        if (eventNoScores.length > 0) {
          console.log(`event_no로 ${eventNoScores.length}개의 스코어를 찾았습니다`);
          topScores = eventNoScores;
        }
      }
      
      // event_no로 찾지 못했으면 id로 시도
      if (topScores.length === 0 && meetingId) {
        console.log(`ID(${meetingId})로 스코어 조회 시도`);
        const idScores = await getTopScoresByMeeting(meetingId, 3);
        if (idScores.length > 0) {
          console.log(`ID로 ${idScores.length}개의 스코어를 찾았습니다`);
          topScores = idScores;
        }
      }
      
      if (topScores.length > 0) {
        meetingHasAwards = true;
        const medalAwards = topScores.map(score => ({
          id: score.id,
          award_type: 'medal',
          rank: score.rank,
          member_id: score.member_id,
          member_name: score.member_name || members[score.member_id]?.name || '데이터 집계중입니다.',
          gross_score: score.gross_score,
          meeting_id: meeting.id,
          meeting_name: meeting.name,
          meeting_date: meeting.date
        }));
        
        allAwards.push(...medalAwards);
        console.log(`${meeting.id}: ${medalAwards.length}개의 메달 추가됨`);
      }
      
      // 특별상 데이터 가져오기
      // 특별상 조회 함수
      async function querySpecialAwards(meetingIdValue) {
        const specialAwardsQuery = query(
          collection(db, 'special_awards'),
          where('meeting_id', '==', meetingIdValue)
        );
        
        const snapshot = await getDocs(specialAwardsQuery);
        return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      }
      
      // 먼저 event_no로 시도
      let specialAwards = [];
      if (meetingEventNo) {
        console.log(`event_no(${meetingEventNo})로 특별상 조회 시도`);
        const eventNoAwards = await querySpecialAwards(meetingEventNo);
        if (eventNoAwards.length > 0) {
          console.log(`event_no로 ${eventNoAwards.length}개의 특별상을 찾았습니다`);
          specialAwards = eventNoAwards;
        }
      }
      
      // event_no로 찾지 못했으면 id로 시도
      if (specialAwards.length === 0 && meetingId) {
        console.log(`ID(${meetingId})로 특별상 조회 시도`);
        const idAwards = await querySpecialAwards(meetingId);
        if (idAwards.length > 0) {
          console.log(`ID로 ${idAwards.length}개의 특별상을 찾았습니다`);
          specialAwards = idAwards;
        }
      }
      
      if (specialAwards.length > 0) {
        meetingHasAwards = true;
        const processedSpecialAwards = specialAwards.map(award => {
          // 회원 ID로 회원 정보 조회
          const memberId = award.member_id;
          const memberInfo = members[memberId];
          
          return {
            id: award.id,
            award_type: 'special',
            ...award,
            member_name: award.member_name || memberInfo?.name || '데이터 집계중입니다.',
            meeting_name: meeting.name,
            meeting_date: meeting.date
          };
        });
        
        allAwards.push(...processedSpecialAwards);
        console.log(`${meeting.id}: ${processedSpecialAwards.length}개의 특별상 추가됨`);
      }
      
      // 수상내역이 있는 모임만 추가
      if (meetingHasAwards) {
        processedMeetings.push(meeting);
        console.log(`${meeting.id}: 수상내역이 있어 처리된 모임에 추가됨`);
      } else {
        console.log(`${meeting.id}: 수상내역이 없음`);
      }
    }
    
    console.log(`총 수상내역: ${allAwards.length}개, 처리된 모임: ${processedMeetings.length}개`);
    
    // 수상 내역이 없는 경우
    if (allAwards.length === 0) {
      console.log("수상내역이 없습니다");
      return {
        awards: [
          {
            award_type: 'no-data',
            member_id: 'none',
            member_name: "데이터 집계중입니다.",
            meeting_id: 'none',
            meeting_name: "수상 내역이 없습니다",
            meeting_date: new Date().toISOString()
          }
        ],
        meetings: recentMeetings
      };
    }
    
    return {
      awards: allAwards,
      meetings: processedMeetings.length > 0 ? processedMeetings : recentMeetings
    };
  } catch (error) {
    console.error("Error getting recent awards:", error);
    console.error("상세 오류:", error.message);
    console.error("오류 스택:", error.stack);
    
    // 오류 발생 시 오류 표시 데이터 반환
    return {
      awards: [
        {
          award_type: 'error',
          rank: null,
          member_id: 'error',
          member_name: "데이터 집계중입니다.",
          gross_score: null,
          meeting_id: 'error',
          meeting_name: "정보를 불러올 수 없습니다",
          meeting_date: new Date().toISOString()
        }
      ],
      meetings: [
        { id: 'error', name: "정보를 불러올 수 없습니다", date: new Date().toISOString() }
      ]
    };
  }
}

/**
 * 특정 시즌의 전체 수상자 목록 가져오기 (회원 정보 포함)
 * @param {number|null} year - 연도
 * @returns {Promise<Array>} - 수상자 데이터 배열
 */
export async function getAwardsByYear(year = null) {
  try {
    const currentYear = year || new Date().getFullYear();
    
    // 해당 연도의 모임 찾기
    const startDate = new Date(currentYear, 0, 1).toISOString();
    const endDate = new Date(currentYear + 1, 0, 1).toISOString();
    
    const meetingsQuery = query(
      collection(db, 'meetings'),
      where('date', '>=', startDate),
      where('date', '<', endDate),
      where('status', '==', '완료'),
      orderBy('date', 'desc')
    );
    
    const meetingsSnapshot = await getDocs(meetingsQuery);
    if (meetingsSnapshot.empty) {
      console.log(`${currentYear}년도의 완료된 모임이 없습니다`);
      return [];
    }
    
    const meetings = meetingsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // 회원 정보 가져오기
    const membersSnapshot = await getDocs(collection(db, 'members'));
    const members = {};
    
    membersSnapshot.docs.forEach(doc => {
      members[doc.id] = {
        id: doc.id,
        ...doc.data()
      };
    });
    
    // 각 모임별 수상자 데이터 가져오기
    const result = [];
    
    for (const meeting of meetings) {
      const meetingId = meeting.id;
      const meetingEventNo = typeof meeting.event_no === 'string' 
        ? parseInt(meeting.event_no, 10) 
        : meeting.event_no;
      
      // 메달리스트 (상위 3명) 가져오기 - 먼저 event_no로 시도
      let medalAwards = [];
      if (meetingEventNo) {
        medalAwards = await getTopScoresByMeeting(meetingEventNo, 3);
      }
      
      // event_no로 못 찾았으면 id로 시도
      if (medalAwards.length === 0 && meetingId) {
        medalAwards = await getTopScoresByMeeting(meetingId, 3);
      }
      
      // 특별상 가져오기 - 먼저 event_no로 시도
      let specialAwards = [];
      if (meetingEventNo) {
        const specialAwardsQuery = query(
          collection(db, 'special_awards'),
          where('meeting_id', '==', meetingEventNo)
        );
        
        const specialSnapshot = await getDocs(specialAwardsQuery);
        if (!specialSnapshot.empty) {
          specialAwards = specialSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              award_type: 'special',
              ...data,
              member_name: data.member_name || members[data.member_id]?.name || '데이터 집계중입니다.'
            };
          });
        }
      }
      
      // event_no로 못 찾았으면 id로 시도
      if (specialAwards.length === 0 && meetingId) {
        const specialAwardsQuery = query(
          collection(db, 'special_awards'),
          where('meeting_id', '==', meetingId)
        );
        
        const specialSnapshot = await getDocs(specialAwardsQuery);
        if (!specialSnapshot.empty) {
          specialAwards = specialSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              award_type: 'special',
              ...data,
              member_name: data.member_name || members[data.member_id]?.name || '데이터 집계중입니다.'
            };
          });
        }
      }
      
      if (medalAwards.length > 0 || specialAwards.length > 0) {
        result.push({
          meeting: meeting,
          medals: medalAwards,
          specials: specialAwards
        });
      }
    }
    
    return result;
  } catch (error) {
    console.error("Error getting awards by year:", error);
    console.error("오류 세부 내용:", error.message);
    console.error("오류 스택:", error.stack);
    return [];
  }
}

/**
 * 특별상 관련 함수들
 */

/**
 * 특별상 생성
 * @param {Object} awardData - 특별상 데이터
 * @returns {Promise<Object>} - 생성된 특별상 데이터
 */
export async function createSpecialAward(awardData) {
  try {
    const docRef = await addDoc(collection(db, 'special_awards'), {
      ...awardData,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });
    return { id: docRef.id, ...awardData };
  } catch (error) {
    console.error("Error creating special award:", error);
    console.error("오류 세부 내용:", error.message);
    throw error;
  }
}

/**
 * 특별상 가져오기 (모임 ID로)
 * @param {string|number} meetingId - 모임 ID
 * @returns {Promise<Array>} - 특별상 데이터 배열
 */
export async function getSpecialAwardsByMeeting(meetingId) {
  try {
    // ID 타입 확인 및 변환
    let queryMeetingId = meetingId;
    if (typeof meetingId === 'string' && !isNaN(meetingId)) {
      queryMeetingId = Number(meetingId);
    }
    
    const specialAwardsQuery = query(
      collection(db, 'special_awards'),
      where('meeting_id', '==', queryMeetingId)
    );
    
    const querySnapshot = await getDocs(specialAwardsQuery);
    const specialAwards = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // ID로 찾지 못했고, 형식이 다른 경우 다시 시도
    if (specialAwards.length === 0 && typeof meetingId !== 'string') {
      const stringQuery = query(
        collection(db, 'special_awards'),
        where('meeting_id', '==', String(meetingId))
      );
      
      const stringSnapshot = await getDocs(stringQuery);
      return stringSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    }
    
    return specialAwards;
  } catch (error) {
    console.error("Error getting special awards:", error);
    console.error("오류 세부 내용:", error.message);
    return [];
  }
}

/**
 * 특별상 가져오기 (카테고리로)
 * @param {string} category - 특별상 카테고리
 * @param {number} limit - 가져올 최대 개수
 * @returns {Promise<Array>} - 특별상 데이터 배열
 */
export async function getSpecialAwardsByCategory(category, limit = 10) {
  try {
    const specialAwardsQuery = query(
      collection(db, 'special_awards'),
      where('category', '==', category),
      orderBy('created_at', 'desc'),
      limit(limit)
    );
    
    const querySnapshot = await getDocs(specialAwardsQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error getting ${category} awards:`, error);
    console.error("오류 세부 내용:", error.message);
    return [];
  }
}

/**
 * 특별상 수정
 * @param {string} awardId - 특별상 ID
 * @param {Object} updatedData - 수정할 데이터
 * @returns {Promise<Object>} - 수정된 특별상 데이터
 */
export async function updateSpecialAward(awardId, updatedData) {
  try {
    const awardRef = doc(db, 'special_awards', awardId);
    await updateDoc(awardRef, {
      ...updatedData,
      updated_at: serverTimestamp()
    });
    return { id: awardId, ...updatedData };
  } catch (error) {
    console.error("Error updating special award:", error);
    console.error("오류 세부 내용:", error.message);
    throw error;
  }
}

/**
 * 특별상 삭제
 * @param {string} awardId - 특별상 ID
 * @returns {Promise<Object>} - 삭제 결과
 */
export async function deleteSpecialAward(awardId) {
  try {
    await deleteDoc(doc(db, 'special_awards', awardId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting special award:", error);
    console.error("오류 세부 내용:", error.message);
    throw error;
  }
}

// src/lib/dataService.js

function getMeetingById(id) {
  // 구현 내용
}

function getScoresByMeetingId(meetingId) {
  // 구현 내용
}

function getMemberById(id) {
  // 구현 내용
}

// 명확하게 모든 함수 export 처리
export { getMeetingById, getScoresByMeetingId, getMemberById };
