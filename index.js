var behest = require('behest');

function plugin() {
  return function(irc) {
    irc.on('message', function(evt) {
      var from = evt.from;
      var to = evt.to;
      var message = evt.message;

      if (!behest.isValid(message)) {
        return;
      }

      var command = behest(message);

      if (command.command === 'base64') {
        var destination = to.charAt(0) === '#' ? to : from;
        var str = command.params.slice(1).join(' ');

        var b;
        switch (command.params[0]) {
          case 'encode':
            b = new Buffer(str).toString('base64');
            break;
          case 'decode':
            b = new Buffer(str, 'base64').toString('utf8');
            break;
          default:
            irc.send(destination, from + ': Huh? Try `!base64 encode|decode <query>`');
        }

        if (b) {
          irc.send(destination, from + ': ' + b);
        }
      }
    });
  };
}

module.exports = plugin;