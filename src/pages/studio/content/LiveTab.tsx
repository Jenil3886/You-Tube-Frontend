import { Button } from "@/components/ui/button";
import { Filter, PlusCircle } from "lucide-react";

const LiveTab = () => (
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
							Live stream
						</th>
						<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
							Type
						</th>
						<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
							Visibility
						</th>
						<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
							Restrictions
						</th>
						<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
							Date
						</th>
						<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
							Views
						</th>
						<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
							Live viewers
						</th>
						<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
							Comments
						</th>
						<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
							Likes (vs dislikes)
						</th>
					</tr>
				</thead>
			</table>
		</div>

		<div className="flex flex-col items-center justify-center py-12">
			<div className="w-full max-w-md text-center">
				<div className="mx-auto w-40 h-40 mb-6">
					<svg viewBox="0 0 200 200" className="text-blue-400" fill="currentColor">
						<path d="M80 40c-11 0-20 9-20 20v80c0 11 9 20 20 20h40c11 0 20-9 20-20V60c0-11-9-20-20-20H80zm0 20h40v80H80V60z" />
						<rect x="50" y="80" width="40" height="60" />
						<path d="M140 100c11 0 20-9 20-20s-9-20-20-20-20 9-20 20 9 20 20 20z" />
					</svg>
				</div>
				<p className="text-lg mb-6">Your live streams will show up here</p>
				<Button className="flex items-center gap-2" variant="secondary">
					<PlusCircle className="w-4 h-4" />
					Get started
				</Button>
			</div>
		</div>
	</div>
);

export default LiveTab;
