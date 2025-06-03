// components/VideoEditSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export const VideoEditSkeleton = () => {
	return (
		<div className="container mx-auto px-4 py-6">
			{/* Title */}
			<div className="text-center mb-6">
				<Skeleton className=" loading-shimmer h-8 w-3/4 max-w-lg mx-auto" />
			</div>

			{/* Main Grid Layout */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Left Section: Form Fields */}
				<div className="md:col-span-2 space-y-6">
					{/* Title Input */}
					<div className="space-y-2">
						<Skeleton className=" loading-shimmer h-4 w-1/4" />
						<Skeleton className=" loading-shimmer h-10 w-full" />
					</div>

					{/* Description TextArea */}
					<div className="space-y-2">
						<Skeleton className=" loading-shimmer h-4 w-1/4" />
						<Skeleton className=" loading-shimmer h-24 w-full" />
					</div>

					{/* Thumbnail Placeholder */}
					<div className="space-y-2">
						<Skeleton className=" loading-shimmer h-4 w-1/4" />
						<Skeleton className=" loading-shimmer h-32 w-full rounded" />
					</div>

					{/* Playlists Select */}
					<div className="space-y-2">
						<Skeleton className=" loading-shimmer h-4 w-1/4" />
						<Skeleton className=" loading-shimmer h-10 w-full" />
					</div>

					{/* Audience Toggle */}
					<div className="space-y-2">
						<Skeleton className=" loading-shimmer h-4 w-1/4" />
						<Skeleton className=" loading-shimmer h-10 w-full mt-2" />
					</div>
				</div>

				{/* Right Section: Video Preview & Options */}
				<div className="space-y-6">
					{/* Video Preview Card */}
					<div className="border border-border rounded-lg p-4 space-y-4">
						<Skeleton className=" loading-shimmer aspect-video w-full rounded-md" />
						<Skeleton className=" loading-shimmer h-4 w-1/5" />
						<Skeleton className=" loading-shimmer h-4 w-full" />
						<Skeleton className=" loading-shimmer h-4 w-full" />
					</div>

					{/* Visibility Select */}
					<div className="space-y-2">
						<Skeleton className=" loading-shimmer h-4 w-1/3" />
						<Skeleton className=" loading-shimmer h-10 w-full" />
					</div>

					{/* Restrictions Label */}
					<div className="space-y-2">
						<Skeleton className=" loading-shimmer h-4 w-1/3" />
						<Skeleton className=" loading-shimmer h-10 w-full" />
					</div>

					{/* Related Video Select */}
					<div className="space-y-2">
						<Skeleton className=" loading-shimmer h-4 w-1/3" />
						<Skeleton className=" loading-shimmer h-10 w-full" />
					</div>
				</div>
			</div>

			{/* Action Buttons */}
			<div className="mt-8 flex justify-end gap-4">
				<Skeleton className=" loading-shimmer h-10 w-24 rounded" />
				<Skeleton className=" loading-shimmer h-10 w-24 rounded" />
			</div>

			{/* Loading Text */}
			<div className="mt-6 text-center text-sm text-muted-foreground">Loading your video details...</div>
		</div>
	);
};
