import { Particle } from "@/components/myUi/Particle";
import Quiz from "@/components/myUi/Quiz";
import { seo } from "@/utils/seo";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/quiz/$type/$slug")({
  head: () => ({
    meta: [
      ...seo({
        title: "Questions | Quiz app",
        description: "A quiz app using Trivia and react",
      }),
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      {/* <div className="bg-[url('/eye.gif')] bg-no-repeat min-h-screen flex items-center justify-center"> */}
      <Quiz />
      <Particle />
      {/* </div> */}
    </>
  );
}
