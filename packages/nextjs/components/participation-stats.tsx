"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
} from "../components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

export function ParticipationStats() {
  const data = [
    { name: "Han votado", value: 42.8, color: "#3b82f6" },
    { name: "No han votado", value: 57.2, color: "#e5e7eb" },
  ]

  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Participación Actual</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[180px]">
          <Chart>
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Chart>
        </div>

        <div className="mt-2 flex justify-center">
          <ChartLegend>
            {data.map((entry, index) => (
              <ChartLegendItem key={index} name={entry.name} color={entry.color} />
            ))}
          </ChartLegend>
        </div>

        <div className="mt-4 text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">42.8%</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Participación total</div>
        </div>
      </CardContent>
    </Card>
  )
}
