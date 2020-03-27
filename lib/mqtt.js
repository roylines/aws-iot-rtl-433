const {load} = require('./keys');
const mqtt = require('async-mqtt');

const connect = async ({host, ...rest}) => {
  const keys = await load(rest);
  const options = {
    host,
    port: 8883,
    protocol: 'mqtts',
    ...keys,
  };

  console.log('connecting to aws-iot...');
  const client = await mqtt.connectAsync(options);
  console.log('connected to aws-iot');
  return client;
};

module.exports = {
  connect,
};
