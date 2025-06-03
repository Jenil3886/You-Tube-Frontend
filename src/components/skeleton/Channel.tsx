import { Skeleton } from "@/components/ui/skeleton";

const ChannelSkeleton = () => {
	return (
		<div className="container mx-auto py-8 space-y-8 fade-in">
			{/* Banner and Channel Info */}
			<div className="relative mb-6 slide-in-right">
				<div className="w-full h-40 md:h-60 bg-muted rounded-xl overflow-hidden loading-shimmer">
					<Skeleton className="h-full w-full" />
				</div>
				<div className="flex flex-col md:flex-row items-start md:items-end gap-4 -mt-6 md:px-6">
					<div className="ml-6 md:ml-0 h-24 w-24 rounded-full border-4 border-background overflow-hidden loading-shimmer">
						<Skeleton className="h-full w-full rounded-full" />
					</div>
					<div className="flex-1 ml-6 md:ml-0 mt-2 md:mt-0 md:mb-6 space-y-2">
						<Skeleton className="h-6 w-48 loading-shimmer" />
						<Skeleton className="h-4 w-32 loading-shimmer" />
					</div>
					<div className="flex gap-2 ml-6 md:ml-0 mt-4 md:mt-0 md:mb-6 hover-lift">
						<Skeleton className="h-10 w-36 loading-shimmer" />
						<Skeleton className="h-10 w-36 loading-shimmer" />
					</div>
				</div>
			</div>

			{/* Upload and Analytics Cards */}
			<div className="flex flex-col md:flex-row gap-4 mb-8 transition-all-medium">
				<div className="flex-1 slide-in-left">
					<Skeleton className="h-24 w-full rounded-lg loading-shimmer" />
				</div>
				<div className="flex-1 slide-in-right">
					<Skeleton className="h-24 w-full rounded-lg loading-shimmer" />
				</div>
			</div>

			{/* Tabs Section */}
			<div className="space-y-4">
				<div className="flex gap-4">
					{[...Array(4)].map((_, i) => (
						<Skeleton key={i} className="h-10 w-24 rounded-md loading-shimmer" />
					))}
				</div>

				{/* Videos Grid Skeleton */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
					{[...Array(8)].map((_, i) => (
						<div key={i} className="space-y-2 slide-up">
							<Skeleton className="aspect-video w-full rounded-md loading-shimmer" />
							<Skeleton className="h-4 w-3/4 loading-shimmer" />
							<Skeleton className="h-4 w-1/2 loading-shimmer" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ChannelSkeleton;
