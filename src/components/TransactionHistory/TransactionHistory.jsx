import React from "react";
import "./TransactionHistory.scss";

function TransactionHistory() {
  return (
    <div className="transaction-history-container">
      {/* Header */}
      <div className="header-transaction">
        <h1>Lịch Sử Giao Dịch</h1>
        <p>Theo dõi tất cả các giao dịch thanh toán của bạn</p>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <h3>Tổng chi tiêu</h3>
          <p>498.000₫</p>
        </div>
        <div className="summary-card">
          <h3>Số giao dịch</h3>
          <p>5</p>
        </div>
        <div className="summary-card">
          <h3>Giao dịch thành công</h3>
          <p>3</p>
        </div>
      </div>

      {/* Transaction List */}
      <div className="transaction-list">
        <h2>Danh sách giao dịch</h2>
        <div className="controls">
          <input type="text" placeholder="Tìm kiếm giao dịch..." />
          <select>
            <option value="">Tất cả trạng thái</option>
          </select>
        </div>

        {/* Table */}
        <table>
          <thead>
            <tr>
              <th>Mã GD</th>
              <th>Ngày</th>
              <th>Mô tả</th>
              <th>Phương thức</th>
              <th>Số tiền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Row */}
            <tr>
              <td>TXN001</td>
              <td>15/1/2024</td>
              <td>Gói Premium - 3 tháng</td>
              <td>Visa **** 1234</td>
              <td>+249.000₫</td>
              <td>Hoàn thành</td>
            </tr>
            {/* More rows would go here */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionHistory;
