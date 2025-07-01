import React, { useState } from "react";
import "./BlogPage.scss";

const BlogPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Minh Anh",
      avatar: "MA",
      time: "2 giờ trước",
      text: "Hôm nay tròn 2 tuần không hút thuốc! Cảm ơn mọi người đã động viên mình! 💪"
    },
    {
      id: 2,
      author: "Hoàng Nam",
      avatar: "HN",
      time: "5 giờ trước",
      text: "Chia sẻ tip: Mỗi khi thèm thuốc, mình lại uống một ly nước và đi bộ 5 phút. Rất hiệu quả!"
    },
    {
      id: 3,
      author: "Thu Hằng",
      avatar: "TH",
      badge: "1 tháng kiên trì",
      time: "1 ngày trước",
      achievement: "🏆 Đạt được huy hiệu: 1 tháng kiên trì",
      text: "Vừa nhận được huy hiệu 1 tháng! Cảm ơn coach Linh đã hỗ trợ tận tình ❤️"
    }
  ]);

  const [comments, setComments] = useState({
    1: [{ name: "An", text: "Cố lên bạn!" }],
    2: [{ name: "Nam", text: "Tip hay quá!" }],
    3: [{ name: "Hà", text: "Chúc mừng nhé!" }]
  });

  const [newPost, setNewPost] = useState("");
  const [newComment, setNewComment] = useState({});

  const handleAddPost = () => {
    const text = newPost.trim();
    if (!text) return;

    const newId = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const newPostData = {
      id: newId,
      author: "S",
      avatar: "S",
      time: "Vừa xong",
      text
    };

    setPosts((prev) => [...prev, newPostData]);
    setNewPost("");
  };

  const handleAddComment = (postId) => {
    const comment = (newComment[postId] || "").trim();
    if (!comment) return;

    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), { name: "S", text: comment }]
    }));

    setNewComment((prev) => ({
      ...prev,
      [postId]: ""
    }));
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

            {posts.map((post) => (
              <div className={`post ${post.badge ? "post--highlight" : ""}`} key={post.id}>
                <div className="post__avatar">{post.avatar}</div>
                <div className="post__content">
                  <div className="post__header">
                    <span className="post__author">{post.author}</span>
                    {post.badge && <span className="post__badge">{post.badge}</span>}
                    <span className="post__time">{post.time}</span>
                  </div>
                  {post.achievement && (
                    <div className="post__achievement">{post.achievement}</div>
                  )}
                  <div className="post__text">{post.text}</div>
                  <div className="post__actions">
                    <span>{comments[post.id]?.length || 0} bình luận</span>
                    <span className="post__encourage">Động viên</span>
                  </div>
                  <div className="post__comments">
                    {comments[post.id]?.map((cmt, idx) => (
                      <div key={idx} className="post__comment-item">
                        <div className="post__comment-avatar">
                          {cmt.name.split(" ").map(w => w[0]).join("").substring(0,2).toUpperCase()}
                        </div>
                        <div className="post__comment-content">
                          <div className="post__comment-author">{cmt.name}</div>
                          <div className="post__comment-text">{cmt.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="post__comment-form">
                    <div className="post__comment-avatar">S</div>
                    <input
                      type="text"
                      placeholder="Viết bình luận..."
                      value={newComment[post.id] || ""}
                      onChange={(e) =>
                        setNewComment((prev) => ({
                          ...prev,
                          [post.id]: e.target.value
                        }))
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleAddComment(post.id)
                      }
                    />
                    <button
                      disabled={!(newComment[post.id] || "").trim()}
                      onClick={() => handleAddComment(post.id)}
                    >
                      Gửi
                    </button>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
