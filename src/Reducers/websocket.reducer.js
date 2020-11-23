const websocketInitialState = { connected: false };

export const WebsocketReducer = (state = { ...websocketInitialState }, action) => {
  switch (action.type) {
    case 'WS_CONNECTED':
      return { ...state, connected: true };
    default:
      return state;
  }
};