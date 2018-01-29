import React, { Component } from 'react';
import { Alert, AppRegistry, StyleSheet, View } from 'react-native';
import { Container, Text } from 'native-base';
import ChickenRunHeader from './components/Header';
import ChickenRunContent from './components/Content';

export default class ChickenRunAPP extends Component {
  apiUri = 'http://172.20.10.181:3000';

  state = {
    ready: 0,
    luminosity: 0,
    ledIsOn: false,
    doorIsOpen: false,
    thereIsMovement: false,
  };

  remoteCommand = (command, cb) => {
    return fetch(this.apiUri + '/api/robots/Robot%201/commands/' + command)
      .then((res) => res.json())
      .then(cb)
      .catch(console.error);
  }

  toggleLed = () =>
    this.remoteCommand('led_toggle', () => this.syncStatus('led'));

  syncAllDevices = () =>
    ['led', 'lux', 'motion', 'reed'].forEach(this.syncStatus);

  syncStatus = (device) => {
    const devices = {
      led: {
        command: 'led_is_on',
        state: 'ledIsOn'
      },
      lux: {
        command: 'lux_sensor',
        state: 'luminosity'
      },
      motion: {
        command: 'motion_sensor',
        state: 'thereIsMovement'
      },
      reed: {
        command: 'reed_sensor',
        state: 'doorIsOpen'
      }
    };
    return this.remoteCommand(devices[device].command, (res) => {
      let stateUpdate = {};
      stateUpdate[devices[device].state] = res.result;
      this.setState(stateUpdate);
    });
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    setInterval(this.syncAllDevices, 5000);
    this.setState({ ready: true });
  }

  render() {
    if (!this.state.ready) {
      return (
        <Container>
          <Text>Loading...</Text>
        </Container>
      );
    }
    return (
      <Container>
        <ChickenRunHeader/>
        <ChickenRunContent
          doorIsOpen={this.state.doorIsOpen}
          ledIsOn={this.state.ledIsOn}
          thereIsMovement={this.state.thereIsMovement}
          luminosity={this.state.luminosity}
          toggleLed={this.toggleLed}/>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
