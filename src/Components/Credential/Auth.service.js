import { parseISO, isValid, isBefore, addDays } from 'date-fns'

export function setLocalStorage(token) {
    //expiresIn is "1 day"
    const expiresAt = addDays(new Date(), 1)
    localStorage.setItem('token', token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt));
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
}

export function isLoggedIn() {
    if (getExpiration() === "" || isBefore(getExpiration(), new Date())) { return false }
    return true
}

export function isLoggedOut() {
    return !isLoggedIn();
}

export function getExpiration() {
    const expiration = parseISO(localStorage.getItem("expires_at"))
    if (!isValid(expiration)) { return "" }
    return expiration
}




