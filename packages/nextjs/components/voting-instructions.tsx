import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "~~/components/ui/card";
import { Shield, Lock, CheckCircle } from "lucide-react";

export function VotingInstructions() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Instrucciones de Votación</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="bg-blue-100 dark:bg-blue-900 p-1.5 rounded-full">
            <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-sm">
            <p className="font-medium">Selecciona tu candidato</p>
            <p className="text-gray-500 dark:text-gray-400">
              Elige entre los candidatos disponibles o voto en blanco.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="bg-blue-100 dark:bg-blue-900 p-1.5 rounded-full">
            <Lock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-sm">
            <p className="font-medium">Confirma con tu wallet</p>
            <p className="text-gray-500 dark:text-gray-400">
              Firma la transacción con tu wallet para emitir el voto.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="bg-blue-100 dark:bg-blue-900 p-1.5 rounded-full">
            <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-sm">
            <p className="font-medium">Recibe confirmación</p>
            <p className="text-gray-500 dark:text-gray-400">
              Guarda el identificador de transacción para verificaciones
              futuras.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
