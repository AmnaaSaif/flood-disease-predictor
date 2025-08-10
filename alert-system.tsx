"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  Clock,
  MapPin,
  Users,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle,
  XCircle,
  Bell,
} from "lucide-react"

export function AlertSystem() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "critical",
      title: "Critical Cholera Outbreak Risk - Sindh Province",
      location: "Larkana District, Sindh",
      description:
        "AI model predicts 92% probability of cholera outbreak within 7-10 days due to severe flooding and contaminated water sources.",
      timestamp: "2024-01-15T10:30:00Z",
      population: 45000,
      diseases: ["Cholera", "Typhoid"],
      status: "active",
      responseTeams: ["WHO Pakistan", "Sindh Health Dept", "MSF"],
      actions: [
        "Deploy mobile water purification units",
        "Distribute ORS and antibiotics",
        "Set up emergency treatment centers",
        "Launch community awareness campaign",
      ],
    },
    {
      id: 2,
      type: "high",
      title: "Dengue Outbreak Alert - Punjab Region",
      location: "Rajanpur District, Punjab",
      description: "Elevated dengue risk due to stagnant flood water and increased mosquito breeding sites.",
      timestamp: "2024-01-15T08:15:00Z",
      population: 32000,
      diseases: ["Dengue", "Malaria"],
      status: "acknowledged",
      responseTeams: ["Punjab Health Dept", "District Administration"],
      actions: [
        "Vector control operations",
        "Distribute mosquito nets",
        "Set up fever clinics",
        "Community health education",
      ],
    },
    {
      id: 3,
      type: "moderate",
      title: "Typhoid Risk Monitoring - Balochistan",
      location: "Jaffarabad, Balochistan",
      description: "Moderate risk of typhoid outbreak due to compromised sanitation infrastructure.",
      timestamp: "2024-01-15T06:45:00Z",
      population: 28000,
      diseases: ["Typhoid"],
      status: "resolved",
      responseTeams: ["Balochistan Health Dept"],
      actions: ["Water quality testing", "Sanitation system repair", "Vaccination campaign", "Health monitoring"],
    },
  ])

  const notificationChannels = [
    { name: "SMS Alerts", icon: MessageSquare, active: true, recipients: 1247 },
    { name: "Email Notifications", icon: Mail, active: true, recipients: 892 },
    { name: "Phone Calls", icon: Phone, active: true, recipients: 156 },
    { name: "Mobile App Push", icon: Bell, active: true, recipients: 2341 },
  ]

  const acknowledgeAlert = (alertId: number) => {
    setAlerts(alerts.map((alert) => (alert.id === alertId ? { ...alert, status: "acknowledged" } : alert)))
  }

  const resolveAlert = (alertId: number) => {
    setAlerts(alerts.map((alert) => (alert.id === alertId ? { ...alert, status: "resolved" } : alert)))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Real-Time Alert Management System
          </CardTitle>
          <CardDescription>Automated alerts and notifications for predicted disease outbreaks</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="space-y-4">
            <TabsList>
              <TabsTrigger value="active">
                Active Alerts ({alerts.filter((a) => a.status === "active").length})
              </TabsTrigger>
              <TabsTrigger value="acknowledged">
                Acknowledged ({alerts.filter((a) => a.status === "acknowledged").length})
              </TabsTrigger>
              <TabsTrigger value="resolved">
                Resolved ({alerts.filter((a) => a.status === "resolved").length})
              </TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {alerts
                .filter((alert) => alert.status === "active")
                .map((alert) => (
                  <Alert
                    key={alert.id}
                    className={`border-l-4 ${
                      alert.type === "critical"
                        ? "border-l-red-500 bg-red-50"
                        : alert.type === "high"
                          ? "border-l-orange-500 bg-orange-50"
                          : "border-l-yellow-500 bg-yellow-50"
                    }`}
                  >
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle className="flex items-center justify-between">
                      <span>{alert.title}</span>
                      <Badge variant={alert.type === "critical" ? "destructive" : "default"}>
                        {alert.type.toUpperCase()}
                      </Badge>
                    </AlertTitle>
                    <AlertDescription className="space-y-4">
                      <p>{alert.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{alert.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{alert.population.toLocaleString()} people at risk</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{new Date(alert.timestamp).toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {alert.diseases.map((disease) => (
                            <Badge key={disease} variant="outline">
                              {disease}
                            </Badge>
                          ))}
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm mb-2">Response Teams Notified:</h4>
                          <div className="flex flex-wrap gap-2">
                            {alert.responseTeams.map((team) => (
                              <Badge key={team} variant="secondary">
                                {team}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm mb-2">Recommended Actions:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {alert.actions.map((action, index) => (
                              <li key={index}>{action}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Acknowledge
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => resolveAlert(alert.id)}
                          className="flex items-center gap-2"
                        >
                          <XCircle className="h-4 w-4" />
                          Mark Resolved
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
            </TabsContent>

            <TabsContent value="acknowledged" className="space-y-4">
              {alerts
                .filter((alert) => alert.status === "acknowledged")
                .map((alert) => (
                  <Card key={alert.id} className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center justify-between">
                        {alert.title}
                        <Badge variant="secondary">ACKNOWLEDGED</Badge>
                      </CardTitle>
                      <CardDescription>{alert.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button size="sm" onClick={() => resolveAlert(alert.id)} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Mark as Resolved
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="resolved" className="space-y-4">
              {alerts
                .filter((alert) => alert.status === "resolved")
                .map((alert) => (
                  <Card key={alert.id} className="border-l-4 border-l-green-500 opacity-75">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center justify-between">
                        {alert.title}
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          RESOLVED
                        </Badge>
                      </CardTitle>
                      <CardDescription>{alert.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Channels</CardTitle>
                  <CardDescription>
                    Multi-channel alert distribution to health authorities and response teams
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {notificationChannels.map((channel) => (
                      <div key={channel.name} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <channel.icon className="h-5 w-5 text-blue-600" />
                          <div>
                            <h3 className="font-medium">{channel.name}</h3>
                            <p className="text-sm text-gray-600">{channel.recipients} recipients</p>
                          </div>
                        </div>
                        <Badge variant={channel.active ? "default" : "secondary"}>
                          {channel.active ? "Active" : "Inactive"}
                        </Badge>
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
