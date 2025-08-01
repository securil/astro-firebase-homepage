// 홀별 데이터 테스트 스크립트
// Firebase hole_scores 컬렉션에 샘플 데이터 추가

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, deleteDoc } = require('firebase/firestore');

// Firebase 설정 (프로젝트의 firebase.js와 동일해야 함)
const firebaseConfig = {
  apiKey: "AIzaSyCJWCDXl8CwjRfZKP4pE5oqLXKo4BdYrXU",
  authDomain: "chunggu-golf.firebaseapp.com",
  projectId: "chunggu-golf",
  storageBucket: "chunggu-golf.firebasestorage.app",
  messagingSenderId: "515847816628",
  appId: "1:515847816628:web:b7e3f0bde8f0dfb0935e14"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 테스트용 홀별 데이터 생성
const generateSampleHoleData = () => {
  const holes = [];
  
  // 18홀 데이터 생성
  for (let hole = 1; hole <= 18; hole++) {
    // Par 3, 4, 5 랜덤 배치
    let par;
    if (hole === 3 || hole === 8 || hole === 12 || hole === 16) {
      par = 3; // 4개 홀은 Par 3
    } else if (hole === 5 || hole === 9 || hole === 14 || hole === 18) {
      par = 5; // 4개 홀은 Par 5
    } else {
      par = 4; // 나머지 10개 홀은 Par 4
    }
    
    // 거리 설정
    const distance = par === 3 ? 150 + Math.floor(Math.random() * 50) :
                    par === 4 ? 350 + Math.floor(Math.random() * 100) :
                    480 + Math.floor(Math.random() * 50);
    
    // 스코어 생성 (파 +/- 2 범위)
    const score = par + Math.floor(Math.random() * 5) - 2;
    const actualScore = Math.max(1, score); // 최소 1타
    
    // 퍼트 수 (1-4타)
    const putts = Math.floor(Math.random() * 3) + 1;
    
    holes.push({
      hole,
      par,
      distance,
      score: actualScore,
      putts,
      fairwayHit: par > 3 ? Math.random() > 0.3 : null, // Par 3는 fairway 없음
      greenInRegulation: Math.random() > 0.4,
      penalties: Math.random() > 0.8 ? 1 : 0,
      sandSaves: 0,
      upAndDown: Math.random() > 0.7,
      notes: ""
    });
  }
  
  return holes;
};

// 요약 데이터 계산
const calculateSummary = (holes) => {
  const totalScore = holes.reduce((sum, hole) => sum + hole.score, 0);
  const frontNine = holes.slice(0, 9).reduce((sum, hole) => sum + hole.score, 0);
  const backNine = holes.slice(9, 18).reduce((sum, hole) => sum + hole.score, 0);
  const totalPutts = holes.reduce((sum, hole) => sum + hole.putts, 0);
  
  const fairwayHits = holes.filter(h => h.fairwayHit === true).length;
  const fairwaysPossible = holes.filter(h => h.fairwayHit !== null).length;
  
  const greensInRegulation = holes.filter(h => h.greenInRegulation === true).length;
  const totalPenalties = holes.reduce((sum, hole) => sum + hole.penalties, 0);
  
  // 스코어별 분류
  let eagles = 0, birdies = 0, pars = 0, bogeys = 0, doubleBogeys = 0, others = 0;
  
  holes.forEach(hole => {
    const diff = hole.score - hole.par;
    if (diff <= -2) eagles++;
    else if (diff === -1) birdies++;
    else if (diff === 0) pars++;
    else if (diff === 1) bogeys++;
    else if (diff === 2) doubleBogeys++;
    else others++;
  });
  
  return {
    totalScore,
    frontNine,
    backNine,
    totalPutts,
    fairwaysHit,
    fairwaysPossible,
    greensInRegulation,
    greensInRegulationPossible: 18,
    totalPenalties,
    sandSaves: 0,
    sandSavesPossible: 0,
    upAndDowns: holes.filter(h => h.upAndDown === true).length,
    upAndDownsPossible: holes.filter(h => h.greenInRegulation === false).length,
    eagles,
    birdies,
    pars,
    bogeys,
    doubleBogeys,
    others
  };
};

// 샘플 데이터 추가 함수
const addSampleHoleScores = async () => {
  try {
    console.log('🏌️ 홀별 샘플 데이터 생성 시작...');
    
    // 테스트용 모임 ID와 회원 ID (실제 데이터에 맞게 수정 필요)
    const testData = [
      { meetingId: 2503, memberId: 319, date: "2025-03-15" },
      { meetingId: 2503, memberId: 320, date: "2025-03-15" },
      { meetingId: 2503, memberId: 321, date: "2025-03-15" },
      { meetingId: 2504, memberId: 319, date: "2025-04-20" },
      { meetingId: 2504, memberId: 320, date: "2025-04-20" },
      { meetingId: 2505, memberId: 319, date: "2025-05-18" },
    ];
    
    for (const record of testData) {
      const holes = generateSampleHoleData();
      const summary = calculateSummary(holes);
      
      const holeScoreData = {
        meetingId: record.meetingId,
        memberId: record.memberId,
        recordDate: record.date,
        courseInfo: {
          name: "테스트 컨트리클럽",
          teeBox: "백티",
          weather: "맑음",
          courseRating: 72.0,
          slopeRating: 126
        },
        holes,
        summary
      };
      
      const docId = `${record.meetingId}_${record.memberId}`;
      await setDoc(doc(collection(db, 'hole_scores'), docId), holeScoreData);
      
      console.log(`✅ 샘플 데이터 추가 완료: ${docId} (총타수: ${summary.totalScore})`);
    }
    
    console.log('🎉 모든 홀별 샘플 데이터 생성 완료!');
    
  } catch (error) {
    console.error('❌ 샘플 데이터 생성 에러:', error);
  }
};

// 데이터 삭제 함수 (테스트용)
const clearSampleData = async () => {
  try {
    console.log('🗑️ 홀별 샘플 데이터 삭제 시작...');
    
    const testDocIds = [
      "2503_319", "2503_320", "2503_321",
      "2504_319", "2504_320",
      "2505_319"
    ];
    
    for (const docId of testDocIds) {
      await deleteDoc(doc(collection(db, 'hole_scores'), docId));
      console.log(`🗑️ 샘플 데이터 삭제: ${docId}`);
    }
    
    console.log('✅ 모든 홀별 샘플 데이터 삭제 완료!');
    
  } catch (error) {
    console.error('❌ 샘플 데이터 삭제 에러:', error);
  }
};

// 실행 부분
const command = process.argv[2];

if (command === 'add') {
  addSampleHoleScores();
} else if (command === 'clear') {
  clearSampleData();
} else {
  console.log('사용법:');
  console.log('  node create-hole-test-data.js add    # 샘플 데이터 추가');
  console.log('  node create-hole-test-data.js clear  # 샘플 데이터 삭제');
}

// export { addSampleHoleScores, clearSampleData };
module.exports = { addSampleHoleScores, clearSampleData };
