"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "~~/components/dashboard-header";
import { DashboardSidebar } from "~~/components/dashboard-sidebar";
import { AuditStats } from "~~/components/audit-stats";
import { BlockchainExplorer } from "~~/components/blockchain-explorer";
import { IntegrityVerifier } from "~~/components/integrity-verifier";
import { useWeb3 } from "~~/app/store/web3-provider";

export default function AuditPage() {
  const router = useRouter();
  const { role, isAuthenticated } = useWeb3();

  // Redirect admin users - they use different audit tools
  useEffect(() => {
    if (isAuthenticated && role === "admin") {
      router.push("/dashboard/admin/stats");
    }
  }, [isAuthenticated, role, router]);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            Panel de Auditoría
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <AuditStats />
            <IntegrityVerifier />
          </div>

          <BlockchainExplorer />
        </main>
      </div>
    </div>
  );
}
