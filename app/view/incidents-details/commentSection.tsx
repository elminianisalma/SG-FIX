"use client";
import React, { useState, useEffect } from "react";

type Comment = {
  id: number;
  user: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  sub: string;
  serviceName: string;
  content: string;
  parentCommentId?: number;
  reactions: { type: string }[];
};

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState<{ [key: number]: string }>({});
  const [showReplyForm, setShowReplyForm] = useState<{ [key: number]: boolean }>({});

  // Fetch comments from backend
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("/api/comments"); // Adjust endpoint as needed
        const data = await response.json();
        const formattedComments = data.map((item: any) => ({
          id: item.commentaireId || item.id,
          user: item.fullName || `${item.firstName} ${item.lastName}`,
          email: item.email,
          firstName: item.firstName,
          lastName: item.lastName,
          fullName: item.fullName,
          sub: item.sub,
          serviceName: item.serviceName,
          content: item.contenu || item.content,
          parentCommentId: item.parentCommentaireId,
          reactions: item.reactions || [{ type: "like" }], // Default to like if no reactions
        }));
        setComments(formattedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, []);

  const getCurrentTimeAgo = () => "Just now";

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const newId = comments.length ? Math.max(...comments.map(c => c.id)) + 1 : 1;
    const comment: Comment = {
      id: newId,
      user: "Current User",
      email: "user@example.com",
      firstName: "Current",
      lastName: "User",
      fullName: "Current User",
      sub: "user-sub",
      serviceName: "user-service",
      content: newComment,
      reactions: [{ type: "like" }],
    };
    setComments((prev) => [...prev, comment]);
    setNewComment("");
  };

  const handleAddReply = (e: React.FormEvent, parentId: number) => {
    e.preventDefault();
    if (!replyContent[parentId]?.trim()) return;
    const newId = comments.length ? Math.max(...comments.map(c => c.id)) + 1 : 1;
    const newReply: Comment = {
      id: newId,
      user: "Current User",
      email: "user@example.com",
      firstName: "Current",
      lastName: "User",
      fullName: "Current User",
      sub: "user-sub",
      serviceName: "user-service",
      content: replyContent[parentId],
      parentCommentId: parentId,
      reactions: [{ type: "like" }],
    };
    setComments((prev) => [...prev, newReply]);
    setReplyContent((prev) => ({ ...prev, [parentId]: "" }));
    setShowReplyForm((prev) => ({ ...prev, [parentId]: false }));
  };

  const toggleReplyForm = (commentId: number) => {
    setShowReplyForm((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const getReactionIcon = (type: string) => {
    switch (type) {
      case "like":
        return "👍";
      case "love":
        return "❤️";
      default:
        return "👍";
    }
  };

  return (
    <div className="p-5 max-w-4xl">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Commentaires{" "}
        <span className="bg-gray-200 rounded-full px-2 py-1 text-sm">
          {comments.length}
        </span>
      </h3>

      <form onSubmit={handleAddComment} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-3 border rounded-md resize-none h-24 text-gray-700"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Post Comment
        </button>
      </form>

      {comments
        .filter((comment) => !comment.parentCommentId)
        .map((comment) => (
          <div key={comment.id} className="border-l-4 border-gray-300 my-5 pl-3">
            <p>
              <strong className="text-gray-800">{comment.user}</strong>{" "}
              <span className="text-gray-500 text-sm">{getCurrentTimeAgo()}</span>
            </p>
            <p className="text-gray-700 my-2">{comment.content}</p>
            <div className="flex gap-3 text-gray-600 text-sm">
              {comment.reactions.map((reaction, index) => (
                <span key={index} className="flex items-center gap-1">
                  {getReactionIcon(reaction.type)} 1
                </span>
              ))}
              <button
                onClick={() => toggleReplyForm(comment.id)}
                className="text-blue-600 hover:underline"
              >
                Reply
              </button>
            </div>

            {showReplyForm[comment.id] && (
              <form
                onSubmit={(e) => handleAddReply(e, comment.id)}
                className="mt-3 pl-5"
              >
                <textarea
                  value={replyContent[comment.id] || ""}
                  onChange={(e) =>
                    setReplyContent((prev) => ({ ...prev, [comment.id]: e.target.value }))
                  }
                  placeholder="Add a reply..."
                  className="w-full p-3 border rounded-md resize-none h-20 text-gray-700"
                />
                <button
                  type="submit"
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Post Reply
                </button>
              </form>
            )}

            {comments
              .filter((c) => c.parentCommentId === comment.id)
              .map((reply) => (
                <div key={reply.id} className="mt-4 pl-5 border-l-2 border-gray-200">
                  <p>
                    <strong className="text-gray-800">{reply.user}</strong>{" "}
                    <span className="text-gray-500 text-sm">{getCurrentTimeAgo()}</span>
                  </p>
                  <p className="text-gray-700 my-2">{reply.content}</p>
                  <div className="flex gap-3 text-gray-600 text-sm">
                    {reply.reactions.map((reaction, index) => (
                      <span key={index} className="flex items-center gap-1">
                        {getReactionIcon(reaction.type)} 1
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

export default CommentSection;