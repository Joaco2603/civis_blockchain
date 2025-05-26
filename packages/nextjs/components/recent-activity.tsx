"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "~~/components/ui/card";
import { Badge } from "~~/components/ui/badge";
import { CalendarClock, User, Shield, Vote } from "lucide-react";

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "did",
      description: "Nueva solicitud de DID recibida",
      time: "Hace 5 minutos",
      user: "0x7a3d...5f21"
    },
    {
      id: 2,
      type: "election",
      description: "Elección Presidencial 2024 actualizada",
      time: "Hace 30 minutos",
      user: "Admin"
    },
    {
      id: 3,
      type: "party",
      description: "Partido 'Movimiento Ciudadano' registrado",
      time: "Hace 2 horas",
      user: "Admin"
    },
    {
      id: 4,
      type: "did",
      description: "5 DIDs verificados automáticamente",
      time: "Hace 3 horas",
      user: "Sistema"
    },
    {
      id: 5,
      type: "election",
      description: "Resultados preliminares publicados",
      time: "Hace 5 horas",
      user: "Sistema"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "did":
        return <Shield className="h-4 w-4 text-blue-500" />;
      case "election":
        return <Vote className="h-4 w-4 text-green-500" />;
      case "party":
        return <User className="h-4 w-4 text-amber-500" />;
      default:
        return <CalendarClock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getBadge = (type: string) => {
    switch (type) {
      case "did":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
          >
            DID
          </Badge>
        );
      case "election":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300"
          >
            Elección
          </Badge>
        );
      case "party":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
          >
            Partido
          </Badge>
        );
      default:
        return <Badge variant="outline">Otro</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 border-b pb-3 last:border-0"
            >
              <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{activity.description}</p>
                  {getBadge(activity.type)}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{activity.time}</span>
                  <span>Por: {activity.user}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
