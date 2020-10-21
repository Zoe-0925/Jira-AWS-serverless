import React from 'react';
import { useSelector } from "react-redux"
import { selectCurrentProjectName } from "../../Reducers/Selectors"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, IconButton, Hidden } from '@material-ui/core';
import { ProjectHeaderTab } from "../Shared/Tabs"
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        marginTop: "1rem",
        width: drawerWidth,
        backgroundColor: "rgb(250, 251, 252)"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    closeMenuButton: {
        marginRight: 'auto',
        marginLeft: 0,
    },
}));

export default function SideDrawer({ handleClick, open, ...props }) {
    const theme = useTheme();
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const title = useSelector(selectCurrentProjectName)

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen)
    }

    const closeButton = (<IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
        <CloseIcon />
    </IconButton>)

    const drawerTitle = (<div className="title">
        <ProjectHeaderTab title={title} subtite="Software project" imgSrc="https://www.lovethispic.com/uploaded_images/218149-Hot-Guy-To-Wake-Up-To.jpg" />
        <IconButton className="close-drawer-icon" onClick={open ? () => { handleClick(false) } : () => { handleClick(true) }}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
    </div>)

    return <div className="drawer">
        <nav className={classes.drawer}>
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {closeButton}
                    {drawerTitle}
                    {props.children}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar} />
                    {drawerTitle}
                    {props.children}
                </Drawer>
            </Hidden>
        </nav>
    </div>
}

