/**
 * @file schedule-util.js
 * @description 모임 일정 관련 유틸리티 함수들
 */

import { db } from '../firebase.js';
import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  where,
  limit as firestoreLimit,
  Timestamp
} from 'firebase/firestore';

// ===== 상수 정의 =====

/**
 * 모임 상태 유형
 * @readonly
 * @enum {string}
 */
export const MEETING_STATUS = {
  UPCOMING: '예정',
  COMPLETED: '완료',
  CANCELED: '취소'
};

/**
 * 모임 유형
 * @readonly
 * @enum {string}
 */
export const MEETING_TYPE = {
  REGULAR: 'regular',
  SPECIAL: 'special'
};

// ===== 테스트 데이터 =====

/**
 * 테스트용 모임 데이터
 * @type {Array<Object>}
 */
export const testMeetings = [
  {
    id: 1,
    date: new Date(2025, 3, 22).toISOString(), // 4월
    name: "4월 정기 모임",
    event_no: 251,
    type: MEETING_TYPE.REGULAR,
    status: MEETING_STATUS.UPCOMING,
    location: "용인 CC",
    course: "서코스",
    participants: [],
    description: "4월 정기 모임입니다."
  },
  {
    id: 2,
    date: new Date(2025, 4, 27).toISOString(), // 5월
    name: "5월 정기 모임",
    event_no: 252,
    type: MEETING_TYPE.REGULAR,
    status: MEETING_STATUS.UPCOMING,
    location: "레이크사이드 CC",
    course: "마운틴",
    participants: [],
    description: "5월 정기 모임입니다."
  },
  {
    id: 3,
    date: new Date(2025, 5, 24).toISOString(), // 6월
    name: "6월 정기 모임",
    event_no: 253,
    type: MEETING_TYPE.REGULAR,
    status: MEETING_STATUS.UPCOMING,
    location: "남서울 CC",
    course: "남코스",
    participants: [],
    description: "6월 정기 모임입니다."
  },
  {
    id: 4,
    date: new Date(2025, 7, 26).toISOString(), // 8월
    name: "8월 정기 모임",
    event_no: 254,
    type: MEETING_TYPE.REGULAR,
    status: MEETING_STATUS.UPCOMING,
    location: "블루원 용인 CC",
    course: "블루코스",
    participants: [],
    description: "8월 정기 모임입니다."
  },
  {
    id: 5,
    date: new Date(2025, 8, 23).toISOString(), // 9월
    name: "9월 정기 모임",
    event_no: 255,
    type: MEETING_TYPE.REGULAR,
    status: MEETING_STATUS.UPCOMING,
    location: "88 CC",
    course: "서코스",
    participants: [],
    description: "9월 정기 모임입니다."
  },
  {
    id: 6, 
    date: new Date(2025, 9, 28).toISOString(), // 10월
    name: "10월 정기 모임",
    event_no: 256,
    type: MEETING_TYPE.REGULAR,
    status: MEETING_STATUS.UPCOMING,
    location: "아난티 CC",
    course: "아난티코스",
    participants: [],
    description: "10월 정기 모임입니다."
  },
  {
    id: 7,
    date: new Date(2025, 10, 22).toISOString(), // 11월
    name: "11월 정기 모임",
    event_no: 257,
    type: MEETING_TYPE.REGULAR,
    status: MEETING_STATUS.UPCOMING,
    location: "양주 CC",
    course: "서코스",
    participants: [],
    description: "11월 정기 모임입니다."
  },
  {
    id: 8,
    date: new Date(2025, 11, 20).toISOString(), // 12월
    name: "12월 정기 모임",
    event_no: 258,
    type: MEETING_TYPE.REGULAR,
    status: MEETING_STATUS.UPCOMING, 
    location: "세븐힐스 CC",
    course: "서코스",
    participants: [],
    description: "12월 정기 모임입니다."
  }
];

// ===== 유틸리티 함수 =====

/**
 * 오류 발생 시 반환할 기본 데이터 생성
 * @param {string} [errorMessage="데이터베이스 연결 오류"] - 오류 메시지
 * @param {string} [errorCode="UNKNOWN"] - 오류 코드
 * @returns {Object} 오류 정보를 담은 객체
 */
