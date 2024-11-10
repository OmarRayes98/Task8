import App from "@/App";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import NotFoundLayout from "@/layouts/NotFoundLayout/NotFoundLayout";
import AddEditProduct from "@/pages/Dashboard/AddEditProduct";
import ProdcutDetails from "@/pages/Dashboard/ProdcutDetails";
import Products from "@/pages/Dashboard/Products";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <AuthLayout />,
        children: [
          {
            index:true,
            element: <SignIn/>,
          },
          {
            path:"signup",
            element: <SignUp/>,
          },
        ],
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index:true,
            element: <Products/>,
          },
          {
            path:"product-details/:id",
            element: <ProdcutDetails/>,
          },
          {
            path:"create-product",
            element: <AddEditProduct/>,
          },

          //by Id can seperate between : create or edit form 
          {
            path:"edit-product/:id",
            element: <AddEditProduct/>,
          },

          {
            path:"favorites",
            element: <h1>This page is under development</h1>,
          },

          {
            path:"order-list",
            element: <h1>This page is under development</h1>,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundLayout />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
