import { VotingInterface } from "~~/components/voting-interface";
import { DashboardHeader } from "~~/components/dashboard-header";
import { DashboardSidebar } from "~~/components/dashboard-sidebar";
import { VotingInstructions } from "~~/components/voting-instructions";
import { VotingPrivacyInfo } from "~~/components/voting-privacy-info";

export default function VotePage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            Emitir Voto
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <VotingInterface electionId={params.id} />
            </div>
            <div className="space-y-6">
              <VotingInstructions />
              <VotingPrivacyInfo />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
