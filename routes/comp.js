// The Competition page that users enter answers on

// Get our Contest object
const contest = require("../js/contest");
const util = require("../js/util");
const users = require("../js/users");

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
  } else if (!isEmptyCookie && req.cookies["trivial"].username.length > 0) {
    console.log(`USER SIGNIN - inserting from cookie on comp page: ${JSON.stringify(req.cookies)}`);
    user = {
      username: req.cookies["trivial"].username,
      teamname: req.cookies["trivial"].teamname,
    };
  }

  // make sure this cookie has a valid player/team entry - if not, re-add them
  if (user.username !== "") add = users.checkUserTeam(user);

  // Test if the game is complete or not!
  if (contest.isGameComplete() === true) {
    console.log(`The game is finished, go to the lobby to see the winner!`);
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

    //Is the game active or paused?
    const gameState = contest.hasGameStarted();

    // Remove the parameters from the url so we can safely refresh
    res.redirect(`${req.path}\comp`);
  } else if (pushSignIn === false) {

    const username = req.cookies["trivial"].username;
    const questionid = contest.getCurrentQuestionID();
    const uniqueID = username + questionid;

    const selected = contest.getSubmission(uniqueID);

    // Return the current question to the user
    const curQuestion = contest.getQuestion(contest.getCurrentQuestionID());

    res.render("comp", { curQuestion: curQuestion, selected: selected, username, gameState: contest.hasGameStarted() });
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
