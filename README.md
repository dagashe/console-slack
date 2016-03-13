# console.slack()

## Overview

A friend mentioned something about this, and I thought it'd be a cool idea.
I've written a few slack-bots in bash to do various things, like watch a folder and post the contents of new files
(great for a headless server), or let me know when a deploy was complete.
However, I now spend a lot of time in node.js, so a bot to do this without setting it up in bash would be super handy.

It's a pretty basic module.  Not a great deal of functionality, but it should be customisable (with options) enough to
do almost anything you require.  If not, it's on [github](https://github.com/deecewan/console-slack).

Please submit any issues [here](https://github.com/deecewan/console-slack/issues).


## Setup

```
    var slack = require('console-slack');
    slack.options = options; // see below, or, set per-option.
```


## Usage

There's not a lot to this one.  This is it.

```
console.slack(message[, channel[, onSuccess]]);
```

- `message` is the content to be posted to Slack.
- `channel` is the Slack channel to be posted to.  See below for defaults/options.
- `onSuccess` is a function to be called once Slack has been successfully posted to.
  - It provides two parameters, the response from Slack, and the request status.


## Options

The options shown below are the defaults (other than webhook).  Webhook is the only required option,
and can be set with `slack.webhook` if you don't want to pass in any other options.

```
slack.options = {
    webhook : "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX",
    username: "console.slack.bot", // the username you want to log with,
    emoji : ":nerd_face:", // set an emoji to be the bots profile picture,
    channel : "#general", 
}
```

There are a couple of options that have extended functionality.

- `slack.webhook` can be set to `'test'` to log to the console during development.  If it's not set at all,
calls to `console.slack` will fail.  They have nowhere to go.

- `slack.channel` can be set to `true` to send to the webhook's default channel.
The channel can be set per-message, as well.

## Example

```
var slack = require('console-slack');

slack.options = {
    webhook  : 'test', // don't want to make a post to slack
    emoji    : ':100:',
    username : 'cool-slack-bot'
}

console.slack('Hello, World!');
console.slack('Hello, Channel!', '#custom-channel');
console.slack('Hello, function!', '', function(resp, status){
    console.log('Response was: ' + resp);
    console.log('Status was: ' + status);
});
```