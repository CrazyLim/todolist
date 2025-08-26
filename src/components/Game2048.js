import React, { useState, useEffect, useCallback } from 'react';
import './Game2048.css';

const Game2048 = () => {
  // 游戏状态
  const [board, setBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  // 初始化游戏
  useEffect(() => {
    startNewGame();
  }, []);

  // 开始新游戏
  const startNewGame = () => {
    // 创建4x4的空棋盘
    const newBoard = Array(4).fill().map(() => Array(4).fill(0));
    // 添加两个初始数字
    addRandomNumber(newBoard);
    addRandomNumber(newBoard);
    // 更新状态
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
    setWon(false);
  };

  // 随机添加一个数字(2或4)
  const addRandomNumber = (currentBoard) => {
    const emptyCells = [];
    // 找出所有空单元格
    currentBoard.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 0) {
          emptyCells.push({ row: rowIndex, col: colIndex });
        }
      });
    });

    // 如果没有空单元格，游戏结束
    if (emptyCells.length === 0) {
      setGameOver(true);
      return currentBoard;
    }

    // 随机选择一个空单元格
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    // 90%概率生成2，10%概率生成4
    const value = Math.random() < 0.9 ? 2 : 4;
    // 在选定的单元格中添加数字
    currentBoard[randomCell.row][randomCell.col] = value;

    return currentBoard;
  };

  // 合并行
  const mergeRow = (row) => {
    // 过滤掉0
    const filteredRow = row.filter(cell => cell !== 0);
    let newRow = [];
    let scoreIncrease = 0;

    for (let i = 0; i < filteredRow.length; i++) {
      // 如果当前单元格和下一个单元格相同，则合并
      if (i + 1 < filteredRow.length && filteredRow[i] === filteredRow[i + 1]) {
        const mergedValue = filteredRow[i] * 2;
        newRow.push(mergedValue);
        scoreIncrease += mergedValue;
        i++;
        // 检查是否达到2048
        if (mergedValue === 2048) {
          setWon(true);
        }
      } else {
        newRow.push(filteredRow[i]);
      }
    }

    // 填充剩余位置为0
    while (newRow.length < 4) {
      newRow.push(0);
    }

    return { row: newRow, scoreIncrease };
  };

  // 处理移动
  const handleMove = (direction) => {
    if (gameOver || won) return;

    let newBoard = JSON.parse(JSON.stringify(board));
    let totalScoreIncrease = 0;
    let moved = false;

    switch (direction) {
      case 'left':
        for (let row = 0; row < 4; row++) {
          const { row: mergedRow, scoreIncrease } = mergeRow(newBoard[row]);
          if (JSON.stringify(newBoard[row]) !== JSON.stringify(mergedRow)) {
            moved = true;
          }
          newBoard[row] = mergedRow;
          totalScoreIncrease += scoreIncrease;
        }
        break;
      case 'right':
        for (let row = 0; row < 4; row++) {
          // 反转行，合并，然后再反转回来
          const reversedRow = newBoard[row].slice().reverse();
          const { row: mergedRow, scoreIncrease } = mergeRow(reversedRow);
          const finalRow = mergedRow.reverse();
          if (JSON.stringify(newBoard[row]) !== JSON.stringify(finalRow)) {
            moved = true;
          }
          newBoard[row] = finalRow;
          totalScoreIncrease += scoreIncrease;
        }
        break;
      case 'up':
        for (let col = 0; col < 4; col++) {
          // 提取列
          const column = [];
          for (let row = 0; row < 4; row++) {
            column.push(newBoard[row][col]);
          }
          // 合并列
          const { row: mergedColumn, scoreIncrease } = mergeRow(column);
          // 更新列
          let columnMoved = false;
          for (let row = 0; row < 4; row++) {
            if (newBoard[row][col] !== mergedColumn[row]) {
              columnMoved = true;
            }
            newBoard[row][col] = mergedColumn[row];
          }
          if (columnMoved) {
            moved = true;
          }
          totalScoreIncrease += scoreIncrease;
        }
        break;
      case 'down':
        for (let col = 0; col < 4; col++) {
          // 提取列并反转
          const column = [];
          for (let row = 0; row < 4; row++) {
            column.push(newBoard[row][col]);
          }
          const reversedColumn = column.reverse();
          // 合并列
          const { row: mergedColumn, scoreIncrease } = mergeRow(reversedColumn);
          // 反转回来并更新列
          const finalColumn = mergedColumn.reverse();
          let columnMoved = false;
          for (let row = 0; row < 4; row++) {
            if (newBoard[row][col] !== finalColumn[row]) {
              columnMoved = true;
            }
            newBoard[row][col] = finalColumn[row];
          }
          if (columnMoved) {
            moved = true;
          }
          totalScoreIncrease += scoreIncrease;
        }
        break;
      default:
        return;
    }

    // 如果有移动，则更新分数并添加新数字
    if (moved) {
      setScore(prevScore => prevScore + totalScoreIncrease);
      addRandomNumber(newBoard);
      setBoard(newBoard);

      // 检查游戏是否结束
      if (!canMove(newBoard)) {
        setGameOver(true);
      }
    }
  };

  // 检查是否还能移动
  const canMove = (currentBoard) => {
    // 检查是否有空单元格
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (currentBoard[row][col] === 0) {
          return true;
        }
      }
    }

    // 检查水平方向是否可以合并
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 3; col++) {
        if (currentBoard[row][col] === currentBoard[row][col + 1]) {
          return true;
        }
      }
    }

    // 检查垂直方向是否可以合并
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 3; row++) {
        if (currentBoard[row][col] === currentBoard[row + 1][col]) {
          return true;
        }
      }
    }

    return false;
  };

  // 键盘控制
  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'ArrowLeft':
        handleMove('left');
        break;
      case 'ArrowRight':
        handleMove('right');
        break;
      case 'ArrowUp':
        handleMove('up');
        break;
      case 'ArrowDown':
        handleMove('down');
        break;
      default:
        return;
    }
  }, [board, gameOver, won]);

  // 监听键盘事件
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="game-2048">
      <h2>2048游戏</h2>
      <div className="game-info">
        <p>分数: {score}</p>
        {won && <p className="win-message">恭喜你赢了！</p>}
        {gameOver && !won && <p className="game-over-message">游戏结束！</p>}
      </div>
      <div className="game-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((cell, colIndex) => (
              <div key={colIndex} className={`cell cell-${cell}`}>
                {cell !== 0 && cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="game-controls">
        <button onClick={startNewGame}>重新开始</button>
        <div className="direction-buttons">
          <button onClick={() => handleMove('up')} className="direction-btn">↑</button>
          <div className="horizontal-buttons">
            <button onClick={() => handleMove('left')} className="direction-btn">←</button>
            <button onClick={() => handleMove('right')} className="direction-btn">→</button>
          </div>
          <button onClick={() => handleMove('down')} className="direction-btn">↓</button>
        </div>
        <p className="control-hint">使用方向键或屏幕按钮移动数字</p>
      </div>
    </div>
  );
};

export default Game2048;