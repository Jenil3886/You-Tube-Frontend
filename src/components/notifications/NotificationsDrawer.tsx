import { Settings, MoreVertical } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

interface Notification {
	id: string;
	avatar: string;
	channel: string;
	title: string;
	time: string;
	thumbnail?: string;
	isImportant?: boolean;
}

const mockNotifications: Notification[] = [
	{
		id: "1",
		avatar: "https://github.com/shadcn.png",
		channel: "Full Disclosure",
		title: "uploaded: IBM Replaces HR Department with AI",
		time: "10 hours ago",
		thumbnail: "https://picsum.photos/100/56?random=1",
		isImportant: true,
	},
	{
		id: "2",
		avatar: "https://picsum.photos/40/40?random=2",
		channel: "Trakin Tech",
		title: "uploaded: Nothing Phone (3) Teased, Galaxy S25 FE Coming, OnePlus 13s x Plus KeyGalaxy F56,Xiaomi 16-#TTN1676",
		time: "14 hours ago",
		thumbnail: "https://picsum.photos/100/56?random=2",
	},
	{
		id: "3",
		avatar: "https://picsum.photos/40/40?random=3",
		channel: "BIG Magic",
		title: "uploaded: Phulki Hindi | Ep - 37 | Preview | May 13 2025 | BIG Magic",
		time: "19 minutes ago",
		thumbnail: "https://picsum.photos/100/56?random=3",
	},
	{
		id: "4",
		avatar: "https://picsum.photos/40/40?random=4",
		channel: "Giriraj Studio Official",
		title: "uploaded: જોરદાર કોમેડી જોક્સ || Kamlesh Prajapati || 07-Mangla kali Gaushala Dayro-Mumbai-2025",
		time: "2 hours ago",
		thumbnail: "https://picsum.photos/100/56?random=4",
	},
];

interface NotificationsDrawerProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const NotificationsDrawer = ({ open, onOpenChange }: NotificationsDrawerProps) => {
	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent side="right" className="w-[380px] sm:max-w-md p-0 border-none bg-zinc-900 text-white">
				<div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
					<h2 className="text-lg font-medium">Notifications</h2>
					<Button variant="ghost" size="icon" className="rounded-full">
						<Settings className="h-5 w-5" />
					</Button>
				</div>

				<div className="overflow-y-auto h-[calc(100vh-60px)]">
					<div className="py-2">
						<h3 className="px-4 py-2 text-sm font-medium">Important</h3>
						{mockNotifications
							.filter((notification) => notification.isImportant)
							.map((notification) => (
								<NotificationItem key={notification.id} notification={notification} />
							))}
					</div>

					<div className="pt-2 border-t border-zinc-800">
						<h3 className="px-4 py-2 text-sm font-medium">More notifications</h3>
						{mockNotifications
							.filter((notification) => !notification.isImportant)
							.map((notification) => (
								<NotificationItem key={notification.id} notification={notification} />
							))}
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};

const NotificationItem = ({ notification }: { notification: Notification }) => {
	return (
		<div className="flex gap-3 px-4 py-3 hover:bg-zinc-800 cursor-pointer relative">
			<div className="flex-shrink-0">
				<Avatar className="h-8 w-8">
					<img src={notification.avatar} alt={notification.channel} />
				</Avatar>
			</div>
			<div className="flex-grow min-w-0">
				<div className="flex items-start justify-between gap-2">
					<div>
						<p className="text-sm font-medium line-clamp-2">
							<span className="font-semibold">{notification.channel}</span> {notification.title}
						</p>
						<p className="text-xs text-gray-400 mt-1">{notification.time}</p>
					</div>
					{notification.thumbnail && (
						<div className="flex-shrink-0">
							<img src={notification.thumbnail} alt="Thumbnail" className="w-20 h-12 object-cover rounded" />
						</div>
					)}
				</div>
			</div>
			<button className="absolute right-2 top-3 p-1 opacity-0 hover:opacity-100 hover:bg-zinc-700 rounded-full">
				<MoreVertical className="h-5 w-5" />
			</button>
			{notification.isImportant && (
				<div className="absolute left-1 top-[50%] -translate-y-1/2">
					<div className="w-1 h-1 rounded-full bg-blue-500"></div>
				</div>
			)}
		</div>
	);
};

export default NotificationsDrawer;
