import React, { Component } from 'react';
import { Content, Icon, Text, List, ListItem, Left, Right, Body, Switch } from 'native-base';

export default class ChickenRunContent extends Component {
  render() {
    const iconNames = {
      led: (this.props.ledIsOn) ? "ios-bulb" : "ios-bulb-outline",
      luminosity: (this.props.luminosity > 100) ? "ios-sunny" : "ios-sunny-outline",
      motion: (this.props.thereIsMovement) ? "ios-walk" : "ios-remove-circle",
      motionCheckmark: (this.props.thereIsMovement) ? "ios-checkmark" : "ios-close"
    };
    const door = {
      icon: (this.props.doorIsOpen) ? <Icon name="ios-alert" /> : null,
      status: (this.props.doorIsOpen) ? "Open" : "Closed"
    };
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
            <Right>
              <Icon name={iconNames.motionCheckmark} />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              {door.icon}
            </Left>
            <Body>
              <Text>Door Status</Text>
            </Body>
            <Right>
              <Text>{door.status}</Text>
            </Right>
          </ListItem>
        </List>
      </Content>
    );
  }
}
