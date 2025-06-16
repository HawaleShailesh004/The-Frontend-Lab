import gkQuiz from "./Questions.js";

// DOM Elements
const qTitleEle = document.querySelector(".question-title");
const optionsEle = document.querySelectorAll(".option");
const optionsContainerEle = document.querySelector(".options-container");
const scoreEle = document.querySelector(".score");

// Quiz State
let Score = 0;
let currentQueNo = 1;

// Check if selected answer is correct
const checkIfCorrect = (qNo, optNo) => {
  return gkQuiz[qNo - 1].answer === optNo + 1;
};

// Set question and its options
const setQuestion = (qNo) => {
  const question = gkQuiz[qNo - 1];

  qTitleEle.textContent = question.question;

  question.options.forEach((optText, ind) => {
    optionsEle[ind].textContent = optText;
  });
};

// Initial load
setQuestion(currentQueNo);
scoreEle.textContent = `Your Score is ${Score} / ${currentQueNo - 1}`;

// Handle option clicks
optionsEle.forEach((optionEle, ind) => {
  optionEle.addEventListener("click", () => {
    const isCorrect = checkIfCorrect(currentQueNo, ind);
    if (isCorrect) Score++;

    if (currentQueNo < gkQuiz.length) {
      currentQueNo++;
      setQuestion(currentQueNo);
      scoreEle.textContent = `Your Score is ${Score} / ${currentQueNo - 1}`;
    } else {
      qTitleEle.textContent = "Quiz Completed!";
      scoreEle.textContent = `Your Score is ${Score} / ${currentQueNo}`;
      optionsContainerEle.style.display = "none";
      alert(`Quiz Ends here with ${Score}..`);
    }
  });
});
