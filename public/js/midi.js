const eventSource = new EventSource('/midi-updates');

eventSource.onmessage = (event) => {
  const htmlData = JSON.parse(event.data).html;
  const id = JSON.parse(event.data).id;

  let containerDiv = document.querySelector(`div[data-noteId='${id}']`);
  if (containerDiv) {
    containerDiv.innerHTML += htmlData;
  } else {
    containerDiv = document.createElement('div');
    containerDiv.setAttribute('data-noteId', id);
    containerDiv.classList.add('midi-note');
    containerDiv.innerHTML += htmlData;
    document.body.appendChild(containerDiv);
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
