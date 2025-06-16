import { useState, useEffect } from "react";
import axios from "axios";
import { apiurl } from "@/constants";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CommentType } from "@/types";
import { getRelativeTime } from "@/utils/helper";

interface CommentsSectionProps {
	videoId: string | undefined;
	comments: CommentType[];
	setComments: (comments: CommentType[]) => void;
	userAvatar: string;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ videoId, comments, setComments, userAvatar }) => {
	const { toast } = useToast();
	const [commentText, setCommentText] = useState<string>("");
	const [commentsLoading, setCommentsLoading] = useState<boolean>(false);

	const fetchComments = async () => {
		if (!videoId) return;
		setCommentsLoading(true);
		try {
			const token = localStorage.getItem("accessToken");
			const response = await axios.get(`${apiurl}/comments/${videoId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = response.data.data;
			setComments(Array.isArray(data) ? data : data?.comments || []);
		} catch (err: any) {
			console.error("Error fetching comments:", err);
			setComments([]);
			toast({
				title: "Error",
				description: "Failed to load comments",
				variant: "destructive",
			});
		} finally {
			setCommentsLoading(false);
		}
	};

	const handlePostComment = async () => {
		if (!commentText.trim()) return;
		try {
			const token = localStorage.getItem("accessToken");
			const response = await axios.post(`${apiurl}/comments/${videoId}`, { content: commentText }, { headers: { Authorization: `Bearer ${token}` } });
			setCommentText("");
			setComments([response.data.data, ...comments]);
			toast({ title: "Comment added" });
		} catch (err: any) {
			toast({
				title: "Failed to add comment",
				description: err.response?.data?.message || "An error occurred while posting comment.",
				variant: "destructive",
			});
		}
	};

	useEffect(() => {
		fetchComments();
	}, [videoId]);

	return (
		<div className="mt-6">
			<h3 className="text-lg font-medium mb-4">{comments.length} Comments</h3>
			<div className="flex gap-4 mb-6">
				<img src={userAvatar} alt="your avatar" className="w-10 h-10 rounded-full" />
				<div className="flex-1">
					<input
						type="text"
						placeholder="Add a comment..."
						className="w-full bg-transparent border-b border-secondary outline-none pb-2 focus:border-primary"
						value={commentText}
						onChange={(e) => setCommentText(e.target.value)}
					/>
					<div className="flex justify-end gap-2 mt-2">
						<Button variant="ghost" onClick={() => setCommentText("")}>
							Cancel
						</Button>
						<Button disabled={!commentText.trim()} onClick={handlePostComment}>
							Comment
						</Button>
					</div>
				</div>
			</div>
			{commentsLoading ? (
				<p>Loading comments...</p>
			) : comments.length === 0 ? (
				<p className="text-gray-400">No comments yet.</p>
			) : (
				<div className="space-y-4">
					{comments.map((c) => (
						<div key={c.id} className="flex gap-4 items-start">
							<img
								src={c.owner?.avatar || "https://randomuser.me/api/portraits/lego/1.jpg"}
								alt={c.owner?.name || "User"}
								className="w-8 h-8 rounded-full"
							/>
							<div>
								<div className="font-semibold">{c.owner?.name || "Anonymous"}</div>
								<div className="text-sm text-gray-300">{c.content}</div>
								<div className="text-xs text-gray-500 mt-1">{getRelativeTime(c.createdAt)}</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
