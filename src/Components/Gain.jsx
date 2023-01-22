import { useEffect, useRef, useContext } from 'react';

import { Audio } from './AudioContext';
import { Series } from './Series';

export default function Gain({ gain = 0 }) {
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
