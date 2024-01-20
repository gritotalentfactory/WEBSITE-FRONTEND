"use client";
import React from "react";

const Dashboard = () => {
  // Retrieve user data from session storage
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  console.log(userData);

  return <div>Dashboard Hello {userData ? userData.email : "Guest"}</div>;
};

export default Dashboard;
