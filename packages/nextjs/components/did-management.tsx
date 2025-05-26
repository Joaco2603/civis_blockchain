"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Search,
  Plus,
  Download,
  Upload,
  Filter,
  UserCheck,
  Shield
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import Link from "next/link";

export function DIDManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isAssignRoleDialogOpen, setIsAssignRoleDialogOpen] = useState(false);
  const [selectedDID, setSelectedDID] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("user");

  // Mock DID data
  const dids = [
    {
      id: 1,
      did: "did:ethr:starknet:0x8f5b43e21",
      address: "0x8f5b4...3e21",
      status: "verified",
      role: "admin",
      createdAt: "15 May 2024",
      lastActive: "18 May 2024"
    },
    {
      id: 2,
      did: "did:ethr:starknet:0x7a3d25f21",
      address: "0x7a3d2...5f21",
      status: "pending",
      role: null,
      createdAt: "16 May 2024",
      lastActive: "-"
    },
    {
      id: 3,
      did: "did:ethr:starknet:0x2e9f18c43",
      address: "0x2e9f1...8c43",
      status: "verified",
      role: "user",
      createdAt: "14 May 2024",
      lastActive: "17 May 2024"
    },
    {
      id: 4,
      did: "did:ethr:starknet:0x1c8d39a76",
      address: "0x1c8d3...9a76",
      status: "verified",
      role: "user",
      createdAt: "12 May 2024",
      lastActive: "18 May 2024"
    },
    {
      id: 5,
      did: "did:ethr:starknet:0x9b4e27d12",
      address: "0x9b4e2...7d12",
      status: "rejected",
      role: null,
      createdAt: "10 May 2024",
      lastActive: "-"
    },
    {
      id: 6,
      did: "did:ethr:starknet:0x5a2c18e34",
      address: "0x5a2c1...8e34",
      status: "pending",
      role: null,
      createdAt: "17 May 2024",
      lastActive: "-"
    }
  ];

  // Filter DIDs based on search term and active tab
  const filteredDIDs = dids.filter((did) => {
    const matchesSearch =
      did.did.toLowerCase().includes(searchTerm.toLowerCase()) ||
      did.address.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "verified")
      return matchesSearch && did.status === "verified";
    if (activeTab === "pending")
      return matchesSearch && did.status === "pending";
    if (activeTab === "rejected")
      return matchesSearch && did.status === "rejected";

    return matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300"
          >
            <CheckCircle className="h-3 w-3 mr-1" />
            Verificado
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
          >
            Pendiente
          </Badge>
        );
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300"
          >
            <XCircle className="h-3 w-3 mr-1" />
            Rechazado
          </Badge>
        );
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const getRoleBadge = (role: string | null) => {
    if (!role) return null;

    switch (role) {
      case "admin":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
          >
            <Shield className="h-3 w-3 mr-1" />
            Admin
          </Badge>
        );
      case "user":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
          >
            Usuario
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleApprove = (id: number) => {
    // En una implementación real, aquí se aprobaría el DID en la blockchain
    console.log("Aprobando DID:", id);
    // Abrir diálogo para asignar rol
    const did = dids.find((d) => d.id === id);
    if (did) {
      setSelectedDID(did.did);
      setIsAssignRoleDialogOpen(true);
    }
  };

  const handleReject = (id: number) => {
    // En una implementación real, aquí se rechazaría el DID en la blockchain
    console.log("Rechazando DID:", id);
  };

  const handleAssignRole = () => {
    // En una implementación real, aquí se asignaría el rol al DID en la blockchain
    console.log("Asignando rol:", selectedRole, "al DID:", selectedDID);
    setIsAssignRoleDialogOpen(false);
    setSelectedDID(null);
    setSelectedRole("user");
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Gestión de Identidades Descentralizadas (DIDs)</CardTitle>
          <div className="flex space-x-2">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Crear DID
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Exportar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Exportar como CSV</DropdownMenuItem>
                <DropdownMenuItem>Exportar como JSON</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-1" />
              Importar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar por DID o dirección..."
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
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/admin/roles">
                  <UserCheck className="h-4 w-4 mr-1" />
                  Gestionar Roles
                </Link>
              </Button>
            </div>
          </div>

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="verified">Verificados</TabsTrigger>
              <TabsTrigger value="pending">Pendientes</TabsTrigger>
              <TabsTrigger value="rejected">Rechazados</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>DID</TableHead>
                      <TableHead>Dirección</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Creado</TableHead>
                      <TableHead>Última Actividad</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDIDs.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="text-center py-6 text-gray-500 dark:text-gray-400"
                        >
                          No se encontraron DIDs
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDIDs.map((did) => (
                        <TableRow key={did.id}>
                          <TableCell className="font-mono text-xs">
                            {did.did}
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            {did.address}
                          </TableCell>
                          <TableCell>{getStatusBadge(did.status)}</TableCell>
                          <TableCell>
                            {did.role ? getRoleBadge(did.role) : "-"}
                          </TableCell>
                          <TableCell>{did.createdAt}</TableCell>
                          <TableCell>{did.lastActive}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              {did.status === "pending" && (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 text-xs text-green-600"
                                    onClick={() => handleApprove(did.id)}
                                  >
                                    <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                    Aprobar
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 text-xs text-red-600"
                                    onClick={() => handleReject(did.id)}
                                  >
                                    <XCircle className="h-3.5 w-3.5 mr-1" />
                                    Rechazar
                                  </Button>
                                </>
                              )}
                              {did.status === "verified" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 text-xs"
                                  onClick={() => {
                                    setSelectedDID(did.did);
                                    setSelectedRole(did.role || "user");
                                    setIsAssignRoleDialogOpen(true);
                                  }}
                                >
                                  <UserCheck className="h-3.5 w-3.5 mr-1" />
                                  Cambiar Rol
                                </Button>
                              )}
                              {did.status === "rejected" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 text-xs"
                                >
                                  Revisar
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
            <TabsContent value="verified" className="mt-4">
              {/* Same table structure as "all" but with filtered data */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>DID</TableHead>
                      <TableHead>Dirección</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Creado</TableHead>
                      <TableHead>Última Actividad</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDIDs.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="text-center py-6 text-gray-500 dark:text-gray-400"
                        >
                          No se encontraron DIDs verificados
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDIDs.map((did) => (
                        <TableRow key={did.id}>
                          <TableCell className="font-mono text-xs">
                            {did.did}
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            {did.address}
                          </TableCell>
                          <TableCell>{getStatusBadge(did.status)}</TableCell>
                          <TableCell>
                            {did.role ? getRoleBadge(did.role) : "-"}
                          </TableCell>
                          <TableCell>{did.createdAt}</TableCell>
                          <TableCell>{did.lastActive}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs"
                              onClick={() => {
                                setSelectedDID(did.did);
                                setSelectedRole(did.role || "user");
                                setIsAssignRoleDialogOpen(true);
                              }}
                            >
                              <UserCheck className="h-3.5 w-3.5 mr-1" />
                              Cambiar Rol
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="pending" className="mt-4">
              {/* Same table structure but for pending DIDs */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>DID</TableHead>
                      <TableHead>Dirección</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Creado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDIDs.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center py-6 text-gray-500 dark:text-gray-400"
                        >
                          No hay DIDs pendientes
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDIDs.map((did) => (
                        <TableRow key={did.id}>
                          <TableCell className="font-mono text-xs">
                            {did.did}
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            {did.address}
                          </TableCell>
                          <TableCell>{getStatusBadge(did.status)}</TableCell>
                          <TableCell>{did.createdAt}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs text-green-600"
                                onClick={() => handleApprove(did.id)}
                              >
                                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                Aprobar
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs text-red-600"
                                onClick={() => handleReject(did.id)}
                              >
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

            <TabsContent value="rejected" className="mt-4">
              {/* Same table structure but for rejected DIDs */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>DID</TableHead>
                      <TableHead>Dirección</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Creado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDIDs.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center py-6 text-gray-500 dark:text-gray-400"
                        >
                          No hay DIDs rechazados
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDIDs.map((did) => (
                        <TableRow key={did.id}>
                          <TableCell className="font-mono text-xs">
                            {did.did}
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            {did.address}
                          </TableCell>
                          <TableCell>{getStatusBadge(did.status)}</TableCell>
                          <TableCell>{did.createdAt}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs"
                            >
                              Revisar
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

        {/* Dialog para asignar rol */}
        <Dialog
          open={isAssignRoleDialogOpen}
          onOpenChange={setIsAssignRoleDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Asignar Rol</DialogTitle>
              <DialogDescription>
                Asigna un rol al DID seleccionado. Este rol determinará los
                permisos del usuario en la plataforma.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="mb-4">
                <Label>DID</Label>
                <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border font-mono text-xs mt-1">
                  {selectedDID}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rol</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="user">Usuario</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {selectedRole === "admin"
                    ? "Los administradores pueden gestionar DIDs, partidos políticos y elecciones."
                    : "Los usuarios pueden participar en votaciones y ver resultados."}
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAssignRoleDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleAssignRole}>Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
