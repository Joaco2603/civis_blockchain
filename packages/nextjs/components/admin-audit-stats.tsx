"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart, ChartContainer } from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";

export function AdminAuditStats() {
  const data = [
    { name: "00:00", transactions: 245, color: "#3b82f6" },
    { name: "04:00", transactions: 388, color: "#3b82f6" },
    { name: "08:00", transactions: 912, color: "#3b82f6" },
    { name: "12:00", transactions: 1245, color: "#3b82f6" },
    { name: "16:00", transactions: 1550, color: "#3b82f6" },
    { name: "20:00", transactions: 1190, color: "#3b82f6" }
  ];

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base">Actividad de Transacciones</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            Filtrar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Exportar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <Chart>
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    width={40}
                  />
                  <Bar
                    dataKey="transactions"
                    radius={[4, 4, 0, 0]}
                    barSize={20}
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
                            <p className="text-sm">
                              {payload[0].value} transacciones
                            </p>
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

        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              5,530
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Transacciones Totales
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              100%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Integridad Verificada
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              0
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Anomalías Detectadas
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
