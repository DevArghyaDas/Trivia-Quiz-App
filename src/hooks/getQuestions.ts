import { TriviaApiResponse } from "@/components/myUi/Quiz";
import { RateLimiter } from "@/utils/rLimit";
import ky from "ky";

const baseUrl = "https://opentdb.com/api.php?amount=10&type=multiple";
const apiLimiter = new RateLimiter({ maxCalls: 5, timeWindow: 1000 });

const getQuestions = async ({
  category,
  difficulty,
}: {
  category: string;
  difficulty: string;
}) => {
  try {
    const res = await apiLimiter.execute(() =>
      ky.get(
        `${baseUrl}&difficulty=${difficulty}&category=${category}`,
        // `https://opentdb.com/api.php?amount=10&type=multiple&difficulty=${difficulty}&category=${category}`,
      ),
    );
    if (!res) {
      return null;
    }
    const data = (await res.json()) as TriviaApiResponse;

    return data;
  } catch (error: any) {
    console.log("Error fetching questions:", error.message);
  }
};

export default getQuestions;
