// mock videos
export const generateMockVideos = (count: number, prefix: string = "") => {
	return Array(count)
		.fill(null)
		.map((_, i) => ({
			id: `${prefix}-video-${i + 1}`,
			thumbnail: `https://picsum.photos/640/360?random=${Math.floor(Math.random() * 1000) + i}`,
			title: `${prefix ? prefix + " - " : ""}Video #${i + 1} - Amazing content you won't believe!`,
			channelName: `Creator ${Math.floor(Math.random() * 100) + 1}`,
			channelAvatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? "men" : "women"}/${Math.floor(Math.random() * 100) + 1}.jpg`,
			views: `${Math.floor(Math.random() * 10) + 1}${Math.random() > 0.5 ? "M" : "K"}`,
			timestamp: `${Math.floor(Math.random() * 12) + 1} ${Math.random() > 0.3 ? "days" : "months"} ago`,
			duration: `${Math.floor(Math.random() * 10) + 1}:${Math.floor(Math.random() * 59) + 10}`,
		}));
};

// Mocked subscription data
export const mockChannels = Array(20)
	.fill(null)
	.map((_, i) => ({
		id: `channel-${i + 1}`,
		name: `Channel ${i + 1}`,
		avatar: `https://source.unsplash.com/random/100x100?face&sig=${i + 50}`,
		subscribers: `${Math.floor(Math.random() * 10) + 1}M`,
		isLive: i % 5 === 0,
		hasNewContent: i % 4 === 0,
	}));

// Mocked videos from subscriptions
export const mockVideos = Array(12)
	.fill(null)
	.map((_, i) => ({
		id: `sub-video-${i + 1}`,
		thumbnail: `https://picsum.photos/640/360?random=${i + 30}`,
		title: `Latest video from your subscriptions #${i + 1}`,
		channelName: mockChannels[i % mockChannels.length].name,
		channelAvatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? "men" : "women"}/${Math.floor(Math.random() * 100) + 1}.jpg`,
		views: `${Math.floor(Math.random() * 1000) + 100}K`,
		timestamp: `${Math.floor(Math.random() * 7) + 1} days ago`,
		duration: `${Math.floor(Math.random() * 10) + 1}:${Math.floor(Math.random() * 59) + 10}`,
	}));

export const mockShorts = Array(20)
	.fill(null)
	.map((_, i) => ({
		id: `short-${i + 1}`,
		thumbnail: `https://picsum.photos/300/500?random=${i}`,
		videoUrl: "#",
		title: `Short video #${i + 1} - Amazing content you won't believe!`,
		channelName: `Creator ${i + 1}`,
		channelAvatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? "men" : "women"}/${Math.floor(Math.random() * 100) + 1}.jpg`,
		views: `${Math.floor(Math.random() * 10) + 1}M`,
		timestamp: `${Math.floor(Math.random() * 7) + 1} days ago`,
		duration: `0:${Math.floor(Math.random() * 30) + 10}`,
		likes: Math.floor(Math.random() * 500000) + 50000,
		comments: Math.floor(Math.random() * 1000) + 10,
		description: "Check out this amazing short video! #shorts #trending #viral",
	}));

export const generateMockComments = (shortId) => {
	return Array(Math.floor(Math.random() * 10) + 3)
		.fill(null)
		.map((_, i) => ({
			id: `comment-${shortId}-${i + 1}`,
			avatar: `https://source.unsplash.com/random/100x100?face&sig=${shortId * 20 + i}`,
			username: `User${Math.floor(Math.random() * 1000)}`,
			comment: `This is an awesome short! I ${Math.random() > 0.5 ? "love" : "really enjoy"} the content. Keep it up! ${
				Math.random() > 0.7 ? "#awesome #content" : ""
			}`,
			timestamp: `${Math.floor(Math.random() * 7) + 1} days ago`,
			likes: Math.floor(Math.random() * 200),
		}));
};
