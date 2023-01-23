import { useState } from 'react';
import {
  CircularInput,
  CircularTrack,
  CircularProgress,
  CircularThumb,
} from 'react-circular-input';

export default function FrequencyKnob({ handleChange, frequency }) {
  const [inputValue, setInputValue] = useState(frequency);
  const [value, setValue] = useState(0);
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const range = [20, 20000];
  const valueToFrequency = Math.round(value * (range[1] - range[0]) + range[0]);

  function frequencyToValue(frequency, min, max) {
    return (frequency - min) / (max - min);
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <h3>Frequency</h3>
      <div className='p-2'>
        <CircularInput
          radius={20}
          className='p-0'
          value={frequencyToValue(frequency, range[0], range[1])}
          onChange={(v) => {
            setValue(v);
            setInputValue(valueToFrequency);
            handleChange(valueToFrequency);
          }}
        >
          <CircularTrack strokeWidth={1} />
          <CircularProgress strokeWidth={2} />
          <CircularThumb r={5} />
        </CircularInput>
      </div>
      <div>
        <input
          type='number'
          className='bg-inherit w-16 text-right appearance-none'
          min={20}
          max={20000}
          value={inputValue}
          onChange={(v) => setInputValue(v.target.value)}
          onBlur={(v) => {
            const clamped = clamp(v.target.value, range[0], range[1]);
            setInputValue(clamped);
            handleChange(clamped);
          }}
        />
        <span>Hz</span>
      </div>
    </div>
  );
}
