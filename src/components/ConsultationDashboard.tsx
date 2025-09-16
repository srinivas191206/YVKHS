import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HealthcareCard } from "@/components/ui/healthcare-card"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Video, Phone, Clock, AlertTriangle, User, Calendar, Stethoscope, Eye, Phone as PhoneIcon, FileText } from "lucide-react"
import { format } from "date-fns"
import { PrescriptionForm } from "./PrescriptionForm"
import { DigitalPrescription } from "./DigitalPrescription"

interface Consultation {
  id: string
  patient_name: string
  patient_age: number | null
  patient_contact: string | null
  patient_symptoms: string
  patient_vitals: any
  consultation_type: 'routine' | 'emergency'
  status: 'pending' | 'scheduled' | 'live' | 'completed' | 'cancelled'
  scheduled_time: string | null
  doctor_id: string | null
  doctor_name: string | null
  doctor_specialization: string | null
  staff_name: string
  video_call_link: string | null
  prescription_id: string | null
  created_at: string
  updated_at: string
}

export const ConsultationDashboard = () => {
  const { toast } = useToast()
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'scheduled' | 'live' | 'completed'>('all')
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null)
  const [viewPrescription, setViewPrescription] = useState<string | null>(null)

  useEffect(() => {
    fetchConsultations()
    // Set up real-time subscription
    const subscription = supabase
      .channel('consultations-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'consultations' }, handleRealtimeUpdate)
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [])

  const fetchConsultations = async () => {
    try {
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setConsultations((data || []) as Consultation[])
    } catch (error) {
      console.error('Error fetching consultations:', error)
      toast({
        title: "Error",
        description: "Failed to load consultations",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRealtimeUpdate = (payload: any) => {
    console.log('Realtime update:', payload)
    fetchConsultations() // Refresh the list
  }

  const updateConsultationStatus = async (id: string, newStatus: Consultation['status']) => {
    try {
      const { error } = await supabase
        .from('consultations')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error

      toast({
        title: "Status Updated",
        description: `Consultation status changed to ${newStatus}`,
      })
    } catch (error) {
      console.error('Error updating status:', error)
      toast({
        title: "Error",
        description: "Failed to update consultation status",
        variant: "destructive",
      })
    }
  }

  const startVideoCall = async (consultation: Consultation) => {
    try {
      // Generate a unique room ID and video link
      const roomId = `consultation-${consultation.id}`
      const videoLink = `https://meet.jit.si/${roomId}`

      const { error } = await supabase
        .from('consultations')
        .update({ 
          status: 'live',
          video_room_id: roomId,
          video_call_link: videoLink
        })
        .eq('id', consultation.id)

      if (error) throw error

      // Open video call in new window
      window.open(videoLink, '_blank')

      toast({
        title: "Video Call Started",
        description: "Connecting to doctor...",
      })
    } catch (error) {
      console.error('Error starting video call:', error)
      toast({
        title: "Error",
        description: "Failed to start video call",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status: Consultation['status']) => {
    const statusConfig = {
      pending: { variant: 'secondary' as const, label: 'Pending' },
      scheduled: { variant: 'outline' as const, label: 'Scheduled' },
      live: { variant: 'default' as const, label: 'Live' },
      completed: { variant: 'secondary' as const, label: 'Completed' },
      cancelled: { variant: 'destructive' as const, label: 'Cancelled' }
    }

    const config = statusConfig[status]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getConsultationTypeBadge = (type: Consultation['consultation_type']) => {
    return type === 'emergency' ? (
      <Badge variant="destructive">
        <AlertTriangle className="h-3 w-3 mr-1" />
        Emergency
      </Badge>
    ) : (
      <Badge variant="outline">
        <Clock className="h-3 w-3 mr-1" />
        Routine
      </Badge>
    )
  }

  const filteredConsultations = consultations.filter(consultation => 
    filter === 'all' || consultation.status === filter
  )

  const stats = {
    total: consultations.length,
    pending: consultations.filter(c => c.status === 'pending').length,
    scheduled: consultations.filter(c => c.status === 'scheduled').length,
    live: consultations.filter(c => c.status === 'live').length,
    completed: consultations.filter(c => c.status === 'completed').length,
  }

  // Show prescription form if consultation is selected
  if (selectedConsultation) {
    return (
      <PrescriptionForm
        consultationId={selectedConsultation.id}
        patientName={selectedConsultation.patient_name}
        patientAge={selectedConsultation.patient_age}
        doctorId={selectedConsultation.doctor_id || ''}
        doctorName={selectedConsultation.doctor_name || ''}
        onPrescriptionCreated={(prescriptionId) => {
          setSelectedConsultation(null)
          setViewPrescription(prescriptionId)
          fetchConsultations()
        }}
        onCancel={() => setSelectedConsultation(null)}
      />
    )
  }

  // Show prescription view if prescription is selected
  if (viewPrescription) {
    return (
      <DigitalPrescription
        prescriptionId={viewPrescription}
        onBack={() => setViewPrescription(null)}
      />
    )
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Stethoscope className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">Consultation Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage all patient consultations</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <HealthcareCard 
          className={`p-4 cursor-pointer transition-colors ${filter === 'all' ? 'ring-2 ring-primary' : ''}`}
          onClick={() => setFilter('all')}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </div>
        </HealthcareCard>

        <HealthcareCard 
          className={`p-4 cursor-pointer transition-colors ${filter === 'pending' ? 'ring-2 ring-primary' : ''}`}
          onClick={() => setFilter('pending')}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </div>
        </HealthcareCard>

        <HealthcareCard 
          className={`p-4 cursor-pointer transition-colors ${filter === 'scheduled' ? 'ring-2 ring-primary' : ''}`}
          onClick={() => setFilter('scheduled')}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.scheduled}</div>
            <div className="text-sm text-muted-foreground">Scheduled</div>
          </div>
        </HealthcareCard>

        <HealthcareCard 
          className={`p-4 cursor-pointer transition-colors ${filter === 'live' ? 'ring-2 ring-primary' : ''}`}
          onClick={() => setFilter('live')}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.live}</div>
            <div className="text-sm text-muted-foreground">Live</div>
          </div>
        </HealthcareCard>

        <HealthcareCard 
          className={`p-4 cursor-pointer transition-colors ${filter === 'completed' ? 'ring-2 ring-primary' : ''}`}
          onClick={() => setFilter('completed')}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">{stats.completed}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
        </HealthcareCard>
      </div>

      {/* Consultations List */}
      <div className="space-y-4">
        {filteredConsultations.length === 0 ? (
          <HealthcareCard className="p-8 text-center">
            <Stethoscope className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Consultations Found</h3>
            <p className="text-muted-foreground">
              {filter === 'all' ? 'No consultations have been created yet.' : `No ${filter} consultations found.`}
            </p>
          </HealthcareCard>
        ) : (
          filteredConsultations.map((consultation) => (
            <HealthcareCard key={consultation.id} className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg font-semibold text-foreground">{consultation.patient_name}</h3>
                    {consultation.patient_age && (
                      <Badge variant="outline">{consultation.patient_age}y</Badge>
                    )}
                    {getConsultationTypeBadge(consultation.consultation_type)}
                    {getStatusBadge(consultation.status)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <User className="h-4 w-4" />
                        <span>Doctor</span>
                      </div>
                      <p className="text-foreground">{consultation.doctor_name || 'Not assigned'}</p>
                      {consultation.doctor_specialization && (
                        <p className="text-muted-foreground">{consultation.doctor_specialization}</p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Calendar className="h-4 w-4" />
                        <span>Timing</span>
                      </div>
                      <p className="text-foreground">
                        {consultation.scheduled_time 
                          ? format(new Date(consultation.scheduled_time), 'MMM dd, yyyy hh:mm a')
                          : 'ASAP'
                        }
                      </p>
                      <p className="text-muted-foreground">
                        Created {format(new Date(consultation.created_at), 'MMM dd, hh:mm a')}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Eye className="h-4 w-4" />
                      <span>Symptoms</span>
                    </div>
                    <p className="text-foreground">{consultation.patient_symptoms}</p>
                  </div>

                  {consultation.patient_contact && (
                    <div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <PhoneIcon className="h-4 w-4" />
                        <span>Patient Contact</span>
                      </div>
                      <p className="text-foreground">{consultation.patient_contact}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 lg:w-48">
                  {consultation.status === 'pending' && (
                    <>
                      <Button
                        onClick={() => startVideoCall(consultation)}
                        className="w-full"
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Start Video Call
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => updateConsultationStatus(consultation.id, 'cancelled')}
                        className="w-full"
                      >
                        Cancel
                      </Button>
                    </>
                  )}

                  {consultation.status === 'scheduled' && (
                    <>
                      <Button
                        onClick={() => startVideoCall(consultation)}
                        className="w-full"
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Join Call
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => updateConsultationStatus(consultation.id, 'cancelled')}
                        className="w-full"
                      >
                        Cancel
                      </Button>
                    </>
                  )}

                  {consultation.status === 'live' && (
                    <>
                      <Button
                        onClick={() => window.open(consultation.video_call_link || '', '_blank')}
                        className="w-full"
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Rejoin Call
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => updateConsultationStatus(consultation.id, 'completed')}
                        className="w-full"
                      >
                        End Call
                      </Button>
                    </>
                  )}

                  {consultation.status === 'completed' && (
                    <div className="space-y-2">
                      <Badge variant="secondary" className="w-full justify-center py-2">
                        Consultation Complete
                      </Badge>
                      {!consultation.prescription_id && (
                        <Button
                          variant="outline"
                          onClick={() => setSelectedConsultation(consultation)}
                          className="w-full"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Create Prescription
                        </Button>
                      )}
                      {consultation.prescription_id && (
                        <Button
                          variant="outline"
                          onClick={() => setViewPrescription(consultation.prescription_id)}
                          className="w-full"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          View Prescription
                        </Button>
                      )}
                    </div>
                  )}

                  {consultation.status === 'cancelled' && (
                    <Badge variant="destructive" className="w-full justify-center py-2">
                      Cancelled
                    </Badge>
                  )}
                </div>
              </div>
            </HealthcareCard>
          ))
        )}
      </div>
    </div>
  )
}