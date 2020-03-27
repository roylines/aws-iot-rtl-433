const {connect} = require('./lib/mqtt');
const rtl433 = require('./lib/rtl433');

const start = async args => {
  const mqtt = await connect(args);
  await rtl433.start({mqtt, ...args});
};

module.exports = {
  start,
};
