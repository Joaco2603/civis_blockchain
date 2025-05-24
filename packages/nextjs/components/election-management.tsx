"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarClock, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

export function ElectionManagement() {
  const elections = [
    {
      id: "election-1",
      title: "Elección Presidencial 2024",
      status: "active",
      startDate: "15 May 2024",
      endDate: "15 Jun 2024",
      participation: "42.8%",
    },
    {
      id: "election-2",
      title: "Referéndum Constitucional",
      status: "active",
      startDate: "01 Jun 2024",
      endDate: "30 Jun 2024",
      participation: "38.2%",
    },
    {
      id: "election-3",
      title: "Elecciones Regionales",
      status: "scheduled",
      startDate: "15 Jul 2024",
      endDate: "15 Ago 2024",
      participation: "-",
    },
    {
      id: "election-4",
      title: "Consulta de Presupuesto Participativo",
      status: "scheduled",
      startDate: "30 Ago 2024",
      endDate: "15 Sep 2024",
      participation: "-",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">
            Activa
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            Programada
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 dark:bg-gray-700/30 dark:text-gray-300">
            Completada
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle>Gestión de Elecciones</CardTitle>
        <Button size="sm" asChild>
          <Link href="/dashboard/admin/elections/create">Nueva Elección</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {elections.map((election) => (
            <div key={election.id} className="flex items-start space-x-3 border-b pb-3 last:border-0">
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{election.title}</p>
                  {getStatusBadge(election.status)}
                </div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <CalendarClock className="h-3.5 w-3.5 mr-1" />
                  {election.startDate} - {election.endDate}
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Participación: {election.participation}
                  </span>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500 dark:text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
