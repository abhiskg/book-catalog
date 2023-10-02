import AddBook from "@/pages/Books/AddBook";
import AllBooks from "@/pages/Books/AllBooks";
import SingleBook from "@/pages/Books/SingleBook";
import UpdateBook from "@/pages/Books/UpdateBook";
import PlanToRead from "@/pages/PlanToRead/PlanToRead";
import Wishlist from "@/pages/Wishlist/Wishlist";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import LoginScreen from "../pages/auth/LoginScreen";
import RegisterScreen from "../pages/auth/RegisterScreen";
import ErrorScreen from "../pages/error/ErrorScreen";
import HomeScreen from "../pages/home/HomeScreen";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: "/",
        element: <HomeScreen />,
      },
      {
        path: "/sign-in",
        element: <LoginScreen />,
      },
      {
        path: "/sign-up",
        element: <RegisterScreen />,
      },
      {
        path: "/all-books",
        element: <AllBooks />,
      },
      {
        path: "/add-new-book",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/book/:id",
        element: <SingleBook />,
      },
      {
        path: "/update-book/:id",
        element: <UpdateBook />,
      },
      {
        path: "/book/wishlist",
        element: (
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        ),
      },
      {
        path: "/book/plan-to-read",
        element: (
          <PrivateRoute>
            <PlanToRead />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
