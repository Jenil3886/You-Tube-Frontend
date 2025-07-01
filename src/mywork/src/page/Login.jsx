import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setAuth }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();
		const users = JSON.parse(localStorage.getItem("users") || "[]");

		const user = users.find((u) => u.email === email && u.password === password);

		if (!user) {
			setError("invalid cranditials");
			return;
		}

		setAuth(true);
		localStorage.setItem("isAuth", "true");
		localStorage.setItem("currentUser", JSON.stringify(user));

		navigate("/dashboard");
	};

	const redirectToRegister = () => {
		navigate("/register");
	};

	return (
		<div className="card max-w-md mx-auto mt-10">
			<h2 className="text-2xl font-bold mb-4">Login</h2>
			<form onSubmit={handleLogin} className="flex flex-col gap-3">
				<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border rounded" />
				<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 border rounded" />
				{error && <div className="text-red-500">{error}</div>}
				<button type="submit" className="bg-blue-500 text-white p-2 rounded">
					Login
				</button>
			</form>
			<div className="mt-4 text-center">
				<p className="text-gray-600">Don't have an account?</p>
				<button onClick={redirectToRegister} className="text-blue-500 hover:underline">
					Register here
				</button>
			</div>
		</div>
	);
}

export default Login;
