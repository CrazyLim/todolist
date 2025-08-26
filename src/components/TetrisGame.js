import React, { useState, useEffect, useRef } from 'react';
import './TetrisGame.css';

// 定义俄罗斯方块的形状
const SHAPES = {
  I: [
    [1, 1, 1, 1]
  ],
  O: [
    [1, 1],
    [1, 1]
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1]
  ],
  L: [
    [1, 0, 0],
    [1, 1, 1]
  ],
  J: [
    [0, 0, 1],
    [1, 1, 1]
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1]
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0]
  ]
};

// 定义颜色
const COLORS = {
  I: '#00FFFF',
  O: '#FFFF00',
  T: '#800080',
  L: '#FFA500',
  J: '#0000FF',
  Z: '#FF0000',
  S: '#00FF00',
  empty: '#CCCCCC'
};

// 旋转矩阵
const rotateMatrix = (matrix) => {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const rotated = Array(cols).fill().map(() => Array(rows).fill(0));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      rotated[j][rows - 1 - i] = matrix[i][j];
    }
  }

  return rotated;
};

const TetrisGame = () => {
  const BOARD_WIDTH = 10;
  const BOARD_HEIGHT = 20;
  const [board, setBoard] = useState(Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0)));
  const [currentPiece, setCurrentPiece] = useState(null);
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameLoopRef = useRef(null);
  const [level, setLevel] = useState(1);

  // 生成新方块
  const generateNewPiece = () => {
    const shapeKeys = Object.keys(SHAPES);
    const randomShapeKey = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
    const shape = SHAPES[randomShapeKey];

    return {
      shape,
      type: randomShapeKey,
      color: COLORS[randomShapeKey]
    };
  };

  // 初始化游戏
  const initializeGame = () => {
    const newBoard = Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0));
    setBoard(newBoard);
    setCurrentPiece(generateNewPiece());
    setCurrentPosition({ x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 });
    setScore(0);
    setGameOver(false);
    setLevel(1);
  };

  // 检查碰撞
  const checkCollision = (piece, position) => {
    const { shape } = piece;
    const { x, y } = position;

    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j]) {
          const boardX = x + j;
          const boardY = y + i;

          if (
            boardX < 0 ||
            boardX >= BOARD_WIDTH ||
            boardY >= BOARD_HEIGHT ||
            (boardY >= 0 && board[boardY][boardX])
          ) {
            return true;
          }
        }
      }
    }

    return false;
  };

  // 合并方块到游戏板
  const mergePieceToBoard = () => {
    const newBoard = JSON.parse(JSON.stringify(board));
    const { shape } = currentPiece;
    const { x, y } = currentPosition;

    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j]) {
          const boardX = x + j;
          const boardY = y + i;

          if (boardY >= 0) {
            newBoard[boardY][boardX] = currentPiece.type;
          }
        }
      }
    }

    return newBoard;
  };

  // 清除完整行
  const clearCompleteLines = (newBoard) => {
    let linesCleared = 0;
    const updatedBoard = newBoard.filter(row => {
      if (row.every(cell => cell !== 0)) {
        linesCleared++;
        return false;
      }
      return true;
    });

    // 在顶部添加新的空行
    while (updatedBoard.length < BOARD_HEIGHT) {
      updatedBoard.unshift(Array(BOARD_WIDTH).fill(0));
    }

    // 更新分数
    if (linesCleared > 0) {
      setScore(prevScore => prevScore + linesCleared * 100 * level);
      // 每获得1000分升级
      if (score + linesCleared * 100 * level >= level * 1000) {
        setLevel(prevLevel => prevLevel + 1);
      }
    }

    return updatedBoard;
  };

  // 移动方块
  const movePiece = (dx, dy) => {
    if (gameOver || !currentPiece) return;

    const newPosition = {
      x: currentPosition.x + dx,
      y: currentPosition.y + dy
    };

    if (!checkCollision(currentPiece, newPosition)) {
      setCurrentPosition(newPosition);
      return true;
    } else if (dy > 0) {
      // 无法下移，合并方块到游戏板
      const newBoard = mergePieceToBoard();
      const clearedBoard = clearCompleteLines(newBoard);
      setBoard(clearedBoard);

      // 生成新方块
      const newPiece = generateNewPiece();
      const newPiecePosition = { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 };

      // 检查游戏是否结束
      if (checkCollision(newPiece, newPiecePosition)) {
        setGameOver(true);
        clearInterval(gameLoopRef.current);
      } else {
        setCurrentPiece(newPiece);
        setCurrentPosition(newPiecePosition);
      }
      return false;
    }

    return false;
  };

  // 旋转方块
  const rotatePiece = () => {
    if (gameOver || !currentPiece) return;

    const rotatedShape = rotateMatrix(currentPiece.shape);
    const rotatedPiece = {
      ...currentPiece,
      shape: rotatedShape
    };

    if (!checkCollision(rotatedPiece, currentPosition)) {
      setCurrentPiece(rotatedPiece);
    }
  };

  // 快速下落
  const hardDrop = () => {
    if (gameOver) return;

    let dropped = false;
    while (!dropped) {
      dropped = !movePiece(0, 1);
    }
  };

  // 处理键盘输入
  const handleKeyDown = (e) => {
    // 阻止默认行为，避免浏览器滚动等干扰
    e.preventDefault();

    if (gameOver) {
      if (e.key === ' ') {
        initializeGame();
      }
      return;
    }

    // 添加调试日志，查看键盘事件是否被捕获
    console.log('Key pressed:', e.key);

    switch (e.key) {
      case 'ArrowLeft':
        movePiece(-1, 0);
        break;
      case 'ArrowRight':
        movePiece(1, 0);
        break;
      case 'ArrowDown':
        movePiece(0, 1);
        break;
      case 'ArrowUp':
        rotatePiece();
        break;
      case ' ':
        hardDrop();
        break;
      default:
        break;
    }
  };

  // 游戏循环
  useEffect(() => {
    initializeGame();
    const handleKeyDownWrapper = (e) => {
      handleKeyDown(e);
    };
    // 在document上监听键盘事件，确保游戏始终能捕获键盘输入
    document.addEventListener('keydown', handleKeyDownWrapper);

    return () => {
      document.removeEventListener('keydown', handleKeyDownWrapper);
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, []);

  // 游戏速度控制
  useEffect(() => {
    if (gameOver) return;

    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }

    const speed = 1000 - (level - 1) * 100;
    gameLoopRef.current = setInterval(() => {
      movePiece(0, 1);
    }, Math.max(100, speed));

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameOver, level]);

  // 渲染游戏板
  const renderBoard = () => {
    // 创建一个临时游戏板，包含当前方块
    const tempBoard = JSON.parse(JSON.stringify(board));

    if (currentPiece && !gameOver) {
      const { shape } = currentPiece;
      const { x, y } = currentPosition;

      for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
          if (shape[i][j]) {
            const boardX = x + j;
            const boardY = y + i;

            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              tempBoard[boardY][boardX] = currentPiece.type;
            }
          }
        }
      }
    }

    return (
      <div className="tetris-board">
        {tempBoard.map((row, rowIndex) => (
          <div key={rowIndex} className="tetris-row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className="tetris-cell"
                style={{ backgroundColor: cell ? COLORS[cell] : COLORS.empty }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // 渲染下一个方块预览
  const renderNextPiece = () => {
    if (!currentPiece || gameOver) return null;

    // 生成下一个方块预览
    const nextPiece = generateNewPiece();
    const { shape, color } = nextPiece;

    return (
      <div className="next-piece">
        <h4>下一个方块</h4>
        <div className="next-piece-container">
          {shape.map((row, rowIndex) => (
            <div key={rowIndex} className="tetris-row">
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className="tetris-cell"
                  style={{ backgroundColor: cell ? color : COLORS.empty }}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="tetris-game">
      <h3>俄罗斯方块</h3>
      <div className="game-info">
        <div className="score-display">
          <p>分数: {score}</p>
          <p>等级: {level}</p>
        </div>
        {renderNextPiece()}
      </div>
      {renderBoard()}
      {gameOver && (
        <div className="game-over">
          <h4>游戏结束!</h4>
          <p>最终得分: {score}</p>
          <button className="reset-btn" onClick={initializeGame}>重新开始</button>
        </div>
      )}
      <div className="game-controls">
        <h4>操作说明:</h4>
        <ul>
          <li>← → 键: 左右移动</li>
          <li>↑ 键: 旋转</li>
          <li>↓ 键: 下移</li>
          <li>空格键: 直接落下</li>
        </ul>
      </div>
    </div>
  );
};

export default TetrisGame;