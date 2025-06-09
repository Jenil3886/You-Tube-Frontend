const UploadingVideoRow = () => (
	<tr className=" bg-muted/30">
		<td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap w-[5%]">
			<div className="h-4 w-4 rounded border border-gray-300 bg-gray-100 loading-shimmer" />
		</td>
		<td className="w-[35%]">
			<div className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap flex items-start gap-3">
				<div className="w-32 h-[75px] bg-gray-200 dark:bg-gray-700 rounded-md aspect-video loading-shimmer" />
				<div className="min-w-0 flex flex-col justify-between">
					<div>
						<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2 loading-shimmer" />
						<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 loading-shimmer" />
					</div>
				</div>
			</div>
		</td>
		{[...Array(6)].map((_, i) => (
			<td key={i} className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm">
				<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-10 loading-shimmer" />
			</td>
		))}
	</tr>
);

export default UploadingVideoRow;
