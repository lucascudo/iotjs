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
  toogleLed = () =>
    this.remoteCommand('led_toggle', () => this.updateStatus('led'));
  updateAllDevices = () =>
    ['led', 'lux', 'motion', 'reed'].forEach(this.updateStatus);
  updateStatus = (device) => {
    const devices = {
      led: {
        command: 'led_is_on',
        state: 'ledIsOn'
      },
      lux: {
        command: 'lux_sensor',
        state: 'isSunny'
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
    return fetch('http://172.20.10.181:3000/api/robots/Robot%201/commands/' + devices[device].command)
      .then((res) => {
        let stateUpdate = {};
        res = res.json();
        stateUpdate[devices[device].state] = res.result;
        this.setState(update);
      })
      .catch(console.error);
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    setInterval(this.updateAllDevices, 5000);
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
    const icons = {
      led: (this.state.ledIsOn) ? "ios-bulb-outline" : "ios-bulb",
      sunny: (this.state.isSunny > 100) ? "ios-sunny-outline" : "ios-sunny",
      motion: (this.state.thereIsMovement) ? "ios-walk" : "ios-remove-circle"
    };
    return (
      <Container>
        <ChickenRunHeader/>
        <ChickenRunContent
          doorIsOpen={this.state.doorIsOpen}
          led={icons.led}
          sunny={icons.sunny}
          motion={icons.motion}
          toogleLed={this.toogleLed}/>
      </Container>
    );
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
    const doorIcon = (this.props.doorIsOpen)
      ? <Icon name="ios-alert"> <Text>the door is open</Text> </Icon>
      : <Text>the door is closed</Text>;
    return (
      <Content>
        <Icon name={this.props.led} onPress={this.props.toogleLed}/>
        <Icon name={this.props.sunny}/>
        <Icon name={this.props.motion}/>
        {doorIcon}
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
