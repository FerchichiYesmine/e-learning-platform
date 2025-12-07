import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminInterface from "./views/AdminInterface.jsx";
import CoursList from "./views/CoursList.jsx";
import UserList from "./views/UserList.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminInterface />} />
      <Route path="/cours/:matiereTitre" element={<CoursList />} />
      <Route path="/users" element={<UserList />} />
    </Routes>
  );
};

export default App;
