import React, { Component } from 'react';
import { Content, Icon, Text, List, ListItem, Left, Right, Body, Switch } from 'native-base';

export default class ChickenRunContent extends Component {
  render() {
    const iconNames = {
      led: (this.props.ledIsOn) ? "ios-bulb" : "ios-bulb-outline",
      luminosity: (this.props.luminosity > 100) ? "ios-sunny" : "ios-sunny-outline",
      motion: (this.props.thereIsMovement) ? "ios-walk" : "ios-remove-circle"
    };
    const motionCheckmarkIcon = (this.props.thereIsMovement)
      ? <Right> <Icon name="ios-checkmark" /> </Right>
      : <Right />;
    const doorIcon = (this.props.doorIsOpen)
      ? <Left> <Icon name="ios-alert" /> </Left>
      : <Left />;
    const doorStatus = (this.props.doorIsOpen) ? 'open' : 'closed';
    return (
      <Content>
      <List>
          <ListItem icon>
            <Left>
              <Icon name={iconNames.led} />
            </Left>
            <Body>
              <Text>Light</Text>
            </Body>
            <Right>
              <Switch value={!!this.props.ledIsOn} onValueChange={this.props.toggleLed} />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Icon name={iconNames.luminosity} />
            </Left>
            <Body>
              <Text>Luminosity</Text>
            </Body>
            <Right>
              <Text>{this.props.luminosity}</Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Icon name={iconNames.motion} />
            </Left>
            <Body>
              <Text>Motion Detection</Text>
            </Body>
            {motionCheckmarkIcon}
          </ListItem>
          <ListItem icon>
            {doorIcon}
            <Body>
              <Text>Door Status</Text>
            </Body>
            <Right>
              <Text>{doorStatus}</Text>
            </Right>
          </ListItem>
        </List>
      </Content>
    );
  }
}
