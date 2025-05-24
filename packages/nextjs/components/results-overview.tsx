"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
} from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts"

export function ResultsOverview() {
  const data = [
    { name: "Ana Martínez", votes: 1245789, percentage: 42.8, color: "#3b82f6" },
    { name: "Carlos Rodríguez", votes: 1052436, percentage: 36.2, color: "#ef4444" },
    { name: "Elena Sánchez", votes: 458921, percentage: 15.8, color: "#10b981" },
    { name: "Miguel Torres", votes: 125478, percentage: 4.3, color: "#f59e0b" },
    { name: "Voto en Blanco", votes: 25874, percentage: 0.9, color: "#6b7280" },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Resultados Elección Presidencial 2024</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Chart>
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ top: 10, right: 10, left: 100, bottom: 0 }}>
                  <XAxis
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    domain={[0, 50]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    width={100}
                  />
                  <Bar dataKey="percentage" radius={[0, 4, 4, 0]} barSize={30}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                  <ChartTooltip
                    content={<ChartTooltipContent formatter={(value: any) => [`${value}%`, "Porcentaje"]} />}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Chart>
        </div>

        <div className="mt-4">
          <ChartLegend>
            {data.map((entry, index) => (
              <ChartLegendItem key={index} name={`${entry.name} (${entry.percentage}%)`} color={entry.color} />
            ))}
          </ChartLegend>
        </div>

        <div className="mt-6 text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">Total de votos contabilizados: 2,908,498</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Participación: 68.4% del padrón electoral</div>
        </div>
      </CardContent>
    </Card>
  )
}
