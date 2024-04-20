import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../Redux/Auth_Redux/action";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const dispatch = useDispatch();

  const nav = useNavigate();

  const handleSignup = () => {
    const userData = { email, password, fullName, username };
    console.log(userData);
    dispatch(signupUser(userData));
  };
  const tologin = () => {
    nav("/login");
  };

  return (
    <div className="Form_contain">
      <h2 className=" text-center text-2xl font-bold ">Signup</h2>
      <div className="form3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="FullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <button className="signup_btn" onClick={handleSignup}>
          Register
        </button>
        <span onClick={tologin} className="cursor-pointer">
          already have an account
        </span>
      </div>
    </div>
  );
};

export default SignupForm;
