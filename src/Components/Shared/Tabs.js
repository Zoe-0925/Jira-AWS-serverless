import React from 'react'
import AddIcon from '@material-ui/icons/Add';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {
    Typography, Link, Menu, ListItem, IconButton
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { Row, Col } from "reactstrap"

export function AddTab({ operationName, handleClick, className }) {
    return (
        <ListItem className={className} button key="CreateIssue" onClick={handleClick}>
            <AddIcon className={className + "-icon"} />
            <Typography variant="subtitle2" gutterBottom>{operationName}</Typography>
        </ListItem>
    )
}

export function BackTab({ operationName, handleClick }) {
    return (
        <ListItem button key="goBack" onClick={handleClick}>
            <KeyboardBackspaceIcon />
            <Typography variant="subtitle1" gutterBottom>{operationName}</Typography>
        </ListItem>
    )
}

export function ManageCategoryTab() {
    return (
        <div className="row tab">
            <KeyboardBackspaceIcon />
            <Link href="/Manage Category">
                <Typography variant="subtitle1" gutterBottom>Manage Category</Typography>
            </Link>
        </div>
    )
}

export function ProjectHeaderTab({ title, subtite, imgSrc }) {
    return (
        <div className="project-header">
            <img className="item-left drawer-img" alt="project" src={imgSrc} />
            <div>
                <Typography className="item-right-up"
                    variant="subtitle1" gutterBottom>{title}</Typography>
                <Typography className="item-right-down"
                    variant="caption" display="block" gutterBottom>{subtite}</Typography>
            </div>
        </div>
    )
}

export function DotIconMenu({ className, anchorEl, isOpen, anchorRef, handleMenuClose, handleMenuOpen, ...props }) {

    return (
        <div className={className}>
            <IconButton
                ref={anchorRef}
                size='small'
                aria-controls={isOpen ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleMenuOpen}>
                <MoreHorizIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isOpen}
                onClose={handleMenuClose}
            >
                {props.children}
            </Menu>
        </div>
    )
}

export function DialogCloseIcon({ handleClose }) {
    return (
        <MuiDialogTitle disableTypography className="title">
            <Row>
                <Col xs lg="1">
                    <IconButton aria-label="close" className="close-btn" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Col>
                <Col xs lg="11"></Col>
            </Row>
        </MuiDialogTitle>
    )
}
