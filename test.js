// test.js
const { getAllMembers, addMeeting } = require('./firestoreHandler');

(async () => {
  // 회원 리스트 출력
  const members = await getAllMembers();
  console.log('✅ 회원 목록:', members);

  // 새 모임 등록
  await addMeeting('meeting_401', {
    title: '제401회 5월 정기모임',
    date: '2025-05-01',
    status: '예정'
  });

  console.log('✅ 모임 등록 완료!');
})();
