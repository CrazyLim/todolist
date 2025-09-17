import React from 'react';
import './OrderDetail.css';

const OrderDetail = ({ order, onBack }) => {
  if (!order) return null;

  // 格式化日期时间
  const formatDateTime = (dateTime) => {
    if (!dateTime) return '-';
    return new Date(dateTime).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // 格式化日期
  const formatDate = (dateTime) => {
    if (!dateTime) return '-';
    return new Date(dateTime).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // 处理订单状态标签样式
  const getStatusClass = (status) => {
    switch(status) {
      case '待付款': return 'status-pending';
      case '待发货': return 'status-processing';
      case '已发货': return 'status-shipped';
      case '已完成': return 'status-completed';
      case '已取消': return 'status-cancelled';
      default: return '';
    }
  };

  // 处理支付状态标签样式
  const getPaymentStatusClass = (status) => {
    switch(status) {
      case '待支付': return 'payment-pending';
      case '已支付': return 'payment-completed';
      case '已退款': return 'payment-refunded';
      default: return '';
    }
  };

  return (
    <div className="order-detail-container">
      {/* 返回按钮 */}
      <div className="detail-header">
        <button className="back-btn" onClick={onBack}>
          ← 返回订单列表
        </button>
        <h2>订单详情</h2>
      </div>

      {/* 订单概览卡片 */}
      <div className="order-overview-card">
        <div className="order-overview-header">
          <span className="order-id">订单编号: {order.id}</span>
          <span className={`status-badge ${getStatusClass(order.status)}`}>
            {order.status}
          </span>
        </div>
        <div className="order-overview-info">
          <div className="order-date">下单时间: {formatDateTime(order.orderDate)}</div>
          <div className="order-total">订单金额: ¥{order.totalAmount.toFixed(2)}</div>
        </div>
      </div>

      {/* 订单信息区域 */}
      <div className="order-info-section">
        <h3 className="section-title">📋 订单信息</h3>
        <div className="info-grid">
          <div className="info-item">
            <label>客户名称:</label>
            <span>{order.customerName}</span>
          </div>
          <div className="info-item">
            <label>联系电话:</label>
            <span>{order.customerPhone}</span>
          </div>
          <div className="info-item">
            <label>配送地址:</label>
            <span>{order.deliveryAddress}</span>
          </div>
          <div className="info-item">
            <label>支付方式:</label>
            <span>{order.paymentMethod}</span>
          </div>
          <div className="info-item">
            <label>支付状态:</label>
            <span className={`payment-status-badge ${getPaymentStatusClass(order.paymentStatus)}`}>
              {order.paymentStatus}
            </span>
          </div>
        </div>
      </div>

      {/* 订单产品信息 */}
      <div className="order-products-section">
        <h3 className="section-title">🛒 订单产品</h3>
        <div className="products-list">
          {order.products.map((product) => (
            <div key={product.id} className="product-item">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-price">¥{product.price.toFixed(2)}</div>
              </div>
              <div className="product-quantity">x {product.quantity}</div>
              <div className="product-subtotal">
                ¥{(product.price * product.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <div className="order-summary">
          <div className="summary-item">
            <span>商品总价:</span>
            <span>¥{order.products.reduce((sum, p) => sum + p.price * p.quantity, 0).toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>运费:</span>
            <span>¥0.00</span>
          </div>
          <div className="summary-item total">
            <span>实付金额:</span>
            <span>¥{order.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* 包裹信息 */}
      <div className="order-packages-section">
        <h3 className="section-title">📦 包裹信息</h3>
        {order.packages && order.packages.length > 0 ? (
          <div className="packages-list">
            {order.packages.map((pkg) => (
              <div key={pkg.id} className="package-item">
                <div className="package-header">
                  <span className="package-id">包裹编号: {pkg.id}</span>
                  <span className={`package-status ${pkg.status === '已签收' ? 'delivered' : 'shipping'}`}>
                    {pkg.status}
                  </span>
                </div>
                <div className="package-info">
                  <div className="info-item">
                    <label>快递公司:</label>
                    <span>{pkg.courier}</span>
                  </div>
                  <div className="info-item">
                    <label>快递单号:</label>
                    <span>{pkg.trackingNumber}</span>
                  </div>
                  <div className="info-item">
                    <label>预计送达:</label>
                    <span>{formatDate(pkg.estimatedDeliveryDate)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-data">暂无包裹信息</div>
        )}
      </div>

      {/* 支付信息 */}
      <div className="order-payment-section">
        <h3 className="section-title">💳 支付信息</h3>
        {order.paymentInfo && Object.keys(order.paymentInfo).length > 0 ? (
          <div className="payment-info">
            <div className="info-item">
              <label>交易编号:</label>
              <span>{order.paymentInfo.transactionId || '-'}</span>
            </div>
            <div className="info-item">
              <label>支付时间:</label>
              <span>{order.paymentInfo.paymentTime ? formatDateTime(order.paymentInfo.paymentTime) : '-'}</span>
            </div>
            <div className="info-item">
              <label>支付金额:</label>
              <span>¥{order.paymentInfo.amount ? order.paymentInfo.amount.toFixed(2) : '0.00'}</span>
            </div>
            {order.paymentInfo.refundTime && (
              <div className="info-item">
                <label>退款时间:</label>
                <span>{formatDateTime(order.paymentInfo.refundTime)}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="no-data">暂无支付信息</div>
        )}
      </div>

      {/* 发货信息 */}
      <div className="order-shipping-section">
        <h3 className="section-title">🚚 发货信息</h3>
        <div className="shipping-info">
          <div className="info-item">
            <label>发货时间:</label>
            <span>{formatDateTime(order.shippingInfo.shippedDate)}</span>
          </div>
          <div className="info-item">
            <label>预计送达:</label>
            <span>{formatDate(order.shippingInfo.expectedDelivery)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;