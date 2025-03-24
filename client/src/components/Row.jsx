import React, { useEffect, useState } from 'react';
import './Row.css';

const mockData = [
  {
    id: 1,
    title: 'Breaking Bad',
    poster: 'https://image.tmdb.org/t/p/w300/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
  },
  {
    id: 2,
    title: 'Stranger Things',
    poster: 'https://image.tmdb.org/t/p/w300/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg',
  },
  {
    id: 3,
    title: 'The Crown',
    poster: 'https://image.tmdb.org/t/p/w300/el1bsEMRzQxJzNdk7Q0VYneCEiM.jpg',
  },
  {
    id: 4,
    title: 'Wednesday',
    poster: 'https://image.tmdb.org/t/p/w300/9mDFjfw3aIYDFu1eEYuZyXH9yW0.jpg',
  },
  {
    id: 5,
    title: 'The Witcher',
    poster: 'https://image.tmdb.org/t/p/w300/zrPpUlehQaBf8YX2NrVrKK8IEpf.jpg',
  },
  {
    id: 6,
    title: 'Squid Game',
    poster: 'https://image.tmdb.org/t/p/w300/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg',
  },
];

const Row = ({ title }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // בעתיד נשלוף API אמיתי
    setItems(mockData);
  }, []);

  return (
    <div className="row">
      <h2 className="row-title">{title}</h2>
      <div className="row-posters">
        {items.map((item) => (
          <div key={item.id} className="row-poster">
            <img src={item.poster} alt={item.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Row;
