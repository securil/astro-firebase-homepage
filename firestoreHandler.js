// firestoreHandler.js
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://chunggu-golf.firebaseio.com'
});

const db = admin.firestore();

// 회원 전체 가져오기
async function getAllMembers() {
  const snapshot = await db.collection('members').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// 새 모임 추가
async function addMeeting(meetingId, data) {
  await db.collection('meetings').doc(meetingId).set(data);
}

module.exports = {
  getAllMembers,
  addMeeting
};
