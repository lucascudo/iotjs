const fs = require('fs');
const ini = require('ini');
const connect = require('connect');
const serveStatic = require('serve-static');
const path = require('path');
const Cylon = require("cylon");

const config = ini.parse(fs.readFileSync(__dirname + '/.env', 'utf-8'));

connect()
.use(serveStatic(path.join(__dirname, 'www')))
.use(serveStatic(path.join(__dirname, 'node_modules')))
.listen(config.WEB_PORT, () => {
    console.log('Web interface running on port ' + config.WEB_PORT);
});

Cylon.api('http', {
  host: config.HOSTNAME,
  port: config.API_PORT,
  ssl: false
});

Cylon.robot({
  connections: {
    arduino1: { adaptor: 'firmata', port: config.USB1 }
  },
  devices: {
    led: { driver: 'led', pin: 13 },
    motionSensor: { driver: 'analog-sensor', pin: 0 },
    reedSwitch: { driver: 'analog-sensor', pin: 1 }
  },
  commands: {
    led_toggle: function () {
      return this.led.toggle();
    },
    led_is_on: function () {
      return this.led.isOn();
    },
    motion_sensor: function () {
      return this.motionSensor.analogRead()
    },
    reed_sensor: function () {
      return this.reedSwitch.analogRead();
    }
  },
  work: () => {}
}).start();
