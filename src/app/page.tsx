import Link from 'next/link'

export default function Home() {
  const features = [
    { name: '製造工程管理', description: 'ポケットティッシュの製造工程を効率的に管理', link: '/manufacturing' },
    { name: '在庫管理', description: '原材料から完成品まで、在庫状況を一元管理', link: '/inventory' },
    { name: '広告連携管理', description: 'クライアントの広告と製造プロセスをシームレスに連携', link: '/advertising' },
    { name: 'スケジュール管理', description: '製造から納品までのスケジュールを最適化', link: '/schedule' },
    { name: 'レポート生成', description: '各種データを分析し、インサイトを提供', link: '/reports' },
    { name: 'ユーザー管理', description: 'システムユーザーの権限と情報を管理', link: '/users' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">ポケットティッシュ製造管理システム</h1>
      <p className="text-xl text-gray-600 mb-8">
        効率的な製造プロセス、在庫管理、広告連携を実現する統合システムへようこそ。
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{feature.name}</h2>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            <Link href={feature.link} className="text-blue-500 hover:text-blue-600 font-medium">
              詳細を見る →
            </Link>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">さあ、始めましょう</h2>
        <p className="text-gray-600 mb-6">
          左のサイドバーから各機能にアクセスするか、上のカードをクリックして詳細を確認してください。
        </p>
        <Link href="/manufacturing" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300">
          製造工程管理を開始
        </Link>
      </div>
    </div>
  )
}