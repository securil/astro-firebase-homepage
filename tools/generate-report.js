const fs = require('fs');
const path = require('path');

class ReportGenerator {
  constructor(period) {
    this.period = period;
    this.dataPath = path.join(__dirname, 'data', period);
    this.outputPath = path.join(__dirname, '..', 'src', 'data', 'reports');
  }

  // 원시 성적 데이터를 JSON으로 변환
  parseScoreData() {
    const rawData = fs.readFileSync(path.join(this.dataPath, 'scores-raw.txt'), 'utf8');
    const lines = rawData.split('\n').filter(line => line.trim());
    const header = lines[0];
    
    const scores = [];
    
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(' ');
      if (parts.length < 23) continue;
      
      const name = parts[0];
      const course = parts[1];
      
      // 홀별 데이터 파싱 (파 대비 스코어)
      const frontHoles = parts.slice(2, 11).map(s => parseInt(s));
      const frontScore = parseInt(parts[11]);
      const backHoles = parts.slice(12, 21).map(s => parseInt(s));
      const backScore = parseInt(parts[21]);
      const totalScore = parseInt(parts[22]);
      
      // 기수 정보 추출 (이름에서 숫자 기수 추출)
      let generation = '';
      if (name.includes('김현정') || name.includes('박미신') || name.includes('조민정') || name.includes('안정화')) {
        generation = '여성';
      } else {
        // 기본적으로 기수 정보가 없으므로 임시로 설정
        generation = '미상';
      }
      
      scores.push({
        name,
        generation,
        course,
        front: frontScore,
        back: backScore,
        totalScore,
        holes: {
          front: frontHoles,
          back: backHoles
        }
      });
    }
    
