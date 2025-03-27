import React from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Row from '../components/Row';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <Banner />
      <Row title="Top Picks for You" />
      <Row title="New Releases" />
      <Row title="Most Watched This Week" />
      <Row title="Reviewed by You" />
      <Row title="Top Rated" />
      <Row title="Animated" />
      <Row title="Your Category" />
      <Row title="My List" />
      <Footer />
    </div>
  );
};

export default Home;
