import { createSelector } from 'reselect'
import { sortByIndex } from "../components/util"

export const selectStatusReducer = state => state.StatusReducer

export const selectIssueReducer = state => state.IssueReducer

export const selectProjectReducer = state => state.ProjectReducer

export const selectFilterReducer = state => state.FilterReducer

export const selectLabelReducer = state => state.LabelReducer

export const selectUserReducer = state => state.UserReducer

export const selectLoadingReducer = state => state.LoadingReducer

export const selectLoading = state => state.LoadingReducer.loading

export const selectAllProjects = state => state.ProjectReducer.projects

export const selectCommentReducer = state => state.CommentReducer
/****************** Selectors - Status  *********************/

export const selectStatus = state => state.StatusReducer.status.sort(sortByIndex)

export const selectFirstStatus = createSelector(
    selectStatus,
    statusList => statusList[0] ? statusList[0]._id : ""
)

/****************** Selectors - Project  *********************/
export const selectCurrentProjectId = createSelector(
    selectProjectReducer,
    reducer => reducer.currentProjectId
)



/****************** Selectors - Issue  *********************/
export const selectTasks = createSelector(
    selectIssueReducer,
    reducer => reducer.tasks
)

export const selectIssueUpdatedTimeById = (issueId) => state => state.IssueReducer.tasks.get(issueId).updatedAt

/****************** Selectors - Users  *********************/
export const selectUserById = (id) => state => {
    if (id !== "") { return state.UserReducer.users.find(user => user._id === id) }
    return ""
}

export const selectUserAvatarById = (id) => createSelector(
    selectUserById(id),
    user => user ? user.avatar : ""
)

/****************** Reselectors - Projects  *********************/

export const selectProjects = createSelector(
    selectProjectReducer,
    reducer => reducer.projects
)

export const selectCurrentProject = createSelector(
    selectCurrentProjectId,
    selectProjects,
    (currentProjectId, projects) => {
        const project = projects.find(item => item._id === currentProjectId)
        return project
    }
)

export const selectCurrentProjectName = createSelector(
    selectCurrentProject,
    project => project && project.name ? project.name : ""
)

export const selectMemberNames = createSelector(
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

export const selectUsers = createSelector(
    selectUserReducer,
    reducer => reducer.users
)

export const selectUserIds = createSelector(
    selectUserReducer,
    reducer => reducer.users ? reducer.users.map(each => each._id) : []
)

export const selectCurrentUser = createSelector(
    selectCurrentUserId,
    selectUsers,
    (currentUserId, users) => users.find(item => item._id === currentUserId)
)

export const selectUserName = createSelector(
    selectUsers,
    selectCurrentUserId,
    (users, id) => users.find(item => item._id === id)
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

export const selectStatusWithIssue = createSelector(
    selectStatusReducer,
    selectAllTasks,
    (statusReducer, tasks) => statusReducer.status.map(each => {
        each.issues = each.issues.map(issueId => tasks.get(issueId))
        return each
    })
)

export const selectStatusById = (id) => createSelector(
    selectStatusReducer,
    reducer => reducer.status.find(aStatus => aStatus._id === id)
)

export const selectStatusNameById = (id) => createSelector(
    selectStatusById(id),
    status => status ? status.name : ""
)

/****************** Reselectors - Comment  *********************/

export const selectCommentByIssue = (id) => createSelector(
    selectCommentReducer,
    reducer => {
        let filtered = [...reducer.comments]
        filtered.filter(comments => comments.issue === id)
        return filtered
    }
)
