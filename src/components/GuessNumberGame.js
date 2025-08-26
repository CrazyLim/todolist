import React, { useState, useEffect } from 'react';
import './GuessNumberGame.css';

const GuessNumberGame = () => {
  // 游戏状态
  const [targetNumber, setTargetNumber] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [history, setHistory] = useState([]);

  // 初始化游戏
  useEffect(() => {
    startNewGame();
  }, []);

  // 开始新游戏
  const startNewGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1); // 生成1-100的随机数
    setUserGuess('');
    setMessage('请输入1-100之间的数字进行猜测');
    setAttempts(0);
    setGameOver(false);
    setHistory([]);
  };

  // 处理猜测
  const handleGuess = () => {
    if (gameOver) return;

    const guess = parseInt(userGuess);

    // 验证输入
    if (isNaN(guess) || guess < 1 || guess > 100) {
      setMessage('请输入有效的1-100之间的数字');
      return;
    }

    // 更新尝试次数和历史记录
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setHistory([...history, guess]);

    // 检查猜测结果
    if (guess === targetNumber) {
      setMessage(`恭喜你猜对了！答案就是${targetNumber}，你用了${newAttempts}次尝试。`);
      setGameOver(true);
    } else if (guess < targetNumber) {
      setMessage('猜小了，再试一次');
    } else {
      setMessage('猜大了，再试一次');
    }

    setUserGuess('');
  };

  // 处理回车键
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGuess();
    }
  };

  return (
    <div className="guess-number-game">
      <h2>猜数字游戏</h2>
      <div className="game-info">
        <p>{message}</p>
        <p>尝试次数: {attempts}</p>
        {history.length > 0 && (
          <p>历史猜测: {history.join(', ')}</p>
        )}
      </div>
      <div className="game-controls">
        <input
          type="number"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="输入猜测的数字"
          disabled={gameOver}
        />
        <button onClick={handleGuess} disabled={gameOver}>猜测</button>
        <button onClick={startNewGame}>重新开始</button>
      </div>
    </div>
  );
};

export default GuessNumberGame;