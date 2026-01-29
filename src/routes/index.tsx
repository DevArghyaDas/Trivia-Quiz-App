import FilterMenu from "@/components/myUi/FilterMenu";
import { seo } from "@/utils/seo";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      ...seo({
        title: "Home | Quiz app",
        description: "A quiz app using Trivia and react",
      }),
    ],
  }),
  component: App,
});

function App() {
  return (
    <>
      <div className="bg-[url('/bg-image1.jpg')] bg-cover min-h-screen flex items-center justify-center">
        <FilterMenu />
      </div>
    </>
  );
}
