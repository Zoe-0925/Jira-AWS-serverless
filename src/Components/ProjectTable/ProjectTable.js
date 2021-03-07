import React, { Fragment } from 'react'
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, MenuItem
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { DotIconMenu } from "../Buttons/IconButtons"
import { useDotIconMenu } from "../Hooks/Hooks"
import Skeleton from '@material-ui/lab/Skeleton';
import { v4 as uuidv4 } from 'uuid'

const ProjectTable = ({ loading, projects, users, goToBoardPage, goToProjectDetail, tableHeader, deleteProject }) => {
    const { anchorEl, isOpen, anchorRef, handleMenuClose, handleMenuOpen } = useDotIconMenu()

    return (
        <div key={uuidv4()} className="project-list-table">
            <TableContainer key={uuidv4()} component={Paper}>
                <Table className="project-list-table" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {tableHeader && tableHeader.map(each => <TableCell key={each} align="left">{each}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects && projects.map(project => (
                            <TableRow key={project._id} className="table-body">
                                <TableCell align="left" onClick={goToBoardPage}>{project.name}</TableCell>
                                {[project.key, "Software"].map(each => <TableCell key={each} align="left">{each}</TableCell>)}
                                <TableCell component="th" scope="row">
                                    <AccountCircleIcon />
                                    {users && users.find(user => user._id === project.lead) ? users.find(user => user._id === project.lead).name : ""}</TableCell>
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


export default React.memo(ProjectTable);