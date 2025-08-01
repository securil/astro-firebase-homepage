import React, { useState, useEffect } from 'react';

const PopupModal = ({ imageUrl, altText = "팝업 이미지" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 오늘 하루 보지 않기 체크
    const today = new Date().toDateString();
    const hideUntil = localStorage.getItem('popupHideUntil');
    
    if (!hideUntil || hideUntil !== today) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleHideToday = () => {
    const today = new Date().toDateString();
    localStorage.setItem('popupHideUntil', today);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 bg-black bg-opacity-50">
      <div className="relative bg-transparent rounded-lg shadow-2xl overflow-hidden
        max-h-[90vh] sm:max-h-[85vh] md:max-h-[90vh]">
        
        {/* 닫기 버튼 */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 z-10 
            w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 
            bg-white bg-opacity-90 rounded-full shadow-lg flex items-center justify-center 
            hover:bg-opacity-100 transition-all"
          aria-label="팝업 닫기"
        >
          <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 팝업 이미지 - 전체 화면 */}
        <div className="relative">
          <img
            src={imageUrl}
            alt={altText}
            className="w-auto h-auto object-contain rounded-lg
              max-h-[75vh] sm:max-h-[78vh] md:max-h-[82vh] lg:max-h-[85vh]"
          />
          
          {/* 하단 버튼 영역 - 이미지 위에 오버레이 */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 
            bg-gradient-to-t from-black/70 to-transparent
            flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
            <button
              onClick={handleHideToday}
              className="flex items-center gap-2 text-xs sm:text-sm text-white hover:text-gray-200 transition-colors"
            >
              <input
                type="checkbox"
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white border-white rounded focus:ring-white"
                checked
                readOnly
              />
              <span>오늘 하루 보지 않기</span>
            </button>
            
            <button
              onClick={handleClose}
              className="px-4 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2 
                bg-white text-gray-800 rounded-lg hover:bg-gray-100 
                transition-colors font-medium text-sm sm:text-base shadow-lg"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;