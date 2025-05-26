"use client";

import { useWeb3 } from "~~/app/store/web3-provider";
import { Card, CardContent } from "~~/components/ui/card";
import { Button } from "~~/components/ui/button";
import { Shield, ListPlus, Settings } from "lucide-react";
import Link from "next/link";

interface AdminWelcomeCardProps {
  className?: string;
}

export function AdminWelcomeCard({ className = "" }: AdminWelcomeCardProps) {
  const { userDID } = useWeb3();

  return (
    <Card className={`border-amber-100 dark:border-amber-900 ${className}`}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Panel de Administración
              </h2>
              <span className="ml-2 text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 px-2 py-0.5 rounded-full">
                Admin
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Gestión del sistema de votación descentralizada
            </p>
            {userDID && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-mono">
                ID: {userDID.substring(0, 20)}...
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              asChild
              size="sm"
              className="bg-amber-600 hover:bg-amber-700"
            >
              <Link href="/dashboard/admin/elections/create">
                <ListPlus className="h-4 w-4 mr-1" />
                Nueva Elección
              </Link>
            </Button>
            <Button variant="outline" asChild size="sm">
              <Link href="/dashboard/admin/dids">
                <Shield className="h-4 w-4 mr-1" />
                Gestionar DIDs
              </Link>
            </Button>
            <Button variant="ghost" asChild size="sm">
              <Link href="/dashboard/admin/settings">
                <Settings className="h-4 w-4 mr-1" />
                Configuración
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
