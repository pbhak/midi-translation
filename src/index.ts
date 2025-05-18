import express from 'express';
import { getDeviceName, getMidiDevices } from './app/midi';

const server = express();
const port = process.env.PORT || 3000;

server.set('view engine', 'ejs');
server.use(express.static('../public'));

server.get('/', (req, res) => {
  res.render('index', {
    midiDevices: getMidiDevices(),
  });
});

server.get('/device/:portNumber', (req, res) => {
  const port = parseInt(req.params.portNumber);
  res.json({ portNumber: port, deviceName: getDeviceName(port) });
});

server.listen(port, () => console.log('Server started'));
