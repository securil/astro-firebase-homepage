const admin = require('firebase-admin');
const serviceAccount = require('F:\\Project\\chunggu-golf-test\\firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "chunggu-golf.firebasestorage.app"
});

async function setupAdmin() {
  try {
    // 관리자 계정 생성 또는 가져오기
    let userRecord;
    try {
      userRecord = await admin.auth().getUserByEmail('admin@chunggu.com');
      console.log('기존 관리자 계정 발견:', userRecord.uid);
    } catch (error) {
      // 계정이 없는 경우 새로 생성
      userRecord = await admin.auth().createUser({
        email: 'admin@chunggu.com',
        password: '132400admin',
        displayName: '관리자'
      });
      console.log('새 관리자 계정 생성됨:', userRecord.uid);
    }
    
    // 관리자 클레임 추가
    await admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });
    console.log('관리자 권한 설정 완료');
    
    // 설정 확인
    const updatedUser = await admin.auth().getUser(userRecord.uid);
    console.log('사용자 클레임:', updatedUser.customClaims);
  } catch (error) {
    console.error('오류 발생:', error);
  }
}

// 실행
setupAdmin().then(() => {
  console.log('관리자 설정 완료');
  process.exit(0);
}).catch(error => {
  console.error('실행 중 오류 발생:', error);
  process.exit(1);
});
