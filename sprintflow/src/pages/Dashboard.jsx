import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { taskService } from '../services/taskService'
import { projectService } from '../services/projectService'
import StatsCard from '../components/dashboard/StatsCard'
import RecentTasks from '../components/dashboard/RecentTasks'
import TaskChart from '../components/dashboard/TaskChart'
import { TASK_STATUS } from '../utils/constants'

export default function Dashboard() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allTasks, allProjects] = await Promise.all([
          taskService.getAllTasks(),
          projectService.getProjects(),
        ])
        setTasks(allTasks)
        setProjects(allProjects)
      } catch (err) {
        console.error('Dashboard fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const completedTasks = tasks.filter((t) => t.status === TASK_STATUS.DONE).length
  const pendingTasks = tasks.filter((t) => t.status !== TASK_STATUS.DONE).length

  const stats = [
    {
      label: 'Total Projects',
      value: loading ? '…' : projects.length,
      color: 'brand',
      trend: 'Across all workspaces',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      ),
    },
    {
      label: 'Total Tasks',
      value: loading ? '…' : tasks.length,
      color: 'purple',
      trend: 'All statuses',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      label: 'Completed Tasks',
      value: loading ? '…' : completedTasks,
      color: 'green',
      trend: `${tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0}% completion rate`,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'Pending Tasks',
      value: loading ? '…' : pendingTasks,
      color: 'amber',
      trend: 'In progress or to do',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h2 className="text-lg font-semibold text-surface-900">
          Good {getTimeOfDay()}, {user?.name?.split(' ')[0]} 👋
        </h2>
        <p className="text-sm text-surface-500 mt-0.5">Here's your project overview for today.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatsCard key={s.label} {...s} />
        ))}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RecentTasks tasks={tasks} />
        </div>
        <div>
          <TaskChart tasks={tasks} />
        </div>
      </div>
    </div>
  )
}

function getTimeOfDay() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 18) return 'afternoon'
  return 'evening'
}
