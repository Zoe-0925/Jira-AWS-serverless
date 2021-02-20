import * as actions from '../actions/websocket.actions';
import { AUTHENTICATED } from "../actions/loading.actions"

const socketMiddleware = () => {
    let socket = null;

    const onOpen = store => (event) => {
        console.log('websocket open', event.target.url);
        store.dispatch(actions.wsConnected(event.target.url));
    };

    const onClose = store => () => {
        console.log('websocket closed');
        store.dispatch(actions.wsDisconnected());
    };

    const onMessage = store => (event) => {
        const dataList = JSON.parse(event.data);
        console.log('receiving server message');
        console.log('event', event);
        dataList.map(each => store.dispatch({ type: each.type, payload: each.payload ? each.payload : "" }))
        store.dispatch({ type: AUTHENTICATED })
    };

    // the middleware part of this function
    return store => next => action => {
       // console.log("action in web socket", action)
        switch (action.type) {
            case actions.WS_CONNECT:
                if (socket !== null) {
                    socket.close();
                }
                socket = new WebSocket(action.host);
                socket.onmessage = onMessage(store);
                socket.onclose = onClose(store);
                socket.onopen = onOpen(store);
                break;
            case actions.WS_DISCONNECT:
                if (socket !== null) {
                    socket.close();
                }
                socket = null;
                console.log('websocket closed');
                break;
            case actions.NEW_MESSAGE:
                console.log('sending a message', action);
                socket.send(JSON.stringify(action));
                break;
            default:
                return next(action);
        }
    };
};

export default socketMiddleware();