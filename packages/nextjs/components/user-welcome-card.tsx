"use client"

import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Vote, BarChart3, UserCircle } from "lucide-react"
import Link from "next/link"
import { useWeb3 } from "~~/app/store/web3-provider"


interface UserWelcomeCardProps {
  className?: string
}

export function UserWelcomeCard({ className = "" }: UserWelcomeCardProps) {
  const { userDID } = useWeb3()

  return (
    <Card className={`border-blue-100 dark:border-blue-900 ${className}`}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Bienvenido a VotaChain</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Plataforma de votación segura, anónima y verificable
            </p>
            {userDID && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-mono">
                ID: {userDID.substring(0, 20)}...
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="sm">
              <Link href="/dashboard/vote/active">
                <Vote className="h-4 w-4 mr-1" />
                Votar Ahora
              </Link>
            </Button>
            <Button variant="outline" asChild size="sm">
              <Link href="/dashboard/results">
                <BarChart3 className="h-4 w-4 mr-1" />
                Ver Resultados
              </Link>
            </Button>
            <Button variant="ghost" asChild size="sm">
              <Link href="/dashboard/profile">
                <UserCircle className="h-4 w-4 mr-1" />
                Mi Perfil
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
