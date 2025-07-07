import { Note } from './note';
import { Chord as ChordDetection } from 'tonal';

export class Chord {
  static allChords: Chord[] = [];
  static sustain = false;

  notes: Note[];
  name: string = '';

  constructor(notes: Note[]) {
    this.notes = notes;
    if (
      !(
        notes.map((note) => note.fullNoteName()).length ===
        new Set(notes.map((note) => note.fullNoteName())).size
      )
    ) {
      throw new Error('Keys must be unique');
    }

    if (notes.every((note) => note.evaluateSustain())) Chord.sustain = true;

    let notesAsString: string = '';

    this.notes.forEach((note) => {
      note.isPartOfChord = true;
      notesAsString += note.noteName() + ' ';
    });
    notesAsString = notesAsString.trim();

    this.name = ChordDetection.detect(notesAsString.split(''))[0] ?? notesAsString.replaceAll(' ', ', ');
  }

  notesFormatted(): string[] {
    return this.notes.map((note) => note.noteName());
  }
}
