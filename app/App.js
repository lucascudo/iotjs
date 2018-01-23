import React, { Component } from 'react';
import { Alert, AppRegistry, StyleSheet, View } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
export default class HolisticatorAPP extends Component {
  state = {
    ready: false,
    ledIsOn: false,
    isSunny: false,
    doorIsOpen: false,
    thereIsMovement: false,
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ ready: true });
    setInterval(() => {
      this._updateLedStatus();
      this._updateReedStatus();
      this._updateMotionSensorStatus();
    }, 1000);
  }

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

  _toogleLed = () => this.remoteCommand('led_toggle', this._updateLedStatus);

  render() {
    const icons = {
      led: (this.state.ledIsOn) ? "ios-bulb" : "ios-bulb-outline",
      sunny: (this.state.isSunny) ? "ios-sunny" : "ios-sunny-outline",
      motion: (this.state.thereIsMovement) ? "ios-walk" : "ios-remove-circle",
      door: (this.state.doorIsOpen)
        ? (<Icon name="ios-alert">
            <Text>the door is open</Text>
          </Icon>)
        : null
    };
    return (this.state.ready) ? (
      <Container>
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
        <Content>
          <Icon name={icons.led} onPress={this._toogleLed}/>
          <Icon name={icons.sunny}/>
          <Icon name={icons.motion}/>
          {icons.door}
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    ) : (
      <Text>Loading...</Text>
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
