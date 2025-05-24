"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, ZoomIn, ZoomOut } from "lucide-react"
import { Chart, ChartContainer } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts"

export function TimeSeriesAnalysis() {
  const [timeRange, setTimeRange] = useState("day")
  const [chartType, setChartType] = useState<"line" | "area">("line")
  const [zoomLevel, setZoomLevel] = useState(1)

  // Hourly data for election day
  const hourlyData = [
    { time: "08:00", "Ana Martínez": 10.2, "Carlos Rodríguez": 8.5, "Elena Sánchez": 3.8, "Miguel Torres": 1.2 },
    { time: "09:00", "Ana Martínez": 12.5, "Carlos Rodríguez": 10.2, "Elena Sánchez": 4.5, "Miguel Torres": 1.5 },
    { time: "10:00", "Ana Martínez": 15.8, "Carlos Rodríguez": 13.1, "Elena Sánchez": 5.9, "Miguel Torres": 1.8 },
    { time: "11:00", "Ana Martínez": 18.2, "Carlos Rodríguez": 15.5, "Elena Sánchez": 6.8, "Miguel Torres": 2.1 },
    { time: "12:00", "Ana Martínez": 21.5, "Carlos Rodríguez": 18.2, "Elena Sánchez": 7.9, "Miguel Torres": 2.3 },
    { time: "13:00", "Ana Martínez": 24.8, "Carlos Rodríguez": 20.5, "Elena Sánchez": 8.8, "Miguel Torres": 2.6 },
    { time: "14:00", "Ana Martínez": 27.2, "Carlos Rodríguez": 22.8, "Elena Sánchez": 9.9, "Miguel Torres": 2.9 },
    { time: "15:00", "Ana Martínez": 30.5, "Carlos Rodríguez": 25.2, "Elena Sánchez": 11.2, "Miguel Torres": 3.2 },
    { time: "16:00", "Ana Martínez": 33.8, "Carlos Rodríguez": 28.5, "Elena Sánchez": 12.5, "Miguel Torres": 3.5 },
    { time: "17:00", "Ana Martínez": 36.2, "Carlos Rodríguez": 30.8, "Elena Sánchez": 13.5, "Miguel Torres": 3.8 },
    { time: "18:00", "Ana Martínez": 38.5, "Carlos Rodríguez": 32.5, "Elena Sánchez": 14.2, "Miguel Torres": 4.0 },
    { time: "19:00", "Ana Martínez": 40.8, "Carlos Rodríguez": 34.2, "Elena Sánchez": 15.0, "Miguel Torres": 4.1 },
    { time: "20:00", "Ana Martínez": 42.8, "Carlos Rodríguez": 36.2, "Elena Sánchez": 15.8, "Miguel Torres": 4.3 },
  ]

  // Daily data for election week
  const dailyData = [
    { date: "10/06", "Ana Martínez": 0, "Carlos Rodríguez": 0, "Elena Sánchez": 0, "Miguel Torres": 0 },
    { date: "11/06", "Ana Martínez": 0, "Carlos Rodríguez": 0, "Elena Sánchez": 0, "Miguel Torres": 0 },
    { date: "12/06", "Ana Martínez": 0, "Carlos Rodríguez": 0, "Elena Sánchez": 0, "Miguel Torres": 0 },
    { date: "13/06", "Ana Martínez": 0, "Carlos Rodríguez": 0, "Elena Sánchez": 0, "Miguel Torres": 0 },
    { date: "14/06", "Ana Martínez": 0, "Carlos Rodríguez": 0, "Elena Sánchez": 0, "Miguel Torres": 0 },
    { date: "15/06", "Ana Martínez": 42.8, "Carlos Rodríguez": 36.2, "Elena Sánchez": 15.8, "Miguel Torres": 4.3 },
  ]

  // Historical data for past elections
  const historicalData = [
    {
      year: "2008",
      "Partido Democrático": 48.2,
      "Alianza Progresista": 45.5,
      "Unión Republicana": 5.2,
      "Movimiento Ciudadano": 0,
    },
    {
      year: "2012",
      "Partido Democrático": 51.5,
      "Alianza Progresista": 42.8,
      "Unión Republicana": 4.5,
      "Movimiento Ciudadano": 0,
    },
    {
      year: "2016",
      "Partido Democrático": 47.8,
      "Alianza Progresista": 45.2,
      "Unión Republicana": 5.8,
      "Movimiento Ciudadano": 0,
    },
    {
      year: "2020",
      "Partido Democrático": 49.5,
      "Alianza Progresista": 43.8,
      "Unión Republicana": 5.2,
      "Movimiento Ciudadano": 0.5,
    },
    {
      year: "2024",
      "Partido Democrático": 42.8,
      "Alianza Progresista": 36.2,
      "Unión Republicana": 15.8,
      "Movimiento Ciudadano": 4.3,
    },
  ]

  // Get the appropriate data based on the selected time range
  const getTimeData = () => {
    switch (timeRange) {
      case "day":
        return hourlyData
      case "week":
        return dailyData
      case "historical":
        return historicalData
      default:
        return hourlyData
    }
  }

  const data = getTimeData()

  // Apply zoom level to data
  const zoomedData = () => {
    if (zoomLevel === 1 || data.length <= 5) return data

    const middleIndex = Math.floor(data.length / 2)
    const range = Math.floor(data.length / (zoomLevel * 2))
    const start = Math.max(0, middleIndex - range)
    const end = Math.min(data.length, middleIndex + range)

    return data.slice(start, end)
  }

  // Get the appropriate x-axis key based on the selected time range
  const getXAxisKey = () => {
    switch (timeRange) {
      case "day":
        return "time"
      case "week":
        return "date"
      case "historical":
        return "year"
      default:
        return "time"
    }
  }

  // Get the appropriate lines based on the selected time range
  const getLines = () => {
    if (timeRange === "historical") {
      return [
        { dataKey: "Partido Democrático", stroke: "#3b82f6", name: "Partido Democrático" },
        { dataKey: "Alianza Progresista", stroke: "#ef4444", name: "Alianza Progresista" },
        { dataKey: "Unión Republicana", stroke: "#10b981", name: "Unión Republicana" },
        { dataKey: "Movimiento Ciudadano", stroke: "#f59e0b", name: "Movimiento Ciudadano" },
      ]
    } else {
      return [
        { dataKey: "Ana Martínez", stroke: "#3b82f6", name: "Ana Martínez" },
        { dataKey: "Carlos Rodríguez", stroke: "#ef4444", name: "Carlos Rodríguez" },
        { dataKey: "Elena Sánchez", stroke: "#10b981", name: "Elena Sánchez" },
        { dataKey: "Miguel Torres", stroke: "#f59e0b", name: "Miguel Torres" },
      ]
    }
  }

  const lines = getLines()
  const xAxisKey = getXAxisKey()
  const displayData = zoomedData()

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between flex-wrap gap-2">
          <span>Análisis Temporal de Resultados</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setChartType(chartType === "line" ? "area" : "line")}>
              {chartType === "line" ? "Ver gráfico de área" : "Ver gráfico de líneas"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setZoomLevel(Math.min(zoomLevel + 1, 3))}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setZoomLevel(Math.max(zoomLevel - 1, 1))}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="day" value={timeRange} onValueChange={setTimeRange} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="day">Día de Elección</TabsTrigger>
            <TabsTrigger value="week">Semana Electoral</TabsTrigger>
            <TabsTrigger value="historical">Histórico</TabsTrigger>
          </TabsList>

          <div className="h-[350px]">
            <Chart>
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === "line" ? (
                    <LineChart data={displayData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey={xAxisKey} />
                      <YAxis tickFormatter={(value) => `${value}%`} />
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
                      <Legend />
                      {lines.map((line, index) => (
                        <Line
                          key={index}
                          type="monotone"
                          dataKey={line.dataKey}
                          stroke={line.stroke}
                          name={line.name}
                          strokeWidth={2}
                          dot={{ r: 4, strokeWidth: 1 }}
                          activeDot={{ r: 6 }}
                        />
                      ))}
                    </LineChart>
                  ) : (
                    <AreaChart data={displayData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey={xAxisKey} />
                      <YAxis tickFormatter={(value) => `${value}%`} />
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
                      <Legend />
                      {lines.map((line, index) => (
                        <Area
                          key={index}
                          type="monotone"
                          dataKey={line.dataKey}
                          stroke={line.stroke}
                          fill={`${line.stroke}33`}
                          name={line.name}
                          strokeWidth={2}
                          activeDot={{ r: 6 }}
                        />
                      ))}
                    </AreaChart>
                  )}
                </ResponsiveContainer>
              </ChartContainer>
            </Chart>
          </div>

          <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            {timeRange === "day"
              ? "Evolución de resultados durante el día de la elección"
              : timeRange === "week"
                ? "Evolución de resultados durante la semana electoral"
                : "Comparativa histórica de resultados por partido político"}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
