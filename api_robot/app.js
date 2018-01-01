const Cylon = require("cylon");
const fs = require('fs');
const ini = require('ini');

const config = ini.parse(fs.readFileSync(__dirname + '/.env', 'utf-8'));

Cylon.api('http');
Cylon.robot({
  connections: {
    arduino1: { adaptor: 'firmata', port: config.USB1 }
  },

  devices: {
    led: { driver: 'led', pin: 13 }
  },

  work: () => {},
  commands: {
    led_toggle: function () { return this.led.toggle() },
    led_is_on: function () { return this.led.isOn() }
  }
}).start();

module.exports = Cylon;
