function plugin() {
  return function(irc) {
    irc.on('message', function(evt) {
      var from = evt.from;
      var to = evt.to;
      var message = evt.message;

      if (message.charAt(0) === '!') {
        var params = message.split(' ');
        var command = params[0].replace('!', '');
        if (command === 'base64') {
          var str = message.substring(15);

          if (!str.length) {
            return;
          }

          var destination = to.charAt(0) === '#' ? to : from;
          var direction = params[1];

          var b;
          switch (direction) {
            case 'encode':
              b = new Buffer(str).toString('base64');
              break;
            case 'decode':
              b = new Buffer(str, 'base64').toString('utf8');
              break;
            default:
              irc.send(destination, 'Huh? Try !base64 encode|decode <query>');
          }

          if (b) {
            irc.send(destination, from + ': ' + b);
          }
        }
      }
    });
  };
}

module.exports = plugin;