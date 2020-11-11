import { LOADING, ERROR } from "../Actions/loading.actions"

export default function LabelReducer(state = { loading: false, authenticated: false, errorMessage: "" }, action) {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true, authenticated: false }
        case ERROR:
            return { ...state, loading: false, authenticated: false, errorMessage: action.data }
        default:
            return state;
    }
}