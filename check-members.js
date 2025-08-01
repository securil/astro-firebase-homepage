// 회원 정보 조회 스크립트
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json');

// Firebase Admin 초기화
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://chunggu-golf-default-rtdb.firebaseio.com'
  });
}

const db = admin.firestore();

async function getMembersInfo() {
  try {
    console.log('회원 정보 조회 중...');
    
    const membersSnapshot = await db.collection('members').get();
    const members = [];
    
    membersSnapshot.forEach(doc => {
      const data = doc.data();
      members.push({
        id: doc.id,
        name: data.name,
        generation: data.generation,
        gender: data.gender,
        phone: data.phone
      });
    });

    // 이름순 정렬
    members.sort((a, b) => a.name.localeCompare(b.name));

    console.log('\n=== 전체 회원 정보 ===');
    console.log(`총 회원 수: ${members.length}명\n`);

    members.forEach(member => {
      console.log(`${member.name} - ${member.generation} (${member.gender}) [ID: ${member.id}]`);
    });

    // 3월 모임 참가자들의 정보만 별도 출력
    const marchParticipants = [
      '박세환', '최관호', '오호진', '유대균', '권오성', '진양교', '최치영', 
      '정윤성', '조영승', '이동호', '안정화', '박기홍', '장세걸', '김진만', 
      '이인영', '채웅석', '김종만', '김종국', '안희태', '박미신', '김형찬', 
      '정연삼', '원유동', '박지혁', '조민정', '김재원', '이성일', '정동균', 
      '이상우', '김연중', '이채명', '김현정'
    ];

    console.log('\n=== 3월 모임 참가자 정보 ===');
    marchParticipants.forEach(name => {
      const member = members.find(m => m.name === name);
      if (member) {
        console.log(`${member.name} - ${member.generation} (${member.gender})`);
      } else {
        console.log(`${name} - 정보 없음`);
      }
    });

    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// 스크립트 실행
getMembersInfo();
