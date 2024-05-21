import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Story from "./pages/Story";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Write from "./pages/Write";
import { useAppDispatch } from "./app/hook";
import { useEffect, useState } from "react";
import axios from "./axios";
import { account } from "./features/authSlice";
import LoadingSpinner from "./components/LoadingSpinner";

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/story/:id",
        element: <Story />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/update/:id",
        element: <Write />,
      },
    ],
  },
]);

export default function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    setTimeout(() => {
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        dispatch(account())
          .then(() => setLoading(false))
          .catch(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }, 2000);
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-black">
        <LoadingSpinner className="w-12 h-12 text-blue-500" />
      </div>
    );
  }

  return <RouterProvider router={router} />;
}
