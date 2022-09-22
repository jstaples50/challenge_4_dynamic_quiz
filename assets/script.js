// Global variables

var questionEl = document.querySelector("#question-tag");
var answerDivEl = document.querySelector("#answers");
var answerListEl = document.querySelector("#answer-list");


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

// Question is rendered to DOM

function renderQuestion(question) {
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
        let hr = document.createElement("hr");
        let trueResponse = document.createElement("p");
        trueResponse.style.fontStyle = "italic";
        answerDivEl.appendChild(hr);
        answerDivEl.appendChild(trueResponse);
        if (event.target.textContent === question.correctAnswer) {
            trueResponse.textContent = "That is correct!"
        } else { 
            trueResponse.textContent = "Sorry, that is wrong..."
        }
    }

    answerListEl.addEventListener('click', checkIfCorrect);
}


renderQuestion(questionArray[1]);