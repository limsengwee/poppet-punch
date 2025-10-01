import React from 'react';
import type { Tool } from './types';

const HandRaisedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75s.168-.75.375-.75.375.336.375.75Zm4.5 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Z" />
    </svg>
);

const MalletIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.82m5.84-2.56a16.5 16.5 0 0 0-1.18-1.041m-5.353 3.602a16.5 16.5 0 0 1-.82-1.631M15.12 12.47a16.5 16.5 0 0 1-5.23-1.282M11.96 9.127a16.516 16.516 0 0 1-3.414-.652m2.416-2.416a16.5 16.5 0 0 0-1.042-1.182m-1.182 1.042a16.522 16.522 0 0 1-1.632-.82m3.602-5.352a16.5 16.5 0 0 1-1.282-5.23M12.47 8.88a16.5 16.5 0 0 1-.652-3.414M9.127 11.96a16.516 16.516 0 0 1-.82-3.414m2.416-2.416a16.5 16.5 0 0 0-5.23-1.282M8.88 12.47a16.5 16.5 0 0 1-3.414-.652m-2.416 2.416a16.5 16.5 0 0 0-1.042 1.182m1.182-1.042a16.522 16.522 0 0 1-.82 1.632m-3.602 5.352a16.5 16.5 0 0 1-1.282 5.23M3.53 15.12a16.522 16.522 0 0 1-.652 3.414m2.416 2.416a16.5 16.5 0 0 0 1.042 1.182m1.182-1.042a16.516 16.516 0 0 1 1.632.82m3.602 5.352a16.5 16.5 0 0 1 5.23 1.282m.652 3.414a16.5 16.5 0 0 1-.82 1.632m-2.416 2.416a16.5 16.5 0 0 0-1.182 1.042m1.042-1.182a16.516 16.516 0 0 1-1.632.82m-5.352 3.602a16.522 16.522 0 0 1-5.23 1.282" />
    </svg>

);

const BubbleIcon = () => <div className="w-7 h-7 border-2 border-current rounded-full" />;

const VoodooKnotIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.22 1.002l-1.391 2.472-1.391-2.472a2.25 2.25 0 0 1-.22-1.002V3.104m3.382 0v5.714a2.25 2.25 0 0 0 .22 1.002l1.391 2.472 1.391-2.472a2.25 2.25 0 0 0 .22-1.002V3.104m-3.382 0a2.25 2.25 0 0 0-2.25 2.25v1.518a2.25 2.25 0 0 1-1.528 2.118l-1.423.475a.75.75 0 0 0-.298 1.132l3.75 5.25a.75.75 0 0 0 .97.241l1.528-.425a2.25 2.25 0 0 1 2.118-1.528V5.354a2.25 2.25 0 0 0-2.25-2.25Z" />
    </svg>
);

const NeedleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 rotate-45">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3.34a2.25 2.25 0 0 1 3.248 0l2.428 2.428a2.25 2.25 0 0 1 0 3.248l-6.036 6.036a1.5 1.5 0 0 1-2.122 0l-2.428-2.428a1.5 1.5 0 0 1 0-2.122L9.568 3.34Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 9.75 14.25" />
    </svg>
);

const ShatterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="m12 4.5 4.5 4.5-3 3-4.5-4.5-1.5 1.5 4.5 4.5-1.5 1.5-4.5-4.5-1.5 1.5L12 15l4.5 4.5" />
    </svg>
);

const UglifyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.5 4.5 0 0 0 12.001 15c-1.22 0-2.35-.49-3.182-1.318M15.182 16.318A4.5 4.5 0 0 1 18 15c1.455 0 2.762.63 3.682 1.625M12 15a4.5 4.5 0 0 0-3.182 1.318M12 15a4.5 4.5 0 0 1 3.182 1.318m-6.364 0a4.5 4.5 0 0 1 6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75s.168-.75.375-.75.375.336.375.75Zm4.5 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Z" />
    </svg>
);

const SlimeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.287 8.287 0 0 0 3-2.553 8.252 8.252 0 0 1 3.362-1.834Z" />
    </svg>
);

const TornadoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
    </svg>
);


export const TOOLS: Tool[] = [
    { id: 'palm', name: '手掌', icon: <HandRaisedIcon />, cost: 0 },
    { id: 'mallet', name: '木槌', icon: <MalletIcon />, cost: 10 },
    { id: 'bubble', name: '水泡', icon: <BubbleIcon />, cost: 20 },
    { id: 'voodoo-knot', name: '巫毒绳结', icon: <VoodooKnotIcon />, cost: 5 },
    { id: 'voodoo-needle', name: '巫毒针', icon: <NeedleIcon />, cost: 15 },
    { id: 'shatter', name: '碎裂', icon: <ShatterIcon />, cost: 25 },
    { id: 'uglify', name: '丑化', icon: <UglifyIcon />, cost: 50 },
    { id: 'slime', name: '粘液', icon: <SlimeIcon />, cost: 100 },
    { id: 'tornado', name: '龙卷风', icon: <TornadoIcon />, cost: 75 },
];

export const INITIAL_COINS = 480;
export const HIT_REWARD = 5;