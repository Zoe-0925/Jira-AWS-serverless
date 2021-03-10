import React, { Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import Skeleton from '@material-ui/lab/Skeleton';

const IssueDetailSkeleton = () => (
    <Fragment>
        <Row>
            <Col sm="12" md="7">
                <Row>
                    <div className="left-container">
                        <MyRectSkeleton width="inherit" height={50} marginBottom="0.5rem" />
                        <MyRectSkeleton width="70%" height={50} marginBottom="3rem" />
                        <MyRectSkeleton width="80%" height={30} marginBottom="0.5rem" />
                        <MyRectSkeleton width="inherit" height={30} marginBottom="0.5rem" />
                        <MyRectSkeleton width="60%" height={30} marginBottom="0.5rem" />
                        <br />
                        <br />
                        <br />
                        <MyRectSkeleton width="40%" height={30} marginBottom="2rem" />
                        <MyRectSkeleton width="inherit" height={80} marginBottom="2rem" />
                    </div>
                </Row>
                <br />
            </Col>
            <Col sm="12" md="5">
                <MyRectSkeleton width="50%" height={20} marginBottom="1rem" />
                <MyRectSkeleton width="95%" height={50} marginBottom="2rem" />
                <MyRectSkeleton width="70%" height={20} marginBottom="1rem" />
                <MyRectSkeleton width="80%" height={50} marginBottom="2rem" />
                <MyRectSkeleton width="60%" height={20} marginBottom="1rem" />
                <MyRectSkeleton width="90%" height={50} marginBottom="2rem" />
            </Col>
        </Row>
    </Fragment>)

const MyRectSkeleton = ({ width, height, marginBottom }) => (
    <Skeleton variant="rect" animation="wave" width={width} height={height} style={{ marginBottom: marginBottom }} />
)

export default IssueDetailSkeleton