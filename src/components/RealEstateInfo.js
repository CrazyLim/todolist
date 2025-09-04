import React from 'react';

function RealEstateInfo() {
  return (
    <div className="real-estate-container">
      <h2>🏠 深圳龙华红山片区房产信息 (2025年)</h2>
      
      {/* 子页面导航 */}
      <div className="subpage-navigation">
        <p>查看更多深圳房产信息：</p>
        <a href="#" className="subpage-link" onClick={(e) => {
          e.preventDefault();
          // 切换到房产对比页面
          window.location.hash = '#comparison';
          const event = new CustomEvent('navigateToPage', { detail: { page: 'realestateComparison' } });
          window.dispatchEvent(event);
        }}>
          🏘️ 深圳各区域房产对比分析
        </a>
      </div>
      
      <p className="intro-text">
        深圳龙华红山片区是近年来发展较快的区域，配套日益完善。以下是2025年该区域购房和租房的最新费用信息，希望能帮您做参考。
      </p>

      {/* 主要楼盘信息表格 */}
      <div className="table-container">
        <table className="estate-table">
          <thead>
            <tr>
              <th>小区名称</th>
              <th>类型</th>
              <th>主推户型</th>
              <th>购房价格（约）</th>
              <th>租房价格（约）</th>
              <th>核心特点</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="highlight">尚誉红山里</td>
              <td>住宅</td>
              <td>72-99㎡ 2-3房</td>
              <td>435-630万（单价5.95-6.3万/㎡）</td>
              <td>7500元/月（99㎡）</td>
              <td><span className="feature">现房</span>，龙华实验学校学区，折扣力度较大</td>
            </tr>
            <tr>
              <td className="highlight">联发臻著雅居</td>
              <td>住宅</td>
              <td>81-91㎡ 3房</td>
              <td>81平约510万起，91平约560万起（工抵房83折后）</td>
              <td>暂无数据</td>
              <td>限价房，近龙华实验学校，高得房率</td>
            </tr>
            <tr>
              <td className="highlight">众福红山印</td>
              <td>住宅</td>
              <td>79-100㎡ 3-4房</td>
              <td>537万起（单价6.8万/㎡起）</td>
              <td>暂无数据</td>
              <td>低容积率，近深圳高级中学（集团）北校区，近规划地铁27号线民宝站（规划中）</td>
            </tr>
            <tr>
              <td className="highlight">红山华府</td>
              <td>住宅</td>
              <td>63-78㎡ 2-3房</td>
              <td>470万起（折后）</td>
              <td>暂无数据</td>
              <td><span className="feature">深高北学区</span>，2025年4月"日光"盘，近地铁4/6号线红山站（约450米）</td>
            </tr>
            <tr>
              <td className="highlight">华业玫瑰四季</td>
              <td>住宅</td>
              <td>89㎡ 3房</td>
              <td>暂无数据（二手房视市场而定）</td>
              <td>7300元/月</td>
              <td>龙华核心地段，近红山地铁站，周边商业配套成熟</td>
            </tr>
            <tr>
              <td className="highlight">天曜府</td>
              <td>住宅</td>
              <td>104-185㎡ 4-5房</td>
              <td>暂无最新数据</td>
              <td>8800-15500元/月</td>
              <td>中高端项目，紧邻龙华区实验学校，自带幼儿园，2025年12月底精装交付</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 购房相关费用 */}
      <div className="cost-section">
        <h3>🏠 购房相关费用</h3>
        <p>除了房价本身，购房还需准备一些其他费用：</p>
        <ul className="cost-list">
          <li><strong>首付款</strong>：根据政策，首套房首付比例通常不低于30%。以总价500万的房子为例，首付约需要<strong>150万</strong>左右。</li>
          <li>
            <strong>税费</strong>：
            <ul className="sub-list">
              <li><strong>契税</strong>：首套房90㎡以下为总价的1%，90㎡以上为1.5%；二套房为1%-3%不等。</li>
              <li><strong>增值税及附加</strong>：房产证未满两年或非普通住宅需缴纳，约占差额的5.6%左右。</li>
              <li><strong>个人所得税</strong>：通常为总价的1%或差额的20%。</li>
              <li><strong>登记费、印花税</strong>等零星费用。</li>
            </ul>
          </li>
          <li><strong>公共维修基金</strong>：约为总房款的2%-3%，用于未来小区的公共部位、共用设施的维修更新。</li>
          <li><strong>月供</strong>：以贷款350万、30年期限、LPR利率计算，月供大约在<strong>1.7万-1.9万元</strong>左右。</li>
        </ul>
      </div>

      {/* 租房相关费用 */}
      <div className="cost-section">
        <h3>🧳 租房相关费用</h3>
        <p>租房时的成本主要包括：</p>
        <ul className="cost-list">
          <li><strong>租金押金</strong>：通常为"押二付一"或"押一付一"，即相当于2个月或1个月的租金作为押金，另支付第一个月的租金。</li>
          <li><strong>中介费</strong>：传统中介通常收取半个月或一个月的租金作为中介费。不过，也有平台提供"<strong>0元中介费</strong>"的服务，特别是针对应届或毕业一年内的大学生。</li>
          <li><strong>水电煤气、物业管理费、网络费</strong>等日常开销：这些费用通常由租客承担，具体金额因小区和使用情况而异。</li>
        </ul>
      </div>

      {/* 如何选择：购房还是租房 */}
      <div className="guide-section">
        <h3>💡 如何选择：购房还是租房？</h3>
        <div className="guide-grid">
          <div className="guide-card">
            <div className="guide-icon">📚</div>
            <h4>教育需求优先</h4>
            <p>如果非常看重教育资源，需要仔细研究<strong>学区划分</strong>（以教育局最新公布为准）和<strong>入学积分</strong>政策。例如，尚誉红山里对应的龙华区实验学校2025年小一录取积分较高（深户+学区房+社保满10年达102.5分），且学位紧张。</p>
          </div>
          <div className="guide-card">
            <div className="guide-icon">🚇</div>
            <h4>通勤与交通便利性</h4>
            <p>红山片区有地铁4号线、6号线，红山站、上塘站是主要站点。规划中的地铁线路（如22号线、27号线）未来会进一步提升出行便利。</p>
          </div>
          <div className="guide-card">
            <div className="guide-icon">💰</div>
            <h4>财务能力评估</h4>
            <p><strong>购房</strong>：需要评估首付能力、月供承受力（通常要求月收入是月供的2倍以上）以及长期定居的打算。<strong>租房</strong>：更适合预算有限、工作生活可能变动，或者尚未决定是否长期在该区域发展的人。</p>
          </div>
          <div className="guide-card">
            <div className="guide-icon">🏠</div>
            <h4>居住品质与偏好</h4>
            <p>新房或次新房（如尚誉红山里、天曜府）在户型设计、小区环境等方面可能更现代。租房也可以体验到不同小区的居住环境，方便未来决策。</p>
          </div>
        </div>
      </div>

      {/* 重要提示 */}
      <div className="tips-section">
        <h3>⚠️ 重要提示</h3>
        <ul className="tips-list">
          <li>表中新房价格通常来自开发商宣传，二手房和租房价格多为业主挂牌价，<strong>实际交易价格可能有所浮动</strong>。二手房交易还需特别关注税费情况（如房产证是否"满五唯一"）。</li>
          <li>对于<strong>学区房</strong>，教育政策及学区划分可能存在调整，务必须以教育局及学校当年发布的最新官方信息为准。</li>
          <li>购房和租房都是大事，建议<strong>务必实地考察</strong>心仪楼盘及周边环境，并咨询专业的房产顾问或律师。</li>
        </ul>
      </div>

      <div className="conclusion">
        <p>
          希望这些信息能帮助您更好地权衡在龙华红山片区安家的方式。根据您的家庭规划、财务状况和生活需求，做出最适合自己的选择。
        </p>
      </div>
    </div>
  );
}

export default RealEstateInfo;