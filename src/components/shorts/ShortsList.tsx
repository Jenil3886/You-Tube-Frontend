import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, Clock } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import ShortCard from "./ShortCard";

// Category filters for shorts
const categories = [
	"All",
	"Recently uploaded",
	"Watched",
	"Gaming",
	"Music",
	"Live",
	"Mixes",
	"Sitcoms",
	"Podcasts",
	"Cooking shows",
	"React",
	"JavaScript",
];

type ShortsListProps = {
	shorts: any[];
	onShortClick: (index: number) => void;
};

const ShortsList = ({ shorts, onShortClick }: ShortsListProps) => {
	const isMobile = useIsMobile();
	const [selectedCategory, setSelectedCategory] = useState("All");

	return (
		<div className="w-full px-4 py-6 md:container md:mx-auto md:py-6">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
				<h1 className="text-xl sm:text-2xl font-bold">Shorts</h1>
				<Button variant="outline" size="sm" className="self-start sm:self-auto">
					<Filter className="mr-2 h-4 w-4" />
					Filter
				</Button>
			</div>

			<ScrollArea className="w-full whitespace-nowrap mb-6 md:mb-8">
				<div className="flex space-x-2 pb-4">
					{categories.map((category) => (
						<Button
							key={category}
							variant={category === selectedCategory ? "default" : "outline"}
							className="rounded-full"
							size={isMobile ? "sm" : "default"}
							onClick={() => setSelectedCategory(category)}
						>
							{category}
						</Button>
					))}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>

			<div className="mb-6 md:mb-8">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
					<h2 className="text-lg sm:text-xl font-medium">Trending Shorts</h2>
					<Button variant="link" className="text-base self-start sm:self-auto p-0 h-auto sm:p-2">
						<Clock className="mr-2 h-4 w-4" />
						Watch history
					</Button>
				</div>

				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
					{shorts.slice(0, 12).map((short, index) => (
						<ShortCard key={short.id} short={short} onClick={() => onShortClick(index)} />
					))}
				</div>
			</div>

			<div>
				<h2 className="text-lg sm:text-xl font-medium mb-4">Short videos for you</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
					{shorts.slice(12).map((short, index) => (
						<ShortCard key={short.id} short={short} onClick={() => onShortClick(index + 12)} />
					))}
				</div>
			</div>
		</div>
	);
};

export default ShortsList;
