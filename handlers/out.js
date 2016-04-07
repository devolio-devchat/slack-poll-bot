var BOT_NAME = 'pollbot';
var TOKEN = 'hZ32m4RHVFbHvUK3kgbFBLhQ';
var EMOTICONS = [':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:', ':ten:'];

module.exports = function (req, res, next) {
  console.log('received poll');
  var token = req.body.token;
  if (token !== TOKEN) {
    return res.status(200).end();
  }

  var userName = req.body.user_name;
  if (userName === BOT_NAME) {
    return res.status(200).end();
  }

  var text = req.body.text;
  var pollParts = text.match(/(?:[^\s"]+|"[^"]*")+/g);
  var poll = buildPoll(pollParts);
  var botPayload = {
    text: poll,
  };
  return res.status(200).json(botPayload);
};


var buildPoll = function(parts) {
  if( !(Object.prototype.toString.call( someVar ) === '[object Array]')) {
      return false;
  }
  var poll = "";

  parts.forEach(function(part, index) {
    if (index < EMOTICONS.length && index != 0) {
      poll + EMOTICONS[index] + ": " + part +"\\n";
    } else {
      poll + part + "\\n"
    }
  });
  return poll;
}