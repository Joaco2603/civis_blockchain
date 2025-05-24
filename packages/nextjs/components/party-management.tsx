"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, CheckCircle, XCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PartyManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Mock political parties data
  const parties = [
    {
      id: 1,
      name: "Partido Democrático",
      acronym: "PD",
      status: "active",
      candidates: 12,
      registeredDate: "10 Ene 2024",
      color: "#3b82f6",
    },
    {
      id: 2,
      name: "Alianza Progresista",
      acronym: "AP",
      status: "active",
      candidates: 10,
      registeredDate: "15 Ene 2024",
      color: "#ef4444",
    },
    {
      id: 3,
      name: "Unión Republicana",
      acronym: "UR",
      status: "active",
      candidates: 8,
      registeredDate: "20 Ene 2024",
      color: "#10b981",
    },
    {
      id: 4,
      name: "Movimiento Ciudadano",
      acronym: "MC",
      status: "active",
      candidates: 6,
      registeredDate: "25 Ene 2024",
      color: "#f59e0b",
    },
    {
      id: 5,
      name: "Alianza Democrática",
      acronym: "AD",
      status: "pending",
      candidates: 0,
      registeredDate: "05 May 2024",
      color: "#8b5cf6",
    },
    {
      id: 6,
      name: "Frente Popular",
      acronym: "FP",
      status: "inactive",
      candidates: 0,
      registeredDate: "15 Feb 2024",
      color: "#6b7280",
    },
  ]

  // Filter parties based on search term and active tab
  const filteredParties = parties.filter((party) => {
    const matchesSearch =
      party.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      party.acronym.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && party.status === "active"
    if (activeTab === "pending") return matchesSearch && party.status === "pending"
    if (activeTab === "inactive") return matchesSearch && party.status === "inactive"

    return matchesSearch
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            Activo
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
            Pendiente
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 dark:bg-gray-700/30 dark:text-gray-300">
            <XCircle className="h-3 w-3 mr-1" />
            Inactivo
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
          <CardTitle>Gestión de Partidos Políticos</CardTitle>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Nuevo Partido
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Buscar partido..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="active">Activos</TabsTrigger>
              <TabsTrigger value="pending">Pendientes</TabsTrigger>
              <TabsTrigger value="inactive">Inactivos</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Siglas</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Candidatos</TableHead>
                      <TableHead>Fecha Registro</TableHead>
                      <TableHead>Color</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredParties.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-gray-500 dark:text-gray-400">
                          No se encontraron partidos políticos
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredParties.map((party) => (
                        <TableRow key={party.id}>
                          <TableCell className="font-medium">{party.name}</TableCell>
                          <TableCell>{party.acronym}</TableCell>
                          <TableCell>{getStatusBadge(party.status)}</TableCell>
                          <TableCell>{party.candidates}</TableCell>
                          <TableCell>{party.registeredDate}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: party.color }}></div>
                              <span>{party.color}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              {party.status === "pending" && (
                                <>
                                  <Button variant="ghost" size="sm" className="h-7 text-xs text-green-600">
                                    <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                    Aprobar
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-7 text-xs text-red-600">
                                    <XCircle className="h-3.5 w-3.5 mr-1" />
                                    Rechazar
                                  </Button>
                                </>
                              )}
                              {party.status === "active" && (
                                <>
                                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                                    <Edit className="h-3.5 w-3.5 mr-1" />
                                    Editar
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-7 text-xs text-red-600">
                                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                                    Eliminar
                                  </Button>
                                </>
                              )}
                              {party.status === "inactive" && (
                                <Button variant="ghost" size="sm" className="h-7 text-xs text-green-600">
                                  <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                  Reactivar
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Similar structure for other tabs */}
            <TabsContent value="active" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Siglas</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Candidatos</TableHead>
                      <TableHead>Fecha Registro</TableHead>
                      <TableHead>Color</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredParties.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-gray-500 dark:text-gray-400">
                          No se encontraron partidos políticos activos
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredParties.map((party) => (
                        <TableRow key={party.id}>
                          <TableCell className="font-medium">{party.name}</TableCell>
                          <TableCell>{party.acronym}</TableCell>
                          <TableCell>{getStatusBadge(party.status)}</TableCell>
                          <TableCell>{party.candidates}</TableCell>
                          <TableCell>{party.registeredDate}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: party.color }}></div>
                              <span>{party.color}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Button variant="ghost" size="sm" className="h-7 text-xs">
                                <Edit className="h-3.5 w-3.5 mr-1" />
                                Editar
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 text-xs text-red-600">
                                <Trash2 className="h-3.5 w-3.5 mr-1" />
                                Eliminar
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="pending" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Siglas</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Fecha Registro</TableHead>
                      <TableHead>Color</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredParties.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-gray-500 dark:text-gray-400">
                          No hay partidos políticos pendientes
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredParties.map((party) => (
                        <TableRow key={party.id}>
                          <TableCell className="font-medium">{party.name}</TableCell>
                          <TableCell>{party.acronym}</TableCell>
                          <TableCell>{getStatusBadge(party.status)}</TableCell>
                          <TableCell>{party.registeredDate}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: party.color }}></div>
                              <span>{party.color}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Button variant="ghost" size="sm" className="h-7 text-xs text-green-600">
                                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                Aprobar
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 text-xs text-red-600">
                                <XCircle className="h-3.5 w-3.5 mr-1" />
                                Rechazar
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="inactive" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Siglas</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Fecha Registro</TableHead>
                      <TableHead>Color</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredParties.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-gray-500 dark:text-gray-400">
                          No hay partidos políticos inactivos
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredParties.map((party) => (
                        <TableRow key={party.id}>
                          <TableCell className="font-medium">{party.name}</TableCell>
                          <TableCell>{party.acronym}</TableCell>
                          <TableCell>{getStatusBadge(party.status)}</TableCell>
                          <TableCell>{party.registeredDate}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: party.color }}></div>
                              <span>{party.color}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-7 text-xs text-green-600">
                              <CheckCircle className="h-3.5 w-3.5 mr-1" />
                              Reactivar
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
