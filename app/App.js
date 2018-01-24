import React, { Component } from 'react';
import { Alert, AppRegistry, StyleSheet, View } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text
} from 'native-base';

export default class ChickenRunAPP extends Component {
  state = {
    ready: 0,
    ledIsOn: 0,
    isSunny: 0,
    doorIsOpen: 0,
    thereIsMovement: 0,
  };

  remoteCommand = (command, cb) => {
    return fetch('http://172.20.10.181:3000/api/robots/Robot%201/commands/' + command)
    .then((res) => res.json())
    .then(cb)
    .catch(console.error);
  }

  updateStatus = (commandToRun, stateToUpdate) => this.remoteCommand(commandToRun, (res) => {
    let update = {};
    update[stateToUpdate] = res.result;
    this.setState(update);
  });

  _updateLedStatus = () => this.updateStatus('led_is_on', 'ledIsOn');

  _updateReedStatus = () => this.updateStatus('reed_sensor', 'doorIsOpen');

  _updateMotionSensorStatus = () => this.updateStatus('motion_sensor', 'thereIsMovement');

  _updateLuxSensorStatus = () => this.updateStatus('lux_sensor', 'isSunny');

  _toogleLed = () => this.remoteCommand('led_toggle', this._updateLedStatus);

  render() {
    if (!this.state.ready) {
      return (
        <Container>
          <Text>Loading...</Text>
        </Container>
      );
    }
    const icons = {
      led: (this.state.ledIsOn) ? "ios-bulb-outline" : "ios-bulb",
      sunny: (this.state.isSunny > 100) ? "ios-sunny-outline" : "ios-sunny",
      motion: (this.state.thereIsMovement) ? "ios-walk" : "ios-remove-circle",
      door: (this.state.doorIsOpen)
        ? <Icon name="ios-alert"> <Text>the door is open</Text> </Icon>
        : null
    };
    return (
      <Container>
        <ChickenRunHeader/>
        <ChickenRunContent
          led={icons.led}
          sunny={icons.sunny}
          motion={icons.motion}
          door={icons.door}
          toogleLed={this._toogleLed}/>
      </Container>
    );
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ ready: true });
    setInterval(() => {
      this._updateLedStatus();
      this._updateReedStatus();
      this._updateLuxSensorStatus();
      this._updateMotionSensorStatus();
    }, 5000);
  }
}

export class ChickenRunHeader extends Component {
  render() {
    return (
      <Header>
        <Left>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>Header</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}

export class ChickenRunContent extends Component {
  render() {
    return (
      <Content>
        <Icon name={this.props.led} onPress={this.props.toogleLed}/>
        <Icon name={this.props.sunny}/>
        <Icon name={this.props.motion}/>
        {this.props.door}
      </Content>
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
