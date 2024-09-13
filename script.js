const questions = [
    {
        question: "Which country hosted the 2024 Summer Olympics?",
        answers: [
            { text: "United States", correct: false },
            { text: "Brazil", correct: false },
            { text: "France", correct: true },
            { text: "Japan", correct: false }
        ]
    },
    {
        question: "Which Cricket team won the Men's 2023 World Cup?",
        answers: [
            { text: "South Africa", correct: false },
            { text: "England", correct: false },
            { text: "Australia", correct: true },
            { text: "India", correct: false }
        ]
    },
    
    // Add more questions as needed
];

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultContainer = document.getElementById('result-container');
const resultMessage = document.getElementById('result-message');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex, score;

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    questionContainerElement.classList.remove('hide');
    resultContainer.classList.add('hide');
    nextButton.classList.add('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
    });
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        showResult();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showResult() {
    questionContainerElement.classList.add('hide');
    resultContainer.classList.remove('hide');

    // Determine the message based on the score
    let message;
    if (score === 2) {
        message = "Congratulations! You scored 2/2. Well done!";
    } else if (score === 1) {
        message = "You scored 1/2. Almost there!";
    } else if (score === 0) {
        message = "Better luck next time! You scored 0/2.";
    } else {
        message = "Your Score: " + score + "/2";
    }

    resultMessage.textContent = message;
}



nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion();
});

restartButton.addEventListener('click', startGame);

document.addEventListener('DOMContentLoaded', () => {
    startGame();
});
