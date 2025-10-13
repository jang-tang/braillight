import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../../components/Header/Header';
import './BrailleEditPage.css';

interface BrailleEditPageProps {
  onComplete: () => void;
}

const BrailleEditPage: React.FC<BrailleEditPageProps> = ({ onComplete }) => {
  const [editedText, setEditedText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [originalText] = useState('⠼⠚⠉⠦⠄⠫⠠⠴⠺⠀⠉⠗⠬⠶⠮⠀⠔⠔⠘⠥⠈⠕⠢⠢⠧⠀⠫⠦⠕⠀⠫⠶⠺⠚⠑⠡⠠⠎⠐⠀⠴⠁⠈⠔⠑⠲⠺⠀⠈⠍⠰⠝⠨⠹⠀⠇⠐⠌⠐⠮⠀⠨⠝⠠⠕⠚⠈⠥⠨⠀⠚⠒⠊⠲⠀⠨⠹⠨⠞⠚⠨⠕⠀⠣⠒⠴⠵⠀⠸⠎⠵⠦⠀⠇⠐⠣⠢⠵⠀⠉⠣⠕⠫⠀⠊⠮⠠⠍⠐⠭⠀⠨⠠⠟⠺⠀⠞⠈⠯⠝⠀⠰⠗⠁⠕⠢⠮⠀⠨⠱⠜⠚⠒⠊⠉⠵⠀⠑⠂⠕⠀⠕⠌⠊⠲⠀⠈⠕⠢⠠⠍⠻⠺⠀⠠⠕⠉⠵⠀⠈⠪⠺⠀⠞⠈⠯⠮⠀⠈⠥⠠⠪⠐⠣⠒⠚⠕⠀⠊⠪⠐⠎⠉⠗⠑⠱⠐⠀⠈⠪⠸⠎⠮⠀⠊⠶⠊⠶⠚⠈⠝⠀⠰⠗⠁⠕⠢⠨⠕⠈⠥⠀⠕⠌⠊⠲⠀⠈⠪⠺⠀⠠⠕⠧⠀⠈⠪⠺⠀⠞⠈⠯⠵⠀⠎⠠⠨⠞⠀⠠⠍⠀⠎⠃⠄⠕⠀⠚⠉⠫⠀⠊⠽⠎⠀⠕⠌⠉⠵⠀⠸⠎⠕⠊⠲⠀⠈⠪⠺⠀⠠⠕⠉⠵⠀⠨⠕⠦⠵⠀⠉⠛⠠⠠⠎⠃⠀⠣⠐⠗⠀⠑⠍⠘⠶⠘⠕⠐⠥⠀⠉⠥⠰⠯⠊⠽⠎⠀⠕⠌⠉⠵⠀⠋⠵⠀⠊⠍⠀⠉⠛⠀⠰⠎⠐⠎⠢⠀⠊⠍⠐⠱⠍⠢⠝⠀⠫⠊⠪⠁⠰⠣⠒⠀⠸⠎⠀⠫⠦⠪⠑⠡⠠⠎⠊⠥⠀⠨⠟⠠⠕⠂⠮⠀⠊⠪⠐⠎⠉⠗⠈⠥⠨⠀⠚⠑⠱⠐⠀⠈⠎⠠⠈⠍⠐⠥⠀⠘⠥⠑⠡⠀⠑⠯⠪⠢⠙⠬⠀⠫⠦⠵⠀⠑⠗⠘⠍⠐⠕⠋⠥⠰⠎⠐⠎⠢⠀⠑⠥⠊⠵⠀⠴⠃⠲⠈⠏⠒⠍⠗⠧⠀⠇⠶⠠⠕⠁⠝⠀⠺⠑⠛⠀⠘⠍⠚⠥⠐⠮⠀⠨⠝⠈⠕⠚⠈⠥⠀⠕⠌⠊⠲⠀⠚⠶⠇⠶⠀⠕⠃⠕⠀⠘⠎⠶⠈⠪⠄⠀⠘⠞⠎⠨⠱⠀⠕⠌⠎⠀⠠⠭⠇⠙⠥⠰⠎⠐⠎⠢⠀⠰⠕⠢⠮⠀⠓⠍⠗⠈⠕⠑⠱⠀⠳⠘⠡⠮⠀⠓⠥⠚⠂');
  const [currentPage, setCurrentPage] = useState(4);
  const [totalPages] = useState(21);
  const editableRef = useRef<HTMLDivElement>(null);

  const handleTextClick = () => {
    setIsEditing(true);
    // 편집 모드 진입 시 현재 표시된 텍스트를 편집 텍스트로 설정
    setEditedText(editedText || originalText);
  };


  // 편집 모드에서 커서 위치 보존
  useEffect(() => {
    if (isEditing && editableRef.current) {
      // 편집 모드 진입 시 커서를 텍스트 끝으로 이동
      setTimeout(() => {
        const range = document.createRange();
        const sel = window.getSelection();
        if (editableRef.current) {
          range.selectNodeContents(editableRef.current);
          range.collapse(false);
          sel?.removeAllRanges();
          sel?.addRange(range);
        }
      }, 0);
    }
  }, [isEditing]);

  const handleSave = () => {
    setIsEditing(false);
    // 여기서 편집된 텍스트를 저장하는 로직을 추가할 수 있습니다
    console.log('저장된 텍스트:', editedText);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const newText = target.innerText;
    
    // 편집된 텍스트를 저장
    if (newText === originalText) {
      setEditedText('');
    } else {
      setEditedText(newText);
    }
    
    setIsEditing(false);
  };

  const handleNext = () => {
    if (isEditing) {
      handleSave();
    }
    
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (isEditing) {
      handleSave();
    }
    
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  const renderTextWithEdits = (original: string, edited: string) => {
    // 원본 텍스트를 기준으로 하되, 편집된 부분을 초록색으로 표시
    let result = original;
    
    // 강조 부분은 파란색으로 유지
    result = result.replace(/⠠⠕⠂⠮⠀⠊⠪⠐⠎⠉/g, '<span class="highlight-editable">⠠⠕⠂⠮⠀⠊⠪⠐⠎⠉</span>');
    
    // 편집된 텍스트가 있으면 나머지 부분을 초록색으로 표시
    if (edited && edited !== original) {
      // 원본 텍스트에서 강조 부분을 제외한 나머지를 초록색으로 표시
      result = result.replace(/([^<]*)(<span class="highlight-editable">.*?<\/span>)([^<]*)/g, 
        '<span class="edited-text">$1</span>$2<span class="edited-text">$3</span>');
    }
    
    return result;
  };

  return (
    <div className="braille-edit-page">
      <Header activeTab="braille-edit" />
      
      <main className="braille-edit-main">
        <div className="content-panels">
          {/* Left Panel - Book Image */}
          <div className="panel-wrapper">
            <div className="panel pdf-panel">
              <div className="panel-content">
                <div className="book-image-container">
                  <img
                    src="/assets/book.png"
                    alt="Book"
                    className="book-image"
                  />
                </div>
              </div>
            </div>
            <div className="panel-label">[PDF]</div>
          </div>

          {/* Right Panel - Braille Content */}
          <div className="panel-wrapper">
            <div className="panel braille-panel">
              <div className="text-content">
                {isEditing ? (
                  <div
                    ref={editableRef}
                    className="editable-text"
                    contentEditable
                    onBlur={handleBlur}
                    suppressContentEditableWarning={true}
                  >
                    {editedText}
                  </div>
                ) : (
                  <p onClick={handleTextClick} className="clickable-text">
                    <span dangerouslySetInnerHTML={{ __html: renderTextWithEdits(originalText, editedText) }} />
                  </p>
                )}
              </div>
            </div>
            <div className="panel-label">[점자본]</div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="page-footer">
          <div className="page-info">-{currentPage}/{totalPages}-</div>
          <div className="navigation-buttons">
            <button 
              className={`nav-btn prev-btn ${currentPage === totalPages ? 'submit-state' : ''}`} 
              onClick={handlePrev}
            >
              <ChevronLeft size={16} />
              이전
            </button>
            <button 
              className={`nav-btn next-btn ${currentPage === totalPages ? 'submit-state' : ''}`} 
              onClick={handleNext}
            >
              {currentPage === totalPages ? '제출' : '다음'}
              {currentPage === totalPages ? null : <ChevronRight size={16} />}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BrailleEditPage;
