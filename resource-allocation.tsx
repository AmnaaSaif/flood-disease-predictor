"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Truck, Building2, Users, Package, MapPin, Clock, CheckCircle, Activity } from "lucide-react"

export function ResourceAllocation() {
  const [deployments, setDeployments] = useState([
    {
      id: 1,
      type: "Mobile Clinic",
      location: "Larkana District, Sindh",
      status: "deployed",
      eta: "2 hours",
      capacity: 200,
      supplies: ["ORS", "Antibiotics", "Water Purification"],
      team: 8,
      priority: "critical",
    },
    {
      id: 2,
      type: "Medical Supplies",
      location: "Rajanpur District, Punjab",
      status: "in-transit",
      eta: "6 hours",
      capacity: 500,
      supplies: ["Mosquito Nets", "Fever Medication", "Rapid Test Kits"],
      team: 4,
      priority: "high",
    },
    {
      id: 3,
      type: "Water Purification Unit",
      location: "Jaffarabad, Balochistan",
      status: "preparing",
      eta: "12 hours",
      capacity: 1000,
      supplies: ["Water Filters", "Chlorine Tablets", "Testing Kits"],
      team: 6,
      priority: "moderate",
    },
  ])

  const inventory = [
    { item: "ORS Packets", available: 15000, required: 8000, status: "sufficient" },
    { item: "Antibiotics", available: 2500, required: 3000, status: "low" },
    { item: "Mosquito Nets", available: 8000, required: 5000, status: "sufficient" },
    { item: "Water Purification Tablets", available: 1200, required: 2000, status: "critical" },
    { item: "Rapid Test Kits", available: 500, required: 800, status: "low" },
    { item: "IV Fluids", available: 3000, required: 1500, status: "sufficient" },
  ]

  const mobileClinics = [
    { id: "MC-001", location: "Sindh Province", status: "active", patients: 156, capacity: 200 },
    { id: "MC-002", location: "Punjab Region", status: "en-route", patients: 0, capacity: 180 },
    { id: "MC-003", location: "Balochistan", status: "standby", patients: 0, capacity: 220 },
    { id: "MC-004", location: "KPK Region", status: "maintenance", patients: 0, capacity: 200 },
  ]

  const optimizationRecommendations = [
    {
      title: "Redistribute Antibiotics",
      description: "Move 500 units from Karachi warehouse to Sindh deployment zone",
      impact: "High",
      timeframe: "4 hours",
      cost: "$2,500",
    },
    {
      title: "Deploy Additional Mobile Clinic",
      description: "Send MC-003 to support Larkana District operations",
      impact: "Critical",
      timeframe: "8 hours",
      cost: "$15,000",
    },
    {
      title: "Emergency Supply Procurement",
      description: "Order 1000 water purification tablets from nearest supplier",
      impact: "High",
      timeframe: "24 hours",
      cost: "$3,200",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-blue-600" />
            AI-Optimized Resource Allocation
          </CardTitle>
          <CardDescription>
            Intelligent deployment and distribution of medical resources based on outbreak predictions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="deployments" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="deployments">Active Deployments</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="clinics">Mobile Clinics</TabsTrigger>
              <TabsTrigger value="optimization">AI Optimization</TabsTrigger>
            </TabsList>

            <TabsContent value="deployments" className="space-y-4">
              {deployments.map((deployment) => (
                <Card
                  key={deployment.id}
                  className={`border-l-4 ${
                    deployment.priority === "critical"
                      ? "border-l-red-500"
                      : deployment.priority === "high"
                        ? "border-l-orange-500"
                        : "border-l-yellow-500"
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        {deployment.type === "Mobile Clinic" ? (
                          <Building2 className="h-5 w-5" />
                        ) : deployment.type === "Medical Supplies" ? (
                          <Package className="h-5 w-5" />
                        ) : (
                          <Truck className="h-5 w-5" />
                        )}
                        {deployment.type}
                      </span>
                      <Badge
                        variant={
                          deployment.status === "deployed"
                            ? "default"
                            : deployment.status === "in-transit"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {deployment.status.toUpperCase()}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {deployment.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        ETA: {deployment.eta}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Capacity</h4>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span>{deployment.capacity} people/day</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Users className="h-4 w-4 text-green-600" />
                          <span>{deployment.team} team members</span>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <h4 className="font-semibold text-sm mb-2">Supplies</h4>
                        <div className="flex flex-wrap gap-2">
                          {deployment.supplies.map((supply) => (
                            <Badge key={supply} variant="outline">
                              {supply}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline">
                        Track Location
                      </Button>
                      <Button size="sm" variant="outline">
                        Update Status
                      </Button>
                      <Button size="sm">Contact Team</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="inventory" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Medical Supply Inventory</CardTitle>
                  <CardDescription>Real-time inventory tracking with automated reorder alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {inventory.map((item) => (
                      <div key={item.item} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.item}</span>
                          <Badge
                            variant={
                              item.status === "sufficient"
                                ? "default"
                                : item.status === "low"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {item.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Available: {item.available.toLocaleString()}</span>
                            <span>Required: {item.required.toLocaleString()}</span>
                          </div>
                          <Progress value={(item.available / item.required) * 100} className="h-2" />
                        </div>
                        {item.status !== "sufficient" && (
                          <Button size="sm" variant="outline" className="w-full bg-transparent">
                            {item.status === "critical" ? "Emergency Reorder" : "Reorder Stock"}
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="clinics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mobileClinics.map((clinic) => (
                  <Card key={clinic.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Building2 className="h-5 w-5" />
                          {clinic.id}
                        </span>
                        <Badge
                          variant={
                            clinic.status === "active"
                              ? "default"
                              : clinic.status === "en-route"
                                ? "secondary"
                                : clinic.status === "standby"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {clinic.status.toUpperCase()}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{clinic.location}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Patients Treated</span>
                          <span className="font-semibold">
                            {clinic.patients}/{clinic.capacity}
                          </span>
                        </div>
                        <Progress value={(clinic.patients / clinic.capacity) * 100} className="h-2" />
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            View Details
                          </Button>
                          {clinic.status === "standby" && (
                            <Button size="sm" className="flex-1">
                              Deploy
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="optimization" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-purple-600" />
                    AI Optimization Recommendations
                  </CardTitle>
                  <CardDescription>
                    Machine learning-powered suggestions for optimal resource allocation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {optimizationRecommendations.map((rec, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{rec.title}</h3>
                          <Badge
                            variant={
                              rec.impact === "Critical"
                                ? "destructive"
                                : rec.impact === "High"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {rec.impact} Impact
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{rec.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {rec.timeframe}
                          </span>
                          <span className="font-medium">{rec.cost}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Implement
                          </Button>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
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
