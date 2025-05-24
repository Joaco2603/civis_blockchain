"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"

export function HistoricalComparison() {
  const data = [
    { year: "2008", participation: 58.2 },
    { year: "2012", participation: 62.5 },
    { year: "2016", participation: 60.1 },
    { year: "2020", participation: 65.7 },
    { year: "2024", participation: 68.4 },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Comparativa Histórica de Participación</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <Chart>
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    domain={[50, 70]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Line
                    type="monotone"
                    dataKey="participation"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ r: 6, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }}
                    activeDot={{ r: 8 }}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent formatter={(value: any) => [`${value}%`, "Participación"]} />}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Chart>
        </div>

        <div className="mt-4 text-center">
          <div className="text-sm font-medium">Tendencia de participación electoral</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            La participación ha aumentado un 10.2% desde 2008
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
