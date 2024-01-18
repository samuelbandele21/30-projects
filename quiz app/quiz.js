const questions = [
    {
        question: "Which is the largest animal in the world",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "What is the capital of Canada",
        answers: [
            {text: "Ottawa", correct: true},
            {text: "Ontario", correct: false},
            {text: "Hamilton", correct: false},
            {text: "Calgary", correct: false},
        ]
    },
    {
        question: "Which continent is Nigeria located",
        answers: [
            {text: "Asia", correct: false},
            {text: "Europe", correct: false},
            {text: "South America", correct: false},
            {text: "Africa", correct: true},
        ]
    },
    {
        question: "Which is the largest country in the world",
        answers: [
            {text: "Egypt", correct: false},
            {text: "Germany", correct: false},
            {text: "Russia", correct: true},
            {text: "Canada", correct: false},
        ]
    }
]

const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-button")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0
let score = 0

//function that starts quiz, initializes the question number
// and calls showQuestion function

function startQuiz() {
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next"
    showQuestion()
}

function showQuestion() {
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text      //adding the answer list to answers
        button.classList.add("btn")
        answerButtons.appendChild(button)

        //Adding an eventListener to the answer buttons
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
}

//function to clear the remove the 1st child of the answer list
//which is the list of answers in the HTML document
//remember, the answer list from the quiz were added with "answerButtons.appendChild"
function resetState(e) {
    nextButton.style.display = "none"
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

//function that adds classList to selected answers (correct and incorrect)
function selectAnswer(e) {
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"

    if (isCorrect) {
        selectedBtn.classList.add("correct")  
        score++         //increase your score for every correct answer      
    } else {
        selectedBtn.classList.add("incorrect")
    }

    //dissable select option after one answer is selected
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = true
    })
    nextButton.style.display = "block" //display next button to help move to next question
}

function handleNextButton() {
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        showQuestion()       
    } else {
        showScore()
    }
}

//write a function to activate the next button
nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length) {
        handleNextButton()
    } else {
        startQuiz()
    }    
})    

function showScore() {
    resetState()
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play again"
    nextButton.style.display = "block"
}

startQuiz()

