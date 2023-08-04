// App.js

import React from 'react';
import CrosswordGrid from './Components/Grid/Grid';
import Configurations from './Components/Configurations/Configurations';
import Words from './Components/Words/Words';
import Submit from './Components/Submit/Submit';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1 style={{justifyContent: 'center'}}>Crossword Puzzle Generator</h1>
      <div className="app_container">
        <div className="words_container">
          <Words />
        </div>
        <div className="grid_container">
          <CrosswordGrid />
        </div>
        <div className='config_container'>
          <Configurations />
        </div>
        {/* <Submit /> */}
      </div>
    </div>
  );
}

export default App;
