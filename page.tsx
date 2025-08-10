"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  MapPin,
  AlertTriangle,
  TrendingUp,
  Droplets,
  Users,
  Truck,
  Satellite,
  Brain,
  Shield,
  Activity,
} from "lucide-react"
import { PredictionMap } from "@/components/prediction-map"
import { RiskAnalytics } from "@/components/risk-analytics"
import { AlertSystem } from "@/components/alert-system"
import { ResourceAllocation } from "@/components/resource-allocation"
import { DataIntegration } from "@/components/data-integration"

export default function FloodDiseasePredictorDashboard() {
  const [activeAlerts, setActiveAlerts] = useState(3)
  const [predictionAccuracy, setPredictionAccuracy] = useState(87)
  const [resourcesDeployed, setResourcesDeployed] = useState(12)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPredictionAccuracy((prev) => Math.min(95, prev + Math.random() * 2 - 1))
      setResourcesDeployed((prev) => prev + Math.floor(Math.random() * 3))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const criticalAlerts = [
    {
      id: 1,
      location: "Sindh Province - Larkana District",
      riskLevel: "Critical",
      diseases: ["Cholera", "Typhoid"],
      floodRisk: 92,
      population: 45000,
      timeframe: "7-10 days",
    },
    {
      id: 2,
      location: "Punjab - Rajanpur District",
      riskLevel: "High",
      diseases: ["Dengue", "Malaria"],
      floodRisk: 78,
      population: 32000,
      timeframe: "14-21 days",
    },
    {
      id: 3,
      location: "Balochistan - Jaffarabad",
      riskLevel: "Moderate",
      diseases: ["Typhoid"],
      floodRisk: 65,
      population: 28000,
      timeframe: "21-28 days",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-blue-600 rounded-full">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">AI Flood-Disease Outbreak Predictor</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Advanced AI system predicting disease outbreaks linked to flood events in Pakistan, enabling proactive
            healthcare response and resource allocation.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{activeAlerts}</div>
              <p className="text-xs text-muted-foreground">Critical regions monitored</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prediction Accuracy</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{predictionAccuracy.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">AI model performance</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resources Deployed</CardTitle>
              <Truck className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{resourcesDeployed}</div>
              <p className="text-xs text-muted-foreground">Mobile clinics & supplies</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Population Protected</CardTitle>
              <Shield className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">2.3M</div>
              <p className="text-xs text-muted-foreground">People in monitored areas</p>
            </CardContent>
          </Card>
        </div>

        {/* Critical Alerts Banner */}
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800">Critical Outbreak Risk Detected</AlertTitle>
          <AlertDescription className="text-red-700">
            High probability cholera outbreak predicted in Sindh Province within 7-10 days. Immediate resource
            deployment recommended.
          </AlertDescription>
        </Alert>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="predictions" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Predictions
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <Satellite className="h-4 w-4" />
              Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    Risk Prediction Map
                  </CardTitle>
                  <CardDescription>Real-time flood and disease outbreak risk visualization</CardDescription>
                </CardHeader>
                <CardContent>
                  <PredictionMap />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Risk Analytics
                  </CardTitle>
                  <CardDescription>Historical trends and prediction confidence</CardDescription>
                </CardHeader>
                <CardContent>
                  <RiskAnalytics />
                </CardContent>
              </Card>
            </div>

            {/* Current Risk Areas */}
            <Card>
              <CardHeader>
                <CardTitle>High-Risk Areas Requiring Immediate Attention</CardTitle>
                <CardDescription>Regions with elevated flood and disease outbreak probability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {criticalAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              alert.riskLevel === "Critical"
                                ? "destructive"
                                : alert.riskLevel === "High"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {alert.riskLevel}
                          </Badge>
                          <h3 className="font-semibold">{alert.location}</h3>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Droplets className="h-4 w-4" />
                            Flood Risk: {alert.floodRisk}%
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            Population: {alert.population.toLocaleString()}
                          </span>
                          <span>Timeframe: {alert.timeframe}</span>
                        </div>
                        <div className="flex gap-2">
                          {alert.diseases.map((disease) => (
                            <Badge key={disease} variant="outline">
                              {disease}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button size="sm">Deploy Resources</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictions">
            <PredictionMap detailed />
          </TabsContent>

          <TabsContent value="alerts">
            <AlertSystem />
          </TabsContent>

          <TabsContent value="resources">
            <ResourceAllocation />
          </TabsContent>

          <TabsContent value="data">
            <DataIntegration />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
