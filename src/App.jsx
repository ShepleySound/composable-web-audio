import { useState } from 'react';
import AudioDevice from './AudioDevice';
import { AudioProvider } from './Components/AudioContext';

function App() {
  const [started, setStarted] = useState(false);

  function powerUp() {
    setStarted(true);
  }

  return (
    <div className='h-full bg-slate-800 flex align-center justify-center text-slate-100'>
      {!started && (
        <button onClick={powerUp} className=''>
          Power Up
        </button>
      )}

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
