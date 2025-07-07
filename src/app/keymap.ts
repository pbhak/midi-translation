import { Key } from '@nut-tree-fork/nut-js';
import { Note } from './note';
import { Chord } from './chord';
import { join } from 'node:path';

// Key numbers array, taken directly from the NutJS Key enum
export const keyNumbers = [
  'Escape',
  'F1',
  'F2',
  'F3',
  'F4',
  'F5',
  'F6',
  'F7',
  'F8',
  'F9',
  'F10',
  'F11',
  'F12',
  'F13',
  'F14',
  'F15',
  'F16',
  'F17',
  'F18',
  'F19',
  'F20',
  'F21',
  'F22',
  'F23',
  'F24',
  'Print',
  'ScrollLock',
  'Pause',
  'Grave',
  'Num1',
  'Num2',
  'Num3',
  'Num4',
  'Num5',
  'Num6',
  'Num7',
  'Num8',
  'Num9',
  'Num0',
  'Minus',
  'Equal',
  'Backspace',
  'Insert',
  'Home',
  'PageUp',
  'NumLock',
  'NumPadEqual',
  'Divide',
  'Multiply',
  'Subtract',
  'Tab',
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'LeftBracket',
  'RightBracket',
  'Backslash',
  'Delete',
  'End',
  'PageDown',
  'NumPad7',
  'NumPad8',
  'NumPad9',
  'Add',
  'CapsLock',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'Semicolon',
  'Quote',
  'Return',
  'NumPad4',
  'NumPad5',
  'NumPad6',
  'LeftShift',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
  'Comma',
  'Period',
  'Slash',
  'RightShift',
  'Up',
  'NumPad1',
  'NumPad2',
  'NumPad3',
  'Enter',
  'LeftControl',
  'LeftSuper',
  'LeftWin',
  'LeftCmd',
  'LeftAlt',
  'LeftMeta',
  'RightControl',
  'RightSuper',
  'RightWin',
  'RightAlt',
  'RightCmd',
  'RightMeta',
  'Space',
  'Menu',
  'Fn',
  'Left',
  'Down',
  'Right',
  'NumPad0',
  'Decimal',
  'Clear',
  'AudioMute',
  'AudioVolDown',
  'AudioVolUp',
  'AudioPlay',
  'AudioStop',
  'AudioPause',
  'AudioPrev',
  'AudioNext',
  'AudioRewind',
  'AudioForward',
  'AudioRepeat',
  'AudioRandom',
];

export const keyEventNumbers = [
  'Escape',
  'F1',
  'F2',
  'F3',
  'F4',
  'F5',
  'F6',
  'F7',
  'F8',
  'F9',
  'F10',
  'F11',
  'F12',
  'F13',
  'F14',
  'F15',
  'F16',
  'F17',
  'F18',
  'F19',
  'F20',
  'F21',
  'F22',
  'F23',
  'F24',
  'PrintScreen',
  'ScrollLock',
  'Pause',
  'Backquote',
  'Digit1',
  'Digit2',
  'Digit3',
  'Digit4',
  'Digit5',
  'Digit6',
  'Digit7',
  'Digit8',
  'Digit9',
  'Digit0',
  'Minus',
  'Equal',
  'Backspace',
  'Insert',
  'Home',
  'PageUp',
  'NumLock',
  'NumpadEqual',
  'NumpadDivide',
  'NumpadMultiply',
  'NumpadSubtract',
  'Tab',
  'KeyQ',
  'KeyW',
  'KeyE',
  'KeyR',
  'KeyT',
  'KeyY',
  'KeyU',
  'KeyI',
  'KeyO',
  'KeyP',
  'BracketLeft',
  'BracketRight',
  'Backslash',
  'Delete',
  'End',
  'PageDown',
  'Numpad7',
  'Numpad8',
  'Numpad9',
  'NumpadAdd',
  'CapsLock',
  'KeyA',
  'KeyS',
  'KeyD',
  'KeyF',
  'KeyG',
  'KeyH',
  'KeyJ',
  'KeyK',
  'KeyL',
  'Semicolon',
  'Quote',
  'Enter',
  'Numpad4',
  'Numpad5',
  'Numpad6',
  'ShiftLeft',
  'KeyZ',
  'KeyX',
  'KeyC',
  'KeyV',
  'KeyB',
  'KeyN',
  'KeyM',
  'Comma',
  'Period',
  'Slash',
  'ShiftRight',
  'ArrowUp',
  'Numpad1',
  'Numpad2',
  'Numpad3',
  'NumpadEnter',
  'ControlLeft',
  'MetaLeft',
  'MetaLeft',
  'MetaLeft',
  'AltLeft',
  'MetaLeft',
  'Space',
  'ContextMenu',
  'Fn', // not fired
  'ArrowLeft',
  'ArrowDown',
  'ArrowRight',
  'Numpad0',
  'NumpadDecimal',
  'NumLock',
  'AudioMute',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
];

