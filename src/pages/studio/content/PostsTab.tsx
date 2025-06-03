import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PodcastsTab = () => {
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

	const handleCreatePodcast = () => {
		if (!hasChannel) {
			toast({
				title: "No channel found",
				description: "Please create a channel first to create podcasts",
			});
			navigate("/create-channel");
		} else {
			// Handle podcast creation logic here
			// This would typically navigate to a podcast creation page
			console.log("Create podcast");
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
			<div className="w-full max-w-md text-center">
				<div className="mx-auto w-40 h-40 mb-6">
					<svg viewBox="0 0 200 200" className="text-blue-400" fill="currentColor">
						<path d="M80 40c-11 0-20 9-20 20v80c0 11 9 20 20 20h40c11 0 20-9 20-20V60c0-11-9-20-20-20H80zm0 20h40v80H80V60z" />
						<rect x="50" y="80" width="40" height="60" />
						<path d="M140 100c11 0 20-9 20-20s-9-20-20-20-20 9-20 20 9 20 20 20z" />
					</svg>
				</div>
				<p className="text-lg mb-2">Create a new podcast, set an existing playlist as a podcast or submit your RSS feed.</p>
				<p className="mb-6">
					<a href="#" className="text-blue-500 hover:underline">
						Learn more
					</a>
				</p>
				<Button className="flex items-center gap-2" variant="secondary" onClick={handleCreatePodcast}>
					<PlusCircle className="w-4 h-4" />
					{hasChannel ? "New podcast" : "Create channel to start"}
				</Button>
			</div>
		</div>
	);
};

export default PodcastsTab;
