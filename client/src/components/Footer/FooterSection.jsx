import React from "react";
import { Link } from "react-router-dom";

function FooterSection({ items, custom }) {
  return (
    <>
      <div className="footer-col">
        {items.map((label, idx) => (
          <Link key={idx} to="/" className="footer-link">
            {label}
          </Link>
        ))}
        {custom}
      </div>

      <style>{`
        .footer-col {
          width: 100%;
          max-width: 25%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .footer-link {
          color: #bbb;
          text-decoration: underline;
          cursor: pointer;
          transition: color 0.2s ease-in-out;
        }

        .footer-link:hover {
          color: white;
        }
      `}</style>
    </>
  );
}

export default FooterSection;
