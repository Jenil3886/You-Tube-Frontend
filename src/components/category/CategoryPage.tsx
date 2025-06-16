import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import VideoGrid from "../video/VideoGrid";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { CategoryPageProps } from "@/types";

const CategoryPage = ({ title, description, filters, videos }: CategoryPageProps) => {
	const isMobile = useIsMobile();

	return (
		<div className="w-full px-4 py-6 md:container md:mx-auto md:py-6">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
				<div>
					<h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
					{description && <p className="text-muted-foreground text-sm md:text-base">{description}</p>}
				</div>
				<Button variant="outline" size="sm" className="self-start sm:self-auto">
					<Filter className="mr-2 h-4 w-4" />
					Filter
				</Button>
			</div>

			{filters && filters.length > 0 && (
				<ScrollArea className="w-full whitespace-nowrap mb-6 md:mb-8">
					<div className="flex space-x-2 pb-4">
						{filters.map((filter) => (
							<Button key={filter} variant={filter === "All" ? "default" : "outline"} size={isMobile ? "sm" : "default"} className="rounded-full">
								{filter}
							</Button>
						))}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			)}

			<VideoGrid videos={videos} />
		</div>
	);
};

export default CategoryPage;
