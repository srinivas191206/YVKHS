import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HealthcareCard } from "@/components/ui/healthcare-card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Plus, Trash2, FileText, User, Calendar, Pill } from "lucide-react"

interface Medication {
  name: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
}

interface PrescriptionFormProps {
  consultationId: string
  patientName: string
  patientAge: number | null
  doctorId: string
  doctorName: string
  onPrescriptionCreated?: (prescriptionId: string) => void
  onCancel?: () => void
}

export const PrescriptionForm = ({ 
  consultationId, 
  patientName, 
  patientAge, 
  doctorId, 
  doctorName,
  onPrescriptionCreated,
  onCancel 
}: PrescriptionFormProps) => {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [prescriptionData, setPrescriptionData] = useState({
    diagnosis: "",
    instructions: "",
    followUpDate: "",
    doctorLicenseNumber: "MED-2024-001",
  })
  
  const [medications, setMedications] = useState<Medication[]>([
    { name: "", dosage: "", frequency: "", duration: "", instructions: "" }
  ])

  const addMedication = () => {
    setMedications([...medications, { name: "", dosage: "", frequency: "", duration: "", instructions: "" }])
  }

  const removeMedication = (index: number) => {
    if (medications.length > 1) {
      setMedications(medications.filter((_, i) => i !== index))
    }
  }

  const updateMedication = (index: number, field: keyof Medication, value: string) => {
    const updated = medications.map((med, i) => 
      i === index ? { ...med, [field]: value } : med
    )
    setMedications(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate medications
      const validMedications = medications.filter(med => 
        med.name.trim() && med.dosage.trim() && med.frequency.trim()
      )

      if (validMedications.length === 0) {
        toast({
          title: "Error",
          description: "Please add at least one medication",
          variant: "destructive",
        })
        return
      }

      if (!prescriptionData.diagnosis.trim()) {
        toast({
          title: "Error",
          description: "Please provide a diagnosis",
          variant: "destructive",
        })
        return
      }

      const prescription = {
        consultation_id: consultationId,
        patient_name: patientName,
        patient_age: patientAge,
        doctor_id: doctorId,
        doctor_name: doctorName,
        doctor_license_number: prescriptionData.doctorLicenseNumber,
        diagnosis: prescriptionData.diagnosis,
        medications: validMedications,
        instructions: prescriptionData.instructions,
        follow_up_date: prescriptionData.followUpDate || null
      }

      const { data, error } = await supabase
        .from('prescriptions')
        .insert(prescription)
        .select()

      if (error) throw error

      // Update consultation with prescription reference
      await supabase
        .from('consultations')
        .update({ prescription_id: data[0].id })
        .eq('id', consultationId)

      toast({
        title: "Prescription Created",
        description: "Digital prescription has been successfully created",
      })

      onPrescriptionCreated?.(data[0].id)

    } catch (error) {
      console.error('Error creating prescription:', error)
      toast({
        title: "Error",
        description: "Failed to create prescription",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create Prescription</h1>
            <p className="text-muted-foreground">Digital prescription for {patientName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Dr. {doctorName}</Badge>
          <Badge variant="secondary">ID: {prescriptionData.doctorLicenseNumber}</Badge>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Info Summary */}
        <HealthcareCard className="p-4 bg-primary/5">
          <div className="flex items-center gap-4">
            <User className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">{patientName}</h3>
              <p className="text-sm text-muted-foreground">
                {patientAge ? `Age: ${patientAge} years` : 'Age not specified'} • Consultation ID: {consultationId.slice(0, 8)}
              </p>
            </div>
          </div>
        </HealthcareCard>

        {/* Diagnosis */}
        <HealthcareCard className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Diagnosis</h2>
          <div>
            <Label htmlFor="diagnosis">Primary Diagnosis *</Label>
            <Textarea
              id="diagnosis"
              value={prescriptionData.diagnosis}
              onChange={(e) => setPrescriptionData(prev => ({ ...prev, diagnosis: e.target.value }))}
              placeholder="Enter the primary diagnosis and any relevant clinical findings..."
              className="min-h-[100px]"
              required
            />
          </div>
        </HealthcareCard>

        {/* Medications */}
        <HealthcareCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Medications</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addMedication}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Medication
            </Button>
          </div>

          <div className="space-y-4">
            {medications.map((medication, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Pill className="h-4 w-4 text-primary" />
                    <span className="font-medium">Medication {index + 1}</span>
                  </div>
                  {medications.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMedication(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Medicine Name *</Label>
                    <Input
                      value={medication.name}
                      onChange={(e) => updateMedication(index, 'name', e.target.value)}
                      placeholder="e.g., Paracetamol, Amoxicillin"
                    />
                  </div>
                  <div>
                    <Label>Dosage *</Label>
                    <Input
                      value={medication.dosage}
                      onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                      placeholder="e.g., 500mg, 250mg"
                    />
                  </div>
                  <div>
                    <Label>Frequency *</Label>
                    <Select
                      value={medication.frequency}
                      onValueChange={(value) => updateMedication(index, 'frequency', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Once daily">Once daily</SelectItem>
                        <SelectItem value="Twice daily">Twice daily</SelectItem>
                        <SelectItem value="Three times daily">Three times daily</SelectItem>
                        <SelectItem value="Four times daily">Four times daily</SelectItem>
                        <SelectItem value="As needed">As needed</SelectItem>
                        <SelectItem value="Before meals">Before meals</SelectItem>
                        <SelectItem value="After meals">After meals</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Duration</Label>
                    <Input
                      value={medication.duration}
                      onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                      placeholder="e.g., 7 days, 2 weeks"
                    />
                  </div>
                </div>

                <div>
                  <Label>Special Instructions</Label>
                  <Textarea
                    value={medication.instructions}
                    onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
                    placeholder="e.g., Take with food, Avoid alcohol"
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>
        </HealthcareCard>

        {/* Additional Instructions */}
        <HealthcareCard className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Additional Instructions</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="instructions">General Instructions</Label>
              <Textarea
                id="instructions"
                value={prescriptionData.instructions}
                onChange={(e) => setPrescriptionData(prev => ({ ...prev, instructions: e.target.value }))}
                placeholder="Any additional instructions for the patient..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="followUpDate">Follow-up Date</Label>
              <Input
                id="followUpDate"
                type="date"
                value={prescriptionData.followUpDate}
                onChange={(e) => setPrescriptionData(prev => ({ ...prev, followUpDate: e.target.value }))}
              />
            </div>
          </div>
        </HealthcareCard>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1"
            size="lg"
          >
            {isSubmitting ? (
              "Creating Prescription..."
            ) : (
              <>
                <FileText className="h-5 w-5 mr-2" />
                Create Digital Prescription
              </>
            )}
          </Button>
          
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              size="lg"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}