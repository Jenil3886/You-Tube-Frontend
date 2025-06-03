import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const InspirationTab = () => {
	const [hasChannel, setHasChannel] = useState(false);
	const [isCheckingChannel, setIsCheckingChannel] = useState(true);
	const navigate = useNavigate();
	const { toast } = useToast();

	useEffect(() => {
		// Check if user has created a channel
		const checkChannel = () => {
			setIsCheckingChannel(true);
			// Check for channels in the new userChannels array
			const userChannelsJson = localStorage.getItem("userChannels");

			if (userChannelsJson) {
				const channels = JSON.parse(userChannelsJson);
				setHasChannel(channels.length > 0);
			} else {
				// Fallback to the old single channel check
				const userChannel = localStorage.getItem("userChannel");
				setHasChannel(!!userChannel);
			}

			setIsCheckingChannel(false);
		};

		checkChannel();
	}, []);

	const handleCreateIdeas = () => {
		if (!hasChannel) {
			toast({
				title: "No channel found",
				description: "Please create a channel first to use AI inspiration features",
			});
			navigate("/create-channel");
		} else {
			// Handle idea creation logic
			console.log("Generate ideas");
		}
	};

	if (isCheckingChannel) {
		return (
			<div className="flex items-center justify-center py-12">
				<p>Checking channel status...</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center py-12">
			<div className="w-full max-w-lg text-center">
				<div className="mx-auto w-32 h-32 mb-6">
					<svg viewBox="0 0 200 200" className="text-purple-500" fill="currentColor">
						<path d="M100 20C56 20 20 56 20 100s36 80 80 80 80-36 80-80-36-80-80-80zm20 110c0 5.5-4.5 10-10 10s-10-4.5-10-10v-40H60c-5.5 0-10-4.5-10-10s4.5-10 10-10h50c5.5 0 10 4.5 10 10v50z" />
					</svg>
				</div>
				<h2 className="text-xl font-bold mb-3">Ready to unlock and explore ideas with AI?</h2>
				<p className="text-gray-500 mb-8">
					{hasChannel
						? "To start brainstorming, enter a prompt. As you upload more videos, we'll suggest ideas for you."
						: "Create a channel first to unlock AI-powered content ideas for your videos."}
				</p>

				<div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-6">
					<h3 className="text-lg font-bold mb-2">Let's brainstorm</h3>
					<textarea
						placeholder={hasChannel ? "Describe a topic to create ideas" : "Create a channel to unlock this feature"}
						className="w-full p-3 mb-4 border rounded-md bg-white dark:bg-gray-900"
						rows={3}
						disabled={!hasChannel}
					/>
					<Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={handleCreateIdeas}>
						<svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor">
							<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" strokeWidth="2" />
							<path d="M12 16l4-4-4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M8 12h8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
						{hasChannel ? "Create ideas" : "Create channel first"}
					</Button>
					<p className="text-xs text-gray-500 mt-3">
						AI-generated content varies in quality and may be inaccurate or inappropriate. Use discretion before you create or use anything provided.
						Not professional advice.
					</p>
				</div>
			</div>
		</div>
	);
};

export default InspirationTab;
