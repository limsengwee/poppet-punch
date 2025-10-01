import React from 'react';

interface HeaderProps {
    coins: number;
}

const CoinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 5a.5.5 0 01.5.5v2.293l1.146-1.147a.5.5 0 11.708.708L9.172 8.5H11.5a.5.5 0 010 1H9.172l1.178 1.178a.5.5 0 11-.708.708L8.5 9.207V11.5a.5.5 0 01-1 0V9.207l-1.146 1.147a.5.5 0 11-.708-.708L6.828 8.5H4.5a.5.5 0 010-1h2.328L5.65 6.322a.5.5 0 11.708-.708L7.5 6.793V4.5A.5.5 0 018 4z" />
    </svg>
);

export const Header: React.FC<HeaderProps> = ({ coins }) => {
    return (
        <header className="bg-gray-900/50 backdrop-blur-sm p-4 flex justify-between items-center border-b border-gray-700/50">
            <h1 className="text-2xl font-bold text-yellow-300 tracking-wider">
                打小人! Poppet Punch!
            </h1>
            <div className="bg-yellow-500/10 border border-yellow-400/50 text-yellow-300 text-sm font-semibold px-4 py-2 rounded-full flex items-center">
                <CoinIcon />
                {coins} Coins
            </div>
        </header>
    );
};