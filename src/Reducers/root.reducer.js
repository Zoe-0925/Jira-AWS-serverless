import { combineReducers } from 'redux';
import ProjectReducer from "./project.reducer"
import IssueReducer from "./issue.reducer"
import CommentReducer from "./comment.reducer"
import StatusReducer from "./status.reducer"
import UserReducer from "./user.reducer"
import LoadingReducer from "./loading.reducer"
import { connectRouter } from 'connected-react-router'


const RootReducer = (history) => combineReducers({
    ProjectReducer, IssueReducer, StatusReducer, UserReducer, CommentReducer,
   LoadingReducer, router: connectRouter(history)
});

export default RootReducer;