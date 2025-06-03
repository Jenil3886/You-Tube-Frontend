import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface RestrictedModeDropdownProps {
	onClose: () => void;
}

const RestrictedModeDropdown = ({ onClose }: RestrictedModeDropdownProps) => {
	const [restrictedMode, setRestrictedMode] = useState(false);

	return (
		<div className="absolute right-0 top-0 z-50 w-80 overflow-hidden rounded-xl bg-zinc-900 text-white shadow-lg">
			<div className="flex items-center gap-4 border-b border-zinc-800 p-3">
				<Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-white">
					<ArrowLeft className="h-5 w-5" />
				</Button>
				<span className="text-lg font-medium">Restricted Mode</span>
			</div>

			<div className="flex flex-col gap-3 p-4">
				<p className="text-sm">This helps hide potentially mature videos. No filter is 100% accurate.</p>

				<p className="text-sm text-gray-400">This setting only applies to this browser.</p>

				<div className="mt-2 flex items-center justify-between">
					<span className="text-sm font-medium uppercase text-gray-400">Activate Restricted Mode</span>
					<Switch checked={restrictedMode} onCheckedChange={setRestrictedMode} />
				</div>
			</div>
		</div>
	);
};

export default RestrictedModeDropdown;
