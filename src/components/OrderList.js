import React, { useState, useEffect } from 'react';
import './OrderList.css';
import OrderDetail from './OrderDetail';

// 模拟订单数据
const mockOrders = [
  {
    id: 'ORD-20250815-001',
    customerName: '张三',
    customerPhone: '138****1234',
    orderDate: '2025-08-15T09:30:00',
    totalAmount: 2399.00,
    status: '已发货',
    paymentMethod: '支付宝',
    paymentStatus: '已支付',
    deliveryAddress: '北京市朝阳区建国路88号',
    products: [
      {
        id: 'P001',
        name: 'iPhone 15 Pro',
        quantity: 1,
        price: 7999.00,
        image: 'https://via.placeholder.com/100'
      },
      {
        id: 'P002',
        name: 'Apple AirPods Pro',
        quantity: 1,
        price: 1899.00,
        image: 'https://via.placeholder.com/100'
      }
    ],
    packages: [
      {
        id: 'PKG-001',
        courier: '顺丰速运',
        trackingNumber: 'SF1234567890',
        status: '运输中',
        estimatedDeliveryDate: '2025-08-17'
      }
    ],
    paymentInfo: {
      transactionId: 'TRX-987654321',
      paymentTime: '2025-08-15T09:35:00',
      amount: 9898.00
    },
    shippingInfo: {
      shippedDate: '2025-08-15T14:20:00',
      expectedDelivery: '2025-08-17'
    }
  },
  {
    id: 'ORD-20250814-002',
    customerName: '李四',
    customerPhone: '139****5678',
    orderDate: '2025-08-14T15:45:00',
    totalAmount: 1299.00,
    status: '待发货',
    paymentMethod: '微信支付',
    paymentStatus: '已支付',
    deliveryAddress: '上海市浦东新区张江高科技园区',
    products: [
      {
        id: 'P003',
        name: 'MacBook Air 13英寸',
        quantity: 1,
        price: 7999.00,
        image: 'https://via.placeholder.com/100'
      }
    ],
    packages: [],
    paymentInfo: {
      transactionId: 'TRX-876543210',
      paymentTime: '2025-08-14T15:50:00',
      amount: 7999.00
    },
    shippingInfo: {
      shippedDate: null,
      expectedDelivery: null
    }
  },
  {
    id: 'ORD-20250813-003',
    customerName: '王五',
    customerPhone: '137****9012',
    orderDate: '2025-08-13T10:20:00',
    totalAmount: 3599.00,
    status: '已完成',
    paymentMethod: '银行卡支付',
    paymentStatus: '已支付',
    deliveryAddress: '广州市天河区天河路385号',
    products: [
      {
        id: 'P004',
        name: 'iPad Pro 11英寸',
        quantity: 1,
        price: 6299.00,
        image: 'https://via.placeholder.com/100'
      },
      {
        id: 'P005',
        name: 'Apple Pencil 2代',
        quantity: 1,
        price: 999.00,
        image: 'https://via.placeholder.com/100'
      }
    ],
    packages: [
      {
        id: 'PKG-002',
        courier: '京东物流',
        trackingNumber: 'JD9876543210',
        status: '已签收',
        estimatedDeliveryDate: '2025-08-15'
      }
    ],
    paymentInfo: {
      transactionId: 'TRX-765432109',
      paymentTime: '2025-08-13T10:25:00',
      amount: 7298.00
    },
    shippingInfo: {
      shippedDate: '2025-08-13T16:30:00',
      expectedDelivery: '2025-08-15'
    }
  },
  {
    id: 'ORD-20250812-004',
    customerName: '赵六',
    customerPhone: '136****3456',
    orderDate: '2025-08-12T18:10:00',
    totalAmount: 1899.00,
    status: '已取消',
    paymentMethod: '支付宝',
    paymentStatus: '已退款',
    deliveryAddress: '深圳市南山区科技园',
    products: [
      {
        id: 'P006',
        name: 'Apple Watch Series 9',
        quantity: 1,
        price: 3199.00,
        image: 'https://via.placeholder.com/100'
      }
    ],
    packages: [],
    paymentInfo: {
      transactionId: 'TRX-654321098',
      paymentTime: '2025-08-12T18:15:00',
      amount: 3199.00,
      refundTime: '2025-08-13T09:45:00'
    },
    shippingInfo: {
      shippedDate: null,
      expectedDelivery: null
    }
  },
  {
    id: 'ORD-20250811-005',
    customerName: '孙七',
    customerPhone: '135****7890',
    orderDate: '2025-08-11T11:30:00',
    totalAmount: 4799.00,
    status: '待付款',
    paymentMethod: '微信支付',
    paymentStatus: '待支付',
    deliveryAddress: '杭州市西湖区文三路',
    products: [
      {
        id: 'P007',
        name: 'HomePod 2代',
        quantity: 2,
        price: 2299.00,
        image: 'https://via.placeholder.com/100'
      }
    ],
    packages: [],
    paymentInfo: {},
    shippingInfo: {
      shippedDate: null,
      expectedDelivery: null
    }
  }
];

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDetailView, setIsDetailView] = useState(false);
  const ordersPerPage = 10;

  // 初始化数据
  useEffect(() => {
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  // 过滤订单
  useEffect(() => {
    let result = [...orders];
    
    // 按状态过滤
    if (statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter);
    }
    
    // 按搜索词过滤
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(order => 
        order.id.toLowerCase().includes(term) ||
        order.customerName.toLowerCase().includes(term) ||
        order.customerPhone.includes(term)
      );
    }
    
    setFilteredOrders(result);
    setCurrentPage(1); // 重置到第一页
  }, [orders, statusFilter, searchTerm]);

  // 分页逻辑
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

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

  // 查看订单详情
  const viewOrderDetail = (order) => {
    setSelectedOrder(order);
    setIsDetailView(true);
  };

  // 返回订单列表
  const backToList = () => {
    setIsDetailView(false);
    setSelectedOrder(null);
  };

  // 渲染订单列表
  const renderOrderList = () => (
    <div className="order-list-container">
      <div className="order-list-header">
        <h2>📋 订单列表</h2>
        
        {/* 搜索和过滤控件 */}
        <div className="order-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="搜索订单号、客户名称或手机号..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-box">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-filter"
            >
              <option value="all">全部状态</option>
              <option value="待付款">待付款</option>
              <option value="待发货">待发货</option>
              <option value="已发货">已发货</option>
              <option value="已完成">已完成</option>
              <option value="已取消">已取消</option>
            </select>
          </div>
        </div>
      </div>

      {/* 订单表格 */}
      <div className="order-table-wrapper">
        <table className="order-table">
          <thead>
            <tr>
              <th>订单编号</th>
              <th>客户信息</th>
              <th>下单时间</th>
              <th>订单金额</th>
              <th>支付方式</th>
              <th>订单状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    <div className="customer-info">
                      <div className="customer-name">{order.customerName}</div>
                      <div className="customer-phone">{order.customerPhone}</div>
                    </div>
                  </td>
                  <td>{new Date(order.orderDate).toLocaleString()}</td>
                  <td className="order-amount">¥{order.totalAmount.toFixed(2)}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="view-detail-btn"
                      onClick={() => viewOrderDetail(order)}
                    >
                      查看详情
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">暂无符合条件的订单</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 分页控件 */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="page-btn"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            上一页
          </button>
          
          <div className="page-numbers">
            {currentPage > 3 && (
              <> 
                <button className="page-btn" onClick={() => setCurrentPage(1)}>1</button>
                {currentPage > 4 && <span className="page-ellipsis">...</span>}
              </> 
            )}
            
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              if (pageNum >= currentPage - 2 && pageNum <= currentPage + 2) {
                return (
                  <button 
                    key={pageNum}
                    className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              }
              return null;
            })}
            
            {currentPage < totalPages - 2 && (
              <> 
                {currentPage < totalPages - 3 && <span className="page-ellipsis">...</span>}
                <button className="page-btn" onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
              </> 
            )}
          </div>
          
          <button 
            className="page-btn"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            下一页
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="orders-container">
      {isDetailView ? (
        <OrderDetail order={selectedOrder} onBack={backToList} />
      ) : (
        renderOrderList()
      )}
    </div>
  );
};

export default OrderList;