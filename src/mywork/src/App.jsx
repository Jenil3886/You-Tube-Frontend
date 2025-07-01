import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Register from "./page/Register";
import Login from "./page/Login";
import Dashboard from "./page/Dashboard";
import "./App.css";

function App() {
	const [isAuth, setAuth] = useState(localStorage.getItem("isAuth") === "true");

	useEffect(() => {
		localStorage.setItem("isAuth", isAuth ? "true" : "false");
	}, [isAuth]);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Navigate to={isAuth ? "/dashboard" : "/login"} />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login setAuth={setAuth} />} />
				<Route path="/dashboard" element={isAuth ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" />} />
			</Routes>
		</Router>
	);
}

export default App;
