// Global variables

var questionDivEl = document.querySelector("#question");
var questionEl = document.querySelector("#question-tag");
var answerDivEl = document.querySelector("#answers");
var answerListEl = document.querySelector("#answer-list");


var buttonEl = document.createElement("button");
buttonEl.setAttribute("class", "start-button");
buttonEl.textContent = "Press";
var nextEl = document.createElement("button");
nextEl.setAttribute("class", "next-button");
nextEl.textContent = "Next";

var question1 = {
    prompt: "Question 1 is asked here",
    answerArray: ["A", "B", "C", "D"],
    correctAnswer: "A"
}; 

var question2 = {
    prompt: "Question 2 is asked here",
    answerArray: ["A", "B", "C", "D"],
    correctAnswer: "B"
}; 

var question3 = {
    prompt: "Question 3 is asked here",
    answerArray: ["A", "B", "C", "D"],
    correctAnswer: "C"
}; 

questionArray = [question1, question2, question3];

function init() {
    questionEl.textContent = "Press the Button to start the Quiz!";
    questionDivEl.appendChild(buttonEl);
}

// Question is rendered to DOM

function renderQuestion(question) {
    
    var hr = document.createElement("hr");
    var trueResponse = document.createElement("p");

    // Deletes selected question from questionArray

    for (let i = 0; i < questionArray.length; i++) {
        if (question === questionArray[i]) {
            questionArray.splice(i, 1);
        }
    }

    questionEl.textContent = question.prompt;
    for (i = 0; i < question.answerArray.length; i++) {
        var liEl = document.createElement("li");
        liEl.setAttribute("data-number", i + 1);
        liEl.textContent = question.answerArray[i];
        answerListEl.appendChild(liEl);
    }

    // Check if answer clicked is correct
    // Click event listener added
    //  *TODO* : trueResponse textContent keeps adding on after element is pushed

    function checkIfCorrect(event) {
        trueResponse.style.fontStyle = "italic";
        answerDivEl.appendChild(hr);
        answerDivEl.appendChild(trueResponse);
        if (event.target.textContent === question.correctAnswer) {
            trueResponse.textContent = "That is correct!"
            questionDivEl.appendChild(nextEl);
        } else { 
            trueResponse.textContent = "Sorry, that is wrong..."
            questionDivEl.appendChild(nextEl);
        }
    }

    answerListEl.addEventListener('click', checkIfCorrect);
    nextEl.addEventListener('click', function() {
        nextEl.remove();
        hr.remove();
        trueResponse.remove();
        return;
    })
}


init();
buttonEl.addEventListener('click', function(){
    document.querySelector(".start-button").remove();
    renderQuestion(questionArray[Math.floor(Math.random() * questionArray.length)]);
})
