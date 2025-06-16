import { ArrowLeft, Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AccountsDropdownProps } from "@/types";

const AccountsDropdown = ({ onClose }: AccountsDropdownProps) => {
	// Mock accounts data
	const accounts = [
		{
			id: "1",
			name: "Jenil Gajera",
			email: "gajerajenil8@gmail.com",
			username: "@jenilgajera7383",
			subscribers: "No subscribers",
			isActive: true,
			avatarUrl: "https://github.com/shadcn.png",
		},
	];

	return (
		<div className="absolute right-0 top-0 z-50 w-80 overflow-hidden rounded-xl bg-zinc-900 text-white shadow-lg">
			<div className="flex items-center gap-4 border-b border-zinc-800 p-3">
				<Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-white">
					<ArrowLeft className="h-5 w-5" />
				</Button>
				<span className="text-lg font-medium">Accounts</span>
			</div>

			<div className="py-2">
				{/* User email */}
				<div className="border-b border-zinc-800 px-4 py-2 text-sm text-gray-400">{accounts[0].email}</div>

				{/* Account list */}
				<div className="border-b border-zinc-800">
					{accounts.map((account) => (
						<div key={account.id} className="flex items-start gap-3 px-4 py-3">
							<Avatar className="h-10 w-10">
								<AvatarImage src={account.avatarUrl} alt={account.name} />
								<AvatarFallback>{account.name.charAt(0)}</AvatarFallback>
							</Avatar>
							<div className="flex flex-1 flex-col">
								<div className="flex items-center justify-between">
									<span className="font-medium">{account.name}</span>
									{account.isActive && <Check className="h-5 w-5 text-blue-500" />}
								</div>
								<span className="text-sm text-gray-400">{account.username}</span>
								<span className="text-sm text-gray-400">{account.subscribers}</span>
							</div>
						</div>
					))}
					<div className="px-4 py-2">
						<Button variant="ghost" className="w-full justify-start px-4 py-2 text-blue-500 hover:bg-zinc-800 hover:text-blue-400">
							View all channels
						</Button>
					</div>
				</div>

				{/* Actions */}
				<div className="px-2 py-1">
					<Button variant="ghost" className="flex w-full items-center gap-3 justify-start px-4 py-2 text-white hover:bg-zinc-800">
						<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<circle cx="12" cy="8" r="5" strokeWidth="2" />
							<path d="M20 21a8 8 0 0 0-16 0" strokeWidth="2" />
							<path d="M12 13v4m-4-2h8" strokeWidth="2" />
						</svg>
						Add account
					</Button>

					<Button variant="ghost" className="flex w-full items-center gap-3 justify-start px-4 py-2 text-white hover:bg-zinc-800">
						<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeWidth="2" />
							<path d="M16 17l5-5-5-5" strokeWidth="2" />
							<path d="M21 12H9" strokeWidth="2" />
						</svg>
						Sign out
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AccountsDropdown;
