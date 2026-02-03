import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DetailPage from "./pages/DetailPage";
import AdminDashboard from "./pages/Admin/Dashboard";
import NewsDetail from "./pages/NewsDetail";
import NewsList from "./pages/NewsList";
import AILearningPath from "./pages/AILearningPath";

export const routers = [
    {
      path: "/",
      name: 'home',
      element: <Index />,
    },
    {
      path: "/news",
      name: 'news-list',
      element: <NewsList />,
    },
    {
      path: "/learning-path",
      name: 'learning-path',
      element: <AILearningPath />,
    },
    {
      path: "/admin",
      name: 'admin',
      element: <AdminDashboard />,
    },
    {
      path: "/detail/news/:id",
      name: 'news-detail',
      element: <NewsDetail />,
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
