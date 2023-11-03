import React, { useState, useEffect } from 'react';
import Question from './Question';
import Result from './Result';

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function QuizApp() {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [canMoveToNext, setCanMoveToNext] = useState(false);
  const [canMoveToPrev, setCanMoveToPrev] = useState(false);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    // Load quiz data from the JSON file and shuffle the questions
    fetch('/question.json')
      .then((response) => response.json())
      .then((data) => {
        setQuizData(shuffleArray(data));
        setStartTime(new Date());
      });
  }, []);

  useEffect(() => {
    if (currentQuestionIndex < quizData.length) {
      setTimeRemaining(15);

      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime === 0) {
            clearInterval(timer);
            if (canMoveToNext || !selectedAnswers[currentQuestionIndex]) {
              handleAnswerSelected('');
              handleNextClick();
            }
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [currentQuestionIndex, quizData, canMoveToNext, selectedAnswers]);

  const handleAnswerSelected = (answer) => {
    const correctAnswer = quizData[currentQuestionIndex].answer;

    if (answer === correctAnswer) {
      setScore(score + 1);
    }

    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answer,
    });

    setCanMoveToNext(true);
  };

  const totalQuestions = quizData.length;

  const handleNextClick = () => {
    if (canMoveToNext) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCanMoveToNext(false);
      setCanMoveToPrev(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setScore(0);
    setTimeRemaining(15);
    setCanMoveToNext(true);
    setCanMoveToPrev(false);
    setStartTime(new Date());
  };

  const handlePrevClick = () => {
    if (canMoveToPrev && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setCanMoveToPrev(currentQuestionIndex > 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-200 to-white">
      {currentQuestionIndex < totalQuestions ? (
        <div className="h-screen flex flex-col justify-center items-center">
          <div className="shadow-xl px-[96px] p-8 rounded-xl text-center">
            <p className="text-3xl font-semibold mb-2 text-gray-900">
              Question {currentQuestionIndex + 1}/{totalQuestions}
            </p>
            <p className="absolute top-4 left-4 text-xl font-semibold mb-4 text-red-400">
              Time Remaining: {timeRemaining} seconds
            </p>
            <Question
              question={quizData[currentQuestionIndex].question}
              options={quizData[currentQuestionIndex].options}
              selectedAnswer={selectedAnswers[currentQuestionIndex]}
              onAnswerSelected={handleAnswerSelected}
            />
            <div className="mt-4 space-x-4">
              <button
                onClick={handlePrevClick}
                className={`px-4 py-2 text-white rounded ${
                  canMoveToPrev
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={!canMoveToPrev}
              >
                Previous
              </button>
              <button
                onClick={handleNextClick}
                className={`px-4 py-2 text-white rounded ${
                  canMoveToNext
                    ? 'bg-blue-500 hover-bg-blue-600'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={!canMoveToNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
       <Result score={score} totalQuestions={totalQuestions} startTime={startTime} resetQuiz={resetQuiz} />
      )}
    </div>
  );
}

export default QuizApp;
