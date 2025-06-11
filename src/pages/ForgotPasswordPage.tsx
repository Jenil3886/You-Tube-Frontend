import React, { useState } from "react";
import axios from "axios";
import { apiurl } from "@/constants";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setMessage("");
		setLoading(true);
		try {
			const response = await axios.post(`${apiurl}/users/forgot-password`, { email });
			setMessage(response.data?.message || "Check your email for reset instructions.");
		} catch (err: any) {
			setError(err.response?.data?.message || "Failed to send reset email.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-black p-4">
			<div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8">
				<h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Forgot Password</h2>
				<form onSubmit={handleSubmit} className="space-y-5">
					{message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">{message}</div>}
					{error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
					<button
						type="submit"
						className={`w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out ${
							loading ? "opacity-50 cursor-not-allowed" : ""
						}`}
						disabled={loading}
					>
						{loading ? "Sending..." : "Send Reset Link"}
					</button>
				</form>
				<button className="mt-4 text-indigo-600 hover:underline" onClick={() => navigate("/login")}>
					Back to Login
				</button>
			</div>
		</div>
	);
};

export default ForgotPasswordPage;
