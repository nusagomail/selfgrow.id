import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router";
import { AccountPage } from "./routes/account";
import { HomePage } from "./routes/home";
import { LoginPage } from "./routes/login";

const rootRoute = createRootRoute({ component: () => <Outlet /> });

const routeTree = rootRoute.addChildren([
  createRoute({ getParentRoute: () => rootRoute, path: "/", component: HomePage }),
  createRoute({ getParentRoute: () => rootRoute, path: "/masuk", component: LoginPage }),
  createRoute({ getParentRoute: () => rootRoute, path: "/akun", component: AccountPage }),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
