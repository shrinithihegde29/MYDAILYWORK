const quizData = [
    {
        question: "What does HTML stand for?",
        a: "Hyper Text Markup Language",
        b: "High Text Machine Language",
        c: "Hyperlinks Text Mark Language",
        d: "None of these",
        correct: "a"
    },
    {
        question: "Which language is used for styling web pages?",
        a: "HTML",
        b: "JQuery",
        c: "CSS",
        d: "XML",
        correct: "c"
    },
    {
        question: "Which is not a programming language?",
        a: "Python",
        b: "Java",
        c: "HTML",
        d: "C++",
        correct: "c"
    },
    {
        question: "What does CSS stand for?",
        a: "Computer Style Sheets",
        b: "Cascading Style Sheets",
        c: "Creative Style Sheets",
        d: "Colorful Style Sheets",
        correct: "b"
    },
    {
        question: "Which of the following is a JavaScript framework?",
        a: "Laravel",
        b: "Django",
        c: "React",
        d: "Flask",
        correct: "c"
    },
    {
        question: "What does SQL stand for?",
        a: "Structured Query Language",
        b: "Simple Query Language",
        c: "Standard Query Language",
        d: "System Query Language",
        correct: "a"
    },
    {
        question: "Which symbol is used for comments in Python?",
        a: "//",
        b: "/* */",
        c: "#",
        d: "<!-- -->",
        correct: "c"
    },
    {
        question: "What is the purpose of the 'git' command?",
        a: "Version control system",
        b: "Text editor",
        c: "Web browser",
        d: "Database management",
        correct: "a"
    },
    {
        question: "Which of these is a backend programming language?",
        a: "HTML",
        b: "CSS",
        c: "Node.js (JavaScript runtime for backend)",
        d: "Bootstrap (CSS framework)",
        correct: "c"
    }
];

// Shuffle questions function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let currentQuiz = 0;
let score = 0;
let timeLeft = 300; // 5 minutes for entire quiz
let timer;
let isPaused = false;
let timerStarted = false;

const questionEl = document.getElementById("question");
const answerEls = document.querySelectorAll(".answer");
const options = document.querySelectorAll(".options li");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const progressBar = document.getElementById("progress");
const timeEl = document.getElementById("time");
const pauseBtn = document.getElementById("pause");
const themeToggleBtn = document.getElementById("theme-toggle");

// Shuffle questions on load
shuffleArray(quizData);

// Theme toggle
themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

loadQuiz();

function loadQuiz() {
    // Only start timer on first question
    if (!timerStarted) {
        timerStarted = true;
        updateTimerDisplay();
        startTimer();
    }

    deselectAnswers();
    clearColors();

    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;

    progressBar.style.width = `${(currentQuiz / quizData.length) * 100}%`;
}

function startTimer() {
    timer = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 0) {
                clearInterval(timer);
                showResult();
            }
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeEl.innerText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function clearColors() {
    options.forEach(opt => {
        opt.classList.remove("correct", "wrong");
    });
}

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

pauseBtn.addEventListener("click", () => {
    isPaused = !isPaused;
    const icon = pauseBtn.querySelector("i");
    if (isPaused) {
        icon.className = "fas fa-play";
    } else {
        icon.className = "fas fa-pause";
    }
});

submitBtn.addEventListener("click", () => {
    const answer = getSelected();
    if (!answer) return;

    clearInterval(timer);

    if (answer === quizData[currentQuiz].correct) {
        score++;
    }

    currentQuiz++;
    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        showResult();
    }
});

function showResult() {
    document.getElementById("quiz").innerHTML = `
        <h2>You scored ${score}/${quizData.length}</h2>
        <button onclick="location.reload()">Restart Quiz</button>
    `;
}