import { LOADING, ERROR, AUTHENTICATED } from "../Actions/loading.actions"

const initialState = { loading: false, authenticated: false, errorMessage: "" }
export default function LoadingReducer(state = initialState, action) {
    switch (action.type) {
        case LOADING:
            return { ...initialState, loading: true }
        case ERROR:
            return { ...initialState, errorMessage: action.data }
        case AUTHENTICATED:
            return { ...initialState, authenticated: true }
        case "CLEAR":
            return initialState
        default:
            return state;
    }
}