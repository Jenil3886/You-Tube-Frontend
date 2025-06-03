// utils.ts or directly inside your component file
export const getRelativeTime = (dateString: string): string => {
	const inputDate = new Date(dateString);
	const now = new Date();

	const diffInSeconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000);

	const intervals: { [key: string]: number } = {
		year: 31536000,
		month: 2592000,
		day: 86400,
		hour: 3600,
		minute: 60,
	};

	for (const [unit, secondsInUnit] of Object.entries(intervals)) {
		const count = Math.floor(diffInSeconds / secondsInUnit);
		if (count >= 1) {
			return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
		}
	}

	return "Just now";
};

// formatDuration
export const formatDuration = (seconds: number): string => {
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const formatViewCount = (views: string): string => {
	const num = parseInt(views);
	if (isNaN(num)) return "0 views";

	if (num < 1000) return `${num} views`;
	else if (num < 1_000_000) return `${(num / 1000).toFixed(2)}K views`;
	else return `${(num / 1_000_000).toFixed(2)}M views`;
};

export const formatDateToDDMMYYYY = (dateString: string): string => {
	const date = new Date(dateString);
	return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
