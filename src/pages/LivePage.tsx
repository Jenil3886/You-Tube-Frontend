import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Users, Globe, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LivePage = () => {
	const [streamTitle, setStreamTitle] = useState("");
	const [streamDescription, setStreamDescription] = useState("");
	const [privacy, setPrivacy] = useState("public");
	const [isGoingLive, setIsGoingLive] = useState(false);
	const [activeTab, setActiveTab] = useState("stream");

	const { toast } = useToast();

	const handleStartStream = () => {
		if (!streamTitle.trim()) {
			toast({
				title: "Title required",
				description: "Please add a title for your live stream",
				variant: "destructive",
			});
			return;
		}

		setIsGoingLive(true);

		// Simulate stream setup
		setTimeout(() => {
			toast({
				title: "Stream started!",
				description: "You are now live. Your audience can see you.",
			});
			// In a real app, this would connect to a streaming service
		}, 2000);
	};

	return (
		<div className="container max-w-4xl mx-auto py-8">
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Go live</CardTitle>
					<CardDescription>Create a live stream and connect with your audience in real-time</CardDescription>
				</CardHeader>

				<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
					<div className="border-b px-6">
						<TabsList className="bg-transparent">
							<TabsTrigger value="stream" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
								Stream
							</TabsTrigger>
							<TabsTrigger value="settings" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
								Settings
							</TabsTrigger>
						</TabsList>
					</div>

					<TabsContent value="stream" className="pt-4">
						<CardContent className="space-y-6">
							<div className="bg-gray-100 dark:bg-gray-800 rounded-md p-8 flex flex-col items-center justify-center min-h-[300px]">
								<Video className="w-12 h-12 text-gray-400 mb-3" />
								<h3 className="font-medium text-lg mb-1">{isGoingLive ? "Your stream is live!" : "Stream preview"}</h3>
								<p className="text-sm text-gray-500 text-center max-w-md mb-6">
									{isGoingLive
										? "You are now broadcasting to your audience. Manage your stream settings in the Settings tab."
										: "Your camera preview will appear here. Make sure your camera and microphone are connected."}
								</p>
								{!isGoingLive && <Button onClick={handleStartStream}>{isGoingLive ? "End stream" : "Go live"}</Button>}
							</div>

							{isGoingLive && (
								<div className="p-4 bg-green-100 dark:bg-green-900 rounded-md">
									<p className="text-green-800 dark:text-green-200 flex items-center">
										<span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
										LIVE: {streamTitle}
									</p>
									<p className="text-sm text-green-700 dark:text-green-300 mt-1">Stream has been active for 00:00:00</p>
								</div>
							)}
						</CardContent>
					</TabsContent>

					<TabsContent value="settings">
						<CardContent className="space-y-6 pt-4">
							<div>
								<label className="block text-sm font-medium mb-1">Title (required)</label>
								<Input value={streamTitle} onChange={(e) => setStreamTitle(e.target.value)} placeholder="Add a title for your stream" required />
							</div>

							<div>
								<label className="block text-sm font-medium mb-1">Description</label>
								<Textarea
									value={streamDescription}
									onChange={(e) => setStreamDescription(e.target.value)}
									placeholder="Tell viewers about your stream"
									rows={4}
								/>
							</div>

							<div>
								<label className="block text-sm font-medium mb-1">Visibility</label>
								<div className="space-y-2">
									<div className="flex items-center p-3 border rounded-md">
										<input
											type="radio"
											id="public"
											name="privacy"
											value="public"
											checked={privacy === "public"}
											onChange={() => setPrivacy("public")}
											className="mr-3"
										/>
										<label htmlFor="public" className="flex items-center">
											<Globe className="w-5 h-5 mr-2" />
											<div>
												<div className="font-medium">Public</div>
												<div className="text-sm text-gray-500">Everyone can watch your stream</div>
											</div>
										</label>
									</div>

									<div className="flex items-center p-3 border rounded-md">
										<input
											type="radio"
											id="unlisted"
											name="privacy"
											value="unlisted"
											checked={privacy === "unlisted"}
											onChange={() => setPrivacy("unlisted")}
											className="mr-3"
										/>
										<label htmlFor="unlisted" className="flex items-center">
											<Users className="w-5 h-5 mr-2" />
											<div>
												<div className="font-medium">Unlisted</div>
												<div className="text-sm text-gray-500">Anyone with the link can watch</div>
											</div>
										</label>
									</div>

									<div className="flex items-center p-3 border rounded-md">
										<input
											type="radio"
											id="private"
											name="privacy"
											value="private"
											checked={privacy === "private"}
											onChange={() => setPrivacy("private")}
											className="mr-3"
										/>
										<label htmlFor="private" className="flex items-center">
											<Lock className="w-5 h-5 mr-2" />
											<div>
												<div className="font-medium">Private</div>
												<div className="text-sm text-gray-500">Only you can watch</div>
											</div>
										</label>
									</div>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium mb-1">Stream settings</label>
								<div className="p-4 border rounded-md">
									<div className="flex items-center justify-between">
										<div>
											<h4 className="font-medium">Chat</h4>
											<p className="text-sm text-gray-500">Allow viewers to chat during your live stream</p>
										</div>
										<input type="checkbox" defaultChecked className="toggle" />
									</div>
								</div>
							</div>
						</CardContent>

						<CardFooter className="border-t p-4">
							<div className="flex gap-3 ml-auto">
								{!isGoingLive ? (
									<Button onClick={handleStartStream} disabled={!streamTitle}>
										Go live
									</Button>
								) : (
									<Button variant="destructive" onClick={() => setIsGoingLive(false)}>
										End stream
									</Button>
								)}
							</div>
						</CardFooter>
					</TabsContent>
				</Tabs>
			</Card>
		</div>
	);
};

export default LivePage;
