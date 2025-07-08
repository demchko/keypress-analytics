'use client';

import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useKeypress } from '../hooks/useKeypress';
import { ConnectionStatus } from '../components/ConnectionStatus';
import { keypressStore } from '@/stores/KeyPressStore';
import { KeypressChart } from './KeyPressChart';

export const BasicComp = observer(() => {
    useKeypress();

    useEffect(() => {
        keypressStore.initSocket();

        return () => {
            keypressStore.disconnect();
        };
    }, []);

    return (
        <div className="min-h-screen bg-slate-900">
            <ConnectionStatus />

            <div className="max-w-5xl mx-auto px-8 py-16">
                <header className="mb-14">
                    <h1 className="text-5xl font-black text-white mb-6 tracking-tight">
                        Аналітика натискань клавіш
                    </h1>
                    <p className="text-xl text-slate-400 leading-relaxed">
                        Натискайте будь-які клавіші для перегляду статистики в реальному часі
                    </p>
                </header>

                <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden mb-10">
                    <div className="p-8 border-b border-slate-700">
                        <h2 className="text-2xl font-bold text-white">
                            Графік активності
                        </h2>
                    </div>
                    <div className="p-8">
                        <KeypressChart />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                        <h3 className="text-slate-300 text-sm font-semibold mb-4 uppercase tracking-wide">
                            Унікальних клавіш
                        </h3>
                        <div className="text-4xl font-black text-emerald-400">
                            {keypressStore.stats.length}
                        </div>
                    </div>

                    <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                        <h3 className="text-slate-300 text-sm font-semibold mb-4 uppercase tracking-wide">
                            Загальна кількість натискань
                        </h3>
                        <div className="text-4xl font-black text-blue-400">
                            {keypressStore.stats.reduce((sum, stat) => sum + stat.count, 0)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});