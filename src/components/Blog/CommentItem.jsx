import React from "react";

const CommentItem = ({
  comment,
  postId,
  newComment,
  setNewComment,
  onReplyComment,
  onToggleCommentLike,
}) => {
  return (
    <div className="comment-item">
      <div className="comment-author">{comment.user_id?.full_name || "Ẩn danh"}</div>
      <div className="comment-content">{comment.content}</div>
      <div className="comment-actions">
        <span onClick={() => onToggleCommentLike(comment._id, comment.isLikedByMe, postId)}>
        {comment.likeCount || 0}  Like 
        </span>
      </div>

      {/* reply input */}
      <div className="reply-box">
        <input
          type="text"
          placeholder="Trả lời..."
          value={newComment[`${postId}_${comment._id}`] || ""}
          onChange={(e) =>
            setNewComment((prev) => ({
              ...prev,
              [`${postId}_${comment._id}`]: e.target.value,
            }))
          }
        />
        <button
          onClick={() =>
            onReplyComment(
              postId,
              comment._id,
              newComment[`${postId}_${comment._id}`]
            )
          }
        >
          Gửi
        </button>
      </div>

      {/* render replies */}
      {comment.replies?.map((reply) => (
        <div key={reply._id} className="comment-reply">
          <div className="comment-author">{reply.user_id?.full_name || "Ẩn danh"}</div>
          <div className="comment-content">{reply.content}</div>
          <div className="comment-actions">
            <span onClick={() => onToggleCommentLike(reply._id, reply.isLikedByMe, postId)}>
             {reply.likeCount || 0} Like 
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentItem;
