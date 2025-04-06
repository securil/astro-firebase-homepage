// src/lib/service/RecentAwards-util.js
import { collection, query, where, orderBy, limit, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

// 출력 대상 카테고리
const ALLOWED_CATEGORIES = [
  'simperio',
  'medalist_male',
  'medalist_female',
  'longest_male',
  'longest_female',
  'nearest_male',
  'nearest_female',
];

// ✅ 날짜 포맷
export function formatDate(dateString) {
  const d = new Date(dateString);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

// ✅ 특별상 정보 조회 + 필터링
export async function getFilteredAwardsByMeetingId(meetingId) {
  const q = query(
    collection(db, 'special_awards'),
    where('meeting_id', '==', Number(meetingId)),
    where('category', 'in', ALLOWED_CATEGORIES)
  );

  const snap = await getDocs(q);
  return snap.docs.map(doc => doc.data());
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


// ✅ 전체 회원 목록
export async function getMembers() {
  const snap = await getDocs(collection(db, 'members'));
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
