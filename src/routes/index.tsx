import App from "@/App";
import ProtectedRequirdAuth from "@/components/Auth/ProtectedRequirdAuth";
import ProtectedRequiredUnAuth from "@/components/Auth/ProtectedRequiredUnAuth";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import NotFoundLayout from "@/layouts/NotFoundLayout/NotFoundLayout";
import AddEditProduct from "@/pages/Dashboard/AddEditProduct";
import ProdcutDetails from "@/pages/Dashboard/ProdcutDetails";
import Products from "@/pages/Dashboard/Products";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import { NuqsAdapter } from 'nuqs/adapters/react-router'

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
        <ProtectedRequiredUnAuth>
          <AuthLayout />
          </ProtectedRequiredUnAuth>
          ),
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
        element:(
          <ProtectedRequirdAuth>
          <DashboardLayout />
          </ProtectedRequirdAuth>
          ),
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
  return <NuqsAdapter><RouterProvider router={router} /></NuqsAdapter>;
};

export default AppRouter;
