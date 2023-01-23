import { useEffect, useRef, useContext } from 'react';

import { Audio } from './AudioContext';
import GainKnob from './GainKnob';
import NodeContainer from './NodeContainer';
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

  function changeGain(value) {
    node.current.gain.value = value;
  }

  useEffect(() => {
    parent.nodes.set(id.current, node.current);

    return () => {
      // node.current.disconnect();
      parent.nodes.delete(id.current);
    };
  }, []);

  return (
    <NodeContainer>
      <h2>Gain</h2>
      <div>
        <label>volume</label>
        <GainKnob gain={node.current.gain.value} handleChange={changeGain} />
      </div>
    </NodeContainer>
  );
}
