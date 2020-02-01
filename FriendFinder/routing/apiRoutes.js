// var server = require('./server.js');
var friends = require('../data/friends.js');
var path = require('path');


module.exports = function(app) {
app.get("/api/friends", function(req, res) {
    return res.json(friends);
});

// Handle incoming results and compatibility logic

    app.post("/api/friends", function(req, res){
    var userInput = req.body;
    console.log(userInput);

    var usersScores = userInput.scores;
    var totalDifference = 10000;
    var count = 0;
    var currentName = '';
    var currentPhoto = '';
    for(var i = 0; i < friends.length; i++) {
        // console.log(friendList[i]);
        for(var k = 0; k < usersScores.length; k++) {
            // console.log(friends[i].scores[i]);
            count += Math.abs(friends[i].scores[k] - usersScores[k]);
        }
        if(count < totalDifference) {
            totalDifference = count;
            currentName = friends[i].name;
            currentPhoto = friends[i].photo;
        }
    }

    friends.push(userInput);
    res.json({currentName: currentName, currentPhoto: currentPhoto});
});
}