# midi-translation

![Hackatime Badge](https://hackatime-badge.hackclub.com/U07V1ND4H0Q/midi-translation)

![Demo of project](assets/demo_short.gif)
[want a longer demo?](https://youtu.be/WXUetCdzCwg)

A translation program that converts inbound [MIDI](https://en.wikipedia.org/wiki/MIDI) signals to user-defined keybindings.
- supports multiple MIDI devices plugged in simultaneously
- allows addition and removal of keybindings, including keyboard shortcuts or individual keys

Some things to note, however:
- unrecognized chord sequences will default to a space
- certain keybindings that are reserved by the system (e.g. Ctrl+Alt+Del) may not actuate properly

---

## Running locally
> [!NOTE]
> Running this program requires a MIDI keyboard, or at least some way to simulate one.
1. Clone the repo locally (`git clone https://github.com/pbhak/midi-translation.git`)
2. When inside the directory, run `bun install` to install needed dependencies
3. Create a file `.env` with the contents `PORT=[your desired port number]` (the port number doesn't maatter as long as it's not currently in use by another application)
4. Run the server with `bun dev` (may take a while to start the first time)

Eventually, you should get a message along the lines of `started on http://localhost:[port]` - going to this link will open the application in your browser

From there, you can access the keymap by clicking `Customize keymap`, and you can run the translator via selecting a MIDI device from the homepage