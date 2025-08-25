import React, { useState, useEffect, useRef } from 'react';
import './TankGame.css';

const TankGame = () => {
  const BOARD_SIZE = 15;
  const [gameState, setGameState] = useState({ 
    player: { x: 7, y: 13, direction: 'up', color: 'blue' },
    enemies: [],
    bullets: [],
    obstacles: [],
    score: 0,
    lives: 3,
    gameOver: false,
    level: 1
  });
  const [keys, setKeys] = useState({});
  const gameLoopRef = useRef(null);
  const enemySpawnTimerRef = useRef(null);

  // 初始化游戏状态
  useEffect(() => {
    resetGame();

    // 清理函数
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
      if (enemySpawnTimerRef.current) {
        clearInterval(enemySpawnTimerRef.current);
      }
    };
  }, []);

  // 重置游戏
  const resetGame = () => {
    // 创建障碍物
    const obstacles = [];
    // 在地图周围创建围墙
    for (let i = 0; i < BOARD_SIZE; i++) {
      obstacles.push({ x: 0, y: i });
      obstacles.push({ x: BOARD_SIZE - 1, y: i });
      obstacles.push({ x: i, y: 0 });
      obstacles.push({ x: i, y: BOARD_SIZE - 1 });
    }
    // 在地图中间创建一些随机障碍物
    for (let i = 0; i < 15; i++) {
      obstacles.push({
        x: Math.floor(Math.random() * (BOARD_SIZE - 4)) + 2,
        y: Math.floor(Math.random() * (BOARD_SIZE - 4)) + 2
      });
    }

    setGameState({
      player: { x: 7, y: 13, direction: 'up', color: 'blue' },
      enemies: [],
      bullets: [],
      obstacles: obstacles,
      score: 0,
      lives: 3,
      gameOver: false,
      level: 1
    });

    // 清除之前的游戏循环
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    if (enemySpawnTimerRef.current) {
      clearInterval(enemySpawnTimerRef.current);
    }

    // 开始游戏循环
    gameLoopRef.current = setInterval(gameLoop, 100);
    // 定时生成敌人
    enemySpawnTimerRef.current = setInterval(spawnEnemy, 2000);
  };

  // 生成敌人
  const spawnEnemy = () => {
    if (gameState.gameOver) return;

    // 在地图顶部随机位置生成敌人
    const enemyX = Math.floor(Math.random() * (BOARD_SIZE - 4)) + 2;
    const newEnemy = {
      id: Date.now(),
      x: enemyX,
      y: 2,
      direction: 'down',
      color: 'red',
      speed: 0.5 + Math.random() * 0.5 // 随机速度
    };

    setGameState(prev => ({
      ...prev,
      enemies: [...prev.enemies, newEnemy]
    }));
  };

  // 游戏主循环
  const gameLoop = () => {
    if (gameState.gameOver) return;

    setGameState(prev => {
      // 移动玩家
      let newPlayer = { ...prev.player };
      // 使用局部keys变量以确保获取最新状态
      const currentKeys = keys;
      
      if (currentKeys['ArrowUp']) {
        newPlayer.direction = 'up';
        const newY = newPlayer.y - 1;
        if (canMoveTo(newPlayer.x, newY, prev.obstacles, prev.enemies)) {
          newPlayer.y = newY;
        }
      }
      if (currentKeys['ArrowDown']) {
        newPlayer.direction = 'down';
        const newY = newPlayer.y + 1;
        if (canMoveTo(newPlayer.x, newY, prev.obstacles, prev.enemies)) {
          newPlayer.y = newY;
        }
      }
      if (currentKeys['ArrowLeft']) {
        newPlayer.direction = 'left';
        const newX = newPlayer.x - 1;
        if (canMoveTo(newX, newPlayer.y, prev.obstacles, prev.enemies)) {
          newPlayer.x = newX;
        }
      }
      if (currentKeys['ArrowRight']) {
        newPlayer.direction = 'right';
        const newX = newPlayer.x + 1;
        if (canMoveTo(newX, newPlayer.y, prev.obstacles, prev.enemies)) {
          newPlayer.x = newX;
        }
      }

      // 移动敌人
      const newEnemies = prev.enemies.map(enemy => {
        let newEnemy = { ...enemy };
        // 简单的敌人AI：向下移动，如果碰到障碍物则随机改变方向
        let moved = false;
        
        // 随机改变方向（10%的概率）
        if (Math.random() < 0.1) {
          const directions = ['up', 'down', 'left', 'right'];
          newEnemy.direction = directions[Math.floor(Math.random() * directions.length)];
        }

        // 尝试移动
        switch (newEnemy.direction) {
          case 'up':
            if (canMoveTo(newEnemy.x, newEnemy.y - 1, prev.obstacles, prev.enemies.filter(e => e.id !== enemy.id))) {
              newEnemy.y -= newEnemy.speed;
              moved = true;
            }
            break;
          case 'down':
            if (canMoveTo(newEnemy.x, newEnemy.y + 1, prev.obstacles, prev.enemies.filter(e => e.id !== enemy.id))) {
              newEnemy.y += newEnemy.speed;
              moved = true;
            }
            break;
          case 'left':
            if (canMoveTo(newEnemy.x - 1, newEnemy.y, prev.obstacles, prev.enemies.filter(e => e.id !== enemy.id))) {
              newEnemy.x -= newEnemy.speed;
              moved = true;
            }
            break;
          case 'right':
            if (canMoveTo(newEnemy.x + 1, newEnemy.y, prev.obstacles, prev.enemies.filter(e => e.id !== enemy.id))) {
              newEnemy.x += newEnemy.speed;
              moved = true;
            }
            break;
        }

        // 如果无法移动，则随机改变方向
        if (!moved && Math.random() < 0.3) {
          const directions = ['up', 'down', 'left', 'right'];
          newEnemy.direction = directions[Math.floor(Math.random() * directions.length)];
        }

        return newEnemy;
      });

      // 移动子弹
      let newBullets = prev.bullets.map(bullet => {
        let newBullet = { ...bullet };
        switch (bullet.direction) {
          case 'up':
            newBullet.y -= 2;
            break;
          case 'down':
            newBullet.y += 2;
            break;
          case 'left':
            newBullet.x -= 2;
            break;
          case 'right':
            newBullet.x += 2;
            break;
        }
        return newBullet;
      });

      // 移除超出边界的子弹
      newBullets = newBullets.filter(
        bullet => bullet.x >= 0 && bullet.x < BOARD_SIZE && bullet.y >= 0 && bullet.y < BOARD_SIZE
      );

      // 检测子弹碰撞
      let score = prev.score;
      let lives = prev.lives;
      let gameOver = prev.gameOver;

      // 检测子弹是否击中敌人或障碍物
      const bulletHits = [];
      const enemyHits = [];
      const obstacleHits = [];

      newBullets.forEach((bullet, bulletIndex) => {
        // 检查是否击中敌人
        newEnemies.forEach((enemy, enemyIndex) => {
          if (Math.abs(bullet.x - enemy.x) < 1 && Math.abs(bullet.y - enemy.y) < 1) {
            bulletHits.push(bulletIndex);
            enemyHits.push(enemyIndex);
            if (bullet.type === 'player') {
              score += 10;
            }
          }
        });

        // 检查是否击中障碍物
        prev.obstacles.forEach((obstacle, obstacleIndex) => {
          if (Math.abs(bullet.x - obstacle.x) < 0.5 && Math.abs(bullet.y - obstacle.y) < 0.5) {
            bulletHits.push(bulletIndex);
            obstacleHits.push(obstacleIndex);
          }
        });

        // 检查是否击中玩家
        if (bullet.type === 'enemy' && Math.abs(bullet.x - newPlayer.x) < 1 && Math.abs(bullet.y - newPlayer.y) < 1) {
          bulletHits.push(bulletIndex);
          lives -= 1;
          if (lives <= 0) {
            gameOver = true;
          }
        }
      });

      // 移除被击中的子弹、敌人和障碍物
      newBullets = newBullets.filter((_, index) => !bulletHits.includes(index));
      const remainingEnemies = newEnemies.filter((_, index) => !enemyHits.includes(index));
      const remainingObstacles = prev.obstacles.filter((_, index) => !obstacleHits.includes(index));

      // 检测玩家与敌人的碰撞
      for (const enemy of remainingEnemies) {
        if (Math.abs(newPlayer.x - enemy.x) < 1 && Math.abs(newPlayer.y - enemy.y) < 1) {
          lives -= 1;
          if (lives <= 0) {
            gameOver = true;
          }
          break;
        }
      }

      // 检查升级条件
      let level = prev.level;
      if (score >= level * 100) {
        level += 1;
        // 提高游戏难度：增加敌人速度
        const fasterEnemies = remainingEnemies.map(enemy => ({
          ...enemy,
          speed: Math.min(enemy.speed + 0.1, 1.5)
        }));
        return {
          ...prev,
          player: newPlayer,
          enemies: fasterEnemies,
          bullets: newBullets,
          obstacles: remainingObstacles,
          score,
          lives,
          gameOver,
          level
        };
      }

      return {
        ...prev,
        player: newPlayer,
        enemies: remainingEnemies,
        bullets: newBullets,
        obstacles: remainingObstacles,
        score,
        lives,
        gameOver,
        level
      };
    });
  };

  // 检查是否可以移动到指定位置
  const canMoveTo = (x, y, obstacles, enemies) => {
    // 检查边界 - 允许在边界内移动
    if (x < 0 || x >= BOARD_SIZE || y < 0 || y >= BOARD_SIZE) {
      return false;
    }
    
    // 检查障碍物 - 使用更宽松的碰撞检测
    for (const obstacle of obstacles) {
      if (Math.floor(x) === obstacle.x && Math.floor(y) === obstacle.y) {
        return false;
      }
    }
    
    // 检查敌人 - 避免与敌人重叠
    for (const enemy of enemies) {
      if (Math.floor(x) === Math.floor(enemy.x) && Math.floor(y) === Math.floor(enemy.y)) {
        return false;
      }
    }
    
    return true;
  };

  // 处理键盘事件
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState.gameOver) return;

      setKeys(prev => ({ ...prev, [e.key]: true }));
      
      // 空格键发射子弹
      if (e.key === ' ') {
        const bullet = {
          x: gameState.player.x,
          y: gameState.player.y,
          direction: gameState.player.direction,
          type: 'player'
        };
        setGameState(prev => ({ ...prev, bullets: [...prev.bullets, bullet] }));
      }
    };

    const handleKeyUp = (e) => {
      setKeys(prev => ({ ...prev, [e.key]: false }));
    };

    // 确保键盘事件监听器正确附加
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // 为游戏区域添加tabIndex使其可获取焦点
    const gameContainer = document.querySelector('.tank-game');
    if (gameContainer) {
      gameContainer.tabIndex = 0;
      // 自动聚焦到游戏区域
      gameContainer.focus();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState.player, gameState.gameOver]);

  // 渲染游戏格子
  const renderBoard = () => {
    const cells = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        let cellClass = 'tank-cell';
        let cellContent = null;

        // 检查是否有障碍物
        if (gameState.obstacles.some(obs => obs.x === x && obs.y === y)) {
          cellClass += ' obstacle';
        }

        // 检查是否有坦克（玩家或敌人）
        if (Math.round(gameState.player.x) === x && Math.round(gameState.player.y) === y) {
          cellContent = (
            <div className={`tank player ${gameState.player.direction}`}></div>
          );
        } else {
          const enemyAtPosition = gameState.enemies.find(enemy => 
            Math.round(enemy.x) === x && Math.round(enemy.y) === y
          );
          if (enemyAtPosition) {
            cellContent = (
              <div className={`tank enemy ${enemyAtPosition.direction}`}></div>
            );
          }
        }

        // 检查是否有子弹
        const bulletAtPosition = gameState.bullets.find(bullet => 
          Math.round(bullet.x) === x && Math.round(bullet.y) === y
        );
        if (bulletAtPosition) {
          cellContent = (
            <div className={`bullet ${bulletAtPosition.direction} ${bulletAtPosition.type}`}></div>
          );
        }

        cells.push(
          <div key={`${x}-${y}`} className={cellClass}>
            {cellContent}
          </div>
        );
      }
    }
    return cells;
  };

  return (
    <div className="tank-game">
      <h2>坦克大战</h2>
      
      {/* 游戏状态显示 */}
      <div className="game-stats">
        <div className="stat-item">得分: {gameState.score}</div>
        <div className="stat-item">生命: {gameState.lives}</div>
        <div className="stat-item">等级: {gameState.level}</div>
      </div>

      {/* 游戏控制说明 */}
      <div className="game-controls">
        <p>使用方向键移动坦克，空格键发射子弹</p>
      </div>

      {/* 游戏主界面 */}
      <div className="game-board">
        {/* 游戏棋盘 */}
        <div className="tank-board" style={{ 
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 30px)`,
          gridTemplateRows: `repeat(${BOARD_SIZE}, 30px)`
        }}>
          {renderBoard()}
        </div>
      </div>

      {/* 游戏结束界面 */}
      {gameState.gameOver && (
        <div className="game-over">
          <h3>游戏结束!</h3>
          <p>最终得分: {gameState.score}</p>
          <button className="reset-btn" onClick={resetGame}>
            重新开始
          </button>
        </div>
      )}
    </div>
  );
};

export default TankGame;