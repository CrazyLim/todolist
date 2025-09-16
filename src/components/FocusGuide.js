import React from 'react';
import './FocusGuide.css';

const FocusGuide = () => {
  return (
    <div className="focus-guide-container">
      <div className="focus-guide-header">
        <h1>专注力提升：理论与实操完全指南</h1>
        <div className="focus-guide-subtitle">系统性提升专注能力的21天训练方案</div>
      </div>

      {/* 核心理论部分 */}
      <section className="focus-guide-section">
        <div className="section-header">
          <h2>第一部分：核心理论：为什么我们会分心？</h2>
          <div className="section-divider"></div>
        </div>
        
        <div className="theory-card">
          <h3>大脑的默认模式网络 (Default Mode Network, DMN)</h3>
          <div className="theory-content">
            <p><strong>理论</strong>：当我们不专注于外部任务时，大脑的DMN会自动激活。它是一个"休息状态"网络，负责产生漫无目的的思考、自我参照思维（回想过去、规划未来）、以及"心智游移"（Mind-Wandering）。杂念主要来源于此。</p>
            <p><strong>启示</strong>：分心是大脑的默认状态。专注，并非要消灭DMN，而是<strong>增强另一个网络——任务正模式网络（Task-Positive Network, TPN）的激活和控制能力</strong>。</p>
          </div>
        </div>

        <div className="theory-card">
          <h3>神经可塑性 (Neuroplasticity)</h3>
          <div className="theory-content">
            <p><strong>理论</strong>：大脑的结构和功能可以根据经验和训练而改变。就像锻炼肌肉一样，通过重复的"专注-收回"练习，可以强化前额叶皮质（负责决策、专注的脑区）的神经连接，削弱对分心刺激的反应。</p>
            <p><strong>启示</strong>：专注力是<strong>可以训练</strong>的。每一次你意识到自己分心并把注意力拉回来，都是一次至关重要的"神经锻炼"。</p>
          </div>
        </div>

        <div className="theory-card">
          <h3>注意力残留 (Attention Residue)</h3>
          <div className="theory-content">
            <p><strong>理论</strong>：当人们从一个任务快速切换到另一个任务时，一部分注意力仍然会残留在前一个任务上，这会显著降低在新任务上的表现。</p>
            <p><strong>启示</strong>：多任务处理是效率的敌人。<strong>单一任务（Single-Tasking）</strong> 才是专注的核心原则。</p>
          </div>
        </div>
      </section>

      {/* 实操系统部分 */}
      <section className="focus-guide-section">
        <div className="section-header">
          <h2>第二部分：实操系统：21天专注力训练方案</h2>
          <div className="section-divider"></div>
        </div>
        
        <div className="preparation-section">
          <h3>准备工作：</h3>
          <ul className="preparation-list">
            <li><strong>工具</strong>：一个计时器、一个笔记本（或数字笔记）、一支笔。</li>
            <li><strong>心态</strong>：放弃完美主义。目标是"进步"，而非"完美"。分心是过程的一部分，而非失败。</li>
          </ul>
        </div>

        {/* 阶段一 */}
        <div className="stage-card">
          <div className="stage-header">
            <h3>阶段一：意识唤醒期 (第1-7天) - 学会觉察</h3>
            <div className="stage-goal">
              <strong>目标</strong>：不加评判地观察自己的注意力流动，建立"元认知"（意识到自己在想什么）能力。
            </div>
          </div>
          <div className="stage-content">
            <p><strong>理论应用</strong>：此阶段旨在让你<strong>觉察到DMN的活动</strong>，而不被它裹挟。</p>
            
            <div className="daily-practice">
              <h4>每日实操：</h4>
              <div className="practice-item">
                <div className="practice-title">【早晨】正呼吸呼吸（5分钟）</div>
                <p><strong>操作</strong>：坐直，闭眼。将注意力完全集中在鼻孔呼吸的感觉上。无需改变呼吸节奏。</p>
                <p><strong>当分心时</strong>（必然会发生）：温和地注意到"哦，我分心了"，然后轻轻地将注意力带回到呼吸上。<strong>这个"带回"的动作，才是训练的核心</strong>。</p>
              </div>
              
              <div className="practice-item">
                <div className="practice-title">【上午】单一番茄钟（25+5）</div>
                <p><strong>操作</strong>：选择一项任务。设定25分钟倒计时，告知自己："在这25分钟内，我只做这一件事。"</p>
                <p><strong>当分心想法出现</strong>：在笔记本上快速记下它（例如"想起来要交电费"），然后立即回到任务中。这个"记录"动作清空了大脑的"缓存"，让你能安心回来。</p>
              </div>
              
              <div className="practice-item">
                <div className="practice-title">【晚上】分心日记（5分钟）</div>
                <p><strong>操作</strong>：在笔记本上回答：</p>
                <ul>
                  <li>今天最主要的分心来源是什么？（内部杂念？手机通知？他人干扰？）</li>
                  <li>我在哪个时段最容易专注？</li>
                  <li>（不加评判，只是记录）</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 阶段二 */}
        <div className="stage-card">
          <div className="stage-header">
            <h3>阶段二：能力建设期 (第8-14天) - 延长专注时长</h3>
            <div className="stage-goal">
              <strong>目标</strong>：在觉察的基础上，增加专注的持久度和深度。
            </div>
          </div>
          <div className="stage-content">
            <p><strong>理论应用</strong>：通过延长专注时间，<strong>强化TPN的持续激活能力</strong>，并利用"环境设计"减少切换到DMN的触发点。</p>
            
            <div className="daily-practice">
              <h4>每日实操：</h4>
              <div className="practice-item">
                <div className="practice-title">【早晨】感官冥想（10分钟）</div>
                <p><strong>操作</strong>：按顺序将注意力分别专注于：听（2分钟）→ 触觉（身体与椅子的接触感，2分钟）→ 嗅觉（2分钟）→ 呼吸（4分钟）。这训练了注意力在不同感官通道间<strong>受控地转移</strong>。</p>
              </div>
              
              <div className="practice-item">
                <div className="practice-title">【工作学习】双番茄钟（2*(25+5)）</div>
                <p><strong>操作</strong>：连续完成两个番茄钟，中间休息5分钟。在第二个番茄钟开始时，应用"<strong>5更多法则</strong>"："我只需要再专注25分钟。"</p>
              </div>
              
              <div className="practice-item">
                <div className="practice-title">【环境设计】触发点清理（每天2分钟）</div>
                <p><strong>操作</strong>：</p>
                <ul>
                  <li>物理环境：工作前让桌面保持"极简"，只留当前任务物品。</li>
                  <li>数字环境：使用<strong>飞行模式</strong>或<strong>专注APP</strong>（如Forest、番茄ToDo）屏蔽手机干扰。这是基于<strong>神经可塑性</strong>，减少外界刺激与"分心"回路的连接。</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 阶段三 */}
        <div className="stage-card">
          <div className="stage-header">
            <h3>阶段三：习惯内化期 (第15-21天) - 自动化专注</h3>
            <div className="stage-goal">
              <strong>目标</strong>：将前两周的技巧内化为习惯，让专注变得更自然、更轻松。
            </div>
          </div>
          <div className="stage-content">
            <p><strong>理论应用</strong>：通过<strong>仪式感</strong>和<strong>环境提示</strong>，建立自动化的专注行为模式，减少对意志力的依赖。</p>
            
            <div className="daily-practice">
              <h4>每日实操：</h4>
              <div className="practice-item">
                <div className="practice-title">【启动仪式】3-2-1启动法（1分钟）</div>
                <p><strong>操作</strong>：开始任务前：</p>
                <ul>
                  <li><strong>3</strong>次深呼吸（启动副交感神经，平静下来）。</li>
                  <li><strong>2</strong>个明确目标（低声告诉自己："我这小时要完成XX和YY"）。</li>
                  <li><strong>1</strong>分钟准备材料（准备好所有需要的东西，减少中途断开的理由）。</li>
                </ul>
              </div>
              
              <div className="practice-item">
                <div className="practice-title">【工作中】主题深度块（45-15）</div>
                <p><strong>操作</strong>：将番茄钟延长至45分钟工作，15分钟休息。在这45分钟内，践行"<strong>零中断原则</strong>"：任何新想法、杂念都只记录，不处理。</p>
              </div>
              
              <div className="practice-item">
                <div className="practice-title">【傍晚】注意力恢复（20分钟）</div>
                <p><strong>操作</strong>：进行一项<strong>无需专注</strong>的放松活动，如散步、听纯音乐、冥想。这允许DMN在可控状态下活动，<strong>像清理电脑内存一样</strong>为大脑恢复精力。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 超越21天部分 */}
      <section className="focus-guide-section">
        <div className="section-header">
          <h2>第三部分：超越21天：成为专注的掌控者</h2>
          <div className="section-divider"></div>
        </div>
        
        <div className="beyond-section">
          <p>21天后，你已不再是专注力的"新手"。你可以：</p>
          
          <div className="beyond-item">
            <h3>个性化你的方案</h3>
            <p>你已了解自己最佳的专注时间、最容易分心的触发点。据此调整你的日程，将最难的工作放在专注力高峰时段。</p>
          </div>
          
          <div className="beyond-item">
            <h3>混合搭配技巧</h3>
            <p>不需要每天做所有练习。今天需要深度工作，就用"主题深度块"；明天会议多，就多用"3-2-1启动法"快速进入状态。</p>
          </div>
          
          <div className="beyond-item">
            <h3>接受周期性波动</h3>
            <p>专注力会有好坏 days。重要的是在状态差时，不自我批判，而是回归到最基本的"正呼吸呼吸"和"单一番茄钟"来重启自己。</p>
          </div>
        </div>
        
        <div className="conclusion-section">
          <h3>核心总结：</h3>
          <p>专注力的提升，不是一个"消除杂念"的过程，而是一个 <strong>"重塑大脑"</strong> 的过程。你通过一次又一次地<strong>觉察到分心</strong>并<strong>温柔地将注意力带回</strong>，就是在物理上强化了大脑的"专注肌肉"。这份指南提供了理论和路径，但真正的改变，始于你决定放下杂念、开始第一个番茄钟的那一刻。</p>
        </div>
      </section>
    </div>
  );
};

export default FocusGuide;