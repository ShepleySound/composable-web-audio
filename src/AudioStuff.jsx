import { useState, useEffect, useRef, useContext } from 'react';

import { Audio } from './Components/AudioContext';
import { Series, SeriesProvider } from './Components/Series';

function Osc() {
  const audio = useContext(Audio);
  const parent = useContext(Series);
  const node = useRef(new OscillatorNode(audio.ctx));
  const id = useRef(`Osc${Date.now()}`);

  useEffect(() => {
    try {
      node.current.start();
    } catch (err) {
      console.log('Ignoring second start call');
    }
    parent.nodes.set(id.current, node.current);

    return () => {
      node.current.stop();
      node.current.disconnect();
      parent.nodes.delete(id.current);
    };
  }, []);

  return (
    <>
      <button onClick={() => console.log(audio.nodes)}>wow</button>
    </>
  );
}

function Gain() {
  const audio = useContext(Audio);
  const parent = useContext(Series);
  const node = useRef(new GainNode(audio.ctx));
  const id = useRef(`Gain${Date.now()}`);

  useEffect(() => {
    parent.nodes.set(id.current, node.current);

    return () => {
      node.current.disconnect();
      parent.nodes.delete(id.current);
    };
  }, []);

  return (
    <>
      <input onChange={(e) => {}} type='range' min='-2' max='1' step='0.01' />
    </>
  );
}

export default function AudioStuff() {
  const audio = useContext(Audio);

  function checkContext() {
    console.log(audio.ctx);
    console.log(audio.nodes);
  }

  return (
    <>
      <button onClick={checkContext}>Check it</button>
      <SeriesProvider>
        <Osc />
        <Gain />
      </SeriesProvider>
    </>
  );
}
