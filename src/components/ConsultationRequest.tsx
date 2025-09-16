import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HealthcareCard } from "@/components/ui/healthcare-card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Video, Phone, Clock, AlertTriangle, Stethoscope } from "lucide-react"

interface Doctor {
  id: string
  name: string
  specialization: string
  contact_phone: string
  contact_email: string
  is_emergency_doctor: boolean
  is_available: boolean
  response_time_minutes: number
}

export const ConsultationRequest = () => {
  const { toast } = useToast()
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [consultationData, setConsultationData] = useState({
    patient_name: "",
    patient_age: "",
    patient_contact: "",
    patient_symptoms: "",
    patient_vitals: {
      temperature: "",
      blood_pressure: "",
      heart_rate: "",
      oxygen_level: ""
    },
    consultation_type: "routine",
    scheduled_time: "",
    doctor_id: "",
    staff_name: "Health Worker"
  })

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = async () => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .eq('is_available', true)
        .order('response_time_minutes')

      if (error) throw error
      setDoctors(data || [])
    } catch (error) {
      console.error('Error fetching doctors:', error)
      toast({
        title: "Error",
        description: "Failed to load available doctors",
        variant: "destructive",
      })
    }
  }

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      if (parent === 'patient_vitals') {
        setConsultationData(prev => ({
          ...prev,
          patient_vitals: {
            ...prev.patient_vitals,
            [child]: value
          }
        }))
      }
    } else {
      setConsultationData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const selectedDoctor = doctors.find(d => d.id === consultationData.doctor_id)
      
      const consultationRequest = {
        patient_name: consultationData.patient_name,
        patient_age: consultationData.patient_age ? parseInt(consultationData.patient_age) : null,
        patient_contact: consultationData.patient_contact,
        patient_symptoms: consultationData.patient_symptoms,
        patient_vitals: consultationData.patient_vitals,
        consultation_type: consultationData.consultation_type,
        scheduled_time: consultationData.scheduled_time ? new Date(consultationData.scheduled_time).toISOString() : null,
        doctor_id: consultationData.doctor_id,
        doctor_name: selectedDoctor?.name,
        doctor_specialization: selectedDoctor?.specialization,
        staff_name: consultationData.staff_name,
        status: consultationData.consultation_type === 'emergency' ? 'pending' : 'scheduled'
      }

      const { data, error } = await supabase
        .from('consultations')
        .insert([consultationRequest])
        .select()

      if (error) throw error

      // TODO: Send notification to doctor via edge function
      const { error: notifyError } = await supabase.functions.invoke('notify-doctor', {
        body: {
          consultationId: data[0].id,
          doctorId: consultationData.doctor_id,
          patientName: consultationData.patient_name,
          symptoms: consultationData.patient_symptoms,
          consultationType: consultationData.consultation_type,
          scheduledTime: consultationData.scheduled_time
        }
      });

      if (notifyError) {
        console.error('Error sending notification:', notifyError);
      }

      toast({
        title: "Consultation Request Sent",
        description: `${consultationData.consultation_type === 'emergency' ? 'Emergency' : 'Routine'} consultation request sent to ${selectedDoctor?.name}`,
      })

      // Reset form
      setConsultationData({
        patient_name: "",
        patient_age: "",
        patient_contact: "",
        patient_symptoms: "",
        patient_vitals: {
          temperature: "",
          blood_pressure: "",
          heart_rate: "",
          oxygen_level: ""
        },
        consultation_type: "routine",
        scheduled_time: "",
        doctor_id: "",
        staff_name: "Health Worker"
      })

    } catch (error) {
      console.error('Error creating consultation:', error)
      toast({
        title: "Error",
        description: "Failed to send consultation request",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const emergencyDoctors = doctors.filter(d => d.is_emergency_doctor)
  const routineDoctors = doctors.filter(d => !d.is_emergency_doctor)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Stethoscope className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">New Consultation Request</h1>
          <p className="text-muted-foreground">Connect patients with doctors via secure video calls</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Information */}
        <HealthcareCard className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Patient Information</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="patient_name">Patient Name *</Label>
              <Input
                id="patient_name"
                value={consultationData.patient_name}
                onChange={(e) => handleInputChange('patient_name', e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="patient_age">Age</Label>
                <Input
                  id="patient_age"
                  type="number"
                  value={consultationData.patient_age}
                  onChange={(e) => handleInputChange('patient_age', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="patient_contact">Contact</Label>
                <Input
                  id="patient_contact"
                  value={consultationData.patient_contact}
                  onChange={(e) => handleInputChange('patient_contact', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="patient_symptoms">Symptoms & Chief Complaint *</Label>
              <Textarea
                id="patient_symptoms"
                value={consultationData.patient_symptoms}
                onChange={(e) => handleInputChange('patient_symptoms', e.target.value)}
                placeholder="Describe patient's symptoms, pain level, duration..."
                required
              />
            </div>
          </div>
        </HealthcareCard>

        {/* Vitals */}
        <HealthcareCard className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Vital Signs</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="temperature">Temperature (°F)</Label>
              <Input
                id="temperature"
                value={consultationData.patient_vitals.temperature}
                onChange={(e) => handleInputChange('patient_vitals.temperature', e.target.value)}
                placeholder="98.6"
              />
            </div>
            <div>
              <Label htmlFor="blood_pressure">Blood Pressure</Label>
              <Input
                id="blood_pressure"
                value={consultationData.patient_vitals.blood_pressure}
                onChange={(e) => handleInputChange('patient_vitals.blood_pressure', e.target.value)}
                placeholder="120/80"
              />
            </div>
            <div>
              <Label htmlFor="heart_rate">Heart Rate (BPM)</Label>
              <Input
                id="heart_rate"
                value={consultationData.patient_vitals.heart_rate}
                onChange={(e) => handleInputChange('patient_vitals.heart_rate', e.target.value)}
                placeholder="72"
              />
            </div>
            <div>
              <Label htmlFor="oxygen_level">Oxygen Level (%)</Label>
              <Input
                id="oxygen_level"
                value={consultationData.patient_vitals.oxygen_level}
                onChange={(e) => handleInputChange('patient_vitals.oxygen_level', e.target.value)}
                placeholder="98"
              />
            </div>
          </div>
        </HealthcareCard>

        {/* Consultation Type */}
        <HealthcareCard className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Consultation Type</h2>
          <div className="space-y-4">
            <Select value={consultationData.consultation_type} onValueChange={(value) => handleInputChange('consultation_type', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="routine">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Routine - Schedule Later
                  </div>
                </SelectItem>
                <SelectItem value="emergency">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Emergency - Connect Now
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            {consultationData.consultation_type === 'routine' && (
              <div>
                <Label htmlFor="scheduled_time">Preferred Date & Time</Label>
                <Input
                  id="scheduled_time"
                  type="datetime-local"
                  value={consultationData.scheduled_time}
                  onChange={(e) => handleInputChange('scheduled_time', e.target.value)}
                />
              </div>
            )}
          </div>
        </HealthcareCard>

        {/* Doctor Selection */}
        <HealthcareCard className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Select Doctor</h2>
          <div className="space-y-4">
            {consultationData.consultation_type === 'emergency' && (
              <div>
                <h3 className="font-medium text-destructive mb-2">Emergency Doctors Available</h3>
                <div className="space-y-2">
                  {emergencyDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        consultationData.doctor_id === doctor.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => handleInputChange('doctor_id', doctor.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">{doctor.name}</p>
                          <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{doctor.response_time_minutes}min</Badge>
                          <Badge variant="destructive">Emergency</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {consultationData.consultation_type === 'routine' && (
              <div>
                <h3 className="font-medium mb-2">Available Doctors</h3>
                <div className="space-y-2">
                  {routineDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        consultationData.doctor_id === doctor.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => handleInputChange('doctor_id', doctor.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">{doctor.name}</p>
                          <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                        </div>
                        <Badge variant="outline">{doctor.response_time_minutes}min</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </HealthcareCard>

        {/* Submit */}
        <div className="lg:col-span-2">
          <Button
            type="submit"
            disabled={isSubmitting || !consultationData.patient_name || !consultationData.patient_symptoms || !consultationData.doctor_id}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? (
              "Sending Request..."
            ) : consultationData.consultation_type === 'emergency' ? (
              <>
                <AlertTriangle className="h-5 w-5 mr-2" />
                Send Emergency Consultation Request
              </>
            ) : (
              <>
                <Clock className="h-5 w-5 mr-2" />
                Schedule Consultation
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}