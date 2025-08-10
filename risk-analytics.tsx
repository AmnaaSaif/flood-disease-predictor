"use client"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

export function RiskAnalytics() {
  const analyticsData = [
    { disease: "Cholera", currentRisk: 85, trend: "up", change: "+12%", confidence: 92 },
    { disease: "Typhoid", currentRisk: 72, trend: "up", change: "+8%", confidence: 88 },
    { disease: "Dengue", currentRisk: 68, trend: "down", change: "-3%", confidence: 85 },
    { disease: "Malaria", currentRisk: 45, trend: "stable", change: "+1%", confidence: 79 },
  ]

  const modelMetrics = [
    { metric: "Overall Accuracy", value: 87.3, target: 90 },
    { metric: "Precision", value: 84.1, target: 85 },
    { metric: "Recall", value: 91.2, target: 88 },
    { metric: "F1-Score", value: 87.5, target: 86 },
  ]

  return (
    <div className="space-y-4">
      {/* Disease Risk Trends */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Disease Outbreak Predictions</h3>
        {analyticsData.map((item) => (
          <div key={item.disease} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{item.disease}</span>
                {item.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-red-500" />
                ) : item.trend === "down" ? (
                  <TrendingDown className="h-3 w-3 text-green-500" />
                ) : (
                  <Activity className="h-3 w-3 text-gray-500" />
                )}
                <span
                  className={`text-xs ${
                    item.trend === "up" ? "text-red-600" : item.trend === "down" ? "text-green-600" : "text-gray-600"
                  }`}
                >
                  {item.change}
                </span>
              </div>
              <Badge variant={item.currentRisk > 70 ? "destructive" : "secondary"}>{item.currentRisk}%</Badge>
            </div>
            <div className="space-y-1">
              <Progress value={item.currentRisk} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Risk Level</span>
                <span>Confidence: {item.confidence}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Model Performance */}
      <div className="pt-4 border-t">
        <h3 className="font-semibold text-sm mb-3">AI Model Performance</h3>
        <div className="space-y-3">
          {modelMetrics.map((metric) => (
            <div key={metric.metric} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>{metric.metric}</span>
                <span className="font-medium">{metric.value}%</span>
              </div>
              <Progress value={metric.value} className="h-1.5" />
              <div className="text-xs text-gray-500">
                Target: {metric.target}% |
                <span className={metric.value >= metric.target ? "text-green-600" : "text-orange-600"}>
                  {" "}
                  {metric.value >= metric.target ? "Achieved" : "In Progress"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="pt-4 border-t">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-lg font-bold text-blue-600">2.3M</div>
            <div className="text-xs text-gray-600">People Monitored</div>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-bold text-green-600">156</div>
            <div className="text-xs text-gray-600">Outbreaks Prevented</div>
          </div>
        </div>
      </div>
    </div>
  )
}
