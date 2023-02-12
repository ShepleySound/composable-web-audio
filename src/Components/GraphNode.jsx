import NodeContainer from './NodeContainer';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect } from 'react';
import { Connector } from './Connector';
import clsx from 'clsx';

export default function GraphNode({
  input = true,
  output = true,
  activeInput,
  activeOutput,
  device,
  setActiveNode,
}) {
  const connector = useContext(Connector);

  return (
    <NodeContainer title={device.title}>
      {input && (
        <button
          onClick={() => connector.setSelectedInput(device)}
          className={clsx(
            'bg-slate-100 text-black px-2 py-1 rounded-md',
            activeInput && 'bg-orange-500 text-white'
          )}
        >
          input
        </button>
      )}
      <div
        onClick={() => {
          setActiveNode(device);
        }}
      >{`${device.title}`}</div>
      {output && (
        <button
          onClick={() => connector.setSelectedOutput(device)}
          className={clsx(
            'bg-slate-100 text-black px-2 py-1 rounded-md',
            activeOutput && 'bg-orange-500 text-white'
          )}
        >
          output
        </button>
      )}
    </NodeContainer>
  );
}
