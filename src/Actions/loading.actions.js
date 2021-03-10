export const LOADING = "LOADING"
export const ERROR = "ERROR"
export const AUTHENTICATED = "AUTHENTICATED"

export function dispatchError(data) {
    return {
        type: ERROR,
        data: data
    }
}

export const loadingContainer = (action) => async dispatch => {
    dispatch({ type: LOADING })
    dispatch(action)
    dispatch({ type: AUTHENTICATED })
}
