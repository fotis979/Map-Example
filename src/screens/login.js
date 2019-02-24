import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { actions, States } from '../store'
import { Button } from '../components'


/**
 * A login component that display username and password text field.
 * Loading indicator will show up when login is in process.
 * 
 * @class App
 * @extends {Component}
 */
class App extends Component {
  constructor(props) {
    super(props)

		// init local state
    this.state = {
      userid: '',
      username: '',
      email: ''
    }
  }


   
  render() {
    const { loading, doLogin } = this.props

		// show only loading indicator if loading state is true
    if (loading) {
      return <ActivityIndicator />
		}
		
    //// display login screen
    /*      <TextInput
             onChangeText={password => this.setState({ password })}
              value={this.state.password}
      /> */

    return (
      
      <View style={styles.container}>
        <Text>Login  </Text>
        <TextInput placeholder='User name'
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
        />
 
         <TextInput placeholder='Email'
           onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <Button
          onPress={() => {
            ////doLogin(this.state.username, this.state.password)
          //  const rand = Math.floor(Math.random() * 10000) + 1 ;
           // this.state.id = rand;
           this.state.id = String(Math.floor(Math.random() * 10000) + 1);
             
              console.log("id "+ this.state.id);
              doLogin(this.state.id, this.state.username, this.state.email)
          }}
        >
          Register
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    fontSize: 35,
    fontWeight: 'bold',    
    textAlign: 'center',
    }
})

 

/**
 * Login screen.
 */
export const Login = connect(
	
	// map states
  (state: States) => ({
		
		// props.loading -> modules.app.loading
    loading: state.app.loading
	}),
	
	// map actions
  dispatch => ({

    // props.doLogin -> modules.login.login()
    ////// doLogin: (username, password) =>
    doLogin: (id, username, email) =>
      dispatch(actions.user.login(id, username, email))
  })
)(App)
