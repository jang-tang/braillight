import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import './LoadingPage.css';

interface LoadingPageProps {
  onLoadingComplete: () => void;
  loadingType?: 'ocr' | 'braille'; // 로딩 타입 구분
}

const LoadingPage: React.FC<LoadingPageProps> = ({ onLoadingComplete, loadingType = 'ocr' }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 5000; // 5초
    const interval = 50; // 50ms마다 업데이트
    const totalSteps = duration / interval;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / totalSteps) * 100, 100);
      setProgress(Math.floor(newProgress));

      if (currentStep >= totalSteps) {
        clearInterval(progressInterval);
        // 100% 완료 시 다음 화면으로 넘어가기
        setTimeout(() => {
          onLoadingComplete();
        }, 500); // 0.5초 후 다음 화면으로
      }
    }, interval);

    return () => clearInterval(progressInterval);
  }, [onLoadingComplete]);

  return (
    <div className="loading-page">
      <Header activeTab="upload" />
      
      {/* 메인 슬로건 - 로딩 타입에 따라 동적 표시 */}
      <div className="slogan-container">
        <div className="slogan">
          {loadingType === 'ocr' ? (
            <>
              <h1 className="slogan-line">
                <span className="highlight">OCR 추출 단계</span> 를 거치고 있으며,
              </h1>
              <h1 className="slogan-line">
                <span className="highlight">약 12분 정도</span> 남았습니다.
              </h1>
            </>
          ) : (
            <>
              <h1 className="slogan-line">
                <span className="highlight">점자 변환 단계</span> 를 거치고 있으며,
              </h1>
              <h1 className="slogan-line">
                <span className="highlight">약 8분 정도</span> 남았습니다.
              </h1>
            </>
          )}
        </div>
      </div>

      <main className="loading-main">
        <div className="loading-content">

          {/* 원형 스피너 스켈레톤 */}
          <div className="loading-spinner">
            <div className="skeleton-circle">
              {Array.from({ length: 7 }, (_, i) => (
                <div 
                  key={i} 
                  className="skeleton-dot"
                />
              ))}
            </div>
          </div>

          {/* 진행률 바 - UploadPage 스타일 적용 */}
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="progress-text">{progress}%</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoadingPage;
