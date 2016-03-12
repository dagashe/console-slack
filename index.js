var exports = {
    channel : '#general',
    username : "console.slack.bot",
    emoji : ":nerd_face:",
    webhook : false
};

exports.checkSettings = function(channel, onSuccess){
    // check to make sure the setting are correct

    // If the webhook is not set, we can't post to slack.
    if (!exports.webhook){
        throw new Error("Webhook URL not provided.  Add it with `slack.webhook = <url>`");
    }

    // make sure that the onSuccess function is actually a function
    if (onSuccess && typeof onSuccess !== 'function'){
        throw new TypeError('onSuccess must be a function');
    }

    // make sure the channel begins with a #
    if (!/^#.*/.test(channel)){
        throw new SyntaxError("Channels must start with a #.  Yours was " + channel + ".");
    }

};

console.slack = function(message, channel, onSuccess){
    if (exports.options){ // this is unfortunate, but we only have to do it once...
        exports.channel  = exports.options.channel  || exports.channel;
        exports.username = exports.options.username || exports.username;
        exports.emoji    = exports.options.emoji    || exports.emoji;
        exports.webhook  = exports.options.webhook  || exports.webhook;
    }

    channel = channel || exports.channel;

    exports.checkSettings(channel, onSuccess);

    if (exports.webhook == 'test'){
        return console.log(exports.username + " says " + message + " to " + channel);
    }

    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if (request.readyState == 4){ // the request is complete
            onSuccess(request.response, request.status);
        }
    };

    request.open('POST', exports.webhook, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send({
        text : message,
        username : exports.username,
        icon_emoji : exports.emoji,
        channel : channel
    });


};

module.exports = exports;