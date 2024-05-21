import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hook";
import { login } from "../features/authSlice";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MyError } from "../interface/error";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {data:user, status} = useSelector((state: RootState) => state.auth);
  const error = useSelector((state: RootState) => state.auth.error as MyError);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await dispatch(login(inputs));
      if (data.payload && "token" in data.payload) {
        window.localStorage.setItem("token", data.payload.token);
        navigate("/");
        toast.success("Login successful");
      }
    } catch (error) {
      toast.error(error as string);
    }
  };

  if (user && window.localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-96 border p-8">
        <h1 className="text-center text-3xl font-semibold mb-7">Login</h1>
        <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
          <div>
            <input
              type="email"
              name="email"
              className="border w-full p-2 outline-blue-500"
              placeholder="Email Address"
              required
              value={inputs.email}
              onChange={handleChange}
            />
            {error &&
              Array.isArray(error) &&
              error.some((err) => err.path === "email") && (
                <div className="text-red-500">
                  {error.find((err) => err.path === "email")?.msg}
                </div>
              )}
          </div>
          <div>
            <input
              type="password"
              name="password"
              min={5}
              className="border w-full p-2 outline-blue-500"
              placeholder="Password"
              required
              value={inputs.password}
              onChange={handleChange}
            />
            {error &&
              Array.isArray(error) &&
              error.some((err) => err.path === "password") && (
                <div className="text-red-500">
                  {error.find((err) => err.path === "password")?.msg}
                </div>
              )}
          </div>
          <div>
            {error && typeof error === "string" && (
              <div className="text-red-500">
                {error === "Password does not match our records" &&
                  "Password is incorrect, please check your password"}
                {error === "User is not found" &&
                  "Please check your email and password"}
              </div>
            )}
          </div>
          <h1 className="text-center">
            Not a Member?{" "}
            <Link to="/register">
              <span className=" text-blue-700 underline">Sign up</span>
            </Link>
          </h1>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-fit flex justify-center items-center gap-2 bg-blue-500 py-1 text-white px-3 rounded disabled:bg-blue-300 disabled:cursor-not-allowed"
              disabled={status === "loading"}
            >
              {status === "loading" && <LoadingSpinner />}
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
