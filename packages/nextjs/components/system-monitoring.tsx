"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart, ChartContainer } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

export function SystemMonitoring() {
  const data = [
    { time: "00:00", cpu: 12, memory: 35, network: 5 },
    { time: "04:00", cpu: 15, memory: 36, network: 6 },
    { time: "08:00", cpu: 25, memory: 40, network: 12 },
    { time: "12:00", cpu: 45, memory: 52, network: 25 },
    { time: "16:00", cpu: 55, memory: 58, network: 30 },
    { time: "20:00", cpu: 40, memory: 50, network: 20 },
    { time: "Now", cpu: 35, memory: 45, network: 15 },
  ]

  const services = [
    { name: "Blockchain Node", status: "operational" },
    { name: "API Gateway", status: "operational" },
    { name: "Authentication Service", status: "operational" },
    { name: "Database", status: "operational" },
    { name: "Vote Processing", status: "operational" },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Estado del Sistema</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <Chart>
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    width={30}
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
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
                                <span className="font-medium">{entry.value}%</span>
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
                    dataKey="cpu"
                    stroke="#3b82f6"
                    name="CPU"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="memory"
                    stroke="#10b981"
                    name="Memoria"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="network"
                    stroke="#f59e0b"
                    name="Red"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Chart>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Estado de Servicios</h4>
          <div className="space-y-2">
            {services.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                <span className="text-sm">{service.name}</span>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Operativo
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
