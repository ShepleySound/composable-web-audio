import { useState } from 'react';

import { RadioGroup } from '@headlessui/react';

export default function Osc({ node }) {
  const [frequency, setFrequency] = useState(node.frequency.value);
  const [type, setType] = useState(node.type);

  const waveforms = ['sine', 'square', 'sawtooth', 'triangle'];

  function changeType(type) {
    node.type = type;
    setType(node.type);
  }

  function changeFrequency(value) {
    node.frequency.value = value;
    setFrequency(node.frequency.value);
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div className='h-full w-full'>
      <div>
        <input
          type='range'
          min={80}
          max={20000}
          step={0.1}
          value={frequency}
          onChange={(e) => changeFrequency(e.target.value)}
        />
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
                      'm-0.5 relative p-0.5 rounded-sm flex items-center justify-center cursor-pointer focus:outline-none'
                    )
                  }
                  onClick={() => changeType(waveform)}
                >
                  <RadioGroup.Label as='span' className='sr-only'>
                    {waveform}
                  </RadioGroup.Label>
                  <span
                    aria-hidden='true'
                    className='h-12 border border-black border-opacity-10 rounded-md'
                  />
                  {waveform}
                </RadioGroup.Option>
              );
            })}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
