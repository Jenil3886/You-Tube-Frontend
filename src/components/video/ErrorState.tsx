const ErrorState = ({ message }: { message: string }) => (
	<div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
		<p className="text-base sm:text-lg text-red-500">{message}</p>
	</div>
);

export default ErrorState;
