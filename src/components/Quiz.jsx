import { useState, useCallback } from "react";

import QuestionTimer from "./QuestionTimer.jsx";

import QUESTIONS from '../question.js';
import quizCompletImg from '../assets/quiz-complete.png'

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectedAnswer = useCallback(function handleSelectedAnswer (selectedAnswer){
    setUserAnswers((prevUserAnsers) => {
      return [...prevUserAnsers, selectedAnswer];
    });
  }, []);

  const handleSkipAnswer = useCallback(() => handleSelectedAnswer(null),[handleSelectedAnswer]);

  if (quizIsComplete) {
    return (
      <div id='summary'>
        <img src={quizCompletImg} alt='quizz trophee'/>
        <h2>Quiz Completed</h2>
      </div>
    )
  };

  const shuffledAnswer = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswer.sort(() => Math.random() - 0.5);

  return (
    <div id='quiz'>
      <div id='question'>
      <QuestionTimer
        key={activeQuestionIndex}
        timeout={10000}
        onTimeout={handleSkipAnswer} />
          <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
          <ul id='answers'>
            {shuffledAnswer.map((answer) =>
              <li key={answer} className='answer'>
                <button onClick={() => handleSelectedAnswer(answer)}>{answer}</button>
              </li>
              )}
          </ul>
      </div>
    </div>
  );
};
