import { Input, type MidiMessage } from '@julusian/midi';
import { EventEmitter } from 'events';

type MIDIDevice = {
  /** Name of the MIDI device, as given by the underlying OS */
  name: string;
  /** Port number of the device - this is used by the midi library to identify devices */
  port: number;
};

export type MIDIEvent = {
  deltaTime: number;
  message: number[];
};

export const eventEmitter = new EventEmitter();

export function getMidiDevices(): MIDIDevice[] {
  const midi = new Input();
  const connectedDeviceCount = midi.getPortCount();

  let devices: MIDIDevice[] = [];
  for (let port = 0; port < connectedDeviceCount; port++) {
    devices.push({ name: midi.getPortName(port), port });
  }

  midi.destroy();

  return devices;
}

export function getDeviceName(port: number): string | null {
  return new Input().getPortName(port) || null;
}

export function listenOnPort(port: number): Input {
  const midi = new Input();
  console.log(`now listening on port ${port}`);

  midi.on('message', (deltaTime, message) => {
    const eventObject: MIDIEvent = { deltaTime, message };
    eventEmitter.emit('midiMessage', eventObject);
  });

  try {
    midi.openPort(port);
  } catch (e) {
    if ((e as Error).message === 'Internal RtMidi error') {
      console.log('Too many requests');
    }
  }

  return midi;
}
