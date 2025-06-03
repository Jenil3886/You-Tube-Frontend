import { useState, useEffect } from "react";
import ShortsList from "@/components/shorts/ShortsList";
import ShortViewer from "@/components/shorts/ShortViewer";
import { mockShorts } from "@/data/mockVideos";

// Mocked shorts data for display

const ShortsPage = () => {
	const [activeShortIndex, setActiveShortIndex] = useState(0);
	const [isViewingShort, setIsViewingShort] = useState(false);

	// Handle keyboard navigation
	useEffect(() => {
		if (!isViewingShort) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowDown" || e.key === "j") {
				handleNextShort();
			} else if (e.key === "ArrowUp" || e.key === "k") {
				handlePreviousShort();
			} else if (e.key === "Escape") {
				handleCloseShorts();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isViewingShort, activeShortIndex]);

	const handleShortClick = (index: number) => {
		setActiveShortIndex(index);
		setIsViewingShort(true);
	};

	const handleCloseShorts = () => {
		setIsViewingShort(false);
	};

	const handleNextShort = () => {
		if (activeShortIndex < mockShorts.length - 1) {
			setActiveShortIndex(activeShortIndex + 1);
		}
	};

	const handlePreviousShort = () => {
		if (activeShortIndex > 0) {
			setActiveShortIndex(activeShortIndex - 1);
		}
	};

	if (isViewingShort) {
		return (
			<ShortViewer
				shorts={mockShorts}
				activeShortIndex={activeShortIndex}
				onClose={handleCloseShorts}
				onNext={handleNextShort}
				onPrevious={handlePreviousShort}
			/>
		);
	}

	return <ShortsList shorts={mockShorts} onShortClick={handleShortClick} />;
};

export default ShortsPage;
