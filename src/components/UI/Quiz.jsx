import React, { useState } from 'react';
import '../../styles/quiz.css';

const Quiz = () => {
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(0);

    const questions = [
        {
            questionText: 'What is the recommended amount of daily exercise for children?',
            answerOptions: [
                { answerText: '30 minutes', isCorrect: false },
                { answerText: '60 minutes', isCorrect: true },
                { answerText: '90 minutes', isCorrect: false },
                { answerText: '120 minutes', isCorrect: false },
            ],
        },
        {
            questionText: 'Which of these activities is considered a cardiovascular exercise?',
            answerOptions: [
                { answerText: 'Weight lifting', isCorrect: false },
                { answerText: 'Jumping jacks', isCorrect: true },
                { answerText: 'Stretching', isCorrect: false },
                { answerText: 'Reading', isCorrect: false },
            ],
        },
        {
            questionText: 'Which of the following is a healthy snack?',
            answerOptions: [
                { answerText: 'Chips', isCorrect: false },
                { answerText: 'Cookies', isCorrect: false },
                { answerText: 'Fruit', isCorrect: true },
                { answerText: 'Candy', isCorrect: false },
            ],
        },
        {
            questionText: 'How many servings of fruits and vegetables should you eat each day?',
            answerOptions: [
                { answerText: '1-2', isCorrect: false },
                { answerText: '3-4', isCorrect: false },
                { answerText: '5 or more', isCorrect: true },
                { answerText: 'It does not matter', isCorrect: false },
            ],
        },
        {
            questionText: 'What is flexibility?',
            answerOptions: [
                { answerText: 'The ability to run fast', isCorrect: false },
                { answerText: 'The ability to lift heavy weights', isCorrect: false },
                { answerText: 'The ability to balance on one foot', isCorrect: false },
                { answerText: 'The ability to bend and stretch easily', isCorrect: true },
            ],
        },
    ];

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const retryQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
    }

    return (
        <div className='quiz' >
            <h1 className="section__title" >ActiveKids
                <span className="highlights"> Quiz</span>

            </h1>
            {showScore ? (
                <div className='score-section'>
                    <div className="result">
                    You scored {score} out of {questions.length}
                </div>
                    <button className='play_again-btn' onClick={retryQuiz}>Play Again<i class="ri-restart-line"></i></button>
                </div>
            ) : (
                <>
                    <div className='question-section' data-aos='fade-up'>
                        <div className="question-count">
                            <span>Question {currentQuestion + 1}</span>/{questions.length}
                        </div>

                        <div className="question-text">{questions[currentQuestion].questionText}</div>
                    </div>
                    <div className="answer-section" data-aos='fade-up'>
                        {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                            <button className='quiz-btn' key={index} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>
                                {answerOption.answerText}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Quiz