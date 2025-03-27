import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './App.css';

import Dashboard from "./components/Dashboard/Dashboard";
import AddItem from "./components/AddItem/AddItem";
import DisplayItem from "./components/DisplayItem/DisplayItem";
import UpdateItem from "./components/UpdateItem/UpdateItem";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import SecurityCode from "./components/SecurityCode/SecurityCode";
import Header from "./components/Header/Header"; 
import Footer from "./components/Footer/Footer";
import Profile from "./components/Profile/Profile";

function App() {
  const [user, setUser] = useState(sessionStorage.getItem("userId"));
  const securityVerified = sessionStorage.getItem("securityVerified");

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(sessionStorage.getItem("userId"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
    <div className="flex flex-col min-h-screen"> 
      <Header userEmail={user} setUserEmail={setUser} /> 

      <main className="container mx-auto p-4 flex-grow">
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/additem" element={user ? <AddItem /> : <Navigate to="/login" />} />
          <Route path="/allitems" element={user ? <DisplayItem /> : <Navigate to="/login" />} />
          <Route path="/updateitem/:modelNo" element={user ? <UpdateItem /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />

          {/* Security Code Verification */}
          <Route path="/security-code" element={user ? <Navigate to="/" /> : <SecurityCode />} />

          {/* Ensure security verification before registering */}
          <Route path="/register" 
            element={user ? <Navigate to="/" /> : (securityVerified === "true" ? <Register /> : <Navigate to="/security-code" />)} />

          <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        </Routes>
      </main>

      <Footer />
    </div>
    </>
  );
}

export default App;
