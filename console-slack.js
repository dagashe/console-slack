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


};

console.slack = function(message, channel){
    exports.checkSettings();
    channel = channel || exports.channel;
    if (webhook == 'test'){
        console.log(exports.username + " says " + message + " to " + channel);
    }
    console.log("Slack: " + message);

};

module.exports = exports;