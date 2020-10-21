import React from 'react'
import { Field } from 'formik';
import {
    TextField,
} from 'formik-material-ui';
//import VisibilityIcon from '@material-ui/icons/Visibility';  // Filled password icon - viewable
//import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'; //default password icon
//import { IconButton, InputAdornment } from "@material-ui/core";

export const EmailField = ({ handleChange, value }) => {
    return (
        <Field
        data-testid="email-field"
            fullWidth={true}
            className="row text-field"
            component={TextField}
            name="email"
            type="email"
            margin="normal"
            variant="outlined"
            size="small"
            onChange={handleChange}
            value={value}
            placeholder="Enter email address"
        />
    )
}

export const PasswordField = ({ placeholder, handleChange, value }) => {
    return (
        <Field
        data-testid="password-field"
            fullWidth={true}
            className="row text-field"
            component={TextField}
            name="password"
            type="password"
            margin="normal"
            variant="outlined"
            size="small"
            onChange={handleChange}
            value={value}
            placeholder={placeholder}
        />
    )
}