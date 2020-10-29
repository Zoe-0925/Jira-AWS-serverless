import React from 'react'
import ProjectListTable from "../Components/Project/ProjectListTable"
import NavBar from "../Components/NavBar/NavBar"


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function ProjectList() {


    return (
        <div className="main drawer-open">
            <NavBar />
            <p className="project-list-title">Project</p>
            <ProjectListTable />
        </div>
    )
}
