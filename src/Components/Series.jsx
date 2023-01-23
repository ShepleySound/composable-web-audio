import { createContext, useContext, useRef, useEffect } from 'react';
import { Audio } from './AudioContext';

export const Series = createContext();

export function SeriesProvider({ children }) {
  // Grab AudioContext
  const audio = useContext(Audio);
  // Unique id for this provider
  const id = useRef(`Series${Date.now()}`);
  // Place children nodes in a new Map object
  const nodes = useRef(new Map());

  useEffect(() => {
    audio.nodes.set(id, nodes.current);
    const nodesArray = Array.from(nodes.current.keys());
    // Loop through the derived array and connect each node to
    // its immediate sibling. If it's the last in the series,
    // Connect it out to the AudioContext destination (speakers).
    nodesArray.forEach((nodeId, index) => {
      const node = nodes.current.get(nodeId);
      const nextNodeId = nodesArray[index + 1];

      if (!nextNodeId) {
        console.log(`${nodeId} -> Speakers`);
        node.connect(audio.ctx.destination);
        return;
      }

      const nextNode = nodes.current.get(nextNodeId);
      node.connect(nextNode);
      console.log(`${nodeId} -> ${nextNodeId}`);
    });
  }, []);

  return (
    <div className='flex flex-row mb-4'>
      <Series.Provider value={{ nodes: nodes.current }}>
        {children}
      </Series.Provider>
    </div>
  );
}
