import React, { useState } from 'react';
import questionsData from '../data/questions.json';
import Question from './Question';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [fontSize, setFontSize] = useState(16);
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setAnswers(prevAnswers => ({
        ...prevAnswers,
        [name]: {
          ...(prevAnswers[name] || {}),
          [value]: checked,
        },
      }));
    } else {
      setAnswers(prevAnswers => ({
        ...prevAnswers,
        [name]: value,
      }));
    }
  };

  const handleNext = () => {
    const currentQuestion = questionsData[currentQuestionIndex];
    let isCorrect = false;

    if (currentQuestion.type === 'one-choice') {
      const selectedAnswerIndex = answers[`question-${currentQuestion.id}`];
      if (selectedAnswerIndex !== undefined) {
        isCorrect = parseInt(selectedAnswerIndex, 10) === currentQuestion.correctOption;
        alert(isCorrect 
          ? 'Correct answer!' 
          : `Incorrect answer. The correct answer is: ${currentQuestion.options[currentQuestion.correctOption]}`);
      } else {
        alert('No option selected.');
      }
    } 
    
    if (currentQuestion.type === 'multiple-choice') {
      const selectedAnswers = answers[`question-${currentQuestion.id}`] || {};
      const correctAnswers = new Set(currentQuestion.correctOptions.map(index => index.toString())); // Converte para string
      const userAnswers = new Set(Object.keys(selectedAnswers).filter(key => selectedAnswers[key] === true));

      isCorrect = correctAnswers.size === userAnswers.size && [...correctAnswers].every(answer => userAnswers.has(answer));
      alert(isCorrect 
        ? 'Correct answer!' 
        : `Incorrect answer. The correct answers are: ${currentQuestion.correctOptions.map(index => currentQuestion.options[index]).join(', ')}`);
    }
    
    if (currentQuestion.type === 'input') {
      const userAnswer = answers[`question-${currentQuestion.id}`] || '';
      isCorrect = userAnswer.trim() === currentQuestion.correctAnswer.trim();
      alert(isCorrect 
        ? 'Correct answer!' 
        : `Incorrect answer. The correct answer is: ${currentQuestion.correctAnswer}`);
    }
    
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsComplete(true); 
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsComplete(false); 
    setFontSize(16); 
  };

  const calculateProgress = () => {
    return ((currentQuestionIndex + 1) / questionsData.length) * 100;
  };

  const currentQuestion = questionsData[currentQuestionIndex];

  return (
    <div>
      <div className="progress-bar" style={{ width: `${calculateProgress()}%` }}></div>
      <div className="zoom-controls">
        <button onClick={() => setFontSize(fontSize + 2)}>Increase Zoom</button>
        <button onClick={() => setFontSize(fontSize - 2)}>Decrease Zoom</button>
      </div>
      <div className="question-container" style={{ fontSize: `${fontSize}px` }}>
        {isComplete ? (
          <div>
            <div>Quiz complete!</div>
            <button className="restart-button" onClick={handleRestart}>Restart</button>
          </div>
        ) : (
          <div>
            <Question 
              question={currentQuestion} 
              onAnswer={handleAnswer} 
              selectedAnswers={answers[`question-${currentQuestion.id}`] || {}} // Passar o estado para o componente Question
            />
            <button onClick={handleNext}>
              {currentQuestionIndex < questionsData.length - 1 ? 'Next' : 'Finish'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
