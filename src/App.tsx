import React, { useState } from 'react';

interface Record {
  id: number;
  time: number;
  rating: string;
}

const App: React.FC = () => {
  // 游戏状态
  const [gameState, setGameState] = useState<'waiting' | 'ready' | 'started' | 'finished'>('waiting');
  const [startTime, setStartTime] = useState<number>(0);
  const [reactionTime, setReactionTime] = useState<number>(0);
  const [records, setRecords] = useState<Record[]>([]);

  // 获取评价
  const getRating = (time: number): string => {
    if (time < 200) return "太厉害了 oioi！🔥";
    if (time < 400) return "不错嘛 oi😎";
    return "oioi！可以再练练喔～";
  };

  // 开始游戏
  const startGame = () => {
    if (gameState !== 'waiting') return;
    
    setGameState('ready');
    // 随机延迟 1-3 秒
    const delay = Math.random() * 2000 + 1000;
    
    setTimeout(() => {
      setStartTime(Date.now());
      setGameState('started');
    }, delay);
  };

  // 点击响应
  const handleClick = () => {
    switch (gameState) {
      case 'waiting':
        startGame();
        break;
      case 'ready':
        setGameState('waiting');
        alert('太快了oi！还没开始呢oi🤣');
        break;
      case 'started':
        const endTime = Date.now();
        const time = endTime - startTime;
        setReactionTime(time);
        setGameState('finished');
        
        // 添加新记录
        const newRecord: Record = {
          id: Date.now(),
          time: time,
          rating: getRating(time)
        };
        setRecords(prev => [...prev, newRecord].sort((a, b) => a.time - b.time));
        break;
      case 'finished':
        setGameState('waiting');
        break;
    }
  };

  // 重置记录
  const resetRecords = () => {
    setRecords([]);
  };

  // 获取按钮样式
  const getButtonStyles = () => {
    const baseStyles = "transform transition-all duration-300 hover:scale-105 text-white font-bold py-6 px-12 rounded-xl shadow-xl text-xl";
    
    switch (gameState) {
      case 'waiting':
        return `${baseStyles} bg-gradient-to-r from-blue-500 to-purple-500`;
      case 'ready':
        return `${baseStyles} bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse`;
      case 'started':
        return `${baseStyles} bg-gradient-to-r from-green-400 to-green-600 animate-bounce`;
      case 'finished':
        return `${baseStyles} bg-gradient-to-r from-pink-500 to-purple-500`;
    }
  };

  // 获取按钮文字
  const getButtonText = () => {
    switch (gameState) {
      case 'waiting':
        return '点击开始测试';
      case 'ready':
        return '准备...';
      case 'started':
        return '快点我！';
      case 'finished':
        return `${reactionTime}ms - 再来一次！`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* 标题 */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-12 tracking-tight">
          ⚡ 反应速度测试 Reaction Game
        </h1>

        {/* 游戏区域 */}
        <div className="flex flex-col items-center space-y-8">
          <button
            onClick={handleClick}
            className={getButtonStyles()}
          >
            {getButtonText()}
          </button>

          {gameState === 'finished' && (
            <div className="text-white text-xl font-semibold">
              {getRating(reactionTime)}
            </div>
          )}
        </div>

        {/* 记录表格 */}
        {records.length > 0 && (
          <div className="mt-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">📊 历史记录</h2>
              <button
                onClick={resetRecords}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
              >
                重置记录
              </button>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="py-4 px-6 text-left text-white">排名</th>
                    <th className="py-4 px-6 text-left text-white">反应时间(ms)</th>
                    <th className="py-4 px-6 text-left text-white">评价</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, index) => (
                    <tr key={record.id} className="border-b border-white/10 hover:bg-white/5">
                      <td className="py-4 px-6 text-white">{index + 1}</td>
                      <td className="py-4 px-6 text-white">{record.time}</td>
                      <td className="py-4 px-6 text-white">{record.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App; 