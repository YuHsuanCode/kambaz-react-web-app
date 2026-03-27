import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as client from "./client";
import { setCurrentUser } from "./reducer";
import "../styles.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async () => {
    if (password !== verifyPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const user = await client.signup({ username, password });
      dispatch(setCurrentUser(user));
      navigate("/Kambaz/Dashboard");
    } catch (error) {
      alert("Signup failed");
    }
  };

  return (
        <div id="wd-signup-screen">
          <h1>Sign up</h1>
    
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            className="form-control mb-2"
          />
    
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            type="password"
            className="form-control mb-2"
          />
    
          <input
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            placeholder="verify password"
            type="password"
            className="form-control mb-2"
          />
    
          <button
            id="wd-signup-btn"
            className="btn btn-primary w-100"
            onClick={handleSignup}
          >
            Sign up
          </button>
    
          <Link id="wd-signin-link" to="/Kambaz/Account/Signin">
            Sign in
          </Link>
        </div>
      );
    }
