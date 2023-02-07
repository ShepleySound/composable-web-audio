import { useContext } from 'react';
import Osc from './Components/Oscillator';
import Gain from './Components/Gain';
import { Audio } from './Components/AudioContext';
import Filter from './Components/Filter';
import Analyser from './Components/Analyser';
import { MainGainProvider } from './Components/MainGain';
import Connector from './Components/Connector';

export default function AudioDevice() {
  return (
    <div className='w-full'>
      <Connector>
        <Osc />
        <Filter />
        <Filter />
        <Gain />
        <Analyser />
      </Connector>
    </div>
  );
}
