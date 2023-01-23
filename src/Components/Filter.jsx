import { useContext, useEffect, useRef, useState } from 'react';
import { Audio } from './AudioContext';
import FrequencyKnob from './FrequencyKnob';
import NodeContainer from './NodeContainer';
import { Series } from './Series';

export default function Filter({
  initType = 'lowpass',
  initFrequency = '350',
  initDetune = 0,
  initQ = 1,
  initGain = 0,
}) {
  const audio = useContext(Audio);
  const parent = useContext(Series);
  const id = useRef(`Filter${Date.now()}`);
  const [type, setType] = useState(initType);
  const [frequency, setFrequency] = useState(initFrequency);
  const [detune, setDetune] = useState(initDetune);
  const [Q, setQ] = useState(initQ);
  const [gain, setGain] = useState(initGain);
  const node = useRef(
    new BiquadFilterNode(audio.ctx, {
      type,
      frequency,
      detune,
      Q,
      gain,
    })
  );

  function handleChangeType(value) {
    setType(value);
    node.current.type = value;
  }

  function handleChangeFrequency(value) {
    setFrequency(value);
    node.current.frequency.value = value;
  }

  function handleChangeDetune(value) {
    setDetune(value);
    node.current.detune.value = value;
  }

  function handleChangeQ(value) {
    setQ(value);
    node.current.Q.value = value;
  }

  function handleChangeGain(value) {
    setGain(value);
    node.current.gain.value = value;
  }

  useEffect(() => {
    parent.nodes.set(id.current, node.current);

    return () => {
      parent.nodes.delete(id.current);
    };
  });

  return (
    <NodeContainer>
      <label>{`${type} Filter`}</label>
      <FrequencyKnob
        handleChange={handleChangeFrequency}
        frequency={frequency}
      />
    </NodeContainer>
  );
}
