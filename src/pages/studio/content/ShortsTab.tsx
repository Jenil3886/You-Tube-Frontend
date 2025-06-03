import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

const ShortsTab = () => (
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
						<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-12">
							<input type="checkbox" className="rounded border-gray-300" />
						</th>
						<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
							Short
						</th>
						<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
							Visibility
						</th>
						<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
							Restrictions
						</th>
						<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
							Date ↓
						</th>
						<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
							Views
						</th>
						<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
							Comments
						</th>
						<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
							Likes (vs dislikes)
						</th>
					</tr>
				</thead>
				<tbody className="bg-background divide-y divide-gray-200">
					<tr>
						<td className="px-4 py-4">
							<input type="checkbox" className="rounded border-gray-300" />
						</td>
						<td className="px-4 py-4">
							<div className="flex items-center">
								<div className="mr-3 w-24 h-16 rounded overflow-hidden bg-gray-200 relative">
									<span className="absolute bottom-0 right-0 bg-black text-white text-xs px-1">0:34</span>
								</div>
								<div>
									<div className="font-medium">Untitled video</div>
									<div className="text-sm text-gray-500">Add description</div>
								</div>
							</div>
						</td>
						<td className="px-4 py-4 hidden md:table-cell">
							<span className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded">Draft</span>
						</td>
						<td className="px-4 py-4 hidden md:table-cell">None</td>
						<td className="px-4 py-4"></td>
						<td className="px-4 py-4 hidden md:table-cell"></td>
						<td className="px-4 py-4 hidden md:table-cell"></td>
						<td className="px-4 py-4 hidden md:table-cell">
							<Button variant="outline" size="sm">
								Edit draft
							</Button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div className="flex justify-between items-center mt-4">
			<div className="text-sm">1–1 of 1</div>
			<div className="flex items-center gap-2">
				<span className="text-sm">Rows per page :</span>
				<Select>
					<SelectTrigger className="w-[80PX]">
						<SelectValue placeholder="Rows" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="recent">30</SelectItem>
						<SelectItem value="popular">50</SelectItem>
						<SelectItem value="oldest">100</SelectItem>
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

export default ShortsTab;
