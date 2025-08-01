// 실제 members 컬렉션에서 회원 정보 조회하여 매핑 생성
const admin = require('firebase-admin');

const serviceAccount = {
  "type": "service_account",
  "project_id": "chunggu-golf",
  "private_key_id": "85ea0e6ce14524347de4d24160f4f23663ef1a17",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC0P0pI1zAUSgcw\n3x+bqhPte7u0EKpPZzxQUZzBQ0tkkU/N8WsUcM07PENb/ESq/epRCEznvkW5nOEA\nm1J/wvQfRTILtfPuVasZQCcAh2FZE0JPetPSjMVxSNjnFg8LnZaKRAEavLc4KFnN\ncWOR+yoNP8eLJ343kByfxacDPtDkSxzhhdkaIlLJb4mkn3OZGdlPK2pHTxDyVMor\nkGTMuzEYULF1JXqtbvs4r8Vgt+EqKw5Mm9B8lKWLcIyr99EHxLkWlL5DmIm2fBmo\n1hsFC3/l9ME0xeOI2ysY+ALVg5lwq+Fg9mNdz6Hxm5bIfyS3Rvh+XVQxUOeV4Mys\nrnopkMoNAgMBAAECggEAE0MGMbWJRknI7fCSJKTuvzyvSOVVBeo+2Eh4a3DBEEy1\nDgmEC2mojPF6M0zIm8tJrIIqEcPUGKtKojF3Bf8z7lmLKRQ3LpuKDsc7w8Mz5Hx5\n5Bt4onH3sYz63OsPDYs4KKtuwMg0/jPVsO4ymUmRa1wK+3RreQ2V+X76Q48FbLfp\n/3wdE1PWrwz3Oml7OL8N/CNxHgmKqJnpvIMVzuqN3MYVgGLViQ1mdcfmUtENB00f\nCOtqndEFhskQnMjcuDmt1sPwWSSCyg4W7WJmla3YL5GixJ90lAAMiQLEGTV7Dx/A\nyslXISP7nuE5vnA57m+JYBK8HFohbKRFvE/W5o6DwQKBgQDvLY3PeZ0eU/uvlocj\nC8bW7CGj2QpM+jvgClM+lb0o2d+JpLJon5OQvCMs6K+oLaCwlNldMLpTyzhmNzd+\nWxi8innh0NaTzsryCQkgEvQ9isjEDeKXnz+zZNCFLVGvwvkQGtxDvh309w2g3TKn\niOa1dnnN3yjjHearRC6iwteLYQKBgQDA7K1SHTTOS/o/XdinB0rCFTNvtYqchecU\njXFV4UxpBlENQm2ggYN8pZXSSb39Ite8oGdlKPUxD6Vf8P8Q943+B5udjjuFQ5v9\nvDohDKY5OJSu3Sbpmr09zSVGf80ELPvDKbIF8iditS6pewIzEE/t8wf60Albhz/E\nzDaw12uKLQKBgQDEA+Nqm9KGXnGwb38E28vzq8XOEDv+5j1X2V5rtjA2YIhwt8d3\nMwCu52E0luYOwIYm8XZKh3rM3Ym1S59xMJtPOXW1+X9B14I/ZeRSovYD0c/DzVVc\nyahdD0xNONzvXKzd5AWMhyzp6+cBZQb0gqABK72bWT6bE5BN4C0QOvqHQQKBgDmG\n2W/A0bwqH6bBfxbfL8WLuNi4k2p06yDPxFnNYpF2lriTdEkGFYUXgwM/he1zdE0E\nr5AUlHhap/9hx0zx5F85OYfTn5/vNxaEB/lO4knxuzQhMbc6su84usK43RM/rprV\nVgY73M6sJAvZaCB93refXmPFoOSwAa3XDv/QXHrJAoGBAIPouGDlcFaZmkii/cM4\nwIfKWxsBIxrKVmTlQpza2R9RIOE31O4GQYHuN9kFBsZQ51IdGMAl/5nrIqgcPcxP\nADDUxJb9EhnXEHnQc0Te2W+Y59FhKQJci5hzwAEQmwaunBFkMpe3+mzttVHxf7w\nGtpKErzfQDt6VYg/OtdlGc4k\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@chunggu-golf.iam.gserviceaccount.com",
  "client_id": "101879572265657170512",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token"
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'chunggu-golf'
  });
}

const db = admin.firestore();

// members 컬렉션에서 이름별 memberId 매핑 조회
const getMemberNameToIdMapping = async () => {
  try {
    console.log('👥 members 컬렉션에서 회원 정보 조회 중...');
    
    const membersRef = db.collection('members');
    const snapshot = await membersRef.get();
    
    const memberNameToId = {};
    
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.name && data.memberId) {
        memberNameToId[data.name] = data.memberId;
      }
    });
    
    console.log('📋 회원 이름-ID 매핑:');
    Object.entries(memberNameToId).forEach(([name, id]) => {
      console.log(`  ${name}: ${id}`);
    });
    
    console.log(`\n총 ${Object.keys(memberNameToId).length}명 회원 정보 조회 완료`);
    
    return memberNameToId;
    
  } catch (error) {
    console.error('❌ 회원 정보 조회 에러:', error);
    return {};
  }
};

// 실행
getMemberNameToIdMapping().then(() => {
  process.exit(0);
});
