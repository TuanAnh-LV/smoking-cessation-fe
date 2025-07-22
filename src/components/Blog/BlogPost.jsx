import React, { useState } from "react";
import CommentItem from "./CommentItem";

const BlogPost = ({
  post,
  comments = [],
  newComment,
  setNewComment,
  onAddComment,
  onReplyComment,
  onToggleLike,
  onToggleCommentLike,
  onToggleReply,
  replyOpen,
}) => {
  const [visibleCount, setVisibleCount] = useState(2); // Hiển thị 2 comment đầu

  const visibleComments = comments.slice(0, visibleCount);

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
            <button onClick={() => onAddComment(post._id)}>Gửi</button>
          </div>

          <div className="comments">
            {visibleComments.map((cmt) => (
              <CommentItem
                key={cmt._id}
                comment={cmt}
                postId={post._id}
                newComment={newComment}
                setNewComment={setNewComment}
                onReplyComment={onReplyComment}
                onToggleCommentLike={onToggleCommentLike}
                isReplyOpen={replyOpen[cmt._id]}
                onToggleReply={onToggleReply}
              />
            ))}

            {comments.length > visibleCount && (
              <button
                className="see-more-comments"
                onClick={() => setVisibleCount((prev) => prev + 5)}
              >
                Xem thêm bình luận ({comments.length - visibleCount})
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
