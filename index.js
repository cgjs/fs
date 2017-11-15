const Gio = imports.gi.Gio;

const Buffer = require('buffer').Buffer;

function _getEncodingFromOptions(options, defaultEncoding = 'utf8') {
  if (typeof options === null) {
    return defaultEncoding;
  }

  if (typeof options === 'string') {
    return options;
  }

  if (typeof options === 'object' && typeof options.encoding === 'string') {
    return options.encoding;
  }

  return defaultEncoding;
}

function existsSync(path) {
  const file = Gio.File.new_for_path(path);
  console.log(file.query_exists(null));
}

function readdirSync(path, options = 'utf8') {
  const encoding = _getEncodingFromOptions(options);
  const dir = Gio.File.new_for_path(path);
  const list = [];

  const enumerator = dir.enumerate_children('standard::*', 0, null);
  while ((info = enumerator.next_file(null))) {
    let child = enumerator.get_child(info);
    const fileName = child.get_basename();

    if (encoding === 'buffer') {
      const encodedName = Buffer.from(fileName);
      list.push(encodedName);
    } else {
      const encodedName = Buffer.from(fileName).toString(encoding);
      list.push(encodedName);
    }
  }

  return list;
}

function readFileSync(path, options = {encoding: null, flag: 'r'}) {
  const file = Gio.File.new_for_path(path);

  const [ok, data, etag] = file.load_contents(null);

  if (!ok) {
    // TODO: throw a better error
    throw new Error('failed to read file');
  }

  const encoding = _getEncodingFromOptions(options, 'buffer');
  if (encoding === 'buffer') {
    return Buffer.from(data);
  } else {
    return data.toString(encoding);
  }
}

module.exports = {
  existsSync,
  readdirSync,
  readFileSync
};
