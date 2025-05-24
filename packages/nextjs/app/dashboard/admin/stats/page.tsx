import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { AdminAuditStats } from "@/components/admin-audit-stats"
import { SystemMonitoring } from "@/components/system-monitoring"
import { ParticipationAnalytics } from "@/components/participation-analytics"

export default function AdminStatsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Estadísticas y Monitoreo</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <AdminAuditStats />
            <SystemMonitoring />
          </div>

          <ParticipationAnalytics />
        </main>
      </div>
    </div>
  )
}
