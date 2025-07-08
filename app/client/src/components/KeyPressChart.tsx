import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { observer } from 'mobx-react-lite';
import { keypressStore } from '@/stores/KeyPressStore';

export const KeypressChart = observer(() => {
    const { stats } = keypressStore;

    const chartData = stats.map(stat => ({
        key: stat.key === ' ' ? 'Space' : stat.key,
        count: stat.count,
    }));

    return (
        <div className="w-full h-96 p-4">
            <h2 className="text-2xl font-bold mb-4 text-white">Статистика натискань клавіш</h2>
            {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        layout="horizontal"
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="key" width={50} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#3b82f6" />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">Почніть натискати клавіші для перегляду статистики</p>
                </div>
            )}
        </div>
    );
});
