// uploadGallery.js - Firebase Storage에 갤러리 이미지 업로드
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

// Firebase 구성 정보
const firebaseConfig = {
  apiKey: "AIzaSyDkcPHQ3a89WwsizzkYC7WF2_B6iAPb9f0",
  authDomain: "chunggu-golf.firebaseapp.com",
  projectId: "chunggu-golf",
  storageBucket: "chunggu-golf.firebasestorage.app",
  messagingSenderId: "548891376636",
  appId: "1:548891376636:web:7bc1d1b3034a46baab9079",
  measurementId: "G-83K93WKFPE"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

async function uploadImages(localPath, storagePath, prefix) {
  try {
    const files = readdirSync(localPath).filter(file => file.endsWith('.jpg'));
    const uploadedUrls = [];
    
    console.log(`📁 ${prefix} 갤러리 업로드 시작 (${files.length}장)`);
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = join(localPath, file);
      const fileBuffer = readFileSync(filePath);
      
      // 원본 파일명 그대로 사용
      const storageRef = ref(storage, `${storagePath}/${file}`);
      
      try {
        // 파일 업로드
        await uploadBytes(storageRef, fileBuffer, {
          contentType: 'image/jpeg'
        });
        
        // 다운로드 URL 생성
        const downloadURL = await getDownloadURL(storageRef);
        uploadedUrls.push({
          originalName: file,
          storageName: file,
          url: downloadURL
        });
        
        console.log(`✅ ${i + 1}/${files.length} - ${file} 업로드 완료`);
      } catch (error) {
        console.error(`❌ ${file} 업로드 실패:`, error);
      }
    }
    
    return uploadedUrls;
  } catch (error) {
    console.error(`❌ ${prefix} 갤러리 업로드 오류:`, error);
    return [];
  }
}

async function main() {
  console.log('🚀 Firebase Storage 갤러리 업로드 시작...\n');
  
  // 3월 갤러리 업로드
  const march2025 = await uploadImages(
    'D:/청구회/01_DATABASE/경기기록/2503/청구회-410회 청구회',
    'gallery/2025-03',
    '3월'
  );
  
  console.log('\n');
  
  // 5월 갤러리 업로드
  const may2025 = await uploadImages(
    'F:/Project/chunggu-golf-test/public/images/reports/2025-05/gallery',
    'gallery/2025-05',
    '5월'
  );
  
  console.log('\n📊 업로드 결과:');
  console.log(`3월: ${march2025.length}장 업로드`);
  console.log(`5월: ${may2025.length}장 업로드`);
  
  // 결과 파일로 저장
  const result = {
    '2025-03': march2025,
    '2025-05': may2025
  };
  
  console.log('\n📄 Gallery URLs:');
  console.log('3월 갤러리:');
  march2025.forEach(img => console.log(`"${img.storageName}": "${img.url}"`));
  
  console.log('\n5월 갤러리:');
  may2025.forEach(img => console.log(`"${img.storageName}": "${img.url}"`));
  
  console.log('\n🎉 업로드 완료!');
}

main().catch(console.error);
