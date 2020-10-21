import React from 'react'
import history from "../history"
import { isLoggedIn } from "../Components/Credential/Auth.service"
import LoginController from "../Components/Credential/Login"

export default function Login() {
    //const authenticated = useSelector(state => state.state)

    if (isLoggedIn()) {
        history.push("/projects")
    }

    return (
        <div className="Login-Page">
            <p className="logo-title">Mock Jira</p>
            <LoginController />
        </div>
    )
}
