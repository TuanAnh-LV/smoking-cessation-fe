import React from "react";
import "./CommunityPage.scss";

const CommunityPage = () => {
  return (
    <div className="community-page">
      <div className="community-page__header">
        <h1>Community</h1>
        <button className="community-page__join-btn">
          Join the support group{" "}
        </button>
      </div>
      <div className="community-page__content">
        {/* Left column */}
        <div className="community-page__left">
          <div className="share-story">
            <h2>Share your story</h2>
            <textarea placeholder="Share your progress, feelings or tips with the community..." />
            <div className="achievement-list">
              <div className="achievement-item">
                <span role="img" aria-label="cup">
                  🏆
                </span>{" "}
                1 month of perseverance
              </div>
              <div className="achievement-item">
                <span role="img" aria-label="star">
                  ⭐
                </span>{" "}
                1 week clean{" "}
              </div>
              <div className="achievement-item">
                <span role="img" aria-label="heart">
                  ❤️
                </span>{" "}
                Encourager{" "}
              </div>
              <div className="achievement-item">
                <span role="img" aria-label="medal">
                  🥈
                </span>{" "}
                Take a deep breath{" "}
              </div>
            </div>
            <button className="share-story__btn">Post</button>
          </div>
          <div className="community-posts">
            {/* Post 1 */}
            <div className="post">
              <div className="post__avatar">MA</div>
              <div className="post__content">
                <div className="post__header">
                  <span className="post__author">Minh Anh</span>

                  <span className="post__time">2 giờ trước</span>
                </div>
                <div className="post__text">
                  Hôm nay tròn 2 tuần không hút thuốc! Cảm ơn mọi người đã động
                  viên mình! 💪
                </div>
                <div className="post__actions">
                  <span>12 thích</span>
                  <span>5 bình luận</span>
                  <span className="post__encourage">Động viên</span>
                </div>
              </div>
            </div>
            {/* Post 2 */}
            <div className="post">
              <div className="post__avatar">HN</div>
              <div className="post__content">
                <div className="post__header">
                  <span className="post__author">Hoàng Nam</span>

                  <span className="post__time">5 giờ trước</span>
                </div>
                <div className="post__text">
                  Chia sẻ tip: Mỗi khi thèm thuốc, mình lại uống một ly nước và
                  đi bộ 5 phút. Rất hiệu quả!
                </div>
                <div className="post__actions">
                  <span>18 thích</span>
                  <span>8 bình luận</span>
                  <span className="post__encourage">Động viên</span>
                </div>
              </div>
            </div>
            {/* Post 3 */}
            <div className="post post--highlight">
              <div className="post__avatar">TH</div>
              <div className="post__content">
                <div className="post__header">
                  <span className="post__author">Thu Hằng</span>

                  <span className="post__badge">1 tháng kiên trì</span>
                  <span className="post__time">1 ngày trước</span>
                </div>
                <div className="post__achievement">
                  <span role="img" aria-label="cup">
                    🏆
                  </span>{" "}
                  Đạt được huy hiệu: 1 tháng kiên trì
                </div>
                <div className="post__text">
                  Vừa nhận được huy hiệu 1 tháng! Cảm ơn coach Linh đã hỗ trợ
                  tận tình ❤️
                </div>
                <div className="post__actions">
                  <span>25 thích</span>
                  <span>12 bình luận</span>
                  <span className="post__encourage">Động viên</span>
                  <span>🎉 Chúc mừng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right column */}
        <div className="community-page__right">
          <div className="community-chat">
            <div className="community-chat__header">
              <span>Chat cộng đồng</span>
              <span className="community-chat__online">24 đang online</span>
            </div>
            <div className="community-chat__messages">
              <div className="chat-message">
                <span className="chat-message__avatar">MA</span>
                <div className="chat-message__content">
                  <span className="chat-message__author">Minh Anh</span>
                  <span className="chat-message__time">17:45</span>
                  <div>
                    Chào mọi người! Hôm nay là ngày thứ 15 không thuốc của mình!
                    💪
                  </div>
                </div>
              </div>
              <div className="chat-message">
                <span className="chat-message__avatar">HN</span>
                <div className="chat-message__content">
                  <span className="chat-message__author">Hoàng Nam</span>
                  <span className="chat-message__time">17:46</span>
                  <div>Tuyệt vời! Mình cũng vừa qua được tuần đầu tiên</div>
                </div>
              </div>
              <div className="chat-message">
                <span className="chat-message__avatar">TH</span>
                <div className="chat-message__content">
                  <span className="chat-message__author">Thu Hằng</span>
                  <span className="chat-message__time">17:47</span>
                  <div>Các bạn có tips gì để vượt qua cơn thèm không?</div>
                </div>
              </div>
            </div>
            <div className="community-chat__input">
              <input type="text" placeholder="Nhập tin nhắn của bạn..." />
              <button className="community-chat__send-btn">Gửi</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
