import { ShieldAlert } from "lucide-react";
import { Button } from "./button";

interface ErrorPageProps {
	title?: string;
	message: string;
	onRetry?: () => void;
	showReportButton?: boolean;
	onReport?: () => void;
	errorCode?: string | number; // Optional error code
}

const ErrorPage = ({ title = "Something went wrong", message, onRetry, showReportButton, onReport, errorCode }: ErrorPageProps) => {
	return (
		<div className="relative flex flex-col items-center justify-center min-h-[85vh] bg-gradient-to-br from-gray-50 to-gray-200 dark:bg-gradient-to-br dark:from-gray-900 dark:to-[#262626] py-16 px-6 sm:px-8 lg:px-12">
			<div className="absolute top-0 left-0 w-full h-full bg-opacity-50 dark:bg-opacity-30 backdrop-blur-sm z-0"></div>
			<div className="relative z-10 max-w-lg w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 sm:p-12">
				<div className="flex flex-col items-center space-y-6">
					<div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900 text-red-500">
						<ShieldAlert className="h-8 w-8" aria-hidden="true" />
					</div>
					<div className="text-center">
						<h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">{title}</h2>
						<p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{message}</p>
						{errorCode && <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">Error Code: {errorCode}</p>}
					</div>
					<div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 w-full">
						{onRetry && (
							<Button onClick={onRetry} variant="primary" className="w-full sm:w-auto px-5 py-3">
								Try Again
							</Button>
						)}
						{showReportButton && onReport && (
							<Button onClick={onReport} variant="outline" className="w-full sm:w-auto px-5 py-3">
								Report Issue
							</Button>
						)}
						{!onRetry && !showReportButton && <p className="text-sm text-gray-500 dark:text-gray-500">No further actions available.</p>}
					</div>
					<p className="mt-6 text-xs text-gray-500 dark:text-gray-500">If this continues, please contact our support team.</p>
				</div>
			</div>
		</div>
	);
};

export default ErrorPage;
