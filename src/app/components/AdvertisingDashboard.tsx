'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// モックデータ
const initialAds = [
  { id: 1, client: '株式会社A', product: '新商品X', status: '製作中', progress: 30 },
  { id: 2, client: 'B工業', product: 'サービスY', status: '承認待ち', progress: 70 },
  { id: 3, client: 'C商事', product: 'キャンペーンZ', status: '印刷中', progress: 90 },
  { id: 4, client: 'D株式会社', product: '季節商品', status: '完了', progress: 100 },
];

const statusColors: { [key: string]: string } = {
  '製作中': 'bg-blue-500',
  '承認待ち': 'bg-yellow-500',
  '印刷中': 'bg-purple-500',
  '完了': 'bg-green-500',
};

export default function AdvertisingDashboard() {
  const [ads, setAds] = useState(initialAds);

  const updateStatus = (id: number, newStatus: string) => {
    setAds(ads.map(ad => 
      ad.id === id ? { ...ad, status: newStatus, progress: newStatus === '完了' ? 100 : ad.progress } : ad
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 text-black">
        <h1 className="text-3xl font-bold mb-6">広告連携管理</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">広告案件リスト</h2>
            <div className="space-y-4">
              {ads.map((ad) => (
                <div key={ad.id} className="bg-white border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium">{ad.client} - {ad.product}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${statusColors[ad.status]}`}>
                      {ad.status}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${ad.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">進捗: {ad.progress}%</p>
                  <div className="mt-2 space-x-2">
                    <button 
                      onClick={() => updateStatus(ad.id, '製作中')}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      製作中
                    </button>
                    <button 
                      onClick={() => updateStatus(ad.id, '承認待ち')}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      承認待ち
                    </button>
                    <button 
                      onClick={() => updateStatus(ad.id, '印刷中')}
                      className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
                    >
                      印刷中
                    </button>
                    <button 
                      onClick={() => updateStatus(ad.id, '完了')}
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
            <h2 className="text-xl font-semibold mb-4">進捗状況</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ads}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="client" />
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