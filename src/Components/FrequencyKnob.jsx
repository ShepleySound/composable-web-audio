import { useState } from 'react';
import {
  CircularInput,
  CircularTrack,
  CircularProgress,
  CircularThumb,
} from 'react-circular-input';

export default function FrequencyKnob({ handleChange, frequency }) {
  const [value, setValue] = useState(0);
  const min = 0;
  const max = 1;
  const valueWithinLimits = (v) => Math.min(Math.max(v, min), max);
  const range = [20, 20000];
  const rangeValue = Math.round(value * (range[1] - range[0]) + range[0]);

  return (
    <CircularInput
      value={valueWithinLimits(value)}
      onChange={(v) => {
        setValue(valueWithinLimits(v));
        handleChange(rangeValue);
      }}
    >
      <CircularTrack />
      <CircularProgress />
      <CircularThumb />
      <text x={100} y={100} textAnchor='middle' dy='0.3em' fontWeight='bold'>
        {rangeValue} Hz
      </text>
    </CircularInput>
  );
}
