import React from 'react';

function Question({ question, options, selectedAnswer, onAnswerSelected }) {
  return (
    <div className="text-gray-800">
      <h2 className="text-2xl font-semibold mb-4">{question}</h2>
      <ul className="space-y-4">
        {options.map((option, index) => (
          <li key={index}>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value={option}
                checked={selectedAnswer === option}
                onChange={() => onAnswerSelected(option)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-gray-900">{option}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Question;
