export default class User {
    constructor({ email, password }) {
        this.email = email
        this.password = password
        this.validateEmail()
        this.validatePassword()
    }

    getEmail() {
        return this.email
    }

    getPassword() {
        return this.password
    }

    validateEmail() {
        if (!this.email.includes('@')) {
            throw new Error('Email is not correct')
        }
    }

    validatePassword() {
        if (this.password.length < 8) {
            throw new Error('Password should have minimum of 8 symbols')
        }
    }

    login() {
        if (this.email.includes('devmentor.pl')) {
            return true
        } else {
            return false
        }
    }
}