export const user = { _id: "tsidadsjkdhiueiurt", name: "Zoe Zhang", email: "jin0925aki@gmail.com", avatar: "https://cdn.pixabay.com/photo/2016/06/15/23/20/woman-1460150_960_720.jpg" }

export const otherUsers = [
    { _id: "user2", name: "Jay Harris", email: "jayharris@gmail.com", avatar: "https://cdn.pixabay.com/photo/2020/06/02/08/30/man-5249991_960_720.jpg" },
    { _id: "user3", name: "Stacy McGram", email: "stacymcgram@gmail.com", avatar: "https://cdn.pixabay.com/photo/2019/10/04/13/40/woman-4525714_960_720.jpg" }
]

export const projects = [{
    _id: "7c1f9838-dbd7-4432-b52c-aae87022d578", default_assignee: "Project Lead",
    image: "", key: "TestProject1", lead: "tsidadsjkdhiueiurt", members: ["tsidadsjkdhiueiurt", "user2", "user3"], name: "Jira Clone",
    statusOrder: ["9729f490-fd5f-43ab-8efb-40e8d132bc68", "efe83b13-9255-4339-a8f5-d5703beb9ffc", "439c3d96-30eb-497d-b336-228873048bc3", "f3a0e59f-635a-4b75-826f-b0f5bf24b5c4"]
}]

export const currentProject = { _id: "7c1f9838-dbd7-4432-b52c-aae87022d578" }

export const tasks = [{
    _id: "issueId1", summary: "Code feature A", description: "", updatedAt: "", createdAt: "", issueType: "task",
    parent: "", status: "9729f490-fd5f-43ab-8efb-40e8d132bc68", project: "7c1f9838-dbd7-4432-b52c-aae87022d578", assignee: "tsidadsjkdhiueiurt", reporter: "user2"
}, {
    _id: "issueId2", summary: "Code feature B",
    description: { "blocks": [{ "key": "ar9v5", "text": "Coding...", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }, { "key": "1rs54", "text": "", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }], "entityMap": {} },
    updatedAt: "", createdAt: "", issueType: "task",
    parent: "", status: "9729f490-fd5f-43ab-8efb-40e8d132bc68", project: "7c1f9838-dbd7-4432-b52c-aae87022d578", assignee: "user2", reporter: "user3"
}, {
    _id: "issueId3", summary: "Code feature C",
    description: { "blocks": [{ "key": "ar9v5", "text": "testing...", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }, { "key": "1rs54", "text": "", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }], "entityMap": {} },
    updatedAt: "", createdAt: "", issueType: "task",
    parent: "", status: "efe83b13-9255-4339-a8f5-d5703beb9ffc", project: "7c1f9838-dbd7-4432-b52c-aae87022d578"
}]

export const status = [{ _id: "9729f490-fd5f-43ab-8efb-40e8d132bc68", issues: ["issueId1", "issueId2"], name: "TO DO", project: "7c1f9838-dbd7-4432-b52c-aae87022d578" },
{ _id: "efe83b13-9255-4339-a8f5-d5703beb9ffc", issues: ["issueId3"], name: "IN PROGRESS", project: "7c1f9838-dbd7-4432-b52c-aae87022d578" },
{ _id: "439c3d96-30eb-497d-b336-228873048bc3", issues: [], name: "TESTING", project: "7c1f9838-dbd7-4432-b52c-aae87022d578" },
{ _id: "f3a0e59f-635a-4b75-826f-b0f5bf24b5c4", issues: [], name: "DONE", project: "7c1f9838-dbd7-4432-b52c-aae87022d578" }]

export const comments = [
    { _id: "comment1", issue: "issueId1", description: "Comment 1.", createdAt: "", user: "tsidadsjkdhiueiurt" },
    { _id: "comment2", issue: "issueId1", description: "Comment 2.", createdAt: "", user: "user2" },
    { _id: "comment3", issue: "issueId2", description: "Comment 3.", createdAt: "", user: "user2" },
    { _id: "comment4", issue: "issueId3", description: "Comment 4.", createdAt: "", user: "user3" },
]
