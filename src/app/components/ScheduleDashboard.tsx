'use client';

import React, { useState } from 'react';
import { format, addDays, startOfWeek, isWithinInterval, isSameDay } from 'date-fns';
import { ja } from 'date-fns/locale';

// Taskの型定義を追加
interface Task {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  status: string;
  progress: number;
}

// モックデータ
const initialTasks: Task[] = [
  { id: 1, name: 'ティッシュ製造', startDate: new Date(2024, 7, 20), endDate: new Date(2024, 7, 25), status: '進行中', progress: 50 },
  { id: 2, name: '広告デザイン', startDate: new Date(2024, 7, 22), endDate: new Date(2024, 7, 24), status: '未着手', progress: 0 },
  { id: 3, name: '納品', startDate: new Date(2024, 7, 26), endDate: new Date(2024, 7, 26), status: '未着手', progress: 0 },
];

const statusColors: { [key: string]: string } = {
  '未着手': 'bg-gray-300',
  '進行中': 'bg-blue-500',
  '完了': 'bg-green-500',
  '遅延': 'bg-red-500',
};

export default function ScheduleDashboard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));

  const updateTaskStatus = (id: number, newStatus: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  const weekDays = [...Array(7)].map((_, i) => addDays(currentWeekStart, i));

  const moveWeek = (direction: number) => {
    setCurrentWeekStart(addDays(currentWeekStart, direction * 7));
  };

  const getTaskStyle = (task: Task, day: Date) => {
    if (isWithinInterval(day, { start: task.startDate, end: task.endDate })) {
      let width = '100%';
      if (isSameDay(day, task.startDate)) {
        width = isSameDay(day, task.endDate) ? '100%' : 'calc(100% + 1px)';
      } else if (isSameDay(day, task.endDate)) {
        width = 'calc(100% + 1px)';
      }
      
      return {
        backgroundColor: statusColors[task.status],
        width: width,
        height: '24px',
        position: 'relative' as 'relative',
        borderRadius: '4px',
        overflow: 'hidden' as 'hidden',
      };
    }
    return {};
  };

  const getProgressStyle = (task: Task, day: Date) => {
    if (isWithinInterval(day, { start: task.startDate, end: task.endDate })) {
      const totalDays = Math.floor((task.endDate.getTime() - task.startDate.getTime()) / (1000 * 3600 * 24)) + 1;
      const daysPassed = Math.floor((day.getTime() - task.startDate.getTime()) / (1000 * 3600 * 24)) + 1;
      const progressPerDay = task.progress / totalDays;
      const currentDayProgress = Math.min(progressPerDay * daysPassed, task.progress);

      return {
        width: `${currentDayProgress}%`,
        height: '100%',
        backgroundColor: statusColors[task.status],
        opacity: 0.7,
      };
    }
    return {};
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 text-black">
        <h1 className="text-3xl font-bold mb-6">スケジュール詳細・管理</h1>
        
        <div className="mb-4 flex justify-between items-center">
          <button onClick={() => moveWeek(-1)} className="bg-blue-500 text-white px-4 py-2 rounded">前の週</button>
          <h2 className="text-xl font-semibold">
            {format(currentWeekStart, 'yyyy年MM月dd日', { locale: ja })} - 
            {format(addDays(currentWeekStart, 6), 'yyyy年MM月dd日', { locale: ja })}
          </h2>
          <button onClick={() => moveWeek(1)} className="bg-blue-500 text-white px-4 py-2 rounded">次の週</button>
        </div>
        
        <div className="bg-gray-50 shadow rounded-lg p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 w-1/6">タスク</th>
                {weekDays.map(day => (
                  <th key={day.toISOString()} className="px-4 py-2">{format(day, 'M/d (E)', { locale: ja })}</th>
                ))}
                <th className="px-4 py-2 w-1/6">ステータス</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td className="border px-4 py-2">{task.name}</td>
                  {weekDays.map(day => (
                    <td key={day.toISOString()} className="border px-4 py-2">
                      <div style={getTaskStyle(task, day)}>
                        <div style={getProgressStyle(task, day)}></div>
                      </div>
                    </td>
                  ))}
                  <td className="border px-4 py-2">
                    <select
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                      className={`${statusColors[task.status]} text-white rounded px-2 py-1`}
                    >
                      <option value="未着手">未着手</option>
                      <option value="進行中">進行中</option>
                      <option value="完了">完了</option>
                      <option value="遅延">遅延</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 bg-gray-50 shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">タスク詳細</h2>
          <ul className="space-y-2">
            {tasks.map(task => (
              <li key={task.id} className="flex justify-between items-center bg-white p-3 rounded shadow">
                <span>{task.name}</span>
                <span>{format(task.startDate, 'yyyy/MM/dd')} - {format(task.endDate, 'yyyy/MM/dd')}</span>
                <span>進捗: {task.progress}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}