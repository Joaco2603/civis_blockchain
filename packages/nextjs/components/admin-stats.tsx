"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart, ChartContainer } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function AdminStats() {
  const data = [
    { name: "Ene", usuarios: 120, dids: 80, elecciones: 1 },
    { name: "Feb", usuarios: 180, dids: 150, elecciones: 1 },
    { name: "Mar", usuarios: 250, dids: 210, elecciones: 2 },
    { name: "Abr", usuarios: 380, dids: 320, elecciones: 2 },
    { name: "May", usuarios: 520, dids: 450, elecciones: 3 },
    { name: "Jun", usuarios: 680, dids: 580, elecciones: 3 },
    { name: "Jul", usuarios: 820, dids: 700, elecciones: 4 },
    { name: "Ago", usuarios: 950, dids: 820, elecciones: 4 },
    { name: "Sep", usuarios: 1050, dids: 900, elecciones: 5 },
    { name: "Oct", usuarios: 1150, dids: 980, elecciones: 5 },
    { name: "Nov", usuarios: 1220, dids: 1050, elecciones: 6 },
    { name: "Dic", usuarios: 1245, dids: 1100, elecciones: 6 },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Estadísticas del Sistema</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Chart>
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white dark:bg-gray-800 p-2 rounded-md border shadow-sm">
                            <p className="font-medium">{label}</p>
                            {payload.map((entry, index) => (
                              <div key={index} className="flex items-center text-xs">
                                <div
                                  className="w-2 h-2 rounded-full mr-1"
                                  style={{ backgroundColor: entry.color }}
                                ></div>
                                <span className="mr-1">{entry.name}:</span>
                                <span className="font-medium">{entry.value}</span>
                              </div>
                            ))}
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="usuarios"
                    stroke="#3b82f6"
                    name="Usuarios"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="dids"
                    stroke="#10b981"
                    name="DIDs"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="elecciones"
                    stroke="#f59e0b"
                    name="Elecciones"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Chart>
        </div>
      </CardContent>
    </Card>
  )
}
