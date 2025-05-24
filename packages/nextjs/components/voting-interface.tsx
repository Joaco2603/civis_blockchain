"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useWeb3 } from "@/components/web3-provider"

interface Candidate {
  id: string
  name: string
  party: string
}

interface VotingInterfaceProps {
  electionId: string
}

export function VotingInterface({ electionId }: VotingInterfaceProps) {
  const { connected } = useWeb3()
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null)
  const [votingState, setVotingState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [txHash, setTxHash] = useState<string | null>(null)

  // Mock candidates data
  const candidates: Candidate[] = [
    { id: "1", name: "Ana Martínez", party: "Partido Democrático" },
    { id: "2", name: "Carlos Rodríguez", party: "Alianza Progresista" },
    { id: "3", name: "Elena Sánchez", party: "Unión Republicana" },
    { id: "4", name: "Miguel Torres", party: "Movimiento Ciudadano" },
    { id: "5", name: "Voto en Blanco", party: "" },
  ]

  const handleVote = async () => {
    if (!selectedCandidate || !connected) return

    setVotingState("submitting")

    try {
      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock transaction hash
      const mockTxHash = "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
      setTxHash(mockTxHash)
      setVotingState("success")
    } catch (error) {
      console.error("Error al emitir voto:", error)
      setVotingState("error")
    }
  }

  if (votingState === "success") {
    return (
      <Card>
        <CardHeader className="text-center pb-4">
          <div className="mx-auto bg-green-100 dark:bg-green-900 p-3 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle>¡Voto Emitido Correctamente!</CardTitle>
          <CardDescription>Tu voto ha sido registrado de forma anónima en la blockchain</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border text-sm">
            <div className="font-medium mb-1">Identificador de Transacción:</div>
            <div className="font-mono text-xs break-all">{txHash}</div>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Importante</AlertTitle>
            <AlertDescription>
              Guarda este identificador para verificar tu voto en el futuro. Tu elección permanece anónima y privada.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline" onClick={() => (window.location.href = "/dashboard")}>
            Volver al Panel Principal
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Elección Presidencial 2024</CardTitle>
        <CardDescription>Selecciona un candidato para emitir tu voto</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedCandidate || ""} onValueChange={setSelectedCandidate} className="space-y-3">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <RadioGroupItem value={candidate.id} id={`candidate-${candidate.id}`} />
              <Label htmlFor={`candidate-${candidate.id}`} className="flex flex-1 cursor-pointer">
                <div className="flex-1">
                  <div className="font-medium">{candidate.name}</div>
                  {candidate.party && <div className="text-sm text-gray-500 dark:text-gray-400">{candidate.party}</div>}
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>

        {votingState === "error" && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Ha ocurrido un error al procesar tu voto. Por favor, intenta nuevamente.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4 flex flex-col space-y-4">
        <Button
          onClick={handleVote}
          disabled={!selectedCandidate || votingState === "submitting" || !connected}
          className="w-full"
        >
          {votingState === "submitting" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Procesando Voto...
            </>
          ) : (
            "Emitir Voto"
          )}
        </Button>

        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          Tu voto será registrado de forma anónima y segura en la blockchain. Podrás verificar que tu voto fue
          contabilizado sin revelar tu elección.
        </p>
      </CardFooter>
    </Card>
  )
}
