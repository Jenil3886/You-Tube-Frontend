import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import { Sun, Moon, ChevronsUpDown, Check, EyeOff, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { languages } from "@/data/languages";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { apiurl } from "@/constants";
import axios from "axios";

const SettingsPage = () => {
	const { theme, setTheme } = useTheme();
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	// const [showPassword, setShowPassword] = useState(false);

	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	useEffect(() => {
		document.title = "Settings - YouTube";
	}, []);

	const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
		setTheme(newTheme);
		toast.success(`Theme changed to ${newTheme}`);
	};

	const handleChangePassword = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!oldPassword || !newPassword || !confirmPassword) {
			toast.error("All fields are required");
			return;
		}

		if (newPassword !== confirmPassword) {
			toast.error("New passwords do not match");
			return;
		}

		try {
			const response = await axios.post(
				`${apiurl}/users/change-password`,
				{
					oldPassword,
					newPassword,
				},
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				}
			);

			toast.success(response.data.message || "Password changed successfully!");
			setOldPassword("");
			setNewPassword("");
			setConfirmPassword("");
		} catch (error: any) {
			const message = error.response?.data?.message || "Failed to change password. Please try again.";
			toast.error(message);
		}
	};

	return (
		<div className="container max-w-4xl mx-auto py-8">
			<h1 className="text-3xl font-bold mb-6">Settings</h1>

			<Tabs defaultValue="general" className="w-full">
				<TabsList className="mb-6">
					<TabsTrigger value="general">General</TabsTrigger>
					<TabsTrigger value="security">Security</TabsTrigger>
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

				<TabsContent value="security" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Change Password</CardTitle>
							<p className="text-sm text-muted-foreground">Update your account password securely.</p>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleChangePassword} className="space-y-6">
								{/* Current Password */}
								<div className="space-y-2">
									<Label htmlFor="oldPassword">Current Password</Label>
									<div className="relative">
										<Input
											id="oldPassword"
											type={showOldPassword ? "text" : "password"}
											placeholder="Enter current password"
											value={oldPassword}
											onChange={(e) => setOldPassword(e.target.value)}
											required
											className="pr-10"
										/>
										<button
											type="button"
											onClick={() => setShowOldPassword(!showOldPassword)}
											className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
											aria-label={showOldPassword ? "Hide password" : "Show password"}
										>
											{showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
										</button>
									</div>
								</div>

								{/* New Password */}
								<div className="space-y-2">
									<Label htmlFor="newPassword">New Password</Label>
									<div className="relative">
										<Input
											id="newPassword"
											type={showNewPassword ? "text" : "password"}
											placeholder="Enter new password"
											value={newPassword}
											onChange={(e) => setNewPassword(e.target.value)}
											required
											className="pr-10"
										/>
										<button
											type="button"
											onClick={() => setShowNewPassword(!showNewPassword)}
											className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
											aria-label={showNewPassword ? "Hide password" : "Show password"}
										>
											{showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
										</button>
									</div>
								</div>

								{/* Confirm Password */}
								<div className="space-y-2">
									<Label htmlFor="confirmPassword">Confirm New Password</Label>
									<div className="relative">
										<Input
											id="confirmPassword"
											type={showConfirmPassword ? "text" : "password"}
											placeholder="Re-enter new password"
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											required
											className="pr-10"
										/>
										<button
											type="button"
											onClick={() => setShowConfirmPassword(!showConfirmPassword)}
											className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
											aria-label={showConfirmPassword ? "Hide password" : "Show password"}
										>
											{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
										</button>
									</div>

									{/* Password Match Message */}
									{confirmPassword && (
										<p className={`text-sm ${newPassword === confirmPassword ? "text-green-500" : "text-red-500"}`}>
											{newPassword === confirmPassword ? "Passwords match." : "Passwords do not match."}
										</p>
									)}
								</div>

								<Button type="submit" className="mt-2">
									Update Password
								</Button>
							</form>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default SettingsPage;
