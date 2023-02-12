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
    hasQ: true,
  },
  {
    id: 2,
    value: 'highpass',
    hasGain: false,
    hasQ: true,
  },
  {
    id: 3,
    value: 'bandpass',
    hasGain: false,
    hasQ: true,
  },
  {
    id: 4,
    value: 'lowshelf',
    hasGain: true,
    hasQ: false,
  },
  {
    id: 5,
    value: 'highshelf',
    hasGain: true,
    hasQ: false,
  },
  {
    id: 6,
    value: 'peaking',
    hasGain: true,
    hasQ: true,
  },
  {
    id: 7,
    value: 'notch',
    hasGain: false,
    hasQ: true,
  },
  {
    id: 8,
    value: 'allpass',
    hasGain: false,
    hasQ: true,
  },
];

export default function Filter({ node }) {
  const [type, setType] = useState(matchTypeByString(node.type));
  const [frequency, setFrequency] = useState(node.frequency.value);
  const [detune, setDetune] = useState(node.detune.value);
  const [Q, setQ] = useState(node.Q.value);
  const [gain, setGain] = useState(node.gain.value);
  console.log(node);

  function matchTypeByString(string) {
    return filterTypes.find((type) => type.value === string);
  }

  function handleChangeType(type) {
    node.type = type.value;
    setType(matchTypeByString(node.type));
  }

  function handleChangeFrequency(value) {
    node.frequency.value = value;
    setFrequency(node.frequency.value);
  }

  function handleChangeDetune(value) {
    node.detune.value = value;
    setDetune(node.detune.value);
  }

  function handleChangeQ(value) {
    node.Q.value = value;
    setQ(node.Q.value);
  }

  function handleChangeGain(value) {
    node.gain.value = value;
    setGain(node.gain.value);
  }

  return (
    <>
      <div className='flex w-full'>
        <FrequencyKnob
          handleChange={handleChangeFrequency}
          frequency={frequency}
        />
        {type.hasQ && (
          <RadialDial
            handleChange={handleChangeQ}
            initValue={Q}
            min={0.0001}
            max={100}
            label='Q'
          />
        )}
        {type.hasGain && (
          <RadialDial
            handleChange={handleChangeGain}
            initValue={gain}
            min={-40}
            max={40}
            label='Gain'
            unit='dB'
          />
        )}
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
    </>
  );
}
