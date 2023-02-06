import { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Audio } from './AudioContext';
import NodeContainer from './NodeContainer';
import GainKnob from './GainKnob';

export const MainGain = createContext();

export function MainGainProvider({ children }) {
  const audio = useContext(Audio);
  const [gain, setGain] = useState(1);

  const node = useRef(
    new GainNode(audio.ctx, {
      gain,
    })
  );

  useEffect(() => {
    node.current.connect(audio.ctx.destination);
  }, []);

  function changeGain(value) {
    setGain(value);
    node.current.gain.value = value;
  }

  return (
    <>
      <MainGain.Provider value={node.current}>{children}</MainGain.Provider>
      <input
        type='range'
        min={0}
        max={1}
        step={0.1}
        value={gain}
        onChange={(e) => changeGain(e.target.value)}
      />
    </>
  );
}
