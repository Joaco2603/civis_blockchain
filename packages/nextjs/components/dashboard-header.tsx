"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../components/ui/button"
import { ModeToggle } from "../components/mode-toggle"
import { useSidebar } from "../components/dashboard-sidebar"
import { useWeb3 } from "../app/store/web3-provider"
import { Menu, Bell, User, LogOut, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Badge } from "../components/ui/badge"

export function DashboardHeader() {
  const { toggleSidebar } = useSidebar()
  const { disconnect, role, userDID, address } = useWeb3()
  const router = useRouter()
  const [notificationsCount] = useState(3)

  const handleLogout = () => {
    disconnect()
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="flex-1">
        <h1 className="text-lg font-semibold md:text-xl">
          {role === "admin" ? "Panel de Administración" : "Panel de Usuario"}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notificationsCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full p-0 text-[10px]"
            >
              {notificationsCount}
            </Badge>
          )}
        </Button>

        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <div className="hidden text-left md:block">
                <div className="text-sm font-medium">{role === "admin" ? "Administrador" : "Usuario"}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]">
                  {userDID ? userDID.substring(0, 16) + "..." : address}
                </div>
              </div>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configuración</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400">
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
