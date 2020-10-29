import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getAllProjects, setCurrentProject, deleteProject } from "../../Actions/project.actions"
import { addStatusOrder } from "../../Actions/status.actions"
import { selectAllProjects, selectAllUsers ,selectCurrentProject} from "../../Reducers/Selectors"
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, MenuItem
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { DotIconMenu } from "../Shared/Tabs"
import history from "../../history"

export default function ProjectListTable() {
    const dispatch = useDispatch()
    const projects = useSelector(selectAllProjects)
    const users = useSelector(selectAllUsers)
   
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isOpen = Boolean(anchorEl);
    const anchorRef = React.useRef(null);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const updateCurrentProject = (projectId) => {
        dispatch(setCurrentProject(projectId))
        dispatch(addStatusOrder(projectId))

    }

    const goToBoardPage = (projectId) => {
        dispatch(setCurrentProject(projectId))
        //TODO
        //update status order
        history.push("/projects/board")
    }

    const goToProjectDetail = (projectId) => {
        dispatch(setCurrentProject(projectId))
        history.push("/projects/settings/details")
    }

    useEffect(() => {
        if (projects.length === 0) {
            dispatch(getAllProjects())
        }
    }, []
    )

    //TODO sort name, key, lead

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
                        {projects.map(project => (
                            <TableRow key={project._id} className="table-body">
                                <TableCell className="project-name" component="th" scope="row" onClick={() => goToBoardPage(project._id)}>
                                    {project.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {project.key}
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
                                        <MenuItem onClick={() =>  goToProjectDetail(project._id)}>Project settings</MenuItem>
                                        <MenuItem onClick={() => dispatch(deleteProject(project._id))}>Move to trash</MenuItem>
                                    </DotIconMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
