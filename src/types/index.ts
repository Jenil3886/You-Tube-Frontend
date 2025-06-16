export interface CommentType {
	id: number;
	content: string;
	createdAt: string;
	owner?: {
		name?: string;
		avatar?: string;
	};
}

export interface VideoType {
	id: number;
	thumbnail: string;
	videoUrl: string;
	title: string;
	channelId: number;
	channelName: string;
	channelAvatar: string;
	subscribers: string | number;
	views: string;
	timestamp: string;
	likes: string;
	description: string;
	duration: number;
	comments: CommentType[];
	previewFolder: string;
	userAvtar: string;
	isLiked: boolean;
}

// Type definition for a channel
export interface Channel {
	id: string;
	name: string;
	handle: string;
	description?: string;
	profilePicture?: string | null;
	channelBanner?: string | null;
	createdAt: string;
	subscribers?: string;
	ownerId: string;
}

// Type definition for a video
export interface Video {
	id: string;
	thumbnail: string;
	title: string;
	channelName: string;
	channelAvatar: string;
	handle: string;
	views: string;
	timestamp: string;
	duration: string;
	visibility: string;
	commentCount: number;

	isTemporary?: boolean;
}

export interface SpeechRecognitionErrorEvent extends Event {
	error: string;
}

export interface CommentType {
	id: number;
	content: string;
	createdAt: string;
	owner?: {
		name?: string;
		avatar?: string;
	};
}

export interface ChannelType {
	id: number;
	name: string;
	profilePicture?: string;
	subscriberCount?: number;
	isSubscribed?: number;
}

export interface VideoType {
	id: number;
	thumbnail: string;
	videoUrl: string;
	title: string;
	channelId: number;
	channelName: string;
	channelAvatar: string;
	subscribers: string | number;
	views: string;
	timestamp: string;
	likes: string;
	description: string;
	duration: number;
	comments: CommentType[];
	previewFolder: string;
	userAvtar: string;
	isLiked: boolean;
}

export interface ApiVideo {
	id: string;
	thumbnail: string;
	title: string;
	channel?: {
		id: string;
		name: string;
		profilePicture?: string;
		handle?: string;
	};
	views?: number;
	createdAt: string;
	duration: string;
	visibility?: string;
	commentCount?: number;
}

export interface CategoryPageProps {
	title: string;
	description?: string;
	filters?: string[];
	videos: any[];
}

export interface CustomizeChannelModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	activeChannel: Channel | null;
	onUpdateChannel: (updatedChannel: Channel) => void;
}

export interface AccountsDropdownProps {
	onClose: () => void;
}

export interface AppearanceDropdownProps {
	onClose: () => void;
}

export interface KeyboardShortcutsProps {
	onClose: () => void;
}

export interface LanguageDropdownProps {
	onClose: () => void;
}

export interface LocationDropdownProps {
	onClose: () => void;
}

export interface RestrictedModeDropdownProps {
	onClose: () => void;
}

export interface SettingOption {
	label: string;
	icon: React.ComponentType<{ size?: number }>;
	toggle?: boolean;
	onClick?: () => void;
}

export interface SubscriptionDropdownProps {
	isSubscribed: boolean;
	onUnsubscribe: () => void;
}

export interface LogoProps {
	onMenuClick: () => void;
}

export interface HeaderProps {
	onMenuClick: () => void;
}

export interface SidebarProps {
	open: boolean;
}

export interface SidebarItemProps {
	icon: React.ReactNode;
	text: string;
	to: string;
	isCollapsed: boolean;
}

export interface SidebarProps {
	open: boolean;
}

export interface Notification {
	id: string;
	avatar: string;
	channel: string;
	title: string;
	time: string;
	thumbnail?: string;
	isImportant?: boolean;
}

export interface NotificationsDrawerProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export interface ErrorPageProps {
	title?: string;
	message: string;
	onRetry?: () => void;
	showReportButton?: boolean;
	onReport?: () => void;
	errorCode?: string | number; // Optional error code
}

export interface VideoCardProps {
	id: string;
	thumbnail: string;
	title: string;
	channelName?: string;
	handle: string;
	channelAvatar: string;
	views: number;
	timestamp: string;
	duration: string;
	compact?: boolean;
}

export interface VideoControlsProps {
	isPlaying: boolean;
	currentTime: number;
	duration: number;
	volume: number;
	isMuted: boolean;
	isFullScreen: boolean;
	bufferedEnd: number;
	playbackRate: number;
	togglePlayPause: () => void;
	handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	toggleMute: () => void;
	toggleFullScreen: () => void;
	changePlaybackSpeed: (speed: number) => void;
	handleMiniPlayer: () => void;
	isSaved: boolean;
	saveForLater: () => void;
	hoveredTime: number | null;
	hoveredThumbnail: { time: number; url: string } | null;
	handleHover: (e: React.MouseEvent<HTMLInputElement>) => void;
}

export interface VideoGridProps {
	videos: {
		id: string;
		thumbnail: string;
		title: string;
		channelName: string;
		handle: string;
		channelAvatar: string;
		views: string;
		timestamp: string;
		duration: string;
	}[];
}

export interface MiniPlayerProps {
	video: {
		id: string;
		title: string;
		channelName: string;
		videoUrl: string; // Should be .m3u8 URL
		thumbnail: string;
	};
	onClose: () => void;
}

export interface VideoInfoProps {
	video: VideoType;
	isSubscribed: boolean;
	handleSubscribe: () => void;
	isLiked: boolean;
	likeCount: number;
	handleLike: () => void;
	showFullDescription: boolean;
	setShowFullDescription: (value: boolean) => void;
}

export interface ThemeProviderProps {
	children: React.ReactNode;
}

type Theme = "light" | "dark" | "system";

export interface ThemeContextType {
	theme: Theme;
	setTheme: (theme: Theme) => void;
}

export interface UploadingVideo {
	id: string;
	title: string;
	timestamp: string;
	progress?: number; // Add progress field
}

export interface VideoUploadContextType {
	uploadingVideos: Record<string, UploadingVideo>;
	addUploadingVideo: (id: string, title?: string) => void;
	updateUploadedVideo: (oldId: string, apiVideo: string) => void;
	removeUploadingVideo: (id: string) => void;
	updateUploadingProgress: (id: string, progress: number) => void; // Add progress updater
}

export interface LanguageOption {
	label: string;
	value: string;
}

export interface ApiVideo {
	id: string;
	thumbnail: string;
	title: string;
	channel?: {
		id: string;
		name: string;
		profilePicture?: string;
		handle?: string;
	};
	views?: number;
	createdAt: string;
	duration: string;
	visibility?: string;
}

export interface Profile {
	id: number;
	fullName: string;
	username: string;
	email: string;
	avatar: string;
	coverImage: string;
	name: string;
	handle: string;
	description: string;
	profilePicture: string;
	bannerPicture: string;
	subscriberCount: number;
	ownerId: number;
	createdAt: string;
	updatedAt: string;
}

export interface CommentType {
	id: number;
	content: string;
	createdAt: string;
	owner?: {
		name?: string;
		avatar?: string;
	};
}

export interface VideoCardProps {
	video: any;
	isSelected: boolean;
	onSelectVideo: (id: string, checked: boolean) => void;
}

export interface VideoTableProps {
	videos: any[];
	selectedVideos: string[];
	onSelectVideo: (id: string, checked: boolean) => void;
	uploadingCount?: number;
}

export interface VideoDetails {
	id: string;
	title: string;
	description: string;
	thumbnail: string;
	visibility: string;
	madeForKids: boolean;
	relatedVideo?: string;
	duration: string;
}
