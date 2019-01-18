import LoginReducer from '../LoginReducer';
import actionTypes from '../../actions/actionTypes';

const initialState = {
    login: {}
};

describe("Testing reducer",()=>{
    it("Test empty reducer",()=>{
        expect(LoginReducer(undefined,{})).toEqual(initialState)
    })
    it("Test reduccer",()=>{
        let response = LoginReducer(initialState, {type:actionTypes.LOGIN, payload:{user:{email:"okello.ronald@andela.com",username:"kica",token:"sSDEsdvs"}}})
        expect(response).toEqual({"login": {"user": {"email": "okello.ronald@andela.com", "token": "sSDEsdvs", "username": "kica"}}})


    })
})
