import { createSelector } from 'reselect'

export const selectStatusReducer = state => state.StatusReducer

export const selectIssueReducer = state => state.IssueReducer

export const selectProjectReducer = state => state.ProjectReducer

export const selectFilterReducer = state => state.FilterReducer

export const selectLabelReducer = state => state.LabelReducer

export const selectUserReducer = state => state.UserReducer

export const selectCommentReducer = state => state.CommentReducer

export const selectLoadingReducer = state => state.LoadingReducer

export const selectLoading = state => state.LoadingReducer.loading

export const selectAuthenticated = state => state.LoadingReducer.authenticated

export const selectErrorMessage = state => state.LoadingReducer.errorMessage

/****************** Selectors - Status  *********************/
export const selectAllStatus = state => {
    const mapResult = state.StatusReducer.status
    return [...mapResult.values()]
}

export const selectStatusById = (id) => state => {
    const currentProject = state.ProjectReducer.projects.find(item => item._id === state.ProjectReducer.currentProjectId)
    return currentProject ? currentProject.statusOrder.map(each => state.StatusReducer.status.get(each)).get(id) : ""
}

export const selectDefaultIssueOrder = state => state.StatusReducer.status.get(selectFirstStatus(state)) !== undefined ? state.StatusReducer.status.get(selectFirstStatus(state)).issues : []


/****************** Selectors - Project  *********************/
export const selectAllProjects = state => state.ProjectReducer.projects

export const selectCurrentProjectId = state => state.ProjectReducer.currentProjectId

export const selectStatusOrder = state => {
    const currentProject = state.ProjectReducer.projects.find(item => item._id === state.ProjectReducer.currentProjectId)
    return currentProject ? currentProject.statusOrder : []
}
export const selectCurrentProject = state => state.ProjectReducer.projects.find(item => item._id === state.ProjectReducer.currentProjectId)

export const selectFirstStatus = state => {
    if (state.ProjectReducer.projects) {
        const currentProject = state.ProjectReducer.projects.find(item => item._id === state.ProjectReducer.currentProjectId)
        return currentProject ? currentProject.statusOrder : []
    } else {
        return []
    }
}

export const selectCurrentProjectName = state => {
    const currentProject = state.ProjectReducer.projects.find(item => item._id === state.ProjectReducer.currentProjectId)
    return currentProject ? currentProject.name : ""
}

/****************** Selectors - Issue  *********************/
export const selectTasks = state => state => state.IssueReducer.tasks

export const selectEpics = state => state => state.IssueReducer.epics

export const selectTaskById = (issueId) => state => selectTasks(state).get(issueId)

export const selectIssueUpdatedTimeById = (issueId) => state => selectTasks(state).get(issueId).updatedAt
/****************** Selectors - Labels  *********************/
export const selectLabels = state => state.LabelReducer.labels

export const selectLabelNames = state => state.LabelReducer.labels.map(each => each.name)

/****************** Selectors - Comments  *********************/
export const selectCommentByIssue = id => state => state.CommentReducer.comments.filter(comment => comment.issue === id)

/****************** Reselectors - Projects  *********************/
export const selectProjectMembers = createSelector(
    selectCurrentProject,
    currentProject => currentProject.members
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

export const selectUserById = (id) => createSelector(
    selectAllUsers,
    users => users.find(user => user._id === id)
)

export const selectUsersForProjectMember = createSelector(
    selectProjectMembers,
    selectAllUsers,
    (memberIds, allUsers) => memberIds.map(each => allUsers.find(user => user._id === each))
)
/****************** Reselectors - Filters *********************/

export const selectNoneFilter = createSelector(
    selectFilterReducer,
    filters => filters.none
)

export const selectFilterByEpic = createSelector(
    selectFilterReducer,
    filters => filters.epicFilter
)

export const selectFilterByLabel = createSelector(
    selectFilterReducer,
    filters => filters.labelFilter
)

export const selectFilterByAssignee = createSelector(
    selectFilterReducer,
    filters => filters.assigneeFilter
)

export const selectGroupBy = createSelector(
    selectFilterReducer,
    filters => filters.groupBy
)

