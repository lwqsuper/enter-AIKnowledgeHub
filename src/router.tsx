import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DetailPage from "./pages/DetailPage";
import AdminDashboard from "./pages/Admin/Dashboard";

export const routers = [
    {
      path: "/",
      name: 'home',
      element: <Index />,
    },
    {
      path: "/admin",
      name: 'admin',
      element: <AdminDashboard />,
    },
    {
      path: "/detail/:type/:id",
      name: 'detail',
      element: <DetailPage />,
    },
    /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
    {
      path: "*",
      name: '404',
      element: <NotFound />,
    },
];

declare global {
  interface Window {
    __routers__: typeof routers;
  }
}

window.__routers__ = routers;
