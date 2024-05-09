import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import Header from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./app/pages/Home"
import Story from "./app/pages/Story"
import Login from "./app/pages/Login"
import Register from "./app/pages/Register"
import Write from "./app/pages/Write"

export const Layout = () => {
  return (
    <>
     <Header />
     <Outlet />
     <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/story/:id",
        element: <Story />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/write",
        element: <Write />
      }
    ]
  }
])

export default function App(){
  return <RouterProvider router={router} />
}