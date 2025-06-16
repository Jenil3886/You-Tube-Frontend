import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, User } from "lucide-react";
import axios from "axios";
import { apiurl } from "@/constants";
import { CustomizeChannelModalProps } from "@/types";

const CustomizeChannelModal = ({ open, onOpenChange, activeChannel, onUpdateChannel }: CustomizeChannelModalProps) => {
	const navigate = useNavigate();
	const { toast } = useToast();

	// Form state
	const [name, setName] = useState(activeChannel?.name || "");
	const [handle, setHandle] = useState(activeChannel?.handle || "");
	const [description, setDescription] = useState(activeChannel?.description || "");
	const [profilePicture, setProfilePicture] = useState<string | null>(activeChannel?.profilePicture || null);
	const [channelBanner, setChannelBanner] = useState<string | null>(activeChannel?.channelBanner || null);

	// Temporary image URLs for preview
	const [profilePreview, setProfilePreview] = useState<string | null>(null);
	const [bannerPreview, setBannerPreview] = useState<string | null>(null);

	// Reset form when modal opens with new channel data
	useEffect(() => {
		if (open && activeChannel) {
			setName(activeChannel.name);
			setHandle(activeChannel.handle);
			setDescription(activeChannel.description || "");
			setProfilePicture(activeChannel.profilePicture || null);
			setChannelBanner(activeChannel.channelBanner || null);
			setProfilePreview(null);
			setBannerPreview(null);
		}
	}, [open, activeChannel]);

	const handleGoToStudio = () => {
		navigate("/studio/customization");
		onOpenChange(false);
	};

	const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const url = URL.createObjectURL(file);
			setProfilePreview(url);

			// In a real app, you would upload this to a server/storage and get back a URL
			// For this demo, we'll just use the object URL
			console.log("Profile picture selected:", file.name);
		}
	};

	const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const url = URL.createObjectURL(file);
			setBannerPreview(url);

			// In a real app, you would upload this to a server/storage and get back a URL
			// For this demo, we'll just use the object URL
			console.log("Banner image selected:", file.name);
		}
	};

	const handleSaveChanges = async () => {
		if (!activeChannel) return;

		// Validate
		if (!name.trim()) {
			toast({
				title: "Error",
				description: "Channel name is required",
				variant: "destructive",
			});
			return;
		}

		if (!handle.trim()) {
			toast({
				title: "Error",
				description: "Channel handle is required",
				variant: "destructive",
			});
			return;
		}

		try {
			const updatedChannelData = {
				name,
				handle,
				description,
				profilePicture: profilePreview || profilePicture,
				channelBanner: bannerPreview || channelBanner,
			};

			const response = await axios.put(`${apiurl}/channels/${activeChannel.id}`, updatedChannelData, { withCredentials: true });
			const updatedChannel = response.data.data || response.data.channel;
			onUpdateChannel(updatedChannel);

			// Clean up object URLs to prevent memory leaks
			if (profilePreview) {
				URL.revokeObjectURL(profilePreview);
			}
			if (bannerPreview) {
				URL.revokeObjectURL(bannerPreview);
			}

			// Close modal
			onOpenChange(false);

			// Show success message
			toast({
				title: "Success",
				description: "Channel updated successfully",
			});
		} catch (error) {
			console.error("Error updating channel:", error);
			toast({
				title: "Error",
				description: "Failed to update channel. Please try again.",
				variant: "destructive",
			});
		}

		// Update channel in parent component
		onUpdateChannel({
			...activeChannel,
			name,
			handle,
			description,
			profilePicture: profilePreview || profilePicture,
			channelBanner: bannerPreview || channelBanner,
		});

		// Clean up any object URLs to prevent memory leaks
		if (profilePreview) {
			URL.revokeObjectURL(profilePreview);
		}
		if (bannerPreview) {
			URL.revokeObjectURL(bannerPreview);
		}

		// Close modal
		onOpenChange(false);

		// Show success message
		toast({
			title: "Success",
			description: "Channel updated successfully",
		});
	};

	if (!activeChannel) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-2xl">
				<DialogHeader>
					<DialogTitle>Customize Channel</DialogTitle>
					<DialogDescription>Make quick changes to your channel appearance and details</DialogDescription>
				</DialogHeader>

				<Tabs defaultValue="basic-info" className="w-full">
					<TabsList className="mb-4">
						<TabsTrigger value="basic-info">Basic Info</TabsTrigger>
						<TabsTrigger value="branding">Branding</TabsTrigger>
					</TabsList>

					<TabsContent value="basic-info" className="space-y-4 animate-fade-in">
						<div className="space-y-2">
							<Label htmlFor="channel-name">Channel name</Label>
							<Input id="channel-name" value={name} onChange={(e) => setName(e.target.value)} />
						</div>

						<div className="space-y-2">
							<Label htmlFor="channel-handle">Channel handle</Label>
							<div className="flex items-center">
								<span className="text-muted-foreground mr-1">@</span>
								<Input id="channel-handle" value={handle} onChange={(e) => setHandle(e.target.value)} className="flex-1" />
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="channel-description">Description</Label>
							<Textarea
								id="channel-description"
								rows={5}
								placeholder="Describe your channel to viewers"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
							<p className="text-xs text-muted-foreground">{5000 - (description?.length || 0)} characters remaining</p>
						</div>
					</TabsContent>

					<TabsContent value="branding" className="space-y-6 animate-fade-in">
						<div className="space-y-5">
							<div className="border-b pb-5">
								<h3 className="text-lg font-medium mb-4">Profile Picture</h3>
								<div className="flex items-center gap-6">
									<div className="shrink-0">
										<Avatar className="h-24 w-24 border-2">
											{profilePreview || profilePicture ? (
												<AvatarImage src={profilePreview || profilePicture || ""} />
											) : (
												<AvatarFallback className="bg-muted">
													<User className="h-10 w-10 text-muted-foreground" />
												</AvatarFallback>
											)}
										</Avatar>
									</div>
									<div className="space-y-2 flex-1">
										<Label htmlFor="profile-upload">Upload profile picture</Label>
										<div className="flex items-center gap-4">
											<Input id="profile-upload" type="file" accept="image/*" onChange={handleProfilePictureChange} className="max-w-sm" />
										</div>
										<p className="text-xs text-muted-foreground">Recommended: Square image, at least 98 x 98 pixels</p>
									</div>
								</div>
							</div>

							<div className="pt-2">
								<h3 className="text-lg font-medium mb-4">Channel Banner</h3>
								<div className="space-y-4">
									<div className="w-full h-32 bg-muted rounded-md overflow-hidden relative">
										{bannerPreview || channelBanner ? (
											<img src={bannerPreview || channelBanner || ""} alt="Banner preview" className="w-full h-full object-cover" />
										) : (
											<div className="w-full h-full flex items-center justify-center bg-muted">
												<p className="text-muted-foreground">Banner preview</p>
											</div>
										)}
									</div>
									<div className="space-y-2">
										<Label htmlFor="banner-upload">Upload banner image</Label>
										<div className="flex items-center gap-4">
											<Input id="banner-upload" type="file" accept="image/*" onChange={handleBannerChange} />
										</div>
										<p className="text-xs text-muted-foreground">Recommended: 2048 x 1152 pixels, 16:9 aspect ratio</p>
									</div>
								</div>
							</div>
						</div>

						<div className="pt-4">
							<p className="text-sm text-muted-foreground">For advanced branding options, please use YouTube Studio's customization page.</p>
							<Button onClick={handleGoToStudio} variant="outline" className="mt-2">
								Go to YouTube Studio
							</Button>
						</div>
					</TabsContent>
				</Tabs>

				<DialogFooter className="flex justify-between sm:justify-between">
					<Button variant="outline" onClick={handleGoToStudio}>
						Advanced Options
					</Button>
					<Button onClick={handleSaveChanges} className="flex items-center gap-1">
						<Upload className="h-4 w-4" />
						Save Changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CustomizeChannelModal;
