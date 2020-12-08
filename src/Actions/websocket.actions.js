export const wsConnect = host => ({ type: 'WS_CONNECT', host });
export const wsConnecting = host => ({ type: 'WS_CONNECTING', host });
export const wsConnected = host => ({ type: 'WS_CONNECTED', host });
export const wsDisconnect = host => ({ type: 'WS_DISCONNECT', host });
export const wsDisconnected = host => ({ type: 'WS_DISCONNECTED', host });

export const sendWsToServer = payload => async dispatch => {
    await Promise.all([
        dispatch(payload),
        dispatch({ type: NEW_MESSAGE, payload: payload })
    ])
}


export const WS_CONNECT = 'WS_CONNECT'
export const WS_DISCONNECT = 'WS_DISCONNECT'
export const NEW_MESSAGE = 'NEW_MESSAGE'

