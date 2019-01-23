import passwordReducer from '../passwordReducers/PasswordResetReducer';
import actionTypes from '../../actions/actionTypes';

const initialState = {
  message:  {},
  errors: {}
}

describe('password reset reducer', () => {
  it('should test an empty reducer', () => {
    expect(passwordReducer(undefined,{})).toEqual(initialState)
  })
  it('should test updated state', () => {
    const newState = {
      message: 'an email has been sent',
      errors: ''
    }
    expect(passwordReducer([], {
      type: actionTypes.PASSWORD_RESET_RESULTS,
      payload: newState
    })).toMatchObject({"message": {"errors": "", "message": "an email has been sent"}})
  })
})

describe('password reset reducer', () => {
  it('should test an empty reducer', () => {
    expect(passwordReducer(undefined,{})).toEqual(initialState)
  })
  it('should test updated state', () => {
    const newState = {
      message: '',
      errors: 'wrong email'
    }
    expect(passwordReducer([], {
      type: actionTypes.PASSWORD_RESET_ERRORS,
      payload: newState
    })).toMatchObject({"errors": {"errors": "wrong email", "message": ""}})
  })
})
