# console.slack()

## Overview

A friend mentioned something about this, and I thought it'd be a cool idea.
I've written a few slack-bots in bash to do various things, like watch a folder and post the contents of new files
(great for a headless server), or let me know when a deploy was complete.
However, I now spend a lot of time in node.js, so a bot to do this without setting it up in bash would be super handy.

It's a pretty basic module.  Not a great deal of functionality, but it should be customisable (with options) enough to
do almost anything you require.  If not, it's on


## Setup

```
    var slack = require('console-slack');
    slack.options = options; // see below, or, set per-option.

```


## Usage

There's not a lot to this one.  This is it.

```

console.slack(message[, channel]);

```


## Options

```
slack.options = {
    webhook : "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX", // or 'test' to log to the console.
    username: "console.slack.bot", // the username you want to log with,
    emoji : ":nerd_face:", // set an emoji to be the bots profile picture,
    channel : "#general", // set to true to post to the webhooks default, or set to the channel you want to post to.  Can be set per-post, as well.
}