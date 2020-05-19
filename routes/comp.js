// The Competition page that users enter answers on

// Get our Contest object
const contest = require("../contest");
const util = require("../util");
const users = require("../users");

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {

  const isEmptyCookie = util.isEmpty(req.cookies);
  const isEmptyParams = JSON.stringify(req.query) === "{}" ? true : false;

  let pushSignIn = false;

  let user = {
    username: `Unknown`,
    teamname: `Unknown`,
  };

  if (isEmptyCookie && isEmptyParams) {
    console.log(`USER SIGNIN - No cookie, and no params received`);
    pushSignIn = true;
  }

  // Test if the game is inplay!
  // If yes, display the current question
  // If no, redirect to the lobby
  if (contest.hasGameStarted() === true) {
    console.log(`The game has begun so bounce to the question page`);
    console.log(`The current questionid from comp page is ${contest.getCurrentQuestionID()}`);
  } else {
    console.log(`The game is paused, go to the lobby!`);
    res.redirect(`${req.path}\lobby`);
  }

  // If they have submitted a question response, grab it and display selected
  if (req.query.questionid !== undefined && req.query.answerid !== undefined) {
    const username = req.cookies["trivial"].username;
    const questionid = parseInt(req.query.questionid, 10);
    const answerid = parseInt(req.query.answerid);
    const uniqueID = username + questionid;

    const response = {
      uniqueID,
      username,
      questionid,
      answerid,
    };

    //Submit response to controller
    contest.submitAnswer(response);

    // Display the question
    const curQuestion = contest.getQuestion(contest.getCurrentQuestionID());

    // Remove the parameters from the url so we can safely refresh
    res.redirect(`${req.path}\comp`);
  } else if (pushSignIn === false) {

      const username = req.cookies["trivial"].username;
      const questionid = contest.getCurrentQuestionID();
      const uniqueID = username + questionid;

      const selected = contest.getSubmission(uniqueID);
    
    // Return the current question to the user
    const curQuestion = contest.getQuestion(contest.getCurrentQuestionID());

    res.render("comp", { curQuestion: curQuestion, selected: selected, username });
  } else if (pushSignIn === true) {
    console.log(`USER SIGNIN - No cookie, and no params received`);
    user = {
      username: `I don't know who you are!`,
      teamname: `Make sure cookies are enabled and try signing in again!`,
    };
    res.render("lobby", { user, teamlist: users.getTeamsv2() });
  }

});

module.exports = router;
