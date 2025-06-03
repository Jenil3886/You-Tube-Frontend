function VideoSkeleton() {
	return (
		<div className="container mx-auto p-2 sm:p-4 bg-white dark:bg-background min-h-screen">
			<div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6">
				<div className="lg:col-span-2 space-y-4 mb-6 lg:mb-0">
					<div className="aspect-video bg-gray-200 dark:bg-secondary rounded-lg md:rounded-xl loading-shimmer"></div>

					<div className="px-1 sm:px-0">
						<div className="h-6 sm:h-7 bg-gray-200 dark:bg-secondary rounded-md w-11/12 sm:w-3/4 loading-shimmer"></div>
					</div>

					<div className="px-1 sm:px-0 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between mt-3">
						<div className="flex items-center gap-3 flex-wrap">
							{" "}
							<div className="w-10 h-10 bg-gray-300 dark:bg-neutral-700 rounded-full loading-shimmer flex-shrink-0"></div>
							<div className="flex-grow sm:flex-grow-0 space-y-1.5 mr-auto sm:mr-2">
								{" "}
								<div className="h-5 bg-gray-300 dark:bg-neutral-700 rounded-md w-32 sm:w-36 loading-shimmer"></div>
								<div className="h-4 bg-gray-300 dark:bg-neutral-700 rounded-md w-24 sm:w-28 loading-shimmer"></div>
							</div>
							<div className="hidden sm:block h-9 bg-gray-300 dark:bg-neutral-700 rounded-full w-24 loading-shimmer ml-auto sm:ml-2 order-last sm:order-none"></div>
						</div>

						<div className="flex items-center gap-2 flex-wrap justify-start sm:justify-end">
							{" "}
							<div className="block sm:hidden h-9 bg-gray-300 dark:bg-neutral-700 rounded-full w-24 loading-shimmer mr-auto"></div>{" "}
							<div className="h-9 bg-gray-300 dark:bg-neutral-700 rounded-full w-28 sm:w-32 loading-shimmer order-first sm:order-none"></div>
							<div className="h-9 bg-gray-300 dark:bg-neutral-700 rounded-full w-20 sm:w-24 loading-shimmer"></div>
							<div className="h-9 bg-gray-300 dark:bg-neutral-700 rounded-full w-12 sm:w-16 loading-shimmer"></div> {/* Smaller 'More' button */}
						</div>
					</div>

					<div className="mt-4 p-3 bg-gray-100 dark:bg-secondary rounded-lg loading-shimmer space-y-2 mx-1 sm:mx-0">
						<div className="h-4 bg-gray-300 dark:bg-neutral-700 rounded-md w-1/4 loading-shimmer"></div>
						<div className="h-4 bg-gray-300 dark:bg-neutral-700 rounded-md w-full loading-shimmer"></div>
						<div className="h-4 bg-gray-300 dark:bg-neutral-700 rounded-md w-full loading-shimmer"></div>
						<div className="h-4 bg-gray-300 dark:bg-neutral-700 rounded-md w-3/4 loading-shimmer"></div>
					</div>

					<div className="mt-6 px-1 sm:px-0 space-y-4 hidden md:block">
						{" "}
						<div className="h-5 bg-gray-200 dark:bg-secondary rounded-md w-1/5 loading-shimmer"></div> {/* Comments count */}
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-gray-300 dark:bg-neutral-700 rounded-full loading-shimmer flex-shrink-0"></div>
							<div className="h-4 bg-gray-300 dark:bg-neutral-700 rounded-md w-1/2 loading-shimmer"></div> {/* Add comment input */}
						</div>
					</div>
				</div>{" "}
				<div className="space-y-3 px-1 sm:px-0">
					<div className="flex gap-2 items-center flex-wrap mb-3">
						<div className="h-8 bg-gray-300 dark:bg-neutral-700 rounded-full w-16 loading-shimmer"></div>
						<div className="h-8 bg-gray-200 dark:bg-secondary rounded-full w-20 loading-shimmer"></div> {/* Slightly different color */}
						<div className="h-8 bg-gray-200 dark:bg-secondary rounded-full w-24 loading-shimmer"></div>
						<div className="h-8 bg-gray-200 dark:bg-secondary rounded-full w-16 loading-shimmer hidden sm:block"></div> {/* Hide one on smallest */}
					</div>

					{Array.from({ length: 10 }).map((_, index) => (
						<div key={index} className="flex gap-3 cursor-pointer">
							<div className="w-2/5 sm:w-40 h-auto aspect-video sm:h-24 bg-gray-200 dark:bg-secondary rounded-lg loading-shimmer flex-shrink-0"></div>

							<div className="w-3/5 sm:flex-1 space-y-1.5 pt-0.5 sm:pt-1">
								<div className="h-4 sm:h-5 bg-gray-200 dark:bg-secondary rounded-md w-full loading-shimmer"></div>
								<div className="hidden sm:block h-4 bg-gray-200 dark:bg-secondary rounded-md w-3/4 loading-shimmer"></div>{" "}
								<div className="h-4 bg-gray-200 dark:bg-secondary rounded-md w-1/2 loading-shimmer"></div>
							</div>
						</div>
					))}
				</div>{" "}
			</div>{" "}
		</div>
	);
}

export default VideoSkeleton;
