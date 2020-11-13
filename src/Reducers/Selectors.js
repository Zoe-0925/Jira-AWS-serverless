import { createSelector } from 'reselect'

export const selectStatusReducer = state => state.StatusReducer

export const selectIssueReducer = state => state.IssueReducer

export const selectProjectReducer = state => state.ProjectReducer

export const selectFilterReducer = state => state.FilterReducer

export const selectLabelReducer = state => state.LabelReducer

export const selectUserReducer = state => state.UserReducer

export const selectLoadingReducer = state => state.LoadingReducer

export const selectLoading = state => state.LoadingReducer.loading

export const selectAuthenticated = state => state.LoadingReducer.authenticated

export const selectErrorMessage = state => state.LoadingReducer.errorMessage

/****************** Selectors - Status  *********************/
export const selectAllStatus = state => selectStatusReducer(state).status

export const selectStatus = state => selectStatusOrder(state).map(each => selectAllStatus(state).get(each))

export const selectStatusById = (id) => state => selectStatus(state).get(id)


/****************** Selectors - Project  *********************/
export const selectAllProjects = state => selectProjectReducer(state).projects

export const selectCurrentProjectId = state => selectProjectReducer(state).currentProjectId

export const selectStatusOrder = state => {
    const currentProject = selectAllProjects(state).find(item => item._id === selectProjectReducer(state).currentProjectId)
    return currentProject ? currentProject.statusOrder : []
}
export const selectCurrentProject = state => selectAllProjects(state).find(item => item._id === selectCurrentProjectId(state))

export const selectFirstStatus = state => {
    return selectCurrentProject(state) ? selectStatusOrder(state)[0] : ""
}

export const selectCurrentProjectName = state => {
    const currentProject = selectCurrentProject(state)
    return currentProject ? currentProject.name : ""
}

/****************** Selectors - Issue  *********************/
export const selectTasks = state => selectIssueReducer(state).tasks

export const selectEpics = state => selectIssueReducer(state).epics

export const selectTaskById = (issueId) => state => selectTasks(state).get(issueId)

/****************** Selectors - Labels  *********************/
export const selectLabels = state => selectLabelReducer(state).labels

export const selectLabelNames = state => selectLabels(state).map(each => each.name)

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

