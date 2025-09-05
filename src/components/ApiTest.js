import React, { useState, useEffect } from 'react';

function ApiTest() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 测试API代理请求
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 这里使用/api前缀，会被代理到http://localhost:5000
      const response = await fetch('/api/test');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
      console.error('API请求错误:', err);
    } finally {
      setLoading(false);
    }
  };

  // 测试图片代理请求
  const testImageProxy = () => {
    // 这里使用/images前缀，会被代理到图片服务器
    window.open('/images/sample.jpg', '_blank');
  };

  // 跨域请求最佳实践示例
  const makeCorsRequest = async (url, options = {}) => {
    // 默认选项
    const defaultOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 可以添加其他需要的头信息
      },
      credentials: 'include', // 包含cookies等凭证
      ...options
    };

    try {
      // 使用fetch API发送请求
      const response = await fetch(url, defaultOptions);
      
      // 处理非200响应
      if (!response.ok) {
        throw new Error(`服务器响应错误: ${response.status}`);
      }
      
      // 检查响应类型
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error('请求失败:', error);
      throw error;
    }
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2>跨域请求测试</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>API代理测试</h3>
        <p>点击下方按钮测试/api路径的代理请求：</p>
        <button 
          onClick={fetchData} 
          disabled={loading} 
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '请求中...' : '发送API请求'}
        </button>
        
        {error && (
          <div style={{ color: 'red', marginTop: '10px' }}>
            错误: {error}
          </div>
        )}
        
        {data && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#e8f5e9', borderRadius: '4px' }}>
            <p>响应数据:</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>图片代理测试</h3>
        <p>点击下方按钮测试/images路径的代理请求：</p>
        <button 
          onClick={testImageProxy} 
          style={{
            padding: '10px 20px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          打开图片链接
        </button>
      </div>

      <div>
        <h3>跨域解决方案说明</h3>
        <ul style={{ textAlign: 'left' }}>
          <li>配置了setupProxy.js文件来处理代理请求</li>
          <li>所有以/api开头的请求会被代理到http://localhost:5000</li>
          <li>所有以/images开头的请求会被代理到图片服务器</li>
          <li>添加了bypass函数避免对热重载和静态资源请求进行代理</li>
          <li>包含了跨域请求的最佳实践示例代码</li>
        </ul>
      </div>
    </div>
  );
}

export default ApiTest;