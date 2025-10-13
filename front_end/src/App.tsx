import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './styles/global.css';

// 페이지 컴포넌트들 import
import UploadPage from './pages/UploadPage/UploadPage';
import LoadingPage from './pages/LoadingPage/LoadingPage';
import TextEditPage from './pages/TextEditPage/TextEditPage';
import BrailleEditPage from './pages/BrailleEditPage/BrailleEditPage';
import CompletedPage from './pages/CompletedPage/CompletedPage';

/**
 * 애플리케이션의 메인 컨텐츠 컴포넌트
 * 
 * @description 라우팅과 상태 관리를 담당하는 메인 컴포넌트입니다.
 * - 파일 업로드부터 완성 파일 다운로드까지의 전체 워크플로우 관리
 * - 각 단계별 페이지 간 네비게이션 처리
 * - 업로드된 파일 정보 전역 상태 관리
 */
function AppContent() {
  const navigate = useNavigate(); // React Router의 네비게이션 훅
  const [uploadedFile, setUploadedFile] = useState<File | null>(null); // 업로드된 파일 상태

  /**
   * 파일 업로드 처리 함수
   * @param {File} file - 업로드된 파일 객체
   */
  const handleFileUpload = (file: File) => {
    setUploadedFile(file); // 파일 상태 업데이트
    navigate('/loading'); // 로딩 페이지로 이동
  };

  /**
   * 로딩 완료 처리 함수
   * 텍스트 수정 페이지로 이동합니다.
   */
  const handleLoadingComplete = () => {
    navigate('/text-edit');
  };

  /**
   * 텍스트 수정 완료 처리 함수
   * 점자 변환을 위한 로딩 페이지로 이동합니다.
   */
  const handleTextEditComplete = () => {
    navigate('/loading-braille');
  };

  /**
   * 점자 변환 로딩 완료 처리 함수
   * 점자 수정 페이지로 이동합니다.
   */
  const handleBrailleLoadingComplete = () => {
    navigate('/braille-edit');
  };

  /**
   * 점자 수정 완료 처리 함수
   * 완성 파일 페이지로 이동합니다.
   */
  const handleBrailleEditComplete = () => {
    navigate('/completed');
  };

  /**
   * 처음부터 다시 시작 처리 함수
   * 업로드 페이지로 돌아가고 파일 상태를 초기화합니다.
   */
  const handleStartOver = () => {
    navigate('/upload');
    setUploadedFile(null); // 파일 상태 초기화
  };


  return (
    <div className="App">
      {/* React Router의 라우트 설정 */}
      <Routes>
        {/* 루트 경로는 업로드 페이지로 리다이렉트 */}
        <Route path="/" element={<Navigate to="/upload" replace />} />
        
        {/* 파일 업로드 페이지 */}
        <Route 
          path="/upload" 
          element={
            <UploadPage 
              onFileUpload={handleFileUpload}        // 파일 업로드 콜백
              uploadedFile={uploadedFile}           // 현재 업로드된 파일
            />
          } 
        />
        
        {/* 로딩 페이지 (OCR 처리 중) */}
        <Route 
          path="/loading" 
          element={
            <LoadingPage 
              onLoadingComplete={handleLoadingComplete}  // 로딩 완료 콜백
              loadingType="ocr"                          // OCR 로딩 타입
            />
          } 
        />
        
        {/* 점자 변환 로딩 페이지 */}
        <Route 
          path="/loading-braille" 
          element={
            <LoadingPage 
              onLoadingComplete={handleBrailleLoadingComplete}  // 점자 변환 로딩 완료 콜백
              loadingType="braille"                             // 점자 변환 로딩 타입
            />
          } 
        />
        
        {/* 텍스트 수정 페이지 */}
        <Route 
          path="/text-edit" 
          element={
            <TextEditPage 
              onComplete={handleTextEditComplete}   // 텍스트 수정 완료 콜백
            />
          } 
        />
        
        {/* 점자 수정 페이지 */}
        <Route 
          path="/braille-edit" 
          element={
            <BrailleEditPage 
              onComplete={handleBrailleEditComplete} // 점자 수정 완료 콜백
            />
          } 
        />
        
        {/* 완성 파일 페이지 */}
        <Route 
          path="/completed" 
          element={
            <CompletedPage 
              onStartOver={handleStartOver}         // 처음부터 다시 시작 콜백
              uploadedFile={uploadedFile}           // 원본 파일 정보
            />
          } 
        />
      </Routes>
    </div>
  );
}

/**
 * 메인 App 컴포넌트
 * 
 * @description React Router를 설정하고 전체 애플리케이션을 감싸는 최상위 컴포넌트입니다.
 * BrowserRouter를 사용하여 클라이언트 사이드 라우팅을 구현합니다.
 */
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;