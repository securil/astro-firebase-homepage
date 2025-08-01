import React, { useState, useEffect } from 'react';

// 모바일 전용 갤러리 컴포넌트
const MobileGallery = ({ images, title, getImageUrl }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 터치 이벤트 핸들러
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

    if (isLeftSwipe && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
        📸 {title}
        <span className="text-sm font-normal text-gray-500">
          ({images.length}장)
        </span>
      </h3>

      {/* 스와이프 카루셀 */}
      <div className="relative">
        <div 
          className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden"
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
        </div>

        {/* 도트 인디케이터 */}
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-2">
          {currentIndex + 1} / {images.length} (좌우로 스와이프)
        </p>
      </div>

      {/* 썸네일 그리드 */}
      <div className="grid grid-cols-4 gap-2">
        {images.slice(0, 8).map((image, index) => (
          <div
            key={index}
            className="aspect-square bg-gray-200 rounded overflow-hidden cursor-pointer"
            onClick={() => setCurrentIndex(index)}
          >
            <img
              src={getImageUrl(image)}
              alt={`썸네일 ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {images.length > 8 && (
        <p className="text-center text-sm text-gray-500">
          +{images.length - 8}장 더 보기
        </p>
      )}
    </div>
  );
};

// 데스크톱 전용 갤러리 컴포넌트
const DesktopGallery = ({ images, title, getImageUrl }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // 키보드 이벤트
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;
      
      if (event.key === 'ArrowLeft') {
        setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
      } else if (event.key === 'ArrowRight') {
        setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
      } else if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, images.length]);

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

  return (
    <>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          📸 {title}
          <span className="text-sm font-normal text-gray-500">
            ({images.length}장)
          </span>
        </h3>
        
        {/* 대형 그리드 */}
        <div className="grid grid-cols-6 lg:grid-cols-8 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-110"
              onClick={() => openModal(index)}
            >
              <img
                src={getImageUrl(image)}
                alt={`갤러리 이미지 ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 라이트박스 모달 */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 z-10"
          >
            ✕
          </button>

          <button
            onClick={() => setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300"
          >
            ‹
          </button>

          <button
            onClick={() => setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300"
          >
            ›
          </button>

          <div className="max-w-[85vw] max-h-[85vh] flex items-center justify-center">
            <img
              src={getImageUrl(images[currentIndex])}
              alt={`갤러리 이미지 ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain shadow-2xl"
            />
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-lg">
            {currentIndex + 1} / {images.length}
          </div>

          {/* 썸네일 바 */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-3 max-w-[80vw] overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-16 h-16 flex-shrink-0 rounded overflow-hidden border-3 ${
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
        </div>
      )}
    </>
  );
};

export { MobileGallery, DesktopGallery };
