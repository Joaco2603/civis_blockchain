"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "~~/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "~~/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~~/components/ui/select";
import { Button } from "~~/components/ui/button";
import { Download } from "lucide-react";
import { Chart, ChartContainer } from "~~/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
  PieChart,
  Pie
} from "recharts";

export function DemographicAnalysis() {
  const [selectedAge, setSelectedAge] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [chartType, setChartType] = useState<"bar" | "pie">("bar");

  // Age group data
  const ageData = {
    "18-30": [
      { name: "Ana Martínez", percentage: 38.2, color: "#3b82f6" },
      { name: "Carlos Rodríguez", percentage: 27.9, color: "#ef4444" },
      { name: "Elena Sánchez", percentage: 25.3, color: "#10b981" },
      { name: "Miguel Torres", percentage: 8.3, color: "#f59e0b" },
      { name: "Voto en Blanco", percentage: 0.3, color: "#6b7280" }
    ],
    "31-50": [
      { name: "Ana Martínez", percentage: 43.5, color: "#3b82f6" },
      { name: "Carlos Rodríguez", percentage: 36.5, color: "#ef4444" },
      { name: "Elena Sánchez", percentage: 14.6, color: "#10b981" },
      { name: "Miguel Torres", percentage: 4.8, color: "#f59e0b" },
      { name: "Voto en Blanco", percentage: 0.6, color: "#6b7280" }
    ],
    "51+": [
      { name: "Ana Martínez", percentage: 45.7, color: "#3b82f6" },
      { name: "Carlos Rodríguez", percentage: 43.4, color: "#ef4444" },
      { name: "Elena Sánchez", percentage: 7.1, color: "#10b981" },
      { name: "Miguel Torres", percentage: 2.9, color: "#f59e0b" },
      { name: "Voto en Blanco", percentage: 0.9, color: "#6b7280" }
    ],
    all: [
      { name: "Ana Martínez", percentage: 42.8, color: "#3b82f6" },
      { name: "Carlos Rodríguez", percentage: 36.2, color: "#ef4444" },
      { name: "Elena Sánchez", percentage: 15.8, color: "#10b981" },
      { name: "Miguel Torres", percentage: 4.3, color: "#f59e0b" },
      { name: "Voto en Blanco", percentage: 0.9, color: "#6b7280" }
    ]
  };

  // Gender data
  const genderData = {
    male: [
      { name: "Ana Martínez", percentage: 38.5, color: "#3b82f6" },
      { name: "Carlos Rodríguez", percentage: 42.1, color: "#ef4444" },
      { name: "Elena Sánchez", percentage: 13.2, color: "#10b981" },
      { name: "Miguel Torres", percentage: 5.3, color: "#f59e0b" },
      { name: "Voto en Blanco", percentage: 0.9, color: "#6b7280" }
    ],
    female: [
      { name: "Ana Martínez", percentage: 47.2, color: "#3b82f6" },
      { name: "Carlos Rodríguez", percentage: 30.5, color: "#ef4444" },
      { name: "Elena Sánchez", percentage: 18.3, color: "#10b981" },
      { name: "Miguel Torres", percentage: 3.2, color: "#f59e0b" },
      { name: "Voto en Blanco", percentage: 0.8, color: "#6b7280" }
    ],
    all: [
      { name: "Ana Martínez", percentage: 42.8, color: "#3b82f6" },
      { name: "Carlos Rodríguez", percentage: 36.2, color: "#ef4444" },
      { name: "Elena Sánchez", percentage: 15.8, color: "#10b981" },
      { name: "Miguel Torres", percentage: 4.3, color: "#f59e0b" },
      { name: "Voto en Blanco", percentage: 0.9, color: "#6b7280" }
    ]
  };

  // Location data
  const locationData = {
    urban: [
      { name: "Ana Martínez", percentage: 45.2, color: "#3b82f6" },
      { name: "Carlos Rodríguez", percentage: 34.8, color: "#ef4444" },
      { name: "Elena Sánchez", percentage: 13.8, color: "#10b981" },
      { name: "Miguel Torres", percentage: 5.1, color: "#f59e0b" },
      { name: "Voto en Blanco", percentage: 1.1, color: "#6b7280" }
    ],
    rural: [
      { name: "Ana Martínez", percentage: 38.1, color: "#3b82f6" },
      { name: "Carlos Rodríguez", percentage: 38.1, color: "#ef4444" },
      { name: "Elena Sánchez", percentage: 19.0, color: "#10b981" },
      { name: "Miguel Torres", percentage: 3.8, color: "#f59e0b" },
      { name: "Voto en Blanco", percentage: 1.0, color: "#6b7280" }
    ],
    all: [
      { name: "Ana Martínez", percentage: 42.8, color: "#3b82f6" },
      { name: "Carlos Rodríguez", percentage: 36.2, color: "#ef4444" },
      { name: "Elena Sánchez", percentage: 15.8, color: "#10b981" },
      { name: "Miguel Torres", percentage: 4.3, color: "#f59e0b" },
      { name: "Voto en Blanco", percentage: 0.9, color: "#6b7280" }
    ]
  };

  // Get the appropriate data based on the selected filters
  const getFilteredData = () => {
    const activeTab = document
      .querySelector('[role="tabpanel"][data-state="active"]')
      ?.getAttribute("value");

    switch (activeTab) {
      case "age":
        return ageData[selectedAge as keyof typeof ageData];
      case "gender":
        return genderData[selectedGender as keyof typeof genderData];
      case "location":
        return locationData[selectedLocation as keyof typeof locationData];
      default:
        return ageData.all;
    }
  };

  const filteredData = getFilteredData();

  // Render the appropriate chart based on the selected type
  const renderChart = (data: any[]) => {
    switch (chartType) {
      case "pie":
        return (
          <div className="h-[300px]">
            <Chart>
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="percentage"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(1)}%`
                      }
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white dark:bg-gray-800 p-2 rounded-md border shadow-sm">
                              <p className="font-medium">{data.name}</p>
                              <p className="text-sm">{data.percentage}%</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </Chart>
          </div>
        );

      case "bar":
      default:
        return (
          <div className="h-[300px]">
            <Chart>
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ top: 10, right: 10, left: 100, bottom: 0 }}
                  >
                    <XAxis
                      type="number"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      domain={[
                        0,
                        Math.ceil(
                          Math.max(...data.map((d) => d.percentage)) * 1.1
                        )
                      ]}
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
                    <Bar
                      dataKey="percentage"
                      radius={[0, 4, 4, 0]}
                      barSize={30}
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white dark:bg-gray-800 p-2 rounded-md border shadow-sm">
                              <p className="font-medium">{label}</p>
                              <p className="text-sm">{payload[0].value}%</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </Chart>
          </div>
        );
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between flex-wrap gap-2">
          <span>Análisis Demográfico</span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setChartType(chartType === "bar" ? "pie" : "bar")}
            >
              {chartType === "bar"
                ? "Ver gráfico circular"
                : "Ver gráfico de barras"}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="age" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="age">Por Edad</TabsTrigger>
            <TabsTrigger value="gender">Por Género</TabsTrigger>
            <TabsTrigger value="location">Por Ubicación</TabsTrigger>
          </TabsList>

          <TabsContent value="age" className="space-y-4">
            <div className="flex justify-end">
              <Select value={selectedAge} onValueChange={setSelectedAge}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleccionar grupo de edad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los grupos</SelectItem>
                  <SelectItem value="18-30">18-30 años</SelectItem>
                  <SelectItem value="31-50">31-50 años</SelectItem>
                  <SelectItem value="51+">51+ años</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {renderChart(ageData[selectedAge as keyof typeof ageData])}

            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              {selectedAge === "all"
                ? "Distribución de votos por todos los grupos de edad"
                : `Distribución de votos para el grupo de edad ${selectedAge}`}
            </div>
          </TabsContent>

          <TabsContent value="gender" className="space-y-4">
            <div className="flex justify-end">
              <Select value={selectedGender} onValueChange={setSelectedGender}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleccionar género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los géneros</SelectItem>
                  <SelectItem value="male">Masculino</SelectItem>
                  <SelectItem value="female">Femenino</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {renderChart(genderData[selectedGender as keyof typeof genderData])}

            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              {selectedGender === "all"
                ? "Distribución de votos por todos los géneros"
                : `Distribución de votos para el género ${selectedGender === "male" ? "masculino" : "femenino"}`}
            </div>
          </TabsContent>

          <TabsContent value="location" className="space-y-4">
            <div className="flex justify-end">
              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleccionar ubicación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las ubicaciones</SelectItem>
                  <SelectItem value="urban">Urbano</SelectItem>
                  <SelectItem value="rural">Rural</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {renderChart(
              locationData[selectedLocation as keyof typeof locationData]
            )}

            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              {selectedLocation === "all"
                ? "Distribución de votos por todas las ubicaciones"
                : `Distribución de votos para ubicaciones ${selectedLocation === "urban" ? "urbanas" : "rurales"}`}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
