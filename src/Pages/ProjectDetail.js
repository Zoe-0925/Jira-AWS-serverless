import React, { useState } from 'react'
import Drawer from "../Components/SideDrawer/Drawer"
import { ProjectSetting } from "../Components/SideDrawer/DrawerInner"
import NavBar from "../Components/NavBar/NavBar"
import {ProjectUpdateHOC} from '../Components/Project/ProjectUpdate';

export default function ProjectDetail() {
    const [open, setOpen] = useState(true);

    return <div className={open ? "main drawer-close" : "main drawer-open"}>
        <NavBar />
        <Drawer open={open} handleClick={setOpen}>
            <ProjectSetting currentLocation="detail" />
        </Drawer>
        <ProjectUpdateHOC />
    </div>
}
