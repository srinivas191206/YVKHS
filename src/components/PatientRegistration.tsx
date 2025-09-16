import React, { useState } from "react"
import { Camera, User, Calendar, MapPin, Thermometer, Heart, Activity } from "lucide-react"
import { HealthcareButton } from "./ui/healthcare-button"
import { HealthcareCard, HealthcareCardHeader, HealthcareCardTitle, HealthcareCardContent } from "./ui/healthcare-card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export function PatientRegistration() {
  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    symptoms: "",
    temperature: "",
    bloodPressure: "",
    heartRate: "",
    oxygenLevel: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setPatientData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Patient registered:", patientData)
    // Add registration logic here
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Patient Registration</h2>
          <p className="text-muted-foreground">Register new patients quickly and capture essential information</p>
        </div>
        <HealthcareButton variant="caring" size="lg">
          <Camera className="w-5 h-5" />
          Capture Photo
        </HealthcareButton>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <HealthcareCard>
          <HealthcareCardHeader>
            <HealthcareCardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-deep-teal" />
              Basic Information
            </HealthcareCardTitle>
          </HealthcareCardHeader>
          <HealthcareCardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={patientData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter patient's full name"
                className="rounded-xl"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={patientData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  placeholder="Age"
                  className="rounded-xl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={patientData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Phone number"
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={patientData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Full address"
                className="rounded-xl resize-none"
                rows={3}
              />
            </div>
          </HealthcareCardContent>
        </HealthcareCard>

        {/* Symptoms & Vitals */}
        <HealthcareCard>
          <HealthcareCardHeader>
            <HealthcareCardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-deep-teal" />
              Symptoms & Vitals
            </HealthcareCardTitle>
          </HealthcareCardHeader>
          <HealthcareCardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="symptoms">Chief Complaints</Label>
              <Textarea
                id="symptoms"
                value={patientData.symptoms}
                onChange={(e) => handleInputChange("symptoms", e.target.value)}
                placeholder="Describe main symptoms and concerns"
                className="rounded-xl resize-none"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="temperature" className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4" />
                  Temperature (°F)
                </Label>
                <Input
                  id="temperature"
                  value={patientData.temperature}
                  onChange={(e) => handleInputChange("temperature", e.target.value)}
                  placeholder="98.6"
                  className="rounded-xl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="heartRate" className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Heart Rate (bpm)
                </Label>
                <Input
                  id="heartRate"
                  value={patientData.heartRate}
                  onChange={(e) => handleInputChange("heartRate", e.target.value)}
                  placeholder="72"
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bloodPressure">Blood Pressure</Label>
                <Input
                  id="bloodPressure"
                  value={patientData.bloodPressure}
                  onChange={(e) => handleInputChange("bloodPressure", e.target.value)}
                  placeholder="120/80"
                  className="rounded-xl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="oxygenLevel">Oxygen Level (%)</Label>
                <Input
                  id="oxygenLevel"
                  value={patientData.oxygenLevel}
                  onChange={(e) => handleInputChange("oxygenLevel", e.target.value)}
                  placeholder="98"
                  className="rounded-xl"
                />
              </div>
            </div>
          </HealthcareCardContent>
        </HealthcareCard>

        {/* Submit Button */}
        <div className="lg:col-span-2 flex justify-end gap-4">
          <HealthcareButton variant="outline" type="button">
            Save as Draft
          </HealthcareButton>
          <HealthcareButton type="submit" size="lg">
            Register Patient
          </HealthcareButton>
        </div>
      </form>
    </div>
  )
}