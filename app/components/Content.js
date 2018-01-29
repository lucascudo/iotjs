import React, { Component } from 'react';
import { Content, Icon, Text, List, ListItem, Left, Right, Body, Switch } from 'native-base';

export default class ChickenRunContent extends Component {
  render() {
    const iconNames = {
      led: (this.props.ledIsOn) ? "ios-bulb" : "ios-bulb-outline",
      luminosity: (this.props.luminosity > 100) ? "ios-sunny" : "ios-sunny-outline"
    };
    const motion = {
      iconName: (this.props.thereIsMovement) ? "ios-walk" : "ios-remove",
      checkmarkIcon: (this.props.thereIsMovement) ? "ios-checkmark" : "ios-close",
      checkmarkIconColor: (this.props.thereIsMovement) ? "green" : "red"
    };
    const door = {
      icon: (this.props.doorIsOpen) ? <Icon name="ios-alert" /> : <Icon />,
      statusText: (this.props.doorIsOpen) ? "open" : "closed",
      statusColor: (this.props.doorIsOpen) ? "red" : "green"
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
              <Icon name={motion.iconName} />
            </Left>
            <Body>
              <Text>Motion Detection</Text>
            </Body>
            <Right>
              <Icon name={motion.checkmarkIcon} style={{color: motion.checkmarkIconColor}} />
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
              <Text style={{color: door.statusColor }}>{door.statusText}</Text>
            </Right>
          </ListItem>
        </List>
      </Content>
    );
  }
}
