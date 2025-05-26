"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "~~/components/ui/card";
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "~~/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

export function AuditStats() {
  const data = [
    { name: "00:00", transactions: 245 },
    { name: "04:00", transactions: 388 },
    { name: "08:00", transactions: 912 },
    { name: "12:00", transactions: 1245 },
    { name: "16:00", transactions: 1550 },
    { name: "20:00", transactions: 1190 }
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Actividad de Transacciones</CardTitle>
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
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                    barSize={20}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Chart>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
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
        </div>
      </CardContent>
    </Card>
  );
}
