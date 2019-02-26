import { handleActions } from 'redux-actions'
import { REGISTER, LOGOUT } from './constants'

export type UserState = {
  loggedIn: boolean,
  userId: string,
  username: string,
  email: string,
  latitude: string,
  longitude: string

  
}

const initialState: UserState = {
  //loggedIn: false,
  userId: '',
  username: '',
  email: '',
  location: ''
  
 
}

export default handleActions(
  {
    [REGISTER]: (state: UserState = initialState, action): UserState => {
      const p = action.payload
      return {
        loggedIn: true,
        userId: p.userId,
        username: p.username,
        email: p.email,
        location: p.location
        
        
      }
    },

    [LOGOUT]: (): UserState => {
      return {
        loggedIn: false
      }
    }
  },
  initialState
)
