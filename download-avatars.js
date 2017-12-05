var request = require('request');
var token = require('./secret');


function getRepoContributors(repoOwner, repoName, cb) {
   var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authentication': token.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  if(err) {
    console.log("Errors:", err);
  }
  var contributors = JSON.parse(result);
  // console.log(contributors);
  for (var i = 0; i < contributors.length; i++) {
    console.log(contributors[i].avatar_url);
  }
  // console.log("Result:", result);
});