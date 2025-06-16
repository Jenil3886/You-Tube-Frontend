// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { Toaster } from "./components/ui/toaster";
// import axios from "axios";
// import { ToastProvider } from "./components/ui/toast";
// import { TooltipProvider } from "./components/ui/tooltip";
// import { ThemeProvider } from "./context/ThemeContext";

// // pages
// import AppLayout from "@/components/layout/AppLayout";
// import {
// 	HomePage,
// 	VideoPage,
// 	SearchResultsPage,
// 	NotFound,
// 	SettingsPage,
// 	ProfilePage,
// 	YourChannelPage,
// 	HistoryPage,
// 	ShortsPage,
// 	SubscriptionsPage,
// 	TrendingPage,
// 	MusicPage,
// 	LivePage,
// 	GamingPage,
// 	NewsPage,
// 	SportsPage,
// 	ShoppingPage,
// 	LikedVideos,
// 	Watchlist,
// 	LoginPage,
// 	RegisterPage,
// 	UploadPage,
// 	PostPage,
// 	ChannelCreationPage,
// 	PublicChannelPage,
// } from "@/pages/index";

// // youtube studio pages
// import StudioLayout from "./components/layout/StudioLayout";
// import {
// 	StudioAnalyticsPage,
// 	StudioAudioLibraryPage,
// 	StudioContentPage,
// 	StudioCopyrightPage,
// 	StudioCustomizationPage,
// 	StudioDashboardPage,
// 	StudioEarnPage,
// 	StudioSubtitlesPage,
// } from "@/pages/studio/index";

// // Set up Axios to include the Authorization header for all requests
// axios.interceptors.request.use((config) => {
// 	const token = localStorage.getItem("accessToken");
// 	if (token) {
// 		config.headers.Authorization = `Bearer ${token}`;
// 		console.log("Token added to header:", token);
// 	} else {
// 		console.warn("No access token found in localStorage");
// 	}
// 	return config;
// });

// // YouTube Studio Routes

// const queryClient = new QueryClient();

// const App = () => {
// 	const isAuthenticated = !!localStorage.getItem("accessToken");
// 	console.log("isAuthenticated", isAuthenticated);

// 	return (
// 		<QueryClientProvider client={queryClient}>
// 			<ThemeProvider>
// 				<TooltipProvider>
// 					<ToastProvider />
// 					<Toaster />
// 					<BrowserRouter>
// 						<Routes>
// 							<Route path="/login" element={<LoginPage />} />
// 							<Route path="/register" element={<RegisterPage />} />
// 							<Route path="/" element={isAuthenticated ? <AppLayout /> : <Navigate to="/login" />}>
// 								{/* <Route path="/" element={<AppLayout />}> */}
// 								<Route index element={<HomePage />} />
// 								<Route path="/video/:videoId" element={<VideoPage />} />
// 								<Route path="/search" element={<SearchResultsPage />} />
// 								<Route path="/settings" element={<SettingsPage />} />
// 								<Route path="/profile" element={<ProfilePage />} />
// 								<Route path="/history" element={<HistoryPage />} />
// 								<Route path="/channel" element={<YourChannelPage />} />
// 								<Route path="/channels/:handle" element={<PublicChannelPage />} />
// 								<Route path="/create-channel" element={<ChannelCreationPage />} />
// 								<Route path="/shorts" element={<ShortsPage />} />
// 								<Route path="/subscriptions" element={<SubscriptionsPage />} />
// 								<Route path="/trending" element={<TrendingPage />} />
// 								<Route path="/music" element={<MusicPage />} />
// 								<Route path="/live" element={<LivePage />} />
// 								<Route path="/gaming" element={<GamingPage />} />
// 								<Route path="/news" element={<NewsPage />} />
// 								<Route path="/sports" element={<SportsPage />} />
// 								<Route path="/shopping" element={<ShoppingPage />} />
// 								<Route path="/liked" element={<LikedVideos />} />
// 								<Route path="/watchlist" element={<Watchlist />} />
// 								{/* New routes for Create dropdown options */}
// 								<Route path="/upload" element={<UploadPage />} />
// 								<Route path="/post" element={<PostPage />} />
// 								<Route path="*" element={<NotFound />} />
// 							</Route>

