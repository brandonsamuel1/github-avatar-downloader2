var request = require('request');
var token = require('./secret');
var fs = require('fs');
var repoOwner = process.argv[2];
var repoName = process.argv[3];

function getRepoContributors(repoOwner, repoName, cb) {
  // Check to see if user inputs are present in command line

  if(!repoOwner || !repoName) {
    return cb('Please enter repoOwner and repoName');
  }
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
// Downloading avatars for each user

function downloadImageByURL(url, filePath) {
  request.get(url)
  .pipe(fs.createWriteStream(filePath))
  console.log(url)
}
// Function to loop though each user and grab their avatars

getRepoContributors(repoOwner, repoName, function(err, result) {
  if(err) {
    console.log("Errors:", err);
    return;
  }
  var contributors = JSON.parse(result);

  for (var i = 0; i < contributors.length; i++) {
    downloadImageByURL(contributors[i].avatar_url, `./downloads/${contributors[i].login}.jpg`);
  }
});