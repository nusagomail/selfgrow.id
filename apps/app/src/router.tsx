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
import { useMe } from "./lib/use-me";
import { AccountPage } from "./routes/account";
import { HomePage, LibraryRedirect } from "./routes/home";
import { LoginPage } from "./routes/login";

/** Menu atas: Beranda & Profil untuk semua, Studio hanya untuk admin. */
function TopNav() {
  const me = useMe();
  const isAdmin = me.status === "ready" && me.me.user.role === "admin";
  return (
    <nav className="topnav" aria-label="Menu aplikasi">
      <Link to="/" activeOptions={{ exact: true }}>
        Beranda
      </Link>
      <Link to="/akun">Profil</Link>
      {isAdmin && <Link to="/studio">Studio</Link>}
    </nav>
  );
}

function RootLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <>
      {path !== "/masuk" && (
        <header className="topbar-wrap">
          <div className="topbar">
            <Link to="/" className="brand" aria-label="SelfGrow, ke beranda">
              <Logo height={32} />
            </Link>
            <TopNav />
          </div>
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
const studioSecurity = () => import("./studio/security");
const programPage = () => import("./programs/page");
const watchPage = () => import("./videos/page");
const videoBuilder = () => import("./studio/video-builder");

const routeTree = rootRoute.addChildren([
  createRoute({ getParentRoute: () => rootRoute, path: "/", component: HomePage }),
  createRoute({ getParentRoute: () => rootRoute, path: "/masuk", component: LoginPage }),
  createRoute({ getParentRoute: () => rootRoute, path: "/akun", component: AccountPage }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/perpustakaan",
    component: LibraryRedirect,
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
    path: "/studio/keamanan",
    component: lazyRouteComponent(studioSecurity, "StudioSecurity"),
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
    path: "/tonton/$slug",
    component: lazyRouteComponent(watchPage, "WatchPage"),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/studio/video/$id",
    component: lazyRouteComponent(videoBuilder, "StudioVideo"),
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
