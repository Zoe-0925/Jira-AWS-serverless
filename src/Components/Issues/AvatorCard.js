import React from 'react';
import { useSimpleState } from "../Shared/CustomHooks"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { ListItem, Typography } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid'
import { Container, Row, Col } from 'reactstrap';

export const AvatorCard = ({ user }) => {

    return <div className="avator-card">
        <div className="blue-bg">
            <Typography variant="h3" gutterBottom>{user.name}</Typography>
        </div>
        <AccountCircleIcon className="avator-big" size="inherit" />
        <div className="white-bg">
            <Typography className="row" variant="subtitle1" gutterBottom>
                <MailOutlineIcon size="small" />{user.email}</Typography>
            <div className="row">
                <p className="tab">View Profile</p>
                <p className="tab">Assigned Issues</p>
            </div>
        </div>
    </div>

}

export const Member = ({ user }) => {
    const { value, handleTrue, handleFalse } = useSimpleState()

    return <Container>
        <Row>
            {value ? <AvatorCard user={user} /> : ""}
            <ListItem key={uuidv4()}>
                <AccountCircleIcon onMouseEnter={handleTrue} onMouseLeave={handleFalse} />
            </ListItem>
            <Typography variant="h6" display="block" gutterBottom>{user.name}</Typography>
        </Row>
    </Container>
}
