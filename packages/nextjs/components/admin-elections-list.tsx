"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, CalendarClock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export function AdminElectionsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Mock elections data
  const elections = [
    {
      id: "election-1",
      title: "Elección Presidencial 2024",
      status: "active",
      startDate: "15 May 2024",
      endDate: "15 Jun 2024",
      participation: "42.8%",
      type: "presidential",
      candidates: 4,
    },
    {
      id: "election-2",
      title: "Referéndum Constitucional",
      status: "active",
      startDate: "01 Jun 2024",
      endDate: "30 Jun 2024",
      participation: "38.2%",
      type: "referendum",
      candidates: 2,
    },
    {
      id: "election-3",
      title: "Elecciones Regionales",
      status: "scheduled",
      startDate: "15 Jul 2024",
      endDate: "15 Ago 2024",
      participation: "-",
      type: "regional",
      candidates: 8,
    },
    {
      id: "election-4",
      title: "Consulta de Presupuesto Participativo",
      status: "scheduled",
      startDate: "30 Ago 2024",
      endDate: "15 Sep 2024",
      participation: "-",
      type: "consultation",
      candidates: 0,
    },
    {
      id: "election-5",
      title: "Elecciones Municipales 2023",
      status: "completed",
      startDate: "15 Nov 2023",
      endDate: "15 Dic 2023",
      participation: "68.4%",
      type: "municipal",
      candidates: 12,
    },
    {
      id: "election-6",
      title: "Consulta Ciudadana",
      status: "completed",
      startDate: "30 Sep 2023",
      endDate: "15 Oct 2023",
      participation: "52.1%",
      type: "consultation",
      candidates: 0,
    },
  ]

  // Filter elections based on search term and active tab
  const filteredElections = elections.filter((election) => {
    const matchesSearch = election.title.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && election.status === "active"
    if (activeTab === "scheduled") return matchesSearch && election.status === "scheduled"
    if (activeTab === "completed") return matchesSearch && election.status === "completed"

    return matchesSearch
  })

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
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Elecciones</CardTitle>
          <Button size="sm" asChild>
            <Link href="/dashboard/admin/elections/create">
              <Plus className="h-4 w-4 mr-1" />
              Nueva Elección
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Buscar elección..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="active">Activas</TabsTrigger>
              <TabsTrigger value="scheduled">Programadas</TabsTrigger>
              <TabsTrigger value="completed">Completadas</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Fechas</TableHead>
                      <TableHead>Candidatos</TableHead>
                      <TableHead>Participación</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredElections.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-gray-500 dark:text-gray-400">
                          No se encontraron elecciones
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredElections.map((election) => (
                        <TableRow key={election.id}>
                          <TableCell className="font-medium">{election.title}</TableCell>
                          <TableCell>{getStatusBadge(election.status)}</TableCell>
                          <TableCell className="capitalize">{election.type}</TableCell>
                          <TableCell>
                            <div className="flex items-center text-xs">
                              <CalendarClock\
