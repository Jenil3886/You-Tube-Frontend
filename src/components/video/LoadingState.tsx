const LoadingState = () => (
	<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
		{/* Header Placeholder */}
		<div className="mb-6 flex justify-between items-center">
			<div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded loading-shimmer"></div>
			<div className="flex gap-2">
				<div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded loading-shimmer"></div>
				<div className="h-8 w-16 bg-destructive/20 rounded loading-shimmer"></div>
			</div>
		</div>
		{/* Desktop Table Skeleton */}
		<div className="hidden md:block overflow-x-auto border rounded-lg shadow-sm">
			<table className="min-w-full divide-y divide-border">
				<thead className="bg-muted/50">
					<tr>
						<th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-12"></th>
						<th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[30%]">Video</th>
						<th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[15%]">Visibility</th>
						<th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[15%]">Restrictions</th>
						<th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[15%]">Date ↓</th>
						<th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[10%]">Views</th>
						<th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[10%]">Comments</th>
						<th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[15%]">Likes (vs dislikes)</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-border">
					{[...Array(6)].map((_, idx) => (
						<tr key={idx} className="hover:bg-muted/50 transition-colors">
							<td className="px-4 py-3 whitespace-nowrap">
								<div className="h-4 w-4 rounded border border-gray-300 bg-gray-100 loading-shimmer"></div>
							</td>
							<td className="px-4 py-3 whitespace-nowrap flex items-center gap-3">
								<div className="w-20 h-12 sm:w-24 sm:h-14 bg-gray-200 dark:bg-gray-700 rounded-md aspect-video loading-shimmer"></div>
								<div className="space-y-2">
									<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 sm:w-48 loading-shimmer"></div>
									<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 loading-shimmer"></div>
								</div>
							</td>
							<td className="px-4 py-3 whitespace-nowrap text-xs sm:text-sm">
								<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 loading-shimmer"></div>
							</td>
							<td className="px-4 py-3 whitespace-nowrap text-xs sm:text-sm">
								<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12 loading-shimmer"></div>
							</td>
							<td className="px-4 py-3 whitespace-nowrap text-xs sm:text-sm">
								<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20 loading-shimmer"></div>
							</td>
							<td className="px-4 py-3 whitespace-nowrap text-xs sm:text-sm">
								<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-10 loading-shimmer"></div>
							</td>
							<td className="px-4 py-3 whitespace-nowrap text-xs sm:text-sm">
								<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-10 loading-shimmer"></div>
							</td>
							<td className="px-4 py-3 whitespace-nowrap text-xs sm:text-sm">
								<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 loading-shimmer"></div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
		{/* Mobile Cards Skeleton */}
		<div className="md:hidden space-y-4">
			{[...Array(4)].map((_, idx) => (
				<div key={idx} className="border rounded-lg p-4 shadow-sm loading-shimmer">
					<div className="flex items-start gap-3">
						<div className="mt-1 h-4 w-4 rounded border border-gray-300 bg-gray-100 loading-shimmer"></div>
						<div className="w-full space-y-3">
							<div className="flex gap-2">
								<div className="h-12 w-20 bg-gray-200 dark:bg-gray-700 rounded-md aspect-video loading-shimmer"></div>
								<div className="flex-1 space-y-2 min-w-0">
									<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 loading-shimmer"></div>
									<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 loading-shimmer"></div>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
								<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full loading-shimmer"></div>
								<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full loading-shimmer"></div>
								<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full loading-shimmer"></div>
								<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full loading-shimmer"></div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	</div>
);

export default LoadingState;
