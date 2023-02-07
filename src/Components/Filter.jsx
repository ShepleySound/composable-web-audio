import { Listbox } from '@headlessui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { Audio } from './AudioContext';
import ConnectableNode from './ConnectableNode';
import FrequencyKnob from './FrequencyKnob';
import RadialDial from './RadialDial';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

const filterTypes = [
  {
    id: 1,
    value: 'lowpass',
    hasGain: false,
  },
  {
    id: 2,
    value: 'highpass',
    hasGain: false,
  },
  {
    id: 3,
    value: 'bandpass',
    hasGain: false,
  },
  {
    id: 4,
    value: 'lowshelf',
    hasGain: false,
  },
  {
    id: 5,
    value: 'highshelf',
    hasGain: false,
  },
  {
    id: 6,
    value: 'peaking',
    hasGain: false,
  },
  {
    id: 7,
    value: 'notch',
    hasGain: false,
  },
  {
    id: 8,
    value: 'allpass',
    hasGain: false,
  },
];

export default function Filter({
  initType = filterTypes[0],
  initFrequency = '350',
  initDetune = 0,
  initQ = 1,
  initGain = 0,
}) {
  const audio = useContext(Audio);
  const [type, setType] = useState(initType);
  const [frequency, setFrequency] = useState(initFrequency);
  const [detune, setDetune] = useState(initDetune);
  const [Q, setQ] = useState(initQ);
  const [gain, setGain] = useState(initGain);
  const node = useRef(
    new BiquadFilterNode(audio.ctx, {
      type: type.value,
      frequency,
      detune,
      Q,
      gain,
    })
  );

  function handleChangeType(type) {
    setType(type);
    node.current.type = type.value;
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

  return (
    <ConnectableNode node={node.current} title='Biquad Filter'>
      <div className='flex w-full'>
        <FrequencyKnob
          handleChange={handleChangeFrequency}
          frequency={frequency}
        />
        <RadialDial
          handleChange={handleChangeDetune}
          initValue={Q}
          min={0.0001}
          max={1000}
          label='Q'
        />
        <Listbox value={type} onChange={handleChangeType}>
          <div className='relative mt-1 w-full'>
            <Listbox.Button className='relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm text-black'>
              <span className='block truncate'>{type.value}</span>
              <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                <ChevronUpDownIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>
            <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50'>
              {filterTypes.map((filterType) => (
                <Listbox.Option
                  key={filterType.id}
                  value={filterType}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {filterType.value}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>
    </ConnectableNode>
  );
}
