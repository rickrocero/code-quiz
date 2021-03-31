var questionArray = [
    {
        question: "What is the name of Harry Potter's owl?",
        answer1: "Fluffy",
        answer2: "Scabbers",
        answer3: "Hedwig",
        answer4: "Crookshanks",
        correctAnswer: "Hedwig"
    },
    {
        question: "What beast lives in the Chamber of Secrets",
        answer1: "Phoenix",
        answer2: "Basilisk",
        answer3: "Giant Spider",
        answer4: "Dragon",
        correctAnswer: "Basilisk"
    },
    {
        question: "What is Sirius Black's nickname?",
        answer1: "Moony",
        answer2: "Wormtail",
        answer3: "Padfoot",
        answer4: "Prongs",
        correctAnswer: "Padfoot"
    },
    {
        question: "What plant did Harry eat to breathe underwater?",
        answer1: "Gillyweed",
        answer2: "Mandrake",
        answer3: "Devil's Snare",
        answer4: "Whomping Willow",
        correctAnswer: "Gillyweed"
    },
    {
        question: "Who tells Harry about the Room of Requirement?",
        answer1: "Luna Lovegood",
        answer2: "Neville Longbottom",
        answer3: "Dobby",
        answer4: "Ginny Weasley",
        correctAnswer: "Dobby"
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
    var score = 0;//localStorage.getItem("score");
    var userScoreSpan = document.querySelector("#user-score");
    

    // Renders questions & answers on page
    function displayQuestion() {
        questionEl.innerText = questionArray[currentIndex].question;
        answer1El.innerText = questionArray[currentIndex].answer1;
        answer2El.innerText = questionArray[currentIndex].answer2;
        answer3El.innerText = questionArray[currentIndex].answer3;
        answer4El.innerText = questionArray[currentIndex].answer4;
    }

    
    // Tracks clicks for each answer
    answerButtons.forEach(function (ansBtn) {
        ansBtn.addEventListener("click", function (event) {
            var userGuess = event.target.innerText
            //  Notifies user of correct or wrong answer
            if (userGuess === questionArray[currentIndex].correctAnswer) {
                score += 10;
                rightWrongSpan.innerText = "Correct! 😀";
            } else {
                // Wrong answers shave 10 seconds off timer
                timeLeft -= 10;
                rightWrongSpan.innerText = "Wrong 🙁";
            }

            currentIndex++;
            // Next question is presented immediately after user picks an answer
            if (currentIndex === questionArray.length) {
                endGame();
            } else {
                displayQuestion();
            }
        })
    })

    //1. Take the coding quiz
    // clicking start quiz button presents user with first question
    startBtnEl.addEventListener("click", function() {
        introEl.classList.add("hide");
        quizEl.classList.remove("hide");
        startTimer();
        displayQuestion();
    })

    
    //2. Countdown Timer
    function startTimer() {
        clearInterval(timer);
        // give user 60 seconds to take quiz
        // display countdown on screen
        timeLeft = 60;
        timeLeftSpan.innerText = timeLeft;
        timer = setInterval(function(){
            timeLeft--;
            timeLeftSpan.innerText = timeLeft;
            // if time runs out, loss
            if (timeLeft < 1) {
                clearInterval(timer);
                alert("You lost! 🙁");
                endGame();
            }
            console.log(timeLeft);
        },1000)
    }


    // After user answers last question:
    function endGame() {
        //show the final score container
        finalScoreEl.classList.remove("hide");
        //hide the questions container
        quizEl.classList.add("hide");
        //show final score
        userScoreSpan.textContent = score;
        //stop the timer
        clearInterval(timer);
    }


    

// TODO: after user is notified of right-wrong answer it disappears for the next question

    
// TODO: 3. Save score
    // user submits name and highscore
    // user is presented with highscores list and buttons to retake quiz or clear highscore list.

    document.querySelector("#submit-btn").addEventListener("click",function(event) {
        event.preventDefault();

        //get user input
        var initials = document.querySelector("#user-initials").value;

        //lets get the data if it exists in local
        var scoreList = JSON.parse(localStorage.getItem("scoreList")) || [];

        //create a new data entry
        var scoreEntry = {
            user: initials,
            score: score
        }

        //push new entry into scores list
        scoreList.push(scoreEntry);

        //set the updated score list to local srtorage - convert the JSON
        localStorage.setItem("scoreList",JSON.stringify(scoreList));
    });