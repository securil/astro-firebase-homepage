// 3월 모임 데이터 입력 스크립트 (Firebase Admin SDK)
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json');

// Firebase Admin 초기화
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://chunggu-golf-default-rtdb.firebaseio.com'
});

const db = admin.firestore();

// 3월 스코어 데이터
const marchScores = [
  { name: "박세환", score: 75, front: 35, back: 40 },
  { name: "최관호", score: 80, front: 41, back: 39 },
  { name: "오호진", score: 81, front: 41, back: 40 },
  { name: "유대균", score: 82, front: 44, back: 38 },
  { name: "권오성", score: 82, front: 39, back: 43 },
  { name: "진양교", score: 83, front: 40, back: 43 },
  { name: "최치영", score: 84, front: 42, back: 42 },
  { name: "정윤성", score: 86, front: 42, back: 44 },
  { name: "조영승", score: 86, front: 43, back: 43 },
  { name: "이동호", score: 87, front: 44, back: 43 },
  { name: "안정화", score: 88, front: 45, back: 43 },
  { name: "박기홍", score: 90, front: 45, back: 45 },
  { name: "장세걸", score: 90, front: 45, back: 45 },
  { name: "김진만", score: 91, front: 48, back: 43 },
  { name: "이인영", score: 91, front: 46, back: 45 },
  { name: "채웅석", score: 91, front: 47, back: 44 },
  { name: "김종만", score: 91, front: 46, back: 45 },
  { name: "김종국", score: 92, front: 45, back: 47 },
  { name: "안희태", score: 92, front: 48, back: 44 },
  { name: "박미신", score: 93, front: 47, back: 46 },
  { name: "김형찬", score: 94, front: 44, back: 50 },
  { name: "정연삼", score: 94, front: 46, back: 48 },
  { name: "원유동", score: 95, front: 49, back: 46 },
  { name: "박지혁", score: 97, front: 50, back: 47 },
  { name: "조민정", score: 97, front: 51, back: 46 },
  { name: "김재원", score: 98, front: 52, back: 46 },
  { name: "이성일", score: 99, front: 50, back: 49 },
  { name: "정동균", score: 101, front: 53, back: 48 },
  { name: "이상우", score: 101, front: 49, back: 52 },
  { name: "김연중", score: 102, front: 51, back: 51 },
  { name: "이채명", score: 104, front: 52, back: 52 },
  { name: "김현정", score: 107, front: 51, back: 56 }
];

async function addMarchMeetingData() {
  try {
    console.log('3월 모임 데이터 입력 시작...');
    
    // 1. 모임 정보 추가
    await db.collection('meetings').doc('2503').set({
      id: 2503,
      date: '2025-03-15',
      location: '롯데 스카이힐 CC',
      title: '2025년 3월 정기모임',
      status: 'completed'
    });
    
    console.log('✅ 3월 모임 정보 추가 완료');

    // 2. 회원 정보 조회
    const membersSnapshot = await db.collection('members').get();
    const membersMap = {};
    
    membersSnapshot.forEach(doc => {
      const data = doc.data();
      if (data.name) {
        membersMap[data.name] = doc.id;
      }
    });

    console.log('✅ 회원 정보 조회 완료');

    // 3. 스코어 데이터 추가
    let addedCount = 0;
    for (const playerScore of marchScores) {
      const memberId = membersMap[playerScore.name];
      if (memberId) {
        const scoreDocId = `2503_${memberId}`;
        
        await db.collection('scores').doc(scoreDocId).set({
          meetingId: 2503,
          memberId: parseInt(memberId),
          gross_score: playerScore.score
        });
        
        addedCount++;
        console.log(`${playerScore.name}: ${playerScore.score}타`);
      } else {
        console.log(`⚠️ 회원 정보 없음: ${playerScore.name}`);
      }
    }

    console.log(`✅ 총 ${addedCount}명의 스코어 추가 완료`);

    // 4. 모임 통계 추가
    const avgScore = Math.round(marchScores.reduce((sum, p) => sum + p.score, 0) / marchScores.length);
    
    await db.collection('Meeting_Stats').doc('2503').set({
      meetingId: 2503,
      averageScore: avgScore,
      participantCount: marchScores.length,
      date: '2025-03-15'
    });
    
    console.log('✅ 모임 통계 추가 완료 (평균:', avgScore, '타)');

    // 5. 시상 내역 추가
    const awards = [
      { category: 'symperia', name: '최치영', score: 72 },
      { category: 'medalist', name: '박세환', score: 75 },
      { category: 'medalist', name: '안정화', score: 88 },
      { category: 'longest_drive', name: '정윤성', score: 270 },
      { category: 'longest_drive', name: '김현정', score: 170 },
      { category: 'nearest_pin', name: '이상우', score: 3 },
      { category: 'nearest_pin', name: '김연중', score: 2.8 }
    ];

    for (const award of awards) {
      const memberId = membersMap[award.name];
      if (memberId) {
        const awardDocId = `2503_${memberId}_${award.category}`;
        
        await db.collection('Meeting_Awards').doc(awardDocId).set({
          meetingId: 2503,
          memberId: parseInt(memberId),
          category: award.category,
          score: award.score
        });
        
        console.log(`🏆 ${award.category}: ${award.name} (${award.score})`);
      }
    }

    console.log('✅ 시상 내역 추가 완료');
    console.log('🎉 3월 모임 데이터 입력 완료!');
    
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// 스크립트 실행
addMarchMeetingData();
