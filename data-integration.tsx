"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Satellite,
  Database,
  Activity,
  Cloud,
  Wifi,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Globe,
} from "lucide-react"

export function DataIntegration() {
  const [lastUpdate, setLastUpdate] = useState(new Date())

  const dataSources = [
    {
      name: "NASA Satellite Data",
      type: "Satellite Imagery",
      status: "connected",
      lastSync: "2 minutes ago",
      accuracy: 94,
      coverage: "Pakistan",
      dataPoints: 15420,
      icon: Satellite,
    },
    {
      name: "Pakistan Meteorological Dept",
      type: "Weather Data",
      status: "connected",
      lastSync: "5 minutes ago",
      accuracy: 91,
      coverage: "National",
      dataPoints: 8760,
      icon: Cloud,
    },
    {
      name: "WHO Disease Surveillance",
      type: "Health Records",
      status: "connected",
      lastSync: "1 hour ago",
      accuracy: 88,
      coverage: "Regional",
      dataPoints: 2340,
      icon: Activity,
    },
    {
      name: "Provincial Health Departments",
      type: "Hospital Data",
      status: "connected",
      lastSync: "30 minutes ago",
      accuracy: 85,
      coverage: "Provincial",
      dataPoints: 5670,
      icon: Database,
    },
    {
      name: "NDMA Flood Monitoring",
      type: "Flood Data",
      status: "warning",
      lastSync: "3 hours ago",
      accuracy: 79,
      coverage: "National",
      dataPoints: 1890,
      icon: Globe,
    },
    {
      name: "Mobile Network Analytics",
      type: "Population Movement",
      status: "disconnected",
      lastSync: "6 hours ago",
      accuracy: 72,
      coverage: "Urban Areas",
      dataPoints: 0,
      icon: Wifi,
    },
  ]

  const aiModelMetrics = [
    { model: "Flood Prediction Model", accuracy: 87.3, lastTrained: "2 days ago", status: "active" },
    { model: "Disease Outbreak Predictor", accuracy: 84.1, lastTrained: "1 day ago", status: "active" },
    { model: "Resource Optimization", accuracy: 91.2, lastTrained: "3 hours ago", status: "active" },
    { model: "Population Risk Assessment", accuracy: 79.8, lastTrained: "5 days ago", status: "retraining" },
  ]

  const dataQuality = [
    { metric: "Completeness", value: 92, target: 95 },
    { metric: "Accuracy", value: 87, target: 90 },
    { metric: "Timeliness", value: 94, target: 95 },
    { metric: "Consistency", value: 89, target: 92 },
  ]

  const refreshData = () => {
    setLastUpdate(new Date())
    // Simulate data refresh
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-600" />
              Multi-Source Data Integration Platform
            </span>
            <Button onClick={refreshData} size="sm" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh All
            </Button>
          </CardTitle>
          <CardDescription>
            Real-time integration of satellite, weather, health, and demographic data for AI model training
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 mb-4">Last updated: {lastUpdate.toLocaleString()}</div>

          <Tabs defaultValue="sources" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="sources">Data Sources</TabsTrigger>
              <TabsTrigger value="models">AI Models</TabsTrigger>
              <TabsTrigger value="quality">Data Quality</TabsTrigger>
              <TabsTrigger value="pipeline">Processing Pipeline</TabsTrigger>
            </TabsList>

            <TabsContent value="sources" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dataSources.map((source) => (
                  <Card
                    key={source.name}
                    className={`border-l-4 ${
                      source.status === "connected"
                        ? "border-l-green-500"
                        : source.status === "warning"
                          ? "border-l-yellow-500"
                          : "border-l-red-500"
                    }`}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-lg">
                        <span className="flex items-center gap-2">
                          <source.icon className="h-5 w-5" />
                          {source.name}
                        </span>
                        <Badge
                          variant={
                            source.status === "connected"
                              ? "default"
                              : source.status === "warning"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {source.status.toUpperCase()}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{source.type}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Coverage:</span>
                            <div className="font-medium">{source.coverage}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Data Points:</span>
                            <div className="font-medium">{source.dataPoints.toLocaleString()}</div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Accuracy</span>
                            <span className="font-medium">{source.accuracy}%</span>
                          </div>
                          <Progress value={source.accuracy} className="h-2" />
                        </div>

                        <div className="text-sm text-gray-600">Last sync: {source.lastSync}</div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            Configure
                          </Button>
                          {source.status !== "connected" && (
                            <Button size="sm" className="flex-1">
                              Reconnect
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="models" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiModelMetrics.map((model) => (
                  <Card key={model.model}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-lg">
                        {model.model}
                        <Badge variant={model.status === "active" ? "default" : "secondary"}>
                          {model.status.toUpperCase()}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Model Accuracy</span>
                            <span className="font-medium">{model.accuracy}%</span>
                          </div>
                          <Progress value={model.accuracy} className="h-2" />
                        </div>

                        <div className="text-sm text-gray-600">Last trained: {model.lastTrained}</div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            View Metrics
                          </Button>
                          <Button size="sm" className="flex-1">
                            Retrain
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="quality" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Data Quality Metrics</CardTitle>
                  <CardDescription>Automated quality assessment across all integrated data sources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dataQuality.map((metric) => (
                      <div key={metric.metric} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{metric.metric}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{metric.value}%</span>
                            {metric.value >= metric.target ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-orange-500" />
                            )}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Progress value={metric.value} className="h-2" />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Current: {metric.value}%</span>
                            <span>Target: {metric.target}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pipeline" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    Real-Time Processing Pipeline
                  </CardTitle>
                  <CardDescription>Data flow from collection to AI model prediction</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Pipeline Stages */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center space-y-2">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                          <Database className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold">Data Collection</h3>
                        <p className="text-sm text-gray-600">Multi-source ingestion</p>
                        <Badge variant="default">Active</Badge>
                      </div>

                      <div className="text-center space-y-2">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                          <RefreshCw className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold">Processing</h3>
                        <p className="text-sm text-gray-600">Cleaning & validation</p>
                        <Badge variant="default">Processing</Badge>
                      </div>

                      <div className="text-center space-y-2">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                          <Activity className="h-6 w-6 text-purple-600" />
                        </div>
                        <h3 className="font-semibold">AI Analysis</h3>
                        <p className="text-sm text-gray-600">Model prediction</p>
                        <Badge variant="default">Running</Badge>
                      </div>

                      <div className="text-center space-y-2">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                          <AlertTriangle className="h-6 w-6 text-orange-600" />
                        </div>
                        <h3 className="font-semibold">Alert Generation</h3>
                        <p className="text-sm text-gray-600">Risk notifications</p>
                        <Badge variant="destructive">3 Alerts</Badge>
                      </div>
                    </div>

                    {/* Processing Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">32,450</div>
                            <div className="text-sm text-gray-600">Records Processed/Hour</div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">99.7%</div>
                            <div className="text-sm text-gray-600">Pipeline Uptime</div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">2.3s</div>
                            <div className="text-sm text-gray-600">Average Processing Time</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
