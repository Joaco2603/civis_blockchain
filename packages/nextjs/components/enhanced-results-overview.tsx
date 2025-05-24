"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart, ChartContainer, ChartLegend, ChartLegendItem } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts"
import { DataFilterBar, type FilterState } from "@/components/data-filter-bar"

export function EnhancedResultsOverview() {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { from: undefined, to: undefined },
    regions: [],
    demographics: [],
    ageRange: [18, 80],
    showRealTime: true,
    chartType: "bar",
  })

  const [activeTab, setActiveTab] = useState("general")
  const [filteredData, setFilteredData] = useState<any[]>([])

  // Base data
  const generalData = [
    { name: "Ana Martínez", votes: 1245789, percentage: 42.8, color: "#3b82f6" },
    { name: "Carlos Rodríguez", votes: 1052436, percentage: 36.2, color: "#ef4444" },
    { name: "Elena Sánchez", votes: 458921, percentage: 15.8, color: "#10b981" },
    { name: "Miguel Torres", votes: 125478, percentage: 4.3, color: "#f59e0b" },
    { name: "Voto en Blanco", votes: 25874, percentage: 0.9, color: "#6b7280" },
  ]

  const demographicData = {
    urban: [
      { name: "Ana Martínez", votes: 845789, percentage: 45.2, color: "#3b82f6" },
      { name: "Carlos Rodríguez", votes: 652436, percentage: 34.8, color: "#ef4444" },
      { name: "Elena Sánchez", votes: 258921, percentage: 13.8, color: "#10b981" },
      { name: "Miguel Torres", votes: 95478, percentage: 5.1, color: "#f59e0b" },
      { name: "Voto en Blanco", votes: 15874, percentage: 0.8, color: "#6b7280" },
    ],
    rural: [
      { name: "Ana Martínez", votes: 400000, percentage: 38.1, color: "#3b82f6" },
      { name: "Carlos Rodríguez", votes: 400000, percentage: 38.1, color: "#ef4444" },
      { name: "Elena Sánchez", votes: 200000, percentage: 19.0, color: "#10b981" },
      { name: "Miguel Torres", votes: 30000, percentage: 2.9, color: "#f59e0b" },
      { name: "Voto en Blanco", votes: 10000, percentage: 1.0, color: "#6b7280" },
    ],
    firstTime: [
      { name: "Ana Martínez", votes: 245789, percentage: 38.5, color: "#3b82f6" },
      { name: "Carlos Rodríguez", votes: 152436, percentage: 23.9, color: "#ef4444" },
      { name: "Elena Sánchez", votes: 158921, percentage: 24.9, color: "#10b981" },
      { name: "Miguel Torres", votes: 75478, percentage: 11.8, color: "#f59e0b" },
      { name: "Voto en Blanco", votes: 5874, percentage: 0.9, color: "#6b7280" },
    ],
  }

  const regionalData = {
    norte: [
      { name: "Ana Martínez", votes: 345789, percentage: 45.2, color: "#3b82f6" },
      { name: "Carlos Rodríguez", votes: 252436, percentage: 33.0, color: "#ef4444" },
      { name: "Elena Sánchez", votes: 128921, percentage: 16.8, color: "#10b981" },
      { name: "Miguel Torres", votes: 35478, percentage: 4.6, color: "#f59e0b" },
      { name: "Voto en Blanco", votes: 2874, percentage: 0.4, color: "#6b7280" },
    ],
    sur: [
      { name: "Ana Martínez", votes: 200000, percentage: 38.7, color: "#3b82f6" },
      { name: "Carlos Rodríguez", votes: 220000, percentage: 42.6, color: "#ef4444" },
      { name: "Elena Sánchez", votes: 68000, percentage: 13.2, color: "#10b981" },
      { name: "Miguel Torres", votes: 25000, percentage: 4.8, color: "#f59e0b" },
      { name: "Voto en Blanco", votes: 3500, percentage: 0.7, color: "#6b7280" },
    ],
    este: [
      { name: "Ana Martínez", votes: 245000, percentage: 41.5, color: "#3b82f6" },
      { name: "Carlos Rodríguez", votes: 212000, percentage: 35.9, color: "#ef4444" },
      { name: "Elena Sánchez", votes: 96000, percentage: 16.3, color: "#10b981" },
      { name: "Miguel Torres", votes: 32000, percentage: 5.4, color: "#f59e0b" },
      { name: "Voto en Blanco", votes: 5000, percentage: 0.8, color: "#6b7280" },
    ],
    oeste: [
      { name: "Ana Martínez", votes: 255000, percentage: 44.1, color: "#3b82f6" },
      { name: "Carlos Rodríguez", votes: 195000, percentage: 33.7, color: "#ef4444" },
      { name: "Elena Sánchez", votes: 100000, percentage: 17.3, color: "#10b981" },
      { name: "Miguel Torres", votes: 23000, percentage: 4.0, color: "#f59e0b" },
      { name: "Voto en Blanco", votes: 5500, percentage: 0.9, color: "#6b7280" },
    ],
    central: [
      { name: "Ana Martínez", votes: 200000, percentage: 43.2, color: "#3b82f6" },
      { name: "Carlos Rodríguez", votes: 173000, percentage: 37.4, color: "#ef4444" },
      { name: "Elena Sánchez", votes: 66000, percentage: 14.3, color: "#10b981" },
      { name: "Miguel Torres", votes: 20000, percentage: 4.3, color: "#f59e0b" },
      { name: "Voto en Blanco", votes: 4000, percentage: 0.9, color: "#6b7280" },
    ],
  }

  const ageData = {
    "18-30": [
      { name: "Ana Martínez", votes: 345789, percentage: 38.2, color: "#3b82f6" },
      { name: "Carlos Rodríguez", votes: 252436, percentage: 27.9, color: "#ef4444" },
      { name: "Elena Sánchez", votes: 228921, percentage: 25.3, color: "#10b981" },
      { name: "Miguel Torres", votes: 75478, percentage: 8.3, color: "#f59e0b" },
      { name: "Voto en Blanco", votes: 2874, percentage: 0.3, color: "#6b7280" },
    ],
    "31-50": [
      { name: "Ana Martínez", votes: 500000, percentage: 43.5, color: "#3b82f6" },
      { name: "Carlos Rodríguez", votes: 420000, percentage: 36.5, color: "#ef4444" },
      { name: "Elena Sánchez", votes: 168000, percentage: 14.6, color: "#10b981" },
      { name: "Miguel Torres", votes: 55000, percentage: 4.8, color: "#f59e0b" },
      { name: "Voto en Blanco", votes: 7000, percentage: 0.6, color: "#6b7280" },
    ],
    "51+": [
      { name: "Ana Martínez", votes: 400000, percentage: 45.7, color: "#3b82f6" },
      { name: "Carlos Rodríguez", votes: 380000, percentage: 43.4, color: "#ef4444" },
      { name: "Elena Sánchez", votes: 62000, percentage: 7.1, color: "#10b981" },
      { name: "Miguel Torres", votes: 25000, percentage: 2.9, color: "#f59e0b" },
      { name: "Voto en Blanco", votes: 8000, percentage: 0.9, color: "#6b7280" },
    ],
  }

  // Apply filters to data
  useEffect(() => {
    let newData = [...generalData]

    // Apply region filter if any
    if (filters.regions.length > 0) {
      let regionalResults: any[] = []
      filters.regions.forEach((region) => {
        if (regionalData[region as keyof typeof regionalData]) {
          regionalResults = [...regionalResults, ...regionalData[region as keyof typeof regionalData]]
        }
      })

      // Aggregate data by candidate
      if (regionalResults.length > 0) {
        const aggregated = generalData.map((candidate) => {
          const filtered = regionalResults.filter((item) => item.name === candidate.name)
          const totalVotes = filtered.reduce((sum, item) => sum + item.votes, 0)
          return {
            ...candidate,
            votes: totalVotes,
            // Recalculate percentage based on new totals
            percentage: 0, // Will be calculated after all candidates are processed
          }
        })

        // Calculate total votes to get percentages
        const totalVotes = aggregated.reduce((sum, item) => sum + item.votes, 0)
        newData = aggregated.map((item) => ({
          ...item,
          percentage: Number(((item.votes / totalVotes) * 100).toFixed(1)),
        }))
      }
    }

    // Apply demographic filter if any
    if (filters.demographics.length > 0) {
      let demographicResults: any[] = []
      filters.demographics.forEach((demo) => {
        if (demographicData[demo as keyof typeof demographicData]) {
          demographicResults = [...demographicResults, ...demographicData[demo as keyof typeof demographicData]]
        }
      })

      // Aggregate data by candidate
      if (demographicResults.length > 0) {
        const aggregated = generalData.map((candidate) => {
          const filtered = demographicResults.filter((item) => item.name === candidate.name)
          const totalVotes = filtered.reduce((sum, item) => sum + item.votes, 0)
          return {
            ...candidate,
            votes: totalVotes,
            percentage: 0, // Will be calculated after all candidates are processed
          }
        })

        // Calculate total votes to get percentages
        const totalVotes = aggregated.reduce((sum, item) => sum + item.votes, 0)
        newData = aggregated.map((item) => ({
          ...item,
          percentage: Number(((item.votes / totalVotes) * 100).toFixed(1)),
        }))
      }
    }

    // Apply age filter
    if (filters.ageRange[0] !== 18 || filters.ageRange[1] !== 80) {
      let ageResults: any[] = []

      if (filters.ageRange[0] <= 30 && filters.ageRange[1] >= 18) {
        ageResults = [...ageResults, ...ageData["18-30"]]
      }

      if (filters.ageRange[0] <= 50 && filters.ageRange[1] >= 31) {
        ageResults = [...ageResults, ...ageData["31-50"]]
      }

      if (filters.ageRange[1] >= 51) {
        ageResults = [...ageResults, ...ageData["51+"]]
      }

      // Aggregate data by candidate
      if (ageResults.length > 0) {
        const aggregated = generalData.map((candidate) => {
          const filtered = ageResults.filter((item) => item.name === candidate.name)
          const totalVotes = filtered.reduce((sum, item) => sum + item.votes, 0)
          return {
            ...candidate,
            votes: totalVotes,
            percentage: 0, // Will be calculated after all candidates are processed
          }
        })

        // Calculate total votes to get percentages
        const totalVotes = aggregated.reduce((sum, item) => sum + item.votes, 0)
        newData = aggregated.map((item) => ({
          ...item,
          percentage: Number(((item.votes / totalVotes) * 100).toFixed(1)),
        }))
      }
    }

    // Sort data by percentage in descending order
    newData.sort((a, b) => b.percentage - a.percentage)

    setFilteredData(newData)
  }, [filters, activeTab])

  // Format large numbers with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  // Calculate total votes
  const totalVotes = filteredData.reduce((sum, item) => sum + item.votes, 0)

  // Render the appropriate chart based on the selected type
  const renderChart = () => {
    switch (filters.chartType) {
      case "pie":
        return (
          <div className="h-[300px]">
            <Chart>
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={filteredData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="percentage"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    >
                      {filteredData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-white dark:bg-gray-800 p-2 rounded-md border shadow-sm">
                              <p className="font-medium">{data.name}</p>
                              <p className="text-sm">
                                {data.percentage}% ({formatNumber(data.votes)} votos)
                              </p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </Chart>
          </div>
        )

      case "line":
        // For line chart, we need to transform the data
        const lineData = filteredData.map((item, index) => ({
          name: item.name,
          value: item.percentage,
        }))

        return (
          <div className="h-[300px]">
            <Chart>
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, "dataMax + 5"]} tickFormatter={(value) => `${value}%`} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const candidate = filteredData.find((c) => c.name === label)
                          return (
                            <div className="bg-white dark:bg-gray-800 p-2 rounded-md border shadow-sm">
                              <p className="font-medium">{label}</p>
                              <p className="text-sm">
                                {payload[0].value}% ({formatNumber(candidate?.votes || 0)} votos)
                              </p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 6, fill: "#3b82f6" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </Chart>
          </div>
        )

      case "bar":
      default:
        return (
          <div className="h-[300px]">
            <Chart>
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredData} layout="vertical" margin={{ top: 10, right: 10, left: 100, bottom: 0 }}>
                    <XAxis
                      type="number"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      domain={[0, Math.ceil(Math.max(...filteredData.map((d) => d.percentage)) * 1.1)]}
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
                      {filteredData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = filteredData.find((item) => item.name === label)
                          return (
                            <div className="bg-white dark:bg-gray-800 p-2 rounded-md border shadow-sm">
                              <p className="font-medium">{label}</p>
                              <p className="text-sm">
                                {payload[0].value}% ({formatNumber(data?.votes || 0)} votos)
                              </p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </Chart>
          </div>
        )
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>
          <span>Resultados Elección Presidencial 2024</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataFilterBar onFilterChange={setFilters} className="mb-4" />

        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="regional">Regional</TabsTrigger>
            <TabsTrigger value="demographic">Demográfico</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-0">
            {renderChart()}
          </TabsContent>

          <TabsContent value="regional" className="mt-0">
            {renderChart()}
          </TabsContent>

          <TabsContent value="demographic" className="mt-0">
            {renderChart()}
          </TabsContent>
        </Tabs>

        <div className="mt-4">
          <ChartLegend>
            {filteredData.map((entry, index) => (
              <ChartLegendItem key={index} name={`${entry.name} (${entry.percentage}%)`} color={entry.color} />
            ))}
          </ChartLegend>
        </div>

        <div className="mt-6 text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total de votos contabilizados: {formatNumber(totalVotes)}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Participación:{" "}
            {filters.regions.length > 0
              ? filters.regions.includes("norte")
                ? "72.1%"
                : filters.regions.includes("sur")
                  ? "65.8%"
                  : filters.regions.includes("este")
                    ? "68.3%"
                    : filters.regions.includes("oeste")
                      ? "69.5%"
                      : filters.regions.includes("central")
                        ? "70.2%"
                        : "68.4%"
              : "68.4%"}{" "}
            del padrón electoral
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
