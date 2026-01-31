import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useContext, useState } from "react";
import Question from "./Question";
import QuizContext from "./QuizContext";
import { Progress } from "../ui/progress";
import getQuestions from "@/hooks/getQuestions";
export interface TriviaApiResponse {
  response_code: number;
  results: TriviaResult[];
}

export interface TriviaResult {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const Quiz = () => {
  const navigate = useNavigate();

  const [isAnswered, setIsAnswered] = useState(false);

  const { slug, type } = useParams({ from: "/quiz/$type/$slug" });
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const context = useContext(QuizContext);
  const [score, scoreDispatch] = context || [null, () => {}];

  const nextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
    setIsAnswered(false);
  };

  const finishQuiz = () => {
    if (score === null) {
      scoreDispatch({
        type: "SET_SCORE",
        payload: 0,
      });
    }
    setIsAnswered(false);
    navigate({ to: "/result" });
  };

  const result = useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const success = await getQuestions({ category: type, difficulty: slug });
      if (!success) {
        throw new Error("Failed to fetch questions");
      }
      return success;
    },

    refetchOnWindowFocus: false,
  });

  // console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return (
      <div className="flex flex-column items-center justify-center my-5">
        <div className="mt-20 text-3xl font-bold">Loading questions ... </div>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="flex flex-column items-center justify-center my-5">
        <div className="my-2 text-4xl font-bold">An Error Occurred</div>
        <button
          className={`cursor-pointer py-2 px-3 rounded-md bg-teal-500 hover:bg-teal-600 align-baseline ${
            isAnswered === false && "disabled"
          }`}
          onClick={nextQuestion}>
          Reload
        </button>
      </div>
    );
  }

  const questions = result.data as TriviaApiResponse;

  return (
    <div className="my-5 flex flex-col justify-center items-center h-[70dvh]">
      <div className="flex flex-column justify-between items-start w-lg bg-card p-3 rounded-md">
        <div
          className={`${slug === "hard" ? "bg-red-700" : slug === "medium" ? "bg-amber-600" : slug === "easy" ? "bg-green-600" : ""} p-2 rounded-lg text-black font-bold space-x-2 text-xl capitalize`}>
          Difficulty : {slug}
        </div>

        <span className="my-2 text-xl">Question {currentQuestion + 1}/10</span>
      </div>
      <div className="backdrop-blur-sm my-4 p-4 rounded-lg flex flex-col justify-center max-w-2xl border mx-auto">
        <Progress
          value={(currentQuestion + 1) * 10}
          className={`w-full mb-4 ${currentQuestion + 1 < 6 ? "bg-amber-500" : "bg-green-600"}`}
        />
        <Question
          question={questions.results[currentQuestion]}
          setIsAnswered={setIsAnswered}
          isAnswered={isAnswered}
        />
        {questions.results.length === currentQuestion + 1 ? (
          <button
            className={`py-2 px-4 rounded-md bg-sky-500 hover:bg-sky-600 cursor-pointer ${
              isAnswered === false && "disabled"
            }`}
            onClick={finishQuiz}>
            Finish
          </button>
        ) : (
          <button
            className={`py-2 px-4 rounded-md bg-sky-500 hover:bg-sky-600 cursor-pointer ${
              isAnswered === false && "disabled"
            }`}
            onClick={nextQuestion}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
