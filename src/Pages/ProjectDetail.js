import React from 'react'
import UpdateProject from '../Components/Forms/UpdateProject';
import DrawerContainer from "../Components/Drawer/DrawerContainer"

const ProjectDetail = () => (
    <DrawerContainer type="projectDetail" currentLocation="detail">
        <UpdateProject />
    </DrawerContainer>
);

export default ProjectDetail;