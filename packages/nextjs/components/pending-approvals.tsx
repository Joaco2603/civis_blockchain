"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Shield, User, AlertCircle } from "lucide-react"

export function PendingApprovals() {
  const [pendingItems, setPendingItems] = useState([
    {
      id: 1,
      type: "did",
      description: "Solicitud de DID",
      details: "0x8f5b4...3e21",
      status: "pending",
    },
    {
      id: 2,
      type: "did",
      description: "Solicitud de DID",
      details: "0x7a3d2...5f21",
      status: "pending",
    },
    {
      id: 3,
      type: "party",
      description: "Registro de Partido",
      details: "Alianza Democrática",
      status: "pending",
    },
    {
      id: 4,
      type: "did",
      description: "Solicitud de DID",
      details: "0x2e9f1...8c43",
      status: "pending",
    },
  ])

  const handleApprove = (id: number) => {
    setPendingItems(pendingItems.map((item) => (item.id === id ? { ...item, status: "approved" as const } : item)))
  }

  const handleReject = (id: number) => {
    setPendingItems(pendingItems.map((item) => (item.id === id ? { ...item, status: "rejected" as const } : item)))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "did":
        return <Shield className="h-4 w-4 text-blue-500" />
      case "party":
        return <User className="h-4 w-4 text-amber-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Aprobaciones Pendientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingItems.length === 0 ? (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">No hay aprobaciones pendientes</div>
          ) : (
            pendingItems.map((item) => (
              <div key={item.id} className="flex items-start space-x-3 border-b pb-3 last:border-0">
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">{getIcon(item.type)}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{item.description}</p>
                    {item.status === "pending" ? (
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                      >
                        Pendiente
                      </Badge>
                    ) : item.status === "approved" ? (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                      >
                        Aprobado
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                        Rechazado
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.details}</p>
                  {item.status === "pending" && (
                    <div className="flex space-x-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"
                        onClick={() => handleApprove(item.id)}
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Aprobar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
                        onClick={() => handleReject(item.id)}
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Rechazar
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
