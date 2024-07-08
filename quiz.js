document.addEventListener('DOMContentLoaded', () => {
    const submitQuizBtn = document.getElementById('submit-quiz-btn');
    const quizQuestions = document.getElementById('quiz-questions');
    const resultsSection = document.getElementById('results');
    const resultsText = document.getElementById('results-text');
    const quizData = JSON.parse(localStorage.getItem('quizData'));

    if (quizData) {
        renderQuiz();
    } else {
        alert('No quiz data found. Please create a quiz first.');
        return;
    }

    submitQuizBtn.addEventListener('click', () => {
        const selectedOptions = document.querySelectorAll('.option-btn.selected');
        let correctAnswers = 0;

        selectedOptions.forEach((option, index) => {
            if (option.dataset.value === quizData[index].correctOption) {
                correctAnswers++;
            }
        });

        resultsSection.style.display = 'block';
        resultsText.textContent = `You got ${correctAnswers} out of ${quizData.length} correct!`;
    });

    function renderQuiz() {
        quizData.forEach((item, index) => {
            const quizItem = document.createElement('div');
            quizItem.className = 'quiz-item';
            quizItem.innerHTML = `
                <p>${index + 1}. ${item.question}</p>
                ${item.options.map((option, i) => `
                    <button class="option-btn" data-value="${i + 1}">${option}</button>
                `).join('')}
            `;
            quizQuestions.appendChild(quizItem);
        });

        document.querySelectorAll('.option-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const parent = event.target.parentElement;
                parent.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
                event.target.classList.add('selected');
            });
        });
    }
});
