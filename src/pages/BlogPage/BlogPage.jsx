import React, { useState, useEffect } from "react";
import { BlogService } from "../../services/blog.service";
import { CommentService } from "../../services/comment.service";
import "./BlogPage.scss";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [newPost, setNewPost] = useState("");
  const [newComment, setNewComment] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await BlogService.getAllBlogs();
      console.log("API response:", res);
      const blogList = res.data.blogs || [];

      const commentMap = {};

      await Promise.all(
        blogList.map(async (post) => {
          try {
            const res = await CommentService.getCommentsByBlog(post._id);
            commentMap[post._id] = res.data?.comments || [];
          } catch {
            commentMap[post._id] = [];
          }
        })
      );

      setPosts(blogList);
      setComments(commentMap);
    } catch (err) {
      console.error("Error loading blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPost = async () => {
    const content = newPost.trim();
    if (!content) return;

    try {
      await BlogService.createBlog({ title: "Chia sẻ", content });
      setNewPost("");
      fetchBlogs();
    } catch (err) {
      console.error("Error creating blog:", err.response?.data || err.message);
    }
  };

  const handleAddComment = async (postId) => {
    const content = (newComment[postId] || "").trim();
    if (!content) return;

    try {
      await CommentService.createComment(postId, content);
      const res = await CommentService.getCommentsByBlog(postId);
      setComments((prev) => ({
        ...prev,
        [postId]: res.comments || [],
      }));
      setNewComment((prev) => ({
        ...prev,
        [postId]: "",
      }));
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  const handleToggleLike = async (postId, isLiked) => {
    try {
      if (isLiked) {
        await BlogService.unlikeBlog(postId);
      } else {
        await BlogService.likeBlog(postId);
      }

      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? {
                ...post,
                isLikedByMe: !isLiked,
                likeCount: post.likeCount + (isLiked ? -1 : 1),
              }
            : post
        )
      );
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  return (
    <div className="blog-page">
      <div className="blog-page__header">
        <h1>Blogs</h1>
      </div>

      <div className="blog-page__content">
        <div className="blog-page__left">
          <div className="blog-posts">
            <div className="post post--new">
              <div className="post__avatar">S</div>
              <div className="post__content post__content--new">
                <textarea
                  value={newPost}
                  placeholder="Viết bài chia sẻ..."
                  onChange={(e) => setNewPost(e.target.value)}
                />
                <button onClick={handleAddPost}>Đăng bài</button>
              </div>
            </div>

            {loading ? (
              <p>Đang tải bài viết...</p>
            ) : posts.length === 0 ? (
              <p>Chưa có bài viết nào.</p>
            ) : (
              posts.map((post) => {
                const postComments = comments[post._id] || [];
                const author =
                  typeof post.author_id === "object"
                    ? post.author_id?.full_name || "Ẩn danh"
                    : "Ẩn danh";
                const avatar =
                  typeof post.author_id === "object"
                    ? post.author_id?.full_name?.[0]?.toUpperCase() || "?"
                    : "?";

                return (
                  <div className="post" key={post._id}>
                    <div className="post__avatar">{avatar}</div>
                    <div className="post__content">
                      <div className="post__header">
                        <span className="post__author">{author}</span>
                        <span className="post__time">
                          {new Date(post.createdAt).toLocaleString("vi-VN")}
                        </span>
                      </div>

                      <div className="post__text">{post.content}</div>

                      <div className="post__actions">
                        <span>{postComments.length} bình luận</span>
                        <span
                          className={`post__encourage ${
                            post.isLikedByMe ? "liked" : ""
                          }`}
                          onClick={() =>
                            handleToggleLike(post._id, post.isLikedByMe)
                          }
                        >
                          {post.isLikedByMe
                            ? "💙 Đã động viên"
                            : "🤍 Động viên"}{" "}
                          ({post.likeCount})
                        </span>
                      </div>

                      <div className="post__comments">
                        {postComments.map((cmt, idx) => (
                          <div key={idx} className="post__comment-item">
                            <div className="post__comment-avatar">
                              {cmt.user_id?.full_name
                                ?.slice(0, 2)
                                .toUpperCase() || "U"}
                            </div>
                            <div className="post__comment-content">
                              <div className="post__comment-author">
                                {cmt.user_id?.full_name || "Ẩn danh"}
                              </div>
                              <div className="post__comment-text">
                                {cmt.content}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="post__comment-form">
                        <div className="post__comment-avatar">S</div>
                        <input
                          type="text"
                          placeholder="Viết bình luận..."
                          value={newComment[post._id] || ""}
                          onChange={(e) =>
                            setNewComment((prev) => ({
                              ...prev,
                              [post._id]: e.target.value,
                            }))
                          }
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleAddComment(post._id)
                          }
                        />
                        <button
                          disabled={!(newComment[post._id] || "").trim()}
                          onClick={() => handleAddComment(post._id)}
                        >
                          Gửi
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
