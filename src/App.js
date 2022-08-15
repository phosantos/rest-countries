import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Detail from './Components/Detail';
import { Link } from 'react-router-dom';

function App() {
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark-mode');
    else document.documentElement.classList.remove('dark-mode');
  }, [darkMode]);

  function handleClick() {
    setDarkMode(!darkMode);
  }

  return (
    <div className="App">
      <Router>
        <header>
          <div className="container">
            <Link to="/">Where in the World?</Link>
            <button className="darkModeBtn" onClick={handleClick}>
              <ion-icon name={darkMode ? 'moon' : 'moon-outline'} />
              Dark Mode
            </button>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:countryCode" element={<Detail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
