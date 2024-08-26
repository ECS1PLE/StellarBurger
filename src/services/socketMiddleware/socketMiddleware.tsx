interface SocketMiddlewareOptions {
  url: string;
  actions: {
    onMessage: (data: any) => void;
    onError: (error: string) => void;
  };
}

const socketMiddleware = ({ url, actions }: SocketMiddlewareOptions) => {
  const socket = new WebSocket(url);

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if ("message" in data) {
      actions.onError(data.message);
    } else {
      actions.onMessage(data);
    }
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
  };

  return {
    close: () => {
      socket.close();
    },
  };
};

export default socketMiddleware;
