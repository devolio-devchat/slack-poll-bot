var BOT_NAME = 'pollbot';
var TOKEN = process.argv[2];
var EMOTICONS = [':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:', ':ten:'];

module.exports = function (req, res, next) {
  console.log('received poll');

  console.log(process.argv);
  var token = req.body.token;
  if (token !== TOKEN) {
    return res.status(200).end();
  }

  var userName = req.body.user_name;
  if (userName == BOT_NAME) {
    return res.status(200).end();
  }
  var text = req.body.text;
  var pollParts = text.match(/(?:[^\s"]+|"[^"]*")+/g);
  pollParts.splice(0, 1);
  var poll = buildPoll(pollParts);
  if (typeof poll !== 'string') {
    poll = "please supply a poll"
  }
  var botPayload = {
    text: poll,
  };
  return res.status(200).json(botPayload);
};


var buildPoll = function(parts) {
  if( !(Object.prototype.toString.call( parts ) === '[object Array]')) {
      return false;
  }
  var poll = "";
  parts.forEach(function(part, index) {
    if ((index < EMOTICONS.length) && index != 0) {
      poll = poll + EMOTICONS[index-1] + ": " + part +"\n";
    } else {
      poll = poll + part + "\n"
    }
  });
  return poll;
}