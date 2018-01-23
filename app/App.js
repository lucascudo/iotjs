import React, { Component } from 'react';
import { Alert, AppRegistry, StyleSheet, View } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
export default class HolisticatorAPP extends Component {
  state = {
    ready: false,
    ledIsOn: false,
    isSunny: false,
    doorIsOpen: true,
    thereIsMovement: false,
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ ready: true });
  }

  _toogleLed() {
    this.setState({ ledIsOn: !this.state.ledIsOn });
    Alert.alert(this.state.ledIsOn);
  }

  render() {
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
          <Button onPress={this._toogleLed}>
            <LedIcon on={this.state.ledIsOn}/>
          </Button>
          <SunnyIcon on={this.state.isSunny}/>
          <MotionIcon on={this.state.thereIsMovement}/>
          <DoorIcon open={this.state.doorIsOpen}/>
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

export class LedIcon extends Component {
    render() {
      const iconName = (this.props.on) ? "ios-bulb" : "ios-bulb-outline";
      return <Icon name={iconName}/>;
    }
}

export class SunnyIcon extends Component {
    render() {
      const iconName = (this.props.on) ? "ios-sunny" : "ios-sunny-outline";
      return <Icon name={iconName}/>;
    }
}

export class MotionIcon extends Component {
    render() {
      const iconName = (this.props.on) ? "ios-walk" : "ios-remove-circle";
      return <Icon name={iconName}/>;
    }
}

export class DoorIcon extends Component {
  render() {
    const icon = (this.props.open)
      ? (<Icon name="ios-alert">
          <Text>the door is open</Text>
        </Icon>)
      : null;
    return icon;
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
