import { useState, createContext } from 'react';

import { Audio } from './AudioContext';
import GraphNode from './GraphNode';

export const Connector = createContext();

export default function ConnectorProvider({
  audioGraph,
  audioMap,
  audioCtx,
  setActiveNode,
}) {
  const [selectedInput, setSelectedInput] = useState();
  const [selectedOutput, setSelectedOutput] = useState();

  function connectNodes(source, destination) {
    const destinationArray = audioGraph.get(destination);

    const sourceNode = source.node;
    const destinationNode = destination.node;

    destinationArray.push(sourceNode);
    sourceNode.connect(destinationNode);
    console.log(`${sourceNode} connected to ${destinationNode}`);
  }

  const deviceArray = Array.from(audioGraph.keys());

  return (
    <div className='w-full h-full'>
      {console.log(audioGraph)}
      <Connector.Provider
        value={{
          setSelectedInput,
          setSelectedOutput,
        }}
      >
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {deviceArray.map((device) => (
            <GraphNode
              key={device.id}
              device={device}
              activeInput={selectedInput === device}
              activeOutput={selectedOutput === device}
              setActiveNode={setActiveNode}
            />
          ))}
        </div>
      </Connector.Provider>
      <div className='relative bottom-0 w-full bg-slate-600'>
        <p>{`Input: ${selectedInput}`}</p>
        <p>{`Output: ${selectedOutput}`}</p>
        <div className='flex gap-4'>
          <button onClick={() => connectNodes(selectedOutput, selectedInput)}>
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}
