import { Note } from './note';
import { Chord as ChordDetection } from 'chord-name';

export class Chord {
  static allChords: Chord[] = [];

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

    let notesAsString: string = '';

    this.notes.forEach((note) => {
      note.isPartOfChord = true;
      notesAsString += note.noteName() + ' ';
    });
    notesAsString = notesAsString.trim();

    this.name = new ChordDetection(notesAsString).getNames()[0]!.name;
  }

  notesFormatted(): string[] {
    return this.notes.map((note) => note.noteName());
  }
}
