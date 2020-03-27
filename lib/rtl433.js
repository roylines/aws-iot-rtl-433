const {chunksToLinesAsync: toLines} = require('@rauschma/stringio');
const {spawn} = require('child_process');

let last;
const isReplay = line => {
  const {time, ...rest} = JSON.parse(line);
  const hash = JSON.stringify(rest) + time.substr(0, 16);
  const ret = hash == last;
  last = hash;
  return ret;
};

const process = async ({stdout, mqtt, location, device, action}) => {
  for await (const line of toLines(stdout)) {
    if (!isReplay(line)) {
      const {model, id} = JSON.parse(line);
      const topic = `${location}/${device}/${model.toLowerCase()}/${id}`;
      console.log(`publishing to '${topic}'`, line);
      await mqtt.publish(topic, line);
    }
  }
};

const start = async args => {
  console.log('starting rtl_433...');
  const options = {stdio: ['ignore', 'pipe', process.stderr]};
  const {stdout} = spawn('rtl_433', ['-F', 'json'], options);
  await process({stdout, ...args});
};

module.exports = {
  start,
};
