import React from 'react';
import ReactDOM from 'react-dom';
import LoginView from "../Login"
//import { render, wait, fireEvent } from '@testing-library/react'
//import { getByTestId } from '@testing-library/dom'

describe("LoginForm", () => {
    const test = (values) => { console.log("test", values) }

    it.skip("renders without crashing", () => {
        const div = document.createElement('div')
        ReactDOM.render(<LoginView onContinue={test} />, div)
    })
})