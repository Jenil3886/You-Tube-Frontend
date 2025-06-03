import { Plus, Upload } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { NavLink } from "react-router-dom";

const StudioCreateButton = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="hidden md:flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white border-none rounded-full">
					<Plus className="h-4 w-4" />
					<span>Create</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="center" className="bg-zinc-900 border-zinc-800 text-white w-52 p-1">
				<NavLink to="/upload" className="w-full">
					<div className="flex items-center px-3 py-2.5 hover:bg-zinc-800 cursor-pointer rounded-sm">
						<div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3">
							<Upload className="h-5 w-5" />
						</div>
						<span className="text-sm">Upload videos</span>
					</div>
				</NavLink>
				<NavLink to="/live" className="w-full">
					<div className="flex items-center px-3 py-2.5 hover:bg-zinc-800 cursor-pointer rounded-sm">
						<div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3">
							<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
								<circle cx="12" cy="12" r="7" strokeWidth="2" />
								<circle cx="12" cy="12" r="3" strokeWidth="2" />
							</svg>
						</div>
						<span className="text-sm">Go live</span>
					</div>
				</NavLink>
				<NavLink to="/post" className="w-full">
					<div className="flex items-center px-3 py-2.5 hover:bg-zinc-800 cursor-pointer rounded-sm">
						<div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3">
							<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
								<rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
								<path d="M12 8v8M8 12h8" strokeWidth="2" strokeLinecap="round" />
							</svg>
						</div>
						<span className="text-sm">Create post</span>
					</div>
				</NavLink>
				<NavLink to="/playlist" className="w-full">
					<div className="flex items-center px-3 py-2.5 hover:bg-zinc-800 cursor-pointer rounded-sm">
						<div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3">
							<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
								<rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="2" />
								<path d="M9 10l6 4-6 4V10z" fill="currentColor" />
							</svg>
						</div>
						<span className="text-sm">New playlist</span>
					</div>
				</NavLink>
				<NavLink to="/podcast" className="w-full">
					<div className="flex items-center px-3 py-2.5 hover:bg-zinc-800 cursor-pointer rounded-sm">
						<div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3">
							<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
								<circle cx="12" cy="12" r="10" strokeWidth="2" />
								<path d="M8 12a4 4 0 0 1 8 0M9 16a3 3 0 0 1 6 0" strokeWidth="2" />
								<circle cx="12" cy="12" r="1" fill="currentColor" />
							</svg>
						</div>
						<span className="text-sm">New podcast</span>
					</div>
				</NavLink>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default StudioCreateButton;
