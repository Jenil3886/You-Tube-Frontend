import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart } from "@/components/ui/chart";

const AnalyticsPage = () => {
	const [dateRange, setDateRange] = useState("28");

	// Sample analytics data
	const viewsData = [
		{ date: "Jan 1", views: 2400 },
		{ date: "Jan 2", views: 1398 },
		{ date: "Jan 3", views: 9800 },
		{ date: "Jan 4", views: 3908 },
		{ date: "Jan 5", views: 4800 },
		{ date: "Jan 6", views: 3800 },
		{ date: "Jan 7", views: 4300 },
	];

	// Format numbers with comma separators
	const formatNumber = (value: number) => {
		return new Intl.NumberFormat().format(value);
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0 md:space-x-4">
				<div>
					<h1 className="text-2xl font-bold">Channel analytics</h1>
					<p className="text-muted-foreground">View performance metrics for your channel</p>
				</div>
				<Select value={dateRange} onValueChange={setDateRange}>
					<SelectTrigger className="w-full md:w-48">
						<SelectValue placeholder="Last 28 days" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="7">Last 7 days</SelectItem>
						<SelectItem value="28">Last 28 days</SelectItem>
						<SelectItem value="90">Last 90 days</SelectItem>
						<SelectItem value="365">Last 365 days</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="grid gap-6 grid-cols-1 md:grid-cols-4">
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">Views</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">24.5K</div>
						<p className="text-xs text-muted-foreground mt-1">
							<span className="text-green-500">↑ 12%</span> vs previous period
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">Watch time (hours)</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">1,429</div>
						<p className="text-xs text-muted-foreground mt-1">
							<span className="text-green-500">↑ 8%</span> vs previous period
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">Subscribers</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">+432</div>
						<p className="text-xs text-muted-foreground mt-1">
							<span className="text-red-500">↓ 3%</span> vs previous period
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">Estimated revenue</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">$342.58</div>
						<p className="text-xs text-muted-foreground mt-1">
							<span className="text-green-500">↑ 17%</span> vs previous period
						</p>
					</CardContent>
				</Card>
			</div>

			<Tabs defaultValue="overview">
				<TabsList className="mb-4">
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="content">Content</TabsTrigger>
					<TabsTrigger value="audience">Audience</TabsTrigger>
					<TabsTrigger value="revenue">Revenue</TabsTrigger>
				</TabsList>

				<TabsContent value="overview" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Views</CardTitle>
							<CardDescription>Total views across all your videos</CardDescription>
						</CardHeader>
						<CardContent className="h-80">
							<BarChart data={viewsData} className="w-full h-full" />
						</CardContent>
					</Card>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Card>
							<CardHeader>
								<CardTitle>Top videos</CardTitle>
								<CardDescription>Your best performing videos</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{[1, 2, 3].map((i) => (
										<div key={i} className="flex items-start gap-4">
											<div className="w-24 h-16 bg-muted rounded-md overflow-hidden">
												<img src={`https://picsum.photos/seed/vid${i}/100/60`} alt="Thumbnail" className="w-full h-full object-cover" />
											</div>
											<div className="flex-1">
												<h3 className="font-medium text-sm">How to build a React app from scratch</h3>
												<p className="text-xs text-muted-foreground mt-1">Published 3 weeks ago</p>
												<div className="flex gap-4 mt-2">
													<span className="text-xs">{formatNumber(12000 * i)} views</span>
													<span className="text-xs">{formatNumber(800 * i)} likes</span>
												</div>
											</div>
										</div>
									))}
								</div>
								<Button variant="link" className="mt-4 px-0">
									View all videos
								</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Audience demographics</CardTitle>
								<CardDescription>Viewer age and gender breakdown</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="h-52">
									<BarChart
										data={[
											{ date: "13-17", views: 300 },
											{ date: "18-24", views: 4200 },
											{ date: "25-34", views: 6800 },
											{ date: "35-44", views: 3700 },
											{ date: "45-54", views: 1600 },
											{ date: "55+", views: 800 },
										]}
										className="w-full h-full"
									/>
								</div>
								<div className="mt-4 flex gap-8 pt-4 border-t">
									<div>
										<p className="text-sm font-medium mb-1">Gender</p>
										<div className="flex gap-4">
											<div>
												<div className="text-sm mb-1">Male</div>
												<div className="text-sm font-medium">68%</div>
											</div>
											<div>
												<div className="text-sm mb-1">Female</div>
												<div className="text-sm font-medium">29%</div>
											</div>
											<div>
												<div className="text-sm mb-1">Other</div>
												<div className="text-sm font-medium">3%</div>
											</div>
										</div>
									</div>
									<div>
										<p className="text-sm font-medium mb-1">Top countries</p>
										<div className="flex gap-4">
											<div>
												<div className="text-sm mb-1">US</div>
												<div className="text-sm font-medium">42%</div>
											</div>
											<div>
												<div className="text-sm mb-1">UK</div>
												<div className="text-sm font-medium">18%</div>
											</div>
											<div>
												<div className="text-sm mb-1">India</div>
												<div className="text-sm font-medium">12%</div>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>Engagement over time</CardTitle>
							<CardDescription>Likes, comments, and shares across all videos</CardDescription>
						</CardHeader>
						<CardContent className="h-80">
							<BarChart
								data={[
									{ date: "Jan 1", views: 240 },
									{ date: "Jan 2", views: 139 },
									{ date: "Jan 3", views: 980 },
									{ date: "Jan 4", views: 390 },
									{ date: "Jan 5", views: 480 },
									{ date: "Jan 6", views: 380 },
									{ date: "Jan 7", views: 430 },
								]}
								className="w-full h-full"
							/>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="content">
					<Card>
						<CardHeader>
							<CardTitle>Content analytics</CardTitle>
							<CardDescription>Detailed metrics for all your content</CardDescription>
						</CardHeader>
						<CardContent>
							<p>Content analytics details will go here.</p>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="audience">
					<Card>
						<CardHeader>
							<CardTitle>Audience analytics</CardTitle>
							<CardDescription>Understand your viewer demographics and behavior</CardDescription>
						</CardHeader>
						<CardContent>
							<p>Audience analytics details will go here.</p>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="revenue">
					<Card>
						<CardHeader>
							<CardTitle>Revenue analytics</CardTitle>
							<CardDescription>Track your channel's monetization performance</CardDescription>
						</CardHeader>
						<CardContent>
							<p>Revenue analytics details will go here.</p>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default AnalyticsPage;
