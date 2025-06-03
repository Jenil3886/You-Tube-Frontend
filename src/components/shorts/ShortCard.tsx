import React from "react";

type ShortCardProps = {
	short: any;
	onClick: () => void;
};

const ShortCard = ({ short, onClick }: ShortCardProps) => {
	return (
		<div className="flex flex-col cursor-pointer hover:scale-105 transition-transform duration-200" onClick={onClick}>
			<div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-muted group">
				<img src={short.thumbnail} alt={short.title} className="w-full h-full object-cover" />
				<div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
					<div className="bg-black/60 rounded-full p-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="white"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-play"
						>
							<polygon points="5 3 19 12 5 21 5 3" />
						</svg>
					</div>
				</div>
				<div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">{short.duration}</div>
			</div>
			<div className="mt-2">
				<h3 className="font-medium text-sm line-clamp-2">{short.title}</h3>
				<p className="text-xs text-muted-foreground">{short.views} views</p>
			</div>
		</div>
	);
};

export default ShortCard;
