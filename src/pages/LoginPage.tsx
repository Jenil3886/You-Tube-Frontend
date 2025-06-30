import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { apiurl } from "@/constants";
import { FcGoogle } from "react-icons/fc";
import youtubeLogo from "@/assets/youtubelogo.png";

const LoginPage = () => {
	const [username, setUsername] = useState(""); // Add state for username
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			console.log("Sending login request with:", { username, email, password });

			const response = await axios.post(
				`${apiurl}/users/login`,
				{ username, email, password },
				{
					withCredentials: true,
				}
			);

			console.log("Login response:", response.data);

			// Check if the response is successful
			if (response.status === 200 && response.data?.success) {
				localStorage.setItem("accessToken", response.data.data.token);
				localStorage.setItem("refreshToken", response.data.data.refreshToken);
				localStorage.setItem("user", JSON.stringify(response.data.data.user));
				// localStorage.setItem("accessToken", response.data.data.user.username);
				console.log("Login successful, navigating to home page...");
				navigate("/"); // Redirect to home page
			} else {
				console.error("Login failed or no success flag in response.");
				setError(response.data?.message || "Login failed. Please try again.");
			}
		} catch (err: any) {
			console.error("Login Error:", err.response || err.message || err);

			const backendError = err.response?.data?.message || err.response?.data?.error || "Login failed. Please check your credentials.";
			setError(backendError);
		} finally {
			setLoading(false); // Ensure loading is stopped
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#e52d27] via-[#ff6a00] to-[#f9d423] dark:from-gray-900 dark:via-gray-950 dark:to-black p-4">
			<div className="w-full max-w-md bg-white/70 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-10 border border-white/30 dark:border-gray-800 relative">
				<div className="flex flex-col items-center mb-8">
					<h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6 flex flex-col items-center gap-2">
						<img src={youtubeLogo} alt="YouTube Logo" className="h-10 w-auto mb-2" />
						Welcome Back!
					</h2>
					<p className="text-base text-gray-600 dark:text-gray-300 font-medium">Please login to your account.</p>
				</div>

				<form onSubmit={handleLogin} className="space-y-6">
					{error && (
						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">
							<span className="block sm:inline">{error}</span>
						</div>
					)}

					<div>
						<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1" htmlFor="username">
							Username
						</label>
						<input
							id="username"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="w-full px-4 py-2 text-gray-900 dark:text-white bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e52d27] focus:border-transparent transition duration-200"
							disabled={loading}
							placeholder="Your username"
						/>
					</div>

					<div>
						<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">
							Email Address
						</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-4 py-2 text-gray-900 dark:text-white bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e52d27] focus:border-transparent transition duration-200"
							required
							disabled={loading}
							placeholder="you@example.com"
						/>
					</div>

					<div>
						<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">
							Password
						</label>
						<div className="relative">
							<input
								id="password"
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-4 py-2 text-gray-900 dark:text-white bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e52d27] focus:border-transparent transition duration-200 pr-10"
								required
								disabled={loading}
								placeholder="******"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
								aria-label={showPassword ? "Hide password" : "Show password"}
							>
								{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
							</button>
						</div>
					</div>

					<button
						type="submit"
						className={`w-full flex justify-center items-center bg-[#e52d27] hover:bg-[#b31217] text-white font-bold py-2.5 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e52d27] transition duration-200 ease-in-out ${
							loading ? "opacity-50 cursor-not-allowed" : ""
						}`}
						disabled={loading}
					>
						{loading ? (
							<>
								<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									/>
								</svg>
								Signing In...
							</>
						) : (
							"Sign In"
						)}
					</button>
				</form>

				<div className="flex items-center my-6">
					<div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
					<span className="mx-4 text-gray-500 dark:text-gray-400 font-semibold">or</span>
					<div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
				</div>

				<button
					type="button"
					onClick={() => (window.location.href = "http://localhost:8000/api/v1/auth/google")}
					className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 font-semibold py-2.5 px-4 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-150 ease-in-out no-underline focus:outline-none focus:ring-2 focus:ring-[#e52d27]"
				>
					<FcGoogle className="w-6 h-6" />
					<span className="text-base font-medium">Sign in with Google</span>
				</button>

				<div className="flex justify-between items-center mt-6">
					<Link
						to="/forgot-password"
						className="text-sm font-medium text-[#e52d27] hover:text-[#b31217] dark:text-indigo-400 dark:hover:text-indigo-300 transition"
					>
						Forgot password?
					</Link>
					<Link
						to="/register"
						className="text-sm font-medium text-[#e52d27] hover:text-[#b31217] dark:text-indigo-400 dark:hover:text-indigo-300 transition"
					>
						Sign up
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
