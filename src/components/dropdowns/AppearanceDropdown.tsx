import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { AppearanceDropdownProps } from "@/types";

const AppearanceDropdown = ({ onClose }: AppearanceDropdownProps) => {
	const { theme, setTheme } = useTheme();

	return (
		<div className="absolute right-0 top-0 z-50 w-80 overflow-hidden rounded-xl bg-zinc-900 text-white shadow-lg">
			<div className="flex items-center gap-4 border-b border-zinc-800 p-3">
				<Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-white">
					<ArrowLeft className="h-5 w-5" />
				</Button>
				<span className="text-lg font-medium">Appearance</span>
			</div>

			<div className="p-4 text-sm text-gray-400">Setting applies to this browser only</div>

			<div className="px-2 py-1">
				<Button
					variant="ghost"
					className="flex w-full items-center justify-between px-4 py-2 text-white hover:bg-zinc-800"
					onClick={() => setTheme("system")}
				>
					<span>Use device theme</span>
					{theme === "system" && <Check className="h-5 w-5" />}
				</Button>

				<Button
					variant="ghost"
					className="flex w-full items-center justify-between px-4 py-2 text-white hover:bg-zinc-800"
					onClick={() => setTheme("dark")}
				>
					<span>Dark theme</span>
					{theme === "dark" && <Check className="h-5 w-5" />}
				</Button>

				<Button
					variant="ghost"
					className="flex w-full items-center justify-between px-4 py-2 text-white hover:bg-zinc-800"
					onClick={() => setTheme("light")}
				>
					<span>Light theme</span>
					{theme === "light" && <Check className="h-5 w-5" />}
				</Button>
			</div>
		</div>
	);
};

export default AppearanceDropdown;
