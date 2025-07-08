import React from 'react';
import { observer } from 'mobx-react-lite';
import { keypressStore } from '@/stores/KeyPressStore';

export const ConnectionStatus = observer(() => {
    const { isConnected } = keypressStore;

    return (
        <div className="fixed top-6 right-6 z-50">
            <div className={`
                backdrop-blur-md rounded-2xl border px-4 py-3 
                transition-all duration-300 shadow-xl
                ${isConnected
                    ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-300'
                    : 'bg-red-500/20 border-red-400/30 text-red-300'
                }
            `}>
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <div className={`
                            w-2.5 h-2.5 rounded-full 
                            ${isConnected ? 'bg-emerald-400' : 'bg-red-400'}
                        `}></div>
                        {isConnected && (
                            <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-75"></div>
                        )}
                    </div>
                    <span className="text-sm font-semibold tracking-wide">
                        {isConnected ? 'Підключено' : 'Відключено'}
                    </span>
                </div>
            </div>
        </div>
    );
});