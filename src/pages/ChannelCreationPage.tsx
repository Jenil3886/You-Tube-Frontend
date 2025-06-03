import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Check, Upload, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { apiurl } from "@/constants";

const channelSchema = z.object({
	name: z.string().min(3, "Channel name must be at least 3 characters").max(50, "Channel name can't exceed 50 characters"),
	handle: z
		.string()
		.min(3, "Handle must be at least 3 characters")
		.max(30, "Handle can't exceed 30 characters")
		.regex(/^[a-zA-Z0-9_]+$/, "Handle can only contain letters, numbers, and underscores"),
	description: z.string().max(1000, "Description can't exceed 1000 characters").optional(),
});

type ChannelFormValues = z.infer<typeof channelSchema>;

const ChannelCreationPage = () => {
	const [channelBanner, setChannelBanner] = useState<string | null>(null);
	const [profilePicture, setProfilePicture] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showSuccess] = useState(false);
	const navigate = useNavigate();
	const { toast } = useToast();

	const form = useForm<ChannelFormValues>({
		resolver: zodResolver(channelSchema),
		defaultValues: {
			name: "",
			handle: "",
			description: "",
		},
	});

	const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setChannelBanner(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setProfilePicture(reader.result as string);
			};

			reader.readAsDataURL(file);
		}
	};

	const onSubmit = async (data: ChannelFormValues) => {
		setIsSubmitting(true);

		try {
			const formData = new FormData();
			formData.append("name", data.name);
			formData.append("handle", data.handle);
			if (data.description) formData.append("description", data.description);
			if (profilePicture) formData.append("profilePicture", profilePicture);
			if (channelBanner) formData.append("channelBanner", channelBanner);

			// API call to create the channel
			await axios.post(`${apiurl}/channels`, formData, {
				headers: { "Content-Type": "multipart/form-data" },
				withCredentials: true,
			});

			toast({
				title: "Channel created successfully!",
				description: "You can now upload videos to your channel",
			});

			// Redirect to channel page after 2 seconds
			setTimeout(() => {
				navigate("/channel");
			}, 2000);
		} catch (error: any) {
			toast({
				title: "Error creating channel",
				description: error.response?.data?.message || "An error occurred while creating the channel.",
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="container max-w-4xl mx-auto py-8 px-4">
			<Card className="border-0 shadow-lg">
				<CardHeader className="pb-6">
					<CardTitle className="text-2xl font-bold">Create Your Channel</CardTitle>
					<CardDescription>Set up your channel to start uploading videos and building your audience</CardDescription>
				</CardHeader>

				{showSuccess ? (
					<CardContent className="pt-6 pb-8">
						<div className="flex flex-col items-center justify-center text-center space-y-6 py-8">
							<div className="bg-green-100 dark:bg-green-900/30 rounded-full p-3">
								<Check className="h-10 w-10 text-green-600 dark:text-green-400" />
							</div>
							<h2 className="text-xl font-semibold">Channel Created Successfully!</h2>
							<p className="text-muted-foreground max-w-md">
								Your channel has been created and is ready to go. You can now upload videos and customize your channel further.
							</p>
							<div className="flex flex-col sm:flex-row gap-3 mt-4">
								<Button onClick={() => navigate("/channel")} className="gap-2">
									View Your Channel
								</Button>
								<Button onClick={() => navigate("/upload")} variant="outline" className="gap-2">
									<Upload className="h-4 w-4" />
									Upload Your First Video
								</Button>
							</div>
						</div>
					</CardContent>
				) : (
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<CardContent className="space-y-8">
								<Alert variant="default" className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
									<AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
									<AlertTitle>Important</AlertTitle>
									<AlertDescription>
										Creating a channel is required before you can upload videos. All channel information can be edited later.
									</AlertDescription>
								</Alert>

								{/* Channel Banner */}
								<div className="space-y-4">
									<Label htmlFor="banner">Channel Banner</Label>
									<div
										className="relative w-full h-40 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center"
										onClick={() => document.getElementById("banner")?.click()}
									>
										{channelBanner ? (
											<img src={channelBanner} alt="Channel banner" className="w-full h-full object-cover" />
										) : (
											<div className="text-center p-4">
												<Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
												<p className="text-sm text-muted-foreground">Recommended size: 2048 x 1152 pixels</p>
											</div>
										)}
										<input id="banner" type="file" accept="image/*" className="hidden" onChange={handleBannerUpload} />
									</div>
								</div>

								{/* Profile Picture Upload */}
								<div className="flex items-center gap-8 flex-wrap md:flex-nowrap">
									<div className="w-full md:w-1/3">
										<Label htmlFor="profilePicture">Profile Picture</Label>
										<div
											className="mt-2 relative h-32 w-32 mx-auto rounded-full overflow-hidden cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center"
											onClick={() => document.getElementById("profilePicture")?.click()}
										>
											{profilePicture ? (
												<img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
											) : (
												<Upload className="h-8 w-8 text-gray-400" />
											)}
											<input id="profilePicture" type="file" accept="image/*" className="hidden" onChange={handleProfilePictureUpload} />
										</div>
									</div>

									<div className="flex-1 space-y-4 w-full md:w-2/3">
										<FormField
											control={form.control}
											name="name"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Channel Name</FormLabel>
													<FormControl>
														<Input placeholder="Enter channel name" {...field} />
													</FormControl>
													<FormDescription>This is the name that will appear on your channel</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="handle"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Handle</FormLabel>
													<FormControl>
														<div className="flex">
															<span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-gray-50 dark:bg-gray-800 text-gray-500 text-sm">
																@
															</span>
															<Input className="rounded-l-none" placeholder="your_handle" {...field} />
														</div>
													</FormControl>
													<FormDescription>Your unique @handle for your channel</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>

								<Separator />

								{/* Channel Description */}
								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Channel Description</FormLabel>
											<FormControl>
												<Textarea placeholder="Tell viewers about your channel..." className="min-h-32" {...field} />
											</FormControl>
											<FormDescription>Describe what kind of content viewers can expect from your channel</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
							</CardContent>

							<CardFooter className="flex justify-between pt-6 pb-8">
								<Button variant="outline" type="button" onClick={() => navigate("/")}>
									Cancel
								</Button>
								<Button type="submit" disabled={isSubmitting}>
									{isSubmitting ? "Creating..." : "Create Channel"}
								</Button>
							</CardFooter>
						</form>
					</Form>
				)}
			</Card>
		</div>
	);
};

export default ChannelCreationPage;

// (\_/)
// (*-*)
// ({*})
