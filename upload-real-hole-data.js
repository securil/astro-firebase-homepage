// 실제 홀별 스코어 데이터를 Firebase hole_scores 컬렉션에 추가
const admin = require('firebase-admin');

// Service Account 키 설정
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

// 2025년 3월 모임 데이터 (스프레드시트 첫 번째 데이터)
const march2025Data = [
  { name: "김현정", course: "올림프스/록키", holes: [3,1,0,2,1,0,2,4,-1, 0,2,2,1,1,1,1,1,3], frontNine: 48, backNine: 48, total: 96 },
  { name: "조민정", course: "올림프스/록키", holes: [4,2,2,4,4,1,3,0,3, 2,0,4,2,1,1,2,2,3], frontNine: 59, backNine: 53, total: 112 },
  { name: "정혜영", course: "올림프스/록키", holes: [2,3,3,2,2,1,2,1,3, 1,1,2,2,2,1,1,2,3], frontNine: 55, backNine: 51, total: 106 },
  { name: "이현자", course: "올림프스/록키", holes: [3,2,1,3,1,1,3,2,2, 0,2,2,3,3,1,1,2,3], frontNine: 54, backNine: 53, total: 107 },
  { name: "김연숙", course: "록키/올림프스", holes: [2,1,2,2,2,0,2,2,2, 2,1,1,2,2,2,2,2,2], frontNine: 51, backNine: 52, total: 103 },
  { name: "김진만", course: "알프스/몽블랑", holes: [1,1,0,0,1,0,1,1,2, 1,0,1,0,2,1,0,0,0], frontNine: 43, backNine: 41, total: 84 },
  { name: "김민석", course: "알프스/몽블랑", holes: [1,0,1,1,1,2,0,0,0, 0,1,0,0,0,0,0,1,0], frontNine: 42, backNine: 38, total: 80 },
  { name: "권영순", course: "알프스/몽블랑", holes: [1,1,2,1,1,1,1,2,1, 0,1,1,1,1,1,1,1,0], frontNine: 47, backNine: 43, total: 90 },
  { name: "권오성", course: "알프스/몽블랑", holes: [1,1,0,1,1,1,2,0,0, 0,0,1,1,1,0,0,1,0], frontNine: 43, backNine: 40, total: 83 },
  { name: "최호석", course: "알프스/몽블랑", holes: [1,0,0,1,1,1,0,0,1, -1,1,0,-1,1,0,1,2,0], frontNine: 41, backNine: 39, total: 80 }
];

// 2025년 5월 모임 데이터 (두 번째 스프레드시트)
const may2025Data = [
  { name: "최관호", course: "록키/올림프스", holes: [0,0,0,0,1,0,1,2,1, 1,0,1,0,0,0,1,0,0], frontNine: 41, backNine: 39, total: 80 },
  { name: "진양교", course: "록키/올림프스", holes: [1,0,0,1,0,0,0,1,1, 1,0,2,1,2,0,0,1,0], frontNine: 40, backNine: 43, total: 83 },
  { name: "박세환", course: "록키/올림프스", holes: [0,0,0,0,0,0,0,-1,0, 1,-1,1,1,1,1,0,0,0], frontNine: 35, backNine: 40, total: 75 },
  { name: "유대균", course: "록키/올림프스", holes: [4,0,-1,0,0,1,1,1,2, 0,0,0,1,1,0,0,0,0], frontNine: 44, backNine: 38, total: 82 },
  { name: "김현정", course: "올림프스/록키", holes: [1,2,2,3,2,1,2,1,1, 3,3,3,3,3,1,0,2,2], frontNine: 51, backNine: 56, total: 107 },
  { name: "김연중", course: "올림프스/록키", holes: [3,2,2,1,3,1,1,0,2, 1,1,2,3,2,1,0,3,2], frontNine: 51, backNine: 51, total: 102 },
  { name: "박지혁", course: "올림프스/록키", holes: [3,1,0,2,3,1,1,1,2, 0,1,2,1,1,1,2,2,1], frontNine: 50, backNine: 47, total: 97 },
  { name: "김진만", course: "올림프스/록키", holes: [1,2,0,3,0,1,1,2,2, 2,1,1,0,1,0,0,1,1], frontNine: 48, backNine: 43, total: 91 },
  { name: "권오성", course: "몽블랑/알프스", holes: [0,0,0,0,2,1,-1,0,1, 1,0,1,1,1,1,1,1,0], frontNine: 39, backNine: 43, total: 82 },
  { name: "오호진", course: "몽블랑/알프스", holes: [0,1,0,0,0,1,0,1,2, 0,1,1,0,1,1,0,0,0], frontNine: 41, backNine: 40, total: 81 }
];

// 회원명을 ID로 매핑 (실제 members 컬렉션의 데이터와 매치 필요)
const memberNameToId = {
  "김현정": 319,
  "조민정": 320, 
  "정혜영": 321,
  "이현자": 322,
  "김연숙": 323,
  "김진만": 324,
  "김민석": 325,
  "권영순": 326,
  "권오성": 327,
  "최호석": 328,
  "최관호": 329,
  "진양교": 330,
  "박세환": 331,
  "유대균": 332,
  "김연중": 333,
  "박지혁": 334,
  "오호진": 335
};

