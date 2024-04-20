import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import LoginForm from "./Login_Form";
import SignupForm from "./Signup_Form";
import Task from "./Task";

function AllRoutes() {
  const access = localStorage.getItem("logintoken");

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/task" element={<Task />} />
      </Routes>
    </div>
  );
}

export default AllRoutes;
