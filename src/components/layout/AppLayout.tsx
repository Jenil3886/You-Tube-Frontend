import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const AppLayout = () => {
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
		<div className="min-h-screen flex flex-col bg-background ">
			<Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
			<div className="flex flex-1">
				<Sidebar open={sidebarOpen} />
				<main
					className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? (isMobile ? "ml-0" : "md:ml-64") : "md:ml-20"} ${
						isMobile ? "ml-0" : ""
					} p-0 sm:p-2 md:p-6 overflow-x-hidden fade-in`}
				>
					<div className="slide-up">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
};

export default AppLayout;
