import React, { useState } from "react"
import { Video, Phone, Wifi, WifiOff, Clock, Star, Stethoscope, Brain, Bone, Eye } from "lucide-react"
import { HealthcareButton } from "./ui/healthcare-button"
import { HealthcareCard, HealthcareCardHeader, HealthcareCardTitle, HealthcareCardContent, HealthcareCardDescription } from "./ui/healthcare-card"
import { Badge } from "./ui/badge"

interface Doctor {
  id: string
  name: string
  specialization: string
  rating: number
  isOnline: boolean
  responseTime: string
  consultationFee: string
  icon: React.ComponentType<any>
}

const availableDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    specialization: "General Medicine",
    rating: 4.8,
    isOnline: true,
    responseTime: "~2 min",
    consultationFee: "₹200",
    icon: Stethoscope
  },
  {
    id: "2", 
    name: "Dr. Priya Sharma",
    specialization: "Pediatrics",
    rating: 4.9,
    isOnline: true,
    responseTime: "~3 min",
    consultationFee: "₹250",
    icon: Stethoscope
  },
  {
    id: "3",
    name: "Dr. Amit Patel", 
    specialization: "Cardiology",
    rating: 4.7,
    isOnline: false,
    responseTime: "~15 min",
    consultationFee: "₹400",
    icon: Brain
  },
  {
    id: "4",
    name: "Dr. Sunita Reddy",
    specialization: "Orthopedics", 
    rating: 4.6,
    isOnline: true,
    responseTime: "~5 min",
    consultationFee: "₹350",
    icon: Bone
  }
]

export function DoctorConnect() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [callType, setCallType] = useState<"video" | "audio">("video")
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = (doctor: Doctor, type: "video" | "audio") => {
    setSelectedDoctor(doctor)
    setCallType(type)
    setIsConnecting(true)
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false)
      console.log(`Connecting to ${doctor.name} via ${type}`)
    }, 3000)
  }

  if (isConnecting) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <HealthcareCard className="text-center p-8 max-w-md mx-auto">
          <HealthcareCardContent>
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              {callType === "video" ? <Video className="w-8 h-8 text-white" /> : <Phone className="w-8 h-8 text-white" />}
            </div>
            <h3 className="text-xl font-semibold mb-2">Connecting to {selectedDoctor?.name}</h3>
            <p className="text-muted-foreground mb-4">Please wait while we establish the connection...</p>
            <div className="flex justify-center gap-1">
              <div className="w-2 h-2 bg-healing-mint rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-healing-mint rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-healing-mint rounded-full animate-bounce"></div>
            </div>
          </HealthcareCardContent>
        </HealthcareCard>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Doctor Connect</h2>
        <p className="text-muted-foreground">Connect with available doctors for patient consultations</p>
      </div>

      {/* Network Status */}
      <HealthcareCard variant="info" className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-info-blue/20 rounded-xl flex items-center justify-center">
            <Wifi className="w-5 h-5 text-info-blue" />
          </div>
          <div>
            <p className="font-medium">Network Status: Good</p>
            <p className="text-sm text-muted-foreground">Video calls available • 4G/WiFi connection detected</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-success-green/20 text-success-green border-success-green/30">
          Connected
        </Badge>
      </HealthcareCard>

      {/* Available Doctors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableDoctors.map((doctor) => {
          const DoctorIcon = doctor.icon
          
          return (
            <HealthcareCard key={doctor.id} className="relative overflow-hidden">
              <HealthcareCardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <DoctorIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <HealthcareCardTitle className="text-lg">{doctor.name}</HealthcareCardTitle>
                      <HealthcareCardDescription>{doctor.specialization}</HealthcareCardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${doctor.isOnline ? 'bg-success-green' : 'bg-muted'}`} />
                    <span className="text-xs font-medium">
                      {doctor.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              </HealthcareCardHeader>

              <HealthcareCardContent>
                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-warning-amber mb-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">{doctor.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Clock className="w-4 h-4 text-info-blue" />
                      <span className="text-sm font-medium">{doctor.responseTime}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Response</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-deep-teal mb-1">{doctor.consultationFee}</p>
                    <p className="text-xs text-muted-foreground">Fee</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <HealthcareButton
                    variant="doctor"
                    className="flex-1"
                    disabled={!doctor.isOnline}
                    onClick={() => handleConnect(doctor, "video")}
                  >
                    <Video className="w-4 h-4" />
                    Video Call
                  </HealthcareButton>
                  
                  <HealthcareButton
                    variant="outline"
                    className="flex-1"
                    disabled={!doctor.isOnline}
                    onClick={() => handleConnect(doctor, "audio")}
                  >
                    <Phone className="w-4 h-4" />
                    Audio Only
                  </HealthcareButton>
                </div>
              </HealthcareCardContent>
            </HealthcareCard>
          )
        })}
      </div>

      {/* Low Bandwidth Mode */}
      <HealthcareCard variant="caring">
        <HealthcareCardContent className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-warm-coral/20 rounded-xl flex items-center justify-center">
              <WifiOff className="w-5 h-5 text-warm-coral" />
            </div>
            <div>
              <p className="font-medium">Poor Network Detected?</p>
              <p className="text-sm text-muted-foreground">Switch to audio-only mode for better connectivity</p>
            </div>
          </div>
          <HealthcareButton variant="caring">
            Enable Low-Bandwidth Mode
          </HealthcareButton>
        </HealthcareCardContent>
      </HealthcareCard>
    </div>
  )
}