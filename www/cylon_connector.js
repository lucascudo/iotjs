var refreshInterval = refreshInterval || 1000;
const CylonConnector = { 
  runCommand: (command, cb) => {
    $.get('https://' + window.location.hostname + '/api/robots/Robot%201/commands/' + command)
    .done(cb)
    .catch((err) => console.log('API Error: ' + err.status + ' - ' + err.statusText));
  },
  updateStatus: (condition, showOnTrue, showOnFalse) => {
     $((condition) ? showOnTrue : showOnFalse).show();
     $((condition) ? showOnFalse : showOnTrue).hide();
  },
  updateLightStatus: () {
    runCommand('led_is_on', (data) => CylonConnector.updateStatus(data.result, '#btn-on', '#btn-off'));
  },
  updateMotionSensorStatus: () {
    runCommand('motion_sensor', (data) => CylonConnector.updateStatus(data.result, '#motion-on', '#motion-off'));
  },
  updateDoorStatus: () {
    runCommand('reed_sensor', (data) => CylonConnector.updateStatus(data.result, '#door-open', '#door-closed'));
  },
  toggleLed: () {
    runCommand('led_toggle', CylonConnector.updateLightStatus);
  },
};
