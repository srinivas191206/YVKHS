import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { HealthcareCard } from "@/components/ui/healthcare-card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { FileText, Download, Printer, Calendar, User, Stethoscope, Pill, ArrowLeft } from "lucide-react"
import { format } from "date-fns"

interface PrescriptionViewProps {
  consultationId: string
  onBack?: () => void
}

export const PrescriptionView = ({ consultationId, onBack }: PrescriptionViewProps) => {
  const { toast } = useToast()
  const [prescription, setPrescription] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPrescription()
  }, [consultationId])

  const fetchPrescription = async () => {
    try {
      const { data, error } = await supabase
        .from('prescriptions')
        .select('*')
        .eq('consultation_id', consultationId)
        .maybeSingle()

      if (error) throw error
      setPrescription(data)
    } catch (error) {
      console.error('Error fetching prescription:', error)
      toast({
        title: "Error",
        description: "Failed to load prescription",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  if (!prescription) {
    return (
      <div className="p-6 text-center">
        <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No Prescription Found</h3>
        <p className="text-muted-foreground">This consultation doesn't have a prescription yet.</p>
        {onBack && (
          <Button onClick={onBack} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Digital Prescription</h1>
            <p className="text-muted-foreground">For {prescription.patient_name}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {prescription.is_dispensed ? (
            <Badge variant="default" className="bg-success-green text-white">Dispensed</Badge>
          ) : (
            <Badge variant="secondary">Pending</Badge>
          )}
          
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          
          {onBack && (
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
        </div>
      </div>

      <HealthcareCard className="p-6">
        <div className="space-y-6">
          {/* Patient Info */}
          <div className="flex items-center gap-4 pb-4 border-b">
            <User className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">{prescription.patient_name}</h3>
              <p className="text-sm text-muted-foreground">
                {prescription.patient_age ? `Age: ${prescription.patient_age} years` : 'Age not specified'}
              </p>
            </div>
          </div>

          {/* Doctor Info */}
          <div className="flex items-center gap-4 pb-4 border-b">
            <Stethoscope className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">Dr. {prescription.doctor_name}</h3>
              {prescription.doctor_license_number && (
                <p className="text-sm text-muted-foreground">License: {prescription.doctor_license_number}</p>
              )}
            </div>
          </div>

          {/* Diagnosis */}
          <div>
            <h3 className="font-semibold text-foreground mb-2">Diagnosis</h3>
            <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg">{prescription.diagnosis}</p>
          </div>

          {/* Medications */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Pill className="h-5 w-5 text-primary" />
              Prescribed Medications
            </h3>
            <div className="space-y-3">
              {prescription.medications.map((medication: any, index: number) => (
                <div key={index} className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">{medication.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {medication.dosage} • {medication.frequency}
                        {medication.duration && ` • ${medication.duration}`}
                      </p>
                    </div>
                    <Badge variant="outline">#{index + 1}</Badge>
                  </div>
                  {medication.instructions && (
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>Instructions:</strong> {medication.instructions}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Additional Instructions */}
          {prescription.instructions && (
            <div>
              <h3 className="font-semibold text-foreground mb-2">Additional Instructions</h3>
              <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg">{prescription.instructions}</p>
            </div>
          )}

          {/* Follow-up */}
          {prescription.follow_up_date && (
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-orange-600 mb-2">
                <Calendar className="h-5 w-5" />
                <span className="font-medium">Follow-up Required</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Next appointment: {format(new Date(prescription.follow_up_date), 'PPP')}
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="pt-4 border-t text-center text-xs text-muted-foreground">
            <p>Prescription Date: {format(new Date(prescription.prescription_date), 'PPP')}</p>
            <p className="mt-1">Generated by Vaidhya Setu Rural Health Platform</p>
          </div>
        </div>
      </HealthcareCard>
    </div>
  )
}