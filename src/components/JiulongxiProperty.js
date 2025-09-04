import React, { useState, useEffect } from 'react';
import './JiulongxiProperty.css';

function JiulongxiProperty() {
  const [activeTab, setActiveTab] = useState('market');
  const [isVisible, setIsVisible] = useState({});
  const [priceChange, setPriceChange] = useState(0);

  // 监听滚动显示动画
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section');
      const newVisibility = {};
      
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const id = section.getAttribute('data-section');
        if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
          newVisibility[id] = true;
        }
      });
      
      setIsVisible(prev => ({ ...prev, ...newVisibility }));
    };

    // 随机生成价格变动动画
    const interval = setInterval(() => {
      setPriceChange(prev => (Math.random() - 0.5) * 0.5 + prev);
    }, 5000);

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始检查
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="jiulongxi-container">
      {/* 页面头部 */}
      <header className="page-header">
        <div className="price-indicator">
          <div className="price-display">
            <span className="price-label">当前参考均价</span>
            <span className="price-value" style={{ color: priceChange >= 0 ? '#10b981' : '#ef4444' }}>
              ¥{(87378).toLocaleString()}/㎡
            </span>
            <span className={`price-change ${priceChange >= 0 ? 'positive' : 'negative'}`}>
              {priceChange >= 0 ? '↑' : '↓'} {(Math.abs(priceChange) * 100).toFixed(2)}%
            </span>
          </div>
        </div>
        
        <h2>🏠 深圳市龙华区玖龙玺89平米购房建议</h2>
        
        <p className="intro-text">
          玖龙玺作为龙华区的热门楼盘，因其地段、配套和产品力一直备受关注。以下是2025年9月初关于89平米户型的详细购买建议。
        </p>
      </header>
      
      {/* 标签页导航 */}
      <div className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'market' ? 'active' : ''}`}
          onClick={() => setActiveTab('market')}
        >
          💰 价格行情
        </button>
        <button 
          className={`tab-button ${activeTab === 'features' ? 'active' : ''}`}
          onClick={() => setActiveTab('features')}
        >
          🏡 房源特点
        </button>
        <button 
          className={`tab-button ${activeTab === 'evaluation' ? 'active' : ''}`}
          onClick={() => setActiveTab('evaluation')}
        >
          🌟 小区评价
        </button>
        <button 
          className={`tab-button ${activeTab === 'advice' ? 'active' : ''}`}
          onClick={() => setActiveTab('advice')}
        >
          💡 购买建议
        </button>
        <button 
          className={`tab-button ${activeTab === 'process' ? 'active' : ''}`}
          onClick={() => setActiveTab('process')}
        >
          📝 购房流程
        </button>
      </div>

      {/* 价格行情与市场分析 */}
      <div className={`section ${activeTab === 'market' || activeTab === '' ? 'active' : 'tab-hidden'}`} data-section="market">
        <h3>💰 价格行情与市场分析</h3>
        <p className="section-intro">目前玖龙玺89平米户型的市场价格有所波动，以下是详细分析：</p>
        
        <div className="market-info">
          <div className="info-item">
            <h4 className="info-title">近期价格参考</h4>
            <p>检索到的信息显示，一套位于高层的89.62平米四房户型，精装，南北朝向，挂牌价为<strong>780万元（单价约87,034元/㎡）</strong>。另一套114.11平米的房源挂牌价828万（单价约72,562元/㎡），但面积差异较大。</p>
          </div>
          
          <div className="info-item">
            <h4 className="info-title">小区均价趋势</h4>
            <p>根据多家平台数据，玖龙玺小区在2025年7月及8月的参考均价大约在<strong>8.7万/㎡至8.8万/㎡</strong>之间，同比去年有所下跌（例如同比下降4.48%），环比上月也略有下跌（例如环比下跌0.84%）。</p>
          </div>
          
          <div className="info-item">
            <h4 className="info-title">历史价格对比</h4>
            <p>回顾2021年的信息，该小区的市场价曾达到每平米13万元，政府指导价为9万元。目前的单价相对于高点已有明显回调。</p>
          </div>
          
          <div className="info-item">
            <h4 className="info-title">法拍房机会</h4>
            <p>值得注意的是，搜索结果中提及一套玖龙玺二期86㎡的法拍房，起拍价仅460.31万（单价约5.31万/㎡），较市场价有大幅折扣。但这属于特殊交易，<span className="risk-warning">风险较高</span>，需深入尽调。</p>
          </div>
        </div>

        {/* 价格趋势图表 */}
        <div className="chart-container">
          <h4 className="chart-title">价格趋势图</h4>
          <div className="chart-wrapper">
            <svg viewBox="0 0 500 200" className="price-chart">
              {/* X轴 */}
              <line x1="50" y1="150" x2="450" y2="150" stroke="#cbd5e1" strokeWidth="2" />
              {/* Y轴 */}
              <line x1="50" y1="150" x2="50" y2="50" stroke="#cbd5e1" strokeWidth="2" />
              {/* 价格线 */}
              <polyline 
                points="50,120 120,130 190,110 260,100 330,105 400,90" 
                stroke="#4f46e5" 
                strokeWidth="3" 
                fill="none" 
                strokeDasharray="5,5" 
              />
              {/* 数据点 */}
              {[50, 120, 190, 260, 330, 400].map((x, i) => (
                <circle key={i} cx={x} cy={[120, 130, 110, 100, 105, 90][i]} r="4" fill="#4f46e5" />
              ))}
              {/* 标签 */}
              <text x="250" y="180" textAnchor="middle" fill="#64748b" fontSize="12">时间（月）</text>
              <text x="20" y="100" textAnchor="middle" fill="#64748b" fontSize="12" transform="rotate(-90, 20, 100)">价格（万/㎡）</text>
            </svg>
          </div>
        </div>
        
        {/* 价格表格 */}
        <div className="table-container">
          <table className="price-table">
            <thead>
              <tr>
                <th>数据来源日期</th>
                <th>面积（㎡）</th>
                <th>总价（万元）</th>
                <th>单价（元/㎡）</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2024年12月23日</td>
                <td>89.62</td>
                <td>780</td>
                <td>87,034</td>
                <td>高层、精装</td>
              </tr>
              <tr>
                <td>2025年8月10日</td>
                <td>114.11</td>
                <td>828</td>
                <td>72,562</td>
                <td>中层、精装</td>
              </tr>
              <tr>
                <td>2025年7月参考价</td>
                <td>-</td>
                <td>-</td>
                <td>88,122</td>
                <td>小区整体参考均价</td>
              </tr>
              <tr>
                <td>2025年8月参考价</td>
                <td>-</td>
                <td>-</td>
                <td className="price-highlight">87,378</td>
                <td>小区整体参考均价</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 房源特点 */}
      <div className={`section ${activeTab === 'features' || activeTab === '' ? 'active' : 'tab-hidden'}`} data-section="features">
        <h3>🏡 房源特点</h3>
        <ul className="feature-list">
          <li><strong>户型设计</strong>：玖龙玺89平米的户型很多做到了<strong>四房两卫</strong>，得益于过去开发商较高的赠送面积（传闻赠送率最高可达17%左右），<strong>得房率高</strong>，实用性强。户型多设计为<strong>南北通透</strong>，双阳台（生活阳台和景观阳台）便于功能分区，采光和通风效果较好。</li>
          <li><strong>装修与交付</strong>：楼盘于2016年建成交付，多数房源为精装修，配置了如老板厨具、科勒卫浴等品牌设备。这意味着如果装修保养得当，购后可能需要投入的改造费用较少，可以实现"即买即住"。</li>
          <li><strong>楼层与朝向</strong>：房源有高层和中层之分，朝向也有南北、东南等多种选择。这些因素都会对价格和居住体验产生一定影响。</li>
        </ul>
      </div>

      {/* 小区综合评价 */}
      <div className={`section ${activeTab === 'evaluation' || activeTab === '' ? 'active' : 'tab-hidden'}`} data-section="evaluation">
        <h3>🌟 小区综合评价</h3>
        <p className="section-intro">玖龙玺花园二期由龙光地产开发，是一个集交通、商业、教育、休闲等多重优势于一体的高品质社区。</p>
        
        <div className="evaluation-grid">
          <div className="evaluation-card advantage">
            <h4 className="card-title">核心优势</h4>
            <ul className="advantage-list">
              <li><strong>交通极其便利</strong>：最大的亮点之一是<strong>无缝衔接地铁4号线白石龙站</strong>（步行约100-164米），1站可达深圳北站，2站接入福田，快速连接全市乃至香港西九龙（约26分钟）。</li>
              <li><strong>商业配套成熟</strong>：楼下自带约<strong>3.7万㎡的玖龙荟商业体</strong>，内含沃尔玛、电影院、咖啡馆等。步行600米左右可达星河COCO City商场。</li>
              <li><strong>教育资源优质</strong>：自带<strong>公立龙华第七幼儿园</strong>（步行5分钟），并享有<strong>深圳外国语学校龙华校区（初中部）</strong>和<strong>书香小学</strong>的学区资源。</li>
              <li><strong>产品与物业</strong>：小区为<strong>花园式社区</strong>，绿化率约40%，配有双游泳池、儿童游乐设施等。由龙光物业提供服务，国家一级资质。</li>
            </ul>
          </div>
          
          <div className="evaluation-card disadvantage">
            <h4 className="card-title">主要不足</h4>
            <ul className="disadvantage-list">
              <li><strong>容积率偏高</strong>：由于小区面积相对不大，建筑密度稍高，可能会感觉有些拥挤。</li>
              <li><strong>单价较高</strong>：尽管价格有所回调，但玖龙玺依然是龙华区的<strong>高价楼盘之一</strong>。</li>
              <li><strong>周边环境</strong>：靠近主干道和地铁，部分楼栋或单元可能受到一定的噪音影响。</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 购买建议与决策参考 */}
      <div className={`section ${activeTab === 'advice' || activeTab === '' ? 'active' : 'tab-hidden'}`} data-section="advice">
        <h3>💡 购买建议与决策参考</h3>
        
        <div className="advice-section">
          <div className="advice-item">
            <h4 className="advice-title">🎯 目标购房者</h4>
            <p>该楼盘非常适合<strong>注重通勤效率的上班族</strong>（尤其依赖地铁往返福田、南山）、<strong>看重子女优质教育资源的家庭</strong>（学区优势明显），以及<strong>追求高品质社区环境和便利生活配套的改善型购房者</strong>。</p>
          </div>
          
          <div className="advice-item">
            <h4 className="advice-title">💰 价格谈判策略</h4>
            <ul className="strategy-list">
              <li>关注挂牌价与参考均价的差异，当前市场下，<strong>大胆议价是必要的</strong>。</li>
              <li>详细了解税费情况。满五唯一的房子能<strong>节省大量税费</strong>（免征增值税约40万，若唯一再省个税11万）。</li>
              <li>计算真实首付：首套房首付比例最低三成。但注意，银行贷款通常按评估价和成交价孰低的原则计算贷款额。</li>
            </ul>
          </div>
          
          <div className="advice-item">
            <h4 className="advice-title">⚠️ 风险提示</h4>
            <ul className="risk-list">
              <li><strong>学区风险</strong>：深圳外国语学校龙华校区的学区划分并非一成不变。尽管目前玖龙玺在其学区范围内，但未来是否存在变动风险，需向教育部门核实最新政策。</li>
              <li><strong>法拍房风险</strong>：虽然法拍房价格极具诱惑，但可能隐藏着<strong>产权纠纷、债务问题、长期租约、户口迁出困难、高额欠费</strong>等风险。非专业投资者不建议轻易尝试。</li>
              <li><strong>市场波动风险</strong>：房地产市场价格受多种因素影响，未来走势存在不确定性。需根据自身经济情况和长期居住需求审慎决策。</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 购房流程与费用备忘 */}
      <div className={`section ${activeTab === 'process' || activeTab === '' ? 'active' : 'tab-hidden'}`} data-section="process">
        <h3>📝 购房流程与费用备忘</h3>
        
        <div className="process-section">
          <div className="process-info">
            <h4 className="process-title">购房流程</h4>
            <p className="process-steps">购买二手房主要流程通常包括：觅房看房 → 产权调查与资格核查 → 谈判签合同、付定金 → 资金监管与按揭申请 → 缴税过户 → 物业交割 → 领取新证。</p>
          </div>
          
          <div className="cost-info">
            <h4 className="cost-title">主要费用支出</h4>
            <ul className="cost-list">
              <li><strong>首付款</strong>：如以780万总价、首套首付3成计算，<strong>首付约234万元</strong>。但需注意银行评估价可能影响实际贷款金额和首付。</li>
              <li><strong>税费</strong>：满五唯一可免征增值税和个人所得税，主要需缴纳契税（首套房90平以下为1%）。<strong>非"满五唯一"则税费会大幅增加</strong>。</li>
              <li><strong>中介费</strong>：通常为成交总价的1-3%，可协商。</li>
              <li><strong>其他费用</strong>：登记费、按揭服务费等杂费。</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 总结 */}
      <div className="conclusion">
        <div className="quick-summary">
          <div className="summary-item">
            <div className="summary-icon">🚇</div>
            <div className="summary-text">地铁4号线白石龙站无缝衔接</div>
          </div>
          <div className="summary-item">
            <div className="summary-icon">🏫</div>
            <div className="summary-text">深圳外国语学校龙华校区学区</div>
          </div>
          <div className="summary-item">
            <div className="summary-icon">🛍️</div>
            <div className="summary-text">自带3.7万㎡玖龙荟商业体</div>
          </div>
          <div className="summary-item">
            <div className="summary-icon">💰</div>
            <div className="summary-text">均价约8.7万/㎡</div>
          </div>
        </div>
        
        <h3>✨ 总结</h3>
        <p>
          总而言之，龙华玖龙玺89平米的户型是一个<strong>综合品质非常高</strong>的选择，尤其适合依赖地铁通勤和重视学区的家庭。
        </p>
        
        <div className="recommendations">
          <p className="recommendation-title">建议你这样决策：</p>
          <ul className="recommendation-list">
            <li>如果<strong>预算充足</strong>，且能找到一套价格合理、满足"满五唯一"、户型楼层都满意的房源，<strong>值得入手</strong>。</li>
            <li>如果<strong>追求极致性价比</strong>，且不排斥复杂流程和风险，可以<strong>深入研究法拍房机会</strong>，但务必聘请专业律师或机构进行尽调。</li>
            <li><strong>当前市场环境下，耐心寻找和果断议价是关键</strong>。多看几套，对比优缺点，不要急于做决定。</li>
          </ul>
        </div>
        
        <p className="final-wish">
          希望这些分析对你有帮助！祝你顺利找到心仪的家。
        </p>
      </div>
    </div>
  );
}

export default JiulongxiProperty;