import * as types from "./constants";
import { actions } from "../";
import { AsyncStorage } from "react-native";
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
 * Sign in.
 * @param {string} userId
 * @param {string} username
 * @param {string} email
 * @param {string} latitude
 * @param {string} longitude
 * @param {string} heading
 * @param {string} location
 *
 */
export const register = (
  userId: string,
  username: string,
  email: string,
  location: string
) => {
  // async call

  var data = {
    name: username,
    id: userId,
    email: email,
    location: location
  };
  console.log(data);

  return dispatch => {
    // turn loading animation on
    dispatch(actions.app.loading());

    setTimeout(() => {
      AsyncStorage.setItem("userId", userId);
      AsyncStorage.setItem("username", username);
      AsyncStorage.setItem("email", email);
      AsyncStorage.setItem("loggedIn", "true");

      fetch(
        "https://a6e6qa6e5f.execute-api.eu-west-3.amazonaws.com/dev/flappaccount",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      )
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log(data);
        });

      console.log(JSON.stringify(data));

      dispatch({
        type: types.REGISTER,
        payload: {
          userId: userId,
          username: username,
          email: email,
          location: location
        }
      });

      // turn loading animation off
      dispatch(actions.app.loading(false));
    }, 3000);
  };
};
