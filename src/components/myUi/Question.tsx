import { useContext, useEffect, useState } from "react";
import QuizContext from "./QuizContext";
import { TriviaResult } from "./Quiz";

const shuffle = (array: any) => {
  return array.sort(() => Math.random() - 0.5);
};

const Question = ({
  question,
  setIsAnswered,
  isAnswered,
}: {
  question: TriviaResult;
  setIsAnswered: any;
  isAnswered: boolean;
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  const contextValue = useContext(QuizContext);
  if (!contextValue) {
    return <div>Error: Quiz context not found</div>;
  }

  const [score, scoreDispatch, options, optionsDispatch] = contextValue;

  useEffect(() => {
    const shuffledOptions = shuffle([
      question.correct_answer,
      ...question.incorrect_answers,
    ]);
    optionsDispatch({
      type: "SET_OPTIONS",
      payload: shuffledOptions,
    });
  }, [question]);

  const selectOption = (opt: any) => {
    setSelectedOption(opt);
    if (opt === question.correct_answer) {
      scoreDispatch({
        type: "SET_SCORE",
        payload: (score as number) + 1,
      });
    }
    setIsAnswered(true);
  };

  // const displayedOptions = options as TriviaResult[];
  const displayedOptions = options as any[]; //eslint-disable-line @typescript-eslint/no-explicit-any
  return (
    <div>
      <div>
        <div className="text-2xl font-bold">
          <div dangerouslySetInnerHTML={{ __html: question.question }} />
        </div>
        <div className="my-3 flex flex-col justify-center items-start">
          {isAnswered
            ? displayedOptions.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  className={`list-item m-1 p-1 rounded-full disabled ${
                    opt === question.correct_answer &&
                    "bg-green-600 border border-green-500 text-white"
                  } ${
                    opt === selectedOption &&
                    opt !== question.correct_answer &&
                    "bg-red-500 border border-red-600 text-white"
                  }`}
                  disabled
                  onClick={() => selectOption(opt)}>
                  <div dangerouslySetInnerHTML={{ __html: opt }} />
                </button>
              ))
            : displayedOptions.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  className="list-item m-1 p-1 rounded-full hover:bg-sky-500 hover:text-white"
                  onClick={() => selectOption(opt)}>
                  <div dangerouslySetInnerHTML={{ __html: opt }} />
                </button>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
