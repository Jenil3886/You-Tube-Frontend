import { useNavigate } from "react-router-dom";

const ErrorState = ({ message }: { message: string }) => {
	const navigate = useNavigate();
	const showCreateButton = message === "Channel not found";

	return (
		<div className="min-h-[calc(100vh - 4rem)] text-white flex flex-col items-center justify-center px-6 py-8">
			{/* Error Title */}
			<h1 className="text-lg sm:text-xl font-semibold text-red-600 mb-2 text-center">{message}</h1>

			{/* Subtitle */}
			<p className="text-sm text-gray-400 max-w-md text-center mb-6">The channel you're looking for doesn't exist. You can create one now.</p>

			{/* Create Channel Button */}
			{showCreateButton && (
				<button
					onClick={() => navigate("/create-channel")}
					className="
                        px-4 py-2
                        bg-red-600 hover:bg-red-700
                        text-white text-sm font-medium
                        rounded
                        transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-red-500
                        min-w-[120px] text-center
                    "
				>
					Create Channel
				</button>
			)}

			{/* Back to Home Link */}
			<a href="/" className="mt-6 text-xs sm:text-sm text-gray-400 hover:text-white transition underline">
				Go back home
			</a>
		</div>
	);
};

export default ErrorState;
