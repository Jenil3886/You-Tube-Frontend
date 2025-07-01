import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

	const handleRegister = (e) => {
		e.preventDefault();
		if (!username || !email || !password) {
			setError("All fields are required");
			return;
		}
		if (!validateEmail(email)) {
			setError("Invalid email format");
			return;
		}
		if (password.length < 6) {
			setError("Password must be at least 6 characters");
			return;
		}
		const users = JSON.parse(localStorage.getItem("users") || "[]");
		if (users.find((u) => u.email === email)) {
			setError("Email already registered");
			return;
		}
		users.push({ username, email, password });
		localStorage.setItem("users", JSON.stringify(users));
		navigate("/login");
	};

	const redirectToLogin = () => {
		navigate("/login");
	};

	return (
		<div className="card max-w-md mx-auto mt-10">
			<h2 className="text-2xl font-bold mb-4">Register</h2>
			<form onSubmit={handleRegister} className="flex flex-col gap-3">
				<input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="p-2 border rounded" />
				<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border rounded" />
				<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 border rounded" />
				{error && <div className="text-red-500">{error}</div>}
				<button type="submit" className="bg-blue-500 text-white p-2 rounded">
					Register
				</button>
			</form>
			<div className="mt-4 text-center">
				<p className="text-gray-600">Already have an account?</p>
				<button onClick={redirectToLogin} className="text-blue-500 hover:underline">
					Login here
				</button>
			</div>
		</div>
	);
}

export default Register;
