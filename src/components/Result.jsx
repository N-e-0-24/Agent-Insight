import React from 'react';

function Result(props) {
  const { score, totalQuestions, startTime, resetQuiz } = props;

  let elapsedTime = 'N/A';
  if (startTime) {
    const endTime = new Date();
    elapsedTime = ((endTime - startTime) / 1000).toFixed(1);
  }

  return (
    <div className="text-center p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-blue-600 mb-4">Quiz Results</h2>
      <p className="text-lg font-medium text-gray-700 mb-2">
        Your Score: <span className="text-green-500">{score}</span> out of <span className="text-blue-500">{totalQuestions}</span>
      </p>
      <p className="text-lg font-medium text-gray-700">
        Time Taken: <span className="text-blue-500">{elapsedTime} seconds</span>
      </p>
      <div className="mt-8">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          onClick={resetQuiz}
        >
          Start Another Quiz
        </button>
      </div>
    </div>
  );
}

export default Result;
