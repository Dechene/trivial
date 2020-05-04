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
  //const arr = responses.filter(unique => unique.questionid == questionid);

  // contest  - list of all questions and options
  // users - list of all users and points
  // responses - list of all submitted responses

  console.log("Here are the answers in the system");

  const correct = contest.getResponses();

  //console.log(correct);

  correct.forEach(el => {
    const arr = contest.getCorrectAnswer(el.questionid);
    console.log(`arr is ${arr}`);

    // console.log(
    //   `Submitted answer: ${el.answerid} for question ${
    //     el.questionid
    //   } and actual answer ${JSON.stringify(contest.getCorrectAnswer(el.questionid).answer)}`
    // );

    //console.log(correct);
    //test if this answer is correct
    //const correctanswer = contest.filter(q => q.questionID === el.questionid).answerid;

    // was correct
    // if (correctanswer == el.answerid) users.filter(u => u.username === el.username).score++;
  });
}

module.exports = router;
