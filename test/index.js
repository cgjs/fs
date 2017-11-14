const MODULE = require('../index');

function checkReadFileSync() {
  const bufferData = MODULE.readFileSync('index.js');
  if (!(bufferData instanceof Buffer)) {
    throw new Error('readFileSync should return a Buffer if no encoding was specified');
  }

  const utf8Data = MODULE.readFileSync('index.js', 'utf-8');
  if (!(typeof utf8Data === 'string')) {
    throw new Error('readFileSync should return a string when encoding is utf-8');
  }

  if (utf8Data.startsWith('const MODULE = ')) {
    throw new Error('readFileSync returned a string but with the wrong value');
  }
}

if (!Object.keys(MODULE).length) {
  throw new Error('MODULE was not exported');
}

checkReadFileSync();
