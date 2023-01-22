import { useState, useEffect, useRef, useContext } from 'react';

import { Audio } from './Components/AudioContext';
import { Series, SeriesProvider } from './Components/Series';

function Osc({ frequency = 2000 }) {
  const audio = useContext(Audio);
  const parent = useContext(Series);
  const node = useRef(
    new OscillatorNode(audio.ctx, {
      frequency,
    })
  );
  const id = useRef(`Osc${Date.now()}`);

  useEffect(() => {
    try {
      node.current.start();
    } catch (err) {
      console.log('Ignoring second start call');
    }
    parent.nodes.set(id.current, node.current);

    return () => {
      // node.current.stop();
      // node.current.disconnect();
      parent.nodes.delete(id.current);
    };
  }, []);

  return (
    <section>
      <h2>Oscillator</h2>
      <div>
        <label>freq</label>
        <input
          onChange={(e) => {
            console.log(e.target.value);
            node.current.frequency.value = e.target.value;
          }}
          type='range'
          defaultValue={frequency}
          min='20'
          max='5000'
          step='0.01'
        />
        <select
          name='osctypes'
          id='osctypes'
          onChange={(e) => {
            node.current.type = e.target.value;
          }}
        >
          <option value='sine'>sine</option>
          <option value='square'>square</option>
          <option value='sawtooth'>sawtooth</option>
          <option value='triangle'>triangle</option>
        </select>
      </div>
    </section>
  );
}

function Gain({ gain = 0.5 }) {
  const audio = useContext(Audio);
  const parent = useContext(Series);
  const node = useRef(
    new GainNode(audio.ctx, {
      gain,
    })
  );
  const id = useRef(`Gain${Date.now()}`);

  useEffect(() => {
    parent.nodes.set(id.current, node.current);

    return () => {
      // node.current.disconnect();
      parent.nodes.delete(id.current);
    };
  }, []);

  return (
    <section>
      <h2>Gain</h2>
      <div>
        <label>volume</label>
        <input
          onChange={(e) => {
            console.log(e.target.value);
            node.current.gain.value = e.target.value;
          }}
          type='range'
          defaultValue={gain}
          min='0'
          max='1'
          step='0.01'
        />
      </div>
    </section>
  );
}

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
          <Gain />
        </SeriesProvider>
      </div>
    </div>
  );
}
