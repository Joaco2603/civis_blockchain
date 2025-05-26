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
import { Search, Plus, UserCheck, UserX, Shield, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export function RoleManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newUserDID, setNewUserDID] = useState("");
  const [newUserRole, setNewUserRole] = useState("user");
  const [newUserAddress, setNewUserAddress] = useState("");

  // Mock users data with roles
  const users = [
    {
      id: 1,
      did: "did:ethr:starknet:0x8f5b43e21",
      address: "0x8f5b4...3e21",
      role: "admin",
      createdAt: "15 May 2024",
      lastActive: "18 May 2024"
    },
    {
      id: 2,
      did: "did:ethr:starknet:0x7a3d25f21",
      address: "0x7a3d2...5f21",
      role: "user",
      createdAt: "16 May 2024",
      lastActive: "17 May 2024"
    },
    {
      id: 3,
      did: "did:ethr:starknet:0x2e9f18c43",
      address: "0x2e9f1...8c43",
      role: "user",
      createdAt: "14 May 2024",
      lastActive: "17 May 2024"
    },
    {
      id: 4,
      did: "did:ethr:starknet:0x1c8d39a76",
      address: "0x1c8d3...9a76",
      role: "admin",
      createdAt: "12 May 2024",
      lastActive: "18 May 2024"
    },
    {
      id: 5,
      did: "did:ethr:starknet:0x9b4e27d12",
      address: "0x9b4e2...7d12",
      role: "user",
      createdAt: "10 May 2024",
      lastActive: "15 May 2024"
    }
  ];

  // Filter users based on search term and active tab
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.did.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.address.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "admin") return matchesSearch && user.role === "admin";
    if (activeTab === "user") return matchesSearch && user.role === "user";

    return matchesSearch;
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
          >
            <Shield className="h-3 w-3 mr-1" />
            Administrador
          </Badge>
        );
      case "user":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
          >
            <User className="h-3 w-3 mr-1" />
            Usuario
          </Badge>
        );
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const handleAddUser = () => {
    // En una implementación real, aquí se añadiría el usuario a la blockchain o base de datos
    console.log("Añadiendo usuario:", {
      did: newUserDID,
      address: newUserAddress,
      role: newUserRole
    });
    setIsAddDialogOpen(false);
    setNewUserDID("");
    setNewUserAddress("");
    setNewUserRole("user");
  };

  const handleChangeRole = (userId: number, newRole: string) => {
    // En una implementación real, aquí se actualizaría el rol en la blockchain o base de datos
    console.log("Cambiando rol del usuario", userId, "a", newRole);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Gestión de Roles de Usuario</CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Asignar Rol
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Asignar Rol a Usuario</DialogTitle>
                <DialogDescription>
                  Asigna un rol a un usuario existente o crea un nuevo registro
                  de usuario.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="did" className="text-right">
                    DID
                  </Label>
                  <Input
                    id="did"
                    value={newUserDID}
                    onChange={(e) => setNewUserDID(e.target.value)}
                    placeholder="did:ethr:starknet:0x..."
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">
                    Dirección
                  </Label>
                  <Input
                    id="address"
                    value={newUserAddress}
                    onChange={(e) => setNewUserAddress(e.target.value)}
                    placeholder="0x..."
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Rol
                  </Label>
                  <Select value={newUserRole} onValueChange={setNewUserRole}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="user">Usuario</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleAddUser}>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
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

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="admin">Administradores</TabsTrigger>
              <TabsTrigger value="user">Usuarios</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>DID</TableHead>
                      <TableHead>Dirección</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Creado</TableHead>
                      <TableHead>Última Actividad</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center py-6 text-gray-500 dark:text-gray-400"
                        >
                          No se encontraron usuarios
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-mono text-xs">
                            {user.did}
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            {user.address}
                          </TableCell>
                          <TableCell>{getRoleBadge(user.role)}</TableCell>
                          <TableCell>{user.createdAt}</TableCell>
                          <TableCell>{user.lastActive}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              {user.role === "user" ? (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 text-xs text-amber-600"
                                  onClick={() =>
                                    handleChangeRole(user.id, "admin")
                                  }
                                >
                                  <UserCheck className="h-3.5 w-3.5 mr-1" />
                                  Hacer Admin
                                </Button>
                              ) : (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 text-xs text-blue-600"
                                  onClick={() =>
                                    handleChangeRole(user.id, "user")
                                  }
                                >
                                  <UserX className="h-3.5 w-3.5 mr-1" />
                                  Hacer Usuario
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
            <TabsContent value="admin" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>DID</TableHead>
                      <TableHead>Dirección</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Creado</TableHead>
                      <TableHead>Última Actividad</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center py-6 text-gray-500 dark:text-gray-400"
                        >
                          No se encontraron administradores
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-mono text-xs">
                            {user.did}
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            {user.address}
                          </TableCell>
                          <TableCell>{getRoleBadge(user.role)}</TableCell>
                          <TableCell>{user.createdAt}</TableCell>
                          <TableCell>{user.lastActive}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-blue-600"
                              onClick={() => handleChangeRole(user.id, "user")}
                            >
                              <UserX className="h-3.5 w-3.5 mr-1" />
                              Hacer Usuario
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="user" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>DID</TableHead>
                      <TableHead>Dirección</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Creado</TableHead>
                      <TableHead>Última Actividad</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center py-6 text-gray-500 dark:text-gray-400"
                        >
                          No se encontraron usuarios normales
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-mono text-xs">
                            {user.did}
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            {user.address}
                          </TableCell>
                          <TableCell>{getRoleBadge(user.role)}</TableCell>
                          <TableCell>{user.createdAt}</TableCell>
                          <TableCell>{user.lastActive}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-amber-600"
                              onClick={() => handleChangeRole(user.id, "admin")}
                            >
                              <UserCheck className="h-3.5 w-3.5 mr-1" />
                              Hacer Admin
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
  );
}
