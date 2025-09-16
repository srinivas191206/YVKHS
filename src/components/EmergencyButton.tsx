import React, { useState } from "react"
import { AlertTriangle, Phone, MapPin, Clock } from "lucide-react"
import { HealthcareButton } from "./ui/healthcare-button"
import { HealthcareCard, HealthcareCardHeader, HealthcareCardTitle, HealthcareCardContent } from "./ui/healthcare-card"

export function EmergencyButton() {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false)
  const [emergencyStep, setEmergencyStep] = useState(0)

  const handleEmergency = () => {
    setIsEmergencyActive(true)
    setEmergencyStep(1)
    
    // Simulate emergency call process
    setTimeout(() => setEmergencyStep(2), 2000)
    setTimeout(() => setEmergencyStep(3), 4000)
    setTimeout(() => {
      setEmergencyStep(0)
      setIsEmergencyActive(false)
    }, 8000)
  }

  if (isEmergencyActive) {
    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
        <HealthcareCard className="max-w-md w-full text-center">
          <HealthcareCardContent className="p-8">
            <div className="w-20 h-20 bg-error-rose rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <AlertTriangle className="w-10 h-10 text-white" />
            </div>
            
            {emergencyStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-error-rose mb-2">Emergency Alert Sent</h2>
                <p className="text-muted-foreground mb-4">Connecting to nearest ambulance service...</p>
                <div className="flex justify-center gap-1">
                  <div className="w-2 h-2 bg-error-rose rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-error-rose rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-error-rose rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
            
            {emergencyStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-success-green mb-2">Ambulance Located</h2>
                <p className="text-muted-foreground mb-4">
                  Emergency vehicle dispatched from District Hospital
                </p>
                <div className="flex items-center justify-center gap-2 text-info-blue">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">ETA: 15 minutes</span>
                </div>
              </div>
            )}
            
            {emergencyStep === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-success-green mb-2">Help is Coming</h2>
                <p className="text-muted-foreground mb-4">
                  GPS location shared • Contact: +91 9876543210
                </p>
                <div className="flex items-center justify-center gap-2 text-deep-teal">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm">Location: Village Health Center, Sector 12</span>
                </div>
              </div>
            )}
          </HealthcareCardContent>
        </HealthcareCard>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Emergency Services</h2>
        <p className="text-muted-foreground">One-click access to emergency medical assistance</p>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8">
        <HealthcareButton 
          variant="emergency"
          size="xl"
          className="w-48 h-48 rounded-full text-2xl font-bold shadow-glow"
          onClick={handleEmergency}
        >
          <div className="flex flex-col items-center gap-3">
            <AlertTriangle className="w-16 h-16" />
            <span>SOS</span>
            <span className="text-sm font-normal">Emergency Call</span>
          </div>
        </HealthcareButton>

        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-error-rose">Emergency Hotline</p>
          <p className="text-2xl font-bold text-deep-teal">108</p>
          <p className="text-sm text-muted-foreground">Available 24/7</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <HealthcareCard variant="urgent">
          <HealthcareCardHeader>
            <HealthcareCardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-error-rose" />
              Direct Emergency Contacts
            </HealthcareCardTitle>
          </HealthcareCardHeader>
          <HealthcareCardContent className="space-y-3">
            <div className="flex justify-between items-center p-2">
              <span className="font-medium">District Hospital</span>
              <span className="text-deep-teal">+91 9876543210</span>
            </div>
            <div className="flex justify-between items-center p-2">
              <span className="font-medium">Police Station</span>
              <span className="text-deep-teal">100</span>
            </div>
            <div className="flex justify-between items-center p-2">
              <span className="font-medium">Fire Department</span>
              <span className="text-deep-teal">101</span>
            </div>
          </HealthcareCardContent>
        </HealthcareCard>

        <HealthcareCard variant="info">
          <HealthcareCardHeader>
            <HealthcareCardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-info-blue" />
              Location Services
            </HealthcareCardTitle>
          </HealthcareCardHeader>
          <HealthcareCardContent className="space-y-3">
            <div className="p-3 bg-info-blue/10 rounded-xl">
              <p className="font-medium text-info-blue">GPS Status: Active</p>
              <p className="text-sm text-muted-foreground">Location will be shared automatically</p>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Coordinates: 28.6139° N, 77.2090° E</p>
              <p>Address: Village Health Center, Sector 12, Rural District</p>
            </div>
          </HealthcareCardContent>
        </HealthcareCard>
      </div>
    </div>
  )
}