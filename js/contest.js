//https://opentdb.com/api.php?amount=50&category=11&type=multiple
const csv = require("csv-parser");
const fs = require("fs");

this.current = 0;
this.gameStarted = false;

this.responses = responses = [];

/* this.responses = responses = [
  { uniqueID: "Nickname0", username: "Nickname", questionid: 0, answerid: 4 },
  { uniqueID: "Nickname1", username: "Nickname", questionid: 1, answerid: 1 },
  { uniqueID: "Nickname2", username: "Nickname", questionid: 2, answerid: 3 },
]; */

/*   {
  uniquedid: "mario2"   
    username: "mario",
    questionid: 2,
    answerid: 1, 
  },
]; */

this.questions = [
  {
    questionID: 0,
    compName: "Trivial - Test Comp",
    titleQuestion: "What is 1 + 1?",
    answers: ["1", "2", "3", "4"],
    answer: 4,
    questionImage: "",
    points: 1,
  },
];

this.questionCount = this.questions.length;

function getQuestion(id) {
  this.current = id;

  if (this.current > this.questionCount) {
    this.current = 0; // loop to the first question
  }

  console.log(`On questionid ${this.current} out of ${this.questionCount}`);
  return this.questions[this.current];
}

function loadContest() {
  // load the file from the server

  fs.createReadStream("./contest/contest1.csv")
    .pipe(csv())
    .on("data", row => {
      // console.log(row);

      const q = {
        questionID: this.questions.length,
        compName: "Trivial - Test Comp",
        titleQuestion: row.titleQuestion,
        answers: [row.ans1, row.ans2, row.ans3, row.ans4],
        answer: row.answerid,
        questionImage: row.image,
        points: 1,
      };

      this.questions.push(q);
    })
    .on("end", () => {
      this.current = 0;
      this.questionCount = this.questions.length;
      console.log(
        `CSV file successfully processed. On questionid ${this.current} out of ${this.questionCount}`
      );
    });

  this.current = 0;
  this.questionCount = this.questions.length;

  // save it into the contest format
}

function getResponses() {
  return responses;
}

function hasGameStarted() {
  //this.gameStarted = true;
  return this.gameStarted;
}

function startGame() {
  this.gameStarted = true;
  return this.gameStarted;
}

function endGame() {
  this.gameStarted = false;
  return this.gameStarted;
}

//Return the answer someone has given
function getSubmission(unique) {
  const arr = responses.find(el => el.uniqueID === unique);
  if (arr !== undefined) return arr.answerid;
}

function getCurrentQuestion() {
  return this.questions[this.current];
}

function getCurrentQuestionID() {
  return this.current;
}

function moveNext() {
  if (this.current < this.questions.length - 1) {
    this.current++;
  }
  return this.current;
}

function movePre() {
  if (this.current > 0) {
    this.current--;
  }
  return this.current;
}

function getAnswers(questionid) {
  const arr = responses.filter(unique => unique.questionid == questionid);
  //console.log(JSON.stringify(responses));
  return arr;
}

function submitAnswer(response) {
  //delete any previous submission for  this person & question
  responses = responses.filter(unique => unique.uniqueID !== response.uniqueID);

  // add this response to the array
  responses.push(response);

  console.log(
    `User: ${response.username} has guessed ${response.answerid} for question ${response.questionid}!`
  );
}

// console.log(`${el.questionID === questionid}`);
function getCorrectAnswer(questionid) {
  const arr = this.questions.filter(el => el.questionID === questionid);
  console.log(`printout the question: ${JSON.stringify(arr)}`);
  return parseInt(arr[0].answer);
}

function getPoints(questionid) {
  return this.questions[questionid].points;
}

module.exports = {
  current: this.current,
  gameStarted: this.gameStarted,
  questions: this.questions,
  responses: this.responses,
  getResponses: getResponses,
  getCorrectAnswer: getCorrectAnswer,
  getCurrentQuestionID: getCurrentQuestionID,
  getQuestion: getQuestion,
  getCurrentQuestion: getCurrentQuestion,
  moveNext: moveNext,
  movePre: movePre,
  submitAnswer: submitAnswer,
  getAnswers: getAnswers,
  getSubmission: getSubmission,
  hasGameStarted: hasGameStarted,
  startGame: startGame,
  endGame: endGame,
  getPoints: getPoints,
  loadContest: loadContest,
};

// module.exports = Contest;
