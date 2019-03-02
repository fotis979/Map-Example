import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { actions, States } from "../store";
import { Register } from "./register";
import Geolocation from "./geolocation";
import { AsyncStorage } from "react-native";

/**
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  state = {
    isLoading: true,
    isRegister: false,
    username: null,
    initialPosition: "unknown",
    lastPosition: "unknown",
    _latitude: null,
    _longitude: null,
    _heading: null,
    error: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      const initialPosition = JSON.stringify(position);
      this.state._latitude = position.coords.latitude;
      this.state._longitude = position.coords.longitude;
      this.state._heading = position.coords._heading;
    });

    AsyncStorage.getItem("username")
      .then(username => {
        if (username != null) {
          this.setState({
            isRegister: true,
            username: username,
            isLoading: false
          });
        } else {
          this.setState({
            username: null,
            isRegister: false,
            isLoading: false
          });
        }
      })
      .catch(e => {});
  }

  render() {
    const { loading, doLogout, loggedIn, username, email, userId } = this.props;

    if (this.state.isLoading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      if (!this.state.isRegister) {
        this.state.isRegister = true;

        return (
          <View>
            <Register />
          </View>
        );
      } else {
        if (username !== null && username.length !== 0) {
          this.state.username = username;
        }
        return (
          <View style={styles.container}>
            <Geolocation style={styles.map} />
            <Text style={styles.userName}>Welcome {this.state.username}</Text>
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  userName: {
    flex: 1,
    alignItems: "center",
    marginTop: 15,
    fontSize: 15,
    color: "grey"
  },

  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
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
    doSave: username => dispatch(actions.user.save(username)),
    doLogout: () => dispatch(actions.user.logout())
  })
)(App);
