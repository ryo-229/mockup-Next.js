'use client';

import React, { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const initialUsers: User[] = [
  { id: 1, name: '山田太郎', email: 'yamada@example.com', role: '管理者' },
  { id: 2, name: '佐藤花子', email: 'sato@example.com', role: '一般ユーザー' },
  { id: 3, name: '鈴木一郎', email: 'suzuki@example.com', role: '一般ユーザー' },
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<Omit<User, 'id'>>({ name: '', email: '', role: '一般ユーザー' });

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdateUser = () => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
      setEditingUser(null);
    }
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleAddUser = () => {
    const id = Math.max(...users.map(u => u.id), 0) + 1;
    setUsers([...users, { id, ...newUser }]);
    setNewUser({ name: '', email: '', role: '一般ユーザー' });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">ユーザー管理</h1>

        {/* ユーザー追加フォーム */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-black">新規ユーザー追加</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <input
              type="text"
              placeholder="名前"
              className="border rounded px-3 py-2 text-black placeholder-gray-500"
              value={newUser.name}
              onChange={e => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="メールアドレス"
              className="border rounded px-3 py-2 text-black placeholder-gray-500"
              value={newUser.email}
              onChange={e => setNewUser({ ...newUser, email: e.target.value })}
            />
            <select
              className="border rounded px-3 py-2 text-black"
              value={newUser.role}
              onChange={e => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="一般ユーザー" className="text-black">一般ユーザー</option>
              <option value="管理者" className="text-black">管理者</option>
            </select>
          </div>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleAddUser}
          >
            ユーザーを追加
          </button>
        </div>

        {/* ユーザー一覧 */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名前</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">メールアドレス</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">役割</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">アクション</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-black">
                    {editingUser && editingUser.id === user.id ? (
                      <input
                        type="text"
                        className="border rounded px-2 py-1 text-black"
                        value={editingUser.name}
                        onChange={e => setEditingUser({ ...editingUser, name: e.target.value })}
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">
                    {editingUser && editingUser.id === user.id ? (
                      <input
                        type="email"
                        className="border rounded px-2 py-1 text-black"
                        value={editingUser.email}
                        onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">
                    {editingUser && editingUser.id === user.id ? (
                      <select
                        className="border rounded px-2 py-1 text-black"
                        value={editingUser.role}
                        onChange={e => setEditingUser({ ...editingUser, role: e.target.value })}
                      >
                        <option value="一般ユーザー" className="text-black">一般ユーザー</option>
                        <option value="管理者" className="text-black">管理者</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {editingUser && editingUser.id === user.id ? (
                      <button className="text-green-600 hover:text-green-900 mr-3" onClick={handleUpdateUser}>
                        保存
                      </button>
                    ) : (
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3" onClick={() => handleEditUser(user)}>
                        編集
                      </button>
                    )}
                    <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteUser(user.id)}>
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;