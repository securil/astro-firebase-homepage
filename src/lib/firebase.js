// src/lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase 구성 정보 (환경 변수 또는 직접 입력)
const firebaseConfig = {
  apiKey: "AIzaSyDkcPHQ3a89WwsizzkYC7WF2_B6iAPb9f0",
  authDomain: "chunggu-golf.firebaseapp.com",
  projectId: "chunggu-golf",
  storageBucket: "chunggu-golf.firebasestorage.app",
  messagingSenderId: "548891376636",
  appId: "1:548891376636:web:7bc1d1b3034a46baab9079",
  measurementId: "G-83K93WKFPE"
};

// 아직 초기화되지 않은 경우에만 초기화
let app;
let db;
let auth;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  console.log("Firebase 초기화 성공!");
} catch (error) {
  console.error("Firebase 초기화 오류:", error);
  // 더미 객체 생성
  db = {};
  auth = {};
}

export { db, auth };