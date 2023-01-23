# Composable Web Audio

This library aims to create a library of composable React components that provide access to the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API). For now, the views and controls for each component are tightly coupled, but I aim to separate these out in later iterations to make it easier to customize styling.

The library relies heavily on React's Context API to pass down the the AudioContext to each node, as well as to keep track of where in a stack each node is placed. Ideally, one would be able to construct any shape of audio graph using the provided components, but further work will have to be done to make this possible.

For now, there are a few primary components. Each of them are a work in progress -

## Components

### Oscillator

Implements the [OscillatorNode](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode) interface. Contains frequency and waveform controls.

### Gain

Implements the [GainNode](https://developer.mozilla.org/en-US/docs/Web/API/GainNode) interface. Provides a single gain control.

### SeriesProvider

A context provider that places each of its childrens nodes into a Map object and connects them in series. This can be used to easily compose multiple nodes. The final child of this provider will connect to the AudioContext destination, which would typically be the user's speakers.

For example, it could be used to create a simple synth in the form of osc->gain->filter->gain->destination.

## What's next?

I'll keep building more components and fleshing out the interface implementations in each of them. I am hoping to use this library to support an eventual drag-and-drop synth construction/sharing web application.
