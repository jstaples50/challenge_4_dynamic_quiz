// *GLOBAL VARIABLES*   

var masterBool = true;

// Containers

var questionDivEl = document.querySelector("#question");
var questionEl = document.querySelector("#question-tag");
var answerDivEl = document.querySelector("#answers");
var answerListEl = document.querySelector("#answer-list");

// Start Button

var startButtonEl = document.createElement("button");
startButtonEl.setAttribute("class", "start-button");
startButtonEl.textContent = "Press";

// Display if answer is correct or incorrect

var hr = document.createElement("hr");
var displayCorrectOrIncorrect = document.createElement("p");
displayCorrectOrIncorrect.style.fontStyle = "italic";

// List elements

var liEl1 = document.createElement("li");
var liEl2 = document.createElement("li");
var liEl3 = document.createElement("li");
var liEl4 = document.createElement("li");

var listElementArray = [liEl1, liEl2, liEl3, liEl4];

// Question variables

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

var clickedAnswer = "";



// *FUNCTIONS*

// Begins game at starting screen

function beginGame() {
    questionEl.textContent = "Press the Button to start the Quiz!";
    questionDivEl.appendChild(startButtonEl);
    startButtonEl.addEventListener('click', function(){
        document.querySelector(".start-button").remove();
        displayQuestions(questionArray[Math.floor(Math.random() * questionArray.length)]);
    })

}

// Renders questions

function displayQuestions(question) {
    questionEl.textContent = question.prompt;

    removeQuestionFromQuestionArray();
    addQuestionListItems();
    selectAnswer();
    
    function addQuestionListItems() {
        for (var i = 0; i < listElementArray.length; i++) {
            listElementArray[i].textContent = question.answerArray[i];
            answerListEl.appendChild(listElementArray[i]);
        }
    }

    // Removes questions from question Array

    function removeQuestionFromQuestionArray() {
        for (let i = 0; i < questionArray.length; i++) {
            if (question === questionArray[i]) {
                questionArray.splice(i, 1);
            }
        }
    }

    // Select answer
    function selectAnswer() {
        answerListEl.addEventListener("click", function(event) {
            clickedAnswer = event.target.textContent;
            checkIfCorrect();
        })
    }


    // Check if question is true

    function checkIfCorrect() {
        answerDivEl.appendChild(hr);
        answerDivEl.appendChild(displayCorrectOrIncorrect);
        
        if (clickedAnswer === question.correctAnswer) {
            displayCorrectOrIncorrect.textContent = "That was correct!";
        } else {
            displayCorrectOrIncorrect.textContent = "That was wrong.";
        }
    }
}

// Moves on to next screen

function next(event) {
    if (questionArray.length > 0) {
        displayQuestions(questionArray[Math.floor(Math.random() * questionArray.length)]);;
    } else {
        endScreen();
    }
}

// Countdown timer to determine points

function countdown() {}

// Enter in highscore screen

function endScreen() {
    questionDivEl.textContent = "High Score Page";
    document.getElementById("answer-list").remove();
}

// *EXECUTION*

beginGame();
answerDivEl.addEventListener('click', next);
