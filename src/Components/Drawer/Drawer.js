import React from 'react';
import { useSelector } from "react-redux"
import { selectCurrentProjectName } from "../../Reducers/Selectors"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, IconButton, Hidden } from '@material-ui/core';
import { ProjectHeaderTab } from "../Shared/Tabs"
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import CssBaseline from '@material-ui/core/CssBaseline';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
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
    const title = useSelector(selectCurrentProjectName)

    function closeDrawer() {
        handleClick(false)
    }

    const closeButton = (<IconButton onClick={closeDrawer} className={classes.closeMenuButton}>
        <CloseIcon />
    </IconButton>)

    return <div className="drawer">
        <CssBaseline />
        <nav className={classes.drawer}>
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                className={classes.drawer + " desktop"}
                variant="persistent"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                <div className="title">
                    <ProjectHeaderTab title={title || ""} subtite="Software project" imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT2sa8Zxht8_5o8aMA9I1rHmr9FVXEoxoDVfw&usqp=CAU" />
                    <IconButton className="close-drawer-icon" onClick={open ? () => { handleClick(false) } : () => { handleClick(true) }}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                {props.children}
            </Drawer>
            <Drawer
                className="mobile-drawer"
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={open}
                onClose={closeDrawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                {closeButton}
                <div className="title">
                    <ProjectHeaderTab title={title || ""} subtite="Software project" imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT2sa8Zxht8_5o8aMA9I1rHmr9FVXEoxoDVfw&usqp=CAU" />
                </div>
                {props.children}
            </Drawer>



        </nav>
    </div>
}

