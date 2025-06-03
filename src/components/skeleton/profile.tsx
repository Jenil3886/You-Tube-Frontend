import { Card, CardContent, CardHeader } from "@/components/ui/card";

function ProfileSkeleton() {
	return (
		<div className="container mx-auto py-8">
			<div className="flex flex-col md:flex-row gap-8">
				{/* Sidebar Skeleton */}
				<div className="w-full md:w-1/3">
					<Card>
						<CardHeader className="pb-0">
							<div className="flex flex-col items-center">
								<div className="h-24 w-24 bg-gray-300 rounded-full loading-shimmer"></div>
								<div className="h-6 bg-gray-300 rounded-md w-3/4 mt-4 loading-shimmer"></div>
								<div className="h-4 bg-gray-300 rounded-md w-1/2 mt-2 loading-shimmer"></div>
								<div className="h-4 bg-gray-300 rounded-md w-1/3 mt-2 loading-shimmer"></div>
							</div>
						</CardHeader>
						<CardContent className="pt-6 space-y-3">
							<div className="h-4 bg-gray-300 rounded-md w-full loading-shimmer"></div>
							<div className="h-4 bg-gray-300 rounded-md w-full loading-shimmer"></div>
							<div className="h-4 bg-gray-300 rounded-md w-full loading-shimmer"></div>
							<div className="mt-6 space-y-2">
								<div className="h-10 bg-gray-300 rounded-md w-full loading-shimmer"></div>
								<div className="h-10 bg-gray-300 rounded-md w-full loading-shimmer"></div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Content Skeleton */}
				<div className="w-full md:w-2/3">
					<div className="h-10 bg-gray-300 rounded-md w-1/2 mb-6 loading-shimmer"></div>
					<div className="space-y-6">
						<div className="h-32 bg-gray-300 rounded-md loading-shimmer"></div>
						<div className="h-32 bg-gray-300 rounded-md loading-shimmer"></div>
						<div className="h-32 bg-gray-300 rounded-md loading-shimmer"></div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileSkeleton;
