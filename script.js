var questionArray = [
    {
        question: "Question 1 goes here",
        answer1: "answer1",
        answer2: "answer2",
        answer3: "answer3",
        answer4: "answer4",
        correctAnswer: "answer3"
    },
    {
        question: "Question 2 goes here",
        answer1: "answer1",
        answer2: "answer2",
        answer3: "answer3",
        answer4: "answer4",
        correctAnswer: "answer3"
    },
    {
        question: "Question 3 goes here",
        answer1: "answer1",
        answer2: "answer2",
        answer3: "answer3",
        answer4: "answer4",
        correctAnswer: "answer3"
    },
    {
        question: "Question 4 goes here",
        answer1: "answer1",
        answer2: "answer2",
        answer3: "answer3",
        answer4: "answer4",
        correctAnswer: "answer3"
    },
    {
        question: "Question 5 goes here",
        answer1: "answer1",
        answer2: "answer2",
        answer3: "answer3",
        answer4: "answer4",
        correctAnswer: "answer3"
    }];
    
    // Variables
    var currentIndex = 0;
    var questionEl = document.querySelector("#quiz-question");
    var answer1El = document.querySelector(".answer1");
    var answer2El = document.querySelector(".answer2");
    var answer3El = document.querySelector(".answer3");
    var answer4El = document.querySelector(".answer4");
    var answerButtons = document.querySelectorAll(".answer");
    var quizEl = document.querySelector("#quiz");
    var introEl = document.querySelector("#intro-message");
    var startBtnEl = document.querySelector("#start-button");
    var finalScoreEl = document.querySelector("#final-score");
    var timeLeft = 60;
    var timer;
    var timeLeftSpan = document.querySelector("#time-left");
    var rightWrongSpan = document.querySelector("#right-wrong");
    var score = 0;

    // Renders questions & answers on page
    function displayQuestion() {
        questionEl.innerText = questionArray[currentIndex].question;
        answer1El.innerText = questionArray[currentIndex].answer1;
        answer2El.innerText = questionArray[currentIndex].answer2;
        answer3El.innerText = questionArray[currentIndex].answer3;
        answer4El.innerText = questionArray[currentIndex].answer4;
        hide(finalScoreEl);
    }

    // Hides an element
    function hide(element) {
        element.style.display = "none";
    }
    // Shows an element
    function show(element) {
        element.style.display = "block";
    }

    
    // Tracks clicks for each answer
    answerButtons.forEach(function (ansBtn) {
        ansBtn.addEventListener("click", function (event) {
            var userGuess = event.target.innerText
            // User is notified of correct or wrong answer
            if (userGuess === questionArray[currentIndex].correctAnswer) {
                score += 10;
                rightWrongSpan.innerText = "Correct! 😀";
                currentIndex++;
                // Next question is presented immediately after user picks an answer
                displayQuestion();
            } else {
                // Wrong answers shave 10 seconds off timer
                timeLeft -= 10;
                rightWrongSpan.innerText = "Wrong 🙁";
                currentIndex++;
                displayQuestion();
            }
        })
    })

    //1. Take the coding quiz
    // clicking start quiz button presents user with first question
    startBtnEl.addEventListener("click", function() {
        hide(introEl);
        show(quizEl);
        startTimer();
    })

     
    //2. Countdown Timer
    function startTimer() {
        clearInterval(timer);
        // give user 60 seconds to take quiz
        timeLeft = 60;
        // display countdown on screen
        timeLeftSpan.innerText = timeLeft;
        timer = setInterval(function(){
            timeLeft--;
            timeLeftSpan.innerText = timeLeft;
            // if time runs out, loss
            if (timeLeft < 1) {
                clearInterval(timer);
                alert("You lost! 🙁")
            }
            console.log(timeLeft);
        },1000)
    }


    displayQuestion();

// TODO: after user is notified of right-wrong answer it disappears for the next question

// TODO: After user answers last question:
    // timer stops
    // user is taken to score page

    
// TODO: 3. Save wins/losses
    // after quiz, update and render final score
    // user submits name and highscore
    // save to local storage
    // user is presented with highscores list and buttons to retake quiz or clear highscore list.