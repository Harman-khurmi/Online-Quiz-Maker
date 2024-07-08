document.addEventListener('DOMContentLoaded', () => {
    const addQuestionBtn = document.getElementById('add-question-btn');
    const removeQuestionBtn = document.getElementById('remove-question-btn');
    const sendQuizBtn = document.getElementById('send-quiz-btn');
    const questionsContainer = document.getElementById('questions-container');
    let quizData = [];

    addQuestionBtn.addEventListener('click', () => {
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        questionItem.innerHTML = `
            <input type="text" placeholder="Enter question" class="question-input">
            <input type="text" placeholder="Enter option 1" class="option-input">
            <input type="text" placeholder="Enter option 2" class="option-input">
            <input type="text" placeholder="Enter option 3" class="option-input">
            <input type="text" placeholder="Enter option 4" class="option-input">
            <input type="text" placeholder="Enter correct option number (1-4)" class="correct-option-input">
        `;
        questionsContainer.appendChild(questionItem);
    });

    removeQuestionBtn.addEventListener('click', () => {
        const questionItems = document.querySelectorAll('.question-item');
        if (questionItems.length > 1) {
            questionsContainer.removeChild(questionItems[questionItems.length - 1]);
        } else {
            alert('At least one question is required.');
        }
    });

    sendQuizBtn.addEventListener('click', () => {
        const questionInputs = document.querySelectorAll('.question-input');
        const optionInputs = document.querySelectorAll('.option-input');
        const correctOptionInputs = document.querySelectorAll('.correct-option-input');
        quizData = [];

        questionInputs.forEach((input, index) => {
            const question = input.value;
            const options = Array.from(optionInputs).slice(index * 4, index * 4 + 4).map(option => option.value);
            const correctOption = correctOptionInputs[index].value;
            if (question && options.every(option => option) && correctOption) {
                quizData.push({ question, options, correctOption });
            }
        });

        if (quizData.length > 0) {
            localStorage.setItem('quizData', JSON.stringify(quizData));
            alert('Quiz has been created! Share the link below with someone to take the quiz.');
            const link = `${window.location.origin}/quiz.html`;
            prompt('Copy this link and share it:', link);
        } else {
            alert('Please add valid questions, options, and correct answers.');
        }
    });
});
