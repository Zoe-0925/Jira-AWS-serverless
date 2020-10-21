import React from 'react'
import { Form, withFormik } from 'formik';
import {
    Button,
    Divider,
} from '@material-ui/core';
import {Link} from 'react-router-dom'
import { useDispatch } from "react-redux"
import { EmailField, PasswordField } from "./SharedTextFields"
//TODO swap
//import { manualLogin } from "../../Actions/user.actions"
import { manualLogin } from "../../Actions/mockUserActions"

const LoginForm = props => {

    const {
        values,
        handleChange,
        handleSubmit,
    } = props

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
                <Link href="/signup" className="link"><p className="link">Sign up for an account</p></Link>
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

const LoginController = () => {
    const dispatch = useDispatch()

    const handleLogin = (values) => {
        dispatch(manualLogin({
            email: values.email,
            password: values.password
        }, "/projects"))
    }

    return (
        <LoginView onContinue={handleLogin} />
    )
}

export default LoginController