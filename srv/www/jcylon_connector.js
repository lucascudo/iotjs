const jCylonConnector = {
  runCommand: (command, cb) => {
    $.get('https://' + window.location.hostname + '/api/robots/Robot%201/commands/' + command)
    .done(cb)
    .catch((err) => console.error('API Error: ', err.status, ' - ', err.statusText));
  },
  updateStatus: (condition, showOnTrue, showOnFalse) => {
    $((condition) ? showOnTrue : showOnFalse).show();
    $((condition) ? showOnFalse : showOnTrue).hide();
  },
  updateLightStatus: (idOn, idOff) => {
    jCylonConnector.runCommand('led_is_on', (data) => jCylonConnector.updateStatus(data.result, idOn, idOff));
  },
  updateMotionSensorStatus: (idOn, idOff) => {
    jCylonConnector.runCommand('motion_sensor', (data) => jCylonConnector.updateStatus(data.result, idOn, idOff));
  },
  updateDoorStatus: (idOn, idOff) => {
    jCylonConnector.runCommand('reed_sensor', (data) => jCylonConnector.updateStatus(data.result, idOn, idOff));
  },
  toggleLed: (cb) => {
    jCylonConnector.runCommand('led_toggle', cb);
  },
};
