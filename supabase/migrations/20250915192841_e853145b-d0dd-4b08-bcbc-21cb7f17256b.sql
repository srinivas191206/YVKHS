-- Create prescriptions table for storing doctor prescriptions
CREATE TABLE public.prescriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  consultation_id UUID NOT NULL REFERENCES public.consultations(id) ON DELETE CASCADE,
  patient_name TEXT NOT NULL,
  patient_age INTEGER,
  doctor_id TEXT NOT NULL,
  doctor_name TEXT NOT NULL,
  doctor_license_number TEXT,
  diagnosis TEXT NOT NULL,
  medications JSONB NOT NULL, -- Array of medication objects
  instructions TEXT,
  follow_up_date DATE,
  prescription_date DATE NOT NULL DEFAULT CURRENT_DATE,
  is_dispensed BOOLEAN DEFAULT false,
  dispensed_at TIMESTAMP WITH TIME ZONE,
  dispensed_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;

-- Create policies for prescription access
CREATE POLICY "All staff can view prescriptions" 
ON public.prescriptions 
FOR SELECT 
USING (true);

CREATE POLICY "All staff can create prescriptions" 
ON public.prescriptions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "All staff can update prescriptions" 
ON public.prescriptions 
FOR UPDATE 
USING (true);

-- Create trigger for automatic timestamp updates on prescriptions
CREATE TRIGGER update_prescriptions_updated_at
BEFORE UPDATE ON public.prescriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add prescription_id to consultations table for easy reference
ALTER TABLE public.consultations 
ADD COLUMN prescription_id UUID REFERENCES public.prescriptions(id);