    // 총타수 기준으로 정렬
    return scores.sort((a, b) => a.totalScore - b.totalScore);
  }

  // 코스별 통계 계산
  calculateCourseStats(scores) {
    const courseAnalysis = {};
    
    // 코스별 데이터 분리
    scores.forEach(player => {
      const [frontCourse, backCourse] = player.course.split('/');
      
      if (!courseAnalysis[frontCourse]) {
        courseAnalysis[frontCourse] = { front: [], back: [] };
      }
      if (!courseAnalysis[backCourse]) {
        courseAnalysis[backCourse] = { front: [], back: [] };
      }
      
      courseAnalysis[frontCourse].front.push({
        name: player.name,
        generation: player.generation,
        score: player.front
      });
      
      courseAnalysis[backCourse].back.push({
        name: player.name,
        generation: player.generation,
        score: player.back
      });
    });
    
    // 각 코스별 상위 3명 추출
    const courseStats = [];
    Object.keys(courseAnalysis).forEach(courseName => {
      const allPlayers = [
        ...courseAnalysis[courseName].front,
        ...courseAnalysis[courseName].back
      ];
      
      const topPlayers = allPlayers
        .sort((a, b) => a.score - b.score)
        .slice(0, 3);
      
      courseStats.push({
        name: courseName,
        players: allPlayers.length,
        topPlayers
      });
    });
    
    return courseStats;
  }

  // 전체 통계 계산
  calculateOverallStats(scores) {
    const totalScores = scores.map(s => s.totalScore);
    
    return {
      bestScore: Math.min(...totalScores),
      avgScore: Math.round((totalScores.reduce((sum, s) => sum + s, 0) / totalScores.length) * 10) / 10,
      underPar: scores.filter(s => s.totalScore < 72).length,
      eighties: scores.filter(s => s.totalScore >= 80 && s.totalScore < 90).length,
      participants: scores.length
    };
  }

  // 타수 분포 계산
  calculateScoreDistribution(scores) {
    return [
      { range: '70대', count: scores.filter(s => s.totalScore >= 70 && s.totalScore < 80).length },
      { range: '80대', count: scores.filter(s => s.totalScore >= 80 && s.totalScore < 90).length },
      { range: '90대', count: scores.filter(s => s.totalScore >= 90 && s.totalScore < 100).length },
      { range: '100대+', count: scores.filter(s => s.totalScore >= 100).length }
    ];
  }

  // 여성 성적표 추출
  extractFemaleScores(scores) {
    const femaleScores = scores
      .filter(player => player.generation === '여성')
      .map((player, index) => ({ ...player, rank: index + 1 }));
    
    return femaleScores.length > 0 ? femaleScores : null;
  }

  // 경기 리포트 생성
  generateMatchReport(scores, courseStats) {
    const winner = scores[0];
    const runnerUp = scores[1];
    const [winnerFront, winnerBack] = winner.course.split('/');
    
    const headline = `${winner.name}, ${winner.totalScore}타로 3월 정기모임 우승!`;
    const subheadline = `${winnerFront}/${winnerBack} 코스에서 전반 ${winner.front}타, 후반 ${winner.back}타 기록`;
    
    const stories = [
      {
        type: 'winner',
        icon: '🏆',
        title: '우승자 스토리',
        content: `${winner.name}이 ${winner.totalScore}타로 3월 정기모임 우승을 차지했습니다. 전반 ${winner.front}타, 후반 ${winner.back}타를 기록하며 안정적인 경기를 펼쳤습니다.`,
        highlight: `총 ${winner.totalScore}타 기록`
      },
      {
        type: 'runner-up',
        icon: '🥈',
        title: '준우승자 분석',
        content: `${runnerUp.name}이 ${runnerUp.totalScore}타로 아쉬운 준우승을 기록했습니다. 우승자와 ${runnerUp.totalScore - winner.totalScore}타 차이로 아쉬움이 남습니다.`,
        highlight: `${runnerUp.totalScore - winner.totalScore}타 차이`
      },
      {
        type: 'course',
        icon: '⛳',
        title: '코스별 강자',
        content: `${courseStats[0].name} 코스에서 가장 많은 ${courseStats[0].players}명이 플레이했으며, 상위권을 ${courseStats[0].topPlayers[0].name}(${courseStats[0].topPlayers[0].score}타)이 장악했습니다.`,
        highlight: `최다 ${courseStats[0].players}명 참여`
      },
      {
        type: 'difficulty',
        icon: '📊',
        title: '코스 난이도',
        content: `가장 어려운 코스는 평균 타수 기준 ${courseStats.sort((a,b) => 
          (b.topPlayers.reduce((sum, p) => sum + p.score, 0) / 3) - 
          (a.topPlayers.reduce((sum, p) => sum + p.score, 0) / 3)
        )[0].name} 코스로 분석됩니다.`,
        highlight: '코스별 난이도 분석'
      },
      {
        type: 'surprise',
        icon: '⚡',
        title: '깜짝 포인트',
        content: `이번 경기에서 ${scores.filter(s => s.totalScore < 80).length}명이 70대 스코어를 기록하며 수준 높은 경기력을 보여주었습니다.`,
        highlight: `70대 ${scores.filter(s => s.totalScore < 80).length}명 기록`
      }
    ];

    return {
      headline,
      subheadline, 
      stories,
      stats: {
        totalParticipants: scores.length,
        averageScore: Math.round((scores.reduce((sum, s) => sum + s.totalScore, 0) / scores.length) * 10) / 10,
        bestScore: winner.totalScore,
        coursesPlayed: courseStats.length
      }
    };
  }

  // 모임 기본 정보 가져오기
  getMeetingInfo() {
    const meetingInfo = {
      '2025-03': {
        title: '2025년 3월 정기모임 리포트',
        date: '2025-03-15',
        location: '롯데 스카이힐 CC',
        weather: '흐림',
        temperature: '12°C'
      },
      '2025-05': {
        title: '2025년 5월 청구회장배 대회 리포트',
        date: '2025-05-27',
        location: '뉴스프링빌CC (이천)',
        weather: '맑음',
        temperature: '25°C'
      }
    };
    
    return meetingInfo[this.period] || {
      title: `${this.period} 정기모임 리포트`,
      date: this.period,
      location: '골프장명',
      weather: '맑음',
      temperature: '20°C'
    };
  }

  // 기본 시상 내역 생성
  generateDefaultAwards(scores) {
    const awards = [];
    
    // 메달리스트 (최저타수)
    awards.push({
      category: '메달리스트',
      name: scores[0].name,
      generation: scores[0].generation,
      score: `${scores[0].totalScore}타`,
      color: 'from-yellow-400 to-orange-500'
    });
    
    // 70대 기록자들 추가
    const seventies = scores.filter(s => s.totalScore >= 70 && s.totalScore < 80);
    if (seventies.length > 1) {
      awards.push({
        category: '준메달리스트',
        name: scores[1].name,
        generation: scores[1].generation,
        score: `${scores[1].totalScore}타`,
        color: 'from-gray-400 to-gray-500'
      });
    }
    
    return awards;
  }

  // 최종 리포트 데이터 생성
  generate() {
    console.log(`Generating report for ${this.period}...`);
    
    // 성적 데이터 파싱
    const scores = this.parseScoreData();
    console.log(`Parsed ${scores.length} player scores`);
    
    // 모임 기본 정보
    const meetingInfo = this.getMeetingInfo();
    
    // 통계 계산
    const courseStats = this.calculateCourseStats(scores);
    const overallStats = this.calculateOverallStats(scores);
    const scoreDistribution = this.calculateScoreDistribution(scores);
    const femaleScores = this.extractFemaleScores(scores);
    const matchReport = this.generateMatchReport(scores, courseStats);
    const defaultAwards = this.generateDefaultAwards(scores);
    
    // 순위 추가 및 필드명 통일 (totalScore -> score)
    const rankedScores = scores.map((player, index) => ({
      ...player,
      score: player.totalScore, // 필드명 통일
      rank: index + 1
    }));
    
    // 최종 리포트 데이터
    const reportData = {
      title: meetingInfo.title,
      date: meetingInfo.date,
      location: meetingInfo.location,
      weather: meetingInfo.weather,
      temperature: meetingInfo.temperature,
      participants: scores.length,
      avgScore: overallStats.avgScore,
      bestScore: overallStats.bestScore,
      underPar: overallStats.underPar,
      eighties: overallStats.eighties,
      
      // 성적 관련
      scores: rankedScores,
      femaleScores,
      
      // 통계 및 분석
      courseStats,
      scoreDistribution,
      matchReport,
      
      // 시상 (기본 생성된 시상 사용)
      awards: defaultAwards,
      
      // 갤러리 (이미지가 있을 경우)
      gallery: []
    };
    
    // 출력 디렉토리 생성
    if (!fs.existsSync(this.outputPath)) {
      fs.mkdirSync(this.outputPath, { recursive: true });
    }
    
    // JSON 파일로 저장
    const outputFile = path.join(this.outputPath, `${this.period}.json`);
    fs.writeFileSync(outputFile, JSON.stringify(reportData, null, 2));
    
    console.log(`Report generated: ${outputFile}`);
    console.log(`Statistics:`);
    console.log(`- Participants: ${reportData.participants}`);
    console.log(`- Best Score: ${reportData.bestScore}`);
    console.log(`- Average Score: ${reportData.avgScore}`);
    console.log(`- 80s players: ${reportData.eighties}`);
    
    return reportData;
  }
}

// 사용법
if (require.main === module) {
  const period = process.argv[2] || '2025-03';
  const generator = new ReportGenerator(period);
  generator.generate();
}

module.exports = ReportGenerator;