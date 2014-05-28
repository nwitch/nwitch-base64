var nwitchBase64 = require('../');
var test = require('tape');
var isFunction = require('lodash.isfunction');
var Stream = require('readable-stream').PassThrough;
var irc = require('slate-irc');

test('exports a function which returns a function when called', function(t) {
  t.plan(2);
  t.ok(isFunction(nwitchBase64));
  t.ok(isFunction(nwitchBase64()));
});

test('encodes when commanded', function(t) {
  t.plan(2);
  var stream = new Stream();
  var client = irc(stream);
  client.use(nwitchBase64());

  var n = 0;
  stream.on('data', function(chunk) {
    switch (n++) {
      case 0:
        t.equal(chunk, 'PRIVMSG #nwitch :!base64 encode Hello World\r\n');
        break;
      case 1:
        t.equal(chunk, 'PRIVMSG #nwitch :: SGVsbG8gV29ybGQ=\r\n');
        break;
    }
  });

  stream.write('PRIVMSG #nwitch :!base64 encode Hello World\r\n');
});

test('decodes when commanded', function(t) {
  t.plan(2);
  var stream = new Stream();
  var client = irc(stream);
  client.use(nwitchBase64());

  var n = 0;
  stream.on('data', function(chunk) {
    switch (n++) {
      case 0:
        t.equal(chunk, 'PRIVMSG #nwitch :!base64 decode SGVsbG8gV29ybGQ=\r\n');
        break;
      case 1:
        t.equal(chunk, 'PRIVMSG #nwitch :: Hello World\r\n');
        break;
    }
  });

  stream.write('PRIVMSG #nwitch :!base64 decode SGVsbG8gV29ybGQ=\r\n');
});

test('is confused when not told what to do', function(t) {
  t.plan(2);
  var stream = new Stream();
  var client = irc(stream);
  client.use(nwitchBase64());

  var n = 0;
  stream.on('data', function(chunk) {
    switch (n++) {
      case 0:
        t.equal(chunk, 'PRIVMSG #nwitch :!base64 SGVsbG8gV29ybGQ=\r\n');
        break;
      case 1:
        t.equal(chunk, 'PRIVMSG #nwitch :: Huh? Try `!base64 encode|decode <query>`\r\n');
        break;
    }
  });

  stream.write('PRIVMSG #nwitch :!base64 SGVsbG8gV29ybGQ=\r\n');
});