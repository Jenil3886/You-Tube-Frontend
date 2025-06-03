import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

const EmptyPage = ({ onUpload }: { onUpload: () => void }) => (
	<div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-12">
		<div className="w-full max-w-md text-center">
			<div className="mx-auto w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mb-6">
				<svg viewBox="0 0 200 200" className="text-blue-400" fill="currentColor">
					<path d="M80 40c-11 0-20 9-20 20v80c0 11 9 20 20 20h40c11 0 20-9 20-20V60c-11-9-20-20-20H80zm0 20h40v80H80V60z" />
					<rect x="50" y="80" width="40" height="60" />
					<path d="M140 100c11 0 20-9 20-20s-9-20-20-20-20 9-20 20 9 20 20 20z" />
				</svg>
			</div>
			<p className="text-base sm:text-lg md:text-xl mb-6">No content available</p>
			<Button onClick={onUpload} className="flex items-center gap-2 text-xs sm:text-sm px-4 py-2" variant="secondary" aria-label="Upload videos">
				<Upload className="w-4 h-4" />
				Upload videos
			</Button>
		</div>
	</div>
);

export default EmptyPage;
