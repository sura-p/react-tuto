import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authThunk";
import {
  useAuthenticated,
  useAuthError,
  useAuthLoading,
  useAuthUser
} from "../hooks/selectors/AuthSelector";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const dispatch = useDispatch();
  const loading = useAuthLoading();
  const error = useAuthError();
  const isAuthenticated = useAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/chat");
    }
  }, [error, isAuthenticated, navigate]);
  // useEffect(() => {
  //   // Show notification only when there's an error
  //   if (error) {
  //     // Show the notification with the error message
  //     toast.error("failed");
  //   }
  //   if (isAuthenticated) {
  //     navigate("/chat");
  //   }
  // }, [error, isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <>
      <div class="container-login">
        <div class="main">
          <form onSubmit={handleSubmit}>
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              required=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              required=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="button" disabled={loading}>
              {loading ? <div className="loader" /> : "Login"}
            </button>
            <p className="login-re">
              Don't have an account? <a href="/sign-up">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
