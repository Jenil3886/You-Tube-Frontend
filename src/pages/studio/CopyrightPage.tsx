import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const StudioCopyrightPage = () => {
	// Mock data for copyright claims
	const claims = [
		{
			id: "claim1",
			videoTitle: "React Tutorial for Beginners",
			claimant: "Music Label XYZ",
			policy: "Monetized for Claimant",
			content: "Music track 'Epic Theme'",
			dateReceived: "2023-04-15",
		},
		{
			id: "claim2",
			videoTitle: "CSS Animation Effects",
			claimant: "Stock Media Co.",
			policy: "Track in video blocked",
			content: "Sound effect 'Whoosh'",
			dateReceived: "2023-03-22",
		},
	];

	// Mock data for copyright strikes
	const strikes = [
		{
			id: "strike1",
			videoTitle: "JavaScript in 100 Seconds",
			claimant: "Educational Corp",
			status: "Active",
			expires: "2023-07-15",
		},
	];

	return (
		<div className="space-y-6">
			<h1 className="text-3xl font-bold">Copyright</h1>

			<Tabs defaultValue="claims" className="w-full">
				<TabsList>
					<TabsTrigger value="claims">Copyright Claims</TabsTrigger>
					<TabsTrigger value="strikes">Copyright Strikes</TabsTrigger>
					<TabsTrigger value="restrictions">Restrictions</TabsTrigger>
					<TabsTrigger value="licenses">Music Policies</TabsTrigger>
				</TabsList>

				<TabsContent value="claims" className="mt-6 space-y-6">
					<div className="flex items-center space-x-2">
						<div className="relative flex-1">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input type="search" placeholder="Search claims..." className="pl-8" />
						</div>
						<Button variant="outline">Filter</Button>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>Copyright Claims</CardTitle>
							<CardDescription>Content identified by copyright owners through Content ID</CardDescription>
						</CardHeader>
						<CardContent className="p-0">
							{claims.length > 0 ? (
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead className="w-[30%]">Video</TableHead>
											<TableHead>Claimant</TableHead>
											<TableHead>Policy</TableHead>
											<TableHead>Content</TableHead>
											<TableHead>Date</TableHead>
											<TableHead>Actions</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{claims.map((claim) => (
											<TableRow key={claim.id}>
												<TableCell className="font-medium">{claim.videoTitle}</TableCell>
												<TableCell>{claim.claimant}</TableCell>
												<TableCell>{claim.policy}</TableCell>
												<TableCell>{claim.content}</TableCell>
												<TableCell>{claim.dateReceived}</TableCell>
												<TableCell>
													<Button variant="outline" size="sm">
														View Details
													</Button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							) : (
								<div className="py-12 text-center">
									<p className="text-muted-foreground">No copyright claims found</p>
								</div>
							)}
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="strikes" className="mt-6 space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Copyright Strikes</CardTitle>
							<CardDescription>Copyright infringement notifications from copyright owners</CardDescription>
						</CardHeader>
						<CardContent className="p-0">
							{strikes.length > 0 ? (
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead className="w-[40%]">Video</TableHead>
											<TableHead>Claimant</TableHead>
											<TableHead>Status</TableHead>
											<TableHead>Expires</TableHead>
											<TableHead>Actions</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{strikes.map((strike) => (
											<TableRow key={strike.id}>
												<TableCell className="font-medium">{strike.videoTitle}</TableCell>
												<TableCell>{strike.claimant}</TableCell>
												<TableCell>
													<span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
														{strike.status}
													</span>
												</TableCell>
												<TableCell>{strike.expires}</TableCell>
												<TableCell>
													<Button variant="outline" size="sm">
														View Details
													</Button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							) : (
								<div className="py-12 text-center">
									<p className="text-muted-foreground">No copyright strikes found</p>
								</div>
							)}
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Copyright Strike Information</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-sm text-muted-foreground">
								Copyright strikes are issued when a copyright owner sends us a complete and valid legal request asking us to remove their content.
							</p>
							<p className="text-sm text-muted-foreground">
								If you get 3 copyright strikes, your account, along with any associated channels, will be terminated.
							</p>
							<Button>Learn More About Copyright</Button>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="restrictions" className="mt-6">
					<Card>
						<CardHeader>
							<CardTitle>Content Restrictions</CardTitle>
							<CardDescription>Videos with restrictions based on copyright or terms of service</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="py-8 text-center">
								<p className="text-muted-foreground mb-4">No content restrictions found</p>
								<Button variant="outline">Learn About Restrictions</Button>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="licenses" className="mt-6">
					<Card>
						<CardHeader>
							<CardTitle>Music Policies</CardTitle>
							<CardDescription>Learn about using copyrighted music in your videos</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-sm text-muted-foreground">
								Check what will happen if you use specific songs in your videos. Different copyright owners have different policies.
							</p>
							<Button>Search Music Policies</Button>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default StudioCopyrightPage;
