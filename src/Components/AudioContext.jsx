import { createContext } from 'react';

export const Audio = createContext();

export function AudioProvider({ children }) {
  return (
    <Audio.Provider
      value={{
        ctx: new AudioContext(),
        nodes: new Map(),
        addNode(node) {
          this.nodes.set(node, []);
        },
        connectNode(source, destination) {
          const destinationArray = this.nodes.get(destination);
          destinationArray.push(source);
        },
      }}
    >
      {children}
    </Audio.Provider>
  );
}
