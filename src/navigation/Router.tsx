import CreateVocal from "@/pages/CreateVocal";
import Layout from "@/pages/Layout";
import VocalList from "@/pages/VocalList";
import { createBrowserRouter, RouterProvider } from "react-router";
let routes = createBrowserRouter([
  {
    path: "/vocals",
    element: (
      <Layout>
        <VocalList />
      </Layout>
    ),
  },
  {
    path: "/vocals/create",
    element: (
      <Layout>
        <CreateVocal />
      </Layout>
    ),
  },
]);

const Router = () => {
  return <RouterProvider router={routes} />;
};
export default Router;
