import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import Logo from "../header/Logo";
import SearchBar from "../header/SearchBar";
import CreateButton from "../header/CreateButton";
import ThemeToggle from "../header/ThemeToggle";
import UserMenu from "../header/UserMenu";
import NotificationButton from "../header/NotificationButton";
import { useIsMobile } from "@/hooks/use-mobile";
import { HeaderProps } from "@/types";

const Header = ({ onMenuClick }: HeaderProps) => {
	const isMobile = useIsMobile();
	return (
		<header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-background border-b transition-all-medium backdrop-blur-sm">
			<Logo onMenuClick={onMenuClick} />
			<SearchBar />
			<div className="flex items-center gap-4">
				<CreateButton />
				{!isMobile && <ThemeToggle />}
				{!isMobile && (
					<Button variant="ghost" size="icon" className="rounded-full transition-all duration-200 hover:bg-secondary/80">
						<Video className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
					</Button>
				)}
				{!isMobile && <NotificationButton />}
				<UserMenu />
			</div>
		</header>
	);
};

export default Header;
