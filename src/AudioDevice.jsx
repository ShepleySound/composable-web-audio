import { useContext } from 'react';
import Osc from './Components/Oscillator';
import Gain from './Components/Gain';
import { Audio } from './Components/AudioContext';
import { SeriesProvider } from './Components/Series';
import Filter from './Components/Filter';
import Analyser from './Components/Analyser';
import { MainGainProvider } from './Components/MainGain';

export default function AudioStuff() {
  const audio = useContext(Audio);

  function checkContext() {
    console.log(audio.ctx);
    console.log(audio.nodes);
  }

  return (
    <div className='w-full'>
      <button onClick={checkContext}>Check Audio</button>
      <div>
        <MainGainProvider className='flex flex-col w-full'>
          <SeriesProvider>
            <Osc />
            <Filter />
            <Filter />
            <Gain />
            <Analyser />
          </SeriesProvider>
          <SeriesProvider>
            <Osc />
            <Gain />
          </SeriesProvider>
          <SeriesProvider>
            <Osc />
            <Gain />
          </SeriesProvider>
          <SeriesProvider>
            <Osc />
            <Gain />
          </SeriesProvider>
        </MainGainProvider>
      </div>
    </div>
  );
}
