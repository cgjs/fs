const Gio = imports.gi.Gio;

const Buffer = require('buffer').Buffer;

function readFileSync(path, options = {encoding: null, flag: 'r'}) {
  const file = Gio.File.new_for_path(path);

  var [ok, data, etag] = file.load_contents(null);

  if (!ok) {
    // TODO: throw a better error
    throw new Error('failed to read file');
  }

  if (options === null || (typeof options === 'object' && options.encoding === null)) {
    return Buffer.from(data);
  } else if (typeof options === 'string') {
    return data.toString(options);
  } else {
    return data.toString(options.encoding);
  }
}

module.exports = {
  readFileSync
};
