// BlogPage.jsx (refactored with BlogPost and CommentItem components)
import React, { useState, useEffect } from "react";
import { BlogService } from "../../services/blog.service";
import { CommentService } from "../../services/comment.service";
import { BadgeService } from "../../services/badge.service";
import CommunityChat from "../../components/Community/CommunityChat";
import BlogPost from "../../components/Blog/BlogPost";
import "./BlogPage.scss";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [newPost, setNewPost] = useState("");
  const [newComment, setNewComment] = useState({});
  const [loading, setLoading] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [userBadges, setUserBadges] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await BlogService.getAllBlogs();
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

  const groupComments = (list) => {
    const map = {};
    const roots = [];
    list.forEach((cmt) => {
      cmt.replies = [];
      map[cmt._id] = cmt;
    });
    list.forEach((cmt) => {
      if (cmt.parent_id) {
        const parent = map[cmt.parent_id];
        if (parent) parent.replies.push(cmt);
      } else {
        roots.push(cmt);
      }
    });
    return roots;
  };

  const handleAddPost = async () => {
    const content = newPost.trim();
    if (!content) return;
    try {
      await BlogService.createBlog({ title: "Chia sẻ", content });
      setNewPost("");
      fetchBlogs();
    } catch (err) {
      console.error("Error creating blog:", err);
    }
  };

const handleAddComment = async (postId) => {
  const content = (newComment[postId] || "").trim();
  if (!content) return;
  try {
    await CommentService.createComment(postId, content);
    const res = await CommentService.getCommentsByBlog(postId);
    setComments((prev) => ({ ...prev, [postId]: res.data?.comments || [] }));
    setNewComment((prev) => ({ ...prev, [postId]: "" }));
  } catch (err) {
    console.error("Error posting comment:", err);
  }
};


const handleReplyComment = async (postId, parentId, replyContent) => {
  const content = replyContent.trim();
  if (!content) return;
  try {
    await CommentService.createComment(postId, content, parentId);
    const res = await CommentService.getCommentsByBlog(postId);
    setComments((prev) => ({ ...prev, [postId]: res.data?.comments || [] }));
    setNewComment((prev) => ({ ...prev, [`${postId}_${parentId}`]: "" }));
  } catch (err) {
    console.error("Error replying to comment:", err);
  }
};


  const handleToggleLike = async (postId, isLiked) => {
    try {
      if (isLiked) await BlogService.unlikeBlog(postId);
      else await BlogService.likeBlog(postId);
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? { ...post, isLikedByMe: !isLiked, likeCount: post.likeCount + (isLiked ? -1 : 1) }
            : post
        )
      );
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const handleToggleCommentLike = async (commentId, isLiked, blogId) => {
    try {
      if (isLiked) await CommentService.unlikeComment(commentId);
      else await CommentService.likeComment(commentId);
      const res = await CommentService.getCommentsByBlog(blogId);
      setComments((prev) => ({ ...prev, [blogId]: res.comments || [] }));
    } catch (err) {
      console.error("Error liking comment:", err);
    }
  };

  const openBadgeModal = async () => {
    try {
      const res = await BadgeService.getUserBadges();
      setUserBadges(res?.data?.badges || []);
      setShowBadgeModal(true);
    } catch (err) {
      console.error("Lỗi lấy huy hiệu:", err);
    }
  };

  const handleSelectBadge = (badge) => {
    setNewPost(`Tôi vừa đạt được huy hiệu 🏅 ${badge.name}: ${badge.description}`);
    setShowBadgeModal(false);
    const textarea = document.querySelector("textarea");
    if (textarea) textarea.focus();
  };

  return (
    <div className="blog-page">
      <div className="blog-page__content">
        <div className="blog-page__left">
          <div className="blog-page__header">
            <h1>Blogs</h1>
            <button onClick={openBadgeModal} className="blog-share-badge-btn">
              🏅 Chia sẻ huy hiệu
            </button>
          </div>

          {showBadgeModal && (
            <div className="badge-modal">
              <div className="badge-modal__overlay" onClick={() => setShowBadgeModal(false)}></div>
              <div className="badge-modal__content">
                <h3>Chọn huy hiệu để chia sẻ</h3>
                <div className="badge-list">
                  {userBadges.length === 0 ? (
                    <p>Chưa có huy hiệu nào.</p>
                  ) : (
                    userBadges.map((badge) => (
                      <div
                        key={badge._id}
                        className="badge-item"
                        onClick={() => handleSelectBadge(badge)}
                      >
                        <strong>{badge.name}</strong>
                        <p>{badge.description}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

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

            {posts.map((post) => (
              <BlogPost
                key={post._id}
                post={post}
                comments={comments[post._id]}
                newComment={newComment}
                setNewComment={setNewComment}
                onAddComment={handleAddComment}
                onReplyComment={handleReplyComment}
                onToggleLike={handleToggleLike}
                onToggleCommentLike={handleToggleCommentLike}
                groupComments={groupComments}
              />
            ))}
          </div>
        </div>

        <div className="blog-page__right">
          <CommunityChat />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
