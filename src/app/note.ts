export class Note {
  deltaTime: number;
  statusByte: number;
  noteNumber: number;
  noteVelocity: number;
  noteVelocityPercent: number;

  private useSharps: boolean;

  NOTES_SHARPS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  NOTES_FLATS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  constructor(
    deltaTime: number,
    midiData: [number, number, number],
    sharps: boolean = true,
  ) {
    this.deltaTime = deltaTime;
    this.statusByte = midiData[0];
    this.noteNumber = midiData[1];
    this.noteVelocity = midiData[2];
    // Velocity as a percentage up to 2 decimal places
    this.noteVelocityPercent = Math.round((this.noteVelocity / 127) * 100) / 100;
    this.useSharps = sharps;
  }

  noteName(): string {
    const noteIndex = this.noteNumber % 12;

    if (this.useSharps) {
      return this.NOTES_SHARPS[noteIndex]!;
    } else {
      return this.NOTES_FLATS[noteIndex]!;
    }
  }

  octave(): number {
    return Math.floor(this.noteNumber / 12) - 1;
  }

  fullNoteName(): string {
    return this.noteName() + this.octave();
  }
}
