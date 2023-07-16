import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AllBooksScreen from "../pages/all-books/AllBooksScreen";
import LoginScreen from "../pages/auth/LoginScreen";
import RegisterScreen from "../pages/auth/RegisterScreen";
import ErrorScreen from "../pages/error/ErrorScreen";
import HomeScreen from "../pages/home/HomeScreen";

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
        element: <AllBooksScreen />,
      },
    ],
  },
]);

export default router;
