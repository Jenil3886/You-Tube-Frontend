import { Button } from "../ui/button";
import { HelpCircle } from "lucide-react";

const StudioHelp = () => {
	return (
		<Button variant="ghost" size="icon" className="rounded-full">
			<HelpCircle size={20} />
		</Button>
	);
};

export default StudioHelp;
