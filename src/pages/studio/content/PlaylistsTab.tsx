import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

const PlaylistsTab = () => (
	<div>
		<div className="mb-4 flex justify-between items-center">
			<div className="flex items-center gap-2">
				<Button variant="outline" size="sm" className="flex items-center gap-2">
					<Filter className="h-4 w-4" />
					Filter
				</Button>
			</div>
		</div>

		<div className="overflow-hidden border rounded-md">
			<table className="min-w-full divide-y">
				<thead className="bg-muted/50">
					<tr>
						<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
							Playlist
						</th>
						<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
							Type
						</th>
						<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
							Visibility
						</th>
						<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
							Last updated
						</th>
						<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
							Video count
						</th>
					</tr>
				</thead>
				<tbody className="bg-background divide-y divide-gray-200">
					<tr>
						<td className="px-4 py-4">
							<div className="flex items-center">
								<div className="mr-3 w-24 h-16 rounded overflow-hidden bg-gray-200 relative"></div>
								<div>
									<div className="font-medium">my</div>
									<div className="text-sm text-gray-500">Add description</div>
								</div>
							</div>
						</td>
						<td className="px-4 py-4 hidden md:table-cell">Playlist</td>
						<td className="px-4 py-4 hidden md:table-cell">
							<div className="flex items-center">
								<svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
									<rect x="3" y="11" width="18" height="11" rx="2" strokeWidth="2" />
									<circle cx="12" cy="5" r="2" strokeWidth="2" />
									<path d="M12 7v4" strokeWidth="2" />
								</svg>
								Private
							</div>
						</td>
						<td className="px-4 py-4">3 Jun 2024</td>
						<td className="px-4 py-4 hidden md:table-cell">2</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div className="flex justify-between items-center mt-4">
			<div className="text-sm">1–1 of 1</div>
			<div className="flex items-center gap-2">
				<span className="text-sm">Rows per page:</span>
				<Select>
					<SelectTrigger className="w-[80PX]">
						<SelectValue placeholder="Rows" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="recent">10</SelectItem>
						<SelectItem value="popular">30</SelectItem>
						<SelectItem value="oldest">50</SelectItem>
					</SelectContent>
				</Select>
				<div className="flex">
					<Button variant="outline" size="icon" className="rounded-r-none">
						<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
						</svg>
					</Button>
					<Button variant="outline" size="icon" className="rounded-l-none">
						<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
						</svg>
					</Button>
				</div>
			</div>
		</div>
	</div>
);

export default PlaylistsTab;
