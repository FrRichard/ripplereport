var spawn = require('child_process').spawn;
var slang = require('slang');

exports.pdf = function(input, options, callback) {
  if (!options) {
    options = {};
  } else if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var output = options.output;
  delete options.output;

  // var wkhtmltopdf_path = process.env.PORT ? './bin/wkhtmltopdf' : 'wkhtmltopdf';
  var wkhtmltopdf_path = 'wkhtmltopdf';
  // var wkhtmltopdf_path = './bin/wkhtmltopdf';

  var args = [wkhtmltopdf_path, '--quiet'];
  for (var key in options) {
    var val = options[key];
    key = key.length === 1 ? '-' + key : '--' + slang.dasherize(key);
    if (val !== false)
      args.push(key);
    if (typeof val !== 'boolean') {
      // escape and quote the value if it is a string
      if (typeof val === 'string')
        val = '"' + val.replace(/(["\\$`])/g, '\\$1') + '"';
      args.push(val);
    }
  }

  var isUrl = /^(https?|file):\/\//.test(input);
  args.push(isUrl ? input : '-'); // stdin if HTML given directly
  args.push(output || '-'); // stdout if no output file
  if (process.platform === 'win32') {
    var child = spawn(args[0], args.slice(1));
  } else {
    // this nasty business prevents piping problems on linux
    var child = spawn('/bin/sh', ['-c', args.join(' ') + ' | cat']);
  }
  if (callback)
    child.on('exit', callback);
  if (!isUrl)
    child.stdin.end(input);
  return child.stdout;
};

exports.image = function(input, options, callback) {
  if (!options) {
    options = {};
  } else if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var output = options.output;
  delete options.output;

  var wkhtmltoimage_path = './bin/wkhtmltoimage';

  var args = [wkhtmltoimage_path, '--quiet'];
  for (var key in options) {
    var val = options[key];
    key = key.length === 1 ? '-' + key : '--' + slang.dasherize(key);
    if (val !== false)
      args.push(key);
    if (typeof val !== 'boolean') {
      // escape and quote the value if it is a string
      if (typeof val === 'string')
        val = '"' + val.replace(/(["\\$`])/g, '\\$1') + '"';
      args.push(val);
    }
  }

  var isUrl = /^(https?|file):\/\//.test(input);
  args.push(isUrl ? input : '-'); // stdin if HTML given directly
  args.push(output || '-'); // stdout if no output file
  if (process.platform === 'win32') {
    var child = spawn(args[0], args.slice(1));
  } else {
    // this nasty business prevents piping problems on linux
    var child = spawn('/bin/sh', ['-c', args.join(' ') + ' | cat']);
  }
  if (callback)
    child.on('exit', callback);
  if (!isUrl)
    child.stdin.end(input);
  return child.stdout;
};

// module.exports = wkhtmltopdf;