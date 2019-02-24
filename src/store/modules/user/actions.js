import * as types from './constants'
import { actions } from '../'
import {AsyncStorage} from 'react-native'; 

/**
 * Sign in.
 * @param {string} userId 
 * @param {string} username 
 * @param {string} email
 * 
 */
export const login = (userId: string, username: string, email: string  ) => {
  // async call 
  return dispatch => {
    // turn loading animation on
    // by dispacthing `loading` action from module `app`.
    // yes, each action can interact with another module actions.
    dispatch(actions.app.loading())

    // simulate ajax login
    // in real world you can use `fetch` to make ajax request.
    setTimeout(() => {
     // if (username === 'admin' && password === 'secret' ) { 
     //  if (username !=null && email !=null ) {
      
     
     // _storeData()
     AsyncStorage.setItem('userId', userId);
     AsyncStorage.setItem('username', username);
     AsyncStorage.setItem('email', email); 
     AsyncStorage.setItem('loggedIn', 'true'); 
     

      console.log("userId "+ userId);
      console.log("username "+ username);
      console.log("email "+ email);
      
     // _retrieveData();

        dispatch({
          type: types.LOGIN,
          payload: {
            userId: userId,
            userId: username,
            email: email,
             
          }

        })
      //}

      // turn loading animation off
      dispatch(actions.app.loading(false))
    }, 3000)
  }
}

setName = (value) => {
  AsyncStorage.setItem('name', value);
  this.setState({ 'name': value });
}

_storeData = async () => {
  try {
    //await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
    //Store local username and e-mail
    await AsyncStorage.setItem("userId", userId); 
    await AsyncStorage.setItem("username", username);
    await AsyncStorage.setItem("email", email);
  } catch (error) {
    // Error saving data
  }
};

_retrieveData = async () => {
  try {
     username = await AsyncStorage.getItem('username');
     email = await AsyncStorage.getItem('email');
    if (email !== null) {
      // We have data!!
      console.log("retrieve Data email "+email);
    }
  } catch (error) {
    // Error retrieving data
  }
};



/**
 * Sign out.
 */
export const logout = () => {
  // direct/sync call
  AsyncStorage.setItem('loggedIn', 'false'); 
  return {

    type: types.LOGOUT
   
  }
}
