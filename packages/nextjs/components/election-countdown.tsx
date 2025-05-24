"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Clock } from "lucide-react"

export function ElectionCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Set end date to June 15, 2024 at 23:59:59
  const endDate = new Date("2024-06-15T23:59:59")

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = endDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center">
          <Clock className="mr-2 h-4 w-4" />
          Tiempo Restante - Elección Presidencial
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {timeLeft.days.toString().padStart(2, "0")}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Días</div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {timeLeft.hours.toString().padStart(2, "0")}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Horas</div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {timeLeft.minutes.toString().padStart(2, "0")}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Minutos</div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {timeLeft.seconds.toString().padStart(2, "0")}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Segundos</div>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          La votación cierra el 15 de junio de 2024 a las 23:59
        </div>
      </CardContent>
    </Card>
  )
}
