import React, { useState } from 'react';
import { CloudUpload } from 'lucide-react';
import Header from '../../components/Header/Header';
import './UploadPage.css';

/**
 * UploadPage 컴포넌트의 Props 타입 정의
 * @interface UploadPageProps
 * @property {function} onFileUpload - 파일 업로드 시 호출되는 콜백 함수
 * @property {File | null} uploadedFile - 현재 업로드된 파일 (없으면 null)
 */
interface UploadPageProps {
  onFileUpload: (file: File) => void;
  uploadedFile: File | null;
}

/**
 * 파일 업로드 페이지 컴포넌트
 * 
 * @description 사용자가 PDF 파일을 업로드하는 초기 화면입니다.
 * - 드래그 앤 드롭으로 파일 업로드 지원
 * - 파일 선택 버튼으로 업로드 지원
 * - 업로드된 파일 정보 표시 및 점역 시작 버튼
 * 
 * @param {UploadPageProps} props - 컴포넌트 props
 * @returns {JSX.Element} 업로드 페이지 JSX 요소
 */
const UploadPage: React.FC<UploadPageProps> = ({ onFileUpload, uploadedFile }) => {
  // 드래그 앤 드롭 상태 관리 (파일을 드래그하고 있는지 여부)
  const [isDragOver, setIsDragOver] = useState(false);
  // 로컬 파일 상태 관리 (업로드 영역에 표시할 파일)
  const [localFile, setLocalFile] = useState<File | null>(null);
  // 업로드 진행률 상태 관리
  const [uploadProgress, setUploadProgress] = useState(0);
  // 업로드 진행 중 상태 관리
  const [isUploading, setIsUploading] = useState(false);
  // 업로드 완료 상태 관리
  const [isUploadComplete, setIsUploadComplete] = useState(false);

  /**
   * 드래그 오버 이벤트 핸들러
   * 파일을 드래그하여 업로드 영역 위로 올렸을 때 호출됩니다.
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // 기본 드래그 동작 방지
    setIsDragOver(true); // 드래그 상태 활성화
  };

  /**
   * 드래그 리브 이벤트 핸들러
   * 파일을 드래그하여 업로드 영역을 벗어났을 때 호출됩니다.
   */
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false); // 드래그 상태 비활성화
  };

  /**
   * 업로드 시뮬레이션 함수
   * 1.5초 동안 진행률 애니메이션을 실행합니다.
   */
  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setIsUploadComplete(false);
    setUploadProgress(0);

    const duration = 1500; // 1.5초
    const interval = 50; // 50ms마다 진행률 업데이트
    const totalSteps = duration / interval;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      const progress = Math.min((currentStep / totalSteps) * 100, 100);
      setUploadProgress(Math.floor(progress));

      if (currentStep >= totalSteps) {
        clearInterval(progressInterval);
        setUploadProgress(100);

        // 업로드 완료 후 상태 변경
        setTimeout(() => {
          setIsUploading(false);
          setIsUploadComplete(true);
          setUploadProgress(0);
        }, 200);
      }
    }, interval);
  };

  /**
   * 드롭 이벤트 핸들러
   * 파일을 드래그하여 업로드 영역에 놓았을 때 호출됩니다.
   */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false); // 드래그 상태 비활성화

    const files = e.dataTransfer.files; // 드롭된 파일들 가져오기
    if (files.length > 0) {
      const file = files[0];
      setLocalFile(file); // 로컬 상태에 파일 저장
      simulateUpload(file); // 🔥 업로드 시뮬레이션 실행
    }
  };

  /**
   * 파일 입력 이벤트 핸들러
   * 파일 선택 버튼을 통해 파일을 선택했을 때 호출됩니다.
   */
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; // 선택된 파일들 가져오기
    if (files && files.length > 0) {
      const file = files[0];
      setLocalFile(file); // 로컬 상태에 파일 저장
      simulateUpload(file); // 🔥 업로드 시뮬레이션 실행
    }
  };

  /**
   * 점역 시작 버튼 클릭 핸들러
   * 업로드 완료 후 점역 프로세스를 시작합니다.
   */
  const handleStartConversion = () => {
    if (localFile) {
      onFileUpload(localFile);
    }
  };

  /**
   * 파일 제거 버튼 클릭 핸들러
   * 업로드된 파일을 제거합니다.
   */
  const handleRemoveFile = () => {
    setLocalFile(null); // 로컬 파일 상태 초기화
    setIsUploading(false); // 업로드 상태 초기화
    setIsUploadComplete(false); // 업로드 완료 상태 초기화
    setUploadProgress(0); // 진행률 초기화
  };

  return (
    <div className="upload-page">
      {/* 상단 헤더 - 현재 'upload' 탭이 활성화됨 */}
      <Header activeTab="upload" />
      
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

      <main className="upload-main">
        {/* 파일 업로드 섹션 */}
        <div className="upload-section">
          {!localFile ? (
            /* 파일이 선택되지 않은 상태 - 업로드 영역 표시 */
            <div 
              className={`upload-area ${isDragOver ? 'drag-over' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {/* 업로드 아이콘 (클라우드 업로드) */}
              <div className="upload-icon">
              <CloudUpload className="upload-icon-svg" strokeWidth={1.5}/>
              </div>
              {/* 업로드 안내 텍스트 */}
              <p className="upload-text">드래그 앤 드랍 파일 넣기</p>
              <p className="upload-format">지원 형식 - PDF</p>
              <button className="upload-btn">파일 업로드하기</button>
              {/* 숨겨진 파일 입력 요소 */}
              <input 
                type="file" 
                accept=".pdf" 
                onChange={handleFileInput}
                className="file-input"
              />
            </div>
          ) : (
            /* 파일이 선택된 상태 - 파일 정보 및 점역 시작 버튼 표시 */
            <div className="file-display">
              {/* 파일 제거 버튼 */}
              <button className="close-btn" onClick={handleRemoveFile}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
              {/* 파일 아이콘 */}
              <div className="file-icon">
                <img 
                  src="/assets/upload_doc.png" 
                  alt="Upload Document" 
                  className="file-icon-image"
                />
              </div>
              {/* 파일명 표시 */}
              <p className="file-name">{localFile.name}</p>
              
              {/* 업로드 진행률 바 (업로드 중일 때만 표시) */}
              {isUploading && (
                <div className="progress-container">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{uploadProgress}%</span>
                </div>
              )}

              {/* 점역 시작하기 버튼 (업로드 완료 후에만 표시) */}
              {isUploadComplete && (
                <button
                  className="start-btn"
                  onClick={handleStartConversion}
                >
                  점역 시작하기
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UploadPage;
