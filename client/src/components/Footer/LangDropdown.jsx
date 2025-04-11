import React, { useState } from "react";

function LangDropdown() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");

  const languageList = [
    "English", "French", "Spanish", "German", "Chinese", "Arabic", "Hindi"
  ];

  const pickLanguage = (lang) => {
    setCurrentLang(lang);
    setDropdownVisible(false);
  };

  return (
    <>
      <div className="lang-box">
        <button
          className="lang-toggle"
          onClick={() => setDropdownVisible(!dropdownVisible)}
        >
          {currentLang} <span className="arrow-icon">▼</span>
        </button>
        {dropdownVisible && (
          <div className="lang-options">
            {languageList.map((option, i) => (
              <div
                key={i}
                className="lang-item"
                onClick={() => pickLanguage(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .lang-box {
          position: relative;
          width: 160px;
          margin-top: 0.5rem;
        }

        .lang-toggle {
          width: 100%;
          height: 40px;
          background: transparent;
          border: 1px solid #555;
          border-radius: 6px;
          color: white;
          padding: 0 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .lang-options {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.8);
          border: 1px solid #555;
          border-radius: 6px;
          margin-top: 0.25rem;
          max-height: 130px;
          overflow-y: auto;
          z-index: 10;
        }

        .lang-item {
          padding: 0.5rem 1rem;
          cursor: pointer;
        }

        .lang-item:hover {
          background-color: #444;
        }

        .arrow-icon {
          margin-left: 0.5rem;
        }
      `}</style>
    </>
  );
}

export default LangDropdown;
