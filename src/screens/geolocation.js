import React, { Component } from 'react'
import { Dimensions, Text, View, TouchableOpacity, StatusBar , StyleSheet} from 'react-native'
import MapView from 'react-native-maps';

class SwichExample extends Component {
   state = {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      focusedlocation: {
        latitude: 39.639023,
        longitude: 22.419125,
        latitudeDelta: 0.0222,
        longitudeDelta:  Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
      },
  locationChosen: false
   }
   

   componentDidMount = () => {
      navigator.geolocation.getCurrentPosition(
         (position) => {
            const initialPosition = JSON.stringify(position);
            this.setState({ initialPosition });
         }
      );
      this.watchID = navigator.geolocation.watchPosition((position) => {
         const lastPosition = JSON.stringify(position);
         this.setState({ lastPosition });
      });

      
   }
   componentWillUnmount = () => {
      navigator.geolocation.clearWatch(this.watchID);
   }


   pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedlocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    this.setState(prevState => {
      return {
        focusedlocation: {
          ...prevState.focusedlocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        locationChosen: true
      };
    });
  }

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      const coordsEvent = {
        nativeEvent: {
          coordinate: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        }
      };
      this.pickLocationHandler(coordsEvent);
    },
      err => {
        console.log(err);
        alert("Fetching the position failed, please enable GPS manually!");
      })
}



   render() {
        let marker = null;

        if (this.state.locationChosen) {
        marker = <MapView.Marker coordinate={this.state.focusedlocation} 
                  title={"My Position"}
                  description={JSON.stringify(this.state.focusedlocation.latitude.toPrecision(5))+" "+JSON.stringify(this.state.focusedlocation.longitude.toPrecision(5))}
                  
        />;
        }


      return (
        <View style={styles.container}>
        
        <View style={styles.map}>
          <MapView
            style={styles.map}
            initialRegion={this.state.focusedlocation}
            onPress={this.pickLocationHandler}
            ref={ref => this.map = ref}
            onRegionChangeComplete={this.getLocationHandler}
            showsUserLocation = {true}
            followUserLocation = {true}
            showsMyLocationButton = {true}
            zoomEnabled = {true}
          >
            {marker}
            
          </MapView>
        </View>
        
      </View>
    );
  }
}
export default SwichExample

const styles = StyleSheet.create ({
    container: {
        
        justifyContent: 'space-between',
        backgroundColor: 'white',
       
        position: 'absolute',
        top: 10,
        left: 0,
        right: 0,
        bottom: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
   headerView: {
    height: '20%',
    backgroundColor: 'white',
    alignItems: 'center',
    },
    textHeader: {
        fontSize: 30,
        color: '#117864',
        textAlign: 'center',
        marginTop: 10
    },
    mapContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 40,
        marginTop: '20%',
        borderWidth: 1,
        borderColor: '#117864',
        alignItems: 'center',
    },
    buttonStyle: {
        padding: 10,
        margin: 5,
        borderRadius: 15,
        backgroundColor: '#117864',
        textAlign: 'center',
        color: 'white',
        fontSize: 20
},

   boldText: {
      fontSize: 30,
      color: 'red',
   },
   map: {
    ...StyleSheet.absoluteFillObject,
    },
 });
 