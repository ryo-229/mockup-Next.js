'use client';

import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// モックデータ
const initialInventory = [
  { id: 1, name: 'ティッシュ本体', quantity: 5000, unit: '箱', status: '十分' },
  { id: 2, name: '広告用紙', quantity: 10000, unit: '枚', status: '要補充' },
  { id: 3, name: '包装材', quantity: 3000, unit: '個', status: '十分' },
  { id: 4, name: 'インク', quantity: 50, unit: 'L', status: '危険' },
];

const statusColors = {
  '十分': 'bg-green-500',
  '要補充': 'bg-yellow-500',
  '危険': 'bg-red-500',
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function InventoryDashboard() {
  const [inventory, setInventory] = useState(initialInventory);

  const updateQuantity = (id: number, change: number) => {
    setInventory(inventory.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
    ));
  };

  const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);

  const chartData = inventory.map(item => ({
    name: item.name,
    value: item.quantity
  }));

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 text-black">
        <h1 className="text-3xl font-bold mb-6">在庫管理</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">在庫リスト</h2>
            <div className="space-y-4">
              {inventory.map((item) => (
                <div key={item.id} className="bg-white border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${statusColors[item.status]}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-gray-600">数量: {item.quantity} {item.unit}</p>
                  <div className="mt-2 space-x-2">
                    <button 
                      onClick={() => updateQuantity(item.id, -10)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      -10
                    </button>
                    <button 
                      onClick={() => updateQuantity(item.id, 10)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      +10
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">在庫分布</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}