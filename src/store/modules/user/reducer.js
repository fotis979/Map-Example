import { handleActions } from 'redux-actions'
import { LOGIN, LOGOUT } from './constants'

export type UserState = {
  loggedIn: boolean,
  userId: string,
  username: string,
  email: string
  
}

const initialState: UserState = {
  //loggedIn: false,
  userId: '',
  username: '',
  email: ' '
 
}

export default handleActions(
  {
    [LOGIN]: (state: UserState = initialState, action): UserState => {
      const p = action.payload
      return {
        loggedIn: true,
        userId: p.userId,
        username: p.username,
        email: p.email
        
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
