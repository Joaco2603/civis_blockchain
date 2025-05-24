"use client"

import { createContext, useContext, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Vote,
  BarChart3,
  FileText,
  Shield,
  X,
  Settings,
  Users,
  ListPlus,
  UserCircle,
  History,
} from "lucide-react"
import { Button } from "../components/ui/button"
import { Sheet, SheetContent } from "../components/ui/sheet"
import { useWeb3 } from "../app/store/web3-provider"

type SidebarContextType = {
  open: boolean
  setOpen: (open: boolean) => void
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType>({
  open: false,
  setOpen: () => {},
  toggleSidebar: () => {},
})

export const useSidebar = () => useContext(SidebarContext)

export function DashboardSidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { role } = useWeb3()

  const toggleSidebar = () => {
    setOpen(!open)
  }

  // User navigation items
  const userNavItems = [
    {
      title: "Panel Principal",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Mi Perfil",
      href: "/dashboard/profile",
      icon: UserCircle,
    },
    {
      title: "Votaciones Activas",
      href: "/dashboard/vote/active",
      icon: Vote,
    },
    {
      title: "Mis Votos",
      href: "/dashboard/vote/history",
      icon: History,
    },
    {
      title: "Resultados",
      href: "/dashboard/results",
      icon: BarChart3,
    },
    {
      title: "Auditoría",
      href: "/dashboard/audit",
      icon: Shield,
    },
    {
      title: "Documentación",
      href: "/dashboard/docs",
      icon: FileText,
    },
  ]

  // Admin navigation items
  const adminNavItems = [
    {
      title: "Panel de Control",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Gestión de DIDs",
      href: "/dashboard/admin/dids",
      icon: Shield,
    },
    {
      title: "Asignación de Roles",
      href: "/dashboard/admin/roles",
      icon: UserCircle,
    },
    {
      title: "Partidos Políticos",
      href: "/dashboard/admin/parties",
      icon: Users,
    },
    {
      title: "Elecciones",
      href: "/dashboard/admin/elections",
      icon: Vote,
    },
    {
      title: "Crear Elección",
      href: "/dashboard/admin/elections/create",
      icon: ListPlus,
    },
    {
      title: "Estadísticas",
      href: "/dashboard/admin/stats",
      icon: BarChart3,
    },
    {
      title: "Configuración",
      href: "/dashboard/admin/settings",
      icon: Settings,
    },
  ]

  // Use the appropriate navigation items based on user role
  const navItems = role === "admin" ? adminNavItems : userNavItems

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span className="font-bold text-lg">VotaChain</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">Plataforma de Votación</p>
          {role === "admin" && (
            <span className="text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 px-2 py-0.5 rounded-full">
              Admin
            </span>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                isActive
                  ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-50"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              onClick={() => setOpen(false)}
            >
              <item.icon
                className={`h-5 w-5 ${
                  isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
                }`}
              />
              <span className={isActive ? "font-medium" : ""}>{item.title}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
          <h4 className="font-medium text-sm text-blue-900 dark:text-blue-100">Votación Segura</h4>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
            Tus votos son anónimos y verificables en la blockchain.
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <SidebarContext.Provider value={{ open, setOpen, toggleSidebar }}>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 border-r bg-white dark:bg-gray-950 h-screen sticky top-0">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </SidebarContext.Provider>
  )
}
