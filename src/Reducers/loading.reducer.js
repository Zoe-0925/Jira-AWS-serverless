import { LOADING, ERROR } from "../Actions/loading.actions"

const initialState = { loading: false, authenticated: false, errorMessage: "" }
export default function LoadingReducer(state = initialState, action) {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true, authenticated: false }
        case ERROR:
            return { ...state, loading: false, authenticated: false, errorMessage: action.data }
        case CANCEL_LOADING:
            return initialState
        default:
            return state;
    }
}