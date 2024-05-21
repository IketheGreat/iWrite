import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { register } from "../features/authSlice";
import { useAppDispatch } from "../app/hook";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { toast } from "react-toastify";
import { MyError } from "../interface/error";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {data:user, status} = useSelector((state: RootState) => state.auth);
  const error = useSelector((state: RootState) => state.auth.error as MyError);

  const [inputs, setInputs] = useState({
    username: "",
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
      const data = await dispatch(register(inputs));
      if (data.payload && "token" in data.payload) {
        window.localStorage.setItem("token", data.payload.token);
        toast.success("Registeration successful!");
        navigate("/");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  if (user && window.localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-96 border p-8">
        <h1 className="text-center text-3xl font-semibold mb-7">Register</h1>
        <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="username"
              min={3}
              className="border w-full p-2 outline-blue-500"
              placeholder="Username"
              required
              value={inputs.username}
              onChange={handleChange}
            />
            {error &&
              Array.isArray(error) &&
              error.some((err) => err.path === "username") && (
                <div className="text-red-500">
                  {error.find((err) => err.path === "username")?.msg}
                </div>
              )}
          </div>
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
              <div className="text-red-500">{error}</div>
            )}
          </div>
          <h1 className="text-center">
            Already a Member?{" "}
            <Link to="/login">
              <span className=" text-blue-700 underline">Sign in</span>
            </Link>
          </h1>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-fit flex justify-center items-center gap-2 bg-blue-500 py-1 text-white px-3 rounded disabled:bg-blue-300 disabled:cursor-progress"
              disabled={status === "loading"}
            >
              {status === "loading" && <LoadingSpinner />}
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
