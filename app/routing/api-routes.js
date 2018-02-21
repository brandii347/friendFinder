var friends = require("../data/friends.js");

module.exports = function (app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res){

        //object that has name and photo
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        console.log(req.body);

        //result of the users survey POST and parse it
        var userData = req.body;
        var userName = userData.name;
        var userPhoto = userData.photo;
        var userScores = userData.scores;

        console.log(userScores);

        var totalDifference = 0;

//for loop to loop through all friends possibilities in database
        for (var i=0; i < friends.length; i++){
            console.log(friends[i]);
            totalDifference = 0;

            //loop through all scores of each friend
            for(var j = 0; j = friends[i].scores[j]; j++){

                //calculate the difference b/t the scores and add them into totalDifference
                //Math.abs returns absoulute value of given number
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                //if sum of difference is less then the differences of the current "best match"
                if (totalDifference <= bestMatch.friendDifference){

                    //resets the bestMatch to be the new friend
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;

                }
            }
        }
        //save users data to database (has to happen after the check or
    // the database will return that the user is the user's best friend)
    friends.push(userData);

    //return JSON w/ the user's bestMatch. This will be used by the HTML in the next page
    res.JSON(bestMatch);
    })
}