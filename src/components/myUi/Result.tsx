import { useNavigate, useRouter } from "@tanstack/react-router";
import { useContext, useEffect, useState } from "react";
import QuizContext from "./QuizContext";

const Result = () => {
  const [highscore, setHighScore] = useState<string | null>(
    localStorage.getItem("highScore"),
  );
  const [score, scoreDispatch] = useContext(QuizContext) || [null, () => {}];
  const navigate = useNavigate();
  const route = useRouter();

  useEffect(() => {
    if (score === null) {
      navigate({ to: "/" });
    } else if ((score as number) > parseInt(highscore?.toString() || "0")) {
      setHighScore(score.toString());
      localStorage.setItem("highScore", JSON.stringify(score));
    }
  }, []);

  const goToMainMenu = () => {
    scoreDispatch({
      type: "RESET_SCORE",
    });
    navigate({ to: "/" });
  };

  const retakeQuiz = () => {
    scoreDispatch({
      type: "RESET_SCORE",
    });
    // navigate({ to: "-1" });
    route.history.back();
  };

  const scorePercentage = Math.round(((score as number) / 10) * 100);
  const highScorePercentage =
    highscore === null ? 0 : Math.round((parseFloat(highscore) / 10) * 100);

  return (
    <>
      <div className="text-4xl my-4">RESULT</div>
      <div className="flex border flex-col p-4 justify-center items-center gap-4 rounded-lg bg-card">
        <div
          className={`${
            scorePercentage > 40 ? "bg-green-600" : "bg-red-600"
          } my-2 p-3 rounded-lg text-center text-xl md:text-3xl font-bold`}>
          You scored {score} out of {10} ({scorePercentage}%)
        </div>
        <div className="my-2 text-2xl">
          Highscore: {highscore || 0} ({highScorePercentage}%)
        </div>
        <div className="flex items-center justify-center my-3 w-full ">
          <button
            className="bg-sky-600 hover:bg-sky-700 p-3 rounded-md cursor-pointer mx-3"
            onClick={goToMainMenu}>
            Main Menu
          </button>
          <button
            className="bg-sky-600 hover:bg-sky-700 p-3 rounded-md cursor-pointer mx-3"
            onClick={retakeQuiz}>
            Retake Quiz
          </button>
        </div>
      </div>
    </>
  );
};

export default Result;
