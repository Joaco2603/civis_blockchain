"use client"

import type * as React from "react"

const Chart = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full">{children}</div>
}

const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative">{children}</div>
}

interface ChartTooltipProps {
  content: React.ReactNode
  children?: React.ReactNode
}

const ChartTooltip = ({ content, children }: ChartTooltipProps) => {
  return <>{children}</>
}

interface ChartTooltipContentProps {
  formatter?: (value: any, name?: string) => React.ReactNode
  active?: boolean
  payload?: any[]
  label?: string
}

const ChartTooltipContent = ({ active, payload, label, formatter }: ChartTooltipContentProps) => {
  if (!active || !payload || !payload.length) {
    return null
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-2 rounded-md border shadow-sm">
      {label && <div className="font-medium text-xs mb-1">{label}</div>}
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center text-xs">
          <div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: entry.color }}></div>
          <span className="mr-1">{entry.name}:</span>
          <span className="font-medium">{formatter ? formatter(entry.value, entry.name) : entry.value}</span>
        </div>
      ))}
    </div>
  )
}

const ChartLegend = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-wrap gap-3 justify-center">{children}</div>
}

interface ChartLegendItemProps {
  name: string
  color: string
}

const ChartLegendItem = ({ name, color }: ChartLegendItemProps) => {
  return (
    <div className="flex items-center space-x-1">
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
      <span className="text-sm text-gray-500 dark:text-gray-400">{name}</span>
    </div>
  )
}

export { Chart, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendItem }
