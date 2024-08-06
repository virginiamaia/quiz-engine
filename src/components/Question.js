import React from 'react';

const Question = ({ question, onAnswer, selectedAnswers }) => {
  const renderOptions = () => {
    return question.options.map((option, index) => (
      <div key={index}>
        <input
          type={question.type === 'one-choice' ? 'radio' : 'checkbox'}
          name={`question-${question.id}`}
          value={index}
          checked={question.type === 'one-choice' ? (selectedAnswers === index.toString()) : (selectedAnswers[index] === true)}
          onChange={onAnswer}
        />
        <label>{option}</label>
      </div>
    ));
  };

  const renderInput = () => (
    <input type="text" name={`question-${question.id}`} onChange={onAnswer} />
  );

  return (
    <div>
      <h2>{question.title}</h2>
      {question.type === 'input' ? renderInput() : renderOptions()}
    </div>
  );
};

export default Question;
