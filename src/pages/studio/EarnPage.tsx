import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const StudioEarnPage = () => {
	// Sample data for revenue chart
	const revenueData = {
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
		datasets: [
			{
				label: "Revenue",
				data: [320, 450, 520, 480, 780, 920],
				borderColor: "hsl(var(--primary))",
				backgroundColor: "hsl(var(--primary) / 0.2)",
			},
		],
	};

	// Mock monetization features
	const monetizationFeatures = [
		{
			id: "ads",
			title: "Ad Revenue",
			description: "Earn money from ads displayed on your videos",
			status: "Active",
			progress: 100,
			earnings: "$845.32",
		},
		{
			id: "membership",
			title: "Channel Memberships",
			description: "Let viewers support you with monthly payments",
			status: "Available",
			progress: 100,
			earnings: "$210.50",
		},
		{
			id: "superchat",
			title: "Super Chat & Super Stickers",
			description: "Let viewers pay to highlight their messages in live chat",
			status: "Available",
			progress: 100,
			earnings: "$64.75",
		},
		{
			id: "merchandise",
			title: "Merchandise Shelf",
			description: "Sell your branded merchandise on your watch pages",
			status: "Not eligible",
			requirements: "Need 10,000 subscribers",
			progress: 45,
			earnings: "$0.00",
		},
		{
			id: "youtube-premium",
			title: "YouTube Premium Revenue",
			description: "Earn from YouTube Premium subscribers who watch your content",
			status: "Active",
			progress: 100,
			earnings: "$125.18",
		},
	];

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">Earn</h1>
				<Button>View Payout Settings</Button>
			</div>

			{/* Revenue Overview */}
			<Card>
				<CardHeader>
					<CardTitle>Revenue</CardTitle>
					<CardDescription>Your estimated revenue for the last 6 months</CardDescription>
				</CardHeader>
				<CardContent className="h-[350px]">
					<LineChart data={revenueData} />
				</CardContent>
			</Card>

			<Tabs defaultValue="monetization" className="w-full">
				<TabsList>
					<TabsTrigger value="monetization">Monetization</TabsTrigger>
					<TabsTrigger value="transactions">Transactions</TabsTrigger>
					<TabsTrigger value="analytics">Revenue Analytics</TabsTrigger>
				</TabsList>

				<TabsContent value="monetization" className="mt-6 space-y-6">
					<div className="grid gap-6 md:grid-cols-2">
						{monetizationFeatures.map((feature) => (
							<Card key={feature.id}>
								<CardHeader className="pb-3">
									<div className="flex items-center justify-between">
										<CardTitle>{feature.title}</CardTitle>
										<span
											className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
												feature.status === "Active"
													? "bg-green-100 text-green-800"
													: feature.status === "Available"
													? "bg-blue-100 text-blue-800"
													: "bg-gray-100 text-gray-800"
											}`}
										>
											{feature.status}
										</span>
									</div>
									<CardDescription>{feature.description}</CardDescription>
								</CardHeader>
								<CardContent className="pb-3">
									{feature.status !== "Active" && feature.status !== "Available" && (
										<div className="space-y-2 mb-4">
											<div className="text-sm flex justify-between">
												<span>Eligibility</span>
												<span>{feature.progress}%</span>
											</div>
											<Progress value={feature.progress} />
											<p className="text-xs text-muted-foreground">{feature.requirements}</p>
										</div>
									)}
									{(feature.status === "Active" || feature.status === "Available") && (
										<div className="space-y-2">
											<div className="text-sm font-medium">Current month earnings:</div>
											<div className="text-2xl font-bold">{feature.earnings}</div>
										</div>
									)}
								</CardContent>
								<CardFooter>
									<Button
										variant={feature.status === "Not eligible" ? "outline" : "default"}
										disabled={feature.status === "Not eligible"}
										className="w-full"
									>
										{feature.status === "Not eligible" ? "Learn More" : "Manage"}
									</Button>
								</CardFooter>
							</Card>
						))}
					</div>
				</TabsContent>

				<TabsContent value="transactions" className="mt-6">
					<Card>
						<CardHeader>
							<CardTitle>Transaction History</CardTitle>
							<CardDescription>Your payouts and transaction details</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex flex-col space-y-4">
								{[1, 2, 3].map((index) => (
									<div key={index} className="flex justify-between items-center border-b pb-4">
										<div>
											<h3 className="font-medium">Payment - May 2023</h3>
											<p className="text-sm text-muted-foreground">Processed on {new Date(2023, 4, index * 5).toLocaleDateString()}</p>
										</div>
										<div className="text-right">
											<p className="font-medium">${(Math.random() * 500 + 200).toFixed(2)}</p>
											<p className="text-xs text-green-600">Completed</p>
										</div>
									</div>
								))}
							</div>
						</CardContent>
						<CardFooter>
							<Button variant="outline" className="w-full">
								View Full History
							</Button>
						</CardFooter>
					</Card>
				</TabsContent>

				<TabsContent value="analytics" className="mt-6">
					<Card>
						<CardHeader>
							<CardTitle>Revenue Analytics</CardTitle>
							<CardDescription>Detailed breakdown of your earnings</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
								{[
									{ label: "Ad Types", value: "Display ads: 45%\nSkippable ads: 35%\nNon-skippable: 20%" },
									{ label: "Top Earning Videos", value: "1. React Tutorial\n2. CSS Tricks\n3. JavaScript Basics" },
									{ label: "Revenue by Geography", value: "USA: 42%\nUK: 15%\nIndia: 12%\nOther: 31%" },
									{ label: "CPM", value: "Average: $4.25\nHighest: $7.50\nLowest: $1.20" },
								].map((item, index) => (
									<div key={index} className="p-4 border rounded-md">
										<h4 className="text-sm font-medium text-muted-foreground mb-2">{item.label}</h4>
										<pre className="font-mono text-xs whitespace-pre-wrap">{item.value}</pre>
									</div>
								))}
							</div>
						</CardContent>
						<CardFooter>
							<Button className="w-full">View Detailed Analytics</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default StudioEarnPage;
