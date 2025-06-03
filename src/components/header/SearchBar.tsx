import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Web Speech API TypeScript declarations
interface SpeechRecognitionErrorEvent extends Event {
	error: string;
}

interface SpeechRecognitionEvent extends Event {
	results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
	readonly length: number;
	[index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
	readonly length: number;
	[index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
	transcript: string;
	confidence: number;
}

interface SpeechRecognition extends EventTarget {
	lang: string;
	continuous: boolean;
	interimResults: boolean;
	start(): void;
	stop(): void;
	onstart: (event: Event) => void;
	onresult: (event: SpeechRecognitionEvent) => void;
	onerror: (event: SpeechRecognitionErrorEvent) => void;
	onend: (event: Event) => void;
}

declare global {
	interface Window {
		SpeechRecognition: new () => SpeechRecognition;
		webkitSpeechRecognition: new () => SpeechRecognition;
	}
}

const SearchBar = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [isListening, setIsListening] = useState(false);
	const navigate = useNavigate();
	const { toast } = useToast();
	const recognitionRef = useRef<SpeechRecognition | null>(null);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
		}
	};

	const startListening = () => {
		if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
			// Initialize the SpeechRecognition object
			const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
			recognitionRef.current = new SpeechRecognition();

			recognitionRef.current.lang = "en-US";
			recognitionRef.current.continuous = false;
			recognitionRef.current.interimResults = false;

			recognitionRef.current.onstart = () => {
				setIsListening(true);
				toast({
					title: "Listening...",
					description: "Speak now to search",
				});
			};

			recognitionRef.current.onresult = (event) => {
				const transcript = event.results[0][0].transcript;
				setSearchQuery(transcript);
				setIsListening(false);

				// If confidence is high enough, automatically submit search
				if (event.results[0][0].confidence > 0.8) {
					setTimeout(() => {
						navigate(`/search?q=${encodeURIComponent(transcript.trim())}`);
					}, 500);
				}
			};

			recognitionRef.current.onerror = (event) => {
				console.error("Speech recognition error", event.error);
				setIsListening(false);
				toast({
					title: "Error",
					description: `Could not recognize speech: ${event.error}`,
					variant: "destructive",
				});
			};

			recognitionRef.current.onend = () => {
				setIsListening(false);
			};

			recognitionRef.current.start();
		} else {
			toast({
				title: "Not Supported",
				description: "Speech recognition is not supported in your browser.",
				variant: "destructive",
			});
		}
	};

	const stopListening = () => {
		if (recognitionRef.current) {
			recognitionRef.current.stop();
			setIsListening(false);
		}
	};

	const toggleListening = () => {
		if (isListening) {
			stopListening();
		} else {
			startListening();
		}
	};

	return (
		<form onSubmit={handleSearch} className="flex-1 max-w-xl mx-8">
			<div className="flex">
				<Input
					type="text"
					placeholder="Search"
					className="rounded-r-none rounded-l-full px-4  border-r-0"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>

				<Button type="submit" variant="ghost" size="icon" className="rounded-r-full rounded-l-none bg-gray-100 dark:bg-[#262626] px-6 border-l">
					<Search className="h-5 w-5" />
				</Button>

				<Button
					variant={isListening ? "default" : "ghost"}
					size="icon"
					className={`rounded-full ml-2 ${isListening ? "bg-youtube-red text-white" : ""}`}
					type="button"
					onClick={toggleListening}
					title={isListening ? "Stop listening" : "Search with voice"}
				>
					{isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
				</Button>
			</div>
		</form>
	);
};

export default SearchBar;
