"use client";

import { useState } from "react";
import { Button } from "~~/components/ui/button";
import { Calendar } from "~~/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~~/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "~~/components/ui/popover";
import { Slider } from "~~/components/ui/slider";
import { Switch } from "~~/components/ui/switch";
import { Label } from "~~/components/ui/label";
import { Badge } from "~~/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  CalendarIcon,
  Download,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  Share2,
  X
} from "lucide-react";

export type FilterState = {
  dateRange: { from: Date | undefined; to: Date | undefined };
  regions: string[];
  demographics: string[];
  ageRange: [number, number];
  showRealTime: boolean;
  chartType: "bar" | "pie" | "line";
};

interface DataFilterBarProps {
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

export function DataFilterBar({
  onFilterChange,
  className
}: DataFilterBarProps) {
  const [date, setDate] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined
  });
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedDemographics, setSelectedDemographics] = useState<string[]>(
    []
  );
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 80]);
  const [showRealTime, setShowRealTime] = useState(true);
  const [chartType, setChartType] = useState<"bar" | "pie" | "line">("bar");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const regions = [
    { id: "norte", name: "Región Norte" },
    { id: "sur", name: "Región Sur" },
    { id: "este", name: "Región Este" },
    { id: "oeste", name: "Región Oeste" },
    { id: "central", name: "Región Central" }
  ];

  const demographics = [
    { id: "urban", name: "Urbano" },
    { id: "rural", name: "Rural" },
    { id: "male", name: "Masculino" },
    { id: "female", name: "Femenino" },
    { id: "firstTime", name: "Primer voto" }
  ];

  const applyFilters = () => {
    const newFilters: FilterState = {
      dateRange: date,
      regions: selectedRegions,
      demographics: selectedDemographics,
      ageRange,
      showRealTime,
      chartType
    };

    // Update active filters for display
    const newActiveFilters: string[] = [];
    if (date.from) newActiveFilters.push("Fecha");
    if (selectedRegions.length) newActiveFilters.push("Regiones");
    if (selectedDemographics.length) newActiveFilters.push("Demografía");
    if (ageRange[0] !== 18 || ageRange[1] !== 80) newActiveFilters.push("Edad");

    setActiveFilters(newActiveFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    setDate({ from: undefined, to: undefined });
    setSelectedRegions([]);
    setSelectedDemographics([]);
    setAgeRange([18, 80]);
    setShowRealTime(true);
    setChartType("bar");
    setActiveFilters([]);

    onFilterChange({
      dateRange: { from: undefined, to: undefined },
      regions: [],
      demographics: [],
      ageRange: [18, 80],
      showRealTime: true,
      chartType: "bar"
    });
  };

  const toggleRegion = (regionId: string) => {
    setSelectedRegions((prev) =>
      prev.includes(regionId)
        ? prev.filter((id) => id !== regionId)
        : [...prev, regionId]
    );
  };

  const toggleDemographic = (demographicId: string) => {
    setSelectedDemographics((prev) =>
      prev.includes(demographicId)
        ? prev.filter((id) => id !== demographicId)
        : [...prev, demographicId]
    );
  };

  return (
    <div
      className={`bg-white dark:bg-gray-950 border rounded-lg p-3 ${className}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <CalendarIcon className="mr-2 h-3.5 w-3.5" />
              {date.from ? (
                date.to ? (
                  <>
                    {format(date.from, "dd/MM/yyyy", { locale: es })} -{" "}
                    {format(date.to, "dd/MM/yyyy", { locale: es })}
                  </>
                ) : (
                  format(date.from, "dd/MM/yyyy", { locale: es })
                )
              ) : (
                "Seleccionar fecha"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={date}
              onSelect={(range) =>
                setDate(range || { from: undefined, to: undefined })
              }
              initialFocus
              locale={es}
            />
            <div className="p-3 border-t flex justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDate({ from: undefined, to: undefined })}
              >
                Limpiar
              </Button>
              <Button size="sm" onClick={() => applyFilters()}>
                Aplicar
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <Filter className="mr-2 h-3.5 w-3.5" />
              Filtros
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                Regiones
              </DropdownMenuLabel>
              {regions.map((region) => (
                <DropdownMenuItem
                  key={region.id}
                  onSelect={(e) => e.preventDefault()}
                >
                  <div
                    className="flex items-center space-x-2 w-full"
                    onClick={() => toggleRegion(region.id)}
                  >
                    <div
                      className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                        selectedRegions.includes(region.id)
                          ? "bg-primary border-primary"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedRegions.includes(region.id) && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-3 h-3 text-white"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                    <span>{region.name}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                Demografía
              </DropdownMenuLabel>
              {demographics.map((demo) => (
                <DropdownMenuItem
                  key={demo.id}
                  onSelect={(e) => e.preventDefault()}
                >
                  <div
                    className="flex items-center space-x-2 w-full"
                    onClick={() => toggleDemographic(demo.id)}
                  >
                    <div
                      className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                        selectedDemographics.includes(demo.id)
                          ? "bg-primary border-primary"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedDemographics.includes(demo.id) && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-3 h-3 text-white"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                    <span>{demo.name}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <div className="p-2">
              <label className="text-xs font-normal text-muted-foreground">
                Rango de edad
              </label>
              <div className="mt-2 px-1">
                <Slider
                  value={ageRange}
                  min={18}
                  max={80}
                  step={1}
                  onValueChange={(value) =>
                    setAgeRange(value as [number, number])
                  }
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>{ageRange[0]} años</span>
                  <span>{ageRange[1]} años</span>
                </div>
              </div>
            </div>

            <DropdownMenuSeparator />

            <div className="p-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="real-time"
                  checked={showRealTime}
                  onCheckedChange={setShowRealTime}
                />
                <Label htmlFor="real-time">Datos en tiempo real</Label>
              </div>
            </div>

            <DropdownMenuSeparator />

            <div className="p-2 flex justify-between">
              <Button variant="outline" size="sm" onClick={resetFilters}>
                Limpiar
              </Button>
              <Button size="sm" onClick={applyFilters}>
                Aplicar
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <BarChart3 className="mr-2 h-3.5 w-3.5" />
              Visualización
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Tipo de gráfico</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setChartType("bar");
                applyFilters();
              }}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              <span>Barras</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setChartType("pie");
                applyFilters();
              }}
            >
              <PieChart className="mr-2 h-4 w-4" />
              <span>Circular</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setChartType("line");
                applyFilters();
              }}
            >
              <LineChart className="mr-2 h-4 w-4" />
              <span>Líneas</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <Download className="mr-2 h-3.5 w-3.5" />
              Exportar
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <span>Exportar como CSV</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Exportar como PDF</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Exportar como imagen</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="sm" className="h-8">
          <Share2 className="mr-2 h-3.5 w-3.5" />
          Compartir
        </Button>

        {activeFilters.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 ml-auto"
            onClick={resetFilters}
          >
            <X className="mr-2 h-3.5 w-3.5" />
            Limpiar filtros
          </Button>
        )}
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary">
              {filter}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
