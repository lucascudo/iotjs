import React, { Component } from 'react';
import { Header, Button, Left, Right, Body, Icon, Title } from 'native-base';

export default class ChickenRunHeader extends Component {
  render() {
    return (
      <Header>
        <Left>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>Chicken Run Avoidance</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}
