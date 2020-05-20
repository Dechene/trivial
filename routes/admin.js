const contest = require("../js/contest");
const users = require("../js/users");
const util = require("../js/util");

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // Test the attributes which have been passed in to us
  const isEmptyCookie = util.isEmpty(req.cookies);

  let user = { username: `` }

  if (!isEmptyCookie) {
    user.username = req.cookies["trivial"].username;
  }
  const isAdmin = util.isAdmin(user);

  if (isAdmin) {

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
    } else if (action === "load") {
      contest.loadContest();
    }

    const gameState = contest.hasGameStarted();

    // get the current question
    const question = contest.getCurrentQuestion();
    console.log(contest.getCurrentQuestion());

    // count up how many answers we have so far for this question
    const count = contest.getAnswers(question.questionID).length;
    // console.log({ question, count, gameState });
    // Display as normal, or remove the parameters from the url so we can safely refresh
    if (action === "") {
      res.render("admin", { question, count, gameState, teamlist: users.getTeamsv2()  });
    } else {
      res.redirect(`${req.path}\admin`);
    }
  } else {
    console.log(`USER SIGNIN - No cookie, and no params received`);
    user = {
      username: `You aren't the admin user!`,
      teamname: `Make sure cookies are enabled and try signing in again!`,
    };
    res.render("lobby", { user, teamlist: users.getTeamsv2() });
  }
});

// manually called by the admin
function checkAnswers() {
  users.clearScores();
  const correct = contest.getResponses();

  console.log(`responses: ${JSON.stringify(correct)}`);

  correct.forEach(el => {
    // get the correct answer for this question
    console.log(`questionid passing in: ${el.questionid}`);
    const correct = contest.getCorrectAnswer(el.questionid);

    if (el.answerid === correct) {
      users.setUserScore(contest.getPoints(el.questionid), el.username, users.getTeam(el.username));
    }
  });
}

module.exports = router;
