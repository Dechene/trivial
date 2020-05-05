this.current = 0;
this.gameStarted = false;

this.responses = responses = [
  { uniqueID: "Nickname0", username: "Nickname", questionid: 0, answerid: 4 },
  { uniqueID: "Nickname1", username: "Nickname", questionid: 1, answerid: 1 },
  { uniqueID: "Nickname2", username: "Nickname", questionid: 2, answerid: 3 },
];

/*   {
  uniquedid: "mario2"   
    username: "mario",
    questionid: 2,
    answerid: 1, 
  },
]; */

this.questions = questions = [
  {
    questionID: 0,
    compName: "Trivial - Test Comp",
    titleQuestion: "What is 10 + 10",
    answers: ["eleven", "seventeen", "forty", "twenty"],
    answer: 4,
    questionImage: "",
    points: 1,
  },
  {
    questionID: 1,
    compName: "Trivial - Test Comp",
    titleQuestion: "Who jumped over the moon?",
    answers: ["The cow", "The dog", "The crow", "The hen"],
    answer: 1,
    questionImage: "",
    points: 1,
  },
  {
    questionID: 2,
    compName: "Trivial - Test Comp",
    titleQuestion: "What is the biggest?",
    answers: ["The Sun", "The Earth", "The MCG", "The Universe"],
    answer: 4,
    questionImage: "",
    points: 1,
  },
  {
    questionID: 3,
    compName: "Trivial - Test Comp",
    titleQuestion: "Will this succeed?",
    answers: ["No", "No", "Yes", "No"],
    answer: 3,
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

  return this.questions[this.current];
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
  return questions[this.current];
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
  //console.log(response);
}

// console.log(`${el.questionID === questionid}`);
function getCorrectAnswer(questionid) {
  const arr = questions.filter(el => el.questionID === questionid);
  return arr[0].answer;
}

function getPoints(questionid) {
  return questions[questionid].points;
}

module.exports = {
  current: this.current,
  gameStarted: this.gameStarted,
  questionCount: this.questionCount,
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
};

// module.exports = Contest;
