import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../store'
import { Login } from './login'
import { Button } from '../components'
import {AsyncStorage} from 'react-native'; 

/**
 * Main component. Display greeting when user is logged in,
 * otherwise it will display the login screen.
 * 
 * @class App
 * @extends {Component}
 */
class App extends Component {


  componentDidMount() {
    
    

    AsyncStorage.getItem(
      'username'
    ).then(username => {
      console.log("1 username "+username);

      if(username != null || username === "") {
        this.state.username=username
       // console.log(" username "+username);
        console.log(" _username "+username);
      } else {
        this.state.username==_username    
        console.log("else username "+username);
        console.log("else _username "+_username);
      }
    }).catch(e => {
      //this.setState({ username: true })
    })

    AsyncStorage.getItem(
      'email'
    ).then(email => {
      console.log(" email "+email);
      if(!email || email === "") {
        
        console.log(" email "+email);
      } else {
                 
        console.log(" email "+email);
      }
    }).catch(e => {
      //this.setState({ username: true })
    })

    AsyncStorage.getItem(
      'loggedIn'
    ).then(loggedIn => {
      console.log(" loggedIn "+loggedIn);
      if(!loggedIn || loggedIn === "") {
      //  this.state({ loggedIn: false })
        loggedIn = false;
        console.log(" loggedIn "+loggedIn);
      } else {
        //this.props.login(username)    
        //this.state({ loggedIn: true })
        loggedIn =  true;
        console.log(" loggedIn "+loggedIn);
      }
    }).catch(e => {
      //this.setState({ username: true })
    })

    
     
    
    
}

  render() {
    const { loading, doLogout, loggedIn, username, email, userId } = this.props
    
     
    console.log("userId "+userId);
    //AsyncStorage.setItem('loggedIn', 'true'); 
    //AsyncStorage.setItem('email', email); 
     //AsyncStorage.setItem('loggedIn', ''); 
    
  
    console.log("1 loggedIn "+loggedIn);
    console.log(" 1 email "+email);
    console.log(" 2 username "+username);


		// Display login screen when user is not logged in
    if (!loggedIn) {
    //if (email===null) {
      return (
        <View>
          <Text>Login Screen</Text>
          <Login />
        </View>
      )
    }

    
		// Display greeting with user full name displayed
    return (
      <View>
        <Text>Welcome {username} !</Text>
        <Button
          onPress={() => {
            doLogout()
          }}
        >
          Logout
        </Button>
      </View>
    )
  }
 
}
 
export const Main = connect(

	// inject states to props
  (state: States) => ({

    loggedIn: state.user.loggedIn,
    
    //fullName: state.user.fullName
    username: state.user.userId,
    email: state.user.email
	}),
	
	// inject actions to props
  dispatch => ({
    doLogout: () => dispatch(actions.user.logout())
    //doLogout: () => dispatch(actions.user.retrieveData())
  })
)(App)
