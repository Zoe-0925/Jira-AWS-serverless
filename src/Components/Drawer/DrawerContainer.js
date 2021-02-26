import React, { useState } from 'react'
import Drawer from "./Drawer"
import { DrawerLinks } from "./DrawerLinks"
import NavBar from "../NavBar/NavBar"

const DrawerContainer = ({ type = "", currentLocation = "", ...props }) => {
    const [open, setOpen] = useState(true);

    const toggleDrawer = () => setOpen(!open)

    return (
        <div className={open ? "main drawer-close" : "main drawer-open"}>
            <NavBar toggleDrawer={toggleDrawer} />
            <Drawer handleClick={toggleDrawer} open={open}>
                <DrawerLinks type={type} currentLocation={currentLocation} />
            </Drawer>
            {props.children}
        </div>
    )
}

export default DrawerContainer