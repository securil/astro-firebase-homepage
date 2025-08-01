// Firebase Admin을 사용한 홀별 샘플 데이터 생성
const admin = require('firebase-admin');

// Service Account 키 직접 설정
const serviceAccount = {
  "type": "service_account",
  "project_id": "chunggu-golf",
  "private_key_id": "85ea0e6ce14524347de4d24160f4f23663ef1a17",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC0P0pI1zAUSgcw\n3x+bqhPte7u0EKpPZzxQUZzBQ0tkkU/N8WsUcM07PENb/ESq/epRCEznvkW5nOEA\nm1J/wvQfRTILtfPuVasZQCcAh2FZE0JPetPSjMVxSNjnFg8LnZaKRAEavLc4KFnN\ncWOR+yoNP8eLJ343kByfxacDPtDkSxzhhdkaIlLJb4mkn3OZGdlPK2pHTxDyVMor\nkGTMuzEYULF1JXqtbvs4r8Vgt+EqKw5Mm9B8lKWLcIyr99EHxLkWlL5DmIm2fBmo\n1hsFC3/l9ME0xeOI2ysY+ALVg5lwq+Fg9mNdz6Hxm5bIfyS3Rvh+XVQxUOeV4Mys\nrnopkMoNAgMBAAECggEAE0MGMbWJRknI7fCSJKTuvzyvSOVVBeo+2Eh4a3DBEEy1\nDgmEC2mojPF6M0zIm8tJrIIqEcPUGKtKojF3Bf8z7lmLKRQ3LpuKDsc7w8Mz5Hx5\n5Bt4onH3sYz63OsPDYs4KKtuwMg0/jPVsO4ymUmRa1wK+3RreQ2V+X76Q48FbLfp\n/3wdE1PWrwz3Oml7OL8N/CNxHgmKqJnpvIMVzuqN3MYVgGLViQ1mdcfmUtENB00f\nCOtqndEFhskQnMjcuDmt1sPwWSSCyg4W7WJmla3YL5GixJ90lAAMiQLEGTV7Dx/A\nyslXISP7nuE5vnA57m+JYBK8HFohbKRFvE/W5o6DwQKBgQDvLY3PeZ0eU/uvlocj\nC8bW7CGj2QpM+jvgClM+lb0o2d+JpLJon5OQvCMs6K+oLaCwlNldMLpTyzhmNzd+\nWxi8innh0NaTzsryCQkgEvQ9isjEDeKXnz+zZNCFLVGvwvkQGtxDvh309w2g3TKn\niOa1dnnN3yjjHearRC6iwteLYQKBgQDA7K1SHTTOS/o/XdinB0rCFTNvtYqchecU\njXFV4UxpBlENQm2ggYN8pZXSSb39Ite8oGdlKPUxD6Vf8P8Q943+B5udjjuFQ5v9\nvDohDKY5OJSu3Sbpmr09zSVGf80ELPvDKbIF8iditS6pewIzEE/t8wf60Albhz/E\nzDaw12uKLQKBgQDEA+Nqm9KGXnGwb38E28vzq8XOEDv+5j1X2V5rtjA2YIhwt8d3\nMwCu52E0luYOwIYm8XZKh3rM3Ym1S59xMJtPOXW1+X9B14I/ZeRSovYD0c/DzVVc\nyahdD0xNONzvXKzd5AWMhyzp6+cBZQb0gqABK72bWT6bE5BN4C0QOvqHQQKBgDmG\n2W/A0bwqH6bBfxbfL8WLuNi4k2p06yDPxFnNYpF2lriTdEkGFYUXgwM/he1zdE0E\nr5AUlHhap/9hx0zx5F85OYfTn5/vNxaEB/lO4knxuzQhMbc6su84usK43RM/rprV\nVgY73M6sJAvZaCB93refXmPFoOSwAa3XDv/QXHrJAoGBAIPouGDlcFaZmkii/cM4\nwIfKWxsBIxrKVmTlQpza2R9RIOE31O4GQYHuN9kFBsZQ51IdGMAl/5nrIqgcPcxP\nnADDUxJb9EhnXEHnQc0Te2W+Y59FhKQJci5hzwAEQmwaunBFkMpe3+mzttVHxf7w\nGtpKErzfQDt6VYg/OtdlGc4k\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@chunggu-golf.iam.gserviceaccount.com",
  "client_id": "101879572265657170512",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token"
};

// Firebase Admin 초기화
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'chunggu-golf'
  });
}

const db = admin.firestore();

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
    
    // 테스트용 모임 ID와 회원 ID
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
      await db.collection('hole_scores').doc(docId).set(holeScoreData);
      
      console.log(`✅ 샘플 데이터 추가 완료: ${docId} (총타수: ${summary.totalScore})`);
    }
    
    console.log('🎉 모든 홀별 샘플 데이터 생성 완료!');
    
  } catch (error) {
    console.error('❌ 샘플 데이터 생성 에러:', error);
  }
};

// 실행
const command = process.argv[2];

if (command === 'add') {
  addSampleHoleScores().then(() => {
    console.log('🎯 브라우저에서 http://localhost:4326/stats 페이지를 새로고침하여 확인하세요!');
    process.exit(0);
  });
} else {
  console.log('사용법: node add-hole-data.js add');
}
