import React from "react";
import FooterSection from "./FooterSection";
import LangDropdown from "./LangDropdown";

function Footer() {
  return (
    <>
      <footer className="footer-wrapper">
        <div className="footer-container">
          <p className="footer-contact">Questions? Call 1-844-505-2993</p>
          <div className="footer-grid">
            <FooterSection
              items={["FAQ", "Privacy", "Ad Choices"]}
              custom={<LangDropdown />}
            />
            <FooterSection items={["Help Center", "Cookie Preferences"]} />
            <FooterSection items={["Netflix Shop", "Corporate Information"]} />
            <FooterSection
              items={["Terms of Use", "Do Not Sell My Personal Information"]}
            />
          </div>
        </div>
      </footer>

      <style>{`
  .footer-wrapper {
    width: 100%;
    background-color: #0f0f0f;
    color: white;
    padding: 2rem 0;
    position: relative;
    z-index: 20;
  }

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .footer-contact {
    font-size: 1rem;
  }

  .footer-grid {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`}</style>
    </>
  );
}

export default Footer;
