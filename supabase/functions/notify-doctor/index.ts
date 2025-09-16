import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "../_shared/supabase.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NotificationRequest {
  consultationId: string;
  doctorId: string;
  patientName: string;
  symptoms: string;
  consultationType: 'routine' | 'emergency';
  scheduledTime?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { consultationId, doctorId, patientName, symptoms, consultationType, scheduledTime }: NotificationRequest = await req.json();

    console.log('Sending notification for consultation:', consultationId);

    // Get doctor details
    const { data: doctor, error: doctorError } = await supabase
      .from('doctors')
      .select('*')
      .eq('id', doctorId)
      .single();

    if (doctorError || !doctor) {
      throw new Error('Doctor not found');
    }

    // Create video call room
    const roomId = `consultation-${consultationId}`;
    const videoCallLink = `https://meet.jit.si/${roomId}`;

    // Update consultation with video link
    const { error: updateError } = await supabase
      .from('consultations')
      .update({ 
        video_room_id: roomId,
        video_call_link: videoCallLink 
      })
      .eq('id', consultationId);

    if (updateError) {
      console.error('Error updating consultation:', updateError);
    }

    // Create notification message
    const isEmergency = consultationType === 'emergency';
    const urgencyText = isEmergency ? '🚨 EMERGENCY' : '📅 SCHEDULED';
    const timeText = scheduledTime ? `at ${new Date(scheduledTime).toLocaleString()}` : 'ASAP';
    
    const message = `${urgencyText} CONSULTATION REQUEST
    
Patient: ${patientName}
Symptoms: ${symptoms}
Time: ${timeText}

Secure Video Call Link: ${videoCallLink}

Please join the call to connect with the patient.

Rural Health Portal`;

    // TODO: Send SMS notification
    // This would integrate with services like Twilio, AWS SNS, or local SMS providers
    console.log('SMS to', doctor.contact_phone, ':', message);

    // TODO: Send WhatsApp notification
    // This would integrate with WhatsApp Business API
    console.log('WhatsApp to', doctor.contact_phone, ':', message);

    // TODO: Send email notification
    // This would integrate with email services like Resend, SendGrid, etc.
    const emailMessage = `
    <html>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: ${isEmergency ? '#dc2626' : '#059669'}; color: white; padding: 20px; text-align: center;">
        <h1>${urgencyText} Consultation Request</h1>
      </div>
      
      <div style="padding: 20px; background: #f9fafb;">
        <h2>Patient Information</h2>
        <p><strong>Name:</strong> ${patientName}</p>
        <p><strong>Symptoms:</strong> ${symptoms}</p>
        <p><strong>Scheduled Time:</strong> ${timeText}</p>
        
        <div style="margin: 30px 0; text-align: center;">
          <a href="${videoCallLink}" 
             style="background: #059669; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block;">
            Join Video Call
          </a>
        </div>
        
        <p style="color: #6b7280; font-size: 14px;">
          This is a secure video consultation. Please click the link above to connect with the patient.
          If you have any issues, please contact the health center immediately.
        </p>
        
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
        
        <p style="color: #6b7280; font-size: 12px; text-align: center;">
          Rural Health Portal - Connecting Communities to Care
        </p>
      </div>
    </body>
    </html>`;

    console.log('Email to', doctor.contact_email, ':', emailMessage);

    // Log the notification attempt
    const { error: logError } = await supabase
      .from('consultation_status_logs')
      .insert([{
        consultation_id: consultationId,
        old_status: null,
        new_status: 'notification_sent',
        changed_by: 'system',
        notes: `Notification sent to Dr. ${doctor.name} via phone: ${doctor.contact_phone}, email: ${doctor.contact_email}`
      }]);

    if (logError) {
      console.error('Error logging notification:', logError);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Doctor notification sent successfully',
      videoCallLink,
      roomId
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in notify-doctor function:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});