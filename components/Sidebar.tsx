import React from 'react';
import type { Tool } from '../types';
import { HIT_REWARD, TOOLS } from '../constants';

interface SidebarProps {
    hitCount: number;
    coins: number;
    selectedTool: Tool;
    onToolSelect: (tool: Tool) => void;
    onRestart: () => void;
    strength: number;
    onStrengthChange: (strength: number) => void;
    onResetEffects: () => void;
}

const ToolBox: React.FC<{ coins: number, selectedTool: Tool, onToolSelect: (tool: Tool) => void }> = ({ coins, selectedTool, onToolSelect }) => (
    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold mb-3 text-yellow-400 flex justify-between items-center">
            工具箱
            <span className="text-sm font-normal text-yellow-200 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 5a.5.5 0 01.5.5v2.293l1.146-1.147a.5.5 0 11.708.708L9.172 8.5H11.5a.5.5 0 010 1H9.172l1.178 1.178a.5.5 0 11-.708.708L8.5 9.207V11.5a.5.5 0 01-1 0V9.207l-1.146 1.147a.5.5 0 11-.708-.708L6.828 8.5H4.5a.5.5 0 010-1h2.328L5.65 6.322a.5.5 0 11.708-.708L7.5 6.793V4.5A.5.5 0 018 4z" /></svg>
                {coins}
            </span>
        </h3>
        <div className="grid grid-cols-3 gap-2">
            {TOOLS.map((tool) => (
                <button
                    key={tool.id}
                    onClick={() => onToolSelect(tool)}
                    className={`p-2 aspect-square flex flex-col items-center justify-center rounded-md transition-all duration-200
                        ${selectedTool.id === tool.id ? 'bg-yellow-500 text-gray-900 ring-2 ring-yellow-300' : 'bg-gray-700 hover:bg-gray-600'}
                    `}
                    title={tool.name}
                >
                    <span className="text-2xl">{tool.icon}</span>
                    <span className="text-xs mt-1">{tool.name}</span>
                </button>
            ))}
        </div>
        <p className="text-xs text-center text-gray-400 mt-3">所有工具已解锁! 尽情使用!</p>
    </div>
);

const StrengthControl: React.FC<{ strength: number, onStrengthChange: (s: number) => void, onResetEffects: () => void }> = ({ strength, onStrengthChange, onResetEffects }) => (
    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 space-y-3">
        <div className="flex justify-between items-center text-sm">
            <label htmlFor="strength-slider" className="font-medium text-gray-300">强度</label>
            <span className="font-mono text-yellow-400">{strength}</span>
        </div>
        <input
            id="strength-slider"
            type="range"
            min="1"
            max="100"
            value={strength}
            onChange={(e) => onStrengthChange(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg"
        />
        <button
            onClick={onResetEffects}
            className="w-full bg-blue-600/50 hover:bg-blue-600/80 text-blue-100 font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
        >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M15.312 1.312a2.25 2.25 0 0 1 3.182 3.182L5.857 19.13a2.25 2.25 0 0 1-3.182-3.182L15.312 1.312ZM17.39 3.39a.75.75 0 0 1 0 1.06L5.123 16.717a.75.75 0 1 1-1.06-1.06L16.33 3.39a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
            </svg>
            重置效果
        </button>
    </div>
);


const StatsAndRewards: React.FC<{ hitCount: number, coins: number }> = ({ hitCount, coins }) => {
    const progress = Math.min((hitCount / 10) * 100, 100);
    return (
        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold mb-3 text-yellow-400">进度统计</h3>
            <div className="text-center mb-4">
                <p className="text-5xl font-bold text-yellow-300">{hitCount}</p>
                <p className="text-sm text-gray-300">总打击次数</p>
            </div>
            
            <div className="space-y-3">
                <div>
                    <div className="flex justify-between text-xs text-gray-300 mb-1">
                        <span>进度</span>
                        <span>{hitCount}/10</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-2">下一个里程碑: 第一击</p>
                </div>
                
                <div className="border-t border-gray-700 pt-3">
                     <h3 className="text-md font-semibold mb-2 text-yellow-400">奖励</h3>
                     <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-300">当前出价:</span>
                            <span className="font-bold text-yellow-300 flex items-center">
                                {coins}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-300">每次奖励:</span>
                            <span className="font-bold text-green-400">+{HIT_REWARD} 金币</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export const Sidebar: React.FC<SidebarProps> = ({ hitCount, coins, selectedTool, onToolSelect, onRestart, strength, onStrengthChange, onResetEffects }) => {
    return (
        <aside className="w-full md:w-80 flex-shrink-0 space-y-4 bg-[#1f2937]/80 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
            <ToolBox coins={coins} selectedTool={selectedTool} onToolSelect={onToolSelect} />
            <StrengthControl strength={strength} onStrengthChange={onStrengthChange} onResetEffects={onResetEffects}/>
            <StatsAndRewards hitCount={hitCount} coins={coins} />
            <button
                onClick={onRestart}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                重新开始
            </button>
        </aside>
    );
};