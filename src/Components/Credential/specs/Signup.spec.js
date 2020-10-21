import React from 'react';
import ReactDOM from 'react-dom';
import SignupView from "../Signup"
import { render, wait, fireEvent } from '@testing-library/react'
import { getByTestId } from '@testing-library/dom'

describe("SignupForm", () => {
    const test = (values) => { console.log("test", values) }

    it.skip("renders without crashing", () => {
        const div = document.createElement('div')
        ReactDOM.render(<SignupView onContinue={test} />, div)
    })



    //TODO failed:
    it.skip('submits correct values', async () => {
        const { container } = render(<SignupView onContinue={test} />)
        const name = (getByTestId(container, "name-field"))
        const email = (getByTestId(container, "email-field"))
        const password = (getByTestId(container, "password-field"))

        await wait(() => {
            fireEvent.change(name, {
                target: {
                    value: 'mockcName'
                }
            })
        })
        await wait(() => {
            fireEvent.change(email, {
                target: {
                    value: 'mockcEmail@gmail.com'
                }
            })
        })
        await wait(() => {
            fireEvent.change(password, {
                target: {
                    value: 'mockcPassword'
                }
            })
        })

        expect(results.innerHTML).toBe(
            '{"email":"mockcEmail@gmail.com","name":"mockName","password":"mockcPassword"}'
        )
    })
})


/**
 *
        const values = { name: "test name", email: "test@gmail.com", password: "testPassword" }
        const handleChange = () => { console.log(values) }
        const handleSubmit = () => { console.log(values) }
        const component = renderer.create(<SignupForm values={values} handleChange={handleChange}
            handleSubmit={handleSubmit} handleReset={handleSubmit} />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
 */