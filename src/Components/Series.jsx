import { createContext, useContext, useRef, useEffect } from 'react';
import { Audio } from './AudioContext';

export const Series = createContext();

export function SeriesProvider({ children }) {
  const audio = useContext(Audio);
  const id = useRef(`Series${Date.now()}`);
  const nodes = useRef(new Map());

  useEffect(() => {
    audio.nodes.set(id, nodes.current);
    const nodesArray = Array.from(nodes.current.keys());
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
    <Series.Provider value={{ nodes: nodes.current }}>
      {children}
    </Series.Provider>
  );
}