function createErrorMeeting(errorMessage = "데이터베이스 연결 오류", errorCode = "UNKNOWN") {
  return {
    id: 'error',
    date: new Date().toISOString(),
    name: "정보를 불러올 수 없습니다",
    event_no: null,
    type: "error",
    status: "오류",
    location: errorMessage,
    course: "",
    participants: [],
    description: `오류 코드: ${errorCode}`,
    isError: true // 오류 객체 식별용 플래그
  };
}

/**
 * 날짜 포맷팅 함수
 * @param {string} dateString - ISO 형식의 날짜 문자열
 * @returns {string} - 포맷팅된 날짜 문자열 (예: '2025년 4월 22일')
 */
export function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "날짜 형식 오류";
  }
}

/**
 * 날짜가 과거인지 확인하는 함수
 * @param {string} dateString - ISO 형식의 날짜 문자열
 * @param {Date|null} baseDate - 기준 날짜 (null이면 현재 날짜)
 * @returns {boolean} - 과거 날짜이면 true, 아니면 false
 */
export function isPastDate(dateString, baseDate = null) {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    
    const now = baseDate || new Date();
    return date < now;
  } catch (error) {
    console.error("Error checking if date is past:", error);
    return false;
  }
}

/**
 * 월 이름 가져오기 (영문 약어, 대문자)
 * @param {string} dateString - ISO 형식의 날짜 문자열
 * @returns {string} - 영문 월 약어 (예: 'JAN', 'FEB')
 */
export function getMonthAbbr(dateString) {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    return month;
  } catch (error) {
    console.error("Error getting month abbreviation:", error);
    return "ERR";
  }
}

/**
 * 일(day) 가져오기
 * @param {string} dateString - ISO 형식의 날짜 문자열
 * @returns {number} - 일(1-31)
 */
export function getDay(dateString) {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    
    return date.getDate();
  } catch (error) {
    console.error("Error getting day:", error);
    return 0;
  }
}

/**
 * 이미지 선택 함수
 * @param {number|string} meetingId - 모임 ID
 * @returns {string} - 이미지 경로
 */
export function getMeetingImage(meetingId) {
  try {
    // 숫자 ID로 변환
    const numericId = typeof meetingId === 'string' 
      ? (parseInt(meetingId, 10) || 1) 
      : (meetingId || 1);
    
    // 간단한 방식으로 모임 ID에 따라 이미지 순환 (1-5)
    const index = Math.max(1, Math.min(5, (numericId % 5) + 1));
    
    // 환경 변수가 없는 경우를 위한 대비
    const BASE_URL = typeof import.meta !== 'undefined' && import.meta.env ? 
      import.meta.env.BASE_URL || '/' : '/';
      
    return `${BASE_URL}images/meetings/${index}.jpg`;
  } catch (error) {
    console.error("Error getting meeting image:", error);
    return "/images/meetings/default.jpg";
  }
}

// ===== 데이터 필터링 함수 =====

/**
 * 모임 상태에 따라 예정된 모임 필터링 (상태가 '예정'인 모임)
 * @param {Array} meetings - 모임 데이터 배열
 * @param {number} limit - 가져올 모임 수 (0이면 전체)
 * @returns {Array} - 필터링된 모임 데이터 배열
 */
export function filterUpcomingMeetings(meetings, limit = 0) {
  if (!Array.isArray(meetings)) {
    console.error("Invalid meetings data:", meetings);
    return [];
  }
  
  // 상태가 '예정'인 모임만 필터링
  let filtered = meetings.filter(meeting => meeting.status === MEETING_STATUS.UPCOMING);
  
  // 날짜 오름차순 정렬
  filtered = filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // 개수 제한이 있는 경우
  if (limit > 0 && filtered.length > limit) {
    filtered = filtered.slice(0, limit);
  }
  
  return filtered;
}

// ===== Firebase 데이터 요청 함수 =====

/**
 * 모든 모임 데이터 가져오기
 * @param {boolean} useTestData - 테스트 데이터 포함 여부
 * @returns {Promise<Array>} - 모임 데이터 배열
 */
