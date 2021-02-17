import { v4 as uuidv4 } from 'uuid'

const Issue = (summary = "", statusId = "", projectId = "", issueType = "") => {
    return {
        _id: uuidv4(), description: "", issueType: issueType, 
        assignee: "", reporter: "", labels: [],
        status: statusId, project: projectId, summary: summary, createdAt:"", updatedAt:""
    }
}

export default Issue