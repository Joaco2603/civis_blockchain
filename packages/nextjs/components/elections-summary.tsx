"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "../components/ui/badge"
import { CalendarClock, CheckCircle, Clock } from "lucide-react"

export function ElectionsSummary() {
  const [activeTab, setActiveTab] = useState("past")

  const pastElections = [
    {
      id: "past-1",
      title: "Elecciones Municipales 2023",
      date: "15 Nov 2023",
      participation: "68.4%",
      status: "Finalizada",
    },
    {
      id: "past-2",
      title: "Consulta Ciudadana",
      date: "30 Sep 2023",
      participation: "52.1%",
      status: "Finalizada",
    },
    {
      id: "past-3",
      title: "Elección de Representantes Vecinales",
      date: "15 Ago 2023",
      participation: "45.7%",
      status: "Finalizada",
    },
  ]

  const upcomingElections = [
    {
      id: "upcoming-1",
      title: "Elecciones Regionales",
      date: "15 Jul 2024",
      status: "Programada",
    },
    {
      id: "upcoming-2",
      title: "Consulta de Presupuesto Participativo",
      date: "30 Ago 2024",
      status: "Programada",
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Resumen de Elecciones</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="past" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="past">Elecciones Pasadas</TabsTrigger>
            <TabsTrigger value="upcoming">Próximas Elecciones</TabsTrigger>
          </TabsList>

          <TabsContent value="past" className="space-y-4">
            {pastElections.map((election) => (
              <div
                key={election.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">{election.title}</h4>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <CalendarClock className="h-3.5 w-3.5 mr-1" />
                      {election.date}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="mb-1">
                    {election.status}
                  </Badge>
                  <div className="text-sm font-medium">Participación: {election.participation}</div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingElections.map((election) => (
              <div
                key={election.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">{election.title}</h4>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <CalendarClock className="h-3.5 w-3.5 mr-1" />
                      {election.date}
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">{election.status}</Badge>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