export async function getAllMeetings(useTestData = false) {
  try {
    console.log("Fetching all meetings from database...");
    
    // 모든 모임 가져오기 (날짜 역순)
    const meetingsQuery = query(
      collection(db, 'meetings'),
      orderBy('date', 'desc')
    );
    
    const querySnapshot = await getDocs(meetingsQuery);
    let meetings = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // 타임스탬프를 ISO 문자열로 변환
      ...(doc.data().date && doc.data().date instanceof Timestamp 
          ? { date: doc.data().date.toDate().toISOString() } 
          : {})
    }));
    
    console.log(`Found ${meetings.length} meetings in database`);
    
    // 테스트 데이터를 포함하는 경우
    if (useTestData && meetings.length === 0) {
      console.log("No meetings found in database, using test data");
      return testMeetings;
    }
    
    return meetings;
  } catch (error) {
    console.error("Error getting all meetings:", error);
    console.error("Error details:", error.message);
    
    // 테스트 데이터를 포함하는 경우, 오류 발생 시 테스트 데이터라도 반환
    if (useTestData) {
      console.log("Error occurred, returning test data");
      return testMeetings;
    }
    
    // 오류 표시용 데이터 반환
    return [createErrorMeeting("데이터베이스 연결 오류", error.code || "DB_ERROR")];
  }
}

/**
 * 연도별 모임 데이터 가져오기
 * @param {number} year - 연도
 * @param {boolean} useTestData - 테스트 데이터 사용 여부
 * @returns {Promise<Array>} - 해당 연도의 모임 데이터 배열
 */
export async function getMeetingsByYear(year, useTestData = false) {
  try {
    console.log(`Fetching meetings for year ${year}...`);
    
    // 테스트 데이터 사용 요청이 있으면 2025년에 대해서는 테스트 데이터 반환
    if (useTestData && year === 2025) {
      console.log("Using test data for 2025 meetings");
      return testMeetings;
    }
    
    // 해당 연도의 시작일과 종료일
    const startDate = new Date(year, 0, 1).toISOString();
    const endDate = new Date(year + 1, 0, 1).toISOString();
    
    // 해당 연도의 모든 모임 가져오기
    const meetingsQuery = query(
      collection(db, 'meetings'),
      where('date', '>=', startDate),
      where('date', '<', endDate),
      orderBy('date', 'asc')
    );
    
    const querySnapshot = await getDocs(meetingsQuery);
    const meetings = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // 타임스탬프를 ISO 문자열로 변환
      ...(doc.data().date && doc.data().date instanceof Timestamp 
          ? { date: doc.data().date.toDate().toISOString() } 
          : {})
    }));
    
    console.log(`Found ${meetings.length} meetings for year ${year}`);
    
    // 결과가 없으면 2025년에 대해 테스트 데이터 반환
    if (meetings.length === 0 && year === 2025 && useTestData) {
      console.log("No meetings found for 2025, using test data");
      return testMeetings;
    }
    
    return meetings;
  } catch (error) {
    console.error(`Error getting meetings for year ${year}:`, error);
    console.error("Error details:", error.message);
    
    // 2025년에 대한 요청이면 테스트 데이터 반환
    if (year === 2025 && useTestData) {
      console.log("Error fetching 2025 meetings, using test data");
      return testMeetings;
    }
    
    // 오류 표시용 데이터 반환
    return [createErrorMeeting(`${year}년 모임 데이터 로딩 실패`, error.code || "YEAR_QUERY_ERROR")];
  }
}

/**
 * 예정된 모임 데이터 가져오기
 * @param {number} limit - 가져올 모임 수 (0이면 전체)
 * @param {boolean} useTestData - 테스트 데이터 사용 여부
 * @returns {Promise<Array>} - 예정된 모임 데이터 배열
 */
