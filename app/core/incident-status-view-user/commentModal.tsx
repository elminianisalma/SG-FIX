import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

type CommentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  comments: string[];
  onAddComment: (newComment: string) => void;
};

const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  comments,
  onAddComment,
}) => {
  const [newComment, setNewComment] = useState("");

  const handleSend = () => {
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment("");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="bg-white rounded-lg p-6 w-full max-w-md z-50 relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
            <XMarkIcon className="h-5 w-5" />
          </button>
          <Dialog.Title className="text-lg font-semibold mb-4">Commentaires</Dialog.Title>

          <div className="h-64 overflow-y-auto space-y-2 mb-4 border rounded p-2 bg-gray-50">
            {comments.map((comment, index) => (
              <div
                key={index}
                className={`p-2 rounded ${
                  index % 2 === 0 ? "bg-blue-100 self-start" : "bg-green-100 self-end"
                }`}
              >
                {comment}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="flex-1 px-3 py-2 border rounded"
            />
            <button onClick={handleSend} className="text-blue-600 hover:text-blue-800">
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CommentModal;
