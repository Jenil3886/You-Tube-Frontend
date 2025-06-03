import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { apiurl } from "@/constants";
const RegisterPage = () => {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [avatar, setAvatar] = useState<File | null>(null);
	const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		let objectUrl: string | null = null;
		if (avatar) {
			objectUrl = URL.createObjectURL(avatar);
			setAvatarPreview(objectUrl);
		} else {
			setAvatarPreview(null);
		}

		return () => {
			if (objectUrl) {
				URL.revokeObjectURL(objectUrl);
			}
		};
	}, [avatar]);

	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setAvatar(file);
		} else {
			setAvatar(null);
		}
	};

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setSuccessMessage("");
		setLoading(true);

		if (password.length < 6) {
			setError("Password must be at least 6 characters long.");
			setLoading(false);
			return;
		}

		try {
			const formData = new FormData();
			formData.append("fullName", fullName);
			formData.append("email", email);
			formData.append("username", username);
			formData.append("password", password);

			console.log(formData, "formdata");
			if (avatar) {
				formData.append("avatar", avatar);
			}

			const response = await axios.post(`${apiurl}/users/register`, formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			console.log(response);
			setSuccessMessage("Registration successful! Redirecting to login...");

			setTimeout(() => {
				navigate("/login");
			}, 2000);
		} catch (err: any) {
			console.error("Registration Error:", err.response || err.message || err);
			const backendError =
				err.response?.data?.message || err.response?.data?.error || "Registration failed. Please check your details and try again.";
			setError(backendError);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-800 dark:via-gray-900 dark:to-black p-4">
			<div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8">
				<h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">Create Account</h2>

				<form onSubmit={handleRegister} className="space-y-4">
					{/* Error Message Display */}
					{error && (
						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
							<span className="block sm:inline">{error}</span>
						</div>
					)}

					{/* Success Message Display */}
					{successMessage && (
						<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
							<span className="block sm:inline">{successMessage}</span>
						</div>
					)}

					{/* Full Name Input */}
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="fullName">
							Full Name
						</label>
						<input
							id="fullName"
							type="text"
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
							className="w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
							required
							disabled={loading}
							placeholder="John Doe"
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
							required
							disabled={loading}
							placeholder="your_username"
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
								minLength={6} // Basic HTML validation
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
						{password && password.length < 6 && <p className="text-xs text-red-500 mt-1">Password must be at least 6 characters.</p>}
					</div>

					{/* Avatar Input */}
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="avatar">
							Avatar (Optional)
						</label>
						<div className="flex items-center space-x-4">
							{avatarPreview && (
								<img
									src={avatarPreview}
									alt="Avatar Preview"
									className="w-16 h-16 rounded-full object-cover border border-gray-300 dark:border-gray-600"
								/>
							)}
							<input
								id="avatar"
								type="file"
								accept="image/png, image/jpeg, image/jpg, image/webp" // Be specific about accepted types
								onChange={handleAvatarChange}
								className="block w-full text-sm text-gray-500 dark:text-gray-400
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-50 dark:file:bg-indigo-900 file:text-indigo-700 dark:file:text-indigo-300
                                hover:file:bg-indigo-100 dark:hover:file:bg-indigo-800
                                disabled:opacity-50"
								disabled={loading}
							/>
						</div>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						className={`w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out ${
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
								Processing...
							</>
						) : (
							"Register"
						)}
					</button>
				</form>

				{/* Link to Login Page */}
				<p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
					Already have an account?{" "}
					<Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
						Log in here
					</Link>
				</p>
			</div>
		</div>
	);
};

export default RegisterPage;
