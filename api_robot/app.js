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
    led: { driver: 'led', pin: 13 },
    motionSensor: { driver: 'analog-sensor', pin: 0 },
    reedSwitch: { driver: 'analog-sensor', pin: 1 }
  },

  work: () => {},
  commands: {
    led_toggle: function () {
      return this.led.toggle();
    },
    led_is_on: function () {
      return this.led.isOn();
    },
    motion_sensor: function () {
      return this.motionSensor.analogRead();
    },
    reed_sensor: function () {
      return this.reedSwitch.analogRead();
    }
  }
}).start();

module.exports = Cylon;
