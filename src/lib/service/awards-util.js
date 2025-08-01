// 📁 src/lib/service/awards-util.js
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

// 📌 수상 카테고리 정의 - 모임 유형별
export const MEETING_AWARD_TYPES = {
  regular: {
    simperio: '심페리오 우승',
    medalist_male: '메달리스트 (남성)',
    medalist_female: '메달리스트 (여성)', 
    longest_male: '롱기스트 (남성)',
    longest_female: '롱기스트 (여성)',
    nearest_male: '니어리스트 (남성)',
    nearest_female: '니어리스트 (여성)'
  },
  special: {
    medalist: '메달리스트',
    simperio_male: '심페리오 우승 (남성)',
    simperio_female: '심페리오 우승 (여성)',
    longest_male: '롱기스트 (남성)',
    longest_female: '롱기스트 (여성)',
    nearest: '니어리스트' // 남녀 통합
  }
};

// 기존 호환성을 위한 기본 카테고리 맵 (정기모임용)
export const CATEGORY_MAP = MEETING_AWARD_TYPES.regular;

// 모든 허용된 카테고리 (정기모임 + 대회)
export const ALLOWED_CATEGORIES = [
  ...Object.keys(MEETING_AWARD_TYPES.regular),
  ...Object.keys(MEETING_AWARD_TYPES.special)
];

// 모임 타입에 따른 카테고리 맵 반환 (개선된 버전)
export function getCategoryMapByMeetingType(meetingType) {
  return MEETING_AWARD_TYPES[meetingType] || MEETING_AWARD_TYPES.regular;
}

// 실제 수상 데이터를 기반으로 적절한 카테고리 맵 반환
export function getAdaptiveCategoryMap(awardsData, meetingType) {
  // meetingType이 special이면 무조건 대회용 맵 사용
  if (meetingType === 'special') {
    return MEETING_AWARD_TYPES.special;
  }

  if (!awardsData || awardsData.length === 0) {
    return getCategoryMapByMeetingType(meetingType);
  }

  const existingCategories = awardsData.map(award => award.category);
  
  // 대회 전용 카테고리가 있으면 대회용 맵 사용
  const specialCategories = ['medalist', 'simperio_male', 'simperio_female', 'nearest'];
  const hasSpecialCategories = existingCategories.some(cat => specialCategories.includes(cat));
  
  if (hasSpecialCategories) {
    return MEETING_AWARD_TYPES.special;
  }
  
  return getCategoryMapByMeetingType(meetingType);
}

// ✅ 날짜 포맷
export function formatDate(dateString) {
  const d = new Date(dateString);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

// ✅ 해당 연도의 완료된 모임 가져오기 (복합 인덱스 문제 해결)
export async function getYearlyMeetings(year) {
  try {
    // 먼저 복합 인덱스를 사용한 쿼리 시도
    const start = new Date(`${year}-01-01`);
    const end = new Date(`${Number(year) + 1}-01-01`);

    const q = query(
      collection(db, 'meetings'),
      where('date', '>=', start.toISOString()),
      where('date', '<', end.toISOString()),
      where('status', '==', '완료'),
      orderBy('date', 'desc')
    );

    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.warn('복합 인덱스 쿼리 실패, 대안 방식 사용:', error);
    
    // 대안: 모든 완료된 모임을 가져와서 클라이언트에서 필터링
    const fallbackQuery = query(
      collection(db, 'meetings'),
      where('status', '==', '완료'),
      orderBy('date', 'desc')
    );

    const fallbackSnap = await getDocs(fallbackQuery);
    const allMeetings = fallbackSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // 해당 연도만 필터링
    return allMeetings.filter(meeting => {
      const meetingYear = new Date(meeting.date).getFullYear();
      return meetingYear === year;
    });
  }
}

// ✅ 최근 완료된 모임 3개 불러오기
export async function getRecentCompletedMeetings(count = 3) {
  console.log('🔥 getRecentCompletedMeetings() called');

  try {
    const q = query(
      collection(db, 'meetings'),
      where('status', '==', '완료'),
      orderBy('date', 'desc'),
      limit(count)
    );

    const snap = await getDocs(q);

    if (snap.empty) {
      console.warn("⚠️ 완료된 모임 없음");
      return [{
        id: 'no-data',
        date: new Date().toISOString(),
        name: "완료된 모임이 없습니다",
        type: "no-data",
        status: "완료",
        location: "데이터 집계중입니다.",
        course: ""
      }];
    }

    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("🔥 에러 발생:", error);
    return [{
      id: 'error',
      date: new Date().toISOString(),
      name: "정보를 불러올 수 없습니다",
      type: "error",
      status: "오류",
      location: "DB 연결 실패",
      course: ""
    }];
  }
}

// ✅ 모든 회원 정보 맵으로 가져오기
export async function getMembersMap() {
  const snap = await getDocs(collection(db, 'members'));
  return snap.docs.reduce((acc, doc) => {
    acc[doc.id] = doc.data();
    return acc;
  }, {});
}

// ✅ 전체 회원 목록 배열로 가져오기
export async function getMembers() {
  const snap = await getDocs(collection(db, 'members'));
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// ✅ 특정 모임의 특별상 정보 필터링
export async function getSpecialAwardsByMeetingId(meetingId) {
  const q = query(
    collection(db, 'special_awards'),
    where('meeting_id', '==', Number(meetingId)),
    where('category', 'in', ALLOWED_CATEGORIES)
  );

  const snap = await getDocs(q);
  return snap.docs.map(doc => doc.data());
}

// getFilteredAwardsByMeetingId는 getSpecialAwardsByMeetingId와 동일하므로 별칭으로 제공
export const getFilteredAwardsByMeetingId = getSpecialAwardsByMeetingId;