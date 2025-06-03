import { useState } from "react";
import { Bell, User, X } from "lucide-react";
import { MdNotificationsActive, MdNotificationsNone, MdOutlineNotificationsOff } from "react-icons/md";
import { FaUserMinus } from "react-icons/fa";

interface SubscriptionDropdownProps {
	isSubscribed: boolean;
	onUnsubscribe: () => void;
}

const SubscriptionDropdown = ({ isSubscribed, onUnsubscribe }: SubscriptionDropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="relative">
			<button
				type="button"
				className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none hover:bg-secondary/50"
				onClick={handleToggleDropdown}
			>
				<MdNotificationsNone className="text-[20px]" />
				<span>Notifications</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="w-4 h-4 ml-1"
				>
					<polyline points="6 9 12 15 18 9"></polyline>
				</svg>
			</button>

			{isOpen && (
				<div className="absolute right-0 mt-2 w-48 bg-background border border-zinc-200 dark:border-zinc-700 rounded-md shadow-md overflow-hidden">
					<ul className="text-sm">
						<li className="flex items-center gap-2 px-4 py-2 hover:bg-secondary/50 cursor-pointer">
							<MdNotificationsActive className="text-[20px]" />
							<span>All</span>
						</li>
						<li className="flex items-center gap-2 px-4 py-2 hover:bg-secondary/50 cursor-pointer">
							<MdNotificationsNone className="text-[20px]" />
							<span>Personalised</span>
						</li>
						<li className="flex items-center gap-2 px-4 py-2 hover:bg-secondary/50 cursor-pointer">
							<MdOutlineNotificationsOff className="text-[20px]" />
							<span>None</span>
						</li>
						<li className="flex items-center gap-2 px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer" onClick={onUnsubscribe}>
							<FaUserMinus className="text-[20px]" />
							<span>Unsubscribe</span>
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default SubscriptionDropdown;
