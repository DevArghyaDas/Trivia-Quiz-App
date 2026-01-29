import { TanStackDevtools } from "@tanstack/react-devtools";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import Header from "../components/Header";

import { QuizContextProvider } from "@/components/myUi/QuizContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import appCss from "../styles.css?url";
import NotFound from "@/components/myUi/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  shellComponent: RootComponent,
  notFoundComponent: () => <NotFound />,
});
function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}
function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <Header />
          <QuizContextProvider>
            <main className="">{children}</main>
          </QuizContextProvider>
        </QueryClientProvider>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
