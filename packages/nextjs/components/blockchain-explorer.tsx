"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"

export function BlockchainExplorer() {
  const [currentPage, setCurrentPage] = useState(1)

  // Mock blockchain data
  const blocks = [
    {
      id: "4582391",
      timestamp: "2024-05-18 14:32:15",
      transactions: 128,
      hash: "0x8f5b4...",
      status: "Confirmado",
    },
    {
      id: "4582390",
      timestamp: "2024-05-18 14:30:42",
      transactions: 95,
      hash: "0x7a3d2...",
      status: "Confirmado",
    },
    {
      id: "4582389",
      timestamp: "2024-05-18 14:29:11",
      transactions: 112,
      hash: "0x2e9f1...",
      status: "Confirmado",
    },
    {
      id: "4582388",
      timestamp: "2024-05-18 14:27:53",
      transactions: 87,
      hash: "0x1c8d3...",
      status: "Confirmado",
    },
    {
      id: "4582387",
      timestamp: "2024-05-18 14:26:22",
      transactions: 103,
      hash: "0x9b4e2...",
      status: "Confirmado",
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Explorador de Blockchain</span>
          <Button variant="outline" size="sm" className="text-xs">
            Ver Completo <ExternalLink className="ml-1 h-3 w-3" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bloque</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Transacciones</TableHead>
              <TableHead>Hash</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blocks.map((block) => (
              <TableRow key={block.id}>
                <TableCell className="font-medium">{block.id}</TableCell>
                <TableCell>{block.timestamp}</TableCell>
                <TableCell>{block.transactions}</TableCell>
                <TableCell className="font-mono">{block.hash}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                  >
                    {block.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">Mostrando bloques 4,582,387 - 4,582,391</div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setCurrentPage(currentPage + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
