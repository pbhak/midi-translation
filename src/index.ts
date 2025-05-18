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
  const deviceName = getDeviceName(port);

  if (deviceName) {
    res.json({ portNumber: port, deviceName: deviceName });
  } else {
    res.send(`<pre>Device ${port} does not exist</pre>`)
  }
});

server.listen(port, () => console.log('Server started'));
