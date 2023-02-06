import { createContext, useContext, useRef, useEffect } from 'react';
import { Audio } from './AudioContext';
import { MainGain } from './MainGain';

export const Series = createContext();

export function SeriesProvider({ children, ...props }) {
  // Grab AudioContext
  const audio = useContext(Audio);
  // Unique id for this provider
  const id = useRef(`Series${Date.now()}`);
  // Place children nodes in a new Map object
  const nodes = useRef(new Map());

  const mainGain = useContext(MainGain);

  useEffect(() => {
    audio.nodes.set(id.current, nodes.current);
    const nodesArray = Array.from(nodes.current.keys());

    // Loop through the derived array and connect each node to
    // its immediate sibling. If it's the last in the series,
    // Connect it out to the AudioContext destination (speakers).
    for (let index = 0; index < nodesArray.length; index++) {
      let currentNodeId = nodesArray[index];
      let checkAnalyzerIndex = index;
      while (nodesArray[checkAnalyzerIndex].includes('Analyser')) {
        console.log('FOUND AN ANALYSER. ATTEMPTING TO CONNECT PREVIOUS NODE');
        checkAnalyzerIndex -= 1;
        currentNodeId = nodesArray[checkAnalyzerIndex];
      }

      let node = nodes.current.get(currentNodeId);
      const nextNodeId = nodesArray[index + 1];

      if (!nextNodeId) {
        console.log(`${currentNodeId} -> ${mainGain || 'Speakers'}`);
        console.log('MAIN GAIN', mainGain);
        node.connect(mainGain || audio.ctx.destination);
        return;
      }

      const nextNode = nodes.current.get(nextNodeId);
      node.connect(nextNode);
      console.log(`${currentNodeId} -> ${nextNodeId}`);
    }
  }, []);

  return (
    <div className={props.className || `flex flex-row mb-4 w-full`}>
      <Series.Provider value={{ nodes: nodes.current }}>
        {children}
      </Series.Provider>
    </div>
  );
}
