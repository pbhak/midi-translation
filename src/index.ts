import type { Input } from '@julusian/midi';
import express from 'express';
import { Chord } from './app/chord';
import {
  eventEmitter,
  getDeviceName,
  getMidiDevices,
  listenOnPort,
  type MIDIEvent,
} from './app/midi';
import { Note } from './app/note';
import { mapKey } from './app/keymap';
import { Key, keyboard } from '@nut-tree-fork/nut-js';

const server = express();
const port = process.env.PORT || 3000;

const chordThresholdSeconds = 0.075;

let currentMidi: Input;

server.set('view engine', 'ejs');
server.use(express.static('../public'));

server.get('/', (_req, res) => {
  res.render('index', {
    midiDevices: getMidiDevices(),
  });
});

server.get('/device/:portNumber', (req, res) => {
  const port = parseInt(req.params.portNumber);
  const deviceName = getDeviceName(port);

  if (deviceName) {
    currentMidi = listenOnPort(port);
    res.render('listen', { device: { name: deviceName, port } });
  } else {
    res.send(`<pre>Device ${port} does not exist</pre>`);
  }
});

server.get('/midi-updates', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const deliverMessage = async (midiMessage: MIDIEvent) => {
    let isChord = false;

    const messageFragment = await new Promise<string>(async (resolve, reject) => {
      const note = new Note(midiMessage.deltaTime, midiMessage.message);
      if (!note.noteOn()) return;

      if (
        note.lastNote &&
        note.lastNote.lastNote &&
        note.deltaTime <= chordThresholdSeconds &&
        note.lastNote.deltaTime <= chordThresholdSeconds
      ) {
        let notes = [note.lastNote.lastNote, note.lastNote, note];

        if (
          notes.map((note) => note.fullNoteName()).length ===
          new Set(notes.map((note) => note.fullNoteName())).size
        ) {
          const chord = new Chord(notes);

          const mappedKey = mapKey(chord, 2);
          if (typeof mappedKey === 'number') {
            console.log('pressing key');
            keyboard.pressKey(mappedKey);
          } else if (!mappedKey) {
            console.log('error occured while mapping key');
          }

          req.app.render('partials/chord', { chord }, (_err, html) => resolve(html));
        }
      } else {
        await Bun.sleep(chordThresholdSeconds * 1000);
        if (note.isPartOfChord) return;

        const mappedKey = mapKey(note, 2);
        if (typeof mappedKey === 'number') {
          console.log('pressing key');
          keyboard.pressKey(mappedKey);
        } else if (!mappedKey) {
          console.log('error occured while mapping key');
        }

        req.app.render('partials/note', { note }, (_err, html) => resolve(html));
      }
    });

    messageFragment.split('\n').forEach((line) => {
      const eventData = {
        html: line,
        id: isChord ? Chord.allChords.length : Note.allNotes.length,
        chord: isChord,
        sustain: isChord ? Chord.sustain : Note.sustain,
      };
      res.write(`data: ${JSON.stringify(eventData)}\n\n`);
    });
  };

  const messageListener = (midiData: MIDIEvent) => deliverMessage(midiData);

  eventEmitter.on('midiMessage', messageListener);

  req.on('close', () => {
    eventEmitter.removeListener('midiMessage', messageListener);
    res.end();
  });
});

server.get('/close-connection', (_req, res) => {
  currentMidi.destroy();
  console.log('Connection succesfully closed.');
  res.sendStatus(200);
});

server.listen(port, () => console.log(`started on http://localhost:${port}`));
