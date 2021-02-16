import React, { Fragment } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setCurrentProject, chainDeleteProject } from "../../Actions/project.actions"
import { selectAllUsers, selectAllProjects, selectLoading } from "../../Reducers/Selectors"
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, MenuItem
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { DotIconMenu } from "../Shared/Tabs"
import { useDotIconMenu } from "../Shared/CustomHooks"
import history from "../../history"
import Skeleton from '@material-ui/lab/Skeleton';
import { v4 as uuidv4 } from 'uuid'

export default function ProjectListTableContainer() {
    const loading = useSelector(selectLoading)
    let projects = useSelector(selectAllProjects)
    const users = useSelector(selectAllUsers)

    const dispatch = useDispatch()

    const goToBoardPage = (projectId) => {
        dispatch(setCurrentProject(projectId))
        history.push("/projects/board")
    }

    const goToProjectDetail = (projectId) => {
        dispatch(setCurrentProject(projectId))
        history.push("/projects/settings/details")
    }

    const deleteProject = (id) => {
        dispatch(chainDeleteProject(id))
    }

    const tableHeader = ["Name", "Key", "Type", "Lead", ""]

    return <ProjectListTable key={uuidv4()} loading={loading} projects={projects} users={users} goToBoardPage={goToBoardPage}
        goToProjectDetail={goToProjectDetail} tableHeader={tableHeader} deleteProject={deleteProject} />
}

const ProjectListTable = ({ loading = true, projects = [], users = [], goToBoardPage, goToProjectDetail, tableHeader, deleteProject }) => {
    const { anchorEl, isOpen, anchorRef, handleMenuClose, handleMenuOpen } = useDotIconMenu()

    return (
        <div key={uuidv4()} className="project-list-table">
            <TableContainer key={uuidv4()} component={Paper}>
                <Table className="project-list-table" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {tableHeader.map(each => <TableCell align="left">{each}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map(project => (
                            <TableRow key={project._id} className="table-body">
                                <TableCell align="left" onClick={goToBoardPage}>{project.name}</TableCell>
                                {[project.key, "Software"].map(each => <TableCell align="left">{each}</TableCell>)}
                                <TableCell component="th" scope="row">
                                    <AccountCircleIcon />
                                    {users.find(user => user._id === project.lead) ? users.find(user => user._id === project.lead).name : ""}</TableCell>
                                <TableCell component="th" scope="row" >
                                    <DotIconMenu className="dot-icon" anchorEl={anchorEl} isOpen={isOpen} anchorRef={anchorRef}
                                        handleMenuClose={handleMenuClose} handleMenuOpen={handleMenuOpen} >
                                        <MenuItem onClick={() => goToProjectDetail(project._id)}>Project settings</MenuItem>
                                        <MenuItem onClick={() => deleteProject(project._id)}>Move to trash</MenuItem>
                                    </DotIconMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {loading && <Fragment>
                    <Skeleton variant="rect" animation="wave" width="inherit" height={50} style={{ marginBottom: "1rem" }} />
                    <Skeleton variant="rect" animation="wave" width="inherit" height={50} style={{ marginBottom: "1rem" }} />
                </Fragment>}
            </TableContainer>
        </div>
    )
}