"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye, Download, Filter } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function VoteHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Mock vote history data
  const votes = [
    {
      id: "vote-1",
      election: "Elección Presidencial 2024",
      date: "15 May 2024",
      txHash: "0x8f5b4...3e21",
      status: "confirmed",
      type: "presidential",
    },
    {
      id: "vote-2",
      election: "Referéndum Constitucional",
      date: "01 Jun 2024",
      txHash: "0x7a3d2...5f21",
      status: "confirmed",
      type: "referendum",
    },
    {
      id: "vote-3",
      election: "Elecciones Municipales 2023",
      date: "15 Nov 2023",
      txHash: "0x2e9f1...8c43",
      status: "confirmed",
      type: "municipal",
    },
    {
      id: "vote-4",
      election: "Consulta Ciudadana",
      date: "30 Sep 2023",
      txHash: "0x1c8d3...9a76",
      status: "confirmed",
      type: "consultation",
    },
  ]

  // Filter votes based on search term and active tab
  const filteredVotes = votes.filter((vote) => {
    const matchesSearch =
      vote.election.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vote.txHash.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    return matchesSearch && vote.type === activeTab
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">
            Confirmado
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
            Pendiente
          </Badge>
        )
      default:
        return <Badge variant="outline">Desconocido</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Historial de Votos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar por elección o hash..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Filtros
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Exportar
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="presidential">Presidenciales</TabsTrigger>
              <TabsTrigger value="referendum">Referéndums</TabsTrigger>
              <TabsTrigger value="municipal">Municipales</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Elección</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Hash de Transacción</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVotes.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-gray-500 dark:text-gray-400">
                          No se encontraron votos
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredVotes.map((vote) => (
                        <TableRow key={vote.id}>
                          <TableCell className="font-medium">{vote.election}</TableCell>
                          <TableCell>{vote.date}</TableCell>
                          <TableCell className="font-mono text-xs">{vote.txHash}</TableCell>
                          <TableCell>{getStatusBadge(vote.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-7 text-xs">
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              Verificar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Similar structure for other tabs */}
            <TabsContent value="presidential" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Elección</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Hash de Transacción</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVotes.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-gray-500 dark:text-gray-400">
                          No se encontraron votos presidenciales
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredVotes.map((vote) => (
                        <TableRow key={vote.id}>
                          <TableCell className="font-medium">{vote.election}</TableCell>
                          <TableCell>{vote.date}</TableCell>
                          <TableCell className="font-mono text-xs">{vote.txHash}</TableCell>
                          <TableCell>{getStatusBadge(vote.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-7 text-xs">
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              Verificar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="referendum" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Elección</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Hash de Transacción</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVotes.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-gray-500 dark:text-gray-400">
                          No se encontraron votos en referéndums
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredVotes.map((vote) => (
                        <TableRow key={vote.id}>
                          <TableCell className="font-medium">{vote.election}</TableCell>
                          <TableCell>{vote.date}</TableCell>
                          <TableCell className="font-mono text-xs">{vote.txHash}</TableCell>
                          <TableCell>{getStatusBadge(vote.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-7 text-xs">
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              Verificar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="municipal" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Elección</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Hash de Transacción</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVotes.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-gray-500 dark:text-gray-400">
                          No se encontraron votos municipales
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredVotes.map((vote) => (
                        <TableRow key={vote.id}>
                          <TableCell className="font-medium">{vote.election}</TableCell>
                          <TableCell>{vote.date}</TableCell>
                          <TableCell className="font-mono text-xs">{vote.txHash}</TableCell>
                          <TableCell>{getStatusBadge(vote.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-7 text-xs">
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              Verificar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}
