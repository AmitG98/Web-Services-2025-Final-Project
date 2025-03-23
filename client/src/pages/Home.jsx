
import Row from '../components/Row.jsx';

function Home() {
    return (
      <div className="home-page">
        {/* תפריט עליון (Navbar) */}
        {/* Banner / cover שמתחלף כל כמה שניות */}
        <Row title="Top 10 Personalized" fetchUrl="/api/programs/top-personalized" />
        <Row title="Newest Releases" fetchUrl="/api/programs/newest" />
        <Row title="Top 10 Most-Watched" fetchUrl="/api/programs/most-watched" />
        {/* וכך הלאה */}
        {/* פוטר */}
      </div>
    );
  }
  export default Home;
  