import React, { useState, useEffect } from 'react';
import './ClockWeatherWidget.css';

function ClockWeatherWidget() {
  // 时间状态
  const [currentTime, setCurrentTime] = useState(new Date());
  // 天气状态
  const [weather, setWeather] = useState({
    temperature: '加载中...',
    description: '加载中...',
    icon: '☀️'
  });

  // 更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 模拟获取天气数据
  useEffect(() => {
    // 实际项目中这里应该是API请求
    const fetchWeather = () => {
      // 模拟天气数据，实际应用中应该从天气API获取
      const weatherData = {
        temperature: '24°C',
        description: '晴朗',
        icon: '☀️'
      };
      setWeather(weatherData);
    };

    fetchWeather();
    // 每10分钟更新一次天气
    const weatherTimer = setInterval(fetchWeather, 600000);
    return () => clearInterval(weatherTimer);
  }, []);

  // 格式化时间
  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  // 格式化日期
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const weekday = weekdays[date.getDay()];
    return `${year}年${month}月${day}日 ${weekday}`;
  };

  return (
    <div className="clock-weather-widget">
      <div className="clock">
        <div className="time">{formatTime(currentTime)}</div>
        <div className="date">{formatDate(currentTime)}</div>
      </div>
      <div className="weather">
        <div className="weather-icon">{weather.icon}</div>
        <div className="weather-info">
          <div className="temperature">{weather.temperature}</div>
          <div className="description">{weather.description}</div>
        </div>
      </div>
    </div>
  );
}

export default ClockWeatherWidget;