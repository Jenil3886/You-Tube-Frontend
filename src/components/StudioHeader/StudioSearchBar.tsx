import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const StudioSearchBar = () => {
	return (
		<div className="hidden md:flex flex-1 max-w-xl mx-4">
			<div className="flex w-full rounded-full border overflow-hidden">
				<Input type="text" placeholder="Search across your channel" className="rounded-l-full rounded-r-none border-none flex-grow" />
				<Button type="submit" variant="ghost" size="icon" className="rounded-r-full rounded-l-none bg-gray-100 dark:bg-gray-800 px-6 border-l">
					<Search className="h-5 w-5" />
				</Button>
			</div>
		</div>
	);
};

export default StudioSearchBar;
