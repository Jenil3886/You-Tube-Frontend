import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const StudioCustomizationPage = () => {
	const [autoplay, setAutoplay] = useState(true);
	const [recommendations, setRecommendations] = useState(true);
	const [comments, setComments] = useState(true);

	return (
		<div className="space-y-6">
			<h1 className="text-3xl font-bold">Customization</h1>

			<Tabs defaultValue="layout" className="w-full">
				<TabsList>
					<TabsTrigger value="layout">Layout</TabsTrigger>
					<TabsTrigger value="branding">Branding</TabsTrigger>
					<TabsTrigger value="basic-info">Basic Info</TabsTrigger>
					<TabsTrigger value="advanced">Advanced</TabsTrigger>
				</TabsList>

				<TabsContent value="layout" className="mt-6 space-y-6">
					<div className="grid gap-6 md:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle>Channel Trailer</CardTitle>
								<CardDescription>A video that introduces your channel to visitors who aren't subscribed</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="aspect-video bg-muted flex items-center justify-center rounded-md">
									<span className="text-muted-foreground">No trailer selected</span>
								</div>
								<Button>Select Trailer</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Featured Sections</CardTitle>
								<CardDescription>Showcase your content to visitors</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="border rounded-md p-4">
									<h3 className="font-medium mb-2">Popular Videos</h3>
									<p className="text-sm text-muted-foreground">Automatically shows your most popular content</p>
								</div>
								<div className="border rounded-md p-4">
									<h3 className="font-medium mb-2">Recent Uploads</h3>
									<p className="text-sm text-muted-foreground">Shows your newest videos</p>
								</div>
								<Button>Add Section</Button>
							</CardContent>
						</Card>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>Video Display Options</CardTitle>
							<CardDescription>Configure how videos appear on your channel</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="flex flex-col space-y-2">
								<div className="flex items-center justify-between">
									<Label htmlFor="autoplay">Autoplay channel trailer</Label>
									<Switch id="autoplay" checked={autoplay} onCheckedChange={setAutoplay} />
								</div>
								<p className="text-sm text-muted-foreground">When enabled, your channel trailer will play automatically for visitors</p>
							</div>

							<div className="flex flex-col space-y-2">
								<div className="flex items-center justify-between">
									<Label htmlFor="recommendations">Show recommended content</Label>
									<Switch id="recommendations" checked={recommendations} onCheckedChange={setRecommendations} />
								</div>
								<p className="text-sm text-muted-foreground">When enabled, users will see recommended videos alongside your content</p>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="branding" className="mt-6 space-y-6">
					<div className="grid gap-6 md:grid-cols-3">
						<Card>
							<CardHeader>
								<CardTitle>Profile Picture</CardTitle>
								<CardDescription>Appears next to your videos and comments</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="w-32 h-32 bg-muted rounded-full mx-auto flex items-center justify-center">
									<span className="text-muted-foreground">No image</span>
								</div>
								<div className="flex justify-center">
									<Button>Upload Image</Button>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Banner Image</CardTitle>
								<CardDescription>Displayed at the top of your channel</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="aspect-[6/1] bg-muted rounded-md flex items-center justify-center">
									<span className="text-muted-foreground">No banner image</span>
								</div>
								<div className="flex justify-center">
									<Button>Upload Banner</Button>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Watermark</CardTitle>
								<CardDescription>Appears over your videos</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="w-20 h-20 bg-muted rounded-md mx-auto flex items-center justify-center">
									<span className="text-muted-foreground">No watermark</span>
								</div>
								<div className="flex justify-center">
									<Button>Upload Watermark</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="basic-info" className="mt-6 space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Channel Details</CardTitle>
							<CardDescription>Basic information about your channel</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-2">
								<Label htmlFor="channel-name">Channel name</Label>
								<Input id="channel-name" defaultValue="My Awesome Channel" />
							</div>

							<div className="space-y-2">
								<Label htmlFor="channel-description">Description</Label>
								<Textarea
									id="channel-description"
									rows={5}
									placeholder="Describe your channel to viewers"
									defaultValue="Welcome to my channel! I create content about web development, programming tips, and tech reviews."
								/>
								<p className="text-xs text-muted-foreground">5000 characters remaining</p>
							</div>

							<div className="space-y-2">
								<Label htmlFor="channel-url">Custom URL</Label>
								<Input id="channel-url" defaultValue="youtube.com/c/myawesomechannel" />
								<p className="text-xs text-muted-foreground">Custom URLs can only be changed a limited number of times</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Contact Info</CardTitle>
							<CardDescription>Business information displayed on your channel</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-2">
								<Label htmlFor="business-email">Business email</Label>
								<Input id="business-email" placeholder="your@email.com" />
							</div>

							<div className="space-y-2">
								<Label>Social links</Label>
								<div className="space-y-2">
									{["Twitter", "Instagram", "TikTok"].map((platform) => (
										<div key={platform} className="flex gap-2">
											<Input disabled value={platform} className="w-1/3" />
											<Input placeholder={`Your ${platform} URL`} />
										</div>
									))}
								</div>
								<Button variant="outline">Add Link</Button>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="advanced" className="mt-6 space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Comments</CardTitle>
							<CardDescription>Manage comment settings for your channel</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="flex flex-col space-y-2">
								<div className="flex items-center justify-between">
									<Label htmlFor="comments">Allow comments on your videos</Label>
									<Switch id="comments" checked={comments} onCheckedChange={setComments} />
								</div>
								<p className="text-sm text-muted-foreground">When disabled, viewers will not be able to comment on any of your videos</p>
							</div>

							<div className="space-y-2">
								<Label>Comment moderation</Label>
								<div className="grid gap-2">
									<div className="flex items-center space-x-2">
										<input type="radio" id="mod-all" name="moderation" defaultChecked />
										<Label htmlFor="mod-all">Hold all comments for review</Label>
									</div>
									<div className="flex items-center space-x-2">
										<input type="radio" id="mod-some" name="moderation" />
										<Label htmlFor="mod-some">Hold potentially inappropriate comments for review</Label>
									</div>
									<div className="flex items-center space-x-2">
										<input type="radio" id="mod-none" name="moderation" />
										<Label htmlFor="mod-none">Don't hold comments for review</Label>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Channel Permissions</CardTitle>
							<CardDescription>Manage who has access to your channel</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="border rounded-md p-4 flex justify-between items-center">
								<div>
									<h3 className="font-medium">Channel Manager</h3>
									<p className="text-sm text-muted-foreground">editor@example.com</p>
								</div>
								<Button variant="outline" size="sm">
									Remove
								</Button>
							</div>
							<Button>Add Manager</Button>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="border-b">
							<CardTitle>Default Upload Settings</CardTitle>
							<CardDescription>Set default options for new uploads</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6 pt-6">
							<div className="space-y-2">
								<Label>Default visibility</Label>
								<div className="grid gap-2">
									<div className="flex items-center space-x-2">
										<input type="radio" id="vis-public" name="visibility" defaultChecked />
										<Label htmlFor="vis-public">Public</Label>
									</div>
									<div className="flex items-center space-x-2">
										<input type="radio" id="vis-unlisted" name="visibility" />
										<Label htmlFor="vis-unlisted">Unlisted</Label>
									</div>
									<div className="flex items-center space-x-2">
										<input type="radio" id="vis-private" name="visibility" />
										<Label htmlFor="vis-private">Private</Label>
									</div>
								</div>
							</div>

							<div className="grid gap-2">
								<div className="flex items-center space-x-2">
									<input type="checkbox" id="monetize" defaultChecked />
									<Label htmlFor="monetize">Monetize videos by default</Label>
								</div>
								<div className="flex items-center space-x-2">
									<input type="checkbox" id="notifications" defaultChecked />
									<Label htmlFor="notifications">Notify subscribers of new uploads</Label>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			<div className="flex justify-end">
				<Button>Save Changes</Button>
			</div>
		</div>
	);
};

export default StudioCustomizationPage;
