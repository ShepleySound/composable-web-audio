import { useEffect, useRef, useState } from 'react';
import Gain from './Gain';
import Filter from './Filter';
import Oscillator from './Oscillator';

export default function ActiveNodeContainer({ device }) {
  function defineControlComponent(device) {
    if (device) {
      switch (device.node.constructor) {
        case GainNode:
          return Gain;

        case OscillatorNode:
          return Oscillator;

        case BiquadFilterNode:
          return Filter;

        default:
          return null;
      }
    }
  }

  const ControlComponent = defineControlComponent(device);

  return (
    <div className='bg-slate-600'>
      {ControlComponent && device && (
        <>
          <div>{device.title}</div>
          <div>
            <ControlComponent node={device.node} />
          </div>
        </>
      )}
    </div>
  );
}
