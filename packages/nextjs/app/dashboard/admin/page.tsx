"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWeb3 } from "@/components/web3-provider"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminStats } from "@/components/admin-stats"
import { RecentActivity } from "@/components/recent-activity"
import { PendingApprovals } from "@/components/pending-approvals"
import { ElectionManagement } from "@/components/election-management"
import { AdminWelcomeCard } from "@/components/admin-welcome-card"

export default function AdminDashboard() {
  const router = useRouter()
  const { role, isAuthenticated } = useWeb3()

  // Redirect non-admin users to user dashboard
  useEffect(() => {
    if (isAuthenticated && role !== "admin") {
      router.push("/dashboard")
    }
  }, [isAuthenticated, role, router])

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Panel de Administración</h1>
          </div>

          <AdminWelcomeCard className="mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Total DIDs</CardTitle>
                <CardDescription>Identidades verificadas</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">1,245</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Elecciones Activas</CardTitle>
                <CardDescription>En curso actualmente</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">2</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Partidos Registrados</CardTitle>
                <CardDescription>Organizaciones políticas</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">4</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Participación</CardTitle>
                <CardDescription>Promedio actual</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">68.4%</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <AdminStats />
            <RecentActivity />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PendingApprovals />
            <ElectionManagement />
          </div>
        </main>
      </div>
    </div>
  )
}