// 							{/* YouTube Studio Routes */}
// 							<Route path="/studio" element={<StudioLayout />}>
// 								<Route index element={<StudioDashboardPage />} />
// 								<Route path="dashboard" element={<StudioDashboardPage />} />
// 								<Route path="content" element={<StudioContentPage />} />
// 								<Route path="analytics" element={<StudioAnalyticsPage />} />
// 								<Route path="subtitles" element={<StudioSubtitlesPage />} />
// 								<Route path="copyright" element={<StudioCopyrightPage />} />
// 								<Route path="earn" element={<StudioEarnPage />} />
// 								<Route path="customization" element={<StudioCustomizationPage />} />
// 								<Route path="audio-library" element={<StudioAudioLibraryPage />} />
// 							</Route>
// 						</Routes>
// 					</BrowserRouter>
// 				</TooltipProvider>
// 			</ThemeProvider>
// 		</QueryClientProvider>
// 	);
// };

// export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import AppLayout from "@/components/layout/AppLayout";
import {
	HomePage,
	VideoPage,
	SearchResultsPage,
	NotFound,
	SettingsPage,
	ProfilePage,
	YourChannelPage,
	HistoryPage,
	ShortsPage,
	SubscriptionsPage,
	TrendingPage,
	MusicPage,
	LivePage,
	GamingPage,
	NewsPage,
	SportsPage,
	ShoppingPage,
	LikedVideos,
	Watchlist,
	LoginPage,
	RegisterPage,
	UploadPage,
	PostPage,
	ChannelCreationPage,
	PublicChannelPage,
	ForgotPasswordPage,
	ResetPasswordPage,
} from "@/pages/index";
import StudioLayout from "./components/layout/StudioLayout";
import {
	StudioAnalyticsPage,
	StudioAudioLibraryPage,
	StudioContentPage,
	StudioCopyrightPage,
	StudioCustomizationPage,
	StudioDashboardPage,
	StudioEarnPage,
	StudioSubtitlesPage,
} from "@/pages/studio/index";
import EditVideo from "./pages/studio/content/video/EditVideo";

// Set up Axios to include the Authorization header for all requests
axios.interceptors.request.use((config) => {
	const token = localStorage.getItem("accessToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	} else {
		console.warn("No access token found in localStorage");
	}
	return config;
});

// YouTube Studio Routes

const App = () => {
	const isAuthenticated = !!localStorage.getItem("accessToken");

	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/" element={isAuthenticated ? <AppLayout /> : <Navigate to="/login" />}>
				<Route index element={<HomePage />} />
				<Route path="/video/:videoId" element={<VideoPage />} />
				<Route path="/search" element={<SearchResultsPage />} />
				<Route path="/settings" element={<SettingsPage />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/history" element={<HistoryPage />} />
				<Route path="/channel" element={<YourChannelPage />} />
				<Route path="/channels/:handle" element={<PublicChannelPage />} />
				<Route path="/create-channel" element={<ChannelCreationPage />} />
				<Route path="/shorts" element={<ShortsPage />} />
				<Route path="/subscriptions" element={<SubscriptionsPage />} />
				<Route path="/trending" element={<TrendingPage />} />
				<Route path="/music" element={<MusicPage />} />
				<Route path="/live" element={<LivePage />} />
				<Route path="/gaming" element={<GamingPage />} />
				<Route path="/news" element={<NewsPage />} />
				<Route path="/sports" element={<SportsPage />} />
				<Route path="/shopping" element={<ShoppingPage />} />
				<Route path="/liked" element={<LikedVideos />} />
				<Route path="/watchlist" element={<Watchlist />} />
				{/* New routes for Create dropdown options */}
				<Route path="/upload" element={<UploadPage />} />
				<Route path="/post" element={<PostPage />} />
				<Route path="/forgot-password" element={<ForgotPasswordPage />} />
				<Route path="/reset-password" element={<ResetPasswordPage />} />
				<Route path="*" element={<NotFound />} />
			</Route>

			{/* YouTube Studio Routes */}
			<Route path="/studio" element={<StudioLayout />}>
				<Route index element={<StudioDashboardPage />} />
				<Route path="dashboard" element={<StudioDashboardPage />} />
				<Route path="content" element={<StudioContentPage />} />
				<Route path="edit/:videoId" element={<EditVideo />} />
				<Route path="analytics" element={<StudioAnalyticsPage />} />
				<Route path="subtitles" element={<StudioSubtitlesPage />} />
				<Route path="copyright" element={<StudioCopyrightPage />} />
				<Route path="earn" element={<StudioEarnPage />} />
				<Route path="customization" element={<StudioCustomizationPage />} />
				<Route path="audio-library" element={<StudioAudioLibraryPage />} />
			</Route>
		</Routes>
	);
};

export default App;
