import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Form, Field, withFormik } from 'formik';
import {
    Button,
    Divider,
    Box,
} from '@material-ui/core';
import { Link } from 'react-router-dom'
import {
    TextField,
} from 'formik-material-ui';
import { EmailField, PasswordField } from "./SharedTextFields"
import { signUp } from "../../Actions/user.actions"
import { selectUserLoading, selectUserError, selectUserAuthenticated } from "../../Reducers/Selectors"
import SuccessfulFeedback from "./SuccessfulFeedback"
import history from "../../history"

export const SignupForm = props => {
    const {
        values,
        handleChange,
        handleSubmit,
    } = props

    const [sucessful, setSuccessful] = useState(false)

    const dispatch = useDispatch()
    const error = useSelector(selectUserError)
    const completed = useSelector(selectUserAuthenticated)

    const mockClick = () => {
        dispatch({ type: "LOADING_USER" })
        setSuccessful(true)
        dispatch({ type: "CANCEL_LOADING_USER" })
    }


    useEffect(() => {
        if (completed) { //display feedback
            setSuccessful(true)


        }
    }, [completed])


    return <div className="login-wrapper">
        <div className="form">
            <Form onSubmit={handleSubmit}>
                <image className="logo" src="../../../images/logo.png" alt="logo" />
                <p className="title">Sign up for your account</p>
                <EmailField handleChange={handleChange} value={values.email} />
                <Field
                    data-testid="name-field"
                    fullWidth={true}
                    className="row text-field"
                    component={TextField}
                    name="name"
                    type="text"
                    margin="normal"
                    variant="outlined"
                    size="small"
                    onChange={handleChange}
                    value={values.name}
                    placeholder="Enter full name"
                />
                <PasswordField
                    placeholder="Create password" handleChange={handleChange}
                    value={values.password} />

                <Button
                    className="row main-submit-btn"
                    onClick={mockClick}
                    disabled={loading}>Sign up</Button>
                {error !== "" && <p className="error-msg">{error}</p>}
                {sucessful && <SuccessfulFeedback open={sucessful} message="Sign up successfully!" />}
                <p className="or-label">OR</p>

                <Button
                    className="row submit-btn"
                    onClick={handleSubmit}
                    disabled={loading}
                >Continue with Google</Button>
                <Button
                    className="row submit-btn"
                    onClick={handleSubmit}
                    disabled={loading}
                >Continue with Git hub</Button>
                <Box margin={1}>
                    <Divider className="blank-divider" />
                    <Link className="link" to="/login"><p className="link">Already have an account? Log in</p></Link>
                </Box>
            </Form>
        </div>
    </div>
}

export const SignupView = withFormik({
    mapPropsToValues: () => ({
        email: "",
        name: "",
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
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(values.password)) {
            errors.password = 'Password must contain at least 1 lower case, 1 upper case, 1 number and 1 special character. ';
        }
        if (!values.name) {
            errors.name = 'Required';
        }
        if (!/^[A-Za-z]/i.test(values.name)) {
            errors.name = 'Please enter a valid name';
        }
        if (!values.password) {
            errors.password = 'Required';
        }
        /**   const validEmail = checkEmail(values.email)
          if (!validEmail) {
              errors.email = 'This email address already existed.';
          }*/
        //TODO
        //Password regex
        return errors;
    },
    handleSubmit: (values, { 'props': { onContinue } }) => {
        onContinue(values);
    },

    displayName: 'BasicForm',
})(SignupForm);


//TODO
// onContinue needs to use the server to validate if the email already exists

const SignupHOC = () => {
    const dispatch = useDispatch()

    const handleSignup = async (values) => {
        const { email, name, password } = values
        dispatch(signUp(email, name, password))
    }
    return (
        <SignupView onContinue={handleSignup} />
    )
}

export default SignupHOC

//TODO display the error message somewhere