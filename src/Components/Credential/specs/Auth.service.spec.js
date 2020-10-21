import { parseISO } from 'date-fns'
import { setLocalStorage, logout, isLoggedIn, isLoggedOut, getExpiration } from "../Auth.service"


describe.skip("setLocalStorage(token)", () => {
    beforeEach(() => {
        localStorage.clear()
        Date.now = jest.fn(() => 1572393600000); // 2019-10-30T00:00Z0 (GMT)
    });

    it("takes in a token and save it to the local storage", () => {
        setLocalStorage("test token")
        const tokenFromStorage = localStorage.getItem('token');
        expect(tokenFromStorage).toBe("test token")
    })
})

describe.skip("logout()", () => {
    beforeEach(() => {
        localStorage.clear()
        localStorage.setItem("token", "test token")
        localStorage.setItem("expires_at", JSON.string)
    });

    it("removes the token from local storage", () => {
        logout()
        const token = localStorage.getItem("token")
        expect(token).toBe(null)
    })

    it("removes the expiration date from local storage", () => {
        logout()
        const expirationFromStorage = localStorage.getItem('expires_at');
        expect(expirationFromStorage).toBe(null)
    })
})

describe.skip("isLoggedIn()", () => {
    beforeEach(() => {
        localStorage.clear()
    });

    it.skip("returns true if the expire date is in the future", () => {
        localStorage.setItem("expires_at", '2021-02-11T11:30:30')
        const result = isLoggedIn()
        expect(result).toBe(true)
    })

    it.skip("returns false if the expire date has already passed", () => {
        localStorage.setItem("expires_at", '2020-02-11T11:30:30')
        const result = isLoggedIn()
        expect(result).toBe(false)
    })

    it.skip("returns false if no expire date is found", () => {
        const result = isLoggedIn()
        expect(result).toBe(false)
    })
})

describe.skip("isLoggedOut()", () => {
    beforeEach(() => {
        localStorage.clear()
    });

    it("returns false if the expire date is in the future", () => {
        localStorage.setItem("expires_at", '2021-02-11T11:30:30')
        const result = isLoggedOut()
        expect(result).toBe(false)
    })

    it("returns true if the expire date has already passed", () => {
        localStorage.setItem("expires_at", '2020-02-11T11:30:30')
        const result = isLoggedOut()
        expect(result).toBe(true)
    })

    it("returns true if no expire date is found", () => {
        const result = isLoggedOut()
        expect(result).toBe(true)
    })
})

describe.skip("getExpiration()", () => {

    it("retrieves the expire date from the local storage and return a date object", () => {
        localStorage.setItem("expires_at", '2021-01-01')
        const result = getExpiration()
        expect(result).toMatchObject(parseISO('2021-01-01'))
    })
    
    it.skip("returns an empty string if no expire date is found", () => {
        localStorage.setItem("expires_at", null)
        const result = getExpiration()
        expect(result).toBe("")
    })

    it.skip("returns an empty string if the expire date is not a valid date", () => {
        localStorage.setItem("expires_at", "Not a valid date")
        const result = getExpiration()
        const valid = result instanceof Date
        expect(valid).toBe(false)
    })
})

