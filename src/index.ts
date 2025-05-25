import express from 'express';
import {
  eventEmitter,
  getDeviceName,
  getMidiDevices,
  listenOnPort,
  type MIDIEvent,
} from './app/midi';
import type { Input } from '@julusian/midi';
import { Note } from './app/note';

const server = express();
const port = process.env.PORT || 3000;

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
    const messageFragment = await new Promise<string>((resolve, reject) => {
      const note = new Note(midiMessage.deltaTime, midiMessage.message);
      if (!note.noteOn()) return;

      req.app.render('partials/midi-message', { note }, (err, html) => {
        if (err) {
          console.error('[DELIVER_MSG] req.app.render CALLBACK ERROR:', err);
          return reject(err);
        }
        resolve(html);
      });
    });

    messageFragment.split('\n').forEach((line) => {
      const eventData = {
        html: line,
        id: Note.allNotes.length
      }
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
  currentMidi.closePort();
  console.log('Connection succesfully closed.');
  res.sendStatus(200);
});

server.listen(port, () => console.log('Server started'));
