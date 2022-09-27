// *GLOBAL VARIABLES*   


// Containers

var questionDivEl = document.querySelector("#question");
var questionEl = document.querySelector("#question-tag");
var answerDivEl = document.querySelector("#answers");

var answerListEl = document.createElement("ul");
answerListEl.setAttribute("id", "answer-list");
answerListEl.setAttribute("class", "centered");

var highScoreDisplayEl = document.querySelector("#highscore");
var initialsDisplayEl = document.querySelector("#initials");

var currentHighScore = {
    initials: "",
    score: ""
};

localStorage.setItem("Current High Score", JSON.stringify(currentHighScore));

highScoreObject = JSON.parse(localStorage.getItem("Current High Score"));

 if (highScoreObject !== null) {
    highScoreDisplayEl.textContent = (`Current High Score: ${highScoreObject.score}`);
    initialsDisplayEl.textContent = (`Initials of Champ: ${highScoreObject.initials}`);
}

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
    prompt: "What does CSS stand for?",
    answerArray: ["Casscading Style Sheets", "Cornered Slice Shelving", "C#", "JavaScript"],
    correctAnswer: "Casscading Style Sheets",
    questionHasBeenAnswered: false
}; 

var question2 = {
    prompt: "Which is not a main language for Web Development?",
    answerArray: ["JavaScript", "Python", "HTML", "CSS"],
    correctAnswer: "Python",
    questionHasBeenAnswered: false
}; 

var question3 = {
    prompt: "What is the html element for the biggest heading?",
    answerArray: ["<h6>", "<BigH>", "<h1>", "<~largest>"],
    correctAnswer: "<h1>",
    questionHasBeenAnswered: false

}; 

questionArray = [question1, question2, question3];

var clickedAnswer = "";
var currentCorrectAnswer = "";


// Countdown variable

var timeLeft = 15;
var timeEl = document.createElement("p");
timeEl.textContent = timeLeft;

var gameOver = false;

// High Score name input 

 var highScoreNameEl = document.createElement("input");
highScoreNameEl.setAttribute("type", "text");
highScoreNameEl.setAttribute("id", "highscore-name");
highScoreNameEl.setAttribute("name", "highscore-name")
var highScoreLabelEl = document.createElement("label");
highScoreLabelEl.setAttribute("for", "highscore-name");
highScoreLabelEl.textContent = "Enter your initials here";

// Submit Button

var submitButtonEl = document.createElement("button");
submitButtonEl.setAttribute("class", "start-button");
submitButtonEl.textContent = "Submit";

// Play Again Button

var playAgainButtonEl = document.createElement("button");
playAgainButtonEl.setAttribute("class", "start-button");
playAgainButtonEl.textContent = "Play Again?";


// Event Listeners

startButtonEl.addEventListener('click', function(){
    answerDivEl.appendChild(answerListEl);
    document.querySelector(".start-button").remove();
    questionDivEl.appendChild(timeEl);
    countdown();
    displayQuestions(questionArray[Math.floor(Math.random() * questionArray.length)]);
})

answerListEl.addEventListener("click", function(event) {
    clickedAnswer = event.target.textContent;
    console.log(clickedAnswer);
    checkIfCorrect();
})

answerListEl.addEventListener("click", next);



// *FUNCTIONS*

// Begins game at starting screen

function beginGame() {
    questionEl.textContent = "Press the Button to start the Quiz!";
    questionDivEl.appendChild(startButtonEl);
}

// Renders questions

function displayQuestions(question) {
    // debugger;
    currentCorrectAnswer = question.correctAnswer;
    questionEl.textContent = question.prompt;

    removeQuestionFromQuestionArray();
    addQuestionListItems();
    
    
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


    // Check if question is true

   
}

// Moves on to next screen

function next(event) {
    if (questionArray.length > 0 && gameOver === false) {
        displayQuestions(questionArray[Math.floor(Math.random() * questionArray.length)]);;
    } else {
        endScreen();
    }
}

function checkIfCorrect() {
    answerDivEl.appendChild(hr);
    answerDivEl.appendChild(displayCorrectOrIncorrect);
    
    if (clickedAnswer === currentCorrectAnswer) {
        displayCorrectOrIncorrect.textContent = "That was correct!";
    } else {
        displayCorrectOrIncorrect.textContent = "That was wrong.";
        timeLeft -= 3;
    }
    currentCorrectAnswer = "";
}


// Countdown timer to determine points

function countdown() {
    var timeInterval = setInterval(function() {
        if (timeLeft > 0) {
            timeLeft--;
        }

        timeEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            endScreen();
        } else if (gameOver === true) {
            clearInterval(timeInterval);
        }

    }, 1000);
}

// Enter in highscore screen

function endScreen() {
    gameOver = true;
    questionEl.textContent = "Game Over";
    answerDivEl.appendChild(highScoreLabelEl);
    answerDivEl.appendChild(highScoreNameEl);
    answerDivEl.appendChild(submitButtonEl);
    answerDivEl.appendChild(playAgainButtonEl);
    document.getElementById("answer-list").remove();
    answerDivEl.removeEventListener("click", next);

    submitButtonEl.addEventListener("click", function() {
        if (typeof highScoreObject !== null) {
            if (timeLeft > highScoreObject.score) {
                currentHighScore = {
                    initials: highScoreNameEl.value.trim(),
                    score: timeLeft
                };
                localStorage.setItem("Current High Score", JSON.stringify(currentHighScore));
                getHighScore();
            } else {
                alert("You don't have a high enough score to be the champ!");
            }
        } else {
            var currentHighScore = {
                initials: highScoreNameEl.value.trim(),
                score: timeLeft
            };
            localStorage.setItem("Current High Score", JSON.stringify(currentHighScore));
            getHighScore();
        }
    
    })

    playAgainButtonEl.addEventListener("click", playAgain);
}

function playAgain() {
    // Reset variables
    // debugger;
    answerDivEl.replaceChildren();
    timeLeft = 15;
    gameOver = false;
    clickedAnswer = "";
    questionArray = [question1, question2, question3];

    // Call start of game

    beginGame();
}

function getHighScore() {
    highScoreObject = JSON.parse(localStorage.getItem("Current High Score"));
    highScoreDisplayEl.textContent = (`Current High Score: ${highScoreObject.score}`);
    initialsDisplayEl.textContent = (`Initials of Champ: ${highScoreObject.initials}`);
}



// *EXECUTION*

beginGame();



