# nwitch-base64

[![Build Status](https://travis-ci.org/nwitch/nwitch-base64.svg)](https://travis-ci.org/nwitch/nwitch-base64)
[![Dependency Status](https://gemnasium.com/nwitch/nwitch-base64.svg)](https://gemnasium.com/nwitch/nwitch-base64)

[nwitch][] (and [slate-irc][]) plugin for base64 encoding and decoding.

``` irc
05:34 <KenanY> !base64 encode Hello World
05:34 <nwitch> KenanY: SGVsbG8gV29ybGQ=
05:35 <KenanY> !base64 decode SGVsbG8gV29ybGQ=
05:35 <nwitch> KenanY: Hello World
```
## Example

As a [nwitch][] plugin (using `config.toml`):

``` toml
[plugins]
nwitch-base64 = true
```

Or through [nwitch][]'s API:

``` javascript
var Nwitch = require('nwitch');
var nwitchBase64 = require('nwitch-base64');

var nwitch = new Nwitch({
  irc: {
    address: 'irc.freenode.org',
    port: 6667
  }
});

nwitch.use(nwitchBase64());
```

Technically, all [nwitch][] plugins are just [slate-irc][] plugins, so you could
also use this as a [slate-irc][] plugin:

``` javascript
var net = require('net');
var irc = require('slate-irc');
var nwitchBase64 = require('nwitch-base64');

var stream = net.connect({
  port: 6667,
  host: 'irc.freenode.org'
});

var client = irc(stream);
client.use(nwitchBase64());
```

## Installation

``` bash
$ npm install nwitch-base64
```

## API

``` javascript
var nwitchBase64 = require('nwitch-base64');
```

### `nwitchBase64()`

Returns a function that accepts an instance of [slate-irc][].


  [nwitch]: https://github.com/KenanY/nwitch
  [slate-irc]: https://github.com/slate/slate-irc