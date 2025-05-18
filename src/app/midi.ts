import { Input } from '@julusian/midi';

type MIDIDevice = {
  /** Name of the MIDI device, as given by the underlying OS */
  name: string;
  /** Port number of the device - this is used by the midi library to identify devices */
  port: number;
};

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
  return (new Input().getPortName(port) || null);
}
