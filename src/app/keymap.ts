import { Key } from '@nut-tree-fork/nut-js';
import { Note } from './note';
import { Chord } from './chord';

const keymapSharps = {
  C0: Key.A,
  'C#0': Key.B,
  D0: Key.C,
  'D#0': Key.D,
  E0: Key.E,
  F0: Key.F,
  'F#0': Key.G,
  G0: Key.H,
  'G#0': Key.I,
  A0: Key.J,
  'A#0': Key.K,
  B0: Key.L,
  C1: Key.M,
  'C#1': Key.N,
  D1: Key.O,
  'D#1': Key.P,
  E1: Key.Q,
  F1: Key.R,
  'F#1': Key.S,
  G1: Key.T,
  'G#1': Key.U,
  A1: Key.V,
  'A#1': Key.W,
  B1: Key.X,
  C2: Key.Y,
};

const keymapFlats = {
  C0: Key.A,
  Db0: Key.B,
  D0: Key.C,
  Eb0: Key.D,
  E0: Key.E,
  F0: Key.F,
  Gb0: Key.G,
  G0: Key.H,
  Ab0: Key.I,
  A0: Key.J,
  Bb0: Key.K,
  B0: Key.L,
  C1: Key.M,
  Db1: Key.N,
  D1: Key.O,
  Eb1: Key.P,
  E1: Key.Q,
  F1: Key.R,
  Gb1: Key.S,
  G1: Key.T,
  Ab1: Key.U,
  A1: Key.V,
  Bb1: Key.W,
  B1: Key.X,
  C2: Key.Y,
};

export const mapKey = (
  note: Note | Chord,
  lowerOctave: number,
  sharps: boolean = true,
): Key | boolean | undefined => {
  if (note instanceof Note) {
    if (!(note.octave() >= lowerOctave && note.octave() <= lowerOctave + 2)) {
      return false;
    }

    const noteName = `${note.noteName()}${note.octave() - lowerOctave}`;
    console.log(noteName);
    return sharps
      ? keymapSharps[noteName as keyof typeof keymapSharps]
      : keymapFlats[noteName as keyof typeof keymapFlats];
  } else if (note instanceof Chord) {
    return Key.Space
  }
};
