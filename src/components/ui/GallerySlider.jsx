import React, { useState, useEffect } from 'react';

const GallerySlider = ({ images, title, useFirebase = false, baseUrl = '', period = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 모바일 환경 감지
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 768);
      }
    };

    checkMobile();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  // Firebase Storage URL 생성 함수
  const getImageUrl = (imageName) => {
    if (useFirebase) {
      const encodedName = encodeURIComponent(imageName);
      return `https://firebasestorage.googleapis.com/v0/b/chunggu-golf.firebasestorage.app/o/gallery%2F${period}%2F${encodedName}?alt=media`;
    }
    return `${baseUrl}${imageName}`;
  };

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen || isMobile) return; // 모바일에서는 키보드 이벤트 비활성화
      
      if (event.key === 'ArrowLeft') {
        goToPrevious();
      } else if (event.key === 'ArrowRight') {
        goToNext();
      } else if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, currentIndex, isMobile]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'unset';
    }
  };

  // 스와이프 핸들러 (모바일용)
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">갤러리 이미지가 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      {/* 갤러리 그리드 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          📸 {title}
          <span className="text-sm font-normal text-gray-500">
            ({images.length}장)
          </span>
        </h3>
        
        {/* 데스크톱 그리드 */}
        {!isMobile && (
          <div className="grid grid-cols-4 lg:grid-cols-6 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => openModal(index)}
              >
                <img
                  src={getImageUrl(image)}
                  alt={`갤러리 이미지 ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    console.error('이미지 로드 실패:', image);
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* 모바일 슬라이더 */}
        {isMobile && (
          <div className="relative">
            {/* 메인 이미지 */}
            <div 
              className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden relative"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <img
                src={getImageUrl(images[currentIndex])}
                alt={`갤러리 이미지 ${currentIndex + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              
              {/* 모바일 네비게이션 버튼 */}
              <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                ‹
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                ›
              </button>

              {/* 이미지 카운터 */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            </div>

            {/* 모바일 썸네일 */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden cursor-pointer border-2 ${
                    index === currentIndex ? 'border-blue-500' : 'border-transparent'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <img
                    src={getImageUrl(image)}
                    alt={`썸네일 ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* 전체화면 보기 버튼 */}
            <button
              onClick={() => openModal(currentIndex)}
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-medium"
            >
              전체화면으로 보기
            </button>
          </div>
        )}
      </div>

      {/* 모달 슬라이더 (데스크톱 + 모바일 전체화면) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          {/* 닫기 버튼 */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
            aria-label="갤러리 닫기"
          >
            ✕
          </button>

          {/* 데스크톱 네비게이션 */}
          {!isMobile && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300 z-10"
                aria-label="이전 이미지"
              >
                ‹
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300 z-10"
                aria-label="다음 이미지"
              >
                ›
              </button>
            </>
          )}

          {/* 현재 이미지 */}
          <div 
            className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onTouchStart={isMobile ? onTouchStart : undefined}
            onTouchMove={isMobile ? onTouchMove : undefined}
            onTouchEnd={isMobile ? onTouchEnd : undefined}
          >
            <img
              src={getImageUrl(images[currentIndex])}
              alt={`갤러리 이미지 ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* 이미지 카운터 */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>

          {/* 데스크톱 썸네일 네비게이션 */}
          {!isMobile && (
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-12 h-12 flex-shrink-0 rounded overflow-hidden border-2 ${
                    index === currentIndex ? 'border-white' : 'border-transparent'
                  }`}
                >
                  <img
                    src={getImageUrl(image)}
                    alt={`썸네일 ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* 모바일 스와이프 안내 */}
          {isMobile && (
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-white text-xs opacity-70">
              ← 스와이프하여 이동 →
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default GallerySlider;
