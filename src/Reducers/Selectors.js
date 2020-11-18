import { createSelector } from 'reselect'
import { filterByEpic } from '../Components/Util';

export const selectStatusReducer = state => state.StatusReducer

export const selectIssueReducer = state => state.IssueReducer

export const selectProjectReducer = state => state.ProjectReducer

export const selectFilterReducer = state => state.FilterReducer

export const selectLabelReducer = state => state.LabelReducer

export const selectUserReducer = state => state.UserReducer

export const selectCommentReducer = state => state.CommentReducer

export const selectLoadingReducer = state => state.LoadingReducer

export const selectLoading = state => state.LoadingReducer.loading

/****************** Selectors - Status  *********************/
export const selectAllStatusInArray = state => {
    const project = state.ProjectReducer.projects.find(project => project._id === state.ProjectReducer.currentProjectId)
    const statusOrder = project ? project.statusOrder[0] : []
    return statusOrder.map(each => state.StatusReducer.status.get(each))
}


export const selectAllStatusInArrayWithIssues = state => {
    const project = state.ProjectReducer.projects.find(project => project._id === state.ProjectReducer.currentProjectId)
    const statusOrder = project ? project.statusOrder[0] : []
    let status = statusOrder.map(each => state.StatusReducer.status.get(each))
    status.map(each => {
        if (each && each.issues.length > 0) {
            each.issues = each.issues.map(issueId => state.IssueReducer.tasks.get(issueId))
        }
    })
    return status
}


export const selectAllStatusInArrayFiltered = filters => state => {
    const notFiltered = selectAllStatusInArray(state)
    if (filters === {} || filters === undefined) {
        return notFiltered
    }
    const issuesBeforeFilter = notFiltered.map(each => each.issues)
    let issuesAfterFilter = filters.labels ? issuesBeforeFilter.map(each => filterByLabel(each, filters.labels)) : issuesBeforeFilter
    issuesAfterFilter = filters.epics ? issuesAfterFilter.map(each => filterByEpic(each, filters.epics)) : issuesAfterFilter
    let result = [...notFiltered]
    issuesAfterFilter.map(each => result[issuesAfterFilter.indexOf(each)].issueFiltered = each)
    return result
}

export const selectAllStatus = state => state.StatusReducer.status

export const selectStatusById = (id) => state => state.StatusReducer.status.get(id)

export const selectDefaultIssueOrder = state => state.StatusReducer.status.get(selectFirstStatus(state)) !== undefined ? state.StatusReducer.status.get(selectFirstStatus(state)).issues : []


/****************** Selectors - Project  *********************/
export const selectAllProjects = state => state.ProjectReducer.projects

export const selectCurrentProjectId = state => state.ProjectReducer.currentProjectId

export const selectCurrentProject = state => state.ProjectReducer.projects.find(item => item._id === state.ProjectReducer.currentProjectId)

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

export const selectEpics = state => state.IssueReducer.epics

export const selectTaskById = (issueId) => state => state.IssueReducer.tasks.get(issueId)

export const selectIssueUpdatedTimeById = (issueId) => state => state.IssueReducer.tasks.get(issueId).updatedAt

export const selectTaskByIds = (issueIdList) => state => issueIdList.map(each => state.IssueReducer.tasks.get(each))


/****************** Selectors - Labels  *********************/
export const selectLabels = state => state.LabelReducer.labels

export const selectLabelNames = state => state.LabelReducer.labels.map(each => each.name)

/****************** Selectors - Comments  *********************/
export const selectCommentByIssue = id => state => state.CommentReducer.comments.filter(comment => comment.issue === id)

/****************** Reselectors - Projects  *********************/

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

