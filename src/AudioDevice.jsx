import { useEffect, useState } from 'react';

import Connector from './Components/Connector';
import { v4 as uuidv4 } from 'uuid';
import ActiveNodeContainer from './Components/ActiveNodeContainer';

const initDeviceArray = [
  {
    nodeConstructor: OscillatorNode,
    title: 'Oscillator',
    id: uuidv4(),
  },
  { nodeConstructor: BiquadFilterNode, title: 'Filter', id: uuidv4() },
  { nodeConstructor: GainNode, title: 'Gain', id: uuidv4() },
];

const audioCtx = new AudioContext();
const audioMap = new Map();
const audioGraph = new Map();

for (let device of initDeviceArray) {
  const nodeConstructor = device.nodeConstructor;
  device.node = new nodeConstructor(audioCtx);

  audioMap.set(device.id, device);
  audioGraph.set(device, []);

  if (device.node instanceof OscillatorNode) {
    console.log('starting osc', device.id);
    device.node.start();
  }
}
const audioDestinationDevice = {
  node: audioCtx.destination,
  title: 'Speakers',
  id: uuidv4(),
};

audioMap.set(audioDestinationDevice.id, audioDestinationDevice);
audioGraph.set(audioDestinationDevice, []);

export default function AudioDevice() {
  const [activeNode, setActiveNode] = useState(null);

  useEffect(() => {
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }, []);

  return (
    <div className='w-full flex flex-col'>
      <Connector
        audioGraph={audioGraph}
        audioMap={audioMap}
        audioCtx={audioCtx}
        setActiveNode={setActiveNode}
      />
      <ActiveNodeContainer device={activeNode} />
    </div>
  );
}
