const fs = require('fs');
const path = require('path');

const load = async ({keysDir: dir}) => {
  console.log(`loading keys from ${dir}`);

  const get = file => fs.readFileSync(path.join(dir, file));

  return {
    key: get('client_private.key'),
    cert: get('client_cert.pem'),
    ca: get('ca.pem'),
  };
};

module.exports = {
  load,
};
