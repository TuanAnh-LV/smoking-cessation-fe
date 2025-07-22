import React from "react";
import CommentItem from "./CommentItem";

const BlogPost = ({
  post,
  comments,
  newComment,
  setNewComment,
  onAddComment,
  onReplyComment,
  onToggleLike,
  onToggleCommentLike,
  groupComments,
}) => {
  return (
    <div className="post">
      <div className="post__avatar">S</div>
      <div className="post__content">
        <div className="post__text">{post.content}</div>
        <div className="post__meta">
          <button
            className={`like-btn ${post.isLikedByMe ? "liked" : ""}`}
            onClick={() => onToggleLike(post._id, post.isLikedByMe)}
          >
          {post.likeCount || 0} like
          </button>
        </div>

        <div className="comment-section">
          <div className="add-comment">
            <input
              type="text"
              placeholder="Viết bình luận..."
              value={newComment[post._id] || ""}
              onChange={(e) =>
                setNewComment((prev) => ({ ...prev, [post._id]: e.target.value }))
              }
            />
            <button onClick={() => onAddComment(post._id)}>Bình luận</button>
          </div>

          <div className="comments">
            {groupComments(comments || []).map((cmt) => (
              <CommentItem
                key={cmt._id}
                comment={cmt}
                postId={post._id}
                newComment={newComment}
                setNewComment={setNewComment}
                onReplyComment={onReplyComment}
                onToggleCommentLike={onToggleCommentLike}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
