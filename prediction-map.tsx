"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Droplets, Thermometer, Users, AlertTriangle } from "lucide-react"

interface PredictionMapProps {
  detailed?: boolean
}

export function PredictionMap({ detailed = false }: PredictionMapProps) {
  const riskAreas = [
    {
      id: 1,
      name: "Sindh Province",
      lat: 25.8943,
      lng: 68.5247,
      risk: 92,
      diseases: ["Cholera", "Typhoid"],
      population: 450000,
    },
    {
      id: 2,
      name: "Punjab - South",
      lat: 29.3759,
      lng: 71.6851,
      risk: 78,
      diseases: ["Dengue", "Malaria"],
      population: 320000,
    },
    { id: 3, name: "Balochistan", lat: 28.3588, lng: 65.0178, risk: 65, diseases: ["Typhoid"], population: 280000 },
    { id: 4, name: "KPK - South", lat: 32.1877, lng: 70.1516, risk: 45, diseases: ["Malaria"], population: 180000 },
  ]

  if (detailed) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              Detailed Prediction Analysis
            </CardTitle>
            <CardDescription>Comprehensive flood and disease outbreak risk assessment across Pakistan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Map Visualization */}
              <div className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-lg p-6 h-96">
                <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=600')] bg-cover bg-center rounded-lg opacity-20"></div>
                <div className="relative z-10">
                  <h3 className="font-semibold mb-4">Pakistan Risk Zones</h3>
                  {riskAreas.map((area) => (
                    <div
                      key={area.id}
                      className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer ${
                        area.risk > 80
                          ? "bg-red-500"
                          : area.risk > 60
                            ? "bg-orange-500"
                            : area.risk > 40
                              ? "bg-yellow-500"
                              : "bg-green-500"
                      }`}
                      style={{
                        left: `${20 + area.id * 15}%`,
                        top: `${30 + area.id * 10}%`,
                      }}
                      title={`${area.name}: ${area.risk}% risk`}
                    />
                  ))}
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg p-3">
                  <div className="text-xs font-medium mb-2">Risk Level</div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Critical (80%+)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>High (60-80%)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Moderate (40-60%)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Low (less than 40%)</span>
                  </div>
                </div>
              </div>

              {/* Risk Factors */}
              <div className="space-y-4">
                <h3 className="font-semibold">Current Risk Factors</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Monsoon Intensity</span>
                    </div>
                    <Badge variant="destructive">High</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium">Temperature</span>
                    </div>
                    <Badge variant="default">Elevated</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-red-600" />
                      <span className="text-sm font-medium">Population Density</span>
                    </div>
                    <Badge variant="destructive">Critical</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium">Infrastructure</span>
                    </div>
                    <Badge variant="secondary">Vulnerable</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Risk Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {riskAreas.map((area) => (
            <Card
              key={area.id}
              className={`border-l-4 ${
                area.risk > 80
                  ? "border-l-red-500"
                  : area.risk > 60
                    ? "border-l-orange-500"
                    : area.risk > 40
                      ? "border-l-yellow-500"
                      : "border-l-green-500"
              }`}
            >
              <CardHeader>
                <CardTitle className="text-lg">{area.name}</CardTitle>
                <CardDescription>
                  Risk Level: {area.risk}% | Population: {area.population.toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {area.diseases.map((disease) => (
                      <Badge key={disease} variant="outline">
                        {disease}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Prediction Confidence</span>
                    <span className="font-semibold">{85 + Math.floor(Math.random() * 10)}%</span>
                  </div>
                  <Button size="sm" className="w-full">
                    View Detailed Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-lg p-4 h-64">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=300&width=500')] bg-cover bg-center rounded-lg opacity-30"></div>
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Live Risk Assessment</h3>
          <Badge variant="destructive">3 Critical Alerts</Badge>
        </div>
        {riskAreas.slice(0, 3).map((area) => (
          <div
            key={area.id}
            className={`absolute w-3 h-3 rounded-full border border-white shadow-md ${
              area.risk > 80 ? "bg-red-500 animate-pulse" : area.risk > 60 ? "bg-orange-500" : "bg-yellow-500"
            }`}
            style={{
              left: `${15 + area.id * 20}%`,
              top: `${40 + area.id * 15}%`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
