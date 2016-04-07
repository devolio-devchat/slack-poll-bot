var BOT_NAME = 'pollbot';
var TOKEN = 'hZ32m4RHVFbHvUK3kgbFBLhQ';
var EMOTICONS = [':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:', ':ten:'];

module.exports = function (req, res, next) {
  console.log('received poll');
  console.log(req.body);
  var token = req.body.token;
  if (token !== TOKEN) {
    return res.status(200).end();
  }

  var userName = req.body.user_name;
  if (userName === BOT_NAME) {
    return res.status(200).end();
  }
  console.log('starting to create poll response');
  var text = req.body.text;
  var pollParts = text.match(/(?:[^\s"]+|"[^"]*")+/g);
  console.log(pollParts);
  var poll = buildPoll(pollParts);
  if (!poll) {
    poll = "please supply a poll"
  }
  var botPayload = {
    text: poll,
  };
  console.log(botPayload);
  return res.status(200).json(botPayload);
};


var buildPoll = function(parts) {
  console.log('buildPoll start');

  if( !(Object.prototype.toString.call( parts ) === '[object Array]')) {
      return false;
  }
  var poll = "";
  console.log('buildPoll ');
  parts.forEach(function(part, index) {
    if (index < EMOTICONS.length && index != 0) {
      poll + EMOTICONS[index] + ": " + part +"\\n";
    } else {
      poll + part + "\\n"
    }
  });
  return poll;
}