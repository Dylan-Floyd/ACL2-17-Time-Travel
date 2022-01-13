import { useState } from 'react';
import './App.css';
import useTimeTravel from './hooks/useTimeTravel.jsx';

function App() {
  const {
    save,
    undo,
    redo,
    current
  } = useTimeTravel()

  return (
    <div className="App">
      <label>
        Date: 
        <input type='date' value={current} onChange={({target}) => save(target.value)}/>
      </label>
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
    </div>
  );
}

export default App;
