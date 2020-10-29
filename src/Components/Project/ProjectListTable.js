import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getAllProjects, setCurrentProject } from "../../Actions/project.actions"
import { addStatusOrder } from "../../Actions/status.actions"
import { selectAllProjects } from "../../Reducers/Selectors"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'

export default function ProjectListTable() {
    const dispatch = useDispatch()
    const projects = useSelector(selectAllProjects)

    const fetchBoardPage = async (projectId) => {
        await Promise.all(
            dispatch(setCurrentProject(projectId)),
            dispatch(addStatusOrder(projectId))
        )
        history.push("/board")
    }

    useEffect(() => {
        if (projects.length === 0) {
            dispatch(getAllProjects())
        }
    }, []
    )

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className="project-list-table" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Key</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Lead</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map(project => (
                            <TableRow key={project._id}>
                                <TableCell component="th" scope="row" onClick={() => fetchBoardPage(project._id)}>
                                    {project.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    Software
                            </TableCell>
                                <TableCell align="right">{project.Lead}</TableCell>
                                <TableCell align="right">Icon Button</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
