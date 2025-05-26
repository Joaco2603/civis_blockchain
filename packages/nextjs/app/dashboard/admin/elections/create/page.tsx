import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { ElectionCreationForm } from "@/components/election-creation-form";

export default function CreateElectionPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            Crear Nueva Elección
          </h1>
          <ElectionCreationForm />
        </main>
      </div>
    </div>
  );
}
