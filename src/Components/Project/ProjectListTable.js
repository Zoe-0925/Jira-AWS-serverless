import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setCurrentProject, chainDeleteProject } from "../../Actions/project.actions"
import { selectAllUsers, selectAllProjects } from "../../Reducers/Selectors"
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, MenuItem
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { DotIconMenu } from "../Shared/Tabs"
import history from "../../history"

export default function ProjectListTable() {
    let projects = useSelector(selectAllProjects)
    console.log("projects in the page", projects)
    const users = useSelector(selectAllUsers)

    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const isOpen = Boolean(anchorEl);
    const anchorRef = React.useRef(null);

    const handleMenuClose = () => {
        setAnchorEl(false);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const goToBoardPage = (projectId) => {
        dispatch(setCurrentProject(projectId))
        history.push("/projects/board")
    }

    const goToProjectDetail = (projectId) => {
        dispatch(setCurrentProject(projectId))
        history.push("/projects/settings/details")
    }

    useEffect(() => {
        console.log("projects changed", projects)
    }, [projects])

    return (
        <div className="project-list-table">
            <TableContainer component={Paper}>
                <Table className="project-list-table" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Key</TableCell>
                            <TableCell align="left">Type</TableCell>
                            <TableCell align="left">Lead</TableCell>
                            <TableCell align="left"> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects && projects.length > 0 && projects.map(project => (
                            <TableRow key={project._id} className="table-body">
                                <TableCell className="project-name" component="th" scope="row" onClick={() => goToBoardPage(project._id)}>
                                    {project && project.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {project && project.key}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    Software
                            </TableCell>
                                <TableCell component="th" scope="row">
                                    <AccountCircleIcon />
                                    {users.find(user => user._id === project.lead).name}</TableCell>
                                <TableCell component="th" scope="row" >
                                    <DotIconMenu className="dot-icon" anchorEl={anchorEl} isOpen={isOpen} anchorRef={anchorRef}
                                        handleMenuClose={handleMenuClose} handleMenuOpen={handleMenuOpen} >
                                        <MenuItem onClick={() => goToProjectDetail(project._id)}>Project settings</MenuItem>
                                        <MenuItem onClick={() => dispatch(chainDeleteProject(project._id))}>Move to trash</MenuItem>
                                    </DotIconMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {projects.length === 0 && <p>Currently, there is no project.</p>}
            </TableContainer>
        </div>
    )
}
