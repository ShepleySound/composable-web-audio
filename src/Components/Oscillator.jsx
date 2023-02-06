import { useState, useEffect, useRef, useContext } from 'react';

import { RadioGroup } from '@headlessui/react';

import { Audio } from './AudioContext';
import FrequencyKnob from './FrequencyKnob';
import { Series } from './Series';
import NodeContainer from './NodeContainer';

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
    // console.log(frequency);
    // console.log(node.current.frequency.value);
    node.current.frequency.value = frequency;
  }, [frequency]);

  const waveforms = ['sine', 'square', 'sawtooth', 'triangle'];

  function changeType(type) {
    setType(type);
    node.current.type = type;
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <NodeContainer>
      <label>Oscillator</label>
      <div>
        <FrequencyKnob handleChange={setFrequency} frequency={frequency} />
      </div>
      <div>
        <RadioGroup value={type} onChange={changeType}>
          <div className='mt-4 grid grid-cols-2'>
            {waveforms.map((waveform) => {
              return (
                <RadioGroup.Option
                  key={waveform}
                  value={waveform}
                  className={({ active, checked }) =>
                    classNames(
                      active && checked ? 'ring ring-offset-1' : '',
                      !active && checked ? 'ring-2' : '',
                      '-m-0.5 relative p-0.5 rounded-sm flex items-center justify-center cursor-pointer focus:outline-none'
                    )
                  }
                  onClick={() => changeType(waveform)}
                >
                  <RadioGroup.Label as='span' className='sr-only'>
                    {waveform}
                  </RadioGroup.Label>
                  <span
                    aria-hidden='true'
                    className='h-8 w-8 border border-black border-opacity-10 rounded-md'
                  />
                  {waveform}
                </RadioGroup.Option>
              );
            })}
          </div>
        </RadioGroup>
      </div>
    </NodeContainer>
  );
}
