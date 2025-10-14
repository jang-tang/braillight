import React from 'react';
import { colors } from '../../styles/colors';
import './Header.css';

/**
 * Header 컴포넌트의 Props 타입 정의
 * @interface HeaderProps
 * @property {string} activeTab - 현재 활성화된 탭의 ID
 */
interface HeaderProps {
  activeTab: 'upload' | 'text-edit' | 'braille-edit' | 'completed';
}

/**
 * Header 컴포넌트
 * 
 * @description 웹 서비스의 상단 헤더를 담당하는 컴포넌트입니다.
 * - 로고와 브랜드명 표시
 * - 네비게이션 탭들 (점역 시작하기, 텍스트 수정, 점자 수정, 완성 파일)
 * - 현재 활성화된 탭에 시각적 표시
 * 
 * @param {HeaderProps} props - 컴포넌트 props
 * @returns {JSX.Element} 헤더 JSX 요소
 */
const Header: React.FC<HeaderProps> = ({ activeTab }) => {
  // 네비게이션 탭들의 정보를 담은 배열
  // 각 탭은 ID와 표시될 라벨을 가지고 있습니다
  const tabs = [
    { id: 'upload', label: '점역 시작하기' },      // 파일 업로드 단계
    { id: 'text-edit', label: '텍스트 수정' },     // OCR 텍스트 수정 단계
    { id: 'braille-edit', label: '점자 수정' },   // 점자 변환 수정 단계
    { id: 'completed', label: '완성 파일' }        // 최종 파일 다운로드 단계
  ];

  return (
    <header className="header">
      <div className="header-content">
        {/* 로고 영역 */}
        <div className="logo">
          {/* 로고 이미지 (텍스트 포함) */}
          <img 
            src="/assets/Braillight_nobg.png" 
            alt="Braillight Logo" 
            className="logo-image"
          />
        </div>
        
        {/* 네비게이션 탭들 */}
        <nav className="navigation">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
