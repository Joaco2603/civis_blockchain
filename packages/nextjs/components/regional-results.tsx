"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export function RegionalResults() {
  const [selectedRegion, setSelectedRegion] = useState("norte")

  const regions = [
    { value: "norte", label: "Región Norte" },
    { value: "sur", label: "Región Sur" },
    { value: "este", label: "Región Este" },
    { value: "oeste", label: "Región Oeste" },
    { value: "central", label: "Región Central" },
  ]

  const resultsData = {
    norte: [
      { name: "Ana Martínez", value: 45.2, color: "#3b82f6" },
      { name: "Carlos Rodríguez", value: 32.1, color: "#ef4444" },
      { name: "Elena Sánchez", value: 18.5, color: "#10b981" },
      { name: "Miguel Torres", value: 3.2, color: "#f59e0b" },
      { name: "Voto en Blanco", value: 1.0, color: "#6b7280" },
    ],
    sur: [
      { name: "Ana Martínez", value: 38.7, color: "#3b82f6" },
      { name: "Carlos Rodríguez", value: 42.3, color: "#ef4444" },
      { name: "Elena Sánchez", value: 12.8, color: "#10b981" },
      { name: "Miguel Torres", value: 5.1, color: "#f59e0b" },
      { name: "Voto en Blanco", value: 1.1, color: "#6b7280" },
    ],
    este: [
      { name: "Ana Martínez", value: 41.5, color: "#3b82f6" },
      { name: "Carlos Rodríguez", value: 35.8, color: "#ef4444" },
      { name: "Elena Sánchez", value: 16.2, color: "#10b981" },
      { name: "Miguel Torres", value: 5.5, color: "#f59e0b" },
      { name: "Voto en Blanco", value: 1.0, color: "#6b7280" },
    ],
    oeste: [
      { name: "Ana Martínez", value: 44.1, color: "#3b82f6" },
      { name: "Carlos Rodríguez", value: 33.7, color: "#ef4444" },
      { name: "Elena Sánchez", value: 17.3, color: "#10b981" },
      { name: "Miguel Torres", value: 3.9, color: "#f59e0b" },
      { name: "Voto en Blanco", value: 1.0, color: "#6b7280" },
    ],
    central: [
      { name: "Ana Martínez", value: 43.2, color: "#3b82f6" },
      { name: "Carlos Rodríguez", value: 36.8, color: "#ef4444" },
      { name: "Elena Sánchez", value: 14.5, color: "#10b981" },
      { name: "Miguel Torres", value: 4.5, color: "#f59e0b" },
      { name: "Voto en Blanco", value: 1.0, color: "#6b7280" },
    ],
  }

  const data = resultsData[selectedRegion as keyof typeof resultsData]

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Resultados por Región</CardTitle>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar región" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region.value} value={region.value}>
                  {region.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <Chart>
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
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

        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          Participación en {regions.find((r) => r.value === selectedRegion)?.label}:
          {selectedRegion === "norte"
            ? " 72.1%"
            : selectedRegion === "sur"
              ? " 65.8%"
              : selectedRegion === "este"
                ? " 68.3%"
                : selectedRegion === "oeste"
                  ? " 69.5%"
                  : " 70.2%"}
        </div>
      </CardContent>
    </Card>
  )
}
