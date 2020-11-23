import { combineReducers } from 'redux';
import ProjectReducer from "./project.reducer"
import IssueReducer from "./issue.reducer"
import CommentReducer from "./comment.reducer"
import LabelReducer from "./label.reducer"
import StatusReducer from "./status.reducer"
import UserReducer from "./user.reducer"
import FilterReducer from "./filter.reducer"
import LoadingReducer from "./loading.reducer"
import WebsocketReducer from "./websocket.reducer"
import { connectRouter } from 'connected-react-router'


const RootReducer = (history) => combineReducers({
    ProjectReducer, IssueReducer, CommentReducer, LabelReducer, StatusReducer, UserReducer,
    FilterReducer, LoadingReducer, WebsocketReducer, router: connectRouter(history)
});

export default RootReducer;