export async function getUpcomingMeetings(limit = 0, useTestData = false) {
  try {
    console.log("Fetching upcoming meetings...");
    
    // 현재 날짜 이후의 모임만 가져오기
    const now = new Date();
    const isoDate = now.toISOString();
    
    // 상태가 '예정'이고 현재 이후인 모임
    const meetingsQuery = query(
      collection(db, 'meetings'),
      where('status', '==', MEETING_STATUS.UPCOMING),
      where('date', '>=', isoDate),
      orderBy('date', 'asc'),
      limit > 0 ? firestoreLimit(limit) : undefined
    );
    
    const querySnapshot = await getDocs(meetingsQuery);
    const meetings = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // 타임스탬프를 ISO 문자열로 변환
      ...(doc.data().date && doc.data().date instanceof Timestamp 
          ? { date: doc.data().date.toDate().toISOString() } 
          : {})
    }));
    
    console.log(`Found ${meetings.length} upcoming meetings`);
    
    // 테스트 데이터 사용
    if (useTestData && meetings.length === 0) {
      console.log("No upcoming meetings found, using test data");
      // 현재 날짜 이후의 테스트 모임만 필터링
      const filteredTestMeetings = testMeetings
        .filter(meeting => meeting.status === MEETING_STATUS.UPCOMING && new Date(meeting.date) >= now)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
        
      return limit > 0 ? filteredTestMeetings.slice(0, limit) : filteredTestMeetings;
    }
    
    return meetings;
  } catch (error) {
    console.error("Error getting upcoming meetings:", error);
    console.error("Error details:", error.message);
    
    if (useTestData) {
      console.log("Error occurred, returning filtered test data");
      const now = new Date();
      const filteredTestMeetings = testMeetings
        .filter(meeting => meeting.status === MEETING_STATUS.UPCOMING && new Date(meeting.date) >= now)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
        
      return limit > 0 ? filteredTestMeetings.slice(0, limit) : filteredTestMeetings;
    }
    
    // 오류 표시용 데이터 반환
    return [createErrorMeeting("예정된 모임 데이터 로딩 실패", error.code || "UPCOMING_QUERY_ERROR")];
  }
}

/**
 * 지난 모임 데이터 가져오기
 * @param {number} limit - 가져올 모임 수 (0이면 전체)
 * @param {boolean} useTestData - 테스트 데이터 사용 여부
 * @returns {Promise<Array>} - 지난 모임 데이터 배열
 */
export async function getPastMeetings(limit = 0, useTestData = false) {
  try {
    console.log("Fetching past meetings...");
    
    // 현재 날짜 이전의 모임만 가져오기
    const now = new Date();
    const isoDate = now.toISOString();
    
    // 일반적으로 완료 상태이거나 현재 이전인 모임
    const meetingsQuery = query(
      collection(db, 'meetings'),
      where('status', '==', MEETING_STATUS.COMPLETED),
      orderBy('date', 'desc'),
      limit > 0 ? firestoreLimit(limit) : undefined
    );
    
    const querySnapshot = await getDocs(meetingsQuery);
    const meetings = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // 타임스탬프를 ISO 문자열로 변환
      ...(doc.data().date && doc.data().date instanceof Timestamp 
          ? { date: doc.data().date.toDate().toISOString() } 
          : {})
    }));
    
    console.log(`Found ${meetings.length} past meetings`);
    
    // 테스트 데이터 사용 (실제로는 사용하지 않는 것이 좋음)
    if (useTestData && meetings.length === 0) {
      console.log("No past meetings found, returning empty array");
      // 현재 날짜 이전의 테스트 모임만 필터링 (일반적으로 필요없음)
      return [];
    }
    
    return meetings;
  } catch (error) {
    console.error("Error getting past meetings:", error);
    console.error("Error details:", error.message);
    
    // 오류 표시용 데이터 반환
    return [createErrorMeeting("지난 모임 데이터 로딩 실패", error.code || "PAST_QUERY_ERROR")];
  }
}

/**
 * 모임 데이터를 가져오는 통합 함수
 * @param {Object} options - 옵션
 * @param {string} options.type - 모임 유형 ('all', 'year', 'upcoming', 'past')
 * @param {number} options.year - 연도 (type이 'year'인 경우)
 * @param {number} options.limit - 가져올 모임 수 (0이면 전체)
 * @param {boolean} options.useTestData - 테스트 데이터 사용 여부
 * @returns {Promise<Array>} - 모임 데이터 배열
 */
export async function getMeetings(options = {}) {
  const { 
    type = 'all', 
    year = new Date().getFullYear(), 
    limit = 0, 
    useTestData = false 
  } = options;
  
  console.log(`Getting meetings with options: type=${type}, year=${year}, limit=${limit}, useTestData=${useTestData}`);
  
  switch (type) {
    case 'year':
      return getMeetingsByYear(year, useTestData);
    case 'upcoming':
      return getUpcomingMeetings(limit, useTestData);
    case 'past':
      return getPastMeetings(limit, useTestData);
    case 'all':
    default:
      return getAllMeetings(useTestData);
  }
}