var exports = {
    channel : '#general',
    username : "console.slack.bot",
    emoji : ":nerd_face:",
    webhook : false
};

exports.checkSettings = function(){
    // check to make sure the setting are correct

    // If the webhook is not set, we can't post to slack.
    if (!webhook){
        throw new Error("Webhook URL not provided.  Add it with `slack.webhook = <url>`");
    }
    // this is pretty much the only required setting.

};

console.slack = function(message, channel){
    if (exports.options){ // this is unfortunate, but we only have to do it once...
        exports.channel  = exports.options.channel  || exports.channel;
        exports.username = exports.options.username || exports.username;
        exports.emoji    = exports.options.emoji    || exports.emoji;
        exports.webhook  = exports.options.webhook  || exports.webhook;
    }
    exports.checkSettings();
    channel = channel || exports.channel;
    if (webhook == 'test'){
        console.log(exports.username + " says " + message + " to " + channel);
    }
    console.log("Slack: " + message);

};

module.exports = exports;