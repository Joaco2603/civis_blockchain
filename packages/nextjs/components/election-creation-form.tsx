"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Plus, Trash2, Save, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export function ElectionCreationForm() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [candidates, setCandidates] = useState([
    { id: 1, name: "", party: "", position: "" }
  ]);

  const addCandidate = () => {
    setCandidates([
      ...candidates,
      { id: candidates.length + 1, name: "", party: "", position: "" }
    ]);
  };

  const removeCandidate = (id: number) => {
    if (candidates.length > 1) {
      setCandidates(candidates.filter((candidate) => candidate.id !== id));
    }
  };

  const updateCandidate = (id: number, field: string, value: string) => {
    setCandidates(
      candidates.map((candidate) =>
        candidate.id === id ? { ...candidate, [field]: value } : candidate
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Crear Nueva Elección</CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/admin">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Volver
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general">
          <TabsList className="grid grid-cols-3 w-full mb-6">
            <TabsTrigger value="general">Información General</TabsTrigger>
            <TabsTrigger value="candidates">Candidatos</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título de la Elección</Label>
                <Input
                  id="title"
                  placeholder="Ej: Elección Presidencial 2024"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Descripción detallada de la elección"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Fecha de Inicio</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? (
                          format(startDate, "PPP", { locale: es })
                        ) : (
                          <span>Seleccionar fecha</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                        locale={es}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Fecha de Finalización</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? (
                          format(endDate, "PPP", { locale: es })
                        ) : (
                          <span>Seleccionar fecha</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        locale={es}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Elección</Label>
                <Select>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="presidential">Presidencial</SelectItem>
                    <SelectItem value="legislative">Legislativa</SelectItem>
                    <SelectItem value="regional">Regional</SelectItem>
                    <SelectItem value="municipal">Municipal</SelectItem>
                    <SelectItem value="referendum">Referéndum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="candidates" className="space-y-4">
            <div className="space-y-4">
              {candidates.map((candidate, index) => (
                <div
                  key={candidate.id}
                  className="border p-4 rounded-md space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Candidato {index + 1}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCandidate(candidate.id)}
                      disabled={candidates.length === 1}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`candidate-name-${candidate.id}`}>
                        Nombre
                      </Label>
                      <Input
                        id={`candidate-name-${candidate.id}`}
                        value={candidate.name}
                        onChange={(e) =>
                          updateCandidate(candidate.id, "name", e.target.value)
                        }
                        placeholder="Nombre del candidato"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`candidate-party-${candidate.id}`}>
                        Partido Político
                      </Label>
                      <Select
                        value={candidate.party}
                        onValueChange={(value) =>
                          updateCandidate(candidate.id, "party", value)
                        }
                      >
                        <SelectTrigger id={`candidate-party-${candidate.id}`}>
                          <SelectValue placeholder="Seleccionar partido" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pd">
                            Partido Democrático
                          </SelectItem>
                          <SelectItem value="ap">
                            Alianza Progresista
                          </SelectItem>
                          <SelectItem value="ur">Unión Republicana</SelectItem>
                          <SelectItem value="mc">
                            Movimiento Ciudadano
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`candidate-position-${candidate.id}`}>
                      Cargo al que Postula
                    </Label>
                    <Input
                      id={`candidate-position-${candidate.id}`}
                      value={candidate.position}
                      onChange={(e) =>
                        updateCandidate(
                          candidate.id,
                          "position",
                          e.target.value
                        )
                      }
                      placeholder="Ej: Presidente, Gobernador, etc."
                    />
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                onClick={addCandidate}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-1" />
                Añadir Candidato
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Opciones de Votación</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="allow-blank" />
                    <Label htmlFor="allow-blank" className="font-normal">
                      Permitir voto en blanco
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="allow-null" />
                    <Label htmlFor="allow-null" className="font-normal">
                      Permitir voto nulo
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Verificación de Identidad</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="require-did" defaultChecked />
                    <Label htmlFor="require-did" className="font-normal">
                      Requerir DID verificado
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="require-zk" defaultChecked />
                    <Label htmlFor="require-zk" className="font-normal">
                      Usar pruebas de conocimiento cero
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Visibilidad de Resultados</Label>
                <Select defaultValue="end">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Tiempo real</SelectItem>
                    <SelectItem value="end">
                      Al finalizar la elección
                    </SelectItem>
                    <SelectItem value="custom">Fecha personalizada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Configuración Avanzada</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="enable-audit" defaultChecked />
                    <Label htmlFor="enable-audit" className="font-normal">
                      Habilitar panel de auditoría pública
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="enable-regional" />
                    <Label htmlFor="enable-regional" className="font-normal">
                      Habilitar resultados por región
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="enable-demographic" />
                    <Label htmlFor="enable-demographic" className="font-normal">
                      Habilitar análisis demográfico
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/dashboard/admin">Cancelar</Link>
        </Button>
        <Button>
          <Save className="h-4 w-4 mr-1" />
          Guardar Elección
        </Button>
      </CardFooter>
    </Card>
  );
}
