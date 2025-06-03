import { Link } from "react-router-dom";
import { Plus, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { RiVideoUploadLine } from "react-icons/ri";

const CreateButton = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white border-none rounded-full">
					<Plus className="h-4 w-4" />
					<span>Create</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="center" className="bg-zinc-900 border-zinc-800 text-white w-52 p-1">
				<Link to="/upload">
					<div className="flex items-center px-3 py-2.5 hover:bg-zinc-800 cursor-pointer rounded-sm">
						<div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3">
							<RiVideoUploadLine className="h-6 w-6" />
						</div>

						<span className="text-sm">Upload video</span>
					</div>
				</Link>
				<Link to="/live">
					<div className="flex items-center px-3 py-2.5 hover:bg-zinc-800 cursor-pointer rounded-sm">
						<div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3">
							<Radio className="h-6 w-6" />
						</div>
						<span className="text-sm">Go live</span>
					</div>
				</Link>
				<Link to="/post">
					<div className="flex items-center px-3 py-2.5 hover:bg-zinc-800 cursor-pointer rounded-sm">
						<div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3">
							<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
								<rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
								<path d="M3 8h18M8 3v18" strokeWidth="2" />
							</svg>
						</div>
						<span className="text-sm">Create post</span>
					</div>
				</Link>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default CreateButton;
