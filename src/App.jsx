import { useState } from 'react';
import './App.css';
import AudioDevice from './AudioDevice';
import { AudioProvider } from './Components/AudioContext';

function App() {
  const [started, setStarted] = useState(false);

  function powerUp() {
    setStarted(true);
  }

  return (
    <div className='App'>
      {!started && <button onClick={powerUp}>Power Up</button>}

      {started && (
        <>
          <AudioProvider>
            <AudioDevice />
          </AudioProvider>
        </>
      )}
    </div>
  );
}

export default App;
