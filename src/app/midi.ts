import { Input } from "@julusian/midi";

type MIDIDevice = {
  /** Name of the MIDI device, as given by the underlying OS */
  name: string;
  /** Port number of the device - this is used by the midi library to identify devices */
  port: number;
};

const midi = new Input();
const connectedDeviceCount = midi.getPortCount();

// Exit if no MIDI devices found
if (connectedDeviceCount === 0) {
  console.log("No connected MIDI devices found. Exiting.");
  process.exit(1);
}

export function getMidiDevices(): MIDIDevice[] {
  let devices: MIDIDevice[] = [];
  for (let port = 0; port < connectedDeviceCount; port++) {
    devices.push({ name: midi.getPortName(port), port });
  }

  return devices;
}
