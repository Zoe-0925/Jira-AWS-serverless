import { useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectLabels } from "../../Reducers/Selectors"
import { filterByLabel } from "../../rActions/"

export const useLabelFilter = (data) => {
    const labels = useSelector(state=> selectLabels(state))

    const dispatch = useDispatch()

    const dispatchFilterByLabel = useCallback(() => {
        filterByLabel(data)
    }, [dispatch])

    return { labels, dispatchFilterByLabel }
}