import { createContext, useContext, useRef, useEffect } from 'react';
import { Audio } from './AudioContext';

export const Series = createContext();

export function SeriesProvider({ children }) {
  const audio = useContext(Audio);
  const id = useRef(`Series${Date.now()}`);
  const nodes = useRef(new Map());

  useEffect(() => {
    audio.nodes.set(id, nodes.current);
    console.log(children);
    console.log(audio.nodes);
  }, []);

  return (
    <Series.Provider value={{ nodes: nodes.current }}>
      {children}
    </Series.Provider>
  );
}
