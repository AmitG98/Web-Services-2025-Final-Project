import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profiles from './pages/Profiles.js';
import Movies from './pages/Movies.js';
import TVShows from './pages/TVShows.js';
import NewPopular from './pages/NewPopular.js';
import MyList from './pages/MyList.js';
import SearchPage from './pages/SearchPage.js';
import ProgramPage from './pages/ProgramPage.js';
import ReviewPage from './pages/ReviewPage.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tvshows" element={<TVShows />} />
        <Route path="/new-popular" element={<NewPopular />} />
        <Route path="/my-list" element={<MyList />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/program/:programId" element={<ProgramPage />} />
        <Route path="/review/:programId" element={<ReviewPage />} />
      </Routes>
    </Router>
  );
  
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
}

export default App;
