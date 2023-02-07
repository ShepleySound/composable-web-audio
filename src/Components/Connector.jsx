import { useState, createContext, useRef, useContext, useEffect } from 'react';

import { Audio } from './AudioContext';
export const Connector = createContext();

export default function ConnectorProvider({ children }) {
  const audio = useContext(Audio);
  const nodes = useRef(new Map());
  const [selectedInput, setSelectedInput] = useState();
  const [selectedOutput, setSelectedOutput] = useState();

  useEffect(() => {
    addNode(audio.ctx.destination);
  }, []);

  function addNode(node) {
    nodes.current.set(node, []);
  }

  function connectNodes(source, destination) {
    const destinationArray = nodes.current.get(destination);
    destinationArray.push(source);
    source.connect(destination);
    console.log(`${source} connected to ${destination}`);
    console.log(nodes.current);
  }

  return (
    <div className='w-full h-full'>
      <Connector.Provider
        value={{
          addNode,
          setSelectedInput,
          setSelectedOutput,
        }}
      >
        {children}
      </Connector.Provider>
      <div className='fixed bottom-0 w-full bg-slate-600'>
        <p>{`Input: ${selectedInput}`}</p>
        <p>{`Output: ${selectedOutput}`}</p>
        <div className='flex gap-4'>
          <button onClick={() => connectNodes(selectedOutput, selectedInput)}>
            Connect
          </button>
          <button onClick={() => setSelectedInput(audio.ctx.destination)}>
            Speakers
          </button>
        </div>
      </div>
    </div>
  );
}
