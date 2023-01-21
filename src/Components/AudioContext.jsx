import { createContext } from 'react';

export const Audio = createContext();

export function AudioProvider({ children }) {
  return (
    <Audio.Provider
      value={{
        ctx: new AudioContext(),
        nodes: new Map(),
        addNode(key, val) {
          nodes.set(key, val);
        },
      }}
    >
      {children}
    </Audio.Provider>
  );
}
