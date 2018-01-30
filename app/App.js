import React, { Component } from 'react';
import { ActivityIndicator, Alert, AppRegistry, StyleSheet, View } from 'react-native';
import { Container, Text } from 'native-base';
import ChickenRunHeader from './components/Header';
import ChickenRunContent from './components/Content';

export default class ChickenRunAPP extends Component {
  apiUri = 'http://172.20.10.181:3000';

  state = {
    ready: false,
    luminosity: 0,
    ledIsOn: false,
    doorIsOpen: false,
    thereIsMovement: false,
  };

  remoteCommand = (command, cb) => {
    try {
      let request = new XMLHttpRequest(this.apiUri + '/api/robots/Robot%201/commands/' + command);
      request.onreadystatechange = (err) => {
        if (request.readyState !== 4) return;
        if (request.status === 200) return cb(JSON.parse(request.responseText));
        console.warn(err || 'Can`t connect to server');
      };
      request.send();
    } catch (err) {
      console.warn(err);
    }
  };

  syncAllDevices = () =>
    ['led', 'lux', 'motion', 'reed'].forEach(this.syncStatus);

  syncStatus = (device) => {
    const devices = {
      led: {
        command: 'led_is_on',
        varName: 'ledIsOn'
      },
      lux: {
        command: 'lux_sensor',
        varName: 'luminosity'
      },
      motion: {
        command: 'motion_sensor',
        varName: 'thereIsMovement'
      },
      reed: {
        command: 'reed_sensor',
        varName: 'doorIsOpen'
      }
    };
    return this.remoteCommand(devices[device].command, (res) => {
      let stateUpdate = {};
      stateUpdate[devices[device].varName] = res.result;
      this.setState(stateUpdate);
    });
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ ready: true }, () =>
      setInterval(this.syncAllDevices, 5000));
  };

  render() {
    return (!this.state.ready)
    ? (
      <Container>
        <ActivityIndicator />
      </Container>
    ) : (
      <Container>
        <ChickenRunHeader/>
        <ChickenRunContent
          doorIsOpen={this.state.doorIsOpen}
          ledIsOn={this.state.ledIsOn}
          thereIsMovement={this.state.thereIsMovement}
          luminosity={this.state.luminosity}
          toggleLed={() =>
            this.remoteCommand('led_toggle', () =>
              this.syncStatus('led'))}/>
      </Container>
    );
  }
};

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
});
