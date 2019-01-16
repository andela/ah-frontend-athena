 import React from 'react';
 import { mount } from 'enzyme';
 import { Login, mapStateToProps} from './Login';

 let login=jest.fn()
 let push=jest.fn()
 let returnData  ={}
 let loginProps={
    login,
    history:{push},
    returnData

 }
 const initialState = {
     login:{login:{
            username: '',
            email: 'okello@andela.com',
            password: '',
            errors: ''
        }
    }
 }
 describe("Test login component",()=>{
     let wrapper;
     beforeEach(()=>{
        wrapper = mount(<Login {...loginProps} />)
     })
     it("Login component",()=>{
        expect(wrapper.exists()).toEqual(true);
     })
     it("test handleSubmit function",()=>{
         wrapper.find('form').simulate('submit',{target:{name:'email',value:'okello@andela.com'}})
         expect(login).toBeCalled()
     })
     it("test handleChange function",()=>{
        wrapper.instance().handleChange({target:{name:'email',value:'okello@andela.com'}})
         expect(wrapper.state('email')).toEqual('okello@andela.com')
     })
     it("test component will receive props ",()=>{
        wrapper.setProps({returnData:{errors:"invalid"}})
        expect(wrapper.state('errors')).toEqual('invalid')
     })
     it("test correct login data, pushes articles page",()=>{
        wrapper.setProps({returnData:{user:"invalid"}})
        expect(push).toBeCalled();
     })
     it("test mapStateToProps",()=>{
         expect(mapStateToProps(initialState).returnData['email']).toEqual('okello@andela.com')
     })
 })
 