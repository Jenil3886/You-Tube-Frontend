
const UploadingVideoCard = ({ progress = 0 }: { progress?: number }) => (
	<div className="border rounded-lg p-4 shadow-sm bg-muted/30">
		<div className="flex items-start gap-3">
			<div className="mt-1 h-4 w-4 rounded border border-gray-300 bg-gray-100 loading-shimmer" />
			<div className="w-full space-y-3">
				<div className="flex gap-2">
					<div className="h-12 w-20 bg-gray-200 dark:bg-gray-700 rounded-md aspect-video loading-shimmer" />
					<div className="flex-1 space-y-2 min-w-0">
						<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 loading-shimmer" />
						<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 loading-shimmer" />
					</div>
				</div>
				<div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
					{[...Array(4)].map((_, i) => (
						<div key={i} className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full loading-shimmer" />
					))}
				</div>
				{/* Progress bar */}
				{progress > 0 && progress < 100 && (
					<div className="mt-2 w-full bg-gray-200 rounded-full h-2">
						<div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
					</div>
				)}
				{progress >= 100 && <div className="text-xs text-green-600 mt-1">Processing...</div>}
			</div>
		</div>
	</div>
);

export default UploadingVideoCard;
