-- Create consultations table for managing doctor video consultations
CREATE TABLE public.consultations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_name TEXT NOT NULL,
  patient_age INTEGER,
  patient_contact TEXT,
  patient_symptoms TEXT,
  patient_vitals JSONB,
  consultation_type TEXT NOT NULL CHECK (consultation_type IN ('routine', 'emergency')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'live', 'completed', 'cancelled')),
  scheduled_time TIMESTAMP WITH TIME ZONE,
  doctor_id TEXT,
  doctor_name TEXT,
  doctor_specialization TEXT,
  staff_user_id UUID,
  staff_name TEXT NOT NULL,
  video_room_id TEXT,
  video_call_link TEXT,
  notes TEXT,
  prescription JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

-- Create policies for consultation access
CREATE POLICY "All staff can view consultations" 
ON public.consultations 
FOR SELECT 
USING (true);

CREATE POLICY "All staff can create consultations" 
ON public.consultations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "All staff can update consultations" 
ON public.consultations 
FOR UPDATE 
USING (true);

CREATE POLICY "All staff can delete consultations" 
ON public.consultations 
FOR DELETE 
USING (true);

-- Create doctors table for available doctors
CREATE TABLE public.doctors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  specialization TEXT NOT NULL,
  contact_phone TEXT,
  contact_email TEXT,
  is_emergency_doctor BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  response_time_minutes INTEGER DEFAULT 15,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security for doctors
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;

-- Create policies for doctors
CREATE POLICY "All staff can view doctors" 
ON public.doctors 
FOR SELECT 
USING (true);

CREATE POLICY "All staff can manage doctors" 
ON public.doctors 
FOR ALL 
USING (true);

-- Insert sample doctors
INSERT INTO public.doctors (name, specialization, contact_phone, contact_email, is_emergency_doctor, response_time_minutes) VALUES
('Dr. Sarah Johnson', 'General Medicine', '+1-555-0101', 'sarah.johnson@healthnet.com', true, 5),
('Dr. Michael Chen', 'Pediatrics', '+1-555-0102', 'michael.chen@healthnet.com', false, 15),
('Dr. Priya Sharma', 'Internal Medicine', '+1-555-0103', 'priya.sharma@healthnet.com', true, 10),
('Dr. James Wilson', 'Cardiology', '+1-555-0104', 'james.wilson@healthnet.com', false, 20),
('Dr. Lisa Martinez', 'Emergency Medicine', '+1-555-0105', 'lisa.martinez@healthnet.com', true, 3);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_consultations_updated_at
BEFORE UPDATE ON public.consultations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create consultation_status_logs table for tracking status changes
CREATE TABLE public.consultation_status_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  consultation_id UUID NOT NULL REFERENCES public.consultations(id) ON DELETE CASCADE,
  old_status TEXT,
  new_status TEXT NOT NULL,
  changed_by TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for status logs
ALTER TABLE public.consultation_status_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "All staff can view status logs" 
ON public.consultation_status_logs 
FOR SELECT 
USING (true);

CREATE POLICY "All staff can create status logs" 
ON public.consultation_status_logs 
FOR INSERT 
WITH CHECK (true);