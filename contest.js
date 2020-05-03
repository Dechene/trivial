this.current = 0;
this.responses = responses = [];
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
  },
  {
    questionID: 1,
    compName: "Trivial - Test Comp",
    titleQuestion: "Who jumped over the moon?",
    answers: ["The cow", "The dog", "The crow", "The hen"],
    answer: 1,
    questionImage: "",
  },
  {
    questionID: 2,
    compName: "Trivial - Test Comp",
    titleQuestion: "What is the biggest?",
    answers: ["The Sun", "The Earth", "The MCG", "The Universe"],
    answer: 4,
    questionImage: "",
  },
  {
    questionID: 3,
    compName: "Trivial - Test Comp",
    titleQuestion: "Will this succeed?",
    answers: ["No", "No", "Yes", "No"],
    answer: 3,
    questionImage: "",
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
  console.log(JSON.stringify(responses));
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

module.exports = {
  current: this.current,
  questionCount: this.questionCount,
  questions: this.questions,
  responses: this.responses,
  getCurrentQuestionID: getCurrentQuestionID,
  getQuestion: getQuestion,
  getCurrentQuestion: getCurrentQuestion,
  moveNext: moveNext,
  movePre: movePre,
  submitAnswer: submitAnswer,
  getAnswers: getAnswers,
  getSubmission: getSubmission,
};

// module.exports = Contest;
