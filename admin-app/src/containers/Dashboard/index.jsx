import { Users, FileText, TrendingUp, Activity } from 'lucide-react'
import StatsCard from './components/StatsCard'
import RecentActivity from './components/RecentActivity'
import QuickActions from './components/QuickActions'

const stats = [
  {
    title: 'Total Users',
    value: '1,234',
    change: '+12.5%',
    icon: Users,
    trend: 'up',
  },
  {
    title: 'Applications',
    value: '456',
    change: '+8.2%',
    icon: FileText,
    trend: 'up',
  },
  {
    title: 'Active Sessions',
    value: '89',
    change: '-2.1%',
    icon: Activity,
    trend: 'down',
  },
  {
    title: 'Growth Rate',
    value: '24.3%',
    change: '+4.7%',
    icon: TrendingUp,
    trend: 'up',
  },
]

export default function DashboardContainer() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to the admin dashboard. Here's an overview of your system.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <RecentActivity />
        <QuickActions />
      </div>
    </div>
  )
}

