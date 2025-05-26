export class Note {
  static allNotes: Note[] = [];

  deltaTime: number;
  statusByte: number;
  noteNumber: number;
  velocity: number;
  velocityPercent: number;
  lastNote: Note | undefined;
  isPartOfChord: boolean = false;

  private useSharps: boolean;

  NOTES_SHARPS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  NOTES_FLATS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  constructor(deltaTime: number, midiData: number[], sharps: boolean = true) {
    this.deltaTime = parseFloat(deltaTime.toFixed(2));
    this.statusByte = midiData[0]!;
    this.noteNumber = midiData[1]!;
    this.velocity = midiData[2]!;
    // Velocity as a percentage up to 2 decimal places
    this.velocityPercent = parseFloat(((this.velocity / 127) * 100).toFixed(2));
    this.useSharps = sharps;
    this.lastNote = Note.allNotes[Note.allNotes.length - 1];

    if (this.noteOn()) Note.allNotes.push(this);
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

  noteOn(): boolean {
    return this.statusByte >= 144 && this.statusByte <= 159;
  }

  noteOff(): boolean {
    return this.statusByte >= 128 && this.statusByte <= 143;
  }

  noteInfo(): number[] {
    return [this.deltaTime, this.statusByte, this.noteNumber, this.velocity];
  }
}
