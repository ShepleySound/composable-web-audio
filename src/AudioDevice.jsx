import { useContext } from 'react';
import Osc from './Components/Oscillator';
import Gain from './Components/Gain';
import { Audio } from './Components/AudioContext';
import { SeriesProvider } from './Components/Series';
import Filter from './Components/Filter';

export default function AudioStuff() {
  const audio = useContext(Audio);

  function checkContext() {
    console.log(audio.ctx);
    console.log(audio.nodes);
  }

  return (
    <div>
      <button onClick={checkContext}>Check Audio</button>
      <div>
        <SeriesProvider>
          <Osc />
          <Filter />
          <Filter />
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
        <SeriesProvider>
          <Osc />
          <Gain />
        </SeriesProvider>
      </div>
    </div>
  );
}
