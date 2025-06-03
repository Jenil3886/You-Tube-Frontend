import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const PromotionsTab = () => (
	<div className="py-6">
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
			<div className="border rounded-lg p-4 flex items-center justify-center">
				<div className="w-full max-w-xs aspect-[9/16] bg-gray-200 rounded-lg relative flex flex-col">
					<div className="bg-red-600 p-2 flex items-center">
						<div className="w-6 h-6 bg-white rounded-full mr-2"></div>
						<div className="h-3 w-24 bg-white/70 rounded"></div>
						<div className="ml-auto w-3 h-3 bg-white/70 rounded-full"></div>
					</div>
					<div className="flex-grow bg-gray-300"></div>
					<div className="bg-gray-200 p-4">
						<div className="flex items-center">
							<div className="w-8 h-8 bg-gray-400 rounded-full"></div>
							<div className="ml-2 flex-1">
								<div className="h-3 w-3/4 bg-gray-400 rounded mb-1"></div>
								<div className="h-2 w-1/2 bg-gray-400 rounded"></div>
							</div>
						</div>
						<div className="mt-4 flex justify-center">
							<div className="w-24 h-8 bg-white rounded-full"></div>
						</div>
					</div>
				</div>
			</div>

			<div>
				<h2 className="text-xl font-bold mb-4">Promote your channel and business on YouTube</h2>
				<p className="mb-4 text-gray-600">In addition to your regular channel growth, promotions can get your videos in front of new audiences.</p>
				<p className="mb-4 text-gray-600">
					Subscribers and watch time earned through a promotion do not contribute towards YouTube Partner Programme eligibility.
				</p>
				<a href="#" className="text-blue-500 hover:underline block mb-6">
					Learn more about promotions
				</a>

				<Button variant="secondary" className="flex items-center gap-2">
					<PlusCircle className="h-4 w-4" />
					Get started
				</Button>
			</div>
		</div>
	</div>
);

export default PromotionsTab;
