import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import { Sun, Moon, ChevronsUpDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { languages } from "@/data/languages";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SettingsPage = () => {
	const { theme, setTheme } = useTheme();
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");

	useEffect(() => {
		document.title = "Settings - YouTube";
	}, []);

	const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
		setTheme(newTheme);
		// toast.success(`Theme changed to ${newTheme}`);
	};
	return (
		<div className="container max-w-4xl mx-auto py-8">
			<h1 className="text-3xl font-bold mb-6">Settings</h1>

			<Tabs defaultValue="general" className="w-full">
				<TabsList className="mb-6">
					<TabsTrigger value="general">General</TabsTrigger>
					<TabsTrigger value="privacy">Privacy</TabsTrigger>
					<TabsTrigger value="notifications">Notifications</TabsTrigger>
					<TabsTrigger value="playback">Playback</TabsTrigger>
				</TabsList>

				<TabsContent value="general" className="space-y-6">
					<div className="space-y-4">
						<h2 className="text-xl font-semibold">Appearance</h2>
						<div className="space-y-4">
							<div>
								<Label>Theme</Label>
								<p className="text-sm text-muted-foreground mb-2">Choose how YouTastic looks to you</p>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
									{/* Light theme option */}
									<div
										className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer hover:bg-accent ${
											theme === "light" ? "ring-2 ring-primary" : ""
										}`}
										onClick={() => handleThemeChange("light")}
									>
										<div className="h-28 w-full rounded-md border bg-[#f9f9f9] dark:bg-[#f9f9f9] flex items-center justify-center mb-2">
											<Sun size={24} className="text-black" />
										</div>
										<span className="font-medium">Light</span>
									</div>

									{/* Dark theme option */}
									<div
										className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer hover:bg-accent ${
											theme === "dark" ? "ring-2 ring-primary" : ""
										}`}
										onClick={() => handleThemeChange("dark")}
									>
										<div className="h-28 w-full rounded-md border bg-[#0f0f0f] dark:bg-[#0f0f0f] flex items-center justify-center mb-2">
											<Moon size={24} className="text-white" />
										</div>
										<span className="font-medium">Dark</span>
									</div>

									{/* System theme option */}
									<div
										className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer hover:bg-accent ${
											theme === "system" ? "ring-2 ring-primary" : ""
										}`}
										onClick={() => handleThemeChange("system")}
									>
										<div className="h-28 w-full rounded-md border bg-gradient-to-r from-[#f9f9f9] to-[#0f0f0f] flex items-center justify-center mb-2">
											<div className="flex">
												<Sun size={24} className="text-black mr-2" />
												<Moon size={24} className="text-white" />
											</div>
										</div>
										<span className="font-medium">Device theme</span>
									</div>
								</div>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div>
								<Label htmlFor="language">Language</Label>
								<p className="text-sm  text-muted-foreground">Choose your preferred language</p>
							</div>
							<Popover open={open} onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
										{value ? languages.find((languages) => languages.value === value)?.label : "Select languages..."}
										<ChevronsUpDown className="opacity-50" />
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-[200px] p-0 ">
									<Command>
										<CommandInput placeholder="Search languages..." className="h-5 " />
										<CommandList className="[&::-webkit-scrollbar]:w-[1px] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-800 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600">
											<CommandEmpty>No languages found.</CommandEmpty>
											<CommandGroup>
												{languages.map((languages) => (
													<CommandItem
														key={languages.value}
														value={languages.value}
														onSelect={(currentValue) => {
															setValue(currentValue === value ? "" : currentValue);
															setOpen(false);
														}}
													>
														{languages.label}
														<Check className={cn("ml-auto", value === languages.value ? "opacity-100" : "opacity-0")} />
													</CommandItem>
												))}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
						</div>
					</div>

					<div className="space-y-4">
						<h2 className="text-xl font-semibold">Region</h2>
						<RadioGroup defaultValue="us">
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="us" id="us" />
								<Label htmlFor="us">United States</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="uk" id="uk" />
								<Label htmlFor="uk">United Kingdom</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="ca" id="ca" />
								<Label htmlFor="ca">Canada</Label>
							</div>
						</RadioGroup>
					</div>
				</TabsContent>

				<TabsContent value="privacy" className="space-y-6">
					<div className="space-y-4">
						<h2 className="text-xl font-semibold">Privacy Settings</h2>
						<div className="flex items-center justify-between">
							<div>
								<Label htmlFor="history">Save watch history</Label>
								<p className="text-sm text-muted-foreground">Save videos you watch to history</p>
							</div>
							<Switch id="history" defaultChecked />
						</div>

						<div className="flex items-center justify-between">
							<div>
								<Label htmlFor="search-history">Save search history</Label>
								<p className="text-sm text-muted-foreground">Save your search queries</p>
							</div>
							<Switch id="search-history" defaultChecked />
						</div>

						<div className="flex items-center justify-between">
							<div>
								<Label htmlFor="personalization">Personalized recommendations</Label>
								<p className="text-sm text-muted-foreground">Allow recommendations based on watch history</p>
							</div>
							<Switch id="personalization" defaultChecked />
						</div>
					</div>
				</TabsContent>

				<TabsContent value="notifications" className="space-y-6">
					<div className="space-y-4">
						<h2 className="text-xl font-semibold">Notification Settings</h2>
						<div className="flex items-center justify-between">
							<div>
								<Label htmlFor="all-notifs">All notifications</Label>
								<p className="text-sm text-muted-foreground">Receive all notifications</p>
							</div>
							<Switch id="all-notifs" defaultChecked />
						</div>

						<div className="flex items-center justify-between">
							<div>
								<Label htmlFor="subscriptions">Subscription notifications</Label>
								<p className="text-sm text-muted-foreground">Notifications from channels you subscribe to</p>
							</div>
							<Switch id="subscriptions" defaultChecked />
						</div>

						<div className="flex items-center justify-between">
							<div>
								<Label htmlFor="recommended">Recommended videos</Label>
								<p className="text-sm text-muted-foreground">Notifications for recommended content</p>
							</div>
							<Switch id="recommended" />
						</div>
					</div>
				</TabsContent>

				<TabsContent value="playback" className="space-y-6">
					<div className="space-y-4">
						<h2 className="text-xl font-semibold">Playback Settings</h2>
						<div className="flex items-center justify-between">
							<div>
								<Label htmlFor="autoplay">Autoplay</Label>
								<p className="text-sm text-muted-foreground">Automatically play the next video</p>
							</div>
							<Switch id="autoplay" defaultChecked />
						</div>

						<div className="flex items-center justify-between">
							<div>
								<Label htmlFor="quality">Default quality</Label>
								<p className="text-sm text-muted-foreground">Set your default video quality</p>
							</div>
							{/* <select className="border rounded p-2">
								<option>Auto</option>
								<option>1080p</option>
								<option>720p</option>
								<option>480p</option>
							</select> */}

							<Select>
								<SelectTrigger className="w-[130px]">
									<SelectValue placeholder="Sort by" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="recent">Auto</SelectItem>
									<SelectItem value="popular">1080p</SelectItem>
									<SelectItem value="oldest">720p</SelectItem>
									<SelectItem value="oldest">480p</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default SettingsPage;
