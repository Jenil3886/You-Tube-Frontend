import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import NotificationsDrawer from "../notifications/NotificationsDrawer";

const NotificationButton = () => {
	const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

	// Toggle notifications drawer
	const toggleNotifications = () => {
		setIsNotificationsOpen(!isNotificationsOpen);
	};

	return (
		<>
			<Button
				variant="ghost"
				size="icon"
				className="rounded-full relative transition-all duration-200 hover:bg-secondary/80"
				onClick={toggleNotifications}
			>
				<Bell className="h-5 w-5 bell-animation" />
				<span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
			</Button>

			{/* Notifications Drawer */}
			<NotificationsDrawer open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen} />
		</>
	);
};

export default NotificationButton;
