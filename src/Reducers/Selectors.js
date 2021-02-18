import { createSelector } from 'reselect'

export const selectStatusReducer = state => state.StatusReducer

export const selectIssueReducer = state => state.IssueReducer

export const selectProjectReducer = state => state.ProjectReducer

export const selectFilterReducer = state => state.FilterReducer

export const selectLabelReducer = state => state.LabelReducer

export const selectUserReducer = state => state.UserReducer

export const selectLoadingReducer = state => state.LoadingReducer

export const selectLoading = state => state.LoadingReducer.loading

export const selectAllProjects = state => state.ProjectReducer.projects


/****************** Selectors - Status  *********************/

export const selectAllStatus = state => state.StatusReducer.status

export const selectStatusById = (id) => state => state.StatusReducer.status.find(aStatus => aStatus._id === id)

/****************** Selectors - Project  *********************/
export const selectFirstStatus = state => {
    if (state.ProjectReducer.projects) {
        const currentProject = state.ProjectReducer.projects.find(item => item._id === state.ProjectReducer.currentProjectId)
        return currentProject ? currentProject.statusOrder : []
    } else {
        return []
    }
}

export const selectProjectMembers = state => {
    const currentProject = state.ProjectReducer.projects.find(item => item._id === state.ProjectReducer.currentProjectId)
    if (currentProject === undefined) { return [] }
    return state.UserReducer.users.filter(user => currentProject.members.includes(user._id))
}
/****************** Selectors - Issue  *********************/

export const selectIssueUpdatedTimeById = (issueId) => state => state.IssueReducer.tasks.get(issueId).updatedAt

/****************** Selectors - Users  *********************/
export const selectUserById = (id) => state => {
    if (id !== "") { return state.UserReducer.users.find(user => user._id === id) }
    return ""
}

/****************** Reselectors - Projects  *********************/

export const selectCurrentProjectId = createSelector(
    selectProjectReducer,
    reducer => reducer.currentProjectId
)

export const selectProjects = createSelector(
    selectProjectReducer,
    reducer => reducer.projects
)

export const selectCurrentProject = createSelector(
    selectCurrentProjectId,
    selectProjects,
    (currentProjectId, projects) => projects.find(item => item._id === currentProjectId)
)

export const selectCurrentProjectName = createSelector(
    selectCurrentProject,
    project => project && project.name ? project.name : ""
)

export const selectMemberNames = createSelector(
    selectProjectMembers,
    selectUserReducer,
    (projectMembers, userReducer) => {
        const memberNames = projectMembers.map(each => {
            return userReducer.users.find(user => user._id === each).name
        })
        return memberNames
    }
)

/****************** Reselectors - Users  *********************/
export const selectCurrentUserId = createSelector(
    selectUserReducer,
    reducer => reducer.currentUserId
)

export const selectAllUsers = createSelector(
    selectUserReducer,
    reducer => reducer.users
)

export const selectUserName = createSelector(
    selectAllUsers,
    selectCurrentUserId,
    (users, id) => users.find(item => item._id === id)
)

export const selectUsersForProjectMember = createSelector(
    selectProjectMembers,
    selectAllUsers,
    (memberIds, allUsers) => memberIds.map(each => allUsers.find(user => user._id === each))
)

/****************** Reselectors - Labels  *********************/
export const selectLabels = createSelector(
    selectLabelReducer,
    reducer => reducer.labels
)

export const selectEpics = createSelector(
    selectIssueReducer,
    reducer => reducer.epics
)

export const selectLabelNames = createSelector(
    selectLabels,
    labels => labels.map(each => each.name)
)

/****************** Reselectors - Issues  *********************/

export const selectTaskById = (issueId) => createSelector(
    selectIssueReducer,
    reducer => reducer.tasks.get(issueId)
)

export const selectAllTasks = createSelector(
    selectIssueReducer,
    reducer => reducer.tasks
)

/****************** Reselectors - Status  *********************/
export const selectStatus = createSelector(
    selectStatusReducer,
    statusReducer => statusReducer.status
)

export const selectStatusWithIssue = createSelector(
    selectStatusReducer,
    selectAllTasks,
    (statusReducer, tasks) => statusReducer.status.map(each => {
        each.issues= each.issues.map(issueId => tasks.get(issueId))
        return each
    }) 
)  