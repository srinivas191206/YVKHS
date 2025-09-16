import React from "react"
import { Users, Stethoscope, Pill, AlertTriangle, TrendingUp, Clock, Heart, Activity } from "lucide-react"
import { HealthcareButton } from "./ui/healthcare-button"
import { HealthcareCard, HealthcareCardHeader, HealthcareCardTitle, HealthcareCardContent, HealthcareCardDescription } from "./ui/healthcare-card"
import { Badge } from "./ui/badge"

export function DashboardOverview() {
  const todayStats = {
    patientsRegistered: 12,
    consultationsCompleted: 8,
    medicinesDispensed: 45,
    emergencyCalls: 2
  }

  const recentPatients = [
    { id: "P001", name: "Ramesh Kumar", age: 45, condition: "Hypertension", time: "2 mins ago" },
    { id: "P002", name: "Sunita Devi", age: 28, condition: "Fever", time: "15 mins ago" },
    { id: "P003", name: "Arjun Singh", age: 62, condition: "Diabetes Check", time: "1 hour ago" },
  ]

  const onlineDoctors = [
    { name: "Dr. Rajesh Kumar", specialization: "General Medicine", status: "Available" },
    { name: "Dr. Priya Sharma", specialization: "Pediatrics", status: "In Consultation" },
    { name: "Dr. Amit Patel", specialization: "Cardiology", status: "Available" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
        <p className="text-muted-foreground">Welcome back! Here's what's happening at your health center today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <HealthcareCard variant="caring">
          <HealthcareCardContent className="flex items-center gap-4">
            <div className="w-12 h-12 bg-healing-mint rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-deep-teal" />
            </div>
            <div>
              <p className="text-2xl font-bold text-deep-teal">{todayStats.patientsRegistered}</p>
              <p className="text-sm text-muted-foreground">Patients Today</p>
            </div>
          </HealthcareCardContent>
        </HealthcareCard>

        <HealthcareCard variant="info">
          <HealthcareCardContent className="flex items-center gap-4">
            <div className="w-12 h-12 bg-sky-blue rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-deep-blue" />
            </div>
            <div>
              <p className="text-2xl font-bold text-deep-blue">{todayStats.consultationsCompleted}</p>
              <p className="text-sm text-muted-foreground">Consultations</p>
            </div>
          </HealthcareCardContent>
        </HealthcareCard>

        <HealthcareCard variant="success">
          <HealthcareCardContent className="flex items-center gap-4">
            <div className="w-12 h-12 bg-success-green/20 rounded-xl flex items-center justify-center">
              <Pill className="w-6 h-6 text-success-green" />
            </div>
            <div>
              <p className="text-2xl font-bold text-success-green">{todayStats.medicinesDispensed}</p>
              <p className="text-sm text-muted-foreground">Medicines Dispensed</p>
            </div>
          </HealthcareCardContent>
        </HealthcareCard>

        <HealthcareCard variant="urgent">
          <HealthcareCardContent className="flex items-center gap-4">
            <div className="w-12 h-12 bg-warm-coral rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-error-rose" />
            </div>
            <div>
              <p className="text-2xl font-bold text-error-rose">{todayStats.emergencyCalls}</p>
              <p className="text-sm text-muted-foreground">Emergency Cases</p>
            </div>
          </HealthcareCardContent>
        </HealthcareCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Patients */}
        <HealthcareCard>
          <HealthcareCardHeader>
            <div className="flex items-center justify-between">
              <HealthcareCardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-deep-teal" />
                Recent Patients
              </HealthcareCardTitle>
              <HealthcareButton variant="ghost" size="sm">
                View All
              </HealthcareButton>
            </div>
          </HealthcareCardHeader>
          <HealthcareCardContent className="space-y-4">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-3 bg-healing-mint-soft/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{patient.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">{patient.condition} • Age {patient.age}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="text-xs">{patient.id}</Badge>
                  <p className="text-xs text-muted-foreground mt-1">{patient.time}</p>
                </div>
              </div>
            ))}
          </HealthcareCardContent>
        </HealthcareCard>

        {/* Online Doctors */}
        <HealthcareCard>
          <HealthcareCardHeader>
            <HealthcareCardTitle className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-deep-teal" />
              Available Doctors
            </HealthcareCardTitle>
            <HealthcareCardDescription>
              {onlineDoctors.length} doctors currently online
            </HealthcareCardDescription>
          </HealthcareCardHeader>
          <HealthcareCardContent className="space-y-4">
            {onlineDoctors.map((doctor, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-sky-blue-soft/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{doctor.name}</p>
                    <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                  </div>
                </div>
                <Badge 
                  variant={doctor.status === "Available" ? "default" : "secondary"}
                  className={doctor.status === "Available" ? "bg-success-green/20 text-success-green border-success-green/30" : ""}
                >
                  {doctor.status}
                </Badge>
              </div>
            ))}
          </HealthcareCardContent>
        </HealthcareCard>
      </div>

      {/* Quick Actions */}
      <HealthcareCard variant="caring">
        <HealthcareCardHeader>
          <HealthcareCardTitle>Quick Actions</HealthcareCardTitle>
          <HealthcareCardDescription>
            Access frequently used features quickly
          </HealthcareCardDescription>
        </HealthcareCardHeader>
        <HealthcareCardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <HealthcareButton variant="caring" className="h-20 flex-col gap-2">
              <Users className="w-6 h-6" />
              <span className="text-sm">Register Patient</span>
            </HealthcareButton>
            
            <HealthcareButton variant="doctor" className="h-20 flex-col gap-2">
              <Stethoscope className="w-6 h-6" />
              <span className="text-sm">Connect Doctor</span>
            </HealthcareButton>
            
            <HealthcareButton variant="outline" className="h-20 flex-col gap-2">
              <Pill className="w-6 h-6" />
              <span className="text-sm">Check Inventory</span>
            </HealthcareButton>
            
            <HealthcareButton variant="emergency" className="h-20 flex-col gap-2">
              <AlertTriangle className="w-6 h-6" />
              <span className="text-sm">Emergency SOS</span>
            </HealthcareButton>
          </div>
        </HealthcareCardContent>
      </HealthcareCard>
    </div>
  )
}