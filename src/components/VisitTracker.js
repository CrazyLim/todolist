import React, { useState, useEffect } from 'react';
import './VisitTracker.css';

function VisitTracker() {
  const [visits, setVisits] = useState([]);
  const [todayVisits, setTodayVisits] = useState(0);
  const [totalVisits, setTotalVisits] = useState(0);
  const [mostVisitedPage, setMostVisitedPage] = useState({ page: '暂无数据', count: 0 });
  const [dateRange, setDateRange] = useState('all'); // 'all', 'today', 'week', 'month'
  const [filteredVisits, setFilteredVisits] = useState([]);

  // 初始化访问数据
  useEffect(() => {
    loadVisitData();
    updateVisitStats();
  }, [dateRange]);
  
  // 为了演示目的，添加一些初始模拟数据
  useEffect(() => {
    const storedVisits = localStorage.getItem('visitRecords');
    if (!storedVisits || JSON.parse(storedVisits).length === 0) {
      // 创建一些模拟访问数据
      const mockVisits = [
        {
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          page: 'travel',
          userInfo: '游客',
          deviceInfo: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        {
          timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
          page: 'tasks',
          userInfo: '游客',
          deviceInfo: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        {
          timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
          page: 'games',
          userInfo: '游客',
          deviceInfo: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        {
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          page: 'realestate',
          userInfo: '游客',
          deviceInfo: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        {
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          page: 'travel',
          userInfo: '游客',
          deviceInfo: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        {
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          page: 'jokes',
          userInfo: '游客',
          deviceInfo: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      ];
      
      // 保存模拟数据
      localStorage.setItem('visitRecords', JSON.stringify(mockVisits));
      
      // 重新加载数据
      loadVisitData();
      updateVisitStats();
    }
  }, []);

  // 从localStorage加载访问数据
  const loadVisitData = () => {
    try {
      const storedVisits = localStorage.getItem('visitRecords');
      if (storedVisits) {
        const parsedVisits = JSON.parse(storedVisits);
        setVisits(parsedVisits);
        applyDateFilter(parsedVisits);
      }
    } catch (error) {
      console.error('加载访问记录失败:', error);
      setVisits([]);
      setFilteredVisits([]);
    }
  };

  // 应用日期过滤
  const applyDateFilter = (allVisits) => {
    const now = new Date();
    let filtered = [...allVisits];

    switch (dateRange) {
      case 'today':
        filtered = allVisits.filter(visit => {
          const visitDate = new Date(visit.timestamp);
          return visitDate.toDateString() === now.toDateString();
        });
        break;
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filtered = allVisits.filter(visit => new Date(visit.timestamp) >= weekAgo);
        break;
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        filtered = allVisits.filter(visit => new Date(visit.timestamp) >= monthAgo);
        break;
      default:
        // 显示所有记录
        break;
    }

    setFilteredVisits(filtered);
  };

  // 更新访问统计数据
  const updateVisitStats = () => {
    const now = new Date();
    const today = now.toDateString();
    
    // 计算总访问次数
    setTotalVisits(visits.length);
    
    // 计算今日访问次数
    const todayCount = visits.filter(visit => {
      const visitDate = new Date(visit.timestamp);
      return visitDate.toDateString() === today;
    }).length;
    setTodayVisits(todayCount);
    
    // 找出访问次数最多的页面
    const pageCounts = {};
    visits.forEach(visit => {
      pageCounts[visit.page] = (pageCounts[visit.page] || 0) + 1;
    });
    
    let maxPage = '暂无数据';
    let maxCount = 0;
    for (const page in pageCounts) {
      if (pageCounts[page] > maxCount) {
        maxCount = pageCounts[page];
        maxPage = page;
      }
    }
    setMostVisitedPage({ page: maxPage, count: maxCount });
  };

  // 格式化时间戳
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // 清空所有访问记录
  const clearAllVisits = () => {
    if (window.confirm('确定要清空所有访问记录吗？此操作不可恢复。')) {
      localStorage.removeItem('visitRecords');
      setVisits([]);
      setFilteredVisits([]);
      setTotalVisits(0);
      setTodayVisits(0);
      setMostVisitedPage({ page: '暂无数据', count: 0 });
    }
  };

  // 获取页面的中文名称
  const getPageDisplayName = (pageKey) => {
    const pageNames = {
      'travel': '旅游计划',
      'games': '游戏中心',
      'jokes': '笑话管理',
      'tasks': '任务列表',
      'realestate': '深圳房产信息',
      'analytics': '数据分析',
      'unknown': '未知页面'
    };
    return pageNames[pageKey] || pageKey;
  };

  return (
    <div className="visit-tracker-container">
      <h2>📊 访问记录统计</h2>
      
      {/* 统计概览 */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-number">{totalVisits}</div>
          <div className="stat-label">总访问次数</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{todayVisits}</div>
          <div className="stat-label">今日访问次数</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{mostVisitedPage.count}</div>
          <div className="stat-label">
            最常访问页面<br/>
            <span className="most-visited-page">{getPageDisplayName(mostVisitedPage.page)}</span>
          </div>
        </div>
      </div>

      {/* 日期范围筛选 */}
      <div className="filter-section">
        <label>选择时间范围：</label>
        <select 
          value={dateRange} 
          onChange={(e) => setDateRange(e.target.value)}
          className="date-filter"
        >
          <option value="all">全部记录</option>
          <option value="today">今日</option>
          <option value="week">近7天</option>
          <option value="month">近30天</option>
        </select>
        <button className="clear-btn" onClick={clearAllVisits}>
          清空记录
        </button>
      </div>

      {/* 访问记录列表 */}
      <div className="visits-list-container">
        <h3>访问记录列表 ({filteredVisits.length} 条)</h3>
        <div className="visits-list">
          {filteredVisits.length === 0 ? (
            <div className="empty-state">
              暂无访问记录
            </div>
          ) : (
            filteredVisits
              .slice()
              .reverse() // 倒序排列，最新的在前面
              .map((visit, index) => (
                <div key={index} className="visit-item">
                  <div className="visit-time">{formatTimestamp(visit.timestamp)}</div>
                  <div className="visit-info">
                    <div className="visit-page">
                      页面：{getPageDisplayName(visit.page)}
                    </div>
                    {visit.userInfo && (
                      <div className="visit-user">
                        用户：{visit.userInfo}
                      </div>
                    )}
                    {visit.deviceInfo && (
                      <div className="visit-device">
                        设备：{visit.deviceInfo}
                      </div>
                    )}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>

      {/* 页面访问统计图表 */}
      <div className="page-stats-section">
        <h3>页面访问统计</h3>
        <div className="page-stats">
          {(() => {
            // 计算各页面的访问次数
            const pageCounts = {};
            visits.forEach(visit => {
              pageCounts[visit.page] = (pageCounts[visit.page] || 0) + 1;
            });

            // 转换为数组并排序
            const sortedPages = Object.entries(pageCounts)
              .map(([page, count]) => ({ page, count }))
              .sort((a, b) => b.count - a.count);

            return sortedPages.map((item, index) => {
              const percentage = (item.count / visits.length) * 100;
              return (
                <div key={index} className="page-stat-item">
                  <div className="page-stat-label">
                    {getPageDisplayName(item.page)} ({item.count}次 - {percentage.toFixed(1)}%)
                  </div>
                  <div className="page-stat-bar">
                    <div 
                      className="page-stat-fill" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
}

export default VisitTracker;