"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "~~/components/ui/card";
import { Button } from "~~/components/ui/button";
import { Input } from "~~/components/ui/input";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { Alert, AlertDescription } from "~~/components/ui/alert";

export function IntegrityVerifier() {
  const [txHash, setTxHash] = useState("");
  const [verificationState, setVerificationState] = useState<
    "idle" | "verifying" | "success" | "error"
  >("idle");

  const handleVerify = async () => {
    if (!txHash) return;

    setVerificationState("verifying");

    try {
      // Simulate verification process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // For demo purposes, we'll consider valid any hash that starts with 0x and has length 66
      if (txHash.startsWith("0x") && txHash.length === 66) {
        setVerificationState("success");
      } else {
        setVerificationState("error");
      }
    } catch (error) {
      console.error("Error al verificar:", error);
      setVerificationState("error");
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Verificador de Integridad</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Identificador de Transacción
          </label>
          <div className="flex space-x-2">
            <Input
              placeholder="0x..."
              value={txHash}
              onChange={(e) => setTxHash(e.target.value)}
              className="font-mono"
            />
            <Button
              onClick={handleVerify}
              disabled={!txHash || verificationState === "verifying"}
            >
              {verificationState === "verifying" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Verificar"
              )}
            </Button>
          </div>
        </div>

        {verificationState === "success" && (
          <Alert className="bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              Transacción verificada correctamente. El voto fue incluido en el
              bloque #4,582,391.
            </AlertDescription>
          </Alert>
        )}

        {verificationState === "error" && (
          <Alert className="bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800">
            <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              No se pudo verificar la transacción. Comprueba el identificador e
              intenta nuevamente.
            </AlertDescription>
          </Alert>
        )}

        <div className="text-xs text-gray-500 dark:text-gray-400">
          Ingresa el identificador de transacción para verificar que tu voto fue
          incluido en la blockchain sin revelar tu elección.
        </div>
      </CardContent>
    </Card>
  );
}
