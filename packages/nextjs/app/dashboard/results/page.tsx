import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { EnhancedResultsOverview } from "@/components/enhanced-results-overview"
import { DemographicAnalysis } from "@/components/demographic-analysis"
import { TimeSeriesAnalysis } from "@/components/time-series-analysis"

export default function ResultsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Resultados</h1>

          <div className="mb-8">
            <EnhancedResultsOverview />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <DemographicAnalysis />
            <TimeSeriesAnalysis />
          </div>
        </main>
      </div>
    </div>
  )
}
