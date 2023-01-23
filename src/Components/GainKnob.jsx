import { useState } from 'react';
import {
  CircularInput,
  CircularTrack,
  CircularProgress,
  CircularThumb,
} from 'react-circular-input';

export default function GainKnob({ handleChange, gain }) {
  const [value, setValue] = useState(gain);
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const range = [0, 1];

  return (
    <div className='flex flex-col items-center justify-center'>
      <h3>Gain</h3>
      <div className='p-2'>
        <CircularInput
          radius={20}
          className='p-0'
          value={clamp(value, range[0], range[1])}
          onChange={(v) => {
            setValue(v);
            handleChange(v);
          }}
        >
          <CircularTrack strokeWidth={1} />
          <CircularProgress strokeWidth={2} />
          <CircularThumb r={5} />
        </CircularInput>
      </div>
      <div>{Math.round(value * 100) / 100}</div>
    </div>
  );
}
