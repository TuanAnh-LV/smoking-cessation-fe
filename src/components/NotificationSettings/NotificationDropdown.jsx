import React from "react";
import "./NotificationDropdown.scss";
import { NotificationService } from "../../services/notification.service";

const NotificationDropdown = ({
  notifications,
  onClear,
  onClickItem,
  setNotifications,
  setUnreadCount,
}) => {
  console.log("🧾 [Dropdown] Notifications:", notifications);
  const handleMarkAllAsRead = async () => {
    try {
      await NotificationService.markAllAsRead();
      const updated = notifications.map((n) => ({ ...n, is_read: true }));
      setNotifications(updated);
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark all as read", err);
    }
  };

  return (
    <div className="notification-dropdown">
      <div className="dropdown-header">
        <span>Thông báo</span>
        <div className="dropdown-actions">
          <button onClick={handleMarkAllAsRead}>Đọc tất cả</button>
          <button onClick={onClear}>Xóa tất</button>
        </div>
      </div>
      <div className="dropdown-list">
        {Array.isArray(notifications) && notifications.length > 0 ? (
          notifications.map((n, idx) => (
            <div
              key={idx}
              className={`notification-item ${!n.is_read ? "unread" : ""}`}
              onClick={() => onClickItem(n)}
            >
              <strong>{n.title}</strong>
              <p>{n.content}</p>
              <small>{new Date(n.sent_at).toLocaleString()}</small>
            </div>
          ))
        ) : (
          <p className="empty">Không có thông báo nào</p>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
