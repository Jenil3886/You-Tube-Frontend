import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { languages } from "@/data/languages";
import { LanguageDropdownProps } from "@/types";

const LanguageDropdown = ({ onClose }: LanguageDropdownProps) => {
	const [selectedLanguage, setSelectedLanguage] = useState("English (UK)");
	const [searchQuery, setSearchQuery] = useState("");

	const languageOptionsRef = useRef<HTMLDivElement | null>(null);

	const handleSelectLanguage = (language: string) => {
		setSelectedLanguage(language);
	};

	const filteredLanguages = useMemo(
		() => languages.filter((language) => language.label.toLowerCase().includes(searchQuery.toLowerCase())),
		[searchQuery, languages]
	);

	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (e.key === "Backspace") {
				setSearchQuery((prevQuery) => prevQuery.slice(0, -1));
			} else if (/^[a-zA-Z0-9\s]$/.test(e.key)) {
				setSearchQuery((prevQuery) => prevQuery + e.key);
			}
		};

		document.addEventListener("keydown", handleKeyPress);
		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, []);

	return (
		<div ref={languageOptionsRef} className="absolute right-0 top-0 z-50 w-80 overflow-hidden rounded-xl bg-zinc-900 text-white shadow-lg">
			<div className="flex items-center gap-4 border-b border-zinc-800 p-3">
				<Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-white">
					<ArrowLeft className="h-5 w-5" />
				</Button>
				<span className="text-lg font-medium">Choose your language</span>
			</div>

			<ScrollArea className="h-[400px]">
				<div className="px-2 py-1">
					{filteredLanguages.map((language) => (
						<Button
							key={language.value}
							variant="ghost"
							className="flex w-full items-center justify-between px-4 py-2 text-white hover:bg-zinc-800"
							onClick={() => handleSelectLanguage(language.value)}
						>
							<span>{language.label}</span>
							{selectedLanguage === language.value && <Check className="h-5 w-5" />}
						</Button>
					))}
				</div>
			</ScrollArea>
		</div>
	);
};

export default LanguageDropdown;
