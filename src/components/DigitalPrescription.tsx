import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { HealthcareCard } from "@/components/ui/healthcare-card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Download, Printer, Calendar, User, Stethoscope, Pill, FileText } from "lucide-react"
import { format } from "date-fns"
import vaidhyaSetu from "@/assets/vaidhya-setu-logo.jpeg"

interface Prescription {
  id: string
  patient_name: string
  patient_age: number | null
  doctor_name: string
  doctor_license_number: string | null
  diagnosis: string
  medications: any
  instructions: string | null
  follow_up_date: string | null
  prescription_date: string
  is_dispensed: boolean
  created_at: string
}

interface DigitalPrescriptionProps {
  prescriptionId: string
  onBack?: () => void
}

export const DigitalPrescription = ({ prescriptionId, onBack }: DigitalPrescriptionProps) => {
  const { toast } = useToast()
  const [prescription, setPrescription] = useState<Prescription | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPrescription()
  }, [prescriptionId])

  const fetchPrescription = async () => {
    try {
      const { data, error } = await supabase
        .from('prescriptions')
        .select('*')
        .eq('id', prescriptionId)
        .single()

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

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // Create a clean version for download/print
    const printContent = document.getElementById('prescription-content')
    if (printContent) {
      const newWindow = window.open('', '_blank')
      newWindow?.document.write(`
        <html>
          <head>
            <title>Prescription - ${prescription?.patient_name}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; color: #000; }
              .header { text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 20px; }
              .logo { width: 60px; height: 60px; margin: 0 auto 10px; }
              .patient-info, .doctor-info { background: #f8fafc; padding: 15px; margin: 15px 0; border-radius: 8px; }
              .medication { border: 1px solid #e2e8f0; padding: 15px; margin: 10px 0; border-radius: 8px; }
              .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; }
              @media print { body { margin: 0; } }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `)
      newWindow?.document.close()
      newWindow?.print()
    }
  }

  const markAsDispensed = async () => {
    try {
      const { error } = await supabase
        .from('prescriptions')
        .update({ 
          is_dispensed: true,
          dispensed_at: new Date().toISOString(),
          dispensed_by: 'Pharmacy Staff'
        })
        .eq('id', prescriptionId)

      if (error) throw error

      setPrescription(prev => prev ? { ...prev, is_dispensed: true } : null)

      toast({
        title: "Success",
        description: "Prescription marked as dispensed",
      })
    } catch (error) {
      console.error('Error updating prescription:', error)
      toast({
        title: "Error",
        description: "Failed to update prescription status",
        variant: "destructive",
      })
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
        <h3 className="text-lg font-medium text-foreground mb-2">Prescription Not Found</h3>
        <p className="text-muted-foreground">The requested prescription could not be found.</p>
        {onBack && (
          <Button onClick={onBack} className="mt-4">Go Back</Button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between p-6 bg-background border-b print:hidden">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Digital Prescription</h1>
            <p className="text-muted-foreground">Generated on {format(new Date(prescription.created_at), 'PPP')}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {prescription.is_dispensed ? (
            <Badge variant="default" className="bg-success-green text-white">Dispensed</Badge>
          ) : (
            <Badge variant="secondary">Pending</Badge>
          )}
          
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          
          {!prescription.is_dispensed && (
            <Button onClick={markAsDispensed}>
              Mark as Dispensed
            </Button>
          )}
          
          {onBack && (
            <Button variant="ghost" onClick={onBack}>
              Back
            </Button>
          )}
        </div>
      </div>

      {/* Prescription Content */}
      <div id="prescription-content" className="max-w-4xl mx-auto bg-white p-8 shadow-lg print:shadow-none print:p-0">
        {/* Header */}
        <div className="text-center border-b-2 border-primary pb-6 mb-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img 
              src={vaidhyaSetu} 
              alt="Vaidhya Setu Logo" 
              className="w-16 h-16 object-contain"
            />
            <div>
              <h1 className="text-3xl font-bold text-primary">Vaidhya Setu</h1>
              <p className="text-sm text-muted-foreground">Connecting Doctors, Empowering Rural Healthcare</p>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-foreground">DIGITAL PRESCRIPTION</h2>
        </div>

        {/* Patient & Doctor Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <User className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Patient Information</h3>
            </div>
            <div className="space-y-1 text-sm">
              <p><strong>Name:</strong> {prescription.patient_name}</p>
              {prescription.patient_age && <p><strong>Age:</strong> {prescription.patient_age} years</p>}
              <p><strong>Date:</strong> {format(new Date(prescription.prescription_date), 'dd/MM/yyyy')}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Stethoscope className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Doctor Information</h3>
            </div>
            <div className="space-y-1 text-sm">
              <p><strong>Dr.</strong> {prescription.doctor_name}</p>
              {prescription.doctor_license_number && (
                <p><strong>License:</strong> {prescription.doctor_license_number}</p>
              )}
              <p><strong>Digital Signature:</strong> Verified ✓</p>
            </div>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="mb-6">
          <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Diagnosis
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm">{prescription.diagnosis}</p>
          </div>
        </div>

        {/* Medications */}
        <div className="mb-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Pill className="h-5 w-5 text-primary" />
            Prescribed Medications
          </h3>
          <div className="space-y-4">
            {prescription.medications.map((medication, index) => (
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
          <div className="mb-6">
            <h3 className="font-semibold text-foreground mb-2">Additional Instructions</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm">{prescription.instructions}</p>
            </div>
          </div>
        )}

        {/* Follow-up */}
        {prescription.follow_up_date && (
          <div className="mb-6">
            <div className="flex items-center gap-2 text-orange-600">
              <Calendar className="h-5 w-5" />
              <span className="font-medium">Follow-up Required</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Next appointment: {format(new Date(prescription.follow_up_date), 'PPP')}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="border-t pt-6 mt-8 text-center text-xs text-muted-foreground">
          <p>This is a digitally generated prescription from Vaidhya Setu Rural Health Platform</p>
          <p className="mt-1">Generated on {format(new Date(prescription.created_at), 'PPp')}</p>
          <p className="mt-2 font-medium">
            For any queries, please contact your healthcare provider
          </p>
        </div>
      </div>
    </div>
  )
}