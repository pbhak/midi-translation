# midi-translation

![Hackatime Badge](https://hackatime-badge.hackclub.com/U07V1ND4H0Q/midi-translation)

![Demo of project](assets/demo_short.gif)

A translation program that converts inbound ![MIDI](https://en.wikipedia.org/wiki/MIDI) signals to user-defined keybindings.
- supports multiple MIDI devices plugged in simultaneously
- allows addition and removal of keybindings, including keyboard shortcuts or individual keys

Some things to note, however:
- unrecognized chord sequences will default to a space
- certain keybindings that are reserved by the system (e.g. Ctrl+Alt+Del) may not actuate properly

---

## Running locally
Install dependencies with `bun i`, create `.env` with a `PORT` variable containing your desired port for the server, and run the server with `bun dev`!