import { useState, useEffect, useRef, useContext } from 'react';

import { RadioGroup } from '@headlessui/react';

import { Audio } from './AudioContext';
import FrequencyKnob from './FrequencyKnob';
import ConnectableNode from './ConnectableNode';

export default function Osc({ initFrequency = 20, initType = 'sine' }) {
  const audio = useContext(Audio);
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
    return () => {
      // node.current.stop();
      // node.current.disconnect();
    };
  }, []);

  const waveforms = ['sine', 'square', 'sawtooth', 'triangle'];

  function changeType(type) {
    setType(type);
    node.current.type = type;
  }

  function changeFrequency(value) {
    setFrequency(value);
    node.current.frequency.value = value;
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <ConnectableNode node={node.current}>
      <label>Oscillator</label>
      <div>
        <FrequencyKnob handleChange={changeFrequency} frequency={frequency} />
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
    </ConnectableNode>
  );
}
