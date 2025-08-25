import React, { useState, useEffect } from 'react';
import './GomokuGame.css';

const GomokuGame = () => {
  const BOARD_SIZE = 15;
  const [board, setBoard] = useState(Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('black');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [gameMode, setGameMode] = useState('player'); // 'player', 'ai', 'tourist'
  const [gameStarted, setGameStarted] = useState(false);
  const [waitingForTourist, setWaitingForTourist] = useState(false);
  const [playerRole, setPlayerRole] = useState('black'); // 当前玩家的角色，用于游客模式

  // 检查获胜条件
  const checkWin = (row, col, currentBoard = board, player = currentPlayer) => {
    const directions = [
      [0, 1],  // 水平
      [1, 0],  // 垂直
      [1, 1],  // 对角线
      [1, -1]  // 反对角线
    ];

    for (const [dx, dy] of directions) {
      let count = 1;
      // 向一个方向检查
      for (let i = 1; i <= 4; i++) {
        const newRow = row + i * dx;
        const newCol = col + i * dy;
        if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE && 
            currentBoard[newRow][newCol] === player) {
          count++;
        } else {
          break;
        }
      }
      // 向相反方向检查
      for (let i = 1; i <= 4; i++) {
        const newRow = row - i * dx;
        const newCol = col - i * dy;
        if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE && 
            currentBoard[newRow][newCol] === player) {
          count++;
        } else {
          break;
        }
      }
      // 五子连珠
      if (count >= 5) {
        return true;
      }
    }
    return false;
  };

  // AI落子逻辑 - 简单的AI实现
  const aiMove = () => {
    // 复制当前棋盘状态
    const currentBoard = board.map(r => [...r]);
    
    // 1. 优先检查是否能获胜
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (currentBoard[row][col] === null) {
          currentBoard[row][col] = 'white'; // AI是白方
          if (checkWin(row, col, currentBoard, 'white')) {
            handleAiCellClick(row, col);
            return;
          }
          currentBoard[row][col] = null; // 恢复状态
        }
      }
    }
    
    // 2. 检查是否需要阻止玩家获胜
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (currentBoard[row][col] === null) {
          currentBoard[row][col] = 'black'; // 玩家是黑方
          if (checkWin(row, col, currentBoard, 'black')) {
            handleAiCellClick(row, col);
            return;
          }
          currentBoard[row][col] = null; // 恢复状态
        }
      }
    }
    
    // 3. 在中心区域随机选择一个位置落子
    const centerArea = [];
    for (let row = 4; row < 11; row++) {
      for (let col = 4; col < 11; col++) {
        if (currentBoard[row][col] === null) {
          centerArea.push({row, col});
        }
      }
    }
    
    if (centerArea.length > 0) {
      const randomMove = centerArea[Math.floor(Math.random() * centerArea.length)];
      handleAiCellClick(randomMove.row, randomMove.col);
      return;
    }
    
    // 4. 在任意空位随机落子
    const emptyCells = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (currentBoard[row][col] === null) {
          emptyCells.push({row, col});
        }
      }
    }
    
    if (emptyCells.length > 0) {
      const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      handleAiCellClick(randomMove.row, randomMove.col);
    }
  };

  // AI落子处理函数
  const handleAiCellClick = (row, col) => {
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = 'white'; // AI始终是白方
    setBoard(newBoard);

    if (checkWin(row, col, newBoard, 'white')) {
      setGameOver(true);
      setWinner('white');
    } else {
      setCurrentPlayer('black'); // 轮到玩家（黑方）
    }
  };

  // 处理落子
  const handleCellClick = (row, col) => {
    // 检查游戏是否结束或位置已被占用
    if (gameOver || board[row][col] !== null) return;
    
    // 游客模式下，确保当前是玩家的回合
    if (gameMode === 'tourist' && currentPlayer !== playerRole) return;

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    if (checkWin(row, col, newBoard)) {
      setGameOver(true);
      setWinner(currentPlayer);
    } else {
      // 根据游戏模式决定下一步
      if (gameMode === 'ai' && currentPlayer === 'black') {
        // AI模式下，玩家（黑方）落子后，AI（白方）自动落子
        // 不立即设置currentPlayer为white，而是在aiMove执行后由handleAiCellClick设置
        // 这样可以确保黑子正确显示
        setTimeout(() => aiMove(), 500);
      } else if (gameMode === 'tourist') {
        // 游客模式下，模拟游客落子
        const nextPlayer = currentPlayer === 'black' ? 'white' : 'black';
        setCurrentPlayer(nextPlayer);
        if (nextPlayer !== playerRole) {
          // 延迟游客落子
          setTimeout(() => simulateTouristMove(), 800);
        }
      } else {
        // 玩家对战模式
        setCurrentPlayer(currentPlayer === 'black' ? 'white' : 'black');
      }
    }
  };

  // 模拟游客落子（简化版）
  const simulateTouristMove = () => {
    if (gameOver) return;
    
    const emptyCells = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (board[row][col] === null) {
          emptyCells.push({row, col});
        }
      }
    }
    
    if (emptyCells.length > 0) {
      // 简单的游客AI逻辑，优先在已有棋子附近落子
      const adjacentCells = [];
      const randomCells = [];
      
      // 检查是否有棋子在周围
      for (const {row, col} of emptyCells) {
        let hasAdjacent = false;
        for (let dr = -2; dr <= 2; dr++) {
          for (let dc = -2; dc <= 2; dc++) {
            if (dr === 0 && dc === 0) continue;
            const r = row + dr;
            const c = col + dc;
            if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c] !== null) {
              hasAdjacent = true;
              break;
            }
          }
          if (hasAdjacent) break;
        }
        
        if (hasAdjacent) {
          adjacentCells.push({row, col});
        } else {
          randomCells.push({row, col});
        }
      }
      
      // 优先选择有相邻棋子的位置
      const targetCells = adjacentCells.length > 0 ? adjacentCells : randomCells;
      const randomMove = targetCells[Math.floor(Math.random() * targetCells.length)];
      
      const newBoard = board.map(r => [...r]);
      newBoard[randomMove.row][randomMove.col] = currentPlayer;
      setBoard(newBoard);
      
      if (checkWin(randomMove.row, randomMove.col, newBoard)) {
        setGameOver(true);
        setWinner(currentPlayer);
      } else {
        setCurrentPlayer(currentPlayer === 'black' ? 'white' : 'black');
      }
    }
  };

  // 重置游戏
  const resetGame = () => {
    setBoard(Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(null)));
    setCurrentPlayer('black');
    setGameOver(false);
    setWinner(null);
    setGameStarted(false);
    setWaitingForTourist(false);
  };

  // 开始游戏
  const startGame = (mode) => {
    setGameMode(mode);
    setGameStarted(true);
    setBoard(Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(null)));
    setCurrentPlayer('black');
    setGameOver(false);
    setWinner(null);
    
    // 游客模式下，随机分配玩家角色
    if (mode === 'tourist') {
      setPlayerRole(Math.random() > 0.5 ? 'black' : 'white');
      setWaitingForTourist(true);
      // 模拟游客加入
      setTimeout(() => {
        setWaitingForTourist(false);
        // 如果玩家是白方，游客（黑方）先行
        if (playerRole === 'white') {
          setTimeout(() => simulateTouristMove(), 500);
        }
      }, 1500);
    }
  };

  // 绘制棋盘
  const renderBoard = () => {
    return (
      <div className="gomoku-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="gomoku-row">
            {row.map((cell, colIndex) => (
              <div 
                key={colIndex} 
                className="gomoku-cell"
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell && <div className={`gomoku-stone ${cell}`}></div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // 显示游戏模式选择
  const renderGameModeSelection = () => {
    return (
      <div className="game-mode-selection">
        <h3>选择游戏模式</h3>
        <div className="mode-buttons">
          <button onClick={() => startGame('player')} className="mode-btn">
            双人对战
          </button>
          <button onClick={() => startGame('ai')} className="mode-btn">
            与电脑对战
          </button>
          <button onClick={() => startGame('tourist')} className="mode-btn">
            与游客对战
          </button>
        </div>
      </div>
    );
  };

  // 获取当前游戏信息显示
  const getGameInfoText = () => {
    if (gameOver) {
      return `游戏结束！获胜方: ${winner === 'black' ? '黑方' : '白方'}`;
    }
    
    if (waitingForTourist) {
      return '等待游客加入...';
    }
    
    if (gameMode === 'ai') {
      return currentPlayer === 'black' ? '你的回合（黑方）' : '电脑思考中...';
    }
    
    if (gameMode === 'tourist') {
      if (currentPlayer === playerRole) {
        return '你的回合';
      } else {
        return '游客思考中...';
      }
    }
    
    return `当前回合: ${currentPlayer === 'black' ? '黑方' : '白方'}`;
  };

  return (
    <div className="gomoku-game">
      {!gameStarted ? (
        renderGameModeSelection()
      ) : (
        <>
          <h3>五子棋游戏</h3>
          <div className="game-header">
            <p className="game-info">
              {getGameInfoText()}
            </p>
            {gameMode === 'tourist' && (
              <p className="player-role">
                你是：{playerRole === 'black' ? '黑方' : '白方'}
              </p>
            )}
          </div>
          {renderBoard()}
          <button className="reset-btn" onClick={resetGame}>重新开始</button>
          <div className="game-rules">
            <h4>游戏规则：</h4>
            <ol>
              <li>黑方先行，双方轮流在棋盘上落子</li>
              <li>先在横、竖或对角线方向连成五子的一方获胜</li>
              <li>点击棋盘上的交叉点落子</li>
            </ol>
          </div>
        </>
      )}
    </div>
  );
};

export default GomokuGame;