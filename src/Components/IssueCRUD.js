describe.skip("create an issue", () => {
    it("renders an editable text field when the CREATE-ISSUE button is clicked", () => {

    })

    it("creates an issue after the user filled the editable text field and clicked the enter key", () => {

    })

    it("cancels the creation if the editable text field is empty", () => {

    })

    it("cancels the creation if the user clicked away from the editable text field", () => {

    })
})

describe("read an issue", () => {
    it("renders the summary and issue type in each issue card correctly", () => {

    })

    it("shows the user name when the avator icon in the issue card is hovered", () => {

    })

    it("shows the dot icon when the issue card is hovered", () => {

    })

    it("renders the select menu containing available actions when the dot icon is clicked", () => {

    })
})

describe("update an issue", () => {
    describe("update an issue from the issue card in the column", () => {
        it("adds a label to the issue after the user clicks 'Add Label' option", () => {

        })

        it("adds a parent to the issue after the user clicks the 'Add Parent' option", () => {

        })

        it("adds a label to the issue after the user clicks the 'Add Label' option", () => {

        })

        it("toggles the flag status of the issue after the user clicks  the'Add Label' option", () => {

        })

        it("does not update the state after the user cancels the update", () => {

        })

        it("update the state after the user submits the update", () => {

        })

        it("update the issue status after the user drag the issue to another column", () => {

        })

        it("does not update the issue status after the user drag the issue to the same position", () => {

        })
    })

    describe("update an issue from the issue modal", () => {
        it("renders a modal containing the issue detail if the user clicks an issue card", () => {
        })

        it("renders the issue details in a form", () => {

        })

        it("saves the issue detail when the user clicks the save button", () => {

        })
        it("updates the redux store", () => {

        })

        it("sends a request to update the backend", () => {

        })

        it("closes the modal after the update", () => {

        })
    })
})

describe("delete an issue", () => {
    it("renders a confirmation modal when the user clicks the 'delete' option", () => {

    })

    it("update the state after the user confirms the deletion", () => {

    })

    it("rendered the view excluding the deleted issue", () => {

    })
})