import React from "react"
import { BarChart3, TrendingUp, Users, Heart, Calendar, Download } from "lucide-react"
import { HealthcareCard } from "./ui/healthcare-card"
import { HealthcareButton } from "./ui/healthcare-button"
import { Badge } from "./ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

const mockPatientStats = {
  totalVisits: 234,
  newPatients: 45,
  criticalCases: 8,
  averageWaitTime: 12
}

const mockDiseaseData = [
  { name: "Common Cold", cases: 45, change: "+12%" },
  { name: "Hypertension", cases: 32, change: "-5%" },
  { name: "Diabetes", cases: 28, change: "+8%" },
  { name: "Fever", cases: 25, change: "+15%" },
  { name: "Headache", cases: 18, change: "-2%" }
]

const mockDoctorStats = [
  { name: "Dr. Sarah Miller", consultations: 45, avgResponseTime: "3.2 min", rating: 4.8 },
  { name: "Dr. John Smith", consultations: 38, avgResponseTime: "4.1 min", rating: 4.6 },
  { name: "Dr. Emily Chen", consultations: 32, avgResponseTime: "2.8 min", rating: 4.9 },
  { name: "Dr. Michael Brown", consultations: 28, avgResponseTime: "5.2 min", rating: 4.5 }
]

const weeklyData = [
  { day: "Mon", patients: 28, consultations: 24 },
  { day: "Tue", patients: 35, consultations: 31 },
  { day: "Wed", patients: 42, consultations: 38 },
  { day: "Thu", patients: 38, consultations: 35 },
  { day: "Fri", patients: 45, consultations: 41 },
  { day: "Sat", patients: 32, consultations: 28 },
  { day: "Sun", patients: 25, consultations: 22 }
]

export function ReportsAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="text-3xl font-bold text-deep-teal">Reports & Analytics</div>
          <p className="text-muted-foreground mt-1">Track health statistics, trends, and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="7days">
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 3 months</SelectItem>
            </SelectContent>
          </Select>
          <HealthcareButton variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </HealthcareButton>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <HealthcareCard className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-deep-teal/10 rounded-full mx-auto mb-3">
            <Users className="w-6 h-6 text-deep-teal" />
          </div>
          <div className="text-2xl font-bold text-deep-teal">{mockPatientStats.totalVisits}</div>
          <p className="text-sm text-muted-foreground">Total Visits</p>
          <Badge variant="secondary" className="mt-2">+8.2%</Badge>
        </HealthcareCard>

        <HealthcareCard className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-healing-mint/20 rounded-full mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-deep-teal" />
          </div>
          <div className="text-2xl font-bold text-deep-teal">{mockPatientStats.newPatients}</div>
          <p className="text-sm text-muted-foreground">New Patients</p>
          <Badge variant="secondary" className="mt-2">+12.5%</Badge>
        </HealthcareCard>

        <HealthcareCard className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-destructive/10 rounded-full mx-auto mb-3">
            <Heart className="w-6 h-6 text-destructive" />
          </div>
          <div className="text-2xl font-bold text-destructive">{mockPatientStats.criticalCases}</div>
          <p className="text-sm text-muted-foreground">Critical Cases</p>
          <Badge variant="destructive" className="mt-2">-2.1%</Badge>
        </HealthcareCard>

        <HealthcareCard className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-sky-blue/20 rounded-full mx-auto mb-3">
            <Calendar className="w-6 h-6 text-deep-blue" />
          </div>
          <div className="text-2xl font-bold text-deep-blue">{mockPatientStats.averageWaitTime}m</div>
          <p className="text-sm text-muted-foreground">Avg Wait Time</p>
          <Badge variant="secondary" className="mt-2">-5.3%</Badge>
        </HealthcareCard>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="diseases">Diseases</TabsTrigger>
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HealthcareCard>
              <h3 className="text-lg font-semibold mb-4">Weekly Patient Flow</h3>
              <div className="space-y-3">
                {weeklyData.map((day) => (
                  <div key={day.day} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 text-sm font-medium">{day.day}</div>
                      <div className="flex-1 bg-secondary rounded-full h-2 relative overflow-hidden">
                        <div 
                          className="bg-deep-teal h-full rounded-full transition-all duration-500"
                          style={{ width: `${(day.patients / 50) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-sm font-medium text-deep-teal">{day.patients}</div>
                  </div>
                ))}
              </div>
            </HealthcareCard>

            <HealthcareCard>
              <h3 className="text-lg font-semibold mb-4">Consultation Success Rate</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-deep-teal mb-2">94.5%</div>
                <p className="text-muted-foreground mb-4">Successfully completed consultations</p>
                <div className="bg-secondary rounded-full h-3 overflow-hidden">
                  <div className="bg-gradient-primary h-full rounded-full w-[94.5%] transition-all duration-1000" />
                </div>
              </div>
            </HealthcareCard>
          </div>
        </TabsContent>

        <TabsContent value="diseases" className="space-y-4">
          <HealthcareCard>
            <h3 className="text-lg font-semibold mb-4">Common Conditions This Month</h3>
            <div className="space-y-4">
              {mockDiseaseData.map((disease) => (
                <div key={disease.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div>
                    <h4 className="font-medium">{disease.name}</h4>
                    <p className="text-sm text-muted-foreground">{disease.cases} cases</p>
                  </div>
                  <Badge variant={disease.change.startsWith('+') ? 'destructive' : 'secondary'}>
                    {disease.change}
                  </Badge>
                </div>
              ))}
            </div>
          </HealthcareCard>
        </TabsContent>

        <TabsContent value="doctors" className="space-y-4">
          <HealthcareCard>
            <h3 className="text-lg font-semibold mb-4">Doctor Performance</h3>
            <div className="space-y-4">
              {mockDoctorStats.map((doctor) => (
                <div key={doctor.name} className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <h4 className="font-medium">{doctor.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {doctor.consultations} consultations • Avg response: {doctor.avgResponseTime}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">{doctor.rating}</span>
                      <Heart className="w-4 h-4 text-deep-teal fill-current" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </HealthcareCard>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HealthcareCard>
              <h3 className="text-lg font-semibold mb-4">Health Trends</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Preventive Care Visits</span>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium text-success">+18%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Emergency Cases</span>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-destructive rotate-180" />
                    <span className="text-sm font-medium text-success">-8%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Telemedicine Usage</span>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium text-success">+45%</span>
                  </div>
                </div>
              </div>
            </HealthcareCard>

            <HealthcareCard>
              <h3 className="text-lg font-semibold mb-4">Resource Utilization</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Medical Equipment</span>
                    <span>87%</span>
                  </div>
                  <div className="bg-secondary rounded-full h-2">
                    <div className="bg-deep-teal h-full rounded-full w-[87%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Medicine Inventory</span>
                    <span>72%</span>
                  </div>
                  <div className="bg-secondary rounded-full h-2">
                    <div className="bg-sky-blue h-full rounded-full w-[72%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Staff Capacity</span>
                    <span>94%</span>
                  </div>
                  <div className="bg-secondary rounded-full h-2">
                    <div className="bg-healing-mint h-full rounded-full w-[94%]" />
                  </div>
                </div>
              </div>
            </HealthcareCard>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}