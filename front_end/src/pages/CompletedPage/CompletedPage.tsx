import React from 'react';
import Header from '../../components/Header/Header';
import './CompletedPage.css';

interface CompletedPageProps {
  onStartOver: () => void;
  uploadedFile: File | null;
}

const CompletedPage: React.FC<CompletedPageProps> = ({ onStartOver, uploadedFile }) => {
  const handleDownload = () => {
    // TODO: Implement file download
    console.log('Downloading completed file...');
  };

  return (
    <div className="completed-page">
      <Header activeTab="completed" />
      
      {/* 메인 슬로건 - 별도 컨테이너 */}
      <div className="slogan-container">
        <div className="slogan">
          <h1 className="slogan-line">
            <span className="highlight">학습의 격차를</span> 뛰어넘어,
          </h1>
          <h1 className="slogan-line">
            <span className="highlight">동등한 배움의 길을</span> 열겠습니다.
          </h1>
        </div>
      </div>

      <main className="completed-main">
        <div className="file-section">
          <div className="file-display">
            <div className="file-icon">
              <img
                src="/assets/com_doc2.svg"
                alt="Completed Document"
                className="file-icon-image"
              />
            </div>
            <p className="file-name">{uploadedFile ? uploadedFile.name.replace('.pdf', '.brf') : '매3비 매일 3회씩...능 기출.brf'}</p>
            <button className="download-btn" onClick={handleDownload}>
              파일 저장하기
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompletedPage;
