import React, { useState, useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { ThumbsUp, ThumbsDown, X } from "lucide-react";

// Mock comments generator
const generateMockComments = (shortId: string) => {
	const id = parseInt(shortId.split("-")[1]);
	return Array(Math.floor(Math.random() * 10) + 3)
		.fill(null)
		.map((_, i) => ({
			id: `comment-${shortId}-${i + 1}`,
			avatar: `https://source.unsplash.com/random/100x100?face&sig=${id * 20 + i}`,
			username: `User${Math.floor(Math.random() * 1000)}`,
			comment: `This is an awesome short! I ${Math.random() > 0.5 ? "love" : "really enjoy"} the content. Keep it up! ${
				Math.random() > 0.7 ? "#awesome #content" : ""
			}`,
			timestamp: `${Math.floor(Math.random() * 7) + 1} days ago`,
			likes: Math.floor(Math.random() * 200),
		}));
};

type ShortCommentsProps = {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	shortId: string;
};

const ShortComments = ({ isOpen, onOpenChange, shortId }: ShortCommentsProps) => {
	const { toast } = useToast();
	const [comments, setComments] = useState<any[]>([]);
	const [newComment, setNewComment] = useState("");

	// Load comments when shortId changes
	useEffect(() => {
		if (shortId) {
			setComments(generateMockComments(shortId));
		}
	}, [shortId]);

	const handleSubmitComment = (e: React.FormEvent) => {
		e.preventDefault();

		if (newComment.trim()) {
			const newCommentObj = {
				id: `comment-${shortId}-new-${Date.now()}`,
				avatar: "https://source.unsplash.com/random/100x100?face&sig=user",
				username: "You",
				comment: newComment,
				timestamp: "Just now",
				likes: 0,
			};

			setComments([newCommentObj, ...comments]);
			setNewComment("");

			toast({
				title: "Comment added!",
				description: "Your comment was successfully added.",
			});
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent
				className="fixed bottom-0 top-20 p-0 max-w-md border-0 rounded-t-xl bg-background animate-slide-in-from-bottom"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex flex-col h-full">
					<div className="flex items-center justify-between py-3 px-4 border-b">
						<h3 className="font-medium">Comments ({comments.length || 0})</h3>
						<Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
							<X size={18} />
						</Button>
					</div>

					{/* Comment form */}
					<form className="px-4 py-2 border-b flex items-start gap-3" onSubmit={handleSubmitComment}>
						<Avatar className="h-8 w-8">
							<img src="https://source.unsplash.com/random/100x100?face&sig=user" alt="Your avatar" />
						</Avatar>
						<div className="flex-1">
							<Textarea
								placeholder="Add a comment..."
								className="min-h-0 resize-none"
								rows={1}
								value={newComment}
								onChange={(e) => setNewComment(e.target.value)}
							/>
							<div className="flex justify-end mt-2">
								<Button variant="ghost" size="sm" type="button" onClick={() => setNewComment("")}>
									Cancel
								</Button>
								<Button size="sm" type="submit" disabled={newComment.trim() === ""}>
									Comment
								</Button>
							</div>
						</div>
					</form>

					{/* Comments list */}
					<ScrollArea className="flex-1 overflow-y-auto">
						<div className="px-4 py-2 divide-y">
							{comments.map((comment) => (
								<div key={comment.id} className="py-3 flex gap-3">
									<Avatar className="h-8 w-8 flex-shrink-0">
										<img src={comment.avatar} alt={comment.username} />
									</Avatar>
									<div className="flex flex-col">
										<div className="flex items-center gap-2">
											<span className="font-medium text-sm">{comment.username}</span>
											<span className="text-xs text-muted-foreground">{comment.timestamp}</span>
										</div>
										<p className="text-sm mt-1">{comment.comment}</p>
										<div className="flex items-center gap-3 mt-1">
											<button className="flex items-center text-xs text-muted-foreground hover:text-foreground">
												<ThumbsUp className="h-3 w-3 mr-1" />
												{comment.likes > 0 ? comment.likes : ""}
											</button>
											<button className="flex items-center text-xs text-muted-foreground hover:text-foreground">
												<ThumbsDown className="h-3 w-3 mr-1" />
											</button>
											<button className="text-xs text-muted-foreground hover:text-foreground">Reply</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</ScrollArea>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ShortComments;
