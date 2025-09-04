import React from 'react';
import './RealEstateInfo.css';

function RealEstateComparison() {
  return (
    <div className="real-estate-container">
      <h2>🏘️ 深圳各区域房产对比分析 (2025年)</h2>
      
      <p className="intro-text">
        深圳作为中国的一线城市，各区域发展不均衡，房产市场也呈现出明显的分化。以下是2025年深圳主要区域的房产市场对比分析，
        希望能帮助您在不同区域间做出更明智的选择。
      </p>

      {/* 区域对比表格 */}
      <div className="table-container">
        <table className="estate-table">
          <thead>
            <tr>
              <th>区域</th>
              <th>新房均价（万/㎡）</th>
              <th>二手房均价（万/㎡）</th>
              <th>代表楼盘</th>
              <th>区域特点</th>
              <th>适合人群</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="highlight">南山区</td>
              <td>9.8-15.5</td>
              <td>9.2-14.8</td>
              <td>深圳湾1号、华润城润府</td>
              <td><span className="feature">科技产业</span>集中，教育资源优质，配套完善</td>
              <td>高收入人群、科技从业者、重视教育的家庭</td>
            </tr>
            <tr>
              <td className="highlight">福田区</td>
              <td>8.5-12.8</td>
              <td>7.9-12.2</td>
              <td>香蜜湖一号、金茂府</td>
              <td>市中心核心区域，商业繁华，交通便利</td>
              <td>金融从业者、商务人士、喜欢城市中心生活的家庭</td>
            </tr>
            <tr>
              <td className="highlight">罗湖区</td>
              <td>6.5-9.2</td>
              <td>5.8-8.7</td>
              <td>华润置地万象府、招商中环</td>
              <td>老城区，生活配套成熟，交通便捷</td>
              <td>预算有限但注重生活便利性的购房者</td>
            </tr>
            <tr>
              <td className="highlight">龙华区</td>
              <td>5.5-8.3</td>
              <td>4.9-7.8</td>
              <td>红山府、尚誉红山里</td>
              <td>北部发展新区，交通日益完善，教育资源提升</td>
              <td>刚需购房者、关注性价比的家庭</td>
            </tr>
            <tr>
              <td className="highlight">宝安区</td>
              <td>5.8-9.5</td>
              <td>5.2-9.0</td>
              <td>壹方中心、中洲湾</td>
              <td>西部发展重点区域，临前海，交通便利</td>
              <td>改善型需求、关注区域发展潜力的购房者</td>
            </tr>
            <tr>
              <td className="highlight">龙岗区</td>
              <td>4.2-6.8</td>
              <td>3.8-6.5</td>
              <td>信义金御半山、万科麓城</td>
              <td>东部发展区域，房价相对较低，生态环境好</td>
              <td>刚需购房者、预算有限的年轻家庭</td>
            </tr>
            <tr>
              <td className="highlight">光明区</td>
              <td>4.5-6.2</td>
              <td>4.0-5.8</td>
              <td>龙光玖龙台、勤诚达正大城</td>
              <td>新兴产业园区，房价相对较低，发展潜力大</td>
              <td>长期投资者、预算有限但看好区域发展的购房者</td>
            </tr>
            <tr>
              <td className="highlight">坪山区</td>
              <td>3.8-5.2</td>
              <td>3.5-4.9</td>
              <td>深城投中心公馆、龙光玖云著</td>
              <td>东部新兴区域，房价最低，规划发展中</td>
              <td>极刚需购房者、长期投资者</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 区域优势对比 */}
      <div className="cost-section">
        <h3>📊 各区域核心优势对比</h3>
        <div className="guide-grid">
          <div className="guide-card">
            <div className="guide-icon">🏫</div>
            <h4>教育资源</h4>
            <p><strong>顶级学区</strong>：南山区（深圳实验学校、深圳外国语学校）、福田区（深圳中学初中部、深圳高级中学初中部）</p>
            <p><strong>新兴优质学区</strong>：龙华区（深圳高级中学北校区）、宝安区（宝安中学）</p>
          </div>
          <div className="guide-card">
            <div className="guide-icon">💼</div>
            <h4>就业机会</h4>
            <p><strong>科技产业</strong>：南山区（科技园、粤海街道）</p>
            <p><strong>金融商务</strong>：福田区（福田中心区、车公庙）</p>
            <p><strong>制造业与物流</strong>：宝安区、龙岗区</p>
          </div>
          <div className="guide-card">
            <div className="guide-icon">🚇</div>
            <h4>交通便利性</h4>
            <p><strong>轨道密度最高</strong>：福田区、罗湖区、南山区</p>
            <p><strong>规划中线路最多</strong>：宝安区、龙华区</p>
            <p><strong>对外交通枢纽</strong>：宝安区（深圳宝安国际机场、深圳北站）</p>
          </div>
          <div className="guide-card">
            <div className="guide-icon">🛍️</div>
            <h4>商业配套</h4>
            <p><strong>高端商业中心</strong>：南山区（深圳湾万象城、海岸城）、福田区（深圳万象城、COCO Park）</p>
            <p><strong>区域商业中心</strong>：各区均有成熟商圈，如龙华区的红山6979、宝安区的壹方城</p>
          </div>
        </div>
      </div>

      {/* 购房预算指南 */}
      <div className="cost-section">
        <h3>💰 各区域购房预算指南</h3>
        <p>根据不同预算，可考虑的区域选择：</p>
        <ul className="cost-list">
          <li><strong>200-350万</strong>：主要考虑坪山区、光明区的小户型新房，或龙岗区、罗湖区的二手房</li>
          <li><strong>350-500万</strong>：可考虑龙岗区、光明区的中等户型，或龙华区、宝安区的小户型</li>
          <li><strong>500-800万</strong>：可考虑龙华区、宝安区的中等户型，或福田区、南山区的小户型</li>
          <li><strong>800-1200万</strong>：可考虑福田区、南山区的中等户型，或龙华区、宝安区的大户型</li>
          <li><strong>1200万以上</strong>：可考虑南山区、福田区的大户型或高端住宅</li>
        </ul>
        <p className="note">注：以上预算基于购买70-100㎡的普通住宅估算，实际价格会因具体位置、楼盘品质等因素有所差异。</p>
      </div>

      {/* 区域发展趋势 */}
      <div className="guide-section">
        <h3>📈 区域发展趋势分析</h3>
        <div className="guide-grid">
          <div className="guide-card">
            <div className="guide-icon">🚀</div>
            <h4>高增长区域</h4>
            <p><strong>光明科学城</strong>：随着深圳综合性国家科学中心的建设，光明区将迎来重大发展机遇</p>
            <p><strong>前海合作区</strong>：作为粤港澳大湾区的核心引擎，辐射带动宝安区发展</p>
          </div>
          <div className="guide-card">
            <div className="guide-icon">🏗️</div>
            <h4>城市更新重点</h4>
            <p><strong>罗湖区</strong>：多个旧改项目正在推进，包括湖贝旧改、蔡屋围旧改等</p>
            <p><strong>龙岗区</strong>：坂田、布吉等区域的城市更新将提升区域价值</p>
          </div>
          <div className="guide-card">
            <div className="guide-icon">🌳</div>
            <h4>生态宜居区域</h4>
            <p><strong>盐田区</strong>：山海资源丰富，环境优美，适合注重生活品质的购房者</p>
            <p><strong>大鹏新区</strong>：生态保护区，旅游资源丰富，但交通相对不便</p>
          </div>
          <div className="guide-card">
            <div className="guide-icon">📝</div>
            <h4>政策导向</h4>
            <p><strong>保障性住房</strong>：多个区域正在大规模建设保障性住房，如龙华区、龙岗区</p>
            <p><strong>人才住房</strong>：针对高层次人才的住房政策向重点发展区域倾斜</p>
          </div>
        </div>
      </div>

      {/* 购房建议 */}
      <div className="tips-section">
        <h3>💡 区域选择建议</h3>
        <ul className="tips-list">
          <li><strong>首次置业者</strong>：可优先考虑龙华区、宝安区的刚需盘，兼顾交通便利性和未来发展潜力</li>
          <li><strong>改善型需求</strong>：根据家庭需求选择合适区域，如需优质教育资源可考虑南山区、福田区</li>
          <li><strong>投资者</strong>：关注城市更新规划和轨道交通建设，重点考虑光明区、坪山区等价格洼地</li>
          <li><strong>长期居住者</strong>：除了房价因素，还应重点考察区域的生活配套、医疗资源、生态环境等因素</li>
        </ul>
      </div>

      {/* 重要提示 */}
      <div className="tips-section">
        <h3>⚠️ 重要提示</h3>
        <ul className="tips-list">
          <li>各区域房价数据仅供参考，<strong>实际价格可能因具体位置、楼层、朝向等因素有较大差异</strong></li>
          <li>购房前务必了解当地的<strong>限购政策</strong>、<strong>贷款政策</strong>以及<strong>学区划分</strong>等信息</li>
          <li>区域发展规划可能会调整，建议关注<strong>官方发布的最新规划文件</strong></li>
          <li>无论选择哪个区域，都建议<strong>实地考察</strong>，并咨询专业的房产顾问</li>
        </ul>
      </div>

      <div className="conclusion">
        <p>
          深圳各区域房产市场各具特色，选择适合自己的区域需要综合考虑预算、生活需求、工作地点、教育需求等多方面因素。
          希望这份对比分析能帮助您在深圳找到理想的家。
        </p>
      </div>
    </div>
  );
}

export default RealEstateComparison;