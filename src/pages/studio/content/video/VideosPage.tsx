import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Filter, ChevronDown, Trash2 } from "lucide-react";
import VideoTable from "./VideoTable";
import VideoCard from "./VideoCard";
import { Video, FilterOption } from "./useVideos";

const filterOptions: { value: FilterOption; label: string }[] = [
	{ value: "all", label: "All Videos" },
	{ value: "public", label: "Public Videos" },
	{ value: "private", label: "Private Videos" },
	{ value: "byViews", label: "Sort by Views" },
	{ value: "byDate", label: "Sort by Date" },
];

const VideosPage = ({
	videos,
	filteredVideos,
	selectedVideos,
	filter,
	handleSelectVideo,
	handleDeleteSelected,
	handleFilterSelect,
}: {
	videos: Video[];
	filteredVideos: Video[];
	selectedVideos: string[];
	filter: FilterOption;
	handleSelectVideo: (id: string, checked: boolean) => void;
	handleDeleteSelected: () => Promise<boolean>;
	handleFilterSelect: (value: FilterOption) => void;
}) => {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const onDeleteClick = async () => {
		const success = await handleDeleteSelected();
		if (success) {
			setIsDeleteDialogOpen(false);
		}
	};

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-full">
			<div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div className="flex items-center gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm" className="flex items-center gap-2 text-xs sm:text-sm px-3 sm:px-4 py-2" aria-label="Filter videos">
								<Filter className="h-4 w-4" />
								Filter
								<ChevronDown className="h-4 w-4 ml-1" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start" className="w-40">
							{filterOptions.map((option) => (
								<DropdownMenuItem key={option.value} onSelect={() => handleFilterSelect(option.value)} className="text-xs sm:text-sm">
									{option.label}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
					{selectedVideos.length > 0 && (
						<Button
							variant="destructive"
							size="sm"
							className="flex items-center gap-2 text-xs sm:text-sm px-3 sm:px-4 py-2"
							onClick={() => setIsDeleteDialogOpen(true)}
							aria-label="Delete selected videos"
						>
							<Trash2 className="h-4 w-4" />
							Delete
						</Button>
					)}
				</div>
			</div>
			<AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete the selected {selectedVideos.length} video
							{selectedVideos.length > 1 ? "s" : ""}.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={onDeleteClick} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			<VideoTable videos={filteredVideos} selectedVideos={selectedVideos} onSelectVideo={handleSelectVideo} />
			<div className="md:hidden space-y-4">
				{filteredVideos.map((video) => (
					<VideoCard key={video.id} video={video} isSelected={selectedVideos.includes(video.id)} onSelectVideo={handleSelectVideo} />
				))}
			</div>
		</div>
	);
};

export default VideosPage;
