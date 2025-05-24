"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~~/components/ui/card"
import { Button } from "~~/components/ui/button"
import { Input } from "~~/components/ui/input"
import { Label } from "~~/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~~/components/ui/tabs"
import { Shield, User, Key, Mail, Save } from "lucide-react"
import { Switch } from "~~/components/ui/switch"
import { useWeb3 } from "~~/app/store/web3-provider"

export function UserProfile() {
  const { address, userDID } = useWeb3()
  const [email, setEmail] = useState("usuario@ejemplo.com")
  const [notifyElections, setNotifyElections] = useState(true)
  const [notifyResults, setNotifyResults] = useState(true)
  const [notifyUpdates, setNotifyUpdates] = useState(false)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Información de Usuario</CardTitle>
            <CardDescription>Tu información personal y de identidad</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-full">
                <User className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Dirección de Wallet</Label>
              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border font-mono text-sm">{address}</div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                Identificador Descentralizado (DID)
              </Label>
              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border font-mono text-xs break-all">
                {userDID}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Estado de Verificación</Label>
              <div className="p-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded border border-green-200 dark:border-green-800 text-sm">
                Verificado
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Configuración de Cuenta</CardTitle>
            <CardDescription>Administra tus preferencias y configuración</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="general">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="security">Seguridad</TabsTrigger>
                <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <div className="flex space-x-2">
                    <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-2" />
                    <Input
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@correo.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Idioma</Label>
                  <select className="w-full p-2 border rounded-md bg-white dark:bg-gray-800">
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Zona Horaria</Label>
                  <select className="w-full p-2 border rounded-md bg-white dark:bg-gray-800">
                    <option value="utc-3">América/Buenos_Aires (UTC-3)</option>
                    <option value="utc-4">América/Santiago (UTC-4)</option>
                    <option value="utc-5">América/Bogotá (UTC-5)</option>
                    <option value="utc-6">América/Ciudad_de_México (UTC-6)</option>
                  </select>
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                <div className="space-y-2">
                  <Label>Método de Autenticación</Label>
                  <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border flex items-center">
                    <Key className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                    <span>Wallet + ZK Passport</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Sesiones Activas</Label>
                  <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Este dispositivo</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Última actividad: Ahora</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Cerrar
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Historial de Actividad</Label>
                  <div className="space-y-2">
                    <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border">
                      <p className="font-medium">Inicio de sesión</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Hace 10 minutos</p>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border">
                      <p className="font-medium">Voto emitido</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Hace 2 días</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notify-elections">Nuevas Elecciones</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Recibe notificaciones cuando se creen nuevas elecciones
                      </p>
                    </div>
                    <Switch id="notify-elections" checked={notifyElections} onCheckedChange={setNotifyElections} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notify-results">Resultados</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Recibe notificaciones cuando se publiquen resultados
                      </p>
                    </div>
                    <Switch id="notify-results" checked={notifyResults} onCheckedChange={setNotifyResults} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notify-updates">Actualizaciones del Sistema</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Recibe notificaciones sobre actualizaciones de la plataforma
                      </p>
                    </div>
                    <Switch id="notify-updates" checked={notifyUpdates} onCheckedChange={setNotifyUpdates} />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>
              <Save className="h-4 w-4 mr-1" />
              Guardar Cambios
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
