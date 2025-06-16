// src/context/VideoUploadContext.tsx
import { UploadingVideo, VideoUploadContextType } from "@/types";
import React, { createContext, useState, useContext, useCallback } from "react";

const VideoUploadContext = createContext<VideoUploadContextType | undefined>(undefined);

export const VideoUploadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [uploadingVideos, setUploadingVideos] = useState<Record<string, UploadingVideo>>({});

	const addUploadingVideo = useCallback((id: string, title = "Uploading...") => {
		setUploadingVideos((prev) => ({
			...prev,
			[id]: {
				id,
				title,
				timestamp: new Date().toISOString(),
				progress: 0,
			},
		}));
	}, []);

	const updateUploadingProgress = useCallback((id: string, progress: number) => {
		setUploadingVideos((prev) => {
			if (!prev[id]) return prev;
			return {
				...prev,
				[id]: {
					...prev[id],
					progress,
				},
			};
		});
	}, []);

	const updateUploadedVideo = useCallback((oldId: string, apiVideo: string) => {
		setUploadingVideos((prev) => {
			const newVideos = { ...prev };
			delete newVideos[oldId];
			return newVideos;
		});
	}, []);

	const removeUploadingVideo = useCallback((id: string) => {
		setUploadingVideos((prev) => {
			const newVideos = { ...prev };
			delete newVideos[id];
			return newVideos;
		});
	}, []);

	return (
		<VideoUploadContext.Provider value={{ uploadingVideos, addUploadingVideo, updateUploadedVideo, removeUploadingVideo, updateUploadingProgress }}>
			{children}
		</VideoUploadContext.Provider>
	);
};

export const useVideoUploadContext = () => {
	const context = useContext(VideoUploadContext);
	if (!context) throw new Error("useVideoUploadContext must be used within a VideoUploadProvider");
	return context;
};
