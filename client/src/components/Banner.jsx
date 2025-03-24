import React, { useEffect, useState } from 'react';
import './Banner.css';

const mockPrograms = [
  {
    title: 'Stranger Things',
    description: 'A thrilling Netflix original series set in the 80s.',
    backdrop: 'https://image.tmdb.org/t/p/original/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg',
  },
  {
    title: 'Wednesday',
    description: 'The Addams Family spin-off with a gothic twist.',
    backdrop: 'https://image.tmdb.org/t/p/original/9mDFjfw3aIYDFu1eEYuZyXH9yW0.jpg',
  },
  {
    title: 'The Witcher',
    description: 'A mutated monster-hunter struggles to find his place.',
    backdrop: 'https://image.tmdb.org/t/p/original/zrPpUlehQaBf8YX2NrVrKK8IEpf.jpg',
  },
  {
    title: 'Breaking Bad',
    description: 'A chemistry teacher turns to making meth.',
    backdrop: 'https://image.tmdb.org/t/p/original/84XPpjGvxNyExjSuLQe0SzioErt.jpg',
  },
];

const Banner = () => {
  const [program, setProgram] = useState(null);

  useEffect(() => {
    const random = Math.floor(Math.random() * mockPrograms.length);
    setProgram(mockPrograms[random]);
  }, []);

  if (!program) return null;

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(${program.backdrop})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="banner-contents">
        <h1 className="banner-title">{program.title}</h1>
        <p className="banner-description">{program.description}</p>
        <div className="banner-buttons">
          <button className="banner-button">More Info</button>
        </div>
      </div>
      <div className="banner-fadeBottom" />
    </header>
  );
};

export default Banner;
