import { useState, useEffect, useRef, useContext } from 'react';

import { Audio } from './AudioContext';
import FrequencyKnob from './FrequencyKnob';
import { Series } from './Series';

export default function Osc({ initFrequency = 20, initType = 'sine' }) {
  const audio = useContext(Audio);
  const parent = useContext(Series);
  const id = useRef(`Osc${Date.now()}`);
  const [frequency, setFrequency] = useState(initFrequency);
  const node = useRef(
    new OscillatorNode(audio.ctx, {
      frequency,
    })
  );
  const [type, setType] = useState(initType);

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

  useEffect(() => {
    console.log(frequency);
    console.log(node.current.frequency.value);
    node.current.frequency.value = frequency;
  }, [frequency]);

  return (
    <section className='border-slate-600 border-2 p-2 rounded-md flex flex-col items-center justify-center'>
      <h2>Oscillator</h2>
      <div>
        <FrequencyKnob handleChange={setFrequency} frequency={frequency} />
      </div>
      <div>
        <select
          name='osctypes'
          id='osctypes'
          onChange={(e) => {
            node.current.type = e.target.value;
          }}
          className='bg-slate-600'
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
