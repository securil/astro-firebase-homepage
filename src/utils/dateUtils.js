// src/utils/dateUtils.js

/**
 * 날짜 문자열을 한국어 형식으로 포맷팅합니다.
 * @param {string} dateString - ISO 날짜 문자열 (예: '2025-03-25T11:00:00')
 * @returns {string} 포맷팅된 날짜 문자열 (예: '2025년 3월 25일 화요일 오전 11:00')
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  
  // 한국어 로케일로 날짜 포맷팅
  return date.toLocaleDateString('ko-KR', options);
}

/**
 * 날짜를 간단한 형식으로 포맷팅합니다 (월일만)
 * @param {string} dateString - ISO 날짜 문자열
 * @returns {string} 포맷팅된 날짜 (예: '3월 25일')
 */
export function formatShortDate(dateString) {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

/**
 * 현재 날짜와 비교하여 지났는지 여부를 확인합니다
 * @param {string} dateString - ISO 날짜 문자열
 * @returns {boolean} 날짜가 지났으면 true, 아니면 false
 */
export function isPastDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  return date < now;
}

/**
 * 년월 포맷 (YYYY년 MM월)으로 변환합니다
 * @param {string} dateString - ISO 날짜 문자열
 * @returns {string} 포맷팅된 년월 (예: '2025년 3월')
 */
export function formatYearMonth(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long' };
  return date.toLocaleDateString('ko-KR', options);
}

/**
 * 두 날짜 사이의 차이를 일 단위로 계산합니다
 * @param {string} dateString1 - 첫 번째 ISO 날짜 문자열
 * @param {string} dateString2 - 두 번째 ISO 날짜 문자열
 * @returns {number} 두 날짜 사이의 일수 차이
 */
export function daysBetween(dateString1, dateString2) {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * D-day 형식으로 변환합니다
 * @param {string} dateString - ISO 날짜 문자열
 * @returns {string} D-day 형식 (예: 'D-7', 'D-Day', 'D+3')
 */
export function formatDDay(dateString) {
  const targetDate = new Date(dateString);
  const today = new Date();
  
  // 시간 부분 제거하고 날짜만 비교
  targetDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  const diffTime = targetDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'D-Day';
  if (diffDays > 0) return `D-${diffDays}`;
  return `D+${Math.abs(diffDays)}`;
}