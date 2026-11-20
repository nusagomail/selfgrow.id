import {
  createRootRoute,
  createRoute,
  createRouter,
  Link,
  lazyRouteComponent,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { Logo } from "./components/logo";
import { AccountPage } from "./routes/account";
import { HomePage } from "./routes/home";
import { LoginPage } from "./routes/login";

function RootLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <>
      {path !== "/masuk" && (
        <header className="topbar">
          <Link to="/" aria-label="SelfGrow, ke beranda">
            <Logo height={32} />
          </Link>
        </header>
      )}
      <Outlet />
    </>
  );
}

const rootRoute = createRootRoute({ component: RootLayout });

// Studio (Tiptap) dan reader dimuat terpisah supaya bundle awal tetap kecil (BLUEPRINT bagian 10).
const studio = () => import("./studio/pages");
const reader = () => import("./reader/pages");
const toolBuilder = () => import("./studio/tool-builder");
const toolPage = () => import("./tools/page");
const templateBuilder = () => import("./studio/template-builder");
const templatePage = () => import("./templates/page");
const programBuilder = () => import("./studio/program-builder");
const programPage = () => import("./programs/page");

const routeTree = rootRoute.addChildren([
  createRoute({ getParentRoute: () => rootRoute, path: "/", component: HomePage }),
  createRoute({ getParentRoute: () => rootRoute, path: "/masuk", component: LoginPage }),
  createRoute({ getParentRoute: () => rootRoute, path: "/akun", component: AccountPage }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/perpustakaan",
    component: lazyRouteComponent(reader, "LibraryPage"),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/baca/$slug",
    component: lazyRouteComponent(reader, "EbookToc"),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/baca/$slug/$chapterId",
    component: lazyRouteComponent(reader, "ChapterReader"),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/studio",
    component: lazyRouteComponent(studio, "StudioHome"),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/studio/tool/$id",
    component: lazyRouteComponent(toolBuilder, "StudioTool"),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/studio/template/$id",
    component: lazyRouteComponent(templateBuilder, "StudioTemplate"),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/studio/program/$id",
    component: lazyRouteComponent(programBuilder, "StudioProgram"),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/program/$slug",
    component: lazyRouteComponent(programPage, "ProgramPage"),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/template/$slug",
    component: lazyRouteComponent(templatePage, "TemplatePage"),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/tools/$slug",
    component: lazyRouteComponent(toolPage, "ToolPage"),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/studio/ebook/$id",
    component: lazyRouteComponent(studio, "StudioEbook"),
  }),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
