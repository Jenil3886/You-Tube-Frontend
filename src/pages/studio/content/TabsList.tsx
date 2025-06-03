import { TabsList, TabsTrigger } from "@/components/ui/tabs";

type TabsListProps = {
	activeTab: string;
};

const tabs = [
	{ value: "inspiration", label: "Inspiration" },
	{ value: "videos", label: "Videos" },
	{ value: "shorts", label: "Shorts" },
	{ value: "live", label: "Live" },
	{ value: "posts", label: "Posts" },
	{ value: "playlists", label: "Playlists" },
	{ value: "podcasts", label: "Podcasts" },
	{ value: "promotions", label: "Promotions" },
];

const ContentTabsList = ({ activeTab }: TabsListProps) => {
	return (
		<div className="border-b mb-6 overflow-x-auto transform md:translate-x-0 [&::-webkit-scrollbar]:h-[1px] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-800 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600">
			<TabsList className="bg-transparent h-auto p-0 w-full justify-start">
				{tabs.map((tab) => (
					<TabsTrigger
						key={tab.value}
						value={tab.value}
						className={`px-6 py-3 rounded-none border-b-2 transition-colors duration-200 ${
							activeTab === tab.value ? "border-youtube-red" : "border-transparent"
						}`}
					>
						{tab.label}
					</TabsTrigger>
				))}
			</TabsList>
		</div>
	);
};

export default ContentTabsList;
