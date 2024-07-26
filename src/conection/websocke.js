const socket = new WebSocket('ws://44.207.91.227:8080');

socket.onmessage = (event) => {
  if (typeof event.data === 'string') {
    try {
      const data = JSON.parse(event.data);
      if (socket.onmessageParsed) {
        socket.onmessageParsed(data);
      }
    } catch (e) {
      console.error("Error parsing JSON:", e);
    }
  } else if (event.data instanceof Blob) {
    const reader = new FileReader();
    
    reader.onload = function() {
      try {
        const data = JSON.parse(reader.result);
        if (socket.onmessageParsed) {
          socket.onmessageParsed(data);
        }
      } catch (e) {
        console.error("Error parsing JSON:", e);
      }
    };
    
    reader.readAsText(event.data);
  }
};

export const sendMessage = (message) => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    socket.addEventListener('open', () => {
      socket.send(JSON.stringify(message));
    });
  }
};

export default socket;
