import * as types from './constants'
import { actions } from '../'
import {AsyncStorage} from 'react-native'; 

 
/**
 * Sign in.
 * @param {string} userId 
 * @param {string} username 
 * @param {string} email
 * @param {string} location
 * 
 */
export const login = (userId: string, username: string, email: string , location: string   ) => {
  // async call 

  var data = {
    "name" : username,
    "id": userId,
    "email": email,
    "location": location,
 }
 console.log(data);
 
  return dispatch => {
 
     // turn loading animation on
    dispatch(actions.app.loading())

     
    setTimeout(() => {
 
     AsyncStorage.setItem('userId', userId);
     AsyncStorage.setItem('username', username);
     AsyncStorage.setItem('email', email); 
     AsyncStorage.setItem('loggedIn', 'true'); 
    
            fetch("https://a6e6qa6e5f.execute-api.eu-west-3.amazonaws.com/dev/flappaccount", {
              method: "POST",
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body:  JSON.stringify(data)
          })
          .then(function(response){ 
            return response.json();   
          })
          .then(function(data){ 
          console.log(data)
          });
           
 
      console.log(JSON.stringify(data));
      
   

        dispatch({
          type: types.LOGIN,
          payload: {
            userId: userId,
            username: username,
            email: email,
            location: location
             
          }

        })
      

      // turn loading animation off
      dispatch(actions.app.loading(false))
    }, 3000)
  }
}



setName = (value) => {
  //AsyncStorage.setItem('name', value);
  this.setState({ 'name': value });
}

export const addUserName = username => {
  return {
    type: types.LOGIN,
    payload: {
       
      username: username,
      
       
    }
}
}

 

 

/**
 * Sign out.
 */
export const logout = () => {
  // direct/sync call
 // AsyncStorage.setItem('loggedIn', 'false'); 
  return {

    type: types.LOGOUT
   
  }
}
