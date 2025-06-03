import StudioLogo from "../StudioHeader/StudioLogo";
import StudioSearchBar from "../StudioHeader/StudioSearchBar";
import StudioHelp from "../StudioHeader/StudioHelp";
import StudioCreateButton from "../StudioHeader/StudioCreateButton";
import StudioUserMenu from "../StudioHeader/StudioUserMenu";

interface HeaderProps {
	onMenuClick: () => void;
}

const StudioHeader = ({ onMenuClick }: HeaderProps) => {
	return (
		<header className="h-16 bg-background border-b flex items-center justify-between px-4 md:px-6 z-10">
			<StudioLogo onMenuClick={onMenuClick} />
			<StudioSearchBar />
			<div className="flex items-center gap-2">
				<StudioHelp />
				<StudioCreateButton />
				<StudioUserMenu />
			</div>
		</header>
	);
};

export default StudioHeader;
