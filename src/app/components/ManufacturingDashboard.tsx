'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// モックデータ
const initialProcesses = [
  { id: 1, name: 'ティッシュ製造', status: '進行中', progress: 65 },
  { id: 2, name: '広告挿入', status: '待機中', progress: 0 },
  { id: 3, name: '梱包', status: '完了', progress: 100 },
];

const statusColors: { [key: string]: string } = {
  '進行中': 'bg-blue-500',
  '待機中': 'bg-yellow-500',
  '完了': 'bg-green-500',
};

export default function ManufacturingDashboard() {
  const [processes, setProcesses] = useState(initialProcesses);

  const updateStatus = (id: number, newStatus: string) => {
    setProcesses(processes.map(process =>
      process.id === id ? { ...process, status: newStatus } : process
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 text-black">
        <h1 className="text-3xl font-bold mb-6">製造工程管理</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">製造工程リスト</h2>
            <div className="space-y-4">
              {processes.map((process) => (
                <div key={process.id} className="bg-white border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium">{process.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${statusColors[process.status]}`}>
                      {process.status}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${process.progress}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 space-x-2">
                    <button 
                      onClick={() => updateStatus(process.id, '進行中')}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      開始
                    </button>
                    <button 
                      onClick={() => updateStatus(process.id, '完了')}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      完了
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">生産性チャート</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={processes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="progress" fill="#3b82f6" name="進捗率" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}