// 2025년 3월 & 5월 홀별 데이터 대량 업로드 스크립트
const march2025Data = [
  { name: "김현정", holes: [3,1,0,2,1,0,2,4,-1, 0,2,2,1,1,1,1,1,3], total: 96 },
  { name: "조민정", holes: [4,2,2,4,4,1,3,0,3, 2,0,4,2,1,1,2,2,3], total: 112 },
  { name: "정혜영", holes: [2,3,3,2,2,1,2,1,3, 1,1,2,2,2,1,1,2,3], total: 106 },
  { name: "이현자", holes: [3,2,1,3,1,1,3,2,2, 0,2,2,3,3,1,1,2,3], total: 107 },
  { name: "김연숙", holes: [2,1,2,2,2,0,2,2,2, 2,1,1,2,2,2,2,2,2], total: 103 },
  { name: "문창숙", holes: [2,2,2,2,3,1,2,2,2, 2,0,1,2,1,2,2,2,2], total: 104 },
  { name: "윤소영", holes: [0,2,2,2,2,1,1,2,1, 2,1,1,3,2,1,2,2,1], total: 100 },
  { name: "김기령", holes: [1,2,3,2,1,1,2,3,2, 1,0,1,1,2,1,2,1,1], total: 99 },
  { name: "권영순", holes: [1,1,2,1,1,1,1,2,1, 0,1,1,1,1,1,1,1,0], total: 90 },
  { name: "김진만", holes: [1,1,0,0,1,0,1,1,2, 1,0,1,0,2,1,0,0,0], total: 84 }
];

// 회원명-ID 매핑 (실제 확인된 ID 사용)
const memberIds = {
  "김현정": 319, "조민정": 320, "정혜영": 321, "이현자": 131, "김연숙": 322,
  "문창숙": 323, "윤소영": 324, "김기령": 325, "권영순": 326, "김진만": 327
};

// 표준 파 정보
const pars = [4,4,3,4,5,4,3,4,4, 4,3,4,5,4,3,4,4,5];

// 홀별 데이터 생성 함수
function createHoleData(playerData, meetingId) {
  const memberId = memberIds[playerData.name];
  if (!memberId) return null;
  
  const holes = [];
  let frontNine = 0, backNine = 0;
  
  // 18홀 데이터 생성
  for (let i = 0; i < 18; i++) {
    const par = pars[i];
    const overPar = playerData.holes[i];
    const score = Math.max(1, par + overPar);
    
    if (i < 9) frontNine += score;
    else backNine += score;
    
    holes.push({
      hole: i + 1,
      par: par,
      score: score,
      putts: score <= par ? 2 : score > par + 1 ? 3 : 2,
      fairwayHit: par > 3 ? Math.random() > 0.5 : null,
      greenInRegulation: score <= par + (par === 3 ? 1 : 2),
      penalties: overPar > 2 ? 1 : 0,
      notes: ""
    });
  }
  
  // 요약 통계
  const summary = {
    totalScore: playerData.total,
    frontNine: frontNine,
    backNine: backNine,
    totalPutts: holes.reduce((s, h) => s + h.putts, 0),
    fairwaysHit: holes.filter(h => h.fairwayHit === true).length,
    fairwaysPossible: 14,
    greensInRegulation: holes.filter(h => h.greenInRegulation).length,
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
    recordDate: "2025-03-15",
    courseInfo: {
      name: "올림프스 컨트리클럽",
      teeBox: "백티",
      weather: "맑음"
    },
    holes: holes,
    summary: summary
  };
}

// JSON 파일 생성
const holeScoresData = [];
march2025Data.forEach(player => {
  const data = createHoleData(player, 2503);
  if (data) {
    holeScoresData.push({
      documentId: `2503_${data.memberId}`,
      data: data
    });
  }
});

console.log(`생성된 홀별 기록: ${holeScoresData.length}개`);
console.log("첫 번째 기록:", JSON.stringify(holeScoresData[0], null, 2));
