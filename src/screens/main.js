import React, { Component } from 'react'
import { View, Text , StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../store'
import { Login } from './login'
import Geolocation from './geolocation'
import { Button } from '../components'
import {AsyncStorage} from 'react-native'; 
import { retrieveData } from '../store/modules/user/actions';


/**
 * Main component. Display greeting when user is logged in,
 * otherwise it will display the login screen.
 * 
 * @class App
 * @extends {Component}
 */
class App extends Component {
  
  state = {
    isLoading: true,
    isRegister: false,
    username: ''  ,
    initialPosition: 'unknown',
    lastPosition: 'unknown',
    _latitude: null,
    _longitude: null,
    error: null,
  };


 
 

  componentDidMount() {  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const initialPosition = JSON.stringify(position);            
          this.state._latitude = position.coords.latitude;
          this.state._longitude = position.coords.longitude;             
        }         
      );
      
  
   
    AsyncStorage.getItem(
      'username' 
    ).then(username => {
      
      if(username != null) {
        this.setState({
          
          isRegister: true,
          username: username,
          isLoading: false
        });
        
      
        if(username !== null) {
          this.state.username = username ;
        }
       
        } else {              
          this.setState({
            username: username,
            isRegister: false,
            isLoading: false

          });   
       
        }
    }).catch(e => {
       
    })
     
}

  render() {
    const { loading, doLogout, loggedIn, username, email, userId } = this.props
    
    if(username !== "" ) {
      this.state.username = username ;
    }
 
    if (this.state.isLoading) {
      return <View><Text>Loading...</Text></View>;
      
    }
    else{ 
         if (!this.state.isRegister ) {
          this.state.isRegister = true;
            
                return (
                <View > 
                    <View style={styles.loginContainer}>
                        <View style={styles.formContainer}>
                            <Login />                       
                        </View>
                    </View>
                </View>

          )
        }else {   
   
         
          return (            
            <View style = {styles.container} >            
                <Geolocation style = {styles.map}/>                
                <Text style = {styles.boldText} >Welcome {this.state.username} !</Text> 
            </View>
          
          )
        }
  }
}

 
}

const styles = StyleSheet.create ({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  boldText: {
    position: 'absolute',
    top: 10,
    left: 10, 
    fontSize: 20,
    color: 'grey',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
 },
 register: {

 },
 location: {
  flex: 1,
  alignItems: 'center',
  marginTop: 50
},
});
 
 
export const Main = connect(

	// inject states to props
  (state: States) => ({

    loggedIn: state.user.loggedIn,    
    username: state.user.username,
    email: state.user.email

   

	}),
	
	// inject actions to props
  dispatch => ({

    doSave: (username) =>
    dispatch(actions.user.save(username)),
    doLogout: () => dispatch(actions.user.logout())
    
    
  }),
 
  

)(App)

 

