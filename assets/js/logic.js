
const timer = document.getElementById('time');
const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start');
const questionContainer = document.getElementById('questions'); // class = hide
const questionTitle = document.getElementById('question-title');
const choices = document.getElementById('choices');
const endScreen = document.getElementById('end-screen'); // class = hide
const finalScore = document.getElementById('final-score');
const nameInput = document.getElementById('initials'); // max = 3 lettters
const submitButton = document.getElementById('submit');
const feedback = document.getElementById('feedback'); // class = hide


let questionIndex = 0;
let totalTime = 60; 
let score = 0;


startButton.addEventListener('click', function() {
    startQuiz();
});

function startQuiz() {
    startScreen.classList.add('hide');
    questionContainer.classList.add('show');
    questionContainer.classList.remove('hide');
    timer.textContent = totalTime;
    const countdown = setInterval(countdownStart, 1000);

    function countdownStart() {
        if (totalTime > 0) {
            totalTime--;
        } else if (totalTime <= 0 || questionIndex >= quizQuestions.length) {
            clearInterval(countdown);
            endQuiz();
        }
        timer.textContent = totalTime;
    }

    showQuestion();

    function showQuestion() {
        let currentQuestion = quizQuestions[questionIndex];
        questionTitle.textContent = currentQuestion.q;
        choices.innerHTML = "";

        for (let choice in currentQuestion.a) {
            let choiceButton = document.createElement('button');
            choiceButton.textContent = currentQuestion.a[choice];
            choiceButton.setAttribute('data-index', choice);


            choiceButton.addEventListener('click', checkAnswer);
            choices.appendChild(choiceButton);
        }
    }

    function checkAnswer(event) {
        questionIndex++;

        if (questionIndex < quizQuestions.length) {
            showQuestion();

            let selectedAnswer = event.target.getAttribute('data-index');
            let currentQuestion = quizQuestions[questionIndex];
            feedback.style.display = "block";
            if (selectedAnswer == currentQuestion.correctAnswer) {
                score += 1;
                feedback.textContent = "Correct!";
            } else {
                totalTime -= 5;
                feedback.textContent = "Wrong, try again!";
            }

        } else {
            endQuiz();
            setTimeout(function(){
                feedback.style.display = "none";
            },1000)
        }

        console.log(quizQuestions.length);
        
    }

    function endQuiz() {
        questionContainer.classList.add('hide');
        endScreen.classList.remove('hide');
        finalScore.textContent = score;
    }


    submitButton.addEventListener('click', function() {
        const newScore = finalScore.textContent;
        const initials = nameInput.value;
        console.log(initials);

    
        let existingScore = JSON.parse(localStorage.getItem('newScore'));

        if (!Array.isArray(existingScore)) {
            existingScore = [];
        }

        
        const scoreObject = { score: newScore, name: initials };

        existingScore.push(scoreObject);

    
        localStorage.setItem('newScore', JSON.stringify(existingScore));
        window.location.href = "highscores.html";
    });


    
    

// create event listener for start button, when clicked timer starts, questions appear and countdown starts
// startButton.addEventListener('click', function() {
//     startQuiz();
//     showQuestion();
//     })

// // function to start quiz
// // when quiz starts startScreen hidden
// // show questions div

// function startQuiz () {
//     startScreen.classList.add('hide');
//     questionContainer.setAttribute('class','show')
//     // showQuestion();
//     // update timer
//     timer.textContent = totalTime;
//     const countdown = setInterval(countdownStart, 1000);

//     function countdownStart() {
//         if (totalTime > 0 ) {
//             totalTime --;
//         } else if (totalTime < 0 || questionIndex < quizQuestions.length) {
//             clearInterval(countdownStart);
//             endQuiz();
//         }
//         timer.textContent = totalTime

//         function showQuestion() {
//         let currentQuestion = quizQuestions[questionIndex];
//         questionTitle.textContent = currentQuestion.q;
//         choices.innerHTML = "";

//         for (let choice in currentQuestion.a) {
//             let choiceButton = document.createElement('button');
//             choiceButton.textContent = currentQuestion.a[choice];
//             choiceButton.setAttribute('data-index', choice);

//             //click event listener to check asnwer
//             choiceButton.addEventListener('click', checkAnswer);
//             choices.appendChild(choiceButton);
//         }
//         }

//         function checkAnswer(event) {
//             let selectedAnswer = event.target.getAttribute('data-index');
//             let currentQuestion = quizQuestions[questionIndex];

//             if (selectedAnswer == currentQuestion.correctAnswer) {
//                 score += 1;
//                 feedback.textContent = "Correct!";
//             }else {
//                 totalTime -= 5;
//                 feedback.textContent = "Wrong, try again!";
//             }

//             questionIndex++

//             if(questionIndex < quizQuestions.length) {
//                 showQuestion();
//             } else {
//                 endQuiz();
//             }
        

//         function endQuiz() {
//         questionContainer.classList.add('hide');
//         endScreen.classList.remove('hide');

//         finalScore.textContent = score;
//         }

//         showQuestion();
    }