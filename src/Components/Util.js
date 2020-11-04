import { v4 as uuidv4 } from 'uuid'

export const initiateProjectAndStatus = (project) => {
    const projectId = uuidv4()
    const statusIds = [uuidv4(), uuidv4(), uuidv4(), uuidv4()]
    const today = new Date()
    const statusTemplate = {
        project: projectId, issues: [], createdAt: JSON.stringify(today),
        updatedAt: JSON.stringify(today)
    }
    return {
        project: { ...project, _id: projectId, statusOrder: [statusIds] },
        status: [{ ...statusTemplate, _id: statusIds[0], name: "TO DO" },
        { ...statusTemplate, _id: statusIds[1], name: "IN PROGRESS" },
        { ...statusTemplate, _id: statusIds[2], name: "TESTING" },
        { ...statusTemplate, _id: statusIds[3], name: "DONE" }]
    }
}