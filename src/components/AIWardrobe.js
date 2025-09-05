import React, { useState, useEffect } from 'react';
import './AIWardrobe.css';

// AI衣橱主组件
function AIWardrobe() {
  // 衣橱数据 - 模拟数据
  const [clothesItems, setClothesItems] = useState([]);
  const [outfits, setOutfits] = useState([]);
  const [activeTab, setActiveTab] = useState('home'); // home, add, outfits, ai-match
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    type: '',
    color: '',
    season: '',
    occasion: '',
    imageUrl: '',
    brand: '',
    price: ''
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [aiGeneratedOutfits, setAiGeneratedOutfits] = useState([]);
  const [showOutfitDetail, setShowOutfitDetail] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState(null);

  // 分类选项
  const categories = {
    types: ['上衣', '下装', '鞋履', '配饰'],
    colors: ['红色', '蓝色', '绿色', '黄色', '黑色', '白色', '灰色', '紫色', '粉色'],
    seasons: ['春季', '夏季', '秋季', '冬季'],
    occasions: ['商务', '休闲', '运动', '正式', '约会']
  };

  // 加载数据
  useEffect(() => {
    // 模拟从localStorage加载数据
    const savedClothes = localStorage.getItem('aiWardrobeClothes');
    const savedOutfits = localStorage.getItem('aiWardrobeOutfits');
    
    if (savedClothes) {
      setClothesItems(JSON.parse(savedClothes));
    } else {
      // 初始化一些模拟数据
      const mockClothes = [
        {
          id: 1,
          type: '上衣',
          color: '蓝色',
          season: '春季',
          occasion: '休闲',
          imageUrl: 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="400"%3E%3Crect width="300" height="400" fill="%23f0f0f0"/%3E%3Crect x="50" y="100" width="200" height="200" fill="%234287f5"/%3E%3Crect x="100" y="50" width="100" height="50" fill="%233a77e3"/%3E%3C/svg%3E',
          brand: '优衣库',
          price: '299',
          addedDate: new Date().toISOString()
        },
        {
          id: 2,
          type: '下装',
          color: '黑色',
          season: '四季',
          occasion: '商务',
          imageUrl: 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="400"%3E%3Crect width="300" height="400" fill="%23f0f0f0"/%3E%3Crect x="70" y="150" width="160" height="200" fill="%23222222"/%3E%3C/svg%3E',
          brand: 'Zara',
          price: '399',
          addedDate: new Date().toISOString()
        },
        {
          id: 3,
          type: '鞋履',
          color: '棕色',
          season: '秋季',
          occasion: '正式',
          imageUrl: 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="400"%3E%3Crect width="300" height="400" fill="%23f0f0f0"/%3E%3Cpath d="M70 330 L70 290 C70 270 100 250 150 250 C200 250 230 270 230 290 L230 330 Z" fill="%238B4513"/%3E%3C/svg%3E',
          brand: 'Clarks',
          price: '899',
          addedDate: new Date().toISOString()
        },
        {
          id: 4,
          type: '配饰',
          color: '红色',
          season: '冬季',
          occasion: '约会',
          imageUrl: 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="400"%3E%3Crect width="300" height="400" fill="%23f0f0f0"/%3E%3Cpath d="M40 180 C100 130 200 130 260 180 C200 230 100 230 40 280" stroke="%23ff3333" stroke-width="30" fill="none"/%3E%3C/svg%3E',
          brand: '无印良品',
          price: '199',
          addedDate: new Date().toISOString()
        }
      ];
      setClothesItems(mockClothes);
      localStorage.setItem('aiWardrobeClothes', JSON.stringify(mockClothes));
    }
    
    if (savedOutfits) {
      setOutfits(JSON.parse(savedOutfits));
    } else {
      // 初始化一些模拟搭配数据
      const mockOutfits = [
        {
          id: 1,
          name: '商务休闲装',
          items: [1, 2],
          imageUrl: 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="300"%3E%3Crect width="500" height="300" fill="%23f0f0f0"/%3E%3Crect x="150" y="70" width="200" height="150" fill="%234287f5"/%3E%3Crect x="170" y="40" width="160" height="30" fill="%233a77e3"/%3E%3C/svg%3E',
          weather: '晴天',
          occasion: '商务',
          createdAt: new Date().toISOString()
        }
      ];
      setOutfits(mockOutfits);
      localStorage.setItem('aiWardrobeOutfits', JSON.stringify(mockOutfits));
    }
  }, []);

  // 保存数据到localStorage
  useEffect(() => {
    if (clothesItems.length > 0) {
      localStorage.setItem('aiWardrobeClothes', JSON.stringify(clothesItems));
    }
  }, [clothesItems]);

  useEffect(() => {
    if (outfits.length > 0) {
      localStorage.setItem('aiWardrobeOutfits', JSON.stringify(outfits));
    }
  }, [outfits]);

  // 处理添加新单品
  const handleAddItem = () => {
    if (newItem.type && newItem.color && newItem.season && newItem.occasion) {
      const itemWithId = {
        ...newItem,
        id: Date.now(),
        addedDate: new Date().toISOString()
      };
      setClothesItems([...clothesItems, itemWithId]);
      setNewItem({
        type: '',
        color: '',
        season: '',
        occasion: '',
        imageUrl: '',
        brand: '',
        price: ''
      });
      setShowAddForm(false);
      setActiveTab('home');
    }
  };

  // 处理删除单品
  const handleDeleteItem = (id) => {
    setClothesItems(clothesItems.filter(item => item.id !== id));
    // 同时从搭配中移除该单品
    setOutfits(outfits.map(outfit => ({
      ...outfit,
      items: outfit.items.filter(itemId => itemId !== id)
    })));
  };

  // 处理生成AI搭配
  const handleGenerateAIMatch = (itemId) => {
    setSelectedItem(clothesItems.find(item => item.id === itemId));
    setActiveTab('ai-match');
    
    // 模拟AI生成搭配过程
    setTimeout(() => {
      const generatedOutfits = [
        {
          id: Date.now() + 1,
          name: 'AI推荐搭配1',
          items: [itemId, ...clothesItems.filter(item => item.id !== itemId).slice(0, 2).map(item => item.id)],
          imageUrl: 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="300"%3E%3Crect width="500" height="300" fill="%23f0f0f0"/%3E%3Crect x="150" y="70" width="200" height="150" fill="%234287f5"/%3E%3C/svg%3E'
        },
        {
          id: Date.now() + 2,
          name: 'AI推荐搭配2',
          items: [itemId, ...clothesItems.filter(item => item.id !== itemId).slice(2, 4).map(item => item.id)],
          imageUrl: 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="300"%3E%3Crect width="500" height="300" fill="%23f0f0f0"/%3E%3Crect x="150" y="70" width="200" height="150" fill="%234287f5"/%3E%3C/svg%3E'
        }
      ];
      setAiGeneratedOutfits(generatedOutfits);
    }, 1500);
  };

  // 保存AI生成的搭配
  const handleSaveAIOutfit = (outfit) => {
    const fullOutfit = {
      ...outfit,
      weather: '适宜',
      occasion: '日常',
      createdAt: new Date().toISOString()
    };
    setOutfits([...outfits, fullOutfit]);
    setActiveTab('outfits');
  };

  // 查看搭配详情
  const handleViewOutfitDetail = (outfit) => {
    setSelectedOutfit(outfit);
    setShowOutfitDetail(true);
  };

  // 渲染首页
  const renderHomePage = () => {
    return (
      <div className="wardrobe-home">
        <div className="stats-cards">
          <div className="stat-card">
            <h3>衣橱总量</h3>
            <p className="stat-number">{clothesItems.length}</p>
          </div>
          <div className="stat-card">
            <h3>搭配总数</h3>
            <p className="stat-number">{outfits.length}</p>
          </div>
        </div>

        <div className="recent-items">
          <h3>最近添加</h3>
          <div className="items-scroll">
            {clothesItems.slice(0, 4).map(item => (
              <div key={item.id} className="item-card">
                <img src={item.imageUrl} alt={item.type} />
                <div className="item-info">
                  <p className="item-name">{item.type}</p>
                  <div className="item-tags">
                    <span className="tag">{item.color}</span>
                    <span className="tag">{item.season}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="recent-outfits">
          <h3>我的搭配</h3>
          <div className="outfits-grid">
            {outfits.map(outfit => (
              <div key={outfit.id} className="outfit-card" onClick={() => handleViewOutfitDetail(outfit)}>
                <img src={outfit.imageUrl} alt={outfit.name} />
                <p className="outfit-name">{outfit.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 渲染添加单品页面
  const renderAddItemPage = () => {
    return (
      <div className="add-item-page">
        <h2>添加新单品</h2>
        <div className="add-item-form">
          <div className="form-group">
            <label>分类</label>
            <select 
              value={newItem.type} 
              onChange={(e) => setNewItem({...newItem, type: e.target.value})}
            >
              <option value="">请选择分类</option>
              {categories.types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>颜色</label>
            <select 
              value={newItem.color} 
              onChange={(e) => setNewItem({...newItem, color: e.target.value})}
            >
              <option value="">请选择颜色</option>
              {categories.colors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>季节</label>
            <select 
              value={newItem.season} 
              onChange={(e) => setNewItem({...newItem, season: e.target.value})}
            >
              <option value="">请选择季节</option>
              {categories.seasons.map(season => (
                <option key={season} value={season}>{season}</option>
              ))}
              <option value="四季">四季</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>场合</label>
            <select 
              value={newItem.occasion} 
              onChange={(e) => setNewItem({...newItem, occasion: e.target.value})}
            >
              <option value="">请选择场合</option>
              {categories.occasions.map(occasion => (
                <option key={occasion} value={occasion}>{occasion}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>品牌</label>
            <input 
              type="text" 
              value={newItem.brand} 
              onChange={(e) => setNewItem({...newItem, brand: e.target.value})}
              placeholder="输入品牌名称"
            />
          </div>
          
          <div className="form-group">
            <label>价格</label>
            <input 
              type="text" 
              value={newItem.price} 
              onChange={(e) => setNewItem({...newItem, price: e.target.value})}
              placeholder="输入价格"
            />
          </div>
          
          <div className="form-actions">
            <button className="btn-primary" onClick={handleAddItem}>保存</button>
            <button className="btn-secondary" onClick={() => setShowAddForm(false)}>取消</button>
          </div>
        </div>
      </div>
    );
  };

  // 渲染衣橱页面
  const renderWardrobePage = () => {
    return (
      <div className="wardrobe-page">
        <div className="wardrobe-header">
          <h2>我的衣橱</h2>
          <button className="btn-primary" onClick={() => setActiveTab('add')}>添加单品</button>
        </div>
        
        <div className="clothes-grid">
          {clothesItems.map(item => (
            <div key={item.id} className="clothes-item">
              <img src={item.imageUrl} alt={item.type} />
              <div className="item-details">
                <h4>{item.type}</h4>
                <div className="item-tags">
                  <span className="tag">{item.color}</span>
                  <span className="tag">{item.season}</span>
                  <span className="tag">{item.occasion}</span>
                </div>
                <div className="item-actions">
                  <button className="btn-sm-primary" onClick={() => handleGenerateAIMatch(item.id)}>AI搭配</button>
                  <button className="btn-sm-danger" onClick={() => handleDeleteItem(item.id)}>删除</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 渲染搭配页面
  const renderOutfitsPage = () => {
    return (
      <div className="outfits-page">
        <h2>我的搭配</h2>
        <div className="outfits-grid">
          {outfits.map(outfit => (
            <div key={outfit.id} className="outfit-card-large" onClick={() => handleViewOutfitDetail(outfit)}>
              <img src={outfit.imageUrl} alt={outfit.name} />
              <div className="outfit-details">
                <h4>{outfit.name}</h4>
                <div className="outfit-tags">
                  <span className="tag">{outfit.weather}</span>
                  <span className="tag">{outfit.occasion}</span>
                </div>
                <p className="outfit-date">创建于 {new Date(outfit.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 渲染AI搭配页面
  const renderAIMatchPage = () => {
    return (
      <div className="ai-match-page">
        <h2>AI智能搭配</h2>
        <div className="selected-item">
          <h3>基于您的{selectedItem && selectedItem.type}</h3>
          {selectedItem && (
            <div className="item-preview">
              <img src={selectedItem.imageUrl} alt={selectedItem.type} />
              <div className="item-info">
                <p>{selectedItem.type}</p>
                <p>{selectedItem.color}</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="ai-results">
          {aiGeneratedOutfits.length === 0 ? (
            <div className="loading">AI正在为您生成搭配方案...</div>
          ) : (
            <div className="ai-outfits-grid">
              {aiGeneratedOutfits.map(outfit => (
                <div key={outfit.id} className="ai-outfit-card">
                  <img src={outfit.imageUrl} alt={outfit.name} />
                  <h4>{outfit.name}</h4>
                  <button className="btn-primary" onClick={() => handleSaveAIOutfit(outfit)}>保存搭配</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // 渲染搭配详情
  const renderOutfitDetail = () => {
    if (!selectedOutfit) return null;
    
    const outfitItems = selectedOutfit.items.map(itemId => 
      clothesItems.find(item => item.id === itemId)
    ).filter(Boolean);

    return (
      <div className="outfit-detail-overlay" onClick={() => setShowOutfitDetail(false)}>
        <div className="outfit-detail-modal" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={() => setShowOutfitDetail(false)}>×</button>
          <h2>{selectedOutfit.name}</h2>
          <img src={selectedOutfit.imageUrl} alt={selectedOutfit.name} className="outfit-image-large" />
          <div className="outfit-items">
            <h3>搭配单品</h3>
            <div className="outfit-items-list">
              {outfitItems.map(item => (
                <div key={item.id} className="outfit-item">
                  <img src={item.imageUrl} alt={item.type} />
                  <div className="item-info">
                    <p>{item.type}</p>
                    <p>{item.color}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="outfit-tags">
            <span className="tag">{selectedOutfit.weather}</span>
            <span className="tag">{selectedOutfit.occasion}</span>
          </div>
          <button className="btn-primary share-btn">分享</button>
        </div>
      </div>
    );
  };

  // 渲染主内容
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomePage();
      case 'add':
        return renderAddItemPage();
      case 'wardrobe':
        return renderWardrobePage();
      case 'outfits':
        return renderOutfitsPage();
      case 'ai-match':
        return renderAIMatchPage();
      default:
        return renderHomePage();
    }
  };

  return (
    <div className="ai-wardrobe">
      <div className="wardrobe-tabs">
        <button 
          className={`tab-btn ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          首页
        </button>
        <button 
          className={`tab-btn ${activeTab === 'wardrobe' ? 'active' : ''}`}
          onClick={() => setActiveTab('wardrobe')}
        >
          衣橱
        </button>
        <button 
          className={`tab-btn ${activeTab === 'outfits' ? 'active' : ''}`}
          onClick={() => setActiveTab('outfits')}
        >
          搭配
        </button>
      </div>
      
      <div className="wardrobe-content">
        {renderContent()}
      </div>
      
      {/* 悬浮按钮 */}
      <div className="floating-actions">
        <button 
          className="fab add-fab"
          onClick={() => setActiveTab('add')}
          aria-label="添加新单品"
        >
          +
        </button>
        <button 
          className="fab match-fab"
          onClick={() => {
            if (clothesItems.length > 0) {
              handleGenerateAIMatch(clothesItems[0].id);
            } else {
              alert('请先添加一些衣物');
            }
          }}
          aria-label="AI搭配"
        >
          ✨
        </button>
      </div>
      
      {/* 搭配详情弹窗 */}
      {showOutfitDetail && renderOutfitDetail()}
    </div>
  );
}

export default AIWardrobe;