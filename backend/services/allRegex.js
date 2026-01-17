const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+\=\[\]{};:'",.<>\/?\\|`~]).{6,12}$/

module.exports = {emailRegex , passwordRegex}