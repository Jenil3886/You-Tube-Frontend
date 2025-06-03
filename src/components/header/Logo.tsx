import { Link } from "react-router-dom";
import { AlignJustify } from "lucide-react";
import { Button } from "@/components/ui/button";
import YoutubeLogo from "@/assets/youtubelogo.png";

interface LogoProps {
	onMenuClick: () => void;
}

const Logo = ({ onMenuClick }: LogoProps) => {
	return (
		<div className="flex items-center gap-4">
			<Button variant="ghost" size="icon" onClick={onMenuClick} className="rounded-full">
				<AlignJustify className="h-5 w-5" />
			</Button>
			<Link to="/" className="flex items-baseline gap-1 ">
				<img src={YoutubeLogo} alt="" className="h-5 w-full " />
			</Link>
		</div>
	);
};

export default Logo;
