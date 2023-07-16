import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomeScreen from "../pages/home/HomeScreen";
import LoginScreen from "../pages/auth/LoginScreen";
import RegisterScreen from "../pages/auth/RegisterScreen";
import AllBooksScreen from "../pages/all-books/AllBooksScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
