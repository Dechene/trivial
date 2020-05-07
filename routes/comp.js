// The Competition page that users enter answers on

// Get our Contest object
const contest = require("../contest");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
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
  } else {
    const username = req.cookies["trivial"].username;
    const questionid = contest.getCurrentQuestionID();
    const uniqueID = username + questionid;

    const selected = contest.getSubmission(uniqueID);

    // Return the current question to the user
    const curQuestion = contest.getQuestion(contest.getCurrentQuestionID());

    res.render("comp", { curQuestion: curQuestion, selected: selected });
  }
});

module.exports = router;
