import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { actions, States } from "../store";
import { Button } from "../components";

import { setJSExceptionHandler } from "react-native-exception-handler";
import { Alert } from "react-native";
import { BackAndroid } from "react-native";

const reporter = error => {
  // Logic for reporting to devs
  // Example : Log issues to github issues using github apis.
  console.log(error); // sample
};

const errorHandler = (e, isFatal) => {
  if (isFatal) {
    reporter(e);
    Alert.alert(
      "Unexpected error occurred",
      `
        Error: ${isFatal ? "Fatal:" : ""} ${e.name} ${e.message}

        We have reported this to our team ! Please close the app and start again!
        `,
      [
        {
          text: "Close",
          onPress: () => {
            BackAndroid.exitApp();
          }
        }
      ]
    );
  } else {
    console.log(e); // So that we can see it in the ADB logs in case of Android if needed
  }
};

setJSExceptionHandler(errorHandler);

/**
 *
 * @class App_register
 * @extends {Component}
 */

class App_register extends Component {
  constructor(props) {
    super(props);

    // init local state
    this.state = {
      id: "",
      username: "",
      email: "",
      _latitude: null,
      _longitude: null,
      location: null
    };
  }

  componentWillUpdate() {
    navigator.geolocation.getCurrentPosition(position => {
      const initialPosition = JSON.stringify(position);
      this.state._latitude = position.coords.latitude;
      this.state._longitude = position.coords.longitude;
      this.state.location =
        JSON.stringify(this.state._latitude) +
        ", " +
        JSON.stringify(this.state._longitude);
    });
  }

  render() {
    const { loading, doRegister, username } = this.props;

    // show only loading indicator if loading state is true
    if (loading) {
      return <ActivityIndicator />;
    }

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            style={styles.input}
            placeholder="User name"
            placeholderTextColor="#fff"
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
          />

          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="Email"
            placeholderTextColor="#fff"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />

          <Button
            style={styles.buttonContainer}
            onPress={() => {
              if (
                this.state.username.trim() !== "" &&
                this.state.email.trim() !== ""
              ) {
                this.state.id = String(Math.floor(Math.random() * 10000) + 1);

                console.log("Location Register " + this.state.location);

                if (this.state.location !== null) {
                  doRegister(
                    this.state.id,
                    this.state.username.trim(),
                    this.state.email.trim(),
                    this.state.location
                  );
                } else {
                  Alert.alert("No found Location");
                }
              } else {
                Alert.alert("Please enter the name and email to proceed");
              }
            }}
          >
            <Text style={styles.buttonText}>Register</Text>
          </Button>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#2980b6",
    paddingLeft: 7.5,
    paddingRight: 7.5,
    paddingTop: 0,
    paddingBottom: 7.5,
    justifyContent: "center"
  },
  input: {
    height: 40,
    backgroundColor: "#999",
    marginBottom: 10,
    padding: 10,
    color: "#fff"
  },
  buttonContainer: {
    backgroundColor: "#2980b6",
    paddingVertical: 15
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  }
});

/**
 * Register screen.
 */
export const Register = connect(
  (state: States) => ({
    loading: state.app.loading
  }),

  dispatch => ({
    doRegister: (id, username, email, location) =>
      dispatch(actions.user.register(id, username, email, location))
  })
)(App_register);
