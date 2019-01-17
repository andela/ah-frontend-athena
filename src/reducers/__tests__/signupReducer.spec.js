import actionTypes from '../../actions/actionTypes'
import signupReducer from '../signupReducer'

const initialStore = {
    user: {}
}

describe('test signup reducer', () => {
    it('should return the initial state unknow action type', () => {
        expect(signupReducer(undefined, {})).toEqual(initialStore)
    });
    it('should return the initial state on SIGNUPFAIL type', () => {
        const type = actionTypes.SIGNUPFAIL
        expect(signupReducer(
            undefined, {type: type, payload: {user: {username:'', email: '', password: ''}}})
            ).toEqual({user: {user: {username:'', email: '', password: ''}}})
    });
    it('should return new state on SIGNUPSUCCESS type', () => {
        const newUser = {
            user:  {
                username: "kasule",
                email: "ka@gmeil.com",
                password: ""
            }
        }
        expect(signupReducer(
            undefined, {type: actionTypes.SIGNUPSUCCESS, payload: newUser})
            ).toMatchObject({user: newUser})
    })
})
