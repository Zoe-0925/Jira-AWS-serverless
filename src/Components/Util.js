import { v4 as uuidv4 } from 'uuid'

export const initiateProjectAndStatus = (project, currentUserId) => {
    const projectId = uuidv4()
    const statusIds = [uuidv4(), uuidv4(), uuidv4(), uuidv4()]
    const statusTemplate = addCreateAndUpdateDate({
        project: projectId, issues: []
    })
    const project = {
        ...addCreateAndUpdateDate(project), _id: projectId, statusOrder: [statusIds],
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