import React from 'react'
import { Typography, Breadcrumbs, Link } from '@material-ui/core';


export default function NavBreadcrumbs() {

    //TODO update this to props
    const projectName = "Project Name"

    return (
        <Breadcrumbs aria-label="breadcrumb"  className="bread-crumbs" >
            <Link color="inherit" href="/">Projects</Link>
            <Typography color="textPrimary">{projectName}</Typography>
        </Breadcrumbs>
    )
}
