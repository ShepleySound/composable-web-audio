import { useEffect, useRef, useContext } from 'react';

import { Audio } from './AudioContext';
import ConnectableNode from './ConnectableNode';
import GainKnob from './GainKnob';

export default function Gain({ gain = 0 }) {
  const audio = useContext(Audio);
  const node = useRef(
    new GainNode(audio.ctx, {
      gain,
    })
  );

  function changeGain(value) {
    node.current.gain.value = value;
  }

  return (
    <ConnectableNode node={node.current}>
      <h2>Gain</h2>
      <div>
        <label>volume</label>
        <GainKnob gain={node.current.gain.value} handleChange={changeGain} />
      </div>
    </ConnectableNode>
  );
}
