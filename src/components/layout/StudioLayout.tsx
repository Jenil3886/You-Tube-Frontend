import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { useIsMobile } from "@/hooks/use-mobile";
import StudioHeader from "./StudioHeader";
import StudioSidebar from "./StudioSidebar";

const StudioLayout = () => {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const isMobile = useIsMobile();

	// On mobile, sidebar should be closed by default
	useEffect(() => {
		if (isMobile) {
			setSidebarOpen(false);
		} else {
			setSidebarOpen(true);
		}
	}, [isMobile]);

	return (
		// {/* StudioLayout2.jsx */}
		<div className="flex flex-col h-screen bg-background">
			<StudioHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
			<div className="flex flex-1 overflow-hidden">
				<StudioSidebar open={sidebarOpen} />

				{/* Mobile Overlay */}
				{isMobile && sidebarOpen && <div className="fixed inset-0 bg-black/30 z-10" onClick={() => setSidebarOpen(false)}></div>}

				<main
					className={`flex-1 transition-all duration-300 overflow-auto  transform md:translate-x-0 [&::-webkit-scrollbar]:w-[1px] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-800 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600 ${
						sidebarOpen && !isMobile ? "md:ml-64" : "ml-0"
					}`}
				>
					<div className="p-4 md:p-6 max-w-7xl mx-auto">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
};

export default StudioLayout;
