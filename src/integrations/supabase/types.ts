export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      consultation_status_logs: {
        Row: {
          changed_by: string
          consultation_id: string
          created_at: string
          id: string
          new_status: string
          notes: string | null
          old_status: string | null
        }
        Insert: {
          changed_by: string
          consultation_id: string
          created_at?: string
          id?: string
          new_status: string
          notes?: string | null
          old_status?: string | null
        }
        Update: {
          changed_by?: string
          consultation_id?: string
          created_at?: string
          id?: string
          new_status?: string
          notes?: string | null
          old_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consultation_status_logs_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "consultations"
            referencedColumns: ["id"]
          },
        ]
      }
      consultations: {
        Row: {
          consultation_type: string
          created_at: string
          doctor_id: string | null
          doctor_name: string | null
          doctor_specialization: string | null
          id: string
          notes: string | null
          patient_age: number | null
          patient_contact: string | null
          patient_name: string
          patient_symptoms: string | null
          patient_vitals: Json | null
          prescription: Json | null
          prescription_id: string | null
          scheduled_time: string | null
          staff_name: string
          staff_user_id: string | null
          status: string
          updated_at: string
          video_call_link: string | null
          video_room_id: string | null
        }
        Insert: {
          consultation_type: string
          created_at?: string
          doctor_id?: string | null
          doctor_name?: string | null
          doctor_specialization?: string | null
          id?: string
          notes?: string | null
          patient_age?: number | null
          patient_contact?: string | null
          patient_name: string
          patient_symptoms?: string | null
          patient_vitals?: Json | null
          prescription?: Json | null
          prescription_id?: string | null
          scheduled_time?: string | null
          staff_name: string
          staff_user_id?: string | null
          status?: string
          updated_at?: string
          video_call_link?: string | null
          video_room_id?: string | null
        }
        Update: {
          consultation_type?: string
          created_at?: string
          doctor_id?: string | null
          doctor_name?: string | null
          doctor_specialization?: string | null
          id?: string
          notes?: string | null
          patient_age?: number | null
          patient_contact?: string | null
          patient_name?: string
          patient_symptoms?: string | null
          patient_vitals?: Json | null
          prescription?: Json | null
          prescription_id?: string | null
          scheduled_time?: string | null
          staff_name?: string
          staff_user_id?: string | null
          status?: string
          updated_at?: string
          video_call_link?: string | null
          video_room_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consultations_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      doctors: {
        Row: {
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          id: string
          is_available: boolean | null
          is_emergency_doctor: boolean | null
          name: string
          response_time_minutes: number | null
          specialization: string
        }
        Insert: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          is_available?: boolean | null
          is_emergency_doctor?: boolean | null
          name: string
          response_time_minutes?: number | null
          specialization: string
        }
        Update: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          is_available?: boolean | null
          is_emergency_doctor?: boolean | null
          name?: string
          response_time_minutes?: number | null
          specialization?: string
        }
        Relationships: []
      }
      prescriptions: {
        Row: {
          consultation_id: string
          created_at: string
          diagnosis: string
          dispensed_at: string | null
          dispensed_by: string | null
          doctor_id: string
          doctor_license_number: string | null
          doctor_name: string
          follow_up_date: string | null
          id: string
          instructions: string | null
          is_dispensed: boolean | null
          medications: Json
          patient_age: number | null
          patient_name: string
          prescription_date: string
          updated_at: string
        }
        Insert: {
          consultation_id: string
          created_at?: string
          diagnosis: string
          dispensed_at?: string | null
          dispensed_by?: string | null
          doctor_id: string
          doctor_license_number?: string | null
          doctor_name: string
          follow_up_date?: string | null
          id?: string
          instructions?: string | null
          is_dispensed?: boolean | null
          medications: Json
          patient_age?: number | null
          patient_name: string
          prescription_date?: string
          updated_at?: string
        }
        Update: {
          consultation_id?: string
          created_at?: string
          diagnosis?: string
          dispensed_at?: string | null
          dispensed_by?: string | null
          doctor_id?: string
          doctor_license_number?: string | null
          doctor_name?: string
          follow_up_date?: string | null
          id?: string
          instructions?: string | null
          is_dispensed?: boolean | null
          medications?: Json
          patient_age?: number | null
          patient_name?: string
          prescription_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "consultations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
