import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Form, withFormik } from 'formik';
import {
    Button,
    Divider,
} from '@material-ui/core';
import { Link } from 'react-router-dom'
import { EmailField, PasswordField } from "./SharedTextFields"
import { selectUserLoading, selectUserError, selectUserAuthenticated } from "../../Reducers/Selectors"
import { signIn } from "../../Actions/user.actions"

const LoginForm = props => {

    const {
        values,
        handleChange,
        handleSubmit,
    } = props

    const loading = useSelector(selectUserLoading)
    const error = useSelector(selectUserError)
    const completed = useSelector(selectUserAuthenticated)

    useEffect(() => {
        if (completed) { //display feedback
            history.push("/projects")
        }
    }, [completed])

    return <div className="login-wrapper">
        <div className="form">
            <Form onSubmit={handleSubmit}>
                <image className="logo" src="../../../images/logo.png" alt="logo" />
                <p className="title">Log in to your account</p>
                <EmailField handleChange={handleChange} value={values.email} />
                <PasswordField placeholder="Enter Password"
                    handleChange={handleChange} value={values.password} />
                <Button
                    className="row main-submit-btn"
                    onClick={handleSubmit}
                >Log in</Button>
                {error !== "" && <p className="error-msg">{error}</p>}
                <Divider />
                <Button
                    className="row submit-btn"
                    onClick={handleSubmit}
                >Log in with Google</Button>
                <Button
                    className="row submit-btn"
                    onClick={handleSubmit}
                >Log in with Git hub</Button>
                <Divider />
                <Link to="/signup" className="link"><p className="link">Sign up for an account</p></Link>
            </Form>
        </div>
    </div>
}

const LoginView = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ""
    }),

    // Custom sync validation
    validate: values => {
        const errors = {}
        if (!values.email) {
            errors.email = 'Required';
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Please enter a valid email address';
        }
        if (!values.password) {
            errors.password = 'Required';
        }
        //TODO
        //Password regex
        return errors;
    },
    handleSubmit: (values, { 'props': { onContinue } }) => {
        onContinue(values);
    },

    displayName: 'BasicForm',
})(LoginForm);


//TODO
// onContinue needs to use the server to validate if the email already exists

const LoginHOC = () => {
    const dispatch = useDispatch()

    const handleLogin = (values) => {
        console.log("email & password",values.email, values.password )
        dispatch(signIn(values.email, values.password))
    }

    return (
        <LoginView onContinue={handleLogin} />
    )
}

export default LoginHOC