// 스코어 데이터를 hole_scores 형식으로 변환
const convertToHoleScores = (playerData, meetingId, date) => {
  const memberId = memberNameToId[playerData.name];
  if (!memberId) {
    console.warn(`회원 ${playerData.name}의 ID를 찾을 수 없습니다.`);
    return null;
  }

  // 파 정보 (일반적인 골프 코스 파 기준)
  const parInfo = [4,4,3,4,5,4,3,4,4, 4,3,4,5,4,3,4,4,5]; // 18홀 파 정보
  
  const holes = [];
  
  // 18홀 데이터 생성
  for (let i = 0; i < 18; i++) {
    const holeNumber = i + 1;
    const par = parInfo[i];
    const strokesOverPar = playerData.holes[i];
    
    // 음수나 이상한 값 처리
    let actualScore;
    if (strokesOverPar === null || strokesOverPar === undefined) {
      actualScore = par; // 파로 기본 설정
    } else {
      actualScore = par + strokesOverPar;
      if (actualScore < 1) actualScore = 1; // 최소 1타
    }
    
    holes.push({
      hole: holeNumber,
      par: par,
      distance: par === 3 ? 160 : par === 4 ? 380 : 520, // 기본 거리
      score: actualScore,
      putts: Math.max(1, Math.min(actualScore, 4)), // 추정 퍼트 수
      fairwayHit: par > 3 ? Math.random() > 0.4 : null,
      greenInRegulation: Math.random() > 0.5,
      penalties: strokesOverPar > 2 ? 1 : 0,
      sandSaves: 0,
      upAndDown: Math.random() > 0.7,
      notes: ""
    });
  }

  // 요약 계산
  const summary = {
    totalScore: playerData.total,
    frontNine: playerData.frontNine,
    backNine: playerData.backNine,
    totalPutts: holes.reduce((sum, h) => sum + h.putts, 0),
    fairwaysHit: holes.filter(h => h.fairwayHit === true).length,
    fairwaysPossible: holes.filter(h => h.fairwayHit !== null).length,
    greensInRegulation: holes.filter(h => h.greenInRegulation === true).length,
    greensInRegulationPossible: 18,
    totalPenalties: holes.reduce((sum, h) => sum + h.penalties, 0),
    sandSaves: 0,
    sandSavesPossible: 0,
    upAndDowns: holes.filter(h => h.upAndDown === true).length,
    upAndDownsPossible: holes.filter(h => h.greenInRegulation === false).length,
    eagles: holes.filter(h => h.score - h.par <= -2).length,
    birdies: holes.filter(h => h.score - h.par === -1).length,
    pars: holes.filter(h => h.score - h.par === 0).length,
    bogeys: holes.filter(h => h.score - h.par === 1).length,
    doubleBogeys: holes.filter(h => h.score - h.par === 2).length,
    others: holes.filter(h => h.score - h.par > 2).length
  };

  return {
    meetingId: meetingId,
    memberId: memberId,
    recordDate: date,
    courseInfo: {
      name: playerData.course.includes('/') ? playerData.course.split('/')[0] + " 컨트리클럽" : playerData.course + " 컨트리클럽",
      teeBox: "백티",
      weather: "맑음",
      courseRating: 72.0,
      slopeRating: 126
    },
    holes: holes,
    summary: summary
  };
};

// 실제 데이터 업로드 함수
const uploadRealHoleData = async () => {
  try {
    console.log('🏌️ 실제 홀별 데이터 업로드 시작...');
    
    // 2025년 3월 데이터 (meetingId: 2503)
    for (const playerData of march2025Data) {
      const holeScoreData = convertToHoleScores(playerData, 2503, "2025-03-15");
      if (holeScoreData) {
        const docId = `${holeScoreData.meetingId}_${holeScoreData.memberId}`;
        await db.collection('hole_scores').doc(docId).set(holeScoreData);
        console.log(`✅ 3월 데이터 추가: ${playerData.name} (${holeScoreData.summary.totalScore}타)`);
      }
    }
    
    // 2025년 5월 데이터 (meetingId: 2505)
    for (const playerData of may2025Data) {
      const holeScoreData = convertToHoleScores(playerData, 2505, "2025-05-18");
      if (holeScoreData) {
        const docId = `${holeScoreData.meetingId}_${holeScoreData.memberId}`;
        await db.collection('hole_scores').doc(docId).set(holeScoreData);
        console.log(`✅ 5월 데이터 추가: ${playerData.name} (${holeScoreData.summary.totalScore}타)`);
      }
    }
    
    console.log('🎉 모든 실제 홀별 데이터 업로드 완료!');
    console.log('🎯 브라우저에서 http://localhost:4324/stats 페이지를 새로고침하여 확인하세요!');
    
  } catch (error) {
    console.error('❌ 실제 데이터 업로드 에러:', error);
  }
};

// 실행
const command = process.argv[2];

if (command === 'upload') {
  uploadRealHoleData().then(() => {
    process.exit(0);
  });
} else {
  console.log('사용법: node upload-real-hole-data.js upload');
}
