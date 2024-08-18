import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ポケットティッシュ製造管理アプリ',
  description: '製造工程、在庫、広告連携を管理するアプリケーション',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          {/* サイドバー */}
          <div className="w-64 bg-white shadow-md">
            <div className="p-4">
              <h1 className="text-2xl font-semibold text-gray-800">メニュー</h1>
            </div>
            <nav className="mt-4">
              <Link href="/" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">ホーム</Link>
              <Link href="/manufacturing" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">製造工程管理</Link>
              <Link href="/inventory" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">在庫管理</Link>
              <Link href="/advertising" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">広告連携管理</Link>
              <Link href="/schedule" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">スケジュール管理</Link>
              <Link href="/reports" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">レポート生成</Link>
              <Link href="/users" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">ユーザー管理</Link>
            </nav>
          </div>

          {/* メインコンテンツ */}
          <div className="flex-1 overflow-auto">
            <main className="p-4">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}