# nwitch-base64

[![Dependency Status](https://gemnasium.com/nwitch/nwitch-base64.png)](https://gemnasium.com/nwitch/nwitch-base64)

nwitch plugin for base64 encoding and decoding.

## Installation

``` bash
$ npm install --save nwitch-base64
```

## Usage

``` toml
[plugins]
nwitch-base64 = true
```

``` irc
05:34 <KenanY> !base64 encode Hello World
05:34 <nwitch> KenanY: SGVsbG8gV29ybGQ=
05:35 <KenanY> !base64 decode SGVsbG8gV29ybGQ=
05:35 <nwitch> KenanY: Hello World
```