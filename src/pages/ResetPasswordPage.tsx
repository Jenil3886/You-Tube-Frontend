import React, { useState } from "react";
import axios from "axios";
import { apiurl } from "@/constants";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPasswordPage = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	// Extract token from query string
	const searchParams = new URLSearchParams(location.search);
	const token = searchParams.get("token");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setMessage("");
		if (password.length < 6) {
			setError("Password must be at least 6 characters long.");
			return;
		}
		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}
		setLoading(true);
		try {
			const response = await axios.post(`${apiurl}/users/reset-password`, { token, password });
			setMessage(response.data?.message || "Password reset successful!");
			setTimeout(() => navigate("/login"), 2000);
		} catch (err: any) {
			setError(err.response?.data?.message || "Failed to reset password.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-black p-4">
			<div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8">
				<h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Reset Password</h2>
				<form onSubmit={handleSubmit} className="space-y-5">
					{message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">{message}</div>}
					{error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}
					<div>
						<label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							New Password
						</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
							required
							disabled={loading}
							placeholder="Enter new password"
						/>
					</div>
					<div>
						<label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							Confirm Password
						</label>
						<input
							id="confirmPassword"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className="w-full px-4 py-2 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
							required
							disabled={loading}
							placeholder="Confirm new password"
						/>
					</div>
					<button
						type="submit"
						className={`w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out ${
							loading ? "opacity-50 cursor-not-allowed" : ""
						}`}
						disabled={loading}
					>
						{loading ? "Resetting..." : "Reset Password"}
					</button>
				</form>
				<button className="mt-4 text-indigo-600 hover:underline" onClick={() => navigate("/login")}>
					Back to Login
				</button>
			</div>
		</div>
	);
};

export default ResetPasswordPage;