// export const keymapSharps = {
//   C0: Key.A,
//   'C#0': Key.B,
//   D0: Key.C,
//   'D#0': Key.D,
//   E0: Key.E,
//   F0: Key.F,
//   'F#0': Key.G,
//   G0: Key.H,
//   'G#0': Key.I,
//   A0: Key.J,
//   'A#0': Key.K,
//   B0: Key.L,
//   C1: Key.M,
//   'C#1': Key.N,
//   D1: Key.O,
//   'D#1': Key.P,
//   E1: Key.Q,
//   F1: Key.R,
//   'F#1': Key.S,
//   G1: Key.T,
//   'G#1': Key.U,
//   A1: Key.V,
//   'A#1': Key.W,
//   B1: Key.X,
//   C2: Key.Y,
// };

// export const keymapFlats = {
//   C0: Key.A,
//   Db0: Key.B,
//   D0: Key.C,
//   Eb0: Key.D,
//   E0: Key.E,
//   F0: Key.F,
//   Gb0: Key.G,
//   G0: Key.H,
//   Ab0: Key.I,
//   A0: Key.J,
//   Bb0: Key.K,
//   B0: Key.L,
//   C1: Key.M,
//   Db1: Key.N,
//   D1: Key.O,
//   Eb1: Key.P,
//   E1: Key.Q,
//   F1: Key.R,
//   Gb1: Key.S,
//   G1: Key.T,
//   Ab1: Key.U,
//   A1: Key.V,
//   Bb1: Key.W,
//   B1: Key.X,
//   C2: Key.Y,
// };

// export const chordKeymap: { [key: string]: Key[] } = {
//   Cm: [Key.LeftAlt, Key.Tab],
//   Em: [Key.LeftWin, Key.Space],
// };

export const mapKey = async (
  note: Note | Chord,
  lowerOctave: number,
  _sharps: boolean = true,
): Promise<Key | Key[] | boolean | undefined> => {
  const keymap = await Bun.file(
    join(import.meta.dir, '../../data/keymap.json'),
  ).json();
  const chordKeymap = await Bun.file(
    join(import.meta.dir, '../../data/chord-keymap.json'),
  ).json();

  if (note instanceof Note) {
    if (!(note.octave() >= lowerOctave && note.octave() <= lowerOctave + 2)) {
      return false;
    }

    const noteName = `${note.noteName()}${note.octave() - lowerOctave}`;
    return keymap[noteName as keyof typeof keymap];
  } else if (note instanceof Chord) {
    if (note.name in chordKeymap) {
      return chordKeymap[note.name];
    } else {
      return Key.Space; // Unrecognized chords = space
    }
  }
};

export const removeMapping = async (
  note: boolean,
  key: string,
  value: string | number[],
) => {
  const keymapPath = join(import.meta.dir, '../../data/keymap.json');
  const chordKeymapPath = join(import.meta.dir, '../../data/chord-keymap.json');

  let keymap = await Bun.file(keymapPath).json();
  let chordKeymap = await Bun.file(chordKeymapPath).json();

  if (note && keymap[key] === parseInt(value as string)) {
    console.log('Note detected');
    Object.keys(keymap).forEach((key) => {
      if (keymap[key] === parseInt(value as string)) {
        delete keymap[key];
        console.log('Key deleted!');
      }
    });

    await Bun.write(keymapPath, JSON.stringify(keymap));
    return true;
  } else if (
    !note &&
    (chordKeymap[key] as number[]).every(
      (keyNumber, index) => value[index] === keyNumber,
    )
  ) {
    Object.keys(chordKeymap).forEach((targetKey) => {
      console.log(chordKeymap[targetKey], value);
      if (
        (chordKeymap[targetKey] as number[]).every(
          (keyNumber, index) => value[index] === keyNumber,
        )
      ) {
        delete chordKeymap[targetKey];
      }
    });

    await Bun.write(chordKeymapPath, JSON.stringify(chordKeymap));
    return true;
  } else {
    return false;
  }
};

export const addMapping = async (
  note: boolean,
  key: string,
  value: string[],
): Promise<boolean> => {
  const keymapPath = join(import.meta.dir, '../../data/keymap.json');
  const chordKeymapPath = join(import.meta.dir, '../../data/chord-keymap.json');

  let keymap = await Bun.file(keymapPath).json();
  let chordKeymap = await Bun.file(chordKeymapPath).json();

  if (note) {
    // key -> C3
    // value -> value.map(keyCode => keyEventNumbers.indexOf(keyCode))
    let newValue: number | number[] = value.map(keyCode => keyEventNumbers.indexOf(keyCode));
    if (newValue.length === 1) newValue = newValue[0]!;

    keymap[key] = newValue;
    await Bun.write(keymapPath, JSON.stringify(keymap));
    return true;
  } else {
    let newValue: number | number[] = value.map(keyCode => keyEventNumbers.indexOf(keyCode));
    if (newValue.length === 1) newValue = newValue[0]!;

    chordKeymap[key] = newValue;
    await Bun.write(chordKeymapPath, JSON.stringify(chordKeymap));
    return true;
  }
}