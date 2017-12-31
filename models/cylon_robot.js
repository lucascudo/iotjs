const Cylon = require("cylon");

// Initialize the robot
module.exports = Cylon.robot({
  // Change the port to the correct port for your Arduino.
  connections: {
    arduino: { adaptor: 'firmata', port: '/dev/ttyACM0' }
  },

  devices: {
    led: { driver: 'led', pin: 13 }
  },

  toogleLed: (my) => {
      my.led.toggle();
  }
});
