import React, { useState } from 'react';
import './TravelPlan.css';

function TravelPlan() {
  // 状态管理：当前显示的天数
  const [activeDay, setActiveDay] = useState(1);

  // 旅游计划数据 - 优化版云南国庆10天亲子游
  const travelData = [
    {
      day: 1,
      title: '抵达昆明・春城初体验',
      departure: '深圳',
      destination: '昆明',
      distance: '飞抵昆明长水机场',
      duration: '根据航班而定',
      accommodation: '滇池度假区家庭房（如昆明滇池温泉花园国际大酒店）',
      accommodationFeatures: '提供儿童拖鞋、浴盆等用品',
      transportation: '提前预约含儿童安全座椅的专车（或酒店接机服务）',
      schedule: [
        { time: '12:00前', activity: '抵达，办理入住后酒店用儿童餐（蒸蛋+蔬菜粥），安排孩子午休1小时' },
        { time: '15:30-17:30', activity: '滇池海埂大坝休闲漫步，提前查询母婴室位置，备好儿童零食' },
        { time: '傍晚', activity: '欣赏滇池日落，不安排密集行程' }
      ],
      dining: '晚餐选择酒店附近"建新园"，过桥米线（少辣）+ 蒸水蛋',
      mapUrl: 'https://api.map.baidu.com/marker?location=25.0400,102.6833&title=昆明滇池度假区&content=昆明滇池度假区&output=html&src=webapp.baidu.openAPIdemo'
    },
    {
      day: 2,
      title: '昆明・自然奇观与动物互动',
      departure: '昆明',
      destination: '昆明',
      distance: '市内及周边',
      duration: '全天',
      accommodation: '昆明',
      transportation: '8:00前出发前往石林风景区（避开旅行团高峰）',
      schedule: [
        { time: '9:00-11:30', activity: '石林核心区游览（2小时），用趣味方式讲解喀斯特地貌' },
        { time: '12:00-13:30', activity: '景区附近"彝家风味馆"用午餐（要求软烂口味）' },
        { time: '15:00-17:00', activity: '昆明动物园萌宠互动，重点体验小熊猫喂食、儿童小火车' },
        { time: '17:30', activity: '返回酒店休息' }
      ],
      dining: '晚餐选择菌子火锅（清汤锅底），配竹荪、鸡油菌等易咀嚼菌类',
      mapUrl: 'https://api.map.baidu.com/marker?location=24.7989,103.3977&title=昆明石林风景区&content=昆明石林风景区&output=html&src=webapp.baidu.openAPIdemo'
    },
    {
      day: 3,
      title: '昆明→大理・洱海休闲时光',
      departure: '昆明',
      destination: '大理',
      distance: '乘动车约328公里',
      duration: '约2.5小时',
      accommodation: '大理双廊海景亲子房（如大理双廊海月湾客栈）',
      accommodationFeatures: '提供儿童浴袍、卡通拖鞋，有私人露台可看洱海日出',
      transportation: '乘坐D3808次动车（08:20昆明→10:50大理），提前准备儿童零食、玩具',
      schedule: [
        { time: '11:30-13:00', activity: '抵达大理站，专车接站前往双廊（约1小时），途中购买当地水果' },
        { time: '14:00-16:00', activity: '酒店办理入住，在露台休息调整，提供儿童下午茶（酸奶+水果）' },
        { time: '16:30-18:30', activity: '双廊古镇轻松漫步，选择游客较少的小巷，避免拥挤' }
      ],
      dining: '晚餐选择酒店餐厅，点白族风味菜（酸辣鱼、水性杨花汤），为儿童单独准备蒸蛋',
      mapUrl: 'https://api.map.baidu.com/marker?location=25.7617,100.1296&title=大理双廊古镇&content=大理双廊古镇&output=html&src=webapp.baidu.openAPIdemo'
    },
    {
      day: 4,
      title: '大理・苍山洱海精华',
      departure: '大理双廊',
      destination: '大理双廊',
      distance: '周边景点',
      duration: '全天',
      accommodation: '大理双廊海景亲子房',
      transportation: '酒店包车一日游，要求配备儿童安全座椅',
      schedule: [
        { time: '08:30-10:30', activity: '洱海日出观景台，带好防风外套和儿童保暖衣物' },
        { time: '11:00-13:00', activity: '花语牧场（小型花海），适合儿童拍照，可购买小纪念品' },
        { time: '13:30-15:00', activity: '午餐：喜洲粑粑农家乐，选择宽敞、卫生的餐厅' },
        { time: '16:00-18:00', activity: '洱海生态廊道骑行（可选双人车带儿童座），准备儿童防晒用品' }
      ],
      dining: '晚餐：返回双廊品尝洱海鱼鲜，为儿童准备清淡蒸菜',
      mapUrl: 'https://api.map.baidu.com/marker?location=25.7617,100.1296&title=大理双廊&content=大理双廊&output=html&src=webapp.baidu.openAPIdemo'
    },
    {
      day: 5,
      title: '大理→丽江・古城慢时光',
      departure: '大理',
      destination: '丽江',
      distance: '乘动车约159公里',
      duration: '约1.5小时',
      accommodation: '丽江古城内亲子客栈（如丽江古城阅古楼观景客栈）',
      accommodationFeatures: '古城中心位置，有独立庭院，提供儿童拖鞋、玩具',
      transportation: '乘坐D8792次动车（10:00大理→11:35丽江），为儿童准备零食',
      schedule: [
        { time: '12:00-13:30', activity: '抵达丽江站，专车接站前往古城（约30分钟）' },
        { time: '14:00-15:30', activity: '办理入住，休息调整，提供儿童茶点' },
        { time: '16:00-18:00', activity: '丽江古城轻松漫步，避开人流高峰路段，讲解纳西族文化' }
      ],
      dining: '晚餐选择客栈推荐的纳西风味餐厅，点丽江粑粑、汽锅鸡，为儿童准备蒸蛋',
      mapUrl: 'https://api.map.baidu.com/marker?location=26.8633,100.2500&title=丽江古城&content=丽江古城&output=html&src=webapp.baidu.openAPIdemo'
    },
    {
      day: 6,
      title: '丽江・玉龙雪山脚下',
      departure: '丽江古城',
      destination: '丽江古城',
      distance: '约30公里',
      duration: '全天',
      accommodation: '丽江古城内亲子客栈',
      transportation: '包车前往，准备氧气罐（儿童用小型）、保暖衣物',
      schedule: [
        { time: '08:30-10:00', activity: '前往玉龙雪山脚下的蓝月谷景区，避免高海拔区域' },
        { time: '10:00-12:30', activity: '蓝月谷游览，选择较平缓的步道，注意儿童安全' },
        { time: '13:00-14:30', activity: '午餐：景区附近的农家菜，选择清淡口味' },
        { time: '15:30-17:30', activity: '返回丽江古城，在客栈休息，提供儿童下午茶' }
      ],
      dining: '晚餐：古城内的牦牛肉火锅（清汤锅底），为儿童准备单独的蒸菜',
      mapUrl: 'https://api.map.baidu.com/marker?location=27.0060,100.1727&title=玉龙雪山蓝月谷&content=玉龙雪山蓝月谷&output=html&src=webapp.baidu.openAPIdemo'
    },
    {
      day: 7,
      title: '丽江・束河古镇体验',
      departure: '丽江古城',
      destination: '丽江古城',
      distance: '约7公里',
      duration: '全天',
      accommodation: '丽江古城内亲子客栈',
      transportation: '乘坐小型面包车前往，车程约20分钟',
      schedule: [
        { time: '09:30-10:00', activity: '出发前往束河古镇，为儿童准备防晒用品和帽子' },
        { time: '10:00-12:00', activity: '束河古镇游览，人少安静，适合儿童游玩' },
        { time: '12:30-14:00', activity: '午餐：束河古镇内的特色餐厅，品尝云南小吃' },
        { time: '15:00-17:00', activity: '体验纳西族手工扎染（儿童友好体验项目）' }
      ],
      dining: '晚餐：返回古城品尝过桥米线，为儿童准备清淡口味',
      mapUrl: 'https://api.map.baidu.com/marker?location=26.8917,100.2277&title=束河古镇&content=束河古镇&output=html&src=webapp.baidu.openAPIdemo'
    },
    {
      day: 8,
      title: '丽江・休闲调整日',
      departure: '丽江古城',
      destination: '丽江古城',
      distance: '古城内活动',
      duration: '全天',
      accommodation: '丽江古城内亲子客栈',
      transportation: '步行游览古城，不安排远距离行程',
      schedule: [
        { time: '09:00-10:00', activity: '客栈内享用早餐，让儿童自然醒' },
        { time: '10:30-12:00', activity: '木府景区游览（选择精华部分），注意儿童安全' },
        { time: '12:30-14:00', activity: '午餐：木府附近的云南风味餐厅' },
        { time: '15:00-17:00', activity: '客栈庭院内休息，儿童可在院子里玩耍' }
      ],
      dining: '晚餐：选择古城内的傣族风味餐厅，品尝菠萝饭、烤鸡',
      mapUrl: 'https://api.map.baidu.com/marker?location=26.8633,100.2500&title=丽江古城木府&content=丽江古城木府&output=html&src=webapp.baidu.openAPIdemo'
    },
    {
      day: 9,
      title: '丽江→昆明・返程准备',
      departure: '丽江',
      destination: '昆明',
      distance: '乘动车约515公里',
      duration: '约3.5小时',
      accommodation: '昆明长水机场附近酒店（如昆明长水机场希尔顿欢朋酒店）',
      accommodationFeatures: '提供免费机场接送，有儿童房布置',
      transportation: '乘坐D8798次动车（11:30丽江→15:05昆明），为儿童准备零食和玩具',
      schedule: [
        { time: '09:00-10:00', activity: '丽江古城内自由活动，购买纪念品' },
        { time: '10:30-11:00', activity: '退房，前往丽江站' },
        { time: '15:30-16:30', activity: '抵达昆明站，专车接站前往机场酒店' },
        { time: '17:00-19:00', activity: '酒店附近简单晚餐，整理行李，准备次日返程' }
      ],
      dining: '晚餐：酒店餐厅简餐，确保儿童饮食卫生',
      mapUrl: 'https://api.map.baidu.com/marker?location=25.1055,102.7892&title=昆明长水机场希尔顿欢朋酒店&content=昆明长水机场希尔顿欢朋酒店&output=html&src=webapp.baidu.openAPIdemo'
    },
    {
      day: 10,
      title: '昆明→深圳・圆满返程',
      departure: '昆明',
      destination: '深圳',
      distance: '飞返深圳宝安机场',
      duration: '根据航班而定',
      accommodation: '温馨的家',
      transportation: '酒店提供的免费送机服务，提前3小时到达机场',
      schedule: [
        { time: '07:00-08:00', activity: '酒店早餐，整理随身物品，特别是儿童用品' },
        { time: '08:30-09:30', activity: '酒店专车送往机场，提前到达值机柜台' },
        { time: '10:00-11:30', activity: '机场候机，为儿童准备零食和玩具' },
        { time: '11:30后', activity: '登机返程，结束愉快的云南亲子之旅' }
      ],
      dining: '航班餐食，提前告知航空公司儿童餐需求',
      mapUrl: 'https://api.map.baidu.com/marker?location=25.1055,102.7892&title=昆明长水国际机场&content=昆明长水国际机场&output=html&src=webapp.baidu.openAPIdemo'
    }
  ];

  // 优化要点数据
  const optimizationPoints = [
    {
      title: '行程节奏优化',
      description: '每日仅安排1-2个核心景点，避免长途奔波，每天预留2-3小时自由活动/休息时间'
    },
    {
      title: '住宿安全保障',
      description: '精选交通便利、设施完善的酒店，提前确认儿童友好设施（如儿童洗漱用品、防护栏等）'
    },
    {
      title: '餐饮精细安排',
      description: '每餐均标注儿童友好菜品，避免辛辣刺激，注重营养均衡'
    },
    {
      title: '交通舒适升级',
      description: '所有车辆均要求配备儿童安全座椅，长途出行提前准备零食玩具'
    }
  ];

  // 特别提示数据
  const specialTips = [
    '云南早晚温差大，需为儿童准备长袖外套、防晒帽、太阳镜等物品',
    '高原地区紫外线强烈，请注意为儿童做好防晒措施',
    '提前准备常用儿童药品（退烧药、肠胃药、创可贴等）',
    '尊重当地少数民族风俗习惯，避免带儿童进入不适合的场所'
  ];

  // 获取当前天的计划
  const currentPlan = travelData.find(plan => plan.day === activeDay);

  return (
    <div className="travel-plan-container">
      <div className="travel-plan-decoration"></div>
      <h2 className="travel-plan-title">深圳-云南国庆10天亲子游计划（2大1小・3岁儿童适配） 🌄</h2>
      
      {/* 核心主题 */}
      <div className="travel-theme">
        <p className="theme-text">以"慢节奏、轻体验、强适配"为核心，精选昆明、大理、丽江三地深度游玩，每日仅安排1-2个核心场景，预留充足休息与弹性时间。</p>
      </div>

      {/* 10天行程总览 */}
      <div className="full-itinerary-overview">
        <h3 className="itinerary-overview-title" style={{color: 'var(--primary-color)', fontSize: '1.5rem', marginBottom: '20px', paddingBottom: '10px', borderBottom: '2px solid var(--primary-color)', display: 'inline-block'}}>10天行程总览 📅</h3>
        <div className="itinerary-days-grid">
          {travelData.map((day, index) => (
            <div key={day.day} className="itinerary-day-summary">
              <div className="day-number">D{day.day}</div>
              <div className="day-title-small">{day.title}</div>
              <div className="day-route">{day.departure} → {day.destination}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 行程天数导航 */}
      <div className="day-navigation">
        {travelData.map(plan => (
          <button
            key={plan.day}
            className={`day-btn ${activeDay === plan.day ? 'active' : ''}`}
            onClick={() => setActiveDay(plan.day)}
            title={plan.title}
          >
            第{plan.day}天 🗓️
          </button>
        ))}
      </div>

      {/* 当前天行程详情 */}
      <div className="day-details">
        <div className="day-header">
          <h3 className="day-title">第{currentPlan.day}天: {currentPlan.title} ✨</h3>
        </div>

        {/* 基本信息 */}
        <div className="trip-info-flex">
          <div className="info-card inline">
            <h4 className="info-label">出发地</h4>
            <p className="info-value">🚀 {currentPlan.departure}</p>
          </div>
          <div className="info-card inline">
            <h4 className="info-label">目的地</h4>
            <p className="info-value">🏁 {currentPlan.destination}</p>
          </div>
          <div className="info-card inline">
            <h4 className="info-label">行程距离</h4>
            <p className="info-value">📏 {currentPlan.distance}</p>
          </div>
          <div className="info-card inline">
            <h4 className="info-label">行程时长</h4>
            <p className="info-value">⏱️ {currentPlan.duration}</p>
          </div>
        </div>

        {/* 交通信息 */}
        {currentPlan.transportation && (
          <div className="transportation-section">
            <h4 className="section-title"><span className="transport-icon">🚗</span>交通安排</h4> 
            <div className="transportation-details">
              <p className="transport-text">{currentPlan.transportation}</p>
            </div>
          </div>
        )}

        {/* 住宿信息 */}
        <div className="accommodation-section">
          <h4 className="section-title"><span className="accommodation-icon">🏨</span>住宿安排</h4>  
          <div className="accommodation-details">
            <p className="accommodation-name">🛏️ {currentPlan.accommodation}</p>
            {currentPlan.accommodationFeatures && (
              <p className="accommodation-features">👶 {currentPlan.accommodationFeatures}</p>
            )}
          </div>
        </div>

        {/* 餐饮安排 */}
        <div className="dining-section">
          <h4 className="section-title"><span className="dining-icon">🍽️</span>餐饮安排</h4>
          <div className="dining-details">
            <p className="dining-text">{currentPlan.dining}</p>
          </div>
        </div>

        {/* 详细时间安排 */}
        <div className="schedule-section">
          <h4 className="section-title">详细行程安排 🕒</h4>
          <div className="schedule-timeline">
            {currentPlan.schedule.map((item, index) => (
              <div key={index} className="schedule-item">
                <div className="schedule-time">{item.time}</div>
                <div className="schedule-activity">
                  <span className="activity-dot">•</span>
                  {item.activity}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 地图链接 */}
        <a
          href={currentPlan.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="map-link"
        >
          <span className="map-icon">🗺️</span>
          查看路线地图
        </a>
      </div>

      {/* 行程总览 */}
      <div className="trip-overview">
        <h3 className="overview-title">行程总览 🗺️</h3>
        <div className="overview-cities">
          <div className="city-tags">
            <span className="city-tag">🏙️ 昆明</span>
            <span className="city-arrow">→</span>
            <span className="city-tag">🏞️ 大理</span>
            <span className="city-arrow">→</span>
            <span className="city-tag">🏯 丽江</span>
            <span className="city-arrow">→</span>
            <span className="city-tag">🏙️ 昆明</span>
          </div>
          <p className="overview-description">昆明、大理、丽江三地深度游玩，取消香格里拉高海拔行程，专注于儿童舒适度与安全性。</p>
        </div>
      </div>

      {/* 优化要点 */}
      <div className="optimization-section">
        <h3 className="optimization-title">优化要点说明 💡</h3>
        <div className="optimization-grid">
          {optimizationPoints.map((point, index) => (
            <div key={index} className="optimization-card">
              <h4 className="optimization-point-title">{point.title}</h4>
              <p className="optimization-point-desc">{point.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 特别提示 */}
      <div className="tips-section">
        <h3 className="tips-title">特别提示 ⚠️</h3>
        <div className="tips-list">
          {specialTips.map((tip, index) => (
            <div key={index} className="tip-item">
              <span className="tip-icon">⚠️</span>
              <p className="tip-text">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TravelPlan;