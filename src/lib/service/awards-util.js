// 📁 src/lib/service/awards-util.js
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

// 📌 수상 카테고리 정의
export const CATEGORY_MAP = {
  simperio: '심페리오 우승',
  medalist_male: '메달리스트 (남성)',
  medalist_female: '메달리스트 (여성)',
  longest_male: '롱기스트 (남성)',
  longest_female: '롱기스트 (여성)',
  nearest_male: '니어리스트 (남성)',
  nearest_female: '니어리스트 (여성)'
};

export const ALLOWED_CATEGORIES = Object.keys(CATEGORY_MAP);

// ✅ 해당 연도의 모든 모임 가져오기 (status와 무관)
export async function getYearlyMeetings(year) {
  const start = new Date(`${year}-01-01`);
  const end = new Date(`${Number(year) + 1}-01-01`);

  const q = query(
    collection(db, 'meetings'),
    where('date', '>=', start.toISOString()),
    where('date', '<', end.toISOString()),
    orderBy('date', 'desc')
  );

  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() })).slice(0, 8);
}

// ✅ 모든 회원 정보 맵으로 가져오기
export async function getMembersMap() {
  const snap = await getDocs(collection(db, 'members'));
  return snap.docs.reduce((acc, doc) => {
    acc[doc.id] = doc.data();
    return acc;
  }, {});
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
