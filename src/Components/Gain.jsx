import { useEffect, useState, useContext } from 'react';

import { Audio } from './AudioContext';
import ConnectableNode from './ConnectableNode';
import GainKnob from './GainKnob';

export default function Gain({ node }) {
  const [gain, setGain] = useState(node.gain.value);

  function changeGain(value) {
    node.gain.value = value;
    setGain(node.gain.value);
  }

  return (
    <div>
      <input
        type='range'
        min={0}
        max={1}
        step={0.01}
        value={gain}
        onChange={(e) => changeGain(e.target.value)}
      />
    </div>
  );
}
