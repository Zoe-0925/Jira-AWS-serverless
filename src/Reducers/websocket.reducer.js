const websocketInitialState = { connected: false };

const WebsocketReducer = (state = { ...websocketInitialState }, action) => {
  switch (action.type) {
    case 'WS_CONNECTED':
      return { ...state, connected: true };
    default:
      return state;
  }
};

export default WebsocketReducer