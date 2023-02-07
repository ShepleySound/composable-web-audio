import { useState } from 'react';
import {
  CircularInput,
  CircularTrack,
  CircularProgress,
  CircularThumb,
} from 'react-circular-input';

export default function RadialDial({
  handleChange,
  initValue,
  min,
  max,
  label,
  unit,
}) {
  const [value, setValue] = useState(initValue);
  const clamp = (v, clampMin, clampMax) =>
    Math.min(Math.max(v, clampMin), clampMax);

  // converts the 0-1 unit to a min/max scale
  const unitToScale = Math.round(value * (max - min) + min);

  // converts the min/max scale to a 0-1 unit.
  function scaleToUnit(frequency, min, max) {
    return (frequency - min) / (max - min);
  }
  return (
    <div className='flex flex-col items-center justify-center'>
      <h3>{label}</h3>
      <div className='p-2'>
        <CircularInput
          radius={20}
          className='p-0'
          value={clamp(value, min, max)}
          onChange={(v) => {
            setValue(v);
            handleChange(unitToScale);
          }}
        >
          <CircularTrack strokeWidth={1} />
          <CircularProgress strokeWidth={2} />
          <CircularThumb r={5} />
        </CircularInput>
      </div>
      <div>
        {unitToScale}
        {unit && <span> {unit}</span>}
      </div>
    </div>
  );
}
