import { useState, useEffect, useRef, useContext } from 'react';

import { Audio } from './AudioContext';
import { Series } from './Series';
import NodeContainer from './NodeContainer';

export default function Analyser() {
  const audio = useContext(Audio);
  const parent = useContext(Series);
  const id = useRef(`Analyser${Date.now()}`);
  const node = useRef(new AnalyserNode(audio.ctx, { fftSize: 2048 }));
  const bufferLength = node.current.frequencyBinCount;

  const canvasRef = useRef(null);

  const requestRef = useRef();
  const previousTimeRef = useRef();

  function animate(time) {
    if (previousTimeRef.current !== undefined) {
      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext('2d');
      const WIDTH = canvasCtx.canvas.width;
      const HEIGHT = canvasCtx.canvas.height;
      const meterWidth = WIDTH / bufferLength;
      const audioData = new Uint8Array(bufferLength);
      node.current.getByteFrequencyData(audioData);
      canvasCtx.fillStyle = '#000000';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      for (let i = 0; i < bufferLength; i++) {
        const value = audioData[i];
        canvasCtx.fillStyle = `rgb(${value + 20}, 50, 50)`;
        canvasCtx.fillRect(
          i * meterWidth,
          HEIGHT - value / 2,
          meterWidth,
          HEIGHT
        );
      }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  useEffect(() => {
    parent.nodes.set(id.current, node.current);

    return () => {
      // node.current.stop();
      // node.current.disconnect();
      parent.nodes.delete(id.current);
    };
  }, []);

  return (
    <NodeContainer>
      <canvas className='w-full h-full' ref={canvasRef} />
    </NodeContainer>
  );
}
