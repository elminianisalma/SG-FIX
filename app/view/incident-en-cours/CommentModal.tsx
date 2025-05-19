import React, { useState } from 'react';

export interface Comment {
  id: number;
  author: string;
  date: string;
  message: string;
  replies?: Comment[];
}

interface Props {
  incident: {
    comments: Comment[];
    // autres props de l’incident si besoin
  };
  onClose: () => void;
}

const AvatarInitials = ({ name }: { name: string }) => {
  const initials = name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-600', 'bg-yellow-400', 'bg-red-500', 'bg-indigo-500'];
  const colorClass = colors[name.charCodeAt(0) % colors.length];
  return (
    <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-semibold ${colorClass}`} title={name}>
      {initials}
    </div>
  );
};

const CommentItem = ({
  comment,
  onReply,
}: {
  comment: Comment;
  onReply: (parentId: number, message: string) => void;
}) => {
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      onReply(comment.id, replyText.trim());
      setReplyText('');
      setReplying(false);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-start gap-3">
        <AvatarInitials name={comment.author} />
        <div className="flex-1">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-800">{comment.author}</span>
            <span className="text-xs text-gray-500">{new Date(comment.date).toLocaleString()}</span>
          </div>
          <p className="mt-1 text-gray-700">{comment.message}</p>
          <button
            onClick={() => setReplying(!replying)}
            className="mt-1 text-sm text-blue-600 hover:underline"
          >
            {replying ? 'Annuler' : 'Répondre'}
          </button>

          {replying && (
            <div className="mt-2">
              <textarea
                rows={2}
                className="w-full rounded border p-2"
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="Votre réponse..."
              />
              <button
                onClick={handleReplySubmit}
                className="mt-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Envoyer
              </button>
            </div>
          )}

          {/* Affichage des réponses */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 pl-8 border-l-2 border-gray-300">
              {comment.replies.map(reply => (
                <CommentItem key={reply.id} comment={reply} onReply={onReply} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CommentsSection = ({ incident, setIncidentComments }: { incident: { comments: Comment[] }, setIncidentComments: React.Dispatch<React.SetStateAction<Comment[]>> }) => {
  const [newComment, setNewComment] = useState('');

  // Ajouter un nouveau commentaire "racine"
  const addComment = () => {
    if (newComment.trim()) {
      const newC: Comment = {
        id: Date.now(),
        author: 'Utilisateur actuel', // Remplacer par le nom réel connecté
        date: new Date().toISOString(),
        message: newComment.trim(),
      };
      setIncidentComments(prev => [...prev, newC]);
      setNewComment('');
    }
  };

  // Ajouter une réponse à un commentaire existant
  const addReply = (parentId: number, message: string) => {
    const addReplyRecursive = (comments: Comment[]): Comment[] =>
      comments.map(c => {
        if (c.id === parentId) {
          const reply: Comment = {
            id: Date.now(),
            author: 'Utilisateur actuel', // Remplacer aussi ici
            date: new Date().toISOString(),
            message,
          };
          return { ...c, replies: c.replies ? [...c.replies, reply] : [reply] };
        }
        if (c.replies) {
          return { ...c, replies: addReplyRecursive(c.replies) };
        }
        return c;
      });

    setIncidentComments(prev => addReplyRecursive(prev));
  };

  return (
    <div>
      <div className="mb-4">
        {incident.comments.length === 0 && <p>Aucun commentaire pour le moment.</p>}
        {incident.comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} onReply={addReply} />
        ))}
      </div>
      <div>
        <textarea
          rows={3}
          className="w-full rounded border p-2"
          placeholder="Ajouter un commentaire..."
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
        />
        <button
          onClick={addComment}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default CommentsSection;
