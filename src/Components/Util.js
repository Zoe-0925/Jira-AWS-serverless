import { v4 as uuidv4 } from 'uuid'
import format from 'date-fns/format'
import parseJSON from 'date-fns/parseJSON'

export const initiateProjectAndStatus = (projectData, currentUserId) => {
    const projectId = uuidv4()
    const statusIds = [uuidv4(), uuidv4(), uuidv4(), uuidv4()]
    const project = {
        ...addCreateAndUpdateDate(projectData), _id: projectId, statusOrder: [statusIds],
        lead: currentUserId, default_assignee: "Project Lead", image: "", members: [currentUserId]
    }
    const statusList = [{ ...addCreateAndUpdateDate({ project: projectId, issues: [] }), _id: statusIds[0], name: "TO DO" },
    { ...addCreateAndUpdateDate({ project: projectId, issues: [] }), _id: statusIds[1], name: "IN PROGRESS" },
    { ...addCreateAndUpdateDate({ project: projectId, issues: [] }), _id: statusIds[2], name: "TESTING" },
    { ...addCreateAndUpdateDate({ project: projectId, issues: [] }), _id: statusIds[3], name: "DONE" }]
    return { project, statusList }
}

export const addCreateAndUpdateDate = data => {
    const today = new Date()
    return {
        ...data, createdAt: JSON.stringify(today),
        updatedAt: JSON.stringify(today)
    }
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