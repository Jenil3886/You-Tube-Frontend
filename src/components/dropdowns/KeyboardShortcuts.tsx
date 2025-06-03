interface KeyboardShortcutsProps {
	onClose: () => void;
}

const KeyboardShortcuts = ({ onClose }: KeyboardShortcutsProps) => {
	const sections = [
		{
			title: "Playback",
			options: [
				{ label: "Toggle play/pause", hotkey: "k" },
				{ label: "Rewind 10 seconds", hotkey: "j" },
				{ label: "Fast forward 10 seconds", hotkey: "l" },
				{ label: "Previous video", hotkey: "P (SHIFT + p)" },
				{ label: "Next video", hotkey: "N (SHIFT + n)" },
				{ label: "Previous frame (while paused)", hotkey: "," },
				{ label: "Next frame (while paused)", hotkey: "." },
				{ label: "Decrease playback rate", hotkey: "< (SHIFT+,)" },
				{ label: "Increase playback rate", hotkey: "> (SHIFT+.)" },
				{ label: "Seek to specific point in the video (7 advances to 70% of duration)", hotkey: "0..9" },
				{ label: "Seek to previous chapter", hotkey: "CONTROL + ←" },
				{ label: "Seek to next chapter", hotkey: "CONTROL + →" },
			],
		},
		{
			title: "General",
			options: [
				{ label: "Toggle full screen", hotkey: "f" },
				{ label: "Toggle theatre mode", hotkey: "t" },
				{ label: "Toggle miniplayer", hotkey: "i" },
				{ label: "Close miniplayer or current dialogue", hotkey: "ESCAPE" },
				{ label: "Toggle mute", hotkey: "m" },
			],
		},
		{
			title: "Subtitles and closed captions",
			options: [
				{ label: "If the video supports captions, toggle captions ON/OFF", hotkey: "c" },
				{ label: "Rotate through different text opacity levels", hotkey: "o" },
				{ label: "Rotate through different window opacity levels", hotkey: "w" },
				{ label: "Rotate through font sizes (increasing)", hotkey: "+" },
				{ label: "Rotate through font sizes (decreasing)", hotkey: "-" },
			],
		},
		{
			title: "Spherical videos",
			options: [
				{ label: "Pan up", hotkey: "w" },
				{ label: "Pan left", hotkey: "a" },
				{ label: "Pan down", hotkey: "s" },
				{ label: "Pan right", hotkey: "d" },
				{ label: "Zoom in", hotkey: "+ on numpad or ]" },
				{ label: "Zoom out", hotkey: "- on numpad or [" },
			],
		},
	];

	return (
		<div className="absolute right-0 top-0 z-50 w-[100vh] overflow-hidden rounded-xl bg-zinc-900 text-white shadow-lg">
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl max-h-[747px] overflow-hidden">
				<div className="p-4 border-b border-gray-200 dark:border-gray-700">
					<h2 className="text-xl font-bold">Keyboard shortcuts</h2>
				</div>

				<div className="overflow-y-auto max-h-[600px] p-4">
					{sections.map((section, index) => (
						<div key={index} className="mb-6">
							<h3 className="text-lg font-semibold mb-3">{section.title}</h3>
							<div className="space-y-2">
								{section.options.map((option, optIndex) => (
									<div key={optIndex} className="flex justify-between items-center">
										<div className="text-sm">{option.label}</div>
										<div className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono">{option.hotkey}</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>

				<div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
					<button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
						Dismiss
					</button>
				</div>
			</div>
		</div>
	);
};

export default KeyboardShortcuts;
