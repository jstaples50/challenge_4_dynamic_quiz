// Global variables

var questionEl = document.querySelector("#question-tag");
var answerListEl = document.querySelector("#answer-list");


var question1 = {
    prompt: "Question 1 is asked here",
    answerArray: ["A", "B", "C", "D"]
}; 

var question2 = {
    prompt: "Question 2 is asked here",
    answerArray: ["A", "B", "C", "D"]
}; 

var question3 = {
    prompt: "Question 3 is asked here",
    answerArray: ["A", "B", "C", "D"]
}; 

questionArray = [question1, question2, question3];

// Question is rendered to DOM

function renderQuestion(){
    questionEl.textContent = question1.prompt;
    for (i = 0; i < question1.answerArray.length; i++) {
        var liEl = document.createElement("li");
        liEl.setAttribute("data-number", i + 1);
        liEl.textContent = question1.answerArray[i];
        answerListEl.appendChild(liEl);
    }
}

renderQuestion();