import { useState } from "react";
import { postService } from "../../../Services/postServices";
import { useAuth } from "../../../Context/AuthContext";

import heartIcon from "../../../src/assets/images/heart.png";
import redHeartIcon from "../../../src/assets/images/redHeart.png";
import commentIcon from "../../../src/assets/images/chat.png";
import "../../../src/styles/postCard.css";

export default function PostCard({ post, onDelete }) {
  const { user } = useAuth();

  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [liked, setLiked] = useState(
    post.likes?.includes(user?._id) || false
  );

  const [comments, setComments] = useState(post.comments || []);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commenting, setCommenting] = useState(false);

  const initials = post.user?.name?.slice(0, 2).toUpperCase() || "U";

  const timeAgo = (date) => {
    const diff = Math.floor((Date.now() - new Date(date)) / 1000);

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const handleLike = async () => {
    try {
      const data = await postService.likePost(post._id);

      setLikes(data.likes);
      setLiked(data.liked);
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    setCommenting(true);

    try {
      const data = await postService.addComment(post._id, commentText);

      setComments((prev) => [...prev, data.comment]);
      setCommentText("");
    } catch (err) {
      console.error(err);
    } finally {
      setCommenting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;

    try {
      await postService.deletePost(post._id);

      onDelete?.(post._id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fk-post-card">

      {/* Header */}
      <div className="fk-post-header">

        <div className="fk-post-avatar">
          {post.user?.avatar ? (
            <img
              src={`http://localhost:5002${post.user.avatar}`}
              alt="avatar"
            />
          ) : (
            initials
          )}
        </div>

        <div className="fk-post-user">
          <div className="fk-post-name">
            {post.user?.name}
          </div>

          <div className="fk-post-time">
            {timeAgo(post.createdAt)}
          </div>
        </div>

        {user?._id === post.user?._id && (
          <button
            className="fk-delete"
            onClick={handleDelete}
          >
            <i className="bi bi-trash3-fill"></i>
          </button>
        )}

      </div>

      {/* Post Text */}

      <p className="fk-post-text">
        {post.text}
      </p>

      {/* Actions */}

      <div className="fk-post-actions">

        <button
          className={`fk-action-btn ${
            liked ? "fk-like-active" : ""
          }`}
          onClick={handleLike}
        >
          <img
            src={liked ? redHeartIcon : heartIcon}
            alt="Like"
            width={18}
          />

          {likes}
        </button>

        <button
          className="fk-action-btn"
          onClick={() =>
            setShowComments(!showComments)
          }
        >
          <img
            src={commentIcon}
            alt="Comment"
            width={18}
          />

          {comments.length}
        </button>

      </div>

      {/* Comments */}

      {showComments && (

        <div className="fk-comments">

          {comments.length === 0 && (
            <p className="text-muted mb-3">
              No comments yet.
            </p>
          )}

          {comments.map((comment, index) => (

            <div
              className="fk-comment"
              key={index}
            >

              <div className="fk-comment-avatar">
                {comment.user?.name
                  ?.slice(0, 2)
                  .toUpperCase() || "U"}
              </div>

              <div className="fk-comment-body">

                <span className="fk-comment-name">
                  {comment.user?.name || "User"}
                </span>

                {comment.text}

              </div>

            </div>

          ))}

          <form
            className="fk-comment-form"
            onSubmit={handleComment}
          >

            <input
              className="fk-comment-input"
              value={commentText}
              onChange={(e) =>
                setCommentText(e.target.value)
              }
              placeholder="Write a comment..."
            />

            <button
              className="fk-comment-btn"
              disabled={commenting}
            >
              {commenting ? "Posting..." : "Post"}
            </button>

          </form>

        </div>

      )}

    </div>
  );
}