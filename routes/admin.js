const contest = require("../contest");
const users = require("../users");

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // look for a passed in action item
  const action = req.query.action ? req.query.action : "";

  // Move the current question if requested
  if (action === "pre") {
    contest.movePre();
  } else if (action === "next") {
    contest.moveNext();
  } else if (action === "pause") {
    contest.endGame();
  } else if (action === "start") {
    contest.startGame();
  } else if (action === "score") {
    checkAnswers();
  }

  const gameState = contest.hasGameStarted();

  // get the current question
  const question = contest.getCurrentQuestion();

  // count up how many answers we have so far for this question
  const count = contest.getAnswers(question.questionID).length;
  // console.log({ question, count, gameState });
  // Display as normal, or remove the parameters from the url so we can safely refresh
  if (action === "") {
    res.render("admin", { question, count, gameState });
  } else {
    res.redirect(`${req.path}\admin`);
  }
});

// manually called by the admin
function checkAnswers() {
  /* each team, teamname in teamlist
     div.teamlist= teamname
     each username, score in team
     div.teammates #{username.username} - #{username.score} */

  const teamlist = users.getTeamsv2();

  teamlist.forEach(team => {
    console.log(team.teamname);

    for (let i = 0; i < team.players.length; i++) {
      console.log(`player: ${team.players[i]} has a score of ${team.scores[i]} `);
    }
  });

  console.log(JSON.stringify(`${teamlist}`));

  const correct = contest.getResponses();

  /*   correct.forEach(el => {
    // get the correct answer for this question
    const correct = contest.getCorrectAnswer(el.questionid);
    // test if they got it right
    if (el.answerid === correct) {
      //correct answer, give the man a point!
      users.setUserScore(contest.getPoints(el.questionid), el.username);
      //console.log(`${el.username} got ${el.questionid} correct`);
    }
  }); */
}

module.exports = router;
