import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { apiurl } from "@/constants";

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
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-black p-4">
			<div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8">
				<h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">Welcome Back!</h2>

				<form onSubmit={handleLogin} className="space-y-5">
					{error && (
						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
							<span className="block sm:inline">{error}</span>
						</div>
					)}

					{/* Username Input */}
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="username">
							Username
						</label>
						<input
							id="username"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
							disabled={loading}
							placeholder="Your username"
						/>
					</div>

					{/* Email Input */}
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">
							Email Address
						</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
							required
							disabled={loading}
							placeholder="you@example.com"
						/>
					</div>

					{/* Password Input */}
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">
							Password
						</label>
						<div className="relative">
							<input
								id="password"
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 pr-10" // Add padding right for icon
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

					{/* Submit Button */}
					<button
						type="submit"
						className={`w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out ${
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
									></path>
								</svg>
								Signing In...
							</>
						) : (
							"Sign In"
						)}
					</button>
				</form>

				<Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
					forget password
				</Link>

				{/* Link to Registration Page */}
				<p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
					Don't have an account yet?{" "}
					<Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
						Sign up here
					</Link>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;

// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { Eye, EyeOff } from "lucide-react";

// const LoginPage = () => {
// 	const [username, setUsername] = useState(""); // Add state for username
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [showPassword, setShowPassword] = useState(false);
// 	const [error, setError] = useState("");
// 	const [loading, setLoading] = useState(false);
// 	const navigate = useNavigate();

// 	const handleLogin = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		setError("");
// 		setLoading(true);

// 		try {
// 			console.log("Sending login request with:", { username, email, password });

// 			const response = await axios.post(
// 				`${apiurl}/users/login`,
// 				{ username, email, password }, // Include username in the request payload
// 				{
// 					withCredentials: true,
// 				}
// 			);

// 			console.log("Login response:", response.data);

// 			if (response.status === 200 && response.data?.success) {
// 				// localStorage.setItem("accessToken", response.data.data.accessToken);
// 				navigate("/");
// 			} else {
// 				console.error("Login successful but no access token received.");
// 				setError("Login succeeded but failed to retrieve session token.");
// 			}

// 			// if (response.data?.data?.accessToken) {
// 			// 	localStorage.setItem("accessToken", response.data.data.accessToken);
// 			// 	navigate("/"); // Redirect to home page
// 			// } else {
// 			// 	console.error("Login successful but no access token received.");
// 			// 	setError("Login succeeded but failed to retrieve session token.");
// 			// }
// 		} catch (err: any) {
// 			console.error("Login Error:", err.response || err.message || err);

// 			const backendError = err.response?.data?.message || err.response?.data?.error || "Login failed. Please check your credentials.";
// 			setError(backendError);
// 			setLoading(false);
// 		}
// 	};

// 	return (
// 		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-black p-4">
// 			<div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8">
// 				<h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">Welcome Back!</h2>

// 				<form onSubmit={handleLogin} className="space-y-5">
// 					{error && (
// 						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
// 							<span className="block sm:inline">{error}</span>
// 						</div>
// 					)}

// 					{/* Username Input */}
// 					<div>
// 						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="username">
// 							Username
// 						</label>
// 						<input
// 							id="username"
// 							type="text"
// 							value={username}
// 							onChange={(e) => setUsername(e.target.value)}
// 							className="w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
// 							disabled={loading}
// 							placeholder="Your username"
// 						/>
// 					</div>

// 					{/* Email Input */}
// 					<div>
// 						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">
// 							Email Address
// 						</label>
// 						<input
// 							id="email"
// 							type="email"
// 							value={email}
// 							onChange={(e) => setEmail(e.target.value)}
// 							className="w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
// 							required
// 							disabled={loading}
// 							placeholder="you@example.com"
// 						/>
// 					</div>

// 					{/* Password Input */}
// 					<div>
// 						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">
// 							Password
// 						</label>
// 						<div className="relative">
// 							<input
// 								id="password"
// 								type={showPassword ? "text" : "password"}
// 								value={password}
// 								onChange={(e) => setPassword(e.target.value)}
// 								className="w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 pr-10" // Add padding right for icon
// 								required
// 								disabled={loading}
// 								placeholder="******"
// 							/>
// 							<button
// 								type="button"
// 								onClick={() => setShowPassword(!showPassword)}
// 								className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
// 								aria-label={showPassword ? "Hide password" : "Show password"}
// 							>
// 								{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
// 							</button>
// 						</div>
// 					</div>

// 					{/* Submit Button */}
// 					<button
// 						type="submit"
// 						className={`w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out ${
// 							loading ? "opacity-50 cursor-not-allowed" : ""
// 						}`}
// 						disabled={loading}
// 					>
// 						{loading ? (
// 							<>
// 								<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// 									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// 									<path
// 										className="opacity-75"
// 										fill="currentColor"
// 										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
// 									></path>
// 								</svg>
// 								Signing In...
// 							</>
// 						) : (
// 							"Sign In"
// 						)}
// 					</button>
// 				</form>

// 				{/* Link to Registration Page */}
// 				<p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
// 					Don't have an account yet?{" "}
// 					<Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
// 						Sign up here
// 					</Link>
// 				</p>
// 			</div>
// 		</div>
// 	);
// };

// export default LoginPage;
