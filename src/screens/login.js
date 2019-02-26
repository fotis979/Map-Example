import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Alert, 
  KeyboardAvoidingView
} from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../store'
import { Button } from '../components'


/**
 * 
 * @class App
 * @extends {Component}
 */

class App extends Component {
  constructor(props) {
    super(props)

		// init local state
    this.state = {
      id: '',
      username: '',
      email: '',
      _latitude: null,
      _longitude: null,
      location: null,     
    };

  }

  componentDidMount() {    
    navigator.geolocation.getCurrentPosition(
      (position) => {
          const initialPosition = JSON.stringify(position);     
          this.state._latitude = position.coords.latitude;
          this.state._longitude = position.coords.longitude;
          this.state.location = JSON.stringify(this.state._latitude) +", "+ JSON.stringify(this.state._longitude);
  
      }      
   );   
  }
   
  render() {
    const { loading, doLogin ,username} = this.props

		// show only loading indicator if loading state is true
    if (loading) {
      return <ActivityIndicator />
    }

    return (
      
      <KeyboardAvoidingView behavior="padding" style={styles.container}>        
        <TextInput style = {styles.input}
            placeholder='User name'
            placeholderTextColor='#fff'
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
        />
 
         <TextInput style = {styles.input}
            keyboardType='email-address'
            placeholder='Email'
            placeholderTextColor='#fff'
           onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <Button  style={styles.buttonContainer} 
          onPress={() => {
 
           
              if (this.state.username.trim() !== "" && this.state.email.trim() !== "" ){
                this.state.id = String(Math.floor(Math.random() * 10000) + 1);
              
                console.log("id "+ this.state.id);
                console.log("Log save latitude "+this.state._latitude);
                console.log("Log save longitude "+this.state._longitude);
                doLogin(this.state.id, this.state.username.trim(), this.state.email.trim(),this.state.location)
            }
            else{
                Alert.alert("Please enter the name and email to proceed");
            }
          }}
        ><Text  style={styles.buttonText}>Register</Text>
        </Button>
         
        
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#37f'
    },
    input:{
      height: 40,
      backgroundColor: '#999',
      marginBottom: 10,
      padding: 10,
      color: '#fff'
  },
  buttonContainer:{
    backgroundColor: '#2980b6',
    paddingVertical: 15
},
buttonText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
}
})

 

/**
 * Login screen.
 */
export const Login = connect(
	
 
  (state: States) => ({
		
	 
    loading: state.app.loading
	}),
	
 
  dispatch => ({
 
    doLogin: (id, username, email, location) =>
      dispatch(actions.user.login(id, username, email, location))
  })
)(App)
