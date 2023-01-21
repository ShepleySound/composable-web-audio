class SimpleTone {
  constructor(audioctx) {
    this.audioctx = audioctx;
    this.osc = new OscillatorNode(audioctx);
    this.gain = new GainNode(audioctx);

    this.osc.connect(this.gain);
    this.gain.connect(audioctx.destination);
    this.osc.start();
  }

  // start() {
  //   this.osc.start();
  // }

  stop() {
    this.osc.stop();
  }

  disconnect() {
    this.osc.disconnect();
    this.gain.disconnect();
  }
}

export { SimpleTone };
