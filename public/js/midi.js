const eventSource = new EventSource('/midi-updates');

eventSource.onmessage = (event) => {
  document.body.innerHTML += event.data;
};

window.addEventListener('beforeunload', async () => {
  await fetch('/close-connection');
})