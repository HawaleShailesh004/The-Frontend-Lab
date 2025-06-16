import gkQuiz from "./Questions.js";

let qTitleEle = document.querySelector(".question-title");
let optionsEle = document.querySelectorAll(".option");
let optionsContainerEle = document.querySelector(".options-container")
let scoreEle = document.querySelector(".score");

let Score = 0;
let currentQueNo = 1;

const checkIfCorrect = (qNo, optNo) => {
  return gkQuiz[qNo - 1].answer == optNo + 1;
};

const setQuestion = (qNo) => {
  let question = gkQuiz[qNo - 1];
  qTitleEle.textContent = question.question;

  question.options.forEach((optText, ind) => {
    console.log(optText);
    optionsEle[ind].textContent = optText;
  });
};

setQuestion(currentQueNo);
scoreEle.textContent = `Your Score is ${Score} / ${currentQueNo - 1}`;
optionsEle.forEach((optionEle, ind) => {
  optionEle.addEventListener("click", () => {
    Score = checkIfCorrect(currentQueNo, ind) ? Score + 1 : Score;

    if (currentQueNo < gkQuiz.length) {
      currentQueNo++;
      setQuestion(currentQueNo);
      scoreEle.textContent = `Your Score is ${Score} / ${currentQueNo - 1}`;
    } else {
      qTitleEle.textContent = "Quiz Completed!";
      scoreEle.textContent = `Your Score is ${Score} / ${currentQueNo}`;
      optionsContainerEle.style.display = "none"
      alert(`Quiz Ends here with ${Score}..`);
    }
  });
});
