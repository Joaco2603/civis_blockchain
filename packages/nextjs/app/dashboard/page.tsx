"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
// import { DashboardHeader } from "../app/components/dashboard-header"
import {DashboardHeader} from "../../components/dashboard-header";
import { DashboardSidebar } from "../../components/dashboard-sidebar"
import { ElectionsSummary } from "../../components/elections-summary"
import { ParticipationStats } from "../../components/participation-stats"
import { ActiveElectionCard } from "../../components/active-election-card"
import { ElectionCountdown } from "../../components/election-countdown"
import { UserWelcomeCard } from "../../components/user-welcome-card"
import { useWeb3 } from "../store/web3-provider"

export default function UserDashboard() {
  const router = useRouter()
  const { role, isAuthenticated } = useWeb3()

  // Redirect admin users to admin dashboard
  useEffect(() => {
    if (isAuthenticated && role === "admin") {
      router.push("/dashboard/admin")
    }
  }, [isAuthenticated, role, router])

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Panel de Usuario</h1>

          <UserWelcomeCard className="mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <ElectionCountdown />
            <ParticipationStats />
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Elecciones Activas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ActiveElectionCard
                title="Elección Presidencial 2024"
                description="Elección para presidente del período 2024-2028"
                endDate="2024-06-15T23:59:59"
                participation={42.8}
              />
              <ActiveElectionCard
                title="Referéndum Constitucional"
                description="Consulta sobre reformas a la constitución nacional"
                endDate="2024-06-30T23:59:59"
                participation={38.2}
              />
            </div>
          </div>

          <ElectionsSummary />
        </main>
      </div>
    </div>
  )
}
