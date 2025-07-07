const eventSource = new EventSource('/midi-updates');

eventSource.onmessage = (event) => {
  const htmlData = JSON.parse(event.data).html;
  const id = JSON.parse(event.data).id;
  const sustain = JSON.parse(event.data).sustain;

  let containerDiv = document.querySelector(`div[data-noteId='${id}']`);
  let sustainText = document.getElementById('sustain');

  if (containerDiv) {
    containerDiv.innerHTML += htmlData;
  } else {
    containerDiv = document.createElement('div');
    containerDiv.setAttribute('data-noteId', id);
    containerDiv.classList.add('midi-note');
    containerDiv.innerHTML += htmlData;
    document.body.appendChild(containerDiv);
  }

  if (sustain) {
    containerDiv.style.fontWeight = 'bold';
    sustainText.innerText = 'ON';
    sustainText.style.fontWeight = 'bold';
  } else {
    sustainText.innerText = 'OFF';
    sustainText.style.fontWeight = 'normal';
  }
};

const removeEvents = () => {
  document.querySelectorAll('div[data-noteId]').forEach((element) => {
    element.remove();
  });
};

// Destroys MIDI connection when tab is closed
let isTabClosing = true;

window.addEventListener('beforeunload', async () => {
  if (performance.getEntriesByType('navigation')[0].type === 'reload') {
    isTabClosing = false;
  }

  if (isTabClosing) {
    await fetch('/close-connection');
  }
});


