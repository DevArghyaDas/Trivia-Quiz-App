import Result from "@/components/myUi/Result";
import { seo } from "@/utils/seo";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/result")({
  head: () => ({
    meta: [
      ...seo({
        title: "Result | Quiz app",
        description: "A quiz app using Trivia and react",
      }),
    ],
  }),
  component: App,
});

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-[url('/bg-image2.jpg')] bg-cover">
      <Result />
    </div>
  );
};
