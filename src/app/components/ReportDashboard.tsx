'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// モックデータ（変更なし）
const productionData = [
  { name: '1月', 生産量: 4000, 目標: 4500, 稼働率: 89 },
  { name: '2月', 生産量: 3000, 目標: 3500, 稼働率: 86 },
  { name: '3月', 生産量: 2000, 目標: 2500, 稼働率: 80 },
  { name: '4月', 生産量: 2780, 目標: 3000, 稼働率: 93 },
  { name: '5月', 生産量: 1890, 目標: 2000, 稼働率: 95 },
  { name: '6月', 生産量: 2390, 目標: 2500, 稼働率: 96 },
];

const inventoryData = [
  { name: 'ティッシュ本体', value: 400, status: '適正' },
  { name: '広告用紙', value: 300, status: '過剰' },
  { name: '包装材', value: 300, status: '適正' },
  { name: 'インク', value: 200, status: '不足' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ReportDashboard: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string>('production');

  const renderProductionReport = () => (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 text-black">月別生産量レポート</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={productionData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar dataKey="生産量" fill="#8884d8" yAxisId="left" />
          <Bar dataKey="目標" fill="#82ca9d" yAxisId="left" />
          <Bar dataKey="稼働率" fill="#ffc658" yAxisId="right" unit="%" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 text-black">
        <h4 className="text-lg font-semibold mb-2">生産状況サマリー</h4>
        <ul className="list-disc pl-5">
          <li>総生産量: {productionData.reduce((sum, item) => sum + item.生産量, 0)} 個</li>
          <li>平均稼働率: {(productionData.reduce((sum, item) => sum + item.稼働率, 0) / productionData.length).toFixed(2)}%</li>
          <li>目標達成率: {((productionData.reduce((sum, item) => sum + item.生産量, 0) / productionData.reduce((sum, item) => sum + item.目標, 0)) * 100).toFixed(2)}%</li>
        </ul>
      </div>
    </div>
  );

  const renderInventoryReport = () => (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 text-black">在庫状況レポート</h3>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={inventoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {inventoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <h4 className="text-lg font-semibold mb-2 text-black">在庫状況サマリー</h4>
          <ul className="list-disc pl-5 text-black">
            {inventoryData.map((item, index) => (
              <li key={index} className="mb-2">
                {item.name}: {item.value} 個
                <br />
                状態: <span className={`font-bold ${item.status === '適正' ? 'text-green-600' : item.status === '過剰' ? 'text-yellow-600' : 'text-red-600'}`}>{item.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">レポート生成</h1>
        <div className="mb-6">
          <label htmlFor="report-type" className="block text-sm font-medium text-gray-700">
            レポートタイプを選択:
          </label>
          <select
            id="report-type"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-black"
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
          >
            <option value="production">生産量レポート</option>
            <option value="inventory">在庫状況レポート</option>
          </select>
        </div>
        {selectedReport === 'production' ? renderProductionReport() : renderInventoryReport()}
      </div>
    </div>
  );
};

export default ReportDashboard;