import React, { useState, useEffect, useRef } from 'react';
import './SnakeGame.css';

const SnakeGame = () => {
  const BOARD_SIZE = 20;
  const [snake, setSnake] = useState([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('right');
  const [nextDirection, setNextDirection] = useState('right');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(150);
  const gameLoopRef = useRef(null);

  // 生成随机食物位置
  const generateFood = () => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  };

  // 移动蛇
  const moveSnake = () => {
    if (gameOver) return;

    // 更新方向
    setDirection(nextDirection);

    // 获取蛇头位置
    const head = { ...snake[0] };

    // 根据方向移动蛇头
    switch (nextDirection) {
      case 'up':
        head.y -= 1;
        break;
      case 'down':
        head.y += 1;
        break;
      case 'left':
        head.x -= 1;
        break;
      case 'right':
        head.x += 1;
        break;
      default:
        break;
    }

    // 检查是否碰到墙壁或自己
    if (
      head.x < 0 || head.x >= BOARD_SIZE ||
      head.y < 0 || head.y >= BOARD_SIZE ||
      snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
      setGameOver(true);
      return;
    }

    // 检查是否吃到食物
    const newSnake = [head, ...snake];
    if (head.x === food.x && head.y === food.y) {
      // 吃到食物，不删除尾部
      setFood(generateFood());
      setScore(prevScore => prevScore + 10);
      // 随着分数增加，速度变快
      setSpeed(prevSpeed => Math.max(50, prevSpeed - 5));
    } else {
      // 没吃到食物，删除尾部
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  // 处理键盘输入
  const handleKeyDown = (e) => {
    if (gameOver) return;

    switch (e.key) {
      case 'ArrowUp':
        if (direction !== 'down') {
          setNextDirection('up');
        }
        break;
      case 'ArrowDown':
        if (direction !== 'up') {
          setNextDirection('down');
        }
        break;
      case 'ArrowLeft':
        if (direction !== 'right') {
          setNextDirection('left');
        }
        break;
      case 'ArrowRight':
        if (direction !== 'left') {
          setNextDirection('right');
        }
        break;
      case ' ': // 空格键重新开始
        if (gameOver) {
          resetGame();
        }
        break;
      default:
        break;
    }
  };

  // 重置游戏
  const resetGame = () => {
    setSnake([
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ]);
    setFood(generateFood());
    setDirection('right');
    setNextDirection('right');
    setGameOver(false);
    setScore(0);
    setSpeed(150);
  };

  // 游戏循环
  useEffect(() => {
    // 添加键盘事件监听
    window.addEventListener('keydown', handleKeyDown);

    // 设置游戏循环
    gameLoopRef.current = setInterval(moveSnake, speed);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameOver, speed, direction, nextDirection, snake, food]);

  // 当速度改变时，更新游戏循环
  useEffect(() => {
    if (!gameOver && gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = setInterval(moveSnake, speed);
    }
  }, [speed]);

  // 绘制游戏板
  const renderBoard = () => {
    const cells = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        let cellClass = 'snake-cell';
        
        // 检查是否是蛇头
        if (x === snake[0].x && y === snake[0].y) {
          cellClass = 'snake-head';
        }
        // 检查是否是蛇身
        else if (snake.some(segment => segment.x === x && segment.y === y)) {
          cellClass = 'snake-body';
        }
        // 检查是否是食物
        else if (x === food.x && y === food.y) {
          cellClass = 'snake-food';
        }

        cells.push(
          <div key={`${x}-${y}`} className={cellClass}></div>
        );
      }
    }

    return (
      <div className="snake-board">
        {cells}
      </div>
    );
  };

  return (
    <div className="snake-game">
      <h3>贪吃蛇游戏</h3>
      <div className="game-stats">
        <p>分数: {score}</p>
        <p>速度: {(200 - speed) / 5}</p>
      </div>
      {renderBoard()}
      {gameOver && (
        <div className="game-over">
          <h4>游戏结束!</h4>
          <p>最终得分: {score}</p>
          <button className="reset-btn" onClick={resetGame}>重新开始</button>
        </div>
      )}
      <div className="game-controls">
        <button 
          className="control-btn up-btn" 
          onClick={(e) => {
            e.preventDefault();
            if (direction !== 'down' && !gameOver) setNextDirection('up');
          }}
        >
          ↑
        </button>
        <div className="control-row">
          <button 
            className="control-btn left-btn" 
            onClick={(e) => {
              e.preventDefault();
              if (direction !== 'right' && !gameOver) setNextDirection('left');
            }}
          >
            ←
          </button>
          <button 
            className="control-btn down-btn" 
            onClick={(e) => {
              e.preventDefault();
              if (direction !== 'up' && !gameOver) setNextDirection('down');
            }}
          >
            ↓
          </button>
          <button 
            className="control-btn right-btn" 
            onClick={(e) => {
              e.preventDefault();
              if (direction !== 'left' && !gameOver) setNextDirection('right');
            }}
          >
            →
          </button>
        </div>
      </div>
      <div className="game-instructions">
        <h4>游戏操作：</h4>
        <ul>
          <li>使用方向键或屏幕按钮控制蛇的移动</li>
          <li>吃到食物会增加长度和分数</li>
          <li>碰到墙壁或自己的身体游戏结束</li>
          <li>分数越高，蛇的移动速度越快</li>
        </ul>
      </div>
    </div>
  );
};

export default SnakeGame;