import { Note } from './note';
import { Chord as ChordDetection } from 'chord-name';

export class Chord {
  notes: Note[];
  name: string = '';

  constructor(notes: Note[]) {
    this.notes = notes;

    notes.forEach((note) => this.addNote(note));
  }

  addNote(note: Note) {
    this.notes.push(note);

    let notesAsString: string = '';

    this.notes.forEach((note) => {
      notesAsString += note.noteName() + ' ';
    });
    notesAsString = notesAsString.trim();

    this.name = new ChordDetection(notesAsString).getNames()[0]!.name;
  }
}
