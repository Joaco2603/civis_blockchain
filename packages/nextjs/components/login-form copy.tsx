"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Loader2 } from "lucide-react"
import { useWeb3 } from "@/components/web3-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function LoginForm() {
  const router = useRouter()
  const { connect, connected, authenticate, isAuthenticated, role } = useWeb3()
  const [isConnecting, setIsConnecting] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [didInput, setDidInput] = useState("")
  const [activeTab, setActiveTab] = useState("wallet")

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      await connect()
    } catch (error) {
      console.error("Error connecting wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleAuthenticate = async () => {
    setIsAuthenticating(true)
    try {
      await authenticate(activeTab === "did" ? didInput : undefined)
    } catch (error) {
      console.error("Error authenticating:", error)
    } finally {
      setIsAuthenticating(false)
    }
  }

  // Redirect to dashboard when authenticated
  if (isAuthenticated) {
    // Redirect based on role
    if (role === "admin") {
      router.push("/dashboard/admin")
    } else {
      router.push("/dashboard")
    }
    return null
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-2">
          <Shield className="h-10 w-10 text-blue-600 dark:text-blue-400" />
        </div>
        <CardTitle className="text-2xl text-center">Acceso a VotaChain</CardTitle>
        <CardDescription className="text-center">Plataforma de votación segura basada en blockchain</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="wallet">Conectar Wallet</TabsTrigger>
            <TabsTrigger value="did">Ingresar DID</TabsTrigger>
          </TabsList>

          <TabsContent value="wallet" className="space-y-4 pt-4">
            <div className="space-y-2 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Conecta tu wallet de Starknet para acceder a la plataforma
              </p>
            </div>

            {!connected ? (
              <Button className="w-full" onClick={handleConnect} disabled={isConnecting}>
                {isConnecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Conectando...
                  </>
                ) : (
                  "Conectar Wallet"
                )}
              </Button>
            ) : (
              <Button className="w-full" onClick={handleAuthenticate} disabled={isAuthenticating}>
                {isAuthenticating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Autenticando...
                  </>
                ) : (
                  "Autenticar con ZK Passport"
                )}
              </Button>
            )}
          </TabsContent>

          <TabsContent value="did" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="did">Identidad Descentralizada (DID)</Label>
              <Input
                id="did"
                placeholder="did:ethr:starknet:0x..."
                value={didInput}
                onChange={(e) => setDidInput(e.target.value)}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Ingresa tu DID para acceder directamente a la plataforma
              </p>
            </div>

            <Button className="w-full" onClick={handleAuthenticate} disabled={isAuthenticating || !didInput}>
              {isAuthenticating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verificando...
                </>
              ) : (
                "Verificar DID"
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-xs text-center text-gray-500 dark:text-gray-400">
          Al acceder, aceptas los términos de servicio y la política de privacidad
        </div>
      </CardFooter>
    </Card>
  )
}
