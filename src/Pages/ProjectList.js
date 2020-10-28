import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Typography, Breadcrumbs } from '@material-ui/core';
import { getAllProjects, setCurrentProject } from "../Actions/project.actions"
import { addStatusOrder } from "../Actions/Status.actions"
import { selectAllProjects } from "../Reducers/Selectors"
import NavBar from "../Components/NavBar/NavBar"
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function ProjectList() {
    const dispatch = useDispatch()
    const projects = useSelector(selectAllProjects)

    const fetchBoardPage = (projectId) => {
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
        <div className={open ? "main drawer-close" : "main drawer-open"}>
            <NavBar />
            <Drawer handleClick={setOpen} open={open}>
                <DrawerInner currentLocation="board" />
            </Drawer>
            <Breadcrumbs aria-label="breadcrumb" className="bread-crumbs" >
                <Typography color="textPrimary">Projects</Typography>
            </Breadcrumbs>
            <p>Project list</p>
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
                                <TableCell component="th" scope="row" onClick={()=>fetchBoardPage(project._id)}>
                                    {project.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    Software
                            </TableCell>
                                <TableCell align="right">{Project.Lead}</TableCell>
                                <TableCell align="right">Icon Button</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
