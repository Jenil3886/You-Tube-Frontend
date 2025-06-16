import { ChevronRight, Clock, Component, MonitorPlay, QrCode, Settings, Volume2 } from "lucide-react";
import { useState } from "react";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { IoPlayCircleOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { SettingOption } from "@/types";

export const SettingsDropdown = () => {
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	const settingsOptions: SettingOption[] = [
		{
			label: "Stable volume",
			icon: Volume2,
			toggle: true,
		},
		{
			label: "Ambient mode",
			icon: MonitorPlay,
			toggle: true,
		},
		{
			label: "Annotations",
			icon: QrCode,
			toggle: true,
		},
		{
			label: "Sleep timer",
			icon: Clock,
			toggle: false,
			onClick: () => alert("Sleep timer not implemented yet."),
		},
		{
			label: "Playback speed",
			icon: IoPlayCircleOutline,
			toggle: false,
			onClick: () => alert("Playback speed not implemented yet."),
		},
		{
			label: "Quality",
			icon: HiAdjustmentsHorizontal,
			toggle: false,
			onClick: () => alert("Video quality not implemented yet."),
		},
	];

	const ToggleSwitch = ({ isChecked, onToggle }: { isChecked: boolean; onToggle: () => void }) => {
		return (
			<label className="relative inline-flex items-center cursor-pointer">
				<input type="checkbox" checked={isChecked} onChange={onToggle} className="sr-only peer" />
				<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600"></div>
			</label>
		);
	};

	return (
		<>
			<Button onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
				<Settings className="mr-2" /> Settings
			</Button>

			{isSettingsOpen && (
				<div className="absolute right-0 mt-2 bg-black text-white rounded shadow z-50">
					<div className="p-2 hover:bg-gray-800 cursor-pointer flex items-center justify-between">
						Stable Volume
						<ToggleSwitch isChecked={true} onToggle={() => {}} />
					</div>
					<div className="p-2 hover:bg-gray-800 cursor-pointer flex items-center justify-between">
						Ambient Mode
						<ToggleSwitch isChecked={false} onToggle={() => {}} />
					</div>
					<div className="p-2 hover:bg-gray-800 cursor-pointer flex items-center justify-between">
						Playback Speed
						<ChevronRight className="w-4 h-4 text-gray-400" />
					</div>
				</div>
			)}
		</>
	);
};
