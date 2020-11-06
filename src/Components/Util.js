import { v4 as uuidv4 } from 'uuid'

export const initiateProjectAndStatus = (projectData, currentUserId) => {
    const projectId = uuidv4()
    const statusIds = [uuidv4(), uuidv4(), uuidv4(), uuidv4()]
    const statusTemplate = addCreateAndUpdateDate({
        project: projectId, issues: []
    })
    const project = {
        ...addCreateAndUpdateDate(projectData), _id: projectId, statusOrder: [statusIds],
        lead: currentUserId
    }
    const status = [{ ...statusTemplate, _id: statusIds[0], name: "TO DO" },
    { ...statusTemplate, _id: statusIds[1], name: "IN PROGRESS" },
    { ...statusTemplate, _id: statusIds[2], name: "TESTING" },
    { ...statusTemplate, _id: statusIds[3], name: "DONE" }]
    return { project, status }
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
    if (typeof list === Array && startIndex <= list.length && endIndex <= list.length &&
        startIndex >= -1 * list.length && endIndex >= -1 * list.length) {
        const [removedToReorder] = list.splice(startIndex, 1);
        list.splice(endIndex, 0, removedToReorder)
    }
    return list
}

export const changeColumn = (source, destination, startIndex, endIndex) => {
    const [removedToMove] = source.splice(action.startIndex, 1);
    destination.splice(action.endIndex, 0, removedToMove);
    return { source, destination }
}