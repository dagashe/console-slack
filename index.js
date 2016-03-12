var https = require('https');
var url = require('url');

var exports = {
  channel: '#general',
  username: "console.slack.bot",
  emoji: ":nerd_face:",
  webhook: false
};

exports.checkSettings = function (channel, onSuccess) {
  // check to make sure the setting are correct

  // If the webhook is not set, we can't post to slack.
  if (!exports.webhook) {
    throw new Error("Webhook URL not provided.  Add it with `slack.webhook = <url>`");
  }

  // make sure the channel begins with a #
  if (!/^#.*/.test(channel)) {
    throw new SyntaxError("Channels must start with a #.  Yours was " + channel + ".  Try '#" + channel + "'.");
  }

  // make sure that the onSuccess function is actually a function
  if (onSuccess && typeof onSuccess !== 'function') {
    throw new TypeError('onSuccess must be a function');
  }

};

console.slack = function (message, channel, onSuccess) {
  if (exports.options) { // this is unfortunate, but we only have to do it once...
    exports.channel = exports.options.channel || exports.channel;
    exports.username = exports.options.username || exports.username;
    exports.emoji = exports.options.emoji || exports.emoji;
    exports.webhook = exports.options.webhook || exports.webhook;
  }

  channel = channel || exports.channel;

  exports.checkSettings(channel, onSuccess);

  onSuccess = onSuccess || function(){}; // make sure we don't get any undefined errors.

  if (exports.webhook == 'test') {
    onSuccess('This is simply a test', 200);
    return console.log(exports.username + " says " + message + " to " + channel);
  }

  var requestUrl = url.parse(exports.webhook);

  var request = https.request({
    protocol : requestUrl.protocol,
    hostname : requestUrl.hostname,
    path     : requestUrl.path,
    method   : 'POST',
    headers  : {
      'Content-Type' : 'application/json'
    }
  }, function(res){
    var data = [];
    res.on('data', function(chunk){
      data.push(chunk);
    });
    res.on('end', function(){
      onSuccess(data, res.statusCode);
    });
  });

  request.on('error', function(e){
    onSuccess(e.message, e.statusCode);
  });

  request.write(JSON.stringify({
    text: message,
    username: exports.username,
    icon_emoji: exports.emoji,
    channel: channel
  }));

  request.end();


};

module.exports = exports;