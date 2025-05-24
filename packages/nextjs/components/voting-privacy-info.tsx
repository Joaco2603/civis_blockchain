import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EyeOff, FileCheck, ShieldCheck } from "lucide-react"

export function VotingPrivacyInfo() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Privacidad y Seguridad</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="bg-green-100 dark:bg-green-900 p-1.5 rounded-full">
            <EyeOff className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <div className="text-sm">
            <p className="font-medium">Voto Anónimo</p>
            <p className="text-gray-500 dark:text-gray-400">
              Tu identidad está protegida mediante pruebas de conocimiento cero.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="bg-green-100 dark:bg-green-900 p-1.5 rounded-full">
            <ShieldCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <div className="text-sm">
            <p className="font-medium">Cifrado Avanzado</p>
            <p className="text-gray-500 dark:text-gray-400">
              Tu voto está cifrado y solo se descifra durante el recuento final.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="bg-green-100 dark:bg-green-900 p-1.5 rounded-full">
            <FileCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <div className="text-sm">
            <p className="font-medium">Verificable</p>
            <p className="text-gray-500 dark:text-gray-400">
              Puedes verificar que tu voto fue contabilizado sin revelar tu elección.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
