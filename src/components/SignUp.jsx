import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signupUser } from "../features/auth/authThunk";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");


  const dispatch = useDispatch();
  const loading = useSelector((state)=>state.auth.loading);
  const error = useSelector((state)=>state.auth.error);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser({ email,username, password }));
    if(!error){
      navigate('/chat')
    }
  };
  return (
    <div className="container-login">
    <div className="main">
      <form onSubmit={handleSubmit}>
        <label htmlFor="chk" aria-hidden="true">Sign up</label>
        <input type="text" name="txt" placeholder="User name" required="" value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <input type="email" name="email" placeholder="Email" required="" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" name="pswd" placeholder="Password" required="" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button type="submit" className="button" disabled={loading}>
            {loading ? (
              <div className="loader" />
            ) : (
              "Sign Up"
            )}
          </button>
          <p className="login-re">
            Already have an account? <a href="/">Login In</a>
          </p>
      </form>
    </div>
    </div>
  );
};

export default SignUp;
