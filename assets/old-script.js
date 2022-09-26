// Global variables

var masterBool = false;

var questionDivEl = document.querySelector("#question");
var questionEl = document.querySelector("#question-tag");
var answerDivEl = document.querySelector("#answers");
var answerListEl = document.querySelector("#answer-list");

var currentScore = 0
var currentScoreEl = document.createElement("p");
questionDivEl.appendChild(currentScoreEl);
currentScoreEl.textContent = currentScore;

var exitBtnEl = document.createElement("button");
exitBtnEl.setAttribute("class", "exit-button");
exitBtnEl.textContent = "EXIT";

var startButtonEl = document.createElement("button");
startButtonEl.setAttribute("class", "start-button");
startButtonEl.textContent = "Press";
var nextEl = document.createElement("button");
nextEl.setAttribute("class", "next-button");
nextEl.textContent = "Next";

var hr = document.createElement("hr");
var displayCorrectOrIncorrect = document.createElement("p");
displayCorrectOrIncorrect.style.fontStyle = "italic";


var question1 = {
    prompt: "Question 1 is asked here",
    answerArray: ["A", "B", "C", "D"],
    correctAnswer: "A",
    questionHasBeenAnswered: false
}; 

var question2 = {
    prompt: "Question 2 is asked here",
    answerArray: ["A", "B", "C", "D"],
    correctAnswer: "B",
    questionHasBeenAnswered: false
}; 

var question3 = {
    prompt: "Question 3 is asked here",
    answerArray: ["A", "B", "C", "D"],
    correctAnswer: "C",
    questionHasBeenAnswered: false

}; 

questionArray = [question1, question2, question3];


// Functions

function beginGame() {
    questionEl.textContent = "Press the Button to start the Quiz!";
    questionDivEl.appendChild(startButtonEl);
    startButtonEl.addEventListener('click', function(){
        document.querySelector(".start-button").remove();
        renderQuestion(questionArray[Math.floor(Math.random() * questionArray.length)]);
    })
}

function exitGame(event) {
    masterBool = true;
}

// Question is rendered to DOM

function renderQuestion(question) {
    
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
    // TODO: Duplicate code in checkIfCorrect, check if it can be refractered


    // function faddingAnswer() {
    //     var fadeInverval = setInterval(checkIfCorrect, 2000);
    // }

    function checkIfCorrect(event) {
         if (event.target.textContent === question.correctAnswer) {
            answerDivEl.appendChild(hr);
            answerDivEl.appendChild(displayCorrectOrIncorrect);
            displayCorrectOrIncorrect.textContent = "That is correct!"
            answerDivEl.appendChild(nextEl);
            currentScore++;
            currentScoreEl.textContent = currentScore;
            next();
        } else { 
            answerDivEl.appendChild(hr);
            answerDivEl.appendChild(displayCorrectOrIncorrect);
            displayCorrectOrIncorrect.textContent = "Sorry, that is wrong..."
            answerDivEl.appendChild(nextEl);
            next();
        }
        question.questionHasBeenAnswered = true;
        clearInterval(fadeInverval);
        
    }

    // answerDivEl.addEventListener('click', faddingAnswer);

    if (question.questionHasBeenAnswered === false) {
        answerListEl.addEventListener('click', checkIfCorrect);
    } else if (question.questionHasBeenAnswered === true) {
        answerListEl.removeEventListener('click', checkIfCorrect);
    }

}

// Deletes List Items

function removeListItems() {
    allListItems = document.querySelectorAll("li");
    allListItemsArray = Array.from(allListItems);
    allListItemsArray.forEach(element => {
        element.remove();            
     });
}

// Functionality for the Next button

function next() {
    // nextEl.remove();
    // hr.remove();
    // trueResponse.remove();
    removeListItems();
    if (questionArray.length > 0) {
        renderQuestion(questionArray[Math.floor(Math.random() * questionArray.length)]);    
    } else {
        questionDivEl.textContent = "High Score Page";
        answerDivEl.remove()
    }
}




beginGame();
// nextEl.addEventListener('click', next);


