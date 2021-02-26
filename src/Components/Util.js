import { v4 as uuidv4 } from 'uuid'
import format from 'date-fns/format'
import parseJSON from 'date-fns/parseJSON'

export const initiateProjectAndStatus = (projectData, currentUserId) => {
    const projectId = uuidv4()
    const statusIds = [uuidv4(), uuidv4(), uuidv4(), uuidv4()]
    const project = {
        ...projectData, _id: projectId, statusOrder: [statusIds],
        lead: currentUserId, default_assignee: "Project Lead", image: "", members: [currentUserId]
    }
    const statusList = [{ project: projectId, issues: [], _id: statusIds[0], name: "TO DO" },
    { project: projectId, issues: [], _id: statusIds[1], name: "IN PROGRESS" },
    { project: projectId, issues: [], _id: statusIds[2], name: "TESTING" },
    { project: projectId, issues: [], _id: statusIds[3], name: "DONE" }]
    return { project, statusList }
}

export const reorder = (list, startIndex, endIndex) => {
    //Move the item at the start index to the end index
    const [removedToReorder] = list.splice(startIndex, 1);
    list.splice(endIndex, 0, removedToReorder)
    return list
}

export const formatDate = dateString => {
    try {
        const date = parseJSON(dateString)
        return format(date, "MMMM dd YYYY")
    } catch (err) {
        return ""
    }
}

export const filterByLabel = (issues, labelIds) => {
    let result = []
    // eslint-disable-next-line
    labelIds.map(labelId => {
        let midResult = issues.filter(issue => issue.labels.includes(labelId))
        if (midResult.length > 0) { result.concat(midResult.map(each => each._id)) }
    })
    return result // a list of issueIds
}

export const filterByEpic = (issues, epicIds) => {
    let result = []
    // eslint-disable-next-line
    epicIds.map(epicId => {
        let midResult = issues.filter(issue => issue.epic && issue.epic === epicId)
        if (midResult.length > 0) { result.concat(midResult.map(each => each._id)) }
    })
    return result // a list of issueIds
}

export const searchBySummary = (query, list = []) => list.length > 0 ? list.filter(item => item.summary.includes(query)) : []

export const findItemById = (list = [], id = "") => {
    return list.find(item => item._id === id)
}

export const handleDrag = ({ sInd, dInd, statusUpdated }) => {
    const sourceStatus = statusUpdated[sInd]
    const destinationStatus = statusUpdated[dInd]
    if (sInd === dInd) {
        const issuesReordered = reorder(sourceStatus.issues, sInd, dInd)
        statusUpdated[sInd].issues = issuesReordered
    } else {
        const [removedToMove] = sourceStatus.issues.splice(sInd, 1)
        destinationStatus.issues.splice(dInd, 0, removedToMove)
    }
    return statusUpdated
}