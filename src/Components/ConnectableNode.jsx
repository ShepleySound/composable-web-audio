import NodeContainer from './NodeContainer';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect } from 'react';
import { Connector } from './Connector';

export default function ConnectableNode({
  children,
  input = true,
  output = true,
  id = uuidv4(),
  inputSelected = false,
  outputSelected = false,
  node,
}) {
  const connector = useContext(Connector);
  useEffect(() => {
    connector.addNode(node);
  }, []);
  return (
    <NodeContainer>
      {input && (
        <button
          onClick={() => connector.setSelectedInput(node)}
          className='bg-slate-100 text-black'
        >
          input
        </button>
      )}
      {children}
      {output && (
        <button
          onClick={() => connector.setSelectedOutput(node)}
          className='bg-slate-100 text-black'
        >
          output
        </button>
      )}
    </NodeContainer>
  );
}