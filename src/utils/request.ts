import { TriviaApiResponse } from "@/components/myUi/Quiz";
import ky from "ky";
import { RateLimiter } from "./rLimit";
const baseUrl = "https://opentdb.com/api.php?amount=10&type=multiple";
const apiLimiter = new RateLimiter({ maxCalls: 5, timeWindow: 1000 });
export const getQuestions = async ({
  category,
  difficulty,
}: {
  category: string;
  difficulty: string;
}) => {
  const res = await apiLimiter.execute(
    async () =>
      await ky.get(
        `${baseUrl}&difficulty=${difficulty}&category=${category}`,
        // `https://opentdb.com/api.php?amount=10&type=multiple&difficulty=${difficulty}&category=${category}`,
        { retry: 1 },
      ),
  );
  if (!res) {
    return null;
  }
  const data = (await res.json()) as TriviaApiResponse;

  return data;
};

export const categories = [
  { label: "General Knowledge", value: 9 },
  { label: "Entertaiment: Music", value: 12 },
  { label: "Science and Nature", value: 17 },
  { label: "Sports", value: 21 },
  { label: "Geography", value: 22 },
];

export const difficulty = ["easy", "medium", "hard